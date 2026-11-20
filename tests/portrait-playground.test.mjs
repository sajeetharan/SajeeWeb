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

test("homepage renders an accessible original vector portrait instead of loading nine photos", async () => {
  const html = await readFile("build/index.html", "utf8");
  const portraits = html.match(
    /<svg\b[^>]*data-line-portrait[^>]*>[\s\S]*?<\/svg>/g,
  );
  assert.equal(portraits?.length, 1);
  assert.match(portraits[0], /role="img"/);
  assert.match(
    portraits[0],
    /aria-label="An original line portrait of Sajeetharan/,
  );
  assert.match(portraits[0], /viewBox="0 0 280 320"/);
  assert.match(portraits[0], /stroke="currentColor"/);
  const paths = portraits[0].match(/<path\b[^>]*>/g);
  assert.ok(paths?.length > 0);
  assert.ok(paths.every((path) => path.includes('pathLength="1"')));
  assert.ok(paths.every((path) => path.includes('data-drawing-path="true"')));
  assert.ok(Buffer.byteLength(portraits[0]) < 5000);
  assert.doesNotMatch(html, /data-portrait-playground|\/img\/expressions\//);
  assert.doesNotMatch(portraits[0], /<image\b|<script\b|<animate\b/);
});

test("greeting includes two decorative vector eyes without changing the readable introduction", async () => {
  const html = await readFile("build/index.html", "utf8");
  const eyes = html.match(
    /<svg\b[^>]*data-greeting-eyes[^>]*>[\s\S]*?<\/svg>/g,
  );
  assert.equal(eyes?.length, 1);
  assert.match(eyes[0], /aria-hidden="true"/);
  assert.match(eyes[0], /focusable="false"/);
  assert.equal(eyes[0].match(/<ellipse\b/g)?.length, 2);
  assert.equal(eyes[0].match(/<circle\b/g)?.length, 2);
  assert.doesNotMatch(eyes[0], /tabindex|<image\b|<script\b/);
  assert.match(html, /<h1\b[^>]*>Hi, I&#x27;m Sajee\.<\/h1>/);
});

test("portrait photo reveal is a keyboard-native toggle with a local image and reserved dimensions", async () => {
  const html = await readFile("build/index.html", "utf8");
  const button = html.match(
    /<button\b[^>]*aria-label="Reveal original photo"[^>]*>[\s\S]*?<\/button>/,
  )?.[0];
  assert.ok(button);
  assert.match(button, /type="button"/);
  assert.match(button, /aria-pressed="false"/);
  assert.match(button, /data-photo-revealed="false"/);
  assert.match(button, /data-line-portrait/);
  assert.match(
    button,
    /<img\b(?=[^>]*src="\/assets\/ideal-img\/avatar\.[^"]+\.jpg")(?=[^>]*width="310")(?=[^>]*height="310")(?=[^>]*aria-hidden="true")[^>]*>/,
  );
  assert.match(button, /Click to reveal/);
});

test("production drawing supports scroll progression with a complete reduced-motion fallback", async () => {
  const files = await readdir("build/assets/css");
  const css = (
    await Promise.all(
      files
        .filter((file) => file.endsWith(".css"))
        .map((file) => readFile(`build/assets/css/${file}`, "utf8")),
    )
  ).join("\n");
  assert.match(css, /\.portrait_[\w-]+ svg\{[^}]*height:auto[^}]*width:100%/);
  const animation = css.match(
    /\[data-drawing-path\]\{[^}]*animation:(?:([\w-]+) 1\.4s ease-out 2s both|1\.4s ease-out 2s both ([\w-]+))/,
  );
  const animationName = animation?.[1] ?? animation?.[2];
  assert.ok(animationName, "drawing must have a finite, sequenced animation");
  assert.ok(
    new RegExp(
      `@keyframes ${animationName}\\{(?:from|0%)\\{stroke-dashoffset:1\\}(?:to|100%)\\{stroke-dashoffset:0\\}\\}`,
    ).test(css),
    "drawing animation must reveal the entire normalized stroke",
  );
  assert.match(css, /\[data-ribbon\]\{[^}]*animation-delay:0s/);
  assert.match(css, /\[data-detail\]\{[^}]*animation-delay:3\.3s/);
  const scrollRules = css.match(
    /\.home_[\w-]+\[data-scroll-drawing\][^{]*\{[^}]*\}/g,
  );
  assert.ok(scrollRules?.some((rule) => rule.includes("--scroll-progress")));
  assert.ok(scrollRules?.some((rule) => rule.includes("[data-trail]")));
  assert.doesNotMatch(
    css,
    /@keyframes\s+[\w-]+\s*\{(?:[^{}]*\{[^{}]*\})*[^{}]*@keyframes/,
    "contact animations must not be nested inside other keyframes",
  );
  const reducedMotionRules = [
    ...css.matchAll(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\{((?:[^{}]*\{[^{}]*\})*)\}/g,
    ),
  ];
  assert.ok(
    reducedMotionRules.some(([, rules]) =>
      /\[data-drawing-path\]\{(?=[^{}]*animation:none)(?=[^{}]*stroke-dashoffset:0)/.test(
        rules,
      ),
    ),
    "reduced-motion mode must show the complete drawing immediately",
  );
});

async function startHomepageDrawing({ reduced = false, height = 1400 } = {}) {
  const text = await readFile("src/pages/index.tsx", "utf8");
  const sourceFile = ts.createSourceFile(
    "index.tsx",
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  let effect;
  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(sourceFile) === "useEffect"
    ) {
      effect = node.arguments[0];
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  assert.ok(effect, "homepage must initialize its drawing effect");
  const { outputText } = ts.transpileModule(
    `const start = ${effect.getText(sourceFile)};`,
    { compilerOptions: { target: ts.ScriptTarget.ES2020 } },
  );
  const properties = new Map();
  const element = {
    style: {
      setProperty: (key, value) => properties.set(key, value),
      removeProperty: (key) => properties.delete(key),
    },
    setAttribute() {},
    removeAttribute() {},
  };
  const events = new Map();
  const frames = new Map();
  let id = 0;
  let time = 0;
  const window = {
    innerHeight: 900,
    scrollY: 0,
    matchMedia: () => ({
      matches: reduced,
      addEventListener() {},
      removeEventListener() {},
    }),
    addEventListener: (name, listener) => events.set(name, listener),
    removeEventListener: (name) => events.delete(name),
  };
  const cleanup = new Function(
    "home",
    "window",
    "document",
    "requestAnimationFrame",
    "cancelAnimationFrame",
    "ResizeObserver",
    `${outputText}\nreturn start();`,
  )(
    { current: element },
    window,
    { documentElement: { scrollHeight: height } },
    (callback) => {
      frames.set(++id, callback);
      return id;
    },
    (frame) => frames.delete(frame),
    class {
      observe() {}
      disconnect() {}
    },
  );
  return {
    progress: () => Number(properties.get("--scroll-progress")),
    advance: () => {
      time += 100;
      const callbacks = [...frames.values()];
      frames.clear();
      callbacks.forEach((callback) => callback(time));
    },
    scroll: (y) => {
      window.scrollY = y;
      events.get("scroll")();
    },
    frames,
    events,
    cleanup,
  };
}

test("drawing keeps advancing between scrolls, never rewinds, and stops when complete", async () => {
  const drawing = await startHomepageDrawing();
  try {
    const initial = drawing.progress();
    for (let i = 0; i < 10; i++) drawing.advance();
    assert.ok(
      drawing.progress() > initial,
      "drawing must advance without scrolling",
    );
    drawing.scroll(300);
    const afterScroll = drawing.progress();
    assert.ok(afterScroll > 0.6, "scrolling must accelerate the reveal");
    drawing.scroll(0);
    assert.equal(
      drawing.progress(),
      afterScroll,
      "scrolling up must not erase the line",
    );
    drawing.advance();
    assert.ok(
      drawing.progress() > afterScroll,
      "drawing must continue after scrolling stops",
    );
    for (let i = 0; i < 81; i++) drawing.advance();
    assert.equal(drawing.progress(), 1);
    assert.equal(
      drawing.frames.size,
      0,
      "completed drawing must stop requesting frames",
    );
  } finally {
    drawing.cleanup();
  }
  assert.equal(drawing.events.size, 0);
});

test("reduced motion and no-scroll pages complete immediately; unmount cancels drawing", async () => {
  for (const options of [{ reduced: true }, { height: 900 }]) {
    const drawing = await startHomepageDrawing(options);
    assert.equal(drawing.progress(), 1);
    assert.equal(drawing.frames.size, 0);
    drawing.cleanup();
  }
  const drawing = await startHomepageDrawing();
  assert.equal(drawing.frames.size, 1);
  drawing.cleanup();
  assert.equal(drawing.frames.size, 0);
  assert.equal(drawing.events.size, 0);
});
