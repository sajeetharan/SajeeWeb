import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const siteUrl = "https://www.sajeetharan.dev";
const buildDirectory = path.resolve("build");
const snapshotFile = path.resolve("worker", "blog-redirects.mjs");
const sitemap = await readFile(
  path.join(buildDirectory, "sitemap.xml"),
  "utf8",
);
const destinations = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
);

if (process.argv.includes("--sync")) {
  const redirects = {};
  const overrides = {
    "angular-%e2%80%8a-%e2%80%8a-exception-handling-mechanism":
      "angular-exception-handling-mechanism",
    "how-to-build-a-rocking-github-profile-2":
      "how-to-build-a-rocking-github-profile",
  };
  let seen = 0;
  let found;
  for (let page = 1; found === undefined || seen < found; page++) {
    const response = await fetch(
      `https://public-api.wordpress.com/rest/v1.1/sites/sajeetharan.wordpress.com/posts/?number=100&page=${page}&fields=URL,slug&order=ASC`,
    );
    if (!response.ok) {
      throw new Error(`WordPress API returned HTTP ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data.posts) || !data.posts.length) {
      throw new Error("WordPress API returned an empty or invalid post page");
    }
    found = data.found;
    if (!Number.isInteger(found) || found < 1) {
      throw new Error("WordPress API returned an invalid published post count");
    }
    for (const post of data.posts) {
      const slug = overrides[post.slug] ?? post.slug;
      const matches = [...destinations].filter((destination) => {
        const pathname = new URL(destination).pathname.replace(/\/$/, "");
        return (
          pathname.startsWith("/blogs/") &&
          !pathname.startsWith("/blogs/tags/") &&
          pathname.endsWith(`/${slug}`)
        );
      });
      if (matches.length !== 1) {
        throw new Error(
          `Expected one migrated destination for ${post.URL}; found ${matches.length}`,
        );
      }
      const source = new URL(post.URL);
      if (source.hostname !== "sajeetharan.wordpress.com") {
        throw new Error(`Unexpected WordPress source: ${post.URL}`);
      }
      const pathname = source.pathname
        .replace(/\/$/, "")
        .replace(/%[a-f\d]{2}/gi, (escape) => escape.toUpperCase());
      if (Object.hasOwn(redirects, pathname)) {
        throw new Error(`Duplicate WordPress permalink: ${pathname}`);
      }
      redirects[pathname] = new URL(matches[0]).pathname;
    }
    seen += data.posts.length;
  }
  if (Object.keys(redirects).length !== found) {
    throw new Error("WordPress post count does not match redirect coverage");
  }
  const sorted = Object.fromEntries(
    Object.entries(redirects).sort(([a], [b]) => a.localeCompare(b)),
  );
  await writeFile(
    snapshotFile,
    `// Public WordPress permalinks; refresh with npm run sync:blog-redirects.\nexport const verifiedAt = ${JSON.stringify(new Date().toISOString().slice(0, 10))};\n\nexport default ${JSON.stringify(sorted, null, 2)};\n`,
  );
  console.log(`Verified and saved ${found} WordPress article redirects.`);
} else {
  const { default: redirects } = await import("../worker/blog-redirects.mjs");
  for (const [source, destination] of Object.entries(redirects)) {
    if (
      !/^\/\d{4}\/\d{2}\/\d{2}\/[^/]+$/.test(source) ||
      !destination.startsWith("/blogs/") ||
      !destinations.has(`${siteUrl}${destination}`)
    ) {
      throw new Error(`Invalid or missing redirect destination: ${source}`);
    }
    const directory = path.join(buildDirectory, decodeURIComponent(source));
    const filename = path.join(directory, "index.html");
    // Never overwrite a real Docusaurus page with a compatibility redirect.
    const exists = await access(filename).then(
      () => true,
      (error) => {
        if (error.code !== "ENOENT") throw error;
        return false;
      },
    );
    if (exists) throw new Error(`Redirect would overwrite ${filename}`);
    const target = `${siteUrl}${destination}`;
    if (!/^https:\/\/www\.sajeetharan\.dev\/blogs\/[\w/%-]+$/.test(target)) {
      throw new Error(`Unsafe redirect target: ${target}`);
    }
    await mkdir(directory, { recursive: true });
    await writeFile(
      filename,
      `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Article moved | Sajeetharan Sinnathurai</title>
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0;url=${target}">
<script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script>
</head>
<body><main><h1>This article has moved</h1><p><a href="${target}">Continue to the article</a>.</p></main></body>
</html>
`,
    );
  }
  console.log(
    `Generated ${Object.keys(redirects).length} legacy article compatibility pages.`,
  );
}
