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
const {
  EXPRESSIONS,
  PORTRAIT_TOOLS,
  getPortraitReaction,
  getPortraitFeedback,
} = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);

test("portrait jokes appear only every third interaction without a project promotion", () => {
  for (const tool of PORTRAIT_TOOLS) {
    assert.ok(tool.quip.length > 0 && tool.quip.length <= 60);
    for (let count = 0; count <= 12; count++) {
      const feedback = getPortraitFeedback(tool.id, count);
      assert.equal(
        feedback.caption,
        count > 0 && count % 3 === 0 ? tool.quip : undefined,
      );
      assert.deepEqual(Object.keys(feedback), ["caption"]);
    }
  }
  assert.equal(
    getPortraitFeedback("tickle", 3).caption,
    "Finally, a gentle code review.",
  );
  assert.equal(
    getPortraitFeedback("flower", 6).caption,
    "Your feature request has been prioritized.",
  );
  assert.equal(
    getPortraitFeedback("spider", 9).caption,
    "Found the production bug.",
  );
  assert.equal(new Set(PORTRAIT_TOOLS.map((tool) => tool.quip)).size, 6);
  for (const invalid of [-1, 0.5, NaN, Infinity]) {
    assert.throws(() => getPortraitFeedback("slap", invalid), RangeError);
  }
  assert.throws(
    () => getPortraitFeedback("unknown", 0),
    /Unknown portrait tool/,
  );
});

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

test("the office shows one lifelike pose without playful actions or a separate panel", async () => {
  const html = await readFile("build/index.html", "utf8");
  assert.doesNotMatch(
    html,
    /Nine moods, one developer|data-portrait-|portrait-reaction-status|Slap my portrait|Play with my portrait/,
  );
  const button = html.match(
    /<button\b(?=[^>]*data-agentic-trigger="head")[^>]*>[\s\S]*?<\/button>/,
  )?.[0];
  assert.ok(button);
  assert.match(button, /type="button"/);
  assert.match(button, /aria-label="[^"]+"/);
  assert.match(button, /aria-label="How I use coding agents"/);
  const images = [
    ...html.matchAll(/<image\b[^>]*data-character-pose="([^"]+)"[^>]*>/g),
  ];
  assert.equal(images.length, 3);
  assert.equal(images.filter(([tag]) => tag.includes('opacity="1"')).length, 1);
  for (const pose of ["phone", "tab", "pray"]) {
    assert.ok(html.includes(`/img/office-character/${pose}.webp`));
  }
  assert.doesNotMatch(html, /data-nosebleed|data-tears|data-cheek-redness/);
  assert.doesNotMatch(
    html,
    /data-line-portrait|data-drawing-path|data-greeting-eyes|Reveal original photo/,
  );
  assert.match(html, /<h1\b[^>]*>Hi, I&#x27;m Sajee\.<\/h1>/);
});

test("the realistic portrait reserves scene space and disables pose transitions for reduced motion", async () => {
  const files = await readdir("build/assets/css");
  const css = (
    await Promise.all(
      files
        .filter((file) => file.endsWith(".css"))
        .map((file) => readFile(`build/assets/css/${file}`, "utf8")),
    )
  ).join("\n");
  assert.match(css, /\.scene_[\w-]+\{[^}]*aspect-ratio:3\/2/);
  assert.doesNotMatch(css, /\.portraitTools_[\w-]+|\.reactionProp_[\w-]+/);
  const reducedMotionRules = [
    ...css.matchAll(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\{((?:[^{}]*\{[^{}]*\})*)\}/g,
    ),
  ];
  assert.ok(
    reducedMotionRules.some(([, rules]) =>
      /\.scene_[\w-]+ \.characterPose_[\w-]+[^{}]*\{[^{}]*transition:none/.test(
        rules,
      ),
    ),
    "reduced-motion mode must disable pose crossfades",
  );
});

test("independent office objects provide navigation with Projects, GitHub, and Instagram", async () => {
  const html = await readFile("build/index.html", "utf8");
  assert.equal((html.match(/data-developer-desk="true"/g) ?? []).length, 1);
  const nav = html.match(
    /<nav\b[^>]*aria-label="Explore my developer desk"[^>]*>[\s\S]*?<\/nav>/,
  )?.[0];
  assert.ok(nav);
  assert.equal((nav.match(/<a\b/g) ?? []).length, 8);
  for (const [route, label] of [
    ["/blogs", "Blogs"],
    ["/talks", "Talks"],
    ["/projects", "Projects"],
    ["/awards", "Awards"],
    ["/mentored", "Get Mentored"],
    ["/developers", "Developers"],
  ]) {
    const link = nav.match(
      new RegExp(`<a\\b[^>]*href="${route}"[^>]*>[\\s\\S]*?<\\/a>`),
    )?.[0];
    assert.ok(link, route);
    assert.ok(link.includes(`aria-label="${label}"`));
  }
  assert.match(
    nav,
    /<a\b(?=[^>]*data-desk-object="noticeboard")(?=[^>]*href="\/projects")[^>]*><svg\b[\s\S]*?<text\b[^>]*>My<\/text><text\b[^>]*>Projects<\/text>[\s\S]*?<\/svg>/,
  );
  assert.match(
    nav,
    /<a\b(?=[^>]*data-desk-object="instagram")(?=[^>]*href="https:\/\/www.instagram.com\/sajeetharan\/")(?=[^>]*aria-label="Instagram")[^>]*><svg\b[^>]*aria-hidden="true"[^>]*>/,
  );
  assert.match(
    nav,
    /<a\b(?=[^>]*data-desk-object="github")(?=[^>]*href="https:\/\/github.com\/sajeetharan")(?=[^>]*aria-label="GitHub")[^>]*><svg\b[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/svg>/,
  );
  assert.doesNotMatch(nav, /<image\b|<script\b|gkoberger/);
  assert.match(
    html,
    /<svg\b(?=[^>]*viewBox="0 0 1200 800")(?=[^>]*width="1200")(?=[^>]*height="800")(?=[^>]*role="img")(?=[^>]*aria-label="An original illustrated office with a lifelike portrait of Sajeetharan)[^>]*>/,
  );
  assert.match(
    html,
    /<button\b(?=[^>]*type="button")(?=[^>]*data-agentic-trigger="head")(?=[^>]*aria-label="How I use coding agents")[^>]*>/,
  );
  assert.doesNotMatch(html, /id="slap-portrait"/);
});

test("the office includes Microsoft branding and existing MVP and GDE award photographs", async () => {
  const html = await readFile("build/index.html", "utf8");
  const brand = html.match(
    /<g\b[^>]*data-office-brand="microsoft"[^>]*>([\s\S]*?)<\/g>/,
  )?.[1];
  assert.ok(brand);
  assert.match(
    html,
    /<a\b(?=[^>]*data-office-employer-link="true")(?=[^>]*href="https:\/\/in\.linkedin\.com\/in\/sajeetharan")(?=[^>]*aria-label="Microsoft: view my LinkedIn profile")[^>]*>/,
  );
  for (const color of ["#f25022", "#7fba00", "#00a4ef", "#ffb900"]) {
    assert.ok(brand.includes(`fill="${color}"`));
  }
  for (const award of ["mvp", "gde"]) {
    const frame = html.match(
      new RegExp(
        `<g\\b[^>]*data-office-award="${award}"[^>]*>([\\s\\S]*?)<\\/g>`,
      ),
    )?.[1];
    assert.ok(frame);
    assert.ok(frame.includes(`/img/awards/thumbnails/${award}.webp`));
    await stat(`static/img/awards/thumbnails/${award}.webp`);
  }
  assert.match(html, /MVP 2017-2019/);
  assert.match(html, /Google Developer Expert award photographs on the wall/);
});

test("office navigation has persistent destination labels without instruction text", async () => {
  const html = await readFile("build/index.html", "utf8");
  assert.doesNotMatch(
    html,
    /desk-explore-prompt|Take a look around|Tap or click an object to explore/,
  );
  const links = [
    ...html.matchAll(/<a\b[^>]*data-desk-object="[^"]+"[^>]*>([\s\S]*?)<\/a>/g),
  ];
  assert.equal(links.length, 8);
  for (const [, content] of links) {
    assert.match(
      content,
      /<span\b(?=[^>]*data-desk-click-cue="true")(?=[^>]*aria-hidden="true")[^>]*><svg\b/,
    );
    assert.match(
      content,
      /<span\b[^>]*data-desk-label="[^"]+"[^>]*>[^<]+<\/span>/,
    );
  }
  assert.doesNotMatch(html, /data-desk-invited="true"/);
  const cssFiles = await readdir("build/assets/css");
  const css = (
    await Promise.all(
      cssFiles
        .filter((file) => file.endsWith(".css"))
        .map((file) => readFile(`build/assets/css/${file}`, "utf8")),
    )
  ).join("\n");
  assert.match(
    css,
    /(?:^|})\.clickCue_[\w-]+\{[^}]*display:grid[^}]*pointer-events:none/,
    "click cues must be styled for every object, not scoped to one object",
  );
  assert.match(
    css,
    /(?:^|})\.objectLabel_[\w-]+\{[^}]*font-size:clamp\(12px,1.5cqw,14px\)/,
    "destination labels must remain readable without hover or motion",
  );
});

test("office links retain independent artwork and the keyboard retains its animated key", async () => {
  const html = await readFile("build/index.html", "utf8");
  const links = [
    ...html.matchAll(
      /<a\b[^>]*data-desk-object="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,
    ),
  ];
  assert.equal(links.length, 8);
  for (const [, kind, content] of links) {
    assert.match(
      content,
      new RegExp(
        `<svg\\b[^>]*data-object-art="${kind}"[^>]*aria-hidden="true"`,
      ),
    );
    assert.doesNotMatch(content, /<img\b|<image\b/);
  }
  for (const part of ["key", "portrait"]) {
    assert.ok(
      html.includes(`data-character-part="${part}"`),
      `${part} must remain a separate scene layer`,
    );
  }
  assert.match(
    html,
    /data-character-motion="paused" data-character-phase="tab"/,
  );
  assert.doesNotMatch(
    html,
    /data-character-toggle|Play character animation|Pause character animation/,
  );
  assert.doesNotMatch(
    html,
    /data-desk-layer|\/img\/office-layers\/|\/img\/sajee-office/,
  );

  const files = await readdir("build/assets/css");
  const css = (
    await Promise.all(
      files
        .filter((file) => file.endsWith(".css"))
        .map((file) => readFile(`build/assets/css/${file}`, "utf8")),
    )
  ).join("\n");
  for (const [, kind] of links) {
    assert.match(
      css,
      new RegExp(
        `\\.object_[\\w-]+\\[data-desk-object=${kind}\\]:hover \\.objectDrawing_[\\w-]+[^{}]*\\{[^}]*animation:`,
      ),
    );
  }
  const reduced = [
    ...css.matchAll(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\{((?:[^{}]*\{[^{}]*\})*)\}/g,
    ),
  ];
  assert.ok(
    reduced.some(
      ([, rules]) =>
        /\.scene_[\w-]+ \.pressedKey_[\w-]+[^{}]*\{[^{}]*animation:none/.test(
          rules,
        ) &&
        /\.scene_[\w-]+\[data-character-phase\] \.pressedKey_[\w-]+[^{}]*\{[^{}]*animation:none/.test(
          rules,
        ) &&
        /\.scene_[\w-]+ \.object_[\w-]+\[data-desk-object\] \.objectDrawing_[\w-]+[^{}]*\{[^{}]*animation:none/.test(
          rules,
        ),
    ),
    "reduced motion must disable both key presses and independent object reactions",
  );
});

test("agentic coding remains discoverable from both head and body without portrait tools", async () => {
  const html = await readFile("build/index.html", "utf8");
  const shirt = html.match(
    /<text\b[^>]*data-office-shirt-quote[^>]*>([\s\S]*?)<\/text>/,
  )?.[1];
  assert.ok(shirt, "the coding quote must be printed on the shirt");
  const printMask = html.match(
    /<g\b[^>]*mask="url\(#(office-shirt-[^"]+)\)"[^>]*>\s*<text\b[^>]*data-office-shirt-quote/,
  )?.[1];
  assert.ok(printMask, "the shirt print must respect the active pose's hands");
  const maskIds = [
    ...html.matchAll(/<mask\b[^>]*id="(office-shirt-[^"]+)"/g),
  ].map(([, id]) => id);
  assert.ok(maskIds.includes(printMask), "the print mask must resolve");
  for (const pose of ["phone", "tab", "pray"]) {
    assert.ok(maskIds.includes(`office-shirt-${pose}`));
  }
  const printedQuote = shirt
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  assert.ok(
    html.includes(`<strong>${printedQuote}</strong>`),
    "the tooltip must repeat the shirt quote at a readable size",
  );
  for (const trigger of ["head", "body"]) {
    assert.match(
      html,
      new RegExp(
        `<button\\b(?=[^>]*data-agentic-trigger="${trigger}")(?=[^>]*aria-describedby="[^"]*agentic-coding-hint)(?=[^>]*type="button")[^>]*>`,
      ),
    );
  }
  assert.match(
    html,
    /<div\b(?=[^>]*id="agentic-coding-hint")(?=[^>]*role="tooltip")(?=[^>]*hidden="")[^>]*>[\s\S]*?review the diff before shipping/,
  );
  assert.doesNotMatch(html, /data-portrait-tools/);
  assert.match(
    html,
    /data-character-part="key"[^>]*>[\s\S]*?<text\b[^>]*>Tab<\/text>/,
  );
});

test("lifelike full-character poses have matching transparent frames within the image budget", async () => {
  let total = 0;
  const distinct = new Set();
  assert.deepEqual((await readdir("static/img/office-character")).sort(), [
    "phone.webp",
    "pray.webp",
    "tab.webp",
  ]);
  for (const pose of ["phone", "tab", "pray"]) {
    const image = await readFile(`static/img/office-character/${pose}.webp`);
    assert.equal(image.toString("ascii", 8, 16), "WEBPVP8X");
    assert.ok(
      image[20] & 0x10,
      "the illustrated character must have alpha transparency",
    );
    assert.equal(image.readUIntLE(24, 3) + 1, 576);
    assert.equal(image.readUIntLE(27, 3) + 1, 768);
    assert.ok(image.length < 60_000);
    total += image.length;
    distinct.add(image.toString("base64"));
  }
  assert.equal(distinct.size, 3);
  assert.ok(total < 150_000);
});

test("all character poses share placement without hidden ancestor layers", async () => {
  const html = await readFile("build/index.html", "utf8");
  const ancestors = [];
  let posesFound = 0;
  for (const [tag] of html.matchAll(/<\/?g\b[^>]*>|<image\b[^>]*>/g)) {
    if (tag.startsWith("</")) {
      ancestors.pop();
    } else if (tag.startsWith("<image")) {
      if (tag.includes("data-character-pose=")) {
        posesFound++;
        assert.match(tag, /x="360" y="82" width="384" height="512"/);
        assert.ok(
          !ancestors.some((parent) => parent.includes('opacity="0"')),
          "a hidden ancestor must not hide the active pose",
        );
      }
    } else {
      ancestors.push(tag);
    }
  }
  assert.equal(posesFound, 3);
});
