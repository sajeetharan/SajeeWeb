import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("homepage is meaningful without JavaScript", async () => {
  const html = await readFile("build/index.html", "utf8");
  const text = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  assert.match(html, /<h1\b[^>]*>Sajeetharan Sinnathurai<\/h1>/);
  assert.ok(
    text.length >= 500,
    `expected at least 500 text characters, got ${text.length}`,
  );
});

test("build contains recovery, developer, and Markdown artifacts", async () => {
  const notFound = await readFile("build/404.html", "utf8");
  const developerPortal = await readFile("build/developers/index.html", "utf8");
  const homepageMarkdown = await readFile("build/index.md", "utf8");
  const llms = await readFile("build/llms.txt", "utf8");
  assert.match(notFound, /href="https:\/\/www\.sajeetharan\.dev\/llms\.txt"/);
  assert.match(
    notFound,
    /href="https:\/\/www\.sajeetharan\.dev\/sitemap\.xml"/,
  );
  assert.match(developerPortal, /<h1[^>]*>Build with the public content/);
  assert.match(developerPortal, /Access and API keys/);
  assert.match(developerPortal, /Read-only sandbox/);
  assert.match(homepageMarkdown, /^# Sajeetharan Sinnathurai/m);
  assert.match(llms, /^# Sajeetharan Sinnathurai/m);
});

test("machine-readable metadata uses the canonical domain", async () => {
  const catalog = await readFile("build/.well-known/api-catalog", "utf8");
  assert.doesNotMatch(catalog, /sajeetharan\.github\.io/);
  assert.match(catalog, /https:\/\/www\.sajeetharan\.dev/);
});

test("agent skill digests match their published files", async () => {
  const index = JSON.parse(
    await readFile("build/.well-known/agent-skills/index.json", "utf8"),
  );
  for (const skill of index.skills) {
    const relativePath = new URL(skill.url).pathname.replace(/^\//, "");
    const content = await readFile(`build/${relativePath}`);
    const digest = `sha256:${createHash("sha256").update(content).digest("hex")}`;
    assert.equal(skill.digest, digest, `digest mismatch for ${skill.name}`);
  }
});
