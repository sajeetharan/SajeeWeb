#!/usr/bin/env node

const baseUrl = process.env.SAJEE_SITE_URL ?? "https://www.sajeetharan.dev";
const resources = {
  home: "/",
  developers: "/developers",
  blogs: "/blogs",
  projects: "/projects",
  talks: "/talks",
  sitemap: "/sitemap.xml",
  rss: "/blogs/rss.xml",
  llms: "/llms.txt",
};

function printHelp() {
  console.log(`Usage: sajee <command> [options]

Commands:
  resources [--json]  List public site resources
  fetch <name|path>   Fetch a resource; requests Markdown for web pages
  help                Show this help`);
}

async function main() {
  const [command = "help", argument, option] = process.argv.slice(2);
  if (command === "help" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "resources") {
    const entries = Object.fromEntries(
      Object.entries(resources).map(([name, resourcePath]) => [
        name,
        new URL(resourcePath, baseUrl).toString(),
      ]),
    );
    if (argument === "--json" || option === "--json") {
      console.log(JSON.stringify(entries, null, 2));
    } else {
      for (const [name, resourceUrl] of Object.entries(entries)) {
        console.log(`${name.padEnd(12)} ${resourceUrl}`);
      }
    }
    return;
  }

  if (command === "fetch") {
    if (!argument)
      throw new Error("fetch requires a resource name or site path");
    const resourcePath = resources[argument] ?? argument;
    const resourceUrl = new URL(resourcePath, baseUrl);
    if (resourceUrl.origin !== new URL(baseUrl).origin) {
      throw new Error("fetch only accepts sajeetharan.dev resource paths");
    }
    const response = await fetch(resourceUrl, {
      headers: { Accept: "text/markdown, text/plain;q=0.9, */*;q=0.1" },
    });
    if (!response.ok)
      throw new Error(`request failed with HTTP ${response.status}`);
    process.stdout.write(await response.text());
    return;
  }

  throw new Error(`unknown command: ${command}`);
}

main().catch((error) => {
  console.error(`sajee: ${error.message}`);
  process.exitCode = 1;
});
