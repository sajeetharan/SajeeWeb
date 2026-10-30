import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

test("navigation puts Developers last and uses a lightweight logo", async () => {
  const html = await readFile("build/index.html", "utf8");
  const navbar = html.match(/<nav\b[^>]*aria-label="Main"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(navbar);
  const labels = [
    "Blogs",
    "Talks",
    "Projects",
    "Awards",
    "Get Mentored",
    "Developers",
  ];
  let previous = -1;
  for (const label of labels) {
    const position = navbar.indexOf(`>${label}</a>`);
    assert.ok(position > previous, `${label} is out of order`);
    previous = position;
  }
  assert.match(navbar, /logo-sketch-96\.webp/);
  assert.equal((navbar.match(/href="\/hire-me"/g) ?? []).length, 1);
  assert.match(navbar, /aria-label="Social profiles"/);
  assert.doesNotMatch(html, /aria-label="Connect with Sajeetharan"/);
  assert.doesNotMatch(navbar, /logo-sketch\.png/);
  const logo = await readFile("build/img/logo-sketch-96.webp");
  assert.equal(logo.toString("ascii", 8, 12), "WEBP");
  assert.ok(logo.length < 10_000, `logo is ${logo.length} bytes`);
});

test("award previews stay below their image budget", async () => {
  const directory = "build/img/awards/thumbnails";
  const files = await readdir(directory);
  assert.ok(files.length >= 5);
  for (const file of files) {
    const { size } = await stat(`${directory}/${file}`);
    assert.ok(size < 100_000, `${file} exceeds 100 KB: ${size} bytes`);
  }
});

test("awards default to four top highlights with accessible filters and dialog", async () => {
  const page = await readFile("build/awards/index.html", "utf8");
  const html = page.match(/<main\b[^>]*>[\s\S]*?<\/main>/)?.[0];
  assert.ok(html);
  assert.equal((html.match(/<article\b/g) ?? []).length, 4);
  for (const title of [
    "Microsoft Most Valuable Professional",
    "Google Developer Expert",
    "Most Outstanding Educator in Technology",
    "Microsoft Global Hackathon 2021 Challenge Winner",
  ]) {
    assert.ok(html.includes(title), `missing highlight: ${title}`);
  }
  assert.match(html, /aria-label="Filter awards and recognition"/);
  assert.equal((html.match(/aria-pressed="true"/g) ?? []).length, 1);
  assert.match(html, /aria-controls="awards-results"/);
  assert.match(html, /role="status" aria-live="polite" aria-atomic="true"/);
  assert.match(
    html.replace(/<!--[\s\S]*?-->/g, ""),
    /Showing 4 of 47 recognitions/,
  );
  assert.equal((html.match(/aria-haspopup="dialog"/g) ?? []).length, 4);
  assert.match(html, /<dialog\b[^>]*aria-labelledby="award-image-title"/);
  assert.doesNotMatch(html, /<dialog\b[^>]*\bopen(?:=|\s|>)/);
  assert.doesNotMatch(html, /protected.*download|Click to view full size/);
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([image]) => image);
  const previews = images.filter((image) =>
    /awards\/thumbnails|images\.credly/.test(image),
  );
  assert.equal(previews.length, 4);
  for (const image of previews) {
    assert.match(image, /width="360" height="240"/);
    assert.match(image, /loading="lazy"/);
  }
  assert.doesNotMatch(html, /<img\b[^>]*src="\/img\/awards\/[^/"]+\.jpg"/);
});

test("Credly snapshot preserves unique verification links and historical dates", async () => {
  const snapshot = JSON.parse(
    await readFile("src/data/credly-badges.json", "utf8"),
  );
  assert.equal(
    snapshot.profile,
    "https://www.credly.com/users/sajeetharan/badges/credly",
  );
  assert.match(snapshot.verifiedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(snapshot.badges.length, 42);
  assert.equal(new Set(snapshot.badges.map((badge) => badge.id)).size, 42);
  for (const badge of snapshot.badges) {
    assert.equal(badge.link, `https://www.credly.com/badges/${badge.id}`);
    assert.match(
      badge.image,
      /^https:\/\/images\.credly\.com\/size\/240x240\/images\//,
    );
    assert.ok(badge.title && badge.description && badge.organization);
    assert.match(badge.issuedAt, /^\d{4}-\d{2}-\d{2}$/);
    if (badge.expiresAt !== null) {
      assert.match(badge.expiresAt, /^\d{4}-\d{2}-\d{2}$/);
    }
  }
  assert.equal(
    snapshot.badges.find(
      (badge) => badge.id === "2c2d27ec-0e4e-4825-bac3-dc1e7d722f8e",
    )?.expiresAt,
    "2022-12-16",
  );
  assert.ok(
    snapshot.badges.some(
      (badge) => badge.title === "Microsoft Certified Trainer 2022-2023",
    ),
  );
});

test("blog controls have visible labels, toggle states, and live result feedback", async () => {
  const html = await readFile("build/blogs/index.html", "utf8");
  assert.match(html, /<label for="blog-search">Search posts<\/label>/);
  assert.match(html, /<input\b[^>]*id="blog-search"[^>]*type="search"/);
  assert.match(html, /<label for="blog-year">Year<\/label>/);
  assert.match(html, /<select\b[^>]*id="blog-year"/);
  assert.match(html, /aria-label="List view" aria-pressed="true"/);
  assert.match(html, /aria-label="Grid view" aria-pressed="false"/);
  assert.match(
    html,
    /id="blog-tags"[^>]*role="group" aria-label="Filter by tag"/,
  );
  assert.match(html, /role="status" aria-live="polite" aria-atomic="true"/);
  assert.match(html, /id="blog-posts"/);
});

test("homepage identity and Stack Overflow ranking are consistent and qualified", async () => {
  const html = await readFile("build/index.html", "utf8");
  assert.doesNotMatch(html, /stackoverflow\.com\/users\/3785469|Global top 10/);
  assert.match(html, /Top 10 in key tags/);
  assert.match(html, /Stack Overflow: Azure, Angular, Cosmos DB/);
  assert.match(
    html,
    /"sameAs":\[[^\]]*stackoverflow\.com\/users\/1749403\/sajeetharan/,
  );
});

test("homepage hero and topic strip are inside the main landmark", async () => {
  const html = await readFile("build/index.html", "utf8");
  const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/)?.[0];
  assert.ok(main);
  assert.match(main, /<h1\b[^>]*>Sajeetharan Sinnathurai<\/h1>/);
  assert.match(main, /Working across/);
  assert.doesNotMatch(html, /aria-label="Homepage sections"/);
  assert.match(html, /class="navbar\b/);
  for (const id of ["work", "mentoring", "talks", "about", "connect"]) {
    assert.ok(html.includes(`id="${id}"`), `retain the #${id} deep link`);
  }
});

test("the production theme includes ivory, ink, and accessible orange button colors", async () => {
  const files = await readdir("build/assets/css");
  const css = (
    await Promise.all(
      files
        .filter((file) => file.endsWith(".css"))
        .map((file) => readFile(`build/assets/css/${file}`, "utf8")),
    )
  ).join("\n");
  for (const token of [
    "--ifm-background-color:#fffaf2",
    "--ifm-background-color:#181512",
    "--ifm-color-primary:#c2410c",
    "--ifm-color-primary:#ffb073",
    "--site-on-accent:#fff",
    "--site-on-accent:#181512",
  ]) {
    assert.ok(css.includes(token), `missing theme token: ${token}`);
  }
  assert.match(
    css,
    /\.button--primary:not\(\.button--outline\)\{--ifm-button-color:var\(--site-on-accent\)\}/,
  );
  assert.match(
    css,
    /:root\[data-theme=(?:"dark"|dark)\]\{[^}]*--ifm-color-emphasis-600:#bfae9e/,
    "dark neutral tokens must override Infima's :root[data-theme] defaults",
  );
});

test("initial archive excerpts have sequential headings and a named cover link", async () => {
  const html = await readFile("build/blogs/index.html", "utf8");
  assert.match(html, /<h2\b[^>]*id="overview"/);
  assert.doesNotMatch(html, /<h4\b[^>]*id="overview"/);
  assert.match(
    html,
    /alt="Cloud Scale Analytics with Azure Data Services book cover"/,
  );
});
