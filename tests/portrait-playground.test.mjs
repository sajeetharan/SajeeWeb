import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile("src/data/portrait-reactions.ts", "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
  },
});
const { EXPRESSIONS, PORTRAIT_TOOLS, getPortraitReaction } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);

test("all nine portraits are distinct optimized WebP crops without missing expressions", async () => {
  assert.equal(EXPRESSIONS.length, 9);
  assert.equal(new Set(EXPRESSIONS.map((item) => item.id)).size, 9);
  const files = await readdir("static/img/expressions");
  assert.equal(files.length, 9);
  let total = 0;
  const contents = new Set();
  for (const expression of EXPRESSIONS) {
    const file = `static/img/expressions/${expression.id}.webp`;
    const image = await readFile(file);
    contents.add(image.toString("base64"));
    assert.equal(image.toString("ascii", 8, 12), "WEBP");
    const { size } = await stat(file);
    assert.ok(size < 25_000);
    total += size;
    assert.equal(expression.cheeks.length, 4);
    assert.equal(expression.nose.length, 2);
  }
  assert.ok(total < 150_000);
  assert.equal(contents.size, 9);
});

test("every prop has deterministic expression reactions with independent use counts", () => {
  const known = new Set(EXPRESSIONS.map((item) => item.id));
  assert.equal(PORTRAIT_TOOLS.length, 6);
  for (const tool of PORTRAIT_TOOLS) {
    for (let uses = 1; uses <= 20; uses++) {
      const reaction = getPortraitReaction(tool.id, uses);
      assert.ok(known.has(reaction.expression));
      assert.deepEqual(Object.keys(reaction).sort(), [
        "bleeding",
        "expression",
        "redness",
        "tears",
      ]);
      assert.ok(reaction.redness >= 0 && reaction.redness <= 0.75);
      assert.equal(reaction.tears, tool.id === "slap" || tool.id === "punch");
      if (reaction.tears) {
        const expression = EXPRESSIONS.find(
          (item) => item.id === reaction.expression,
        );
        assert.equal(expression.eyes?.length, 4);
        expression.eyes.forEach((value, index) => {
          assert.ok(Number.isFinite(value));
          assert.ok(value > 0 && value < (index % 2 === 0 ? 480 : 320));
        });
      }
    }
    const reachable = new Set(
      PORTRAIT_TOOLS.flatMap((tool) =>
        [1, 2, 3].map((uses) => getPortraitReaction(tool.id, uses).expression),
      ),
    );
    assert.deepEqual(reachable, known, "props must still reach all nine moods");
  }
  assert.equal(getPortraitReaction("punch", 1).expression, "anger");
  assert.equal(getPortraitReaction("punch", 2).expression, "sadness");
  assert.equal(getPortraitReaction("punch", 2).bleeding, false);
  assert.equal(getPortraitReaction("punch", 3).bleeding, true);
  assert.ok(
    getPortraitReaction("pinch", 2).redness >
      getPortraitReaction("pinch", 1).redness,
  );
  assert.equal(getPortraitReaction("pinch", 100).redness, 0.75);
  for (const tool of ["tickle", "flower", "spider"]) {
    assert.equal(getPortraitReaction(tool, 10).redness, 0);
    assert.equal(getPortraitReaction(tool, 10).bleeding, false);
  }
  for (const invalid of [0, -1, 0.5, NaN, Infinity]) {
    assert.throws(() => getPortraitReaction("slap", invalid), RangeError);
  }
});

test("homepage exposes accessible props and nine photos without settings or instructions", async () => {
  const html = await readFile("build/index.html", "utf8");
  assert.equal(
    (html.match(/data-portrait-playground="true"/g) ?? []).length,
    1,
  );
  assert.match(html, /aria-label="Choose a portrait prop"/);
  assert.doesNotMatch(
    html,
    /Choose a portrait playground|Stretch &amp; grow|data-stretch-portrait/,
  );
  assert.match(html, /<h2\b[^>]*>Nine moods, one developer<\/h2>/);
  assert.match(html, /aria-label="Slap my photo"/);
  assert.match(html, /role="status" aria-atomic="true"/);
  assert.doesNotMatch(html, /expressionBadge_/);
  for (const expression of EXPRESSIONS) {
    assert.ok(
      !html.includes(`${expression.rasa} / ${expression.label}`),
      "expression names must not appear as a visible photo badge",
    );
  }
  assert.doesNotMatch(
    html,
    /Explore all nine expressions|Navarasa expressions/,
  );
  assert.doesNotMatch(
    html,
    /Enable mild nosebleed|Choose a prop\.|Click, tap, or swipe the photo|Enter or Space works|Real supplied portraits|Please be nice to the human/,
  );
  assert.doesNotMatch(html, /type="checkbox"/);
  const description = html.match(
    /aria-label="Slap my photo" aria-describedby="([^"]+)"/,
  )?.[1];
  assert.ok(description?.endsWith("-expression"));
  assert.ok(html.includes(`id="${description}"`));
  assert.match(
    html,
    /class="srOnly_[^"]*" role="status" aria-atomic="true">Affection<\/p>/,
  );
  assert.doesNotMatch(
    html,
    /Reset scene|My face has entered the chat|feature request I can love|>\d+ reactions?[.<]/,
  );
  assert.doesNotMatch(html, /data-nosebleed/);
  assert.doesNotMatch(html, /data-tears/);
  for (const expression of EXPRESSIONS) {
    assert.ok(html.includes(`/img/expressions/${expression.id}.webp`));
  }
  assert.match(html, /id="slap-portrait" tabindex="-1"/);
});

test("active portrait visibility survives production CSS optimization", async () => {
  const files = await readdir("build/assets/css");
  const css = (
    await Promise.all(
      files
        .filter((file) => file.endsWith(".css"))
        .map((file) => readFile(`build/assets/css/${file}`, "utf8")),
    )
  ).join("\n");
  assert.match(
    css,
    /\.expressionImage_[\w-]+\[aria-hidden=(?:"false"|false)\][^{]*\{[^}]*display:block/,
  );
  assert.doesNotMatch(
    css,
    /@keyframes\s+[\w-]+\s*\{(?:[^{}]*\{[^{}]*\})*[^{}]*@keyframes/,
    "contact animations must not be nested inside other keyframes",
  );
  const tearAnimation = css.match(/\.tearDrop_[\w-]+\{animation:([^;}]+)/)?.[1];
  assert.ok(tearAnimation);
  assert.doesNotMatch(tearAnimation, /none|infinite/);
  const reducedMotionRules = [
    ...css.matchAll(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\{((?:[^{}]*\{[^{}]*\})*)\}/g,
    ),
  ];
  assert.ok(
    reducedMotionRules.some(([, rules]) =>
      /\.tearDrop_[\w-]+[^{}]*\{[^{}]*animation:none/.test(rules),
    ),
    "reduced-motion mode must keep tears still",
  );
});
