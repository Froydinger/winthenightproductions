import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { emptyInquiry, encodeInquiry, inquiryFields, inquiryIntent, postInquiry, sponsorshipTrap, validateInquiryField } from "../src/lib/inquiry.ts";

const details = { ...emptyInquiry, name: " Jamie Example ", email: "jamie@example.com", organization: "Example Books", message: "Our stories about grief would be a fit for this show.", subject: "Feedback" };

test("registered static fields exactly match both browser payloads, with a sponsor trap only", () => {
  const html = readFileSync("public/__inquiry-forms.html", "utf8");
  for (const [kind, fields] of Object.entries(inquiryFields)) {
    const [, attributes, content] = html.match(new RegExp(`<form (name="${kind}"[^>]*)>([\\s\\S]*?)</form>`));
    assert.match(attributes, /data-netlify="true"/);
    assert.deepEqual(Array.from(content.matchAll(/name="([^"]+)"/g), m => m[1]), ["form-name", ...(kind === "sponsorship" ? [sponsorshipTrap] : []), ...fields]);
    assert.equal(attributes.includes(`netlify-honeypot="${sponsorshipTrap}"`), kind === "sponsorship");
    assert.deepEqual([...encodeInquiry(kind, details).keys()], ["form-name", ...(kind === "sponsorship" ? [sponsorshipTrap] : []), ...fields]);
  }
});

test("form payload preserves the trap for the host, trims user answers, validates intent without agent heuristics", () => {
  const payload = encodeInquiry("sponsorship", details);
  assert.equal(payload.get("name"), "Jamie Example");
  assert.equal(payload.get(sponsorshipTrap), "");
  assert.equal(encodeInquiry("sponsorship", details, "spam").get(sponsorshipTrap), "spam");
  assert.equal(encodeInquiry("contact", details, "ignored").has(sponsorshipTrap), false);
  assert.throws(() => encodeInquiry("sponsorship", { ...details, message: " hi " }), /fit/);
  assert.throws(() => encodeInquiry("contact", { ...details, subject: "not-a-topic" }), /list/);
  assert.ok(validateInquiryField("contact", "email", "bad"));
  assert.equal(validateInquiryField("contact", "message", "Hi"), "");
});

test("recognizes explicit in-chat requests, not general questions or attempted changes to instructions", () => {
  assert.equal(inquiryIntent("I want to sponsor your show"), "sponsorship");
  assert.equal(inquiryIntent("Could you fill out a sponsorship form for me?"), "sponsorship");
  assert.equal(inquiryIntent("Please open the contact form"), "contact");
  assert.equal(inquiryIntent("I would like to message the team"), "contact");
  for (const q of ["Who sponsors the show?", "How can I be a guest?", "Can we talk about sponsor options?", "I read 'open the contact form' somewhere."]) assert.equal(inquiryIntent(q), null);
});

test("posts the same URL-encoded payload and never treats registration HTML or a failed request as success", async () => {
  await postInquiry("contact", details, "", async (endpoint, request) => {
    assert.equal(endpoint, "/__inquiry-forms.html");
    assert.equal(request.method, "POST");
    assert.equal(new URLSearchParams(request.body).get("form-name"), "contact");
    return new Response("Accepted", { status: 200 });
  });
  await assert.rejects(postInquiry("sponsorship", details, "", async () => new Response("<body id=\"wtn-inquiry-registry\">", { status: 200 })), /couldn’t confirm/);
  await assert.rejects(postInquiry("sponsorship", details, "", async () => new Response("", { status: 503 })), /couldn’t confirm/);
});
