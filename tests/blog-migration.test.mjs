import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import redirects from "../worker/blog-redirects.mjs";

test("every verified WordPress article has a real canonical destination and static fallback", async () => {
  const entries = Object.entries(redirects);
  assert.ok(entries.length >= 124, "expected all 124 verified WordPress posts");
  const sitemap = await readFile("build/sitemap.xml", "utf8");
  const locations = new Set(
    [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
  );
  for (const [source, destination] of entries) {
    assert.match(source, /^\/\d{4}\/\d{2}\/\d{2}\/[^/]+$/);
    const canonical = `https://www.sajeetharan.dev${destination}`;
    assert.ok(locations.has(canonical), `missing destination for ${source}`);
    assert.ok(
      !locations.has(`https://www.sajeetharan.dev${source}`),
      "redirect aliases must not be advertised as canonical pages",
    );
    const target = await readFile(
      path.join("build", decodeURIComponent(destination), "index.html"),
      "utf8",
    );
    assert.ok(
      target.includes(`rel="canonical" href="${canonical}"`),
      `unexpected canonical for ${source}`,
    );
    const alias = await readFile(
      path.join("build", decodeURIComponent(source), "index.html"),
      "utf8",
    );
    assert.ok(alias.includes(`rel="canonical" href="${canonical}"`));
    assert.ok(alias.includes(`content="0;url=${canonical}"`));
    assert.ok(alias.includes(`href="${canonical}"`));
    assert.match(alias, /location\.search \+ location\.hash/);
  }
});

test("duplicate WordPress posts consolidate and the missing Angular post is restored", async () => {
  const original = "/2020/07/10/how-to-build-a-rocking-github-profile";
  assert.equal(redirects[`${original}-2`], redirects[original]);
  const angular =
    "/2017/08/10/angular-%E2%80%8A-%E2%80%8A-exception-handling-mechanism";
  assert.equal(
    redirects[angular],
    "/blogs/angular-exception-handling-mechanism",
  );
  const article = await readFile(
    "build/blogs/angular-exception-handling-mechanism/index.html",
    "utf8",
  );
  assert.match(article, /Archive notice/);
  assert.match(article, /2017-08-10/);
  assert.match(article, /not current Angular guidance/);
});

test("blog navigation exposes the full archive without relying on Load more", async () => {
  const listing = await readFile("build/blogs/index.html", "utf8");
  assert.match(
    listing,
    /href="\/blogs\/archive"[^>]*>Browse the complete blog archive<\/a>/,
  );
  const archive = await readFile("build/blogs/archive/index.html", "utf8");
  for (const destination of new Set(Object.values(redirects))) {
    assert.ok(
      archive.includes(`href="${destination}"`),
      `archive is missing ${destination}`,
    );
  }
});

test("article cross-links use canonical destinations rather than the old WordPress host", async () => {
  const files = await readdir("blog", { recursive: true });
  for (const file of files.filter((file) => /\.(md|mdx)$/.test(file))) {
    const content = await readFile(path.join("blog", file), "utf8");
    assert.doesNotMatch(
      content,
      /https?:\/\/sajeetharan\.wordpress\.com\/\d{4}\//,
      `legacy article cross-link in ${file}`,
    );
    for (const match of content.matchAll(
      /https:\/\/www\.sajeetharan\.dev(\/blogs\/[^\s)"<>\]]+)/g,
    )) {
      const destination = new URL(match[0]).pathname;
      await readFile(
        path.join("build", decodeURIComponent(destination), "index.html"),
        "utf8",
      );
    }
  }
});
