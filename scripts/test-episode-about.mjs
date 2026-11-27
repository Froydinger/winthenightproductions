import test from "node:test";
import assert from "node:assert/strict";
import { getEpisodeAbout } from "../src/lib/episode-about.ts";

test("uses an inline guest biography even when it follows the chapters", () => {
  const input = "Opening notes about the discussion today.\n\nChapters:\n00:00 Welcome\n\nGuest: Casey Brooks — writer and peer support worker.\n\n🔔 Subscribe to our show";
  assert.deepEqual(getEpisodeAbout(input), { kind: "bio", paragraphs: ["Casey Brooks — writer and peer support worker."] });
});

test("uses an explicitly headed block and excludes promotional and unrelated copy", () => {
  const input = "💬 Episode intro.\r\n\r\n**About our guest:**\r\n\r\nTaylor Nguyen is a community counselor.\r\nThey help run a peer support program.\r\nInstagram: https://example.com";
  const result = getEpisodeAbout(input);
  assert.equal(result.kind, "bio");
  assert.deepEqual(result.paragraphs, ["Taylor Nguyen is a community counselor. They help run a peer support program."]);
});

test("labels a synopsis as notes, and does not invent a guest for a host-only show", () => {
  const input = "🔔 Subscribe: https://example.com\n\nNo guest this time. Our hosts talk about burnout.\n\nJump Around:\n00:00 Introduction\n";
  assert.deepEqual(getEpisodeAbout(input), { kind: "notes", paragraphs: ["No guest this time. Our hosts talk about burnout."] });
});

test("does not treat a bare guest credit as a biography", () => {
  assert.deepEqual(getEpisodeAbout("The hosts reflect on decades of working together.\n\nGuest: Rowan Hill"), { kind: "notes", paragraphs: ["The hosts reflect on decades of working together."] });
});

test("does not render a disclosure for missing descriptions, timestamps or links only", () => {
  for (const input of [undefined, null, " \n ", "🔔 Subscribe: https://example.com\n#WinTheNight", "Chapters:\n00:00 Introduction", "https://example.com"]) {
    assert.equal(getEpisodeAbout(input), null);
  }
});

test("bounds the excerpt and strips outbound URLs while preserving link text", () => {
  const input = "Join us for a conversation with [a guest](https://example.com) on grief and recovery. " + "A longer interview about recovery. ".repeat(90);
  const result = getEpisodeAbout(input);
  assert.equal(result.kind, "notes");
  assert.match(result.paragraphs[0], /with a guest on grief/u);
  assert.doesNotMatch(result.paragraphs[0], /https/u);
  assert.ok(result.paragraphs.join(" ").length <= 950);
  assert.match(result.paragraphs[0], /…$/u);
});

test("surfaces a named guest introduction but does not label it as a formal bio", () => {
  const intro = "A difficult question opens tonight's conversation.\n\nMorgan Ellis joins Josh Lopez on Win The Night to tell the story behind her work.\n\nThe episode continues with more reflections on writing.";
  assert.deepEqual(getEpisodeAbout(intro), { kind: "guest", paragraphs: ["Morgan Ellis joins Josh Lopez on Win The Night to tell the story behind her work."] });
  const professional = "Join us for a conversation with Dr. Jordan Avery, a psychologist and author.\n\nThe hosts talk about what led to a career in mental health.";
  assert.equal(getEpisodeAbout(professional).kind, "guest");
  const hosts = "Jake Freudinger joins Josh Lopez on Win The Night for a host-only episode.\n\nThey talk about the latest chapter of the show.";
  assert.equal(getEpisodeAbout(hosts).kind, "notes");
});
