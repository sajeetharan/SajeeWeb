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
    ["/mentored", "Start with a free discovery call"],
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
  const { projects: featuredProjects } = JSON.parse(
    await readFile("static/profile.json", "utf8"),
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
  assert.doesNotThrow(() => trackPortfolioEvent({ name: "mentoring_view" }));
  globalThis.window = {};
  try {
    assert.doesNotThrow(() => trackPortfolioEvent({ name: "career_view" }));
    assert.doesNotThrow(() => trackPortfolioEvent({ name: "mentoring_view" }));
    assert.doesNotThrow(() =>
      trackPortfolioClick({
        mentoringSource: "mentoring",
        mentoringAction: "discovery",
      }),
    );
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

test("mentoring landing page leads with a free call, approved proof, and actionable services", async () => {
  const html = await readFile("build/mentored/index.html", "utf8");
  const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
  assert.ok(main);
  assert.match(main, /From engineering to Product Management\./);
  assert.match(main, /Helping engineers transition into Product Management/);
  const freeCall = main.indexOf("Book a free 15-minute discovery call");
  const testimonials = main.indexOf('id="mentoring-testimonials-title"');
  const services = main.indexOf('id="mentoring-services-title"');
  assert.ok(
    freeCall >= 0 && freeCall < testimonials && testimonials < services,
  );
  assert.equal((main.match(/<figure\b/g) ?? []).length, 2);
  for (const quote of [
    "He shared valuable insights about transitioning into Product Management",
    "I left the session motivated, with concrete steps to take forward",
  ]) {
    assert.ok(main.includes(quote));
  }
  assert.match(main, /Read the original reviews on Topmate/);
  assert.match(
    main,
    /For engineers considering a move into Product Management/,
  );
  assert.match(main, /For candidates with an upcoming PM interview/);
  assert.match(main, /not guaranteed jobs/);
  assert.doesNotMatch(main, /5\/5|eight ratings|<iframe\b/);
  const markdown = await readFile("build/mentored/index.md", "utf8");
  assert.match(markdown, /concrete steps to take forward/);
});

test("mentoring promotions are contextual and excluded from technical posts and previews", async () => {
  const awards = await readFile("build/awards/index.html", "utf8");
  assert.match(
    awards,
    /<a\b(?=[^>]*href="\/mentored")(?=[^>]*data-mentoring-source="awards")[^>]*>/,
  );
  for (const file of [
    "build/blogs/2017/03/18/2017/03/microsoft-a-big-thank-you/index.html",
    "build/blogs/2020/01/01/2020/01/a-review-of-2019/index.html",
  ]) {
    const html = await readFile(file, "utf8");
    assert.equal(
      (html.match(/data-mentoring-promotion="true"/g) ?? []).length,
      1,
    );
    assert.match(html, /href="\/mentored#service-2255580"/);
    assert.match(html, /data-mentoring-source="article"/);
  }
  for (const file of [
    "build/blogs/index.html",
    "build/blogs/angular-exception-handling-mechanism/index.html",
  ]) {
    const html = await readFile(file, "utf8");
    assert.doesNotMatch(html, /data-mentoring-promotion="true"/);
  }
});

test("mentoring analytics uses fixed placement and action labels without booking claims", async () => {
  const { trackPortfolioClick, trackPortfolioEvent } = await loadTypeScript(
    "src/utils/portfolio-analytics.ts",
  );
  const calls = [];
  globalThis.window = { gtag: (...args) => calls.push(args) };
  try {
    trackPortfolioEvent({ name: "mentoring_view" });
    for (const source of ["homepage", "awards", "article", "mentoring"]) {
      for (const action of [
        "explore",
        "discovery",
        "mentorship",
        "interview",
        "pathway",
        "question",
      ]) {
        trackPortfolioClick({
          mentoringSource: source,
          mentoringAction: action,
          href: "https://topmate.io/private",
          textContent: "private-text",
        });
      }
    }
    trackPortfolioClick({
      mentoringSource: "private",
      mentoringAction: "discovery",
    });
    trackPortfolioClick({
      mentoringSource: "mentoring",
      mentoringAction: "payment",
    });
    assert.equal(calls.length, 25);
    assert.deepEqual(calls[0], [
      "event",
      "mentoring_view",
      { transport_type: "beacon" },
    ]);
    assert.deepEqual(calls[2], [
      "event",
      "mentoring_click",
      { source: "homepage", action: "discovery", transport_type: "beacon" },
    ]);
    assert.doesNotMatch(JSON.stringify(calls), /private|payment|topmate/);
  } finally {
    delete globalThis.window;
  }
  const privacy = await readFile("build/privacy/index.md", "utf8");
  assert.match(privacy, /not completed Topmate bookings/);
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
