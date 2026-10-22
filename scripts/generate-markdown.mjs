import { readdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import TurndownService from "turndown";

const buildDirectory = path.resolve("build");
const turndown = new TurndownService({
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  headingStyle: "atx",
});

turndown.remove([
  "script",
  "style",
  "svg",
  "button",
  "nav",
  "footer",
  "dialog",
]);

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? findHtmlFiles(entryPath) : [entryPath];
    }),
  );
  return files.flat().filter((file) => file.endsWith(".html"));
}

function mainContent(html) {
  const root = html.match(/<div id="__docusaurus">([\s\S]*?)<\/body>/i);
  return root?.[1] ?? html;
}

for (const htmlFile of await findHtmlFiles(buildDirectory)) {
  if (path.basename(htmlFile) === "404.html") continue;
  const html = await readFile(htmlFile, "utf8");
  if (/<meta http-equiv="refresh"/i.test(html)) continue;
  const markdown = `${turndown.turndown(mainContent(html)).trim()}\n`;
  const markdownFile = htmlFile.replace(/\.html$/, ".md");
  await writeFile(markdownFile, markdown, "utf8");
}

const skillIndexFile = path.join(
  buildDirectory,
  ".well-known",
  "agent-skills",
  "index.json",
);
const skillIndex = JSON.parse(await readFile(skillIndexFile, "utf8"));
for (const skill of skillIndex.skills) {
  const url = new URL(skill.url);
  if (
    url.origin !== "https://www.sajeetharan.dev" ||
    !url.pathname.startsWith("/.well-known/agent-skills/")
  ) {
    throw new Error(`Unexpected published skill URL: ${skill.url}`);
  }
  const content = await readFile(
    path.join(buildDirectory, decodeURIComponent(url.pathname)),
  );
  skill.digest = `sha256:${createHash("sha256").update(content).digest("hex")}`;
}
await writeFile(skillIndexFile, `${JSON.stringify(skillIndex, null, 2)}\n`);
