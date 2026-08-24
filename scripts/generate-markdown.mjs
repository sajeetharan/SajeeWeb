import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import TurndownService from "turndown";

const buildDirectory = path.resolve("build");
const turndown = new TurndownService({
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  headingStyle: "atx",
});

turndown.remove(["script", "style", "svg", "button", "nav", "footer"]);

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
  const markdown = `${turndown.turndown(mainContent(html)).trim()}\n`;
  const markdownFile = htmlFile.replace(/\.html$/, ".md");
  await writeFile(markdownFile, markdown, "utf8");
}
