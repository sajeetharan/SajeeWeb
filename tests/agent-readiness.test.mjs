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

test("mentoring reviews render compact, source-linked highlights without embeds", async () => {
  const html = await readFile("build/index.html", "utf8");
  const section = html.match(
    /<section\b[^>]*aria-labelledby="mentoring-reviews-title"[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(section, "expected the mentoring reviews section");
  assert.equal((section.match(/<article\b/g) ?? []).length, 3);
  assert.match(section, /Review by Hirish/);
  assert.match(section, /Review by Shruti Solanki/);
  assert.match(section, /Review by Tharu Tharujan/);
  assert.match(
    section,
    /https:\/\/adplist\.org\/mentors\/sajeetharan-sinnathurai/,
  );
  assert.match(section, /https:\/\/topmate\.io\/sajeetharan/);
  assert.match(section, /href="\/mentored"/);
  assert.match(section, /Show 3 more reviews/);
  assert.match(section, /Read full review/);
  assert.match(section, /aria-pressed="true"/);
  assert.doesNotMatch(section, /<iframe\b/);
});

test("homepage offers direct section links and progressive disclosure", async () => {
  const html = await readFile("build/index.html", "utf8");
  assert.match(html, /<nav\b[^>]*aria-label="Homepage sections"/);
  for (const section of ["work", "mentoring", "talks", "about", "connect"]) {
    assert.ok(
      html.includes(`href="#${section}"`),
      `missing ${section} shortcut`,
    );
    assert.ok(html.includes(`id="${section}"`), `missing ${section} target`);
  }
  assert.match(html, /<details\b[^>]*><summary>Read my full story<\/summary>/);
  const biography = html.match(/<details\b[^>]*>/)?.[0];
  assert.ok(
    biography && !/\bopen\b/.test(biography),
    "biography starts collapsed",
  );
  const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
  assert.ok(main);
  assert.doesNotMatch(main, /opacity:0/);
  assert.ok(
    html.indexOf('id="mentoring"') < html.indexOf('id="about"'),
    "reviews should appear before the full biography",
  );
  const recentTalks = html.match(
    /<section\b[^>]*id="talks"[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(recentTalks);
  assert.equal(
    (recentTalks.match(/presentation"|mqdefault\.jpg/g) ?? []).length,
    3,
  );
  assert.match(recentTalks, /href="\/talks"/);
});

test("Get Mentored lists all services with Topmate-only booking links", async () => {
  const html = await readFile("build/mentored/index.html", "utf8");
  const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
  assert.ok(main, "expected the Get Mentored main content");
  assert.match(main, /Choose your next step/);
  assert.doesNotMatch(main, /adplist|<iframe\b/i);
  const cards = main.match(/<article\b[\s\S]*?<\/article>/g) ?? [];
  const services = [
    ["1:1 Mentorship", "2235625", "30 minutes"],
    ["PM Interview Prep", "2333442", "30 minutes"],
    ["Pathway to Product Management", "2255580", "30 minutes"],
    ["Ask me anything", "2333453/pay", "Reply within 2 days"],
    ["Discovery Call", "2235628", "15 minutes"],
  ];
  assert.equal(cards.length, services.length);
  for (const [index, [name, id, duration]] of services.entries()) {
    assert.ok(cards[index].includes(name), `missing service ${name}`);
    assert.ok(cards[index].includes(duration), `missing format for ${name}`);
    assert.ok(
      cards[index].includes(`href="https://topmate.io/sajeetharan/${id}"`),
      `missing direct booking link for ${name}`,
    );
    assert.match(cards[index], /target="_blank" rel="noopener noreferrer"/);
    assert.match(cards[index], /aria-label="[^"]+on Topmate/);
  }
  const links = [...main.matchAll(/<a\b[^>]*href="([^"]+)"/g)];
  assert.equal(links.length, services.length + 1);
  for (const [, href] of links) {
    assert.equal(new URL(href).hostname, "topmate.io");
  }
  const markdown = await readFile("build/mentored/index.md", "utf8");
  assert.match(markdown, /1:1 Mentorship/);
  assert.match(markdown, /https:\/\/topmate\.io\/sajeetharan\/2333442/);
  assert.doesNotMatch(markdown, /adplist/i);
});

test("upcoming conference details stay consistent on homepage and talks page", async () => {
  for (const file of ["build/index.html", "build/talks/index.html"]) {
    const html = await readFile(file, "utf8");
    assert.match(html, /WeAreDevelopers Conference India/);
    assert.match(html, /datetime="2026-11-25"/i);
    assert.match(html, /datetime="2026-11-26"/i);
    assert.match(html, /Bengaluru, India/);
    assert.match(
      html,
      /href="https:\/\/www\.wearedevelopers\.com\/conference-india\/agenda"/,
    );
    assert.doesNotMatch(html, /Azure Cosmos DB Live — August 2026/);
  }
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
