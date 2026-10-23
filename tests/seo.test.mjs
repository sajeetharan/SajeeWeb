import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";

const require = createRequire(import.meta.url);
const definitions = require("../src/data/topics.json");
const topicPlugin = require("../plugins/topic-hubs.cjs");
const origin = "https://www.sajeetharan.dev";

function structuredData(html) {
  return [
    ...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].flatMap(([, json]) => {
    const data = JSON.parse(json);
    return data["@graph"] ?? [data];
  });
}

function builtPage(url) {
  return path.join(
    "build",
    decodeURIComponent(new URL(url, origin).pathname),
    "index.html",
  );
}

test("all canonical blog articles have exactly one accurate article schema", async () => {
  const sitemap = await readFile("build/sitemap.xml", "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(([, url]) => url)
    .filter((url) => new URL(url).pathname.startsWith("/blogs/"));
  let articles = 0;
  for (const url of urls) {
    const html = await readFile(builtPage(url), "utf8");
    const data = structuredData(html);
    const schemas = data.filter((item) => item["@type"] === "BlogPosting");
    if (!html.includes('property="og:type" content="article"')) {
      assert.equal(schemas.length, 0, `article schema on listing ${url}`);
      continue;
    }
    articles++;
    assert.equal(schemas.length, 1, `expected one BlogPosting at ${url}`);
    const [schema] = schemas;
    assert.equal(schema.mainEntityOfPage["@id"], url);
    assert.ok(schema.headline && schema.description, `missing text at ${url}`);
    assert.ok(Number.isFinite(Date.parse(schema.datePublished)));
    assert.ok(schema.author.length > 0);
    assert.ok(
      schema.author.every((author) => author.name && author.url),
      `incomplete author at ${url}`,
    );
    assert.ok(schema.image.every((image) => image.startsWith("https://")));
    const breadcrumb = data.find((item) => item["@type"] === "BreadcrumbList");
    assert.equal(breadcrumb.itemListElement.at(-1).item, url);
    assert.ok(html.includes('aria-label="Article author and topics"'));
    assert.ok(html.includes('href="/topics"'));
  }
  assert.ok(articles >= 124, `only checked ${articles} articles`);
});

test("topic pages are crawlable, canonical, and list their articles without JavaScript", async () => {
  const sitemap = await readFile("build/sitemap.xml", "utf8");
  const hub = await readFile("build/topics/index.html", "utf8");
  const sourcePages = await Promise.all(
    ["index", "blogs/index"].map((file) =>
      readFile(`build/${file}.html`, "utf8"),
    ),
  );
  for (const topic of definitions) {
    const url = `${origin}/topics/${topic.slug}`;
    assert.ok(sitemap.includes(`<loc>${url}</loc>`));
    assert.ok(hub.includes(`href="/topics/${topic.slug}"`));
    for (const source of sourcePages) {
      assert.ok(source.includes(`href="/topics/${topic.slug}"`));
    }
    const html = await readFile(builtPage(url), "utf8");
    assert.ok(html.includes(`rel="canonical" href="${url}"`));
    assert.doesNotMatch(html, /name="robots" content="noindex/);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.ok(html.includes('id="start-here"'));
    assert.ok(html.includes('id="all-articles"'));
    const schemas = structuredData(html);
    const collection = schemas.find(
      (item) => item["@type"] === "CollectionPage",
    );
    assert.equal(collection["@id"], url);
    assert.ok(collection.mainEntity.itemListElement.length >= 2);
    for (const [
      index,
      item,
    ] of collection.mainEntity.itemListElement.entries()) {
      assert.equal(item.position, index + 1);
      const target = await readFile(builtPage(item.url), "utf8");
      assert.ok(html.includes(`href="${new URL(item.url).pathname}"`));
      assert.ok(target.includes(`rel="canonical" href="${item.url}"`));
      assert.ok(target.includes(`href="/topics/${topic.slug}"`));
    }
    const markdown = await readFile(
      builtPage(url).replace(/\.html$/, ".md"),
      "utf8",
    );
    assert.match(markdown, /Start here/);
    assert.ok(markdown.includes(collection.mainEntity.itemListElement[0].name));
    assert.ok(!schemas.some((item) => item["@type"] === "BlogPosting"));
  }
});

test("article-specific social and FAQ metadata survives without duplicate article schema", async () => {
  const html = await readFile(
    "build/blogs/build-an-ai-agent-with-azure-cosmos-db/index.html",
    "utf8",
  );
  const schemas = structuredData(html);
  assert.equal(
    schemas.filter((item) => item["@type"] === "BlogPosting").length,
    1,
  );
  assert.equal(schemas.filter((item) => item["@type"] === "FAQPage").length, 1);
  assert.equal(
    schemas.find((item) => item["@type"] === "BlogPosting").dateModified,
    "2026-10-03T18:30:00.000Z",
  );
  assert.match(html, /property="og:image:alt"/);
  const older = await readFile(
    "build/blogs/angular-exception-handling-mechanism/index.html",
    "utf8",
  );
  assert.equal(
    structuredData(older).find((item) => item["@type"] === "BlogPosting")
      .dateModified,
    undefined,
  );
});

function fixturePosts() {
  const posts = new Map();
  for (const topic of definitions) {
    for (const slug of topic.startHere) {
      const existing = posts.get(slug);
      const tags = [
        ...(existing?.metadata.tags ?? []),
        { label: topic.tags[0] },
      ];
      posts.set(slug, {
        metadata: {
          title: slug,
          description: `Guide: ${slug}`,
          permalink: `/blogs/2026/07/${slug}`,
          date: "2026-07-15T00:00:00.000Z",
          tags,
          unlisted: false,
          frontMatter: {},
        },
      });
    }
  }
  return [...posts.values()];
}

async function runTopicPlugin(posts) {
  let globalData;
  const routes = [];
  const data = new Map();
  await topicPlugin().contentLoaded({
    allContent: {
      "docusaurus-plugin-content-blog": { default: { blogPosts: posts } },
    },
    actions: {
      setGlobalData(value) {
        globalData = value;
      },
      async createData(name, content) {
        data.set(name, JSON.parse(content));
        return name;
      },
      addRoute(route) {
        routes.push(route);
      },
    },
  });
  return { globalData, routes, data };
}

test("topic generation normalizes legacy tags, preserves URLs, and excludes hidden articles", async () => {
  const posts = fixturePosts();
  const extra = {
    title: "Historical Cosmos article",
    description: "An older guide",
    permalink: "/blogs/2020/01/01/2020/01/old-cosmos-guide",
    date: "2020-01-01T00:00:00.000Z",
    tags: [{ label: "CosmosDB" }],
    unlisted: false,
    frontMatter: {},
  };
  posts.push(
    { metadata: extra },
    { metadata: { ...extra, permalink: "/blogs/unlisted", unlisted: true } },
    {
      metadata: {
        ...extra,
        permalink: "/blogs/draft",
        frontMatter: { draft: true },
      },
    },
  );
  const { globalData, routes } = await runTopicPlugin(posts);
  assert.equal(routes.length, 7);
  assert.ok(routes.every((route) => route.exact));
  const cosmos = globalData.topics.find((topic) => topic.slug === "cosmos-db");
  assert.equal(cosmos.posts.at(-1).permalink, extra.permalink);
  assert.ok(
    globalData.topics.every((topic) =>
      topic.posts.every(
        (post) => !["/blogs/unlisted", "/blogs/draft"].includes(post.permalink),
      ),
    ),
  );
});

test("topic generation fails explicitly for broken curated links", async () => {
  await assert.rejects(runTopicPlugin([]), /Missing start-here article/);
  await assert.rejects(
    topicPlugin().contentLoaded({ allContent: {}, actions: {} }),
    /require the default Docusaurus blog/,
  );
});

test("invalid or backdated modification dates fail the build", async () => {
  for (const dateModified of ["not-a-date", "2020-01-01", 123]) {
    const posts = fixturePosts();
    posts[0].metadata.frontMatter = { dateModified };
    await assert.rejects(runTopicPlugin(posts), /Invalid dateModified/);
  }
});
