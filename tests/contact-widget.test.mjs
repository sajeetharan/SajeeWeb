import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Ask Sajee is available site-wide without automatically opening", async () => {
  for (const file of [
    "build/index.html",
    "build/blogs/index.html",
    "build/mentored/index.html",
    "build/awards/index.html",
    "build/contact/index.html",
    "build/404.html",
  ]) {
    const html = await readFile(file, "utf8");
    const launchers = [
      ...html.matchAll(/<a\b[^>]*aria-controls="ask-sajee-dialog"[^>]*>/g),
    ];
    assert.equal(launchers.length, 1, `${file}: expected one launcher`);
    assert.match(launchers[0][0], /href="\/contact"/);
    assert.match(launchers[0][0], /aria-haspopup="dialog"/);
    assert.match(launchers[0][0], /aria-expanded="false"/);
    const dialogs = [
      ...html.matchAll(/<dialog\b[^>]*id="ask-sajee-dialog"[^>]*>/g),
    ];
    assert.equal(dialogs.length, 1, `${file}: expected one contact dialog`);
    assert.match(dialogs[0][0], /aria-labelledby="ask-sajee-title"/);
    assert.match(dialogs[0][0], /aria-describedby="ask-sajee-description"/);
    assert.doesNotMatch(dialogs[0][0], /\bopen(?:=|\s|>)/);
  }
});

test("contact guide routes before collecting messages and discloses paid guidance", async () => {
  const html = await readFile("build/index.html", "utf8");
  const dialog = html.match(
    /<dialog\b[^>]*id="ask-sajee-dialog"[\s\S]*?<\/dialog>/,
  )?.[0];
  assert.ok(dialog);
  for (const intent of [
    "Ask a focused question",
    "Mentoring or interview preparation",
    "Speaking or collaboration",
    "Article question or correction",
  ]) {
    assert.ok(dialog.includes(intent), `missing intent: ${intent}`);
  }
  assert.match(dialog, /A contact guide, not live chat\./);
  assert.match(dialog, /paid Topmate DM/);
  assert.match(
    dialog,
    /No AI chat, message storage, or automatic forwarding\./,
  );
  assert.match(dialog, /aria-label="Close Ask Sajee"/);
  assert.match(dialog, /href="\/privacy"/);
  assert.doesNotMatch(dialog, /<(?:input|textarea|form|iframe|script)\b/);
});

test("hidden contact dialogs do not pollute generated article Markdown", async () => {
  for (const file of [
    "build/index.md",
    "build/blogs/index.md",
    "build/mentored/index.md",
    "build/awards/index.md",
  ]) {
    const markdown = await readFile(file, "utf8");
    assert.doesNotMatch(markdown, /A contact guide, not live chat\./);
    assert.doesNotMatch(markdown, /What would you like help with\?/);
  }
});

test("privacy and contact pages explain the draft-only handoff", async () => {
  const privacy = await readFile("build/privacy/index.md", "utf8");
  assert.match(privacy, /not live chat or an AI assistant/);
  assert.match(privacy, /does not deliver an email/);
  assert.match(privacy, /excludes search parameters and/);
  assert.match(privacy, /adds no custom analytics events/);
  const contact = await readFile("build/contact/index.md", "utf8");
  assert.match(contact, /Ask Sajee/);
  assert.match(contact, /nothing is sent automatically/);
  assert.match(contact, /copy the address above/);
});
