import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import redirects from "../worker/blog-redirects.mjs";

const guide = "building-playful-portfolio-with-consent-first-ai";

test("developer examples use published Markdown and a working resources anchor", async () => {
  const html = await readFile("build/developers/index.html", "utf8");
  assert.match(html, /href="#resources-heading"/);
  assert.match(html, /id="resources-heading"/);
  assert.match(html, /curl https:\/\/www\.sajeetharan\.dev\/index\.md/);
  assert.doesNotMatch(html, /curl -H/);
  assert.match(html, /aria-live="polite" aria-busy="false"/);
  const markdown = await readFile("build/index.md", "utf8");
  assert.match(markdown, /Sajeetharan Sinnathurai/);
  assert.doesNotMatch(markdown, /<!doctype html>/i);
  const index = await readFile("build/llms.txt", "utf8");
  assert.match(index, /GitHub Pages/);
  assert.doesNotMatch(index, /Pages support `Accept/);
  for (const url of [
    "/index.md",
    "/developers/index.md",
    "/blogs/build-an-ai-agent-with-azure-cosmos-db/index.md",
  ]) {
    assert.ok(index.includes(url));
    await readFile(path.join("build", url), "utf8");
  }
});

test("implementation guide is published, discoverable, and links to real local sources", async () => {
  const html = await readFile(`build/blogs/${guide}/index.html`, "utf8");
  const article = await readFile(
    `blog/2026/10/2026-10-30-${guide}/index.md`,
    "utf8",
  );
  for (const phrase of [
    "The portrait does not generate faces",
    "Consent and limits are separate checks",
    "Make unavailability an ordinary state",
    "Verify behavior rather than the presence of a widget",
  ]) {
    assert.ok(html.includes(phrase), `missing explanation: ${phrase}`);
  }
  for (const [, file] of article.matchAll(
    /https:\/\/github\.com\/sajeetharan\/SajeeWeb\/blob\/main\/([^)\s]+)/g,
  )) {
    await readFile(file, "utf8");
  }
  for (const page of ["projects", "developers", "blogs"]) {
    const source = await readFile(`build/${page}/index.html`, "utf8");
    assert.ok(source.includes(`href="/blogs/${guide}"`), page);
  }
  const sitemap = await readFile("build/sitemap.xml", "utf8");
  assert.ok(
    sitemap.includes(`<loc>https://www.sajeetharan.dev/blogs/${guide}</loc>`),
  );
  assert.match(html, /href="\/privacy#hire-me-ai-assistant"/);
});

test("refreshed notes preserve publication dates and expose meaningful update dates", async () => {
  for (const [slug, published, explanation] of [
    [
      "eslint-with-visual-studio-code-vscode",
      "2017-06-04",
      "Verify a diagnostic you can explain",
    ],
    [
      "google-search-tip-for-angular",
      "2017-08-08",
      "Validate the answer before applying it",
    ],
  ]) {
    const url = redirects[`/${published.replaceAll("-", "/")}/${slug}`];
    assert.ok(url, `missing preserved route for ${slug}`);
    const html = await readFile(path.join("build", url, "index.html"), "utf8");
    const data = [
      ...html.matchAll(
        /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
      ),
    ].flatMap(([, json]) => {
      const value = JSON.parse(json);
      return value["@graph"] ?? [value];
    });
    const schema = data.find((item) => item["@type"] === "BlogPosting");
    assert.equal(schema.datePublished.slice(0, 10), published);
    assert.equal(schema.dateModified.slice(0, 10), "2026-10-30");
    assert.ok(html.includes(explanation));
    assert.ok(
      html.includes(
        "https://github.com/sajeetharan/SajeeWeb/edit/main/blog/2017/",
      ),
    );
    assert.doesNotMatch(html, /sajeetharan\/website\/tree\/main/);
    assert.doesNotMatch(html, /name="robots"[^>]*content="noindex/);
  }
});

test("the documented ESLint configuration catches the example and accepts its correction", async () => {
  const article = await readFile(
    "blog/2017/06/2017-06-04-eslint-with-visual-studio-code-vscode/index.md",
    "utf8",
  );
  const examples = [...article.matchAll(/```javascript\n([\s\S]*?)```/g)];
  assert.equal(examples.length, 2);
  const directory = await mkdtemp(path.join(tmpdir(), "sajee-eslint-example-"));
  const config = path.join(directory, "eslint.config.mjs");
  const example = path.join(directory, "example.js");
  const eslint = path.resolve("node_modules/eslint/bin/eslint.js");
  const lint = () =>
    spawnSync(
      process.execPath,
      [eslint, "--config", config, "--format", "json", example],
      {
        cwd: directory,
        env: { ...process.env, ESLINT_USE_FLAT_CONFIG: "true" },
        encoding: "utf8",
      },
    );
  try {
    await writeFile(config, examples[0][1]);
    await writeFile(example, examples[1][1]);
    const invalid = lint();
    assert.equal(invalid.status, 1, invalid.stderr);
    assert.deepEqual(
      JSON.parse(invalid.stdout)[0].messages.map((message) => message.ruleId),
      ["no-unused-vars", "no-undef"],
    );
    await writeFile(example, examples[1][1].replace("answr", "answer"));
    const valid = lint();
    assert.equal(valid.status, 0, valid.stderr);
    assert.equal(JSON.parse(valid.stdout)[0].errorCount, 0);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
