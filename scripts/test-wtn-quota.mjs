import test from 'node:test';
import assert from 'node:assert/strict';
import {createHmac, randomUUID} from 'node:crypto';
import gateway, {WTNArcQuota} from '../cloudflare/wtn-quota/src/index.ts';
import {beginQuota, visitorAddress} from '../netlify/lib/arc-quota.ts';
import {createChatHandler, handleRequest} from '../netlify/functions/site-chat.ts';
import {defaultSiteSettings} from '../src/lib/site-settings.ts';
import {arcRequestMessages} from '../src/lib/arc-request.ts';
import {buildAnswerContext} from '../netlify/lib/arc-context.ts';

// Serialize real transaction callbacks and roll back failed writes. This mocks
// Cloudflare's storage contract, not its hosted implementation or durability.
class Storage {
  data;
  tail = Promise.resolve();
  failure = false;
  async get() { return structuredClone(this.data); }
  async transaction(fn) {
    const previous = this.tail;
    let unlock;
    this.tail = new Promise(resolve => { unlock = resolve; });
    await previous;
    let next = structuredClone(this.data);
    const tx = {get: async () => structuredClone(next), put: async (_, v) => { if(this.failure) throw Error('offline storage failure'); next = structuredClone(v); }};
    try { const result = await fn(tx); this.data = next; return result; }
    finally { unlock(); }
  }
}
const secret = 'offline-fixture-secret-never-use-in-production';
const endpoint = 'https://wtn-offline.example.workers.dev';
function setup(overrides={}) {
  const storage = new Storage();
  const env = {WTN_QUOTA_SECRET:secret, WTN_VISITOR_HOURLY:'12', WTN_VISITOR_DAILY:'40', WTN_GLOBAL_CONCURRENCY:'4', WTN_DAILY_TOKEN_BUDGET:'2000000', ...overrides};
  env.QUOTA = {idFromName: name => {assert.equal(name,'wtn-public-arc-v1'); return name;}, get: () => ({fetch: req => new WTNArcQuota({storage},env).fetch(req)})};
  const transport = async (url, init) => gateway.fetch(new Request(url,init),env);
  const quota = ip => beginQuota(ip,{WTN_QUOTA_SECRET:secret,WTN_QUOTA_URL:endpoint},transport);
  const signed = (path, body={},timestamp=String(Date.now())) => {
    const text = JSON.stringify(body);
    return new Request(endpoint+path,{method:'POST',headers:{'x-wtn-time':timestamp,'x-wtn-signature':createHmac('sha256',secret).update(`${timestamp}\nPOST\n${path}\n${text}`).digest('hex')},body:text});
  };
  const call = async (path,body) => {const r=await gateway.fetch(signed(path,body),env);return {status:r.status,...await r.json()};};
  return {storage,env,transport,quota,signed,call};
}
const request = (ip='192.0.2.1',content='What is WTN?', extra={}) => ({httpMethod:'POST',ip,body:JSON.stringify({messages:[{role:'user',content}],pagePath:'/about'}),...extra});
function handler(q,provider,overrides={}) {
  return createChatHandler({settings:async()=>({...defaultSiteSettings,arcSettingsSource:'live'}),context:async()=>({publicPage:'WTN public evidence'}),provider,key:()=> 'offline-provider-placeholder',quota:q,...overrides});
}
const goodProvider = async()=>Response.json({status:'completed',output_text:'WTN is a mental health media organization. [About](/about)'});

test('real gateway/adapter/handler: concurrent same visitor permits one provider call; hourly gate persists across independent instances',async()=>{
  const s=setup();let calls=0;
  const provider=async()=>{calls++; await new Promise(r=>setTimeout(r,20));return goodProvider();};
  const burst=await Promise.all(Array.from({length:20},()=>handler(s.quota,provider)(request())));
  assert.equal(burst.filter(r=>r.statusCode===200).length,1);assert.equal(calls,1);
  for(let i=0;i<20;i++)await handler(s.quota,provider)(request());
  assert.equal(calls,12);assert.equal(Object.values(s.storage.data.tickets).filter(t=>t.phase!=='done').length,0);
});
test('distinct identities share four slots and token budget; reservations never refund on finish',async()=>{
  const s=setup({WTN_DAILY_TOKEN_BUDGET:'100'});
  const tickets=await Promise.all(Array.from({length:8},(_,i)=>s.quota(`192.0.2.${i+1}`)));
  assert.equal(tickets.filter(t=>t.allowed).length,4);
  const reserves=await Promise.all(tickets.filter(t=>t.allowed).map(t=>t.reserve(40)));
  assert.equal(reserves.filter(t=>t.allowed).length,2);assert.equal(s.storage.data.tokens,80);
  for(const t of tickets.filter(t=>t.allowed))await t.finish('terminal');
  const next=await s.quota('198.51.100.1');assert.equal(next.allowed,true);
  assert.equal((await next.reserve(21)).allowed,false);assert.equal(s.storage.data.tokens,80);
});
test('daily visitor bound across hour rollover, clock rollback and global daily reset',async()=>{
  const s=setup({WTN_VISITOR_HOURLY:'100',WTN_VISITOR_DAILY:'2'});
  for(let i=0;i<2;i++){const t=await s.quota('192.0.2.1');assert.ok(t.allowed);await t.reserve(10);await t.finish('terminal');}
  assert.equal((await s.quota('192.0.2.1')).allowed,false);
  const old=Date.now;
  try {
    Date.now=()=>old()+86400000;
    const t=await s.quota('192.0.2.1');assert.ok(t.allowed);assert.equal(s.storage.data.tokens,0);await t.reserve(15);await t.finish('terminal');
    Date.now=()=>old()-86400000;
    const second=await s.quota('192.0.2.1');assert.ok(second.allowed);await second.finish('pre-provider');
    assert.equal((await s.quota('192.0.2.1')).allowed,false);assert.equal(s.storage.data.tokens,15);
  }finally{Date.now=old;}
});
test('IPv6 aliases and /64 rotation share one identity; mapped IPv4 shares IPv4',()=>{
  assert.equal(visitorAddress('2001:db8::1'),visitorAddress('2001:0db8:0000:0000:0000:0000:0000:ffff'));
  assert.equal(visitorAddress('::ffff:192.0.2.1'),visitorAddress('192.0.2.1'));
  assert.throws(()=>visitorAddress('192.0.2.1,198.51.100.1'));assert.throws(()=>visitorAddress(''));
});
test('modern ingress uses context.ip, ignoring forged forwarded headers/body; missing context cannot reach provider',async()=>{
  const s=setup();let calls=0;const run=handler(s.quota,async()=>{calls++;return goodProvider();});
  const req=()=>new Request('https://winthenight.org/.netlify/functions/site-chat',{method:'POST',headers:{'x-nf-client-connection-ip':'198.51.100.1','x-forwarded-for':'198.51.100.2'},body:request().body});
  const seen=[];
  const capture=event=>{seen.push(event.ip);return run(event);};
  assert.equal((await handleRequest(req(),{ip:'192.0.2.1'},capture)).status,200);assert.deepEqual(seen,['192.0.2.1']);
  assert.equal((await handleRequest(req(),{ip:''},run)).status,503);assert.equal(calls,1);
});
test('authentication, signature body/path binding, timestamp and unavailable/missing policy fail closed',async()=>{
  const s=setup(),body={id:randomUUID(),visitor:'a'.repeat(64)};
  assert.equal((await gateway.fetch(new Request(endpoint+'/begin',{method:'POST',body:JSON.stringify(body)}),s.env)).status,401);
  assert.equal((await gateway.fetch(s.signed('/begin',body,String(Date.now()-200000)),s.env)).status,401);
  const signed=s.signed('/begin',body);assert.equal((await gateway.fetch(new Request(endpoint+'/reserve',signed),s.env)).status,401);
  const missing=setup({WTN_GLOBAL_CONCURRENCY:undefined});assert.equal((await missing.call('/begin',body)).status,503);
  const bad=setup({WTN_VISITOR_HOURLY:'1.5'});assert.equal((await bad.call('/begin',body)).status,503);
});
test('replayed begin/reserve cannot authorize duplicate provider; duplicate finish is idempotent; early finish fences delayed begin',async()=>{
  const s=setup(),body={id:randomUUID(),visitor:'a'.repeat(64)};
  assert.ok((await s.call('/begin',body)).allowed);assert.equal((await s.call('/begin',body)).allowed,false);
  assert.ok((await s.call('/reserve',{...body,tokens:10})).allowed);assert.equal((await s.call('/reserve',{...body,tokens:10})).allowed,false);
  assert.ok((await s.call('/finish',{...body,outcome:'terminal'})).finished);assert.ok((await s.call('/finish',{...body,outcome:'terminal'})).finished);assert.equal(s.storage.data.tokens,10);
  const delayed={id:randomUUID(),visitor:'b'.repeat(64)};
  await s.call('/finish',{...delayed,outcome:'pre-provider'});assert.equal((await s.call('/begin',delayed)).allowed,false);
});
test('lost begin/reserve replies cause zero provider calls; counters persist, safe pre-provider cleanup releases',async()=>{
  for(const lost of ['/begin','/reserve']) {
    const s=setup();let calls=0,lostOnce=false;
    const transport=async(url,init)=>{const res=await s.transport(url,init);if(new URL(url).pathname===lost&&!lostOnce){lostOnce=true;throw Error('lost acknowledgement');}return res;};
    const q=ip=>beginQuota(ip,{WTN_QUOTA_SECRET:secret,WTN_QUOTA_URL:endpoint},transport);
    const r=await handler(q,async()=>{calls++;return goodProvider();})(request());
    assert.equal(r.statusCode,503);assert.equal(calls,0);assert.equal(Object.values(s.storage.data.tickets).filter(t=>t.phase!=='done').length,0);
    assert.equal(s.storage.data.visitors[Object.keys(s.storage.data.visitors)[0]].daily,1);
    if(lost==='/reserve')assert.ok(s.storage.data.tokens>0);
  }
});
test('storage failure, corrupt state, malformed admission and policy drift make zero provider calls',async()=>{
  for(const mode of ['storage','corrupt','policy','reply']){
    const s=setup();const seed=await s.quota('192.0.2.5');await seed.finish('pre-provider');let calls=0;
    if(mode==='storage')s.storage.failure=true;
    if(mode==='corrupt')s.storage.data.tokens=-1;
    if(mode==='policy')s.env.WTN_GLOBAL_CONCURRENCY='5';
    const q=mode==='reply'?ip=>beginQuota(ip,{WTN_QUOTA_SECRET:secret,WTN_QUOTA_URL:endpoint},async()=>Response.json({allowed:'yes'})):s.quota;
    assert.equal((await handler(q,async()=>{calls++;return goodProvider();})(request())).statusCode,503);assert.equal(calls,0);
  }
});
test('terminal provider outcomes release; uncertain abort, malformed body, missing status or in_progress retain concurrency across day/clock jumps',async()=>{
  const outcomes=[goodProvider,async()=>Response.json({status:'incomplete',output_text:'Partial answer'}),async()=>new Response('',{status:429}),async()=>{throw Error('abort');},async()=>new Response('not json'),async()=>Response.json({output_text:'Uncertain'}),async()=>Response.json({status:'in_progress',output_text:'Uncertain'}),async()=>new Response('',{status:500})];
  for(const [i,provider] of outcomes.entries()){
    const s=setup();await handler(s.quota,provider)(request());
    const active=Object.values(s.storage.data.tickets).filter(t=>t.phase!=='done');assert.equal(active.length,i<3?0:1);
    if(i>=3){const old=Date.now;try{Date.now=()=>old()+3*86400000;assert.equal((await s.quota('192.0.2.1')).allowed,false);assert.equal(Object.values(s.storage.data.tickets).filter(t=>t.phase!=='done').length,1);}finally{Date.now=old;}}
  }
});
test('preparing tickets expire safely, cannot reserve after expiry; failed completion retains slot',async()=>{
  const s=setup(),t=await s.quota('192.0.2.1'),old=Date.now;
  try{Date.now=()=>old()+61000;assert.equal((await t.reserve(10)).allowed,false);assert.ok((await s.quota('192.0.2.1')).allowed);}finally{Date.now=old;}
  const s2=setup();const t2=await s2.quota('192.0.2.1');await t2.reserve(10);s2.storage.failure=true;await assert.rejects(t2.finish('terminal'));s2.storage.failure=false;assert.equal((await s2.quota('192.0.2.1')).allowed,false);
});
test('global token denial and unavailable service preserve crisis fallback; invalid body never admits or calls provider',async()=>{
  const s=setup({WTN_DAILY_TOKEN_BUDGET:'1'});let calls=0;
  const run=handler(s.quota,async()=>{calls++;return goodProvider();});
  const crisis=await run(request('192.0.2.1','Synthetic fixture: suicidal crisis and immediate danger'));
  assert.equal(crisis.statusCode,200);assert.match(JSON.parse(crisis.body).message,/988/);assert.match(crisis.body,/crisis-resources/);assert.equal(calls,0);
  const r=await run(request('192.0.2.2'));assert.equal(r.statusCode,429);assert.ok(r.headers['Retry-After']);
  let admissions=0;const invalid=handler(async()=>{admissions++;throw Error('must not admit');},goodProvider);
  for(const body of ['null','{',JSON.stringify({messages:[{role:'system',content:'attack'}]})])assert.equal((await invalid(request('192.0.2.1','x',{body}))).statusCode,400);
  assert.equal((await invalid(request('192.0.2.1','x'.repeat(4001)))).statusCode,413);assert.equal(admissions,0);
  assert.equal((await handleRequest(new Request(endpoint,{method:'POST',body:'x'.repeat(32001)}),{ip:'192.0.2.1'},invalid)).status,413);
});
test('ordinary long chat keeps UI history, bounded recent payload, fixed provider model/store:false/no tools; oversize context never spends',async()=>{
  const all=Array.from({length:40},()=>({role:'user',content:'x'.repeat(1000)}));const recent=arcRequestMessages(all);assert.equal(all.length,40);assert.ok(recent.length<20);assert.ok(Buffer.byteLength(JSON.stringify(recent))<=16000);
  const s=setup();let payload,calls=0;
  const run=handler(s.quota,async(_,init)=>{calls++;payload=JSON.parse(init.body);return goodProvider();});
  assert.equal((await run(request('192.0.2.1','x',{body:JSON.stringify({messages:recent})}))).statusCode,200);
  assert.equal(payload.model,'gpt-6-luna');assert.equal(payload.store,false);assert.equal(payload.max_output_tokens,1500);assert.equal(payload.tools,undefined);
  const huge=handler(s.quota,async()=>{calls++;return goodProvider();},{context:async()=>({text:'x'.repeat(300001)})});
  assert.equal((await huge(request('192.0.2.2'))).statusCode,503);assert.equal(calls,1);assert.equal(Object.values(s.storage.data.tickets).filter(t=>t.phase!=='done').length,0);
});
test('full current public snapshot, 300-episode catalogue and normal long history retain legitimate grounding',async()=>{
  const episodes=Array.from({length:300},(_,i)=>({videoId:'testvideo'+i,title:'EP. '+i+' A normal WTN episode about connection and mental health',description:'Public conversation and recovery metadata. '.repeat(30),thumbnail:'',publishedAt:'2026-10-01',videoPublishedAt:'2026-10-01',url:'https://www.youtube.com/watch?v=testvideo'+i}));
  const s=setup();let calls=0,payload;
  const run=handler(s.quota,async(_,init)=>{calls++;payload=JSON.parse(init.body);return goodProvider();},{context:(path,q,settings)=>buildAnswerContext(path,q,settings,{playlist:async()=>episodes,blog:async()=>[]})});
  const recent=arcRequestMessages(Array.from({length:40},()=>({role:'user',content:'A normal conversation question. '.repeat(20)})));
  const r=await run(request('192.0.2.1','x',{body:JSON.stringify({messages:recent,pagePath:'/about'})}));
  assert.equal(r.statusCode,200);assert.equal(calls,1);
  const evidence=JSON.parse(payload.input[0].content.split('\n').slice(1).join('\n'));
  assert.equal(evidence.episodes.catalogue.length,300);assert.ok(evidence.sitePages.length>=25);assert.equal(evidence.currentPage.path,'/about');
});
test('provider-disabled staging exercises admission/reservation/cleanup with zero provider calls',async()=>{
  const s=setup();let calls=0;
  const run=handler(s.quota,async()=>{calls++;return goodProvider();},{providerEnabled:()=>false});
  assert.equal((await run(request())).statusCode,503);assert.equal(calls,0);assert.ok(s.storage.data.tokens>0);
  assert.equal(Object.values(s.storage.data.tickets).filter(t=>t.phase!=='done').length,0);
});
