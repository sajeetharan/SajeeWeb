import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const profile = "https://www.credly.com/users/sajeetharan/badges/credly";
const endpoint =
  "https://www.credly.com/users/acb41f13-f1dc-4576-ad21-7c0cfca72a2c/badges";
const badges = [];
let totalCount;
let totalPages = 1;

for (let page = 1; page <= totalPages; page++) {
  const response = await fetch(`${endpoint}?page=${page}&page_size=48`, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Credly returned HTTP ${response.status} for page ${page}`);
  }
  const { data, metadata } = await response.json();
  assert.ok(Array.isArray(data), "Credly must return a badge array");
  assert.ok(Number.isInteger(metadata?.total_pages), "Missing page count");
  assert.ok(Number.isInteger(metadata?.total_count), "Missing badge count");
  totalPages = metadata.total_pages;
  totalCount = metadata.total_count;

  for (const badge of data) {
    assert.equal(badge.public, true, "Only import public badges");
    assert.equal(badge.state, "accepted", "Only import accepted badges");
    assert.equal(badge.earner_path, "/users/sajeetharan");
    const template = badge.badge_template;
    const organization = badge.issuer.entities.find((e) => e.primary)?.entity
      .name;
    assert.ok(template?.name && template.description && organization);
    assert.match(badge.id, /^[a-f0-9-]{36}$/);
    assert.match(badge.issued_at_date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(
      badge.expires_at_date === null ||
        /^\d{4}-\d{2}-\d{2}$/.test(badge.expires_at_date),
    );
    const image = new URL(badge.image_url);
    assert.equal(image.origin, "https://images.credly.com");
    assert.ok(image.pathname.startsWith("/images/"));
    image.pathname = `/size/240x240${image.pathname}`;
    badges.push({
      id: badge.id,
      title: template.name,
      organization,
      issuedAt: badge.issued_at_date,
      expiresAt: badge.expires_at_date,
      description: template.description,
      image: image.href,
      link: `https://www.credly.com/badges/${badge.id}`,
    });
  }
}

assert.equal(
  badges.length,
  totalCount,
  "The snapshot must include every badge",
);
assert.equal(new Set(badges.map((badge) => badge.id)).size, badges.length);
badges.sort(
  (a, b) => b.issuedAt.localeCompare(a.issuedAt) || a.id.localeCompare(b.id),
);
const output = new URL("../src/data/credly-badges.json", import.meta.url);
await mkdir(new URL(".", output), { recursive: true });
await writeFile(
  output,
  `${JSON.stringify(
    {
      profile,
      verifiedAt: new Date().toISOString().slice(0, 10),
      badges,
    },
    null,
    2,
  )}\n`,
);
console.log(`Saved ${badges.length} verified public Credly badges.`);
