import test from 'node:test';
import assert from 'node:assert/strict';
import { extractPublicCopy, buildContext } from './build-arc-context.mjs';
import { readStoredPublicSettings } from '../netlify/lib/public-settings.ts';
import { publicPath, buildAnswerContext, rankEpisodes, safetyFallback } from '../netlify/lib/arc-context.ts';
import { fetchPlaylist } from '../netlify/lib/youtube.ts';
import { createChatHandler } from '../netlify/functions/site-chat.ts';
import { parseSubstackPosts } from '../netlify/functions/fetch-substack.ts';
import { defaultSiteSettings } from '../src/lib/site-settings.ts';
const episode = (number, name, description = '') => ({ videoId: `testvideo${number}`, title: `EP. ${number}: ${name}`, description, thumbnail: '', publishedAt: '', videoPublishedAt: '2026-10-01', url: `https://www.youtube.com/watch?v=testvideo${number}` });
const items = [episode(84, 'Burnout, ADHD & Friendship with Jake Freudinger', 'A conversation about burnout and grief.'), episode(83, 'Stephanie Bird', 'Family and connection.')];
const loaders = { playlist: async () => items, blog: async () => [] };
const event = (content, pagePath = '/about') => ({ httpMethod: 'POST', body: JSON.stringify({ messages: [{ role: 'user', content }], pagePath }) });
function mockHandler(provider, overrides = {}) {
  return createChatHandler({ settings: async () => ({...defaultSiteSettings, arcSettingsSource: 'live'}), context: (path, q, s) => buildAnswerContext(path, q, s, loaders), provider, key: () => 'offline-test-placeholder', ...overrides });
}
const invoke = async (handler, request) => handler(request, {}, () => {});

test('public routes exclude admin, hostile origins, query/session state and invalid chapter', () => {
  for (const path of ['/admin', '//evil.test', 'https://evil.test', '/about?email=secret', '/watch/chapter-99', '/reset-password', '/guest/private']) assert.equal(publicPath(path), null);
  assert.equal(publicPath('/about'), '/about');
  assert.equal(publicPath('/watch/chapter-7'), '/watch/:chapterId');
});
test('build snapshot includes current public resources/copy, no private routes; changed copy is extracted', async () => {
  const snapshot = await buildContext();
  assert.equal(snapshot.pages.length, 25);
  assert.ok(snapshot.pages.find(p => p.path === '/crisis-resources').copy.includes('https://warmline.org/'));
  assert.ok(!snapshot.pages.some(p => p.source.includes('Admin')));
  assert.deepEqual(extractPublicCopy('const Page=()=> <main>Updated today<a href="/about">About</a></main>', 'test.tsx'), ['Updated today', '/about', 'About']);
  assert.ok(extractPublicCopy('const Page=()=> <p>{yes ? "New wording" : "Other wording"}</p>', 'test.tsx').includes('New wording'));
});
test('exact episode number and guest/topic descriptions are retrieved', () => {
  assert.equal(rankEpisodes(items, 'Tell me about episode 83')[0].title, items[1].title);
  assert.equal(rankEpisodes(items, 'Jake Freudinger ADHD burnout')[0].title, items[0].title);
});
test('new API data and public settings are reflected, unknown private fields excluded', async () => {
  const settings = { ...defaultSiteSettings, about_jake_bio: 'Updated public bio', private_email: 'must not appear', chatbot_system_prompt: 'private instructions' };
  const context = await buildAnswerContext('/about', 'episode 85', settings, { playlist: async () => [episode(85, 'New Episode')], blog: async () => [] });
  assert.equal(context.currentPage.path, '/about');
  assert.equal(context.publicSettings.about_jake_bio, 'Updated public bio');
  assert.ok(!JSON.stringify(context).includes('must not appear'));
  assert.ok(!JSON.stringify(context).includes('private instructions'));
  assert.ok(context.episodes.catalogue[0].title.includes('85'));
});
test('catalogue failure is explicit; public page/site evidence still available', async () => {
  const context = await buildAnswerContext('/crisis-resources', 'warmline', defaultSiteSettings, { playlist: async () => { throw Error('offline'); }, blog: async () => { throw Error('offline'); } });
  assert.equal(context.episodes.status, 'unavailable');
  assert.equal(context.blog.status, 'unavailable');
  assert.ok(context.currentPage.authoredContent.copy.includes('Warmline Directory'));
});
test('chapter retrieves existing configured chapter playlist with podcast catalogue', async () => {
  const requested = [];
  await buildAnswerContext('/watch/chapter-7', 'episodes', defaultSiteSettings, { playlist: async id => { requested.push(id); return items; }, blog: async () => [] });
  assert.ok(requested.includes('PL4DJfmhGyz_7B1Qw7Y7GP1vhgtRTi48LD'));
});
test('public feed current post full text and catalogue; hostile feed links excluded', async () => {
  const posts = parseSubstackPosts('<rss><item><title>Current Post</title><link>https://www.winthenight.blog/p/current</link><guid>current-post</guid><content:encoded><![CDATA[<p>Whole public post body.</p>]]></content:encoded></item></rss>');
  const context = await buildAnswerContext('/blog/current-post', 'this page', defaultSiteSettings, { playlist: async () => [], blog: async () => [...posts, { ...posts[0], link: 'https://evil.test/' }] });
  assert.equal(context.currentPage.post.content, 'Whole public post body.');
  assert.equal(context.blog.catalogue.length, 1);
});
test('YouTube helper retains descriptions, true video date, pagination and filters hidden videos', async () => {
  let calls = 0;
  const fetcher = async url => {
    assert.equal(new URL(url).hostname, 'www.googleapis.com');
    calls++;
    return Response.json({ items: calls === 1 ? [{ snippet: { title: 'EP. 84', description: 'Real metadata', resourceId: { videoId: 'abcdefghijk' }, publishedAt: 'playlist-date' }, contentDetails: { videoPublishedAt: 'video-date' } }, { snippet: { title: 'Private video', resourceId: { videoId: 'private0000' } } }] : [], nextPageToken: calls === 1 ? 'next' : undefined });
  };
  const result = await fetchPlaylist('valid_playlist_id', fetcher, 'offline-test');
  assert.equal(calls, 2); assert.equal(result.length, 1);
  assert.equal(result[0].description, 'Real metadata'); assert.equal(result[0].videoPublishedAt, 'video-date');
  await assert.rejects(fetchPlaylist('http://evil', fetcher, 'offline-test'));
});
test('provider sees structured history, current page, all site copy, specific metadata and fixed model', async () => {
  let payload;
  const handler = mockHandler(async (url, options) => { payload = JSON.parse(options.body); return Response.json({ output_text: 'Episode 84 discusses burnout and grief. [Watch](https://www.youtube.com/watch?v=testvideo84)' }); });
  const response = await invoke(handler, event('What is episode 84 about?'));
  assert.equal(response.statusCode, 200); assert.equal(payload.model, 'gpt-6-luna');
  const evidence = JSON.parse(payload.input[0].content.split('\n').slice(1).join('\n'));
  assert.equal(evidence.currentPage.path, '/about');
  assert.ok(evidence.sitePages.find(p => p.path === '/crisis-resources'));
  assert.ok(evidence.episodes.matchedDescriptions[0].description.includes('burnout'));
  assert.ok(payload.instructions.includes('not transcripts'));
});
test('resource replies retain internal resource navigation when model omits it', async () => {
  const handler = mockHandler(async () => Response.json({ output_text: 'Try the Warmline Directory for peer support.' }));
  const response = await invoke(handler, event('Where are warmline resources?'));
  assert.match(JSON.parse(response.body).message, /\]\(\/crisis-resources\)/);
});
test('synthetic crisis test preserves immediate human support plus WTN directory on failure/omission, no external calls', async () => {
  const query = 'Synthetic safety fixture: suicidal crisis and immediate danger';
  for (const provider of [async () => new Response('', { status: 429 }), async () => { throw Error('offline'); }, async () => Response.json({ output_text: 'You deserve support.' })]) {
    const response = await invoke(mockHandler(provider), event(query));
    const message = JSON.parse(response.body).message;
    assert.equal(response.statusCode, 200);
    assert.match(message, /988/); assert.match(message, /emergency services/); assert.match(message, /crisis-resources/);
  }
  assert.match(safetyFallback(query), /not an emergency or clinical service/);
});
test('malformed bodies, types, huge messages are rejected without provider; rate failure remains retryable', async () => {
  const handler = mockHandler(async () => new Response('', { status: 429 }));
  for (const body of ['null', '{', JSON.stringify({ messages: [{ role: 'user', content: {} }] })]) assert.equal((await invoke(handler, { httpMethod: 'POST', body })).statusCode, 400);
  assert.equal((await invoke(handler, event('x'.repeat(4001)))).statusCode, 413);
  assert.equal((await invoke(handler, event('Which episode covers burnout?'))).statusCode, 429);
});


test('legacy Blobs bridge falls back only for unsupported strong reads, not authentication/network errors', async () => {
  const legacy = { headers: {'x-nf-site-id':'offline-site', 'x-nf-deploy-id':'offline-deploy'}, blobs: Buffer.from(JSON.stringify({url:'https://offline.invalid',token:'offline-placeholder'})).toString('base64') };
  const calls=[];
  const result=await readStoredPublicSettings(legacy,()=>({get:async(key,options)=>{calls.push(options); if(options.consistency==='strong'){const e=new Error('unsupported');e.name='BlobsConsistencyError';throw e;} return {about_jake_bio:'Current stored bio'};}}));
  assert.equal(result.consistency,'eventual');assert.equal(result.stored.about_jake_bio,'Current stored bio');assert.equal(calls.length,2);
  await assert.rejects(readStoredPublicSettings(legacy,()=>({get:async()=>{throw new Error('network unavailable');}})),/network unavailable/);
});
