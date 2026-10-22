# Sajeetharan Sinnathurai - Personal Website

This repository contains the source for [sajeetharan.dev](https://www.sajeetharan.dev).

## Development

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Toolchain

This project uses [Volta](https://github.com/volta-cli/volta) to manage the NodeJS version. Volta automatically downloads and installs the right Node.js version when you run any of the `node` or `npm` commands. Therefore, it is recommended to install it before developing this project to ensure the right Node.js version is used.

### Installation

```
$ npm install
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Mentoring reviews

The homepage review cards in `src/components/homepage/Reviews.tsx` contain
verbatim excerpts from the public ADPList and Topmate profiles (verified
October 20, 2026). Keep author names, full text, and source links aligned with
the originals when updating them. These are curated snapshots, not a live feed.
Three highlights appear initially; visitors can filter by platform, expand long
reviews, or show all six. Original reviews and mentoring impact remain linked
on each platform, and the booking link leads to `/mentored`.

### Mentoring services

The Get Mentored page (`src/pages/mentored.tsx`) promotes Topmate exclusively,
with direct links to all five services: 1:1 Mentorship, PM Interview Prep,
Pathway to Product Management, Ask me anything, and Discovery Call. Paid
services appear before the introductory discovery call. Service names, formats,
durations, and links were verified against the public Topmate profile on
October 20, 2026; keep them aligned when offerings change. Pricing and
availability are shown on Topmate rather than duplicated here.
ADPList remains a source for existing homepage testimonials, not a booking
option on the Get Mentored page.

### Homepage navigation and events

The homepage uses sticky section shortcuts, concise work and talk previews, and
a native expandable biography to keep the initial page compact without hiding
content behind JavaScript. The complete talk collection remains at `/talks`.
Upcoming event details are shared by the homepage and talks page through
`src/components/talks/UpcomingEvents.tsx`. Keep dates and the agenda link current;
only add session titles or times when confirmed by the organizer.

### Awards, accessibility, and image budgets

The Awards & Recognition page opens with four curated highlights: Microsoft
MVP, Google Developer Expert, HackerNoon Noonies, and the Microsoft Global
Hackathon 2021 Challenge Winner badge. Category filters expose the complete
collection, including all 42 public Credly badges verified October 22, 2026.
Issued and expiry dates are historical records, not claims of active certification.
The previous undated "Active" trainer card is replaced by the dated Credly records.

Refresh the checked-in snapshot with `node scripts/sync-credly-badges.mjs`.
This explicitly fetches the public profile's badge data, validates ownership and
pagination, and writes only display metadata to `src/data/credly-badges.json`.
Review source changes and highlight/category choices before committing. Neither
the build nor visitors fetch the Credly API; badge artwork loads lazily from
Credly's sized image endpoint, with individual verification links.

Award image previews use local WebP thumbnails; original photos load only when
the native image dialog is opened. Keep the navbar's 96px WebP below 10 KB and
local award thumbnails below 100 KB each. Do not restore the full-resolution
logo in navigation. Regression tests enforce these budgets.

Blog controls have visible labels, pressed states, live result counts, and
44px minimum heights. Preserve those semantics when changing filters. The
awards image dialog supports Escape, keyboard focus containment, and focus
restoration through the native browser dialog behavior. Global focus indicators,
contrast-safe light-theme primary colors, and reduced-motion styles apply
across these surfaces.
Muted text, contribution/social cards, and code highlighting also use
contrast-safe colors in both themes. In the initial blog listing, the archived
pagination article has a sequential heading outline, and the book-giveaway
article's linked cover has descriptive alternative text.

### Deployment

The static site is deployed from `main` with GitHub Pages. The optional
Cloudflare Worker serves negotiated Markdown responses from the same build.

To deploy the Worker, configure `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` as GitHub Actions secrets, then dispatch **Deploy
Cloudflare Worker**. To publish the CLI, configure `NPM_TOKEN`, increment the
version in `cli/package.json`, and dispatch **Publish CLI**.

### AdSense ownership verification

The global `headTags` in `docusaurus.config.ts` include the public
`google-adsense-account` meta tag for publisher `ca-pub-7456507971681343`.
After deployment, select **Meta tag** in AdSense's site ownership verification,
confirm the tag is placed, and click **Verify**. Complete the site review steps
in AdSense. This tag verifies ownership only: it does not load advertising
scripts, enable Auto ads, or mean that Google has approved the site.
Before enabling ad serving, publish an accurate site privacy notice and
configure the consent messages/CMP required for the regions being served.

### AdSense review readiness and privacy disclosures

The footer links to `/privacy` and `/contact`. Their Markdown sources live in
`src/pages/privacy.md` and `src/pages/contact.md`. The public enquiry/privacy
email is `sajeefx@gmail.com`, confirmed by the site owner. The privacy notice
describes the currently configured Analytics, hosting/proxy providers, external
content, and AdSense verification-only status. No ad scripts or CMP are enabled
by these pages; do not treat publishing a policy as collecting consent.

Before serving ads:

- Review the notice for accuracy and obtain jurisdiction-specific advice where
  necessary. Confirm Analytics consent requirements too; its existing script
  is not newly gated by this PR.
- In AdSense **Privacy & messaging**, configure a Google-certified CMP and
  publish applicable consent messages for EEA, UK, and Swiss visitors, plus
  any other applicable regional requirements. Confirm behavior before enabling
  ads; a generic homemade cookie banner is not equivalent to a certified CMP.
- Follow any `ads.txt` instructions supplied by the AdSense account. The meta
  tag proves ownership but does not authorize sellers through `ads.txt`.
  `static/ads.txt` publishes Google's documented direct-seller entry for
  `pub-7456507971681343`, matching the ownership tag. It does not turn on ads
  or represent account approval. After deployment, verify both
  `https://sajeetharan.dev/ads.txt` (through the apex redirect) and
  `https://www.sajeetharan.dev/ads.txt`, then use **Check for updates** in
  AdSense if an ads.txt warning is present. Compare the entry with the account's
  own snippet; other ad networks need their own authorized entries.
- Review original authorship, image permissions, code completeness, and broken
  resources across archived posts. A migrated archive is not automatically
  compliant, and this change does not certify every article or external image.
- Keep ads off redirects, error pages, and screens without sufficient publisher
  content. Decide appropriate article placements only after review/approval.
- Complete any identity, address, payment, and policy tasks requested in AdSense.
  Never click your own ads or ask readers to click them.

Google's [site readiness guidance](https://support.google.com/adsense/answer/7299563)
and [eligibility requirements](https://support.google.com/adsense/answer/9724)
prioritize original, useful content and navigation. There is no approval
guarantee from these technical changes; site ownership verification and search
indexability are not AdSense approval.

### Blog search visibility

The blog title and description are configured in `docusaurus.config.ts`.
`BlogPostSeo` must emit article-specific metadata only on individual post pages,
not blog or tag listings that render post excerpts. Keep its `isBlogPostPage`
guard when adding SEO fields. `static/robots.txt` advertises the sitemap.

The old WordPress.com site is a separate host: changes in this repository
cannot redirect its articles. The checked-in `worker/blog-redirects.mjs`
snapshot maps all 124 published WordPress article permalinks, verified through
the public WordPress API on October 21, 2026, to existing canonical URLs.
It includes the duplicate GitHub-profile post and the restored, clearly marked
2017 Angular archive article. Existing canonical URLs are not renamed.
Many imported URLs also contain repeated year/month segments (for example,
`/blogs/2020/07/10/2020/07/how-to-build-a-rocking-github-profile`).

`npm run build` validates every destination against the sitemap and generates
compatibility HTML at the old `/YYYY/MM/DD/slug/` paths. GitHub Pages serves
these with **HTTP 200 plus an immediate meta refresh and canonical link**, not
a server-side 301. A small script also preserves query parameters and fragments;
the meta refresh and ordinary link work without JavaScript.
Aliases are excluded from the sitemap and Markdown export.
The Markdown post-build step also computes skill discovery digests from the
actual built files so Windows and Linux line endings cannot invalidate them.
The blog listing links to the complete server-rendered archive so older
articles do not depend on the JavaScript-only Load more button for discovery.
Imported article cross-links now use their canonical destinations directly
instead of sending readers back to WordPress; original media URLs are retained.

The optional Cloudflare Worker uses the same snapshot for **HTTP 301 redirects**,
before content negotiation. It preserves queries and canonicalizes the domain
and HTTPS in the same hop. Unknown articles still return 404, not the homepage.
The Worker must actually be deployed and serving the domain for these
server-side redirects to take effect; a GitHub Pages deployment alone does not
activate it. Do not deploy an old Worker build over a newer Pages build.

To refresh the mapping after importing more old posts, run `npx docusaurus build`,
then `npm run sync:blog-redirects`, then `npm run build` and `npm test`.
Only the explicit sync command calls the public WordPress API; ordinary builds
and deployments use the verified snapshot offline. Sync fails on missing or
ambiguous destinations instead of inventing redirects.

#### Manual launch checklist

1. Merge this PR and wait for the GitHub Pages deployment to succeed. Test
   `/2020/07/10/how-to-build-a-rocking-github-profile/` on the new domain:
   it must reach the matching article, not a 404.
2. For server-side 301s, configure `CLOUDFLARE_API_TOKEN` and
   `CLOUDFLARE_ACCOUNT_ID`, then run the **Deploy Cloudflare Worker** workflow
   from the merged `main` branch. Confirm the Worker owns/serves both configured
   custom domains. Test both HTTP/HTTPS and www/non-www with `curl -I`.
   If retaining GitHub Pages without the Worker, the HTML redirect fallback
   remains functional, but it is not an HTTP 301.
3. In the WordPress.com account, enable a
   [Site Redirect](https://wordpress.com/support/domains/site-redirect/) to
   `www.sajeetharan.dev` (the root, **not** `/blogs`). This is an account-level,
   potentially paid action. WordPress preserves the old permalink path, which
   the compatibility routes now handle. Test several old-domain article URLs,
   including the duplicate GitHub-profile and encoded Angular permalink.
   This mapping covers published posts, not WordPress category, attachment,
   comment, feed, or standalone-page URLs; review those separately before
   switching the entire site. Keep redirects active for at least a year.
4. Verify both properties in
   [Google Search Console](https://search.google.com/search-console/).
   Use a Domain property for `sajeetharan.dev` if possible; verify the
   WordPress property using the method supported by your WordPress plan.
   Submit `https://www.sajeetharan.dev/sitemap.xml`, inspect representative
   article URLs and Google's chosen canonical, and use Change of Address
   if supported for the verified source property and redirect setup.
5. In GA4, confirm measurement ID `G-Z468LV5WJ4` belongs to the intended
   property and verify a blog visit in Realtime/DebugView. Compare organic
   clicks in Search Console over equal 28-day periods, rather than comparing
   WordPress/Blogger platform views directly with GA4 views. WordPress Reader
   views and analytics blocking can produce different totals.
6. Export your formerly popular landing pages and search queries. Use those
   results to select the first ten articles to refresh, add relevant internal
   links, and update old backlinks on profiles, DEV, and social posts to the
   canonical new URLs. Republishing or updating content requires editorial
   review; do not change original publish dates or invent traffic claims.

Google's [site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
explains why one-to-one redirects and monitoring are important. Do not delete
the old site before verifying the migration. These fixes improve technical
discoverability but cannot guarantee rankings or traffic.
