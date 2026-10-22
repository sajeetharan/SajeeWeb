import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function assertPngSize(buffer, size) {
  assert.deepEqual(buffer.subarray(0, 8), pngSignature);
  assert.equal(buffer.toString("ascii", 12, 16), "IHDR");
  assert.equal(buffer.readUInt32BE(16), size);
  assert.equal(buffer.readUInt32BE(20), size);
}

test("every page advertises vector, PNG, ICO, and Apple brand icons", async () => {
  for (const file of [
    "build/index.html",
    "build/blogs/index.html",
    "build/awards/index.html",
    "build/contact/index.html",
    "build/404.html",
  ]) {
    const html = await readFile(file, "utf8");
    const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) =>
      Object.fromEntries(
        [...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [
          key,
          value,
        ]),
      ),
    );
    for (const attributes of [
      { rel: "icon", href: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/img/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        sizes: "any",
        href: "/img/sajee-mark.svg",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/img/apple-touch-icon.png",
      },
    ]) {
      assert.equal(
        links.filter((link) =>
          Object.entries(attributes).every(
            ([key, value]) => link[key] === value,
          ),
        ).length,
        1,
        `${file}: missing or duplicate ${attributes.href}`,
      );
    }
  }
});

test("brand SVG is lightweight and independent of fonts or external assets", async () => {
  const svg = await readFile("build/img/sajee-mark.svg", "utf8");
  assert.match(svg, /viewBox="0 0 64 64"/);
  assert.match(svg, /<title\b[^>]*>Sajee interlock mark<\/title>/);
  assert.equal((svg.match(/<path\b/g) ?? []).length, 2);
  assert.doesNotMatch(svg, /<(?:text|image|script|foreignObject|filter)\b/);
  assert.doesNotMatch(svg, /\b(?:href|style)=/);
  assert.ok(Buffer.byteLength(svg) < 2_000);
});

test("PNG and Apple exports have their advertised sizes", async () => {
  const png = await readFile("build/img/favicon-32x32.png");
  assertPngSize(png, 32);
  assert.ok(png.length < 5_000);
  const apple = await readFile("build/img/apple-touch-icon.png");
  assertPngSize(apple, 180);
  assert.equal(apple[25], 2, "Apple icon must use opaque RGB pixels");
  assert.ok(apple.length < 20_000);
});

test("ICO includes real 16px, 32px, and 48px images at root and legacy URLs", async () => {
  const ico = await readFile("build/favicon.ico");
  const legacy = await readFile("build/img/favicon.ico");
  assert.deepEqual(legacy, ico);
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);
  let expectedOffset = 6 + 3 * 16;
  for (const [index, size] of [16, 32, 48].entries()) {
    const entry = 6 + index * 16;
    assert.equal(ico[entry], size);
    assert.equal(ico[entry + 1], size);
    assert.equal(ico.readUInt16LE(entry + 4), 1);
    assert.equal(ico.readUInt16LE(entry + 6), 32);
    const length = ico.readUInt32LE(entry + 8);
    const offset = ico.readUInt32LE(entry + 12);
    assert.equal(offset, expectedOffset);
    assert.ok(offset + length <= ico.length);
    assertPngSize(ico.subarray(offset, offset + length), size);
    expectedOffset += length;
  }
  assert.equal(expectedOffset, ico.length);
  assert.ok(ico.length < 10_000);
});
