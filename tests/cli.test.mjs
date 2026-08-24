import assert from "node:assert/strict";
import { execFile } from "node:child_process";
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
