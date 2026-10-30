import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";
import { verifyCloudflareZone } from "../scripts/check-cloudflare-zone.mjs";

const credentials = {
  apiToken: "test-token-not-a-credential",
  accountId: "test-account",
};
const zone = {
  name: "sajeetharan.dev",
  account: { id: credentials.accountId },
  status: "active",
};
const result = (zones) => Response.json({ success: true, result: zones });

test("Cloudflare preflight requires both deployment secrets before making requests", async () => {
  const unexpectedFetch = () => {
    assert.fail("Missing secrets must not make an API request");
  };
  await assert.rejects(
    verifyCloudflareZone({ ...credentials, apiToken: "" }, unexpectedFetch),
    /CLOUDFLARE_API_TOKEN repository secret/,
  );
  await assert.rejects(
    verifyCloudflareZone(
      { ...credentials, accountId: undefined },
      unexpectedFetch,
    ),
    /CLOUDFLARE_ACCOUNT_ID repository secret/,
  );
});

test("Cloudflare preflight checks zone ownership without filtering out account mismatches", async () => {
  await verifyCloudflareZone(
    { ...credentials, apiToken: ` ${credentials.apiToken} ` },
    async (url, options) => {
      assert.equal(url.origin, "https://api.cloudflare.com");
      assert.equal(url.pathname, "/client/v4/zones");
      assert.equal(url.searchParams.get("name"), zone.name);
      assert.equal(url.searchParams.has("account.id"), false);
      assert.equal(
        options.headers.Authorization,
        `Bearer ${credentials.apiToken}`,
      );
      assert.ok(options.signal instanceof AbortSignal);
      return result([{ ...zone, account: { id: "another-account" } }, zone]);
    },
  );
});

test("Cloudflare preflight reports a wrong deployment account without revealing IDs or credentials", async () => {
  await assert.rejects(
    verifyCloudflareZone(credentials, async () =>
      result([{ ...zone, account: { id: "another-account" } }]),
    ),
    (error) => {
      assert.match(error.message, /does not match CLOUDFLARE_ACCOUNT_ID/);
      assert.doesNotMatch(
        error.message,
        /test-token|test-account|another-account/,
      );
      return true;
    },
  );
});

test("Cloudflare preflight distinguishes invisible zones from account mismatches", async () => {
  await assert.rejects(
    verifyCloudflareZone(credentials, async () => result([])),
    /token cannot see sajeetharan\.dev.*Zone > Zone > Read/,
  );
});

test("Cloudflare preflight reports rejected HTTP requests without logging response bodies", async () => {
  for (const status of [401, 403, 429, 503]) {
    await assert.rejects(
      verifyCloudflareZone(
        credentials,
        async () => new Response("do-not-log-this-response", { status }),
      ),
      (error) => {
        assert.ok(error.message.includes(`HTTP ${status}`));
        assert.doesNotMatch(error.message, /do-not-log|test-token/);
        return true;
      },
    );
  }
});

test("Cloudflare preflight rejects unsuccessful or malformed API responses", async () => {
  for (const data of [
    null,
    { success: false, result: [] },
    { success: true, result: {} },
  ]) {
    await assert.rejects(
      verifyCloudflareZone(credentials, async () => Response.json(data)),
      /rejected the zone lookup or returned an invalid response/,
    );
  }
  await assert.rejects(
    verifyCloudflareZone(
      credentials,
      async () => new Response("<html>error</html>"),
    ),
    /non-JSON response/,
  );
  await assert.rejects(
    verifyCloudflareZone(
      credentials,
      async () =>
        new Response("do-not-log-this-invalid-json", {
          headers: { "Content-Type": "application/json" },
        }),
    ),
    (error) => {
      assert.match(error.message, /invalid JSON/);
      assert.doesNotMatch(error.message, /do-not-log/);
      return true;
    },
  );
});

test("Cloudflare preflight rejects missing ownership and inactive zones", async () => {
  await assert.rejects(
    verifyCloudflareZone(credentials, async () =>
      result([{ ...zone, account: {} }]),
    ),
    /without an owning account ID/,
  );
  await assert.rejects(
    verifyCloudflareZone(credentials, async () =>
      result([{ ...zone, status: "pending" }]),
    ),
    /zone is not active/,
  );
});

test("Cloudflare preflight runs before building and uploading the Worker", async () => {
  const workflow = await readFile(
    ".github/workflows/deploy-cloudflare.yml",
    "utf8",
  );
  const preflight = workflow.indexOf("node scripts/check-cloudflare-zone.mjs");
  assert.ok(preflight > 0);
  assert.ok(preflight < workflow.indexOf("npm ci"));
  assert.ok(preflight < workflow.indexOf("npm run build"));
  assert.ok(preflight < workflow.indexOf("npx wrangler deploy"));
});

test("Cloudflare routes intercept only the AI API without taking over existing DNS", async () => {
  const { config, error } = ts.parseConfigFileTextToJson(
    "wrangler.jsonc",
    await readFile("wrangler.jsonc", "utf8"),
  );
  assert.equal(error, undefined);
  assert.equal(config.workers_dev, false);
  assert.deepEqual(config.routes, [
    {
      pattern: "www.sajeetharan.dev/api/hire-me*",
      zone_name: "sajeetharan.dev",
    },
    {
      pattern: "sajeetharan.dev/api/hire-me*",
      zone_name: "sajeetharan.dev",
    },
  ]);
});
