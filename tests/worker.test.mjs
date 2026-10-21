import assert from "node:assert/strict";
import test from "node:test";

import worker, { markdownPath, preferredType } from "../worker/index.mjs";
import redirects from "../worker/blog-redirects.mjs";

function mockAssets(files) {
  return {
    async fetch(request) {
      const pathname = new URL(request.url).pathname;
      const file = files[pathname];
      if (!file) return new Response("missing", { status: 404 });
      return new Response(request.method === "HEAD" ? null : file.body, {
        status: file.status ?? 200,
        headers: { "Content-Type": file.type },
      });
    },
  };
}

const assets = mockAssets({
  "/": { body: "<h1>Home</h1>", type: "text/html; charset=utf-8" },
  "/index.md": { body: "# Home", type: "text/markdown" },
  "/404.md": { body: "# Page not found", type: "text/markdown" },
  "/.well-known/api-catalog": {
    body: '{"linkset":[]}',
    type: "application/linkset+json",
  },
});

test("selects representations using q-values and specific exclusions", () => {
  assert.equal(
    preferredType("text/markdown, text/html;q=0.5"),
    "text/markdown",
  );
  assert.equal(preferredType("text/html;q=0, */*;q=1"), "text/markdown");
  assert.equal(preferredType("application/pdf"), null);
  assert.equal(markdownPath("/developers"), "/developers/index.md");
});

test("serves Markdown with Vary: Accept", async () => {
  const response = await worker.fetch(
    new Request("https://www.sajeetharan.dev/", {
      headers: { Accept: "text/markdown" },
    }),
    { ASSETS: assets },
  );
  assert.equal(response.status, 200);
  assert.equal(
    response.headers.get("Content-Type"),
    "text/markdown; charset=utf-8",
  );
  assert.match(response.headers.get("Vary"), /Accept/i);
  assert.match(response.headers.get("Vary"), /Accept-Encoding/i);
  assert.equal(await response.text(), "# Home");
});

test("returns 406 when no available representation is acceptable", async () => {
  const response = await worker.fetch(
    new Request("https://www.sajeetharan.dev/", {
      headers: { Accept: "application/pdf" },
    }),
    { ASSETS: assets },
  );
  assert.equal(response.status, 406);
  assert.match(response.headers.get("Vary"), /Accept/i);
});

test("preserves a Markdown 404 with recovery content", async () => {
  const response = await worker.fetch(
    new Request("https://www.sajeetharan.dev/missing", {
      headers: { Accept: "text/markdown" },
    }),
    { ASSETS: assets },
  );
  assert.equal(response.status, 404);
  assert.equal(await response.text(), "# Page not found");
});

test("redirects the apex to canonical HTTPS", async () => {
  const response = await worker.fetch(
    new Request("http://sajeetharan.dev/projects?source=agent"),
    { ASSETS: assets },
  );
  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get("Location"),
    "https://www.sajeetharan.dev/projects?source=agent",
  );
});

test("preserves well-known resource media types", async () => {
  const response = await worker.fetch(
    new Request("https://www.sajeetharan.dev/.well-known/api-catalog", {
      headers: { Accept: "application/linkset+json" },
    }),
    { ASSETS: assets },
  );
  assert.equal(response.status, 200);
  assert.equal(
    response.headers.get("Content-Type"),
    "application/linkset+json",
  );
});

test("every legacy WordPress article redirects permanently in one hop", async () => {
  for (const [source, destination] of Object.entries(redirects)) {
    for (const origin of [
      "https://www.sajeetharan.dev",
      "http://www.sajeetharan.dev",
      "https://sajeetharan.dev",
      "http://sajeetharan.dev",
    ]) {
      for (const suffix of ["", "/"]) {
        const response = await worker.fetch(
          new Request(`${origin}${source}${suffix}?utm_source=wordpress`, {
            headers: { Accept: "text/markdown" },
          }),
          { ASSETS: assets },
        );
        assert.equal(response.status, 301, `${origin}${source}${suffix}`);
        assert.equal(
          response.headers.get("Location"),
          `https://www.sajeetharan.dev${destination}?utm_source=wordpress`,
        );
      }
    }
  }
});

test("encoded legacy paths are case-insensitive and unknown articles remain 404", async () => {
  const angular = Object.keys(redirects).find((source) =>
    source.includes("%E2%80%8A"),
  );
  assert.ok(angular);
  const response = await worker.fetch(
    new Request(`https://www.sajeetharan.dev${angular.toLowerCase()}`),
    { ASSETS: assets },
  );
  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("Location"),
    `https://www.sajeetharan.dev${redirects[angular]}`,
  );
  const missing = await worker.fetch(
    new Request("https://www.sajeetharan.dev/2017/08/10/not-a-real-article"),
    { ASSETS: assets },
  );
  assert.equal(missing.status, 404);
});

test("canonicalizes HTTP on the www domain without losing the query", async () => {
  const response = await worker.fetch(
    new Request("http://www.sajeetharan.dev/blogs?source=wordpress"),
    { ASSETS: assets },
  );
  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get("Location"),
    "https://www.sajeetharan.dev/blogs?source=wordpress",
  );
});
