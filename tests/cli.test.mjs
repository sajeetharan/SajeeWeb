import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createServer } from "node:http";
import test from "node:test";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

test("CLI lists canonical resources as JSON", async () => {
  const { stdout } = await execFileAsync(process.execPath, [
    "cli/sajee.mjs",
    "resources",
    "--json",
  ]);
  const resources = JSON.parse(stdout);
  assert.equal(resources.home, "https://www.sajeetharan.dev/");
  assert.equal(resources.llms, "https://www.sajeetharan.dev/llms.txt");
});

test("CLI rejects unknown commands", async () => {
  await assert.rejects(
    execFileAsync(process.execPath, ["cli/sajee.mjs", "unknown"]),
    /unknown command: unknown/,
  );
});

test("CLI fetches static Markdown on Pages and preserves non-page resources", async () => {
  const paths = [];
  const server = createServer((request, response) => {
    paths.push(request.url);
    response.setHeader("Connection", "close");
    if (request.url === "/missing/index.md") {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.end(`Fetched ${request.url}`);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const options = { env: { ...process.env, SAJEE_SITE_URL: baseUrl } };
  const cases = [
    ["home", "/index.md"],
    ["/developers/", "/developers/index.md"],
    ["/blogs/example?source=cli", "/blogs/example/index.md?source=cli"],
    ["/example.html", "/example.md"],
    ["/index.md", "/index.md"],
    ["rss", "/blogs/rss.xml"],
    ["sitemap", "/sitemap.xml"],
    ["/.well-known/api-catalog", "/.well-known/api-catalog"],
    ["/api/hire-me", "/api/hire-me"],
  ];
  try {
    for (const [argument, expected] of cases) {
      const { stdout } = await execFileAsync(
        process.execPath,
        ["cli/sajee.mjs", "fetch", argument],
        options,
      );
      assert.equal(stdout, `Fetched ${expected}`);
    }
    await assert.rejects(
      execFileAsync(
        process.execPath,
        ["cli/sajee.mjs", "fetch", "/missing"],
        options,
      ),
      (error) => {
        assert.match(error.stderr, /request failed with HTTP 404/);
        assert.equal(error.stdout, "");
        assert.equal(error.code, 1);
        return true;
      },
    );
    const requestCount = paths.length;
    await assert.rejects(
      execFileAsync(
        process.execPath,
        ["cli/sajee.mjs", "fetch", "https://example.com/"],
        options,
      ),
      /fetch only accepts sajeetharan.dev resource paths/,
    );
    assert.equal(paths.length, requestCount);
    assert.deepEqual(paths, [
      ...cases.map(([, expected]) => expected),
      "/missing/index.md",
    ]);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
});
