import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const profile = JSON.parse(await readFile("static/profile.json", "utf8"));
const origin = new URL(profile.url).origin;

function schemas(html) {
  return [
    ...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].flatMap(([, value]) => {
    const data = JSON.parse(value);
    return data["@graph"] ?? [data];
  });
}

function plainText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

test("the public JSON is the unchanged, dated source of professional identity and evidence", async () => {
  const published = JSON.parse(await readFile("build/profile.json", "utf8"));
  assert.deepEqual(published, profile);
  assert.equal(profile.schemaVersion, "1.0");
  assert.equal(profile.id, `${origin}/#person`);
  assert.equal(profile.jobTitle, "Principal Product Manager");
  assert.equal(profile.careerHistory[0].role, profile.jobTitle);
  assert.equal(profile.careerHistory[0].company, profile.employer.name);
  assert.match(profile.lastUpdated, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(Number.isFinite(Date.parse(profile.lastUpdated)));
  assert.ok(Date.parse(profile.lastUpdated) <= Date.now());
  assert.ok(profile.expertise.includes("Developer Experience"));
  assert.ok(profile.expertise.includes("Azure Cosmos DB"));
  assert.ok(profile.expertise.includes("Coding Agents"));
  assert.ok(profile.availability.includes("does not confirm"));
  assert.equal(profile.contactUrl, `${origin}/contact`);
  for (const url of [
    profile.profilePage,
    profile.contactUrl,
    ...profile.sources,
  ]) {
    assert.equal(new URL(url).origin, origin);
    await readFile(path.join("build", new URL(url).pathname, "index.html"));
  }
  for (const project of profile.projects) {
    assert.ok(project.role && project.contribution && project.outcome);
    assert.match(project.url, /^https:\/\/github\.com\//);
    if (project.guide) {
      await readFile(
        path.join(
          "build",
          new URL(project.guide, profile.url).pathname,
          "index.html",
        ),
      );
    }
  }
});

test("homepage and career schemas share one accurate Person and connect the ProfilePage", async () => {
  for (const page of ["build/index.html", "build/career/index.html"]) {
    const html = await readFile(page, "utf8");
    const data = schemas(html);
    const people = data.filter((item) => item["@type"] === "Person");
    assert.equal(people.length, 1, page);
    const [person] = people;
    assert.equal(person["@id"], profile.id);
    assert.equal(person.name, profile.name);
    assert.equal(person.url, profile.url);
    assert.equal(person.jobTitle, profile.jobTitle);
    assert.equal(person.worksFor.name, profile.employer.name);
    assert.deepEqual(person.knowsAbout, profile.expertise);
    assert.deepEqual(person.sameAs, Object.values(profile.profiles));
    assert.equal(
      person.mainEntityOfPage["@id"],
      `${profile.profilePage}#profile`,
    );
    assert.doesNotMatch(html, /Principal Program Manager/);
    const text = plainText(html);
    assert.ok(text.includes(`${profile.jobTitle} at ${profile.employer.name}`));
  }
  const career = await readFile("build/career/index.html", "utf8");
  const profilePage = schemas(career).find(
    (item) => item["@type"] === "ProfilePage",
  );
  assert.ok(profilePage);
  assert.equal(profilePage["@id"], `${profile.profilePage}#profile`);
  assert.equal(profilePage.mainEntity["@id"], profile.id);
  assert.equal(profilePage.url, profile.profilePage);
  assert.equal(profilePage.dateModified, profile.lastUpdated);
  const visible = plainText(career);
  assert.ok(visible.includes(profile.summary));
  for (const entry of profile.careerHistory) {
    for (const value of [
      entry.role,
      entry.company,
      entry.period,
      ...entry.description,
    ]) {
      assert.ok(visible.includes(value), `missing public evidence: ${value}`);
    }
  }
  for (const project of profile.projects) {
    assert.ok(visible.includes(project.title));
    assert.ok(visible.includes(project.outcome));
  }
  for (const url of Object.values(profile.profiles)) {
    assert.ok(career.includes(`href="${url}"`));
  }
});

test("published article identity connects to the same person without changing author roles", async () => {
  const sitemap = await readFile("build/sitemap.xml", "utf8");
  let owned = 0;
  for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const pathname = new URL(url).pathname;
    if (!pathname.startsWith("/blogs/")) continue;
    const html = await readFile(
      path.join("build", decodeURIComponent(pathname), "index.html"),
      "utf8",
    );
    const article = schemas(html).find(
      (item) => item["@type"] === "BlogPosting",
    );
    if (!article) continue;
    assert.equal(article.publisher["@id"], profile.id);
    for (const author of article.author) {
      if (author.name !== profile.name) continue;
      assert.equal(author["@id"], profile.id);
      assert.equal(author.url, profile.url);
      owned++;
    }
  }
  assert.ok(owned >= 124, `only verified ${owned} article author identities`);
  const faq = JSON.parse(await readFile("src/data/hire-me.json", "utf8"));
  assert.equal(faq.name, profile.name);
  assert.equal(faq.role, `${profile.jobTitle} at ${profile.employer.name}`);
  const author = await readFile("blog/authors.yml", "utf8");
  assert.ok(author.includes(`name: ${profile.name}`));
  assert.ok(author.includes(`title: ${faq.role}`));
});

test("agents can discover the profile through HTML, visible links, catalog, Markdown, and skills", async () => {
  for (const page of [
    "index",
    "career/index",
    "developers/index",
    "projects/index",
  ]) {
    const html = await readFile(`build/${page}.html`, "utf8");
    const head = html.match(/<head\b[^>]*>[\s\S]*?<\/head>/)?.[0];
    assert.ok(head);
    assert.match(
      head,
      /<link\b[^>]*rel="describedby"[^>]*href="\/profile\.json"[^>]*type="application\/json"/,
    );
    assert.doesNotMatch(head, /name="robots"[^>]*content="noindex/);
  }
  for (const page of ["career", "developers"]) {
    const html = await readFile(`build/${page}/index.html`, "utf8");
    assert.match(html, /<a\b[^>]*href="\/profile\.json"/);
    const markdown = await readFile(`build/${page}/index.md`, "utf8");
    assert.ok(markdown.includes("/profile.json"));
  }
  const catalog = JSON.parse(
    await readFile("build/.well-known/api-catalog", "utf8"),
  );
  const resource = catalog.linkset.find(
    (item) => item.anchor === `${origin}/profile.json`,
  );
  assert.ok(resource);
  assert.equal(resource["service-desc"][0].type, "application/json");
  assert.equal(resource["service-doc"][0].href, profile.profilePage);
  const llms = await readFile("build/llms.txt", "utf8");
  assert.ok(llms.includes(`${profile.jobTitle} at ${profile.employer.name}`));
  assert.ok(llms.includes(`${origin}/profile.json`));
  assert.ok(llms.includes(`${profile.profilePage}/index.md`));
  assert.doesNotMatch(llms, /Principal Program Manager/);
  const skill = await readFile(
    "build/.well-known/agent-skills/site-navigation/SKILL.md",
    "utf8",
  );
  assert.ok(skill.includes(`${origin}/profile.json`));
  assert.ok(skill.includes(profile.id));
  const sitemap = await readFile("build/sitemap.xml", "utf8");
  assert.ok(sitemap.includes(`<loc>${profile.profilePage}</loc>`));
});

test("public discovery keeps existing crawl access and training preferences", async () => {
  const robots = await readFile("build/robots.txt", "utf8");
  assert.match(robots, /User-agent: \*\s+Disallow:\s*\r?\n/);
  assert.match(robots, /Content-Signal: ai-train=no, search=yes, ai-input=yes/);
  assert.match(
    robots,
    /Sitemap: https:\/\/www\.sajeetharan\.dev\/sitemap\.xml/,
  );
});
