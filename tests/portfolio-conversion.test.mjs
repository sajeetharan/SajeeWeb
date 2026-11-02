import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

async function loadTypeScript(file) {
  const source = await readFile(file, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
  });
  return import(
    `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
  );
}

test("the homepage keeps the original visible interactive portrait and simple work path", async () => {
  const html = await readFile("build/index.html", "utf8");
  const hero = html.match(/<header\b[^>]*>[\s\S]*?<\/header>/)?.[0];
  assert.ok(hero);
  for (const [url, label] of [
    ["/projects", "Explore my work"],
    ["/mentored", "Book mentoring"],
  ]) {
    assert.ok(hero.includes(`href="${url}"`));
    assert.ok(hero.includes(label));
  }
  assert.match(hero, /I help developers build what/);
  assert.match(hero, /data-portrait-playground="true"/);
  assert.match(hero, /id="slap-portrait" tabindex="-1"/);
  assert.match(hero, /aria-label="Slap my photo"/);
  assert.doesNotMatch(hero, /<details\b|Meet the human/);
  assert.doesNotMatch(html, /id="collaborate"/);
});

test("featured project evidence is shared and crawlable with explicit source actions", async () => {
  const { featuredProjects } = await loadTypeScript(
    "src/data/featured-projects.ts",
  );
  assert.equal(featuredProjects.length, 3);
  assert.equal(new Set(featuredProjects.map((project) => project.id)).size, 3);
  for (const file of ["build/career/index.html", "build/projects/index.html"]) {
    const html = await readFile(file, "utf8");
    for (const project of featuredProjects) {
      assert.ok(html.includes(project.title), `${file}: ${project.title}`);
      assert.ok(html.includes(`href="${project.url}"`));
      assert.ok(html.includes(`data-portfolio-project="${project.id}"`));
    }
  }
  const career = await readFile("build/career/index.html", "utf8");
  for (const project of featuredProjects)
    assert.ok(career.includes(project.outcome));
  assert.match(career, /data-portfolio-action="source"/);
});

test("career and contact provide direct recruiter and collaboration journeys without AI", async () => {
  const career = await readFile("build/career/index.html", "utf8");
  for (const text of [
    "Engineering depth. Product leadership.",
    "Selected shipped work",
    "Professional experience",
    "Start a conversation",
  ]) {
    assert.ok(career.includes(text));
  }
  assert.match(career, /href="\/contact#recruiters"/);
  assert.doesNotMatch(career, /id="hire-me-question"/);
  const contact = await readFile("build/contact/index.html", "utf8");
  for (const [id, audience] of [
    ["recruiters", "recruiter"],
    ["collaboration", "collaborator"],
    ["speaking", "speaking"],
  ]) {
    assert.ok(contact.includes(`id="${id}"`));
    assert.match(
      contact,
      new RegExp(
        `<a\\b[^>]*href="mailto:[^"]+"[^>]*data-portfolio-contact="${audience}"`,
      ),
    );
  }
  assert.match(contact, /nothing is sent automatically/);
  assert.match(contact, /copy the address above/);
});

test("portfolio analytics are safe in SSR and when analytics is missing", async () => {
  const { trackPortfolioEvent, trackPortfolioClick } = await loadTypeScript(
    "src/utils/portfolio-analytics.ts",
  );
  assert.doesNotThrow(() => trackPortfolioEvent({ name: "career_view" }));
  globalThis.window = {};
  try {
    assert.doesNotThrow(() => trackPortfolioEvent({ name: "career_view" }));
    assert.doesNotThrow(() =>
      trackPortfolioClick({
        portfolioProject: "devglobe",
        portfolioAction: "source",
      }),
    );
  } finally {
    delete globalThis.window;
  }
});

test("portfolio events send fixed action metadata, never URLs, drafts, or text", async () => {
  const { trackPortfolioEvent, trackPortfolioClick } = await loadTypeScript(
    "src/utils/portfolio-analytics.ts",
  );
  const calls = [];
  globalThis.window = { gtag: (...args) => calls.push(args) };
  try {
    trackPortfolioEvent({ name: "career_view" });
    for (const action of ["source", "demo", "guide"]) {
      trackPortfolioClick({
        portfolioProject: "devglobe",
        portfolioAction: action,
        href: "mailto:private@example.test?body=private-message",
        textContent: "private-message",
      });
    }
    for (const audience of ["recruiter", "collaborator", "speaking"]) {
      trackPortfolioClick({
        portfolioContact: audience,
        subject: "private-subject",
      });
    }
    trackPortfolioClick({});
    trackPortfolioClick({ portfolioContact: "unknown" });
    trackPortfolioClick({
      portfolioProject: "devglobe",
      portfolioAction: "other",
    });
    assert.equal(calls.length, 7);
    assert.deepEqual(calls[0], [
      "event",
      "career_view",
      { transport_type: "beacon" },
    ]);
    assert.deepEqual(calls[1], [
      "event",
      "project_click",
      { project_id: "devglobe", action: "source", transport_type: "beacon" },
    ]);
    assert.deepEqual(calls[4], [
      "event",
      "contact_click",
      { audience: "recruiter", transport_type: "beacon" },
    ]);
    assert.doesNotMatch(JSON.stringify(calls), /private|mailto|example\.test/);
  } finally {
    delete globalThis.window;
  }
});

test("privacy documents intent events without claiming confirmed enquiries", async () => {
  const privacy = await readFile("build/privacy/index.md", "utf8");
  assert.match(privacy, /career-page views/);
  assert.match(privacy, /does not confirm that an enquiry was sent/);
  assert.match(privacy, /not email addresses/);
});
