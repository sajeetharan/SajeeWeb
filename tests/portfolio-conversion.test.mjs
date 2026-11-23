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

test("the simplified homepage keeps direct work and mentoring paths", async () => {
  const html = await readFile("build/index.html", "utf8");
  const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/)?.[0];
  assert.ok(main);
  for (const [url, label] of [
    ["/mentored", "Start with a free discovery call"],
  ]) {
    assert.ok(main.includes(`href="${url}"`));
    assert.ok(main.includes(label));
  }
  assert.match(main, /Hi, I&#x27;m Sajee\./);
  assert.match(main, /data-character-pose="tab"/);
  assert.doesNotMatch(main, /Nine moods, one developer|data-portrait-/);
  assert.match(main, /data-mentoring-source="homepage"/);
  assert.match(html, /id="work"[^>]*href="\/projects"/);
  assert.match(main, /Featured projects/);
  assert.match(main, /href="#featured-projects"/);
  const introduction = main.match(/<h1\b[\s\S]*?<\/header>/)?.[0];
  assert.ok(introduction);
  assert.doesNotMatch(introduction, /Microsoft MVP|Google Developer Expert/);
  assert.match(main, /<h2\b[^>]*id="featured-projects"/);
  assert.ok(
    main.indexOf("Featured projects") < main.indexOf("Writing &amp; talks"),
  );
  assert.doesNotMatch(main, /data-line-portrait|data-drawing-path|<details\b/);
  assert.doesNotMatch(main, /&amp;nearr;|&nearr;/);
  assert.doesNotMatch(html, /id="collaborate"/);
});

test("homepage mentoring news renders sourced excerpts with accessible rotation controls", async () => {
  const { officeTestimonials } = await loadTypeScript("src/data/mentoring.ts");
  const html = await readFile("build/index.html", "utf8");
  const news = html.match(
    /<section\b[^>]*data-desk-reviews[^>]*>[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(news);
  const entries = [
    ...news.matchAll(
      /<figure\b[^>]*data-review-id="([^"]+)"[^>]*>([\s\S]*?)<\/figure>/g,
    ),
  ];
  assert.equal(entries.length, officeTestimonials.length);
  assert.equal(new Set(entries.map(([, id]) => id)).size, entries.length);
  for (const item of officeTestimonials) {
    const entry = entries.find(([, id]) => id === item.id);
    assert.ok(entry, item.id);
    assert.ok(entry[2].includes(item.quote), item.id);
  }
  assert.equal((news.match(/data-review-active="true"/g) || []).length, 1);
  assert.match(news, /data-review-source="ADPList"/);
  assert.match(news, /href="https:\/\/topmate\.io\/sajeetharan"/);
  assert.match(news, /<div\b[^>]*aria-live="polite"/);
  assert.match(news, /<button\b[^>]*aria-label="Next review"/);
});

test("featured project evidence is shared and crawlable with explicit source actions", async () => {
  const { projects: featuredProjects } = JSON.parse(
    await readFile("static/profile.json", "utf8"),
  );
  assert.equal(featuredProjects.length, 3);
  assert.equal(new Set(featuredProjects.map((project) => project.id)).size, 3);
  for (const file of [
    "build/index.html",
    "build/career/index.html",
    "build/projects/index.html",
  ]) {
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

test("mentoring promotions appear only on opted-in full posts, including product-building articles", async () => {
  const awards = await readFile("build/awards/index.html", "utf8");
  assert.match(
    awards,
    /<a\b(?=[^>]*href="\/mentored")(?=[^>]*data-mentoring-source="awards")[^>]*>/,
  );
  for (const file of [
    "build/blogs/2017/03/18/2017/03/microsoft-a-big-thank-you/index.html",
    "build/blogs/2020/01/01/2020/01/a-review-of-2019/index.html",
    "build/blogs/why-product-managers-matter-in-the-ai-era/index.html",
    "build/blogs/building-devglobe-with-azure-cosmos-db/index.html",
  ]) {
    const html = await readFile(file, "utf8");
    assert.equal(
      (html.match(/data-mentoring-promotion="true"/g) ?? []).length,
      1,
    );
    assert.match(html, /href="\/mentored"/);
    assert.match(html, /Book a free discovery call/);
    assert.match(html, /href="\/engineer-to-pm-checklist"/);
    assert.match(html, /data-mentoring-action="checklist"/);
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
    for (const source of [
      "homepage",
      "awards",
      "article",
      "mentoring",
      "checklist",
    ]) {
      for (const action of [
        "explore",
        "discovery",
        "mentorship",
        "interview",
        "pathway",
        "question",
        "checklist",
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
    assert.equal(calls.length, 36);
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

test("free PM checklist is crawlable, printable, and linked from mentoring without collecting answers", async () => {
  const html = await readFile(
    "build/engineer-to-pm-checklist/index.html",
    "utf8",
  );
  const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
  assert.ok(main);
  assert.match(main, /PM readiness checklist/);
  assert.match(main, /No email signup/);
  assert.match(main, /not a hiring assessment or a readiness score/);
  assert.match(main, /reset on reload/);
  assert.match(main, /Print or save as PDF/);
  assert.equal((main.match(/type="checkbox"/g) ?? []).length, 10);
  assert.equal((main.match(/<label\b/g) ?? []).length, 10);
  for (const input of main.matchAll(/<input\b[^>]*id="([^"]+)"[^>]*>/g)) {
    assert.ok(main.includes(`for="${input[1]}"`));
  }
  assert.match(
    main,
    /<a\b(?=[^>]*href="https:\/\/topmate.io\/sajeetharan\/2235628")(?=[^>]*data-mentoring-source="checklist")(?=[^>]*data-mentoring-action="discovery")[^>]*>/,
  );
  assert.doesNotMatch(main, /<form\b|type="email"|<iframe\b/);
  const mentoring = await readFile("build/mentored/index.html", "utf8");
  assert.match(
    mentoring,
    /<a\b(?=[^>]*href="\/engineer-to-pm-checklist")(?=[^>]*data-mentoring-source="mentoring")(?=[^>]*data-mentoring-action="checklist")[^>]*>/,
  );
  const markdown = await readFile(
    "build/engineer-to-pm-checklist/index.md",
    "utf8",
  );
  for (const text of [
    "Know why you want the role",
    "Start with a customer problem",
    "Practice product trade-offs",
    "Translate engineering experience into evidence",
    "Choose a practical next step",
    "Turn one gap into a plan",
  ]) {
    assert.ok(markdown.includes(text), text);
  }
  const privacy = await readFile("build/privacy/index.md", "utf8");
  assert.match(privacy, /does not save or transmit your checkbox selections/);
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
