import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("ads.txt authorizes only the configured Google publisher", async () => {
  const ads = await readFile("build/ads.txt", "utf8");
  assert.equal(
    ads.trim(),
    "google.com, pub-7456507971681343, DIRECT, f08c47fec0942fa0",
  );
  const html = await readFile("build/index.html", "utf8");
  assert.match(
    html,
    /name="google-adsense-account" content="ca-pub-7456507971681343"/,
  );
  assert.doesNotMatch(html, /<script\b[^>]*src="[^"]*adsbygoogle\.js/);
});

test("privacy and contact disclosures are public, crawlable, and linked from the footer", async () => {
  for (const file of ["build/index.html", "build/blogs/index.html"]) {
    const html = await readFile(file, "utf8");
    const footer = html.match(/<footer\b[\s\S]*?<\/footer>/g)?.at(-1);
    assert.ok(footer, `missing footer in ${file}`);
    assert.match(footer, /href="\/privacy"/);
    assert.match(footer, /href="\/contact"/);
  }
  const privacy = await readFile("build/privacy/index.html", "utf8");
  assert.match(privacy, /<h1[^>]*>Privacy Policy<\/h1>/);
  assert.match(privacy, /Google Analytics/);
  assert.match(privacy, /Google AdSense ownership-verification meta tag/);
  assert.match(privacy, /does not itself load an ad script/);
  assert.match(privacy, /third parties, including Google/);
  assert.match(
    privacy,
    /https:\/\/policies\.google\.com\/technologies\/partner-sites/,
  );
  assert.match(privacy, /href="mailto:sajeefx@gmail\.com"/);
  assert.doesNotMatch(
    privacy,
    /<meta\b[^>]*name="robots"[^>]*content="noindex/,
  );
  const contact = await readFile("build/contact/index.html", "utf8");
  assert.match(contact, /<h1[^>]*>Contact<\/h1>/);
  assert.match(contact, /Sajeetharan Sinnathurai/);
  assert.match(contact, /href="mailto:sajeefx@gmail\.com"/);
  assert.match(contact, /href="\/privacy"/);
  const sitemap = await readFile("build/sitemap.xml", "utf8");
  for (const page of ["privacy", "contact"]) {
    assert.ok(
      sitemap.includes(`<loc>https://www.sajeetharan.dev/${page}</loc>`),
      `${page} missing from sitemap`,
    );
    const markdown = await readFile(`build/${page}/index.md`, "utf8");
    assert.match(markdown, /sajeefx@gmail\.com/);
  }
});

test("AdSense ownership is verifiable without loading advertising scripts", async () => {
  for (const file of [
    "build/index.html",
    "build/blogs/index.html",
    "build/blogs/build-an-ai-agent-with-azure-cosmos-db/index.html",
  ]) {
    const html = await readFile(file, "utf8");
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1];
    assert.ok(head, `missing head in ${file}`);
    const tags = head.match(/<meta\b[^>]*name="google-adsense-account"[^>]*>/g);
    assert.equal(tags?.length, 1, `expected one AdSense tag in ${file}`);
    assert.match(tags[0], /content="ca-pub-7456507971681343"/);
    assert.doesNotMatch(html, /<script\b[^>]*src="[^"]*adsbygoogle\.js/);
  }
});

test("blog listings keep their own metadata instead of an excerpt's article SEO", async () => {
  const html = await readFile("build/blogs/index.html", "utf8");
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/)?.[1];
  assert.ok(title);
  assert.match(title, /Developer Tooling, Azure &amp; AI Engineering Blog/);
  assert.doesNotMatch(title, /Build an AI Agent with Azure Cosmos DB/);
  assert.match(
    html,
    /<meta\b[^>]*name="description"[^>]*content="Practical guides to Azure Cosmos DB/,
  );
  assert.doesNotMatch(html, /"@type":"(?:BlogPosting|FAQPage)"/);
  assert.doesNotMatch(html, /property="article:published_time"/);
});

test("individual articles retain their SEO and crawlers can discover the sitemap", async () => {
  const html = await readFile(
    "build/blogs/build-an-ai-agent-with-azure-cosmos-db/index.html",
    "utf8",
  );
  assert.match(
    html,
    /<title\b[^>]*>Build an AI Agent with Azure Cosmos DB \| Sajeetharan<\/title>/,
  );
  assert.match(html, /"@type":"BlogPosting"/);
  assert.match(html, /property="article:published_time"/);
  assert.match(
    html,
    /rel="canonical" href="https:\/\/www\.sajeetharan\.dev\/blogs\/build-an-ai-agent-with-azure-cosmos-db"/,
  );
  const robots = await readFile("build/robots.txt", "utf8");
  assert.match(
    robots,
    /^Sitemap: https:\/\/www\.sajeetharan\.dev\/sitemap\.xml$/m,
  );
});

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

test("homepage preserves section targets and progressive disclosure without a second menu", async () => {
  const html = await readFile("build/index.html", "utf8");
  assert.doesNotMatch(html, /<nav\b[^>]*aria-label="Homepage sections"/);
  for (const section of ["work", "mentoring", "talks", "about", "connect"]) {
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
