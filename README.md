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

### Browser-tab icon

The custom Sajee interlock mark uses two cyan geometric ribbons on a dark-navy
tile, hinting at an S and code brackets without relying on text at small sizes.
Its editable source is [`static/img/sajee-mark.svg`](static/img/sajee-mark.svg).
The site advertises the SVG, a 32px PNG fallback, and a 180px Apple touch icon.
The multi-resolution [`static/favicon.ico`](static/favicon.ico) contains 16px,
32px, and 48px versions; `static/img/favicon.ico` retains the legacy URL with
the same artwork. Keep raster exports aligned with the SVG when editing the
mark. The Apple icon has an opaque background so devices can apply their own mask.
This branding applies to browser/bookmark icons, not the navbar portrait.

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

### Ask Sajee contact guide

`src/theme/Root.tsx` mounts the lightweight Ask Sajee launcher across the site.
The launcher opens a native dialog only when activated; without JavaScript its
ordinary link falls back to `/contact`. The dialog routes visitors to a paid
Topmate priority DM, four mentoring/video services, or an email draft for speaking,
collaboration, article questions, and corrections. It is not live chat or AI.
No message form, backend, external chat script, custom analytics events, or
conversation storage is added.

`src/data/mentoring.ts` is the shared source for Topmate service details and
links used by both the widget and Get Mentored page. Keep current pricing and
response terms on Topmate, not in the widget. Visitors type their question there
instead of repeating it after a handoff.

Email drafts use `sajeefx@gmail.com`, a suggested subject, and the current
canonical page path without query parameters or fragments. They open in the
visitor's email app and require the visitor to send manually; no delivery
confirmation is implied. The address remains visible for manual copying.

The dialog supports Escape, a close button, backdrop dismissal, keyboard focus
containment/restoration, and Back navigation between contact options. It closes
on site-path changes, and print output hides both widget controls. Hidden dialogs are excluded
from generated Markdown so global contact prompts do not pollute article exports.

### Homepage navigation and events

The site uses warm ivory surfaces, ink text, and burnt-orange accents, with
charcoal surfaces and apricot accents in dark mode. Shared theme tokens live in
`src/css/custom.scss`; homepage highlights and blog controls use those tokens
rather than hard-coded cyan. Existing browser-tab artwork is unchanged.

The enlarged homepage portrait uses nine supplied expression photos, cropped
from the user's 3-by-3 expression grid into `static/img/expressions/*.webp`.
The original attachment is not changed. Each crop is 480 by 320 pixels, without
the grid's white gutters; all nine main images load up front to avoid flashes.
`src/data/portrait-reactions.ts` maps the Navarasa names and six props to the
photos: slap, pinch, boxing glove, feather, flower, and spider. Tool use counts
are independent. Repeated pinches deepen localized cheek redness; punches
alternate angry/sad photos. A small, non-graphic nosebleed appears after three
boxing-glove uses automatically, without a settings checkbox.
Gentle props clear redness and injury effects on contact. The "Nine moods, one
developer" playground grows to 600px wide on desktop and stacks below the copy
on tablet/mobile. All nine expressions are reached through the props, without
a separate expression picker. Only the photo and labeled props are visible:
no selected-tool text, reaction counter, captions, action/reset buttons, or
how-to instructions. Accessible labels and screen-reader-only expression
announcements remain.

Click, tap, horizontal swipe, and Enter/Space on the photo are equivalent
ways to apply a prop. Vertical touch scrolling is preserved and a swipe counts
once, not again on its synthesized click. Reloading starts a fresh scene.
One scene is shared across responsive layouts; the small mobile portrait links
to it below the hero copy. Reduced-motion mode retains photos, skin effects,
and accessible expression announcements without movement. Photos and shaded vector props stay
local: no AI service, image uploads, sound, tracking events, or API calls.

The homepage keeps the main navbar without a second sticky section menu.
Section IDs remain available for direct links. Concise work and talk previews
and a native expandable biography keep the initial page compact without hiding
content behind JavaScript. The complete talk collection remains at `/talks`.
Upcoming event details are shared by the homepage and talks page through
`src/components/talks/UpcomingEvents.tsx`. Keep dates and the agenda link current;
only add session titles or times when confirmed by the organizer.

### Hire Me page and free-tier AI

`/hire-me` combines an original recruiter landing page, public FAQs, contact
links, and an optional text AI assistant with browser speech input/read-aloud.
One sitewide header combines the logo, navigation, GitHub, LinkedIn, X/Twitter,
email, a single Hire Me button, and the theme toggle. Social icons use a custom
Docusaurus navbar item so the same links appear inside the mobile hamburger
menu; there is no separate utility bar. The existing Ask Sajee widget remains a separate non-AI contact guide on
other pages; it is hidden on Hire Me to avoid two competing assistant controls.

`src/data/hire-me.json` is the shared source for the visible FAQs and the
server-side assistant knowledge. Keep facts and source links aligned with the
published career/project pages. Do not copy another person's career claims,
invent metrics, or imply job-search status or availability. The assistant uses
curated public facts rather than private documents; update them when the portfolio changes.
The site does not publish a downloadable CV.

The AI requires the existing Cloudflare Worker; GitHub Pages alone cannot run it.
There are no new packages, client-side API keys, ElevenLabs subscription, or paid
voice calls. Cloudflare Workers AI currently includes 10,000 Neurons/day across
the account, resetting at 00:00 UTC. On **Workers Free**, exhausted quotas fail
rather than incur overage charges. This is not a fixed number of conversations
or an unlimited service. Keep the account on the Free plan: Paid plans can bill
usage beyond the allowance. Check the current
[Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/)
before enabling the feature.

To enable:

1. Use a Cloudflare Workers **Free** account and review Workers AI terms, privacy
   disclosures, and the selected Llama model's license.
2. Verify that rate-limit namespace IDs `1001` and `1002` in `wrangler.jsonc` do
   not conflict with existing limiters on that account; change them if needed.
3. Set `HIRE_ASSISTANT_ENABLED` to `"true"` in `wrangler.jsonc`. It is deliberately
   `"false"` until the owner opts in. The `AI` binding uses Cloudflare's account
   authentication; no model API key belongs in the browser or repository.
4. Authenticate Wrangler locally (`npx wrangler login`) and run
   `npm run deploy:worker`, or use the existing Cloudflare deployment workflow.
   The configured custom domains must route through this Worker, not only
   GitHub Pages. Deployment changes your live hosting; review those routes first.
5. Check `GET /api/hire-me` returns `{"available":true}`. Test a real text question,
   an unknown fact, an identity question, private-information requests, and
   attempts to override the instructions. Model behavior is probabilistic;
   mocked unit tests do not establish live guardrail quality.

For static development use `npm start`; AI shows an honest unavailable state.
To exercise the Worker after building, use `npx wrangler dev --local-protocol https`
(trust the local development certificate in your browser). HTTP requests intentionally
redirect to the production HTTPS domain. Actual Workers AI
inference uses the account's remote service/allowance and requires authentication.
The server accepts same-origin JSON POSTs with explicit processing consent,
1-7 alternating user/assistant messages of up to 1200 characters each, an 8 KB
body limit, and at most 240 generated tokens. Model replies are rendered as text,
never HTML. Only public facts enter the system prompt; there are no tools or secrets.
Prompts instruct it to identify as AI, preserve attribution/numbers, decline
private topics, and defer unknown facts/terms to direct contact. These are
instructions, not a guarantee of correct or jailbreak-proof output.

Limits are approximately five requests per visitor per minute and 30 requests
per minute across the page, **per Cloudflare location**, not strict global caps.
Origin checks reduce browser cross-site use but are not authentication or bot
protection; non-browser clients can spoof them. Provider quotas remain the Free
plan spending boundary. Errors and exhausted quotas are explicit, with FAQ and
contact recovery. Set the enable flag back to `"false"` and redeploy to disable AI.

The page asks for processing consent before text or microphone use. Audio
recognition is browser-dependent, may use a browser provider's servers, runs for
one utterance/up to 30 seconds, and only fills a draft; sending is a separate
action. Read-aloud is opt-in and uses a browser voice, not voice cloning.
No transcripts/audio are stored by this site, and no chat analytics events are
added; existing site analytics and provider policies still apply. The last three
completed exchanges live only in page memory. See `/privacy#hire-me-ai-assistant`.

Validation: `npm run typecheck`, `npm run build`, then
`node --test tests/hire-me.test.mjs tests/worker.test.mjs tests/site-quality.test.mjs tests/contact-widget.test.mjs`.
Endpoint tests mock inference; a live Cloudflare smoke test is still required
after account setup and deployment.

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
The site title is the author's name rather than a repeated keyword-heavy suffix;
the homepage, blog, and topic pages supply their own descriptive titles.

#### Article metadata and topic hubs

Every individual article receives one `BlogPosting` and a `BreadcrumbList` from
`src/theme/BlogPostPage/Metadata/index.tsx`, alongside Docusaurus's standard
canonical, description, Open Graph, and publication metadata. The author falls
back to this site's owner for legacy posts without an explicit author; a visible
byline links to the biography. Images use the article image when supplied and
the site image otherwise. `BlogPostSeo` is only for the existing article's custom
social title/image and visible FAQ, not a second article schema.
Use `dateModified` (a quoted ISO timestamp in front matter) only after a real
article update; builds do not invent freshness dates.

`plugins/topic-hubs.cjs` generates `/topics` and six server-rendered collections:
Azure, Azure Cosmos DB, AI agents, AI engineering, MCP, and agent skills.
`src/data/topics.json` owns their introductions, accepted tag aliases, and
curated starting points. Collections use Docusaurus's actual article permalinks,
sort newest first, and exclude draft/unlisted posts. A missing curated article
fails the build. The hub, articles, homepage, blog listing, footer, sitemap, and
agent-readable index link these pages without requiring client-side filtering.
Keep the current theme tokens, visible focus styles, and 44px topic link targets.

For a new article:

1. Write a specific title and original description that answer a reader's task.
2. Set `authors: [Sajeetharan]`, relevant tags from the topic definitions, and
   a descriptive social image. Preserve established slugs when updating articles.
3. Explain prerequisites, tested versions, reproducible steps, and limitations.
   Include original evidence or results, not just a paraphrase of documentation.
4. Add contextual links to the most useful related articles. Update a topic's
   `startHere` only when the article is a good entry point, not just because it
   is newest. Legacy tag aliases keep older posts discoverable.
5. Run `npm run typecheck`, `npm run build`, and `npm test`. SEO tests validate
   generated HTML, all article schemas, topic links, sitemap entries, and Markdown.

#### Building topical authority

The topic pages organize existing work; they do not claim to be comprehensive
courses. MCP in particular currently has project experiences and conference
reflections rather than a full implementation series. Prioritize original,
tested articles to close those gaps:

- **Azure:** local-to-cloud deployment, identity, observability, and measured cost.
- **Cosmos DB:** partition design with workload evidence, RU measurements, and
  vector retrieval quality using a reproducible dataset.
- **Agents / AI:** memory isolation, tool failure recovery, and baseline versus
  changed-agent evaluations with published test cases.
- **MCP:** a minimal working server, permission boundaries, and integration tests.
- **Skills:** one focused skill, an evaluation dataset, and measured regressions
  across model or instruction changes.

Publish at a sustainable cadence and maintain the best guides as products evolve.
After deployment, submit the sitemap in Google Search Console, inspect the hub
and representative articles, and validate article markup with Google's
[Rich Results Test](https://search.google.com/test/rich-results).
Track non-branded query impressions, clicks, CTR, and average position by topic
over successive 28-day periods. Use the actual queries to prioritize follow-ups
and refreshes; no structured data, keyword list, or `llms.txt` guarantees rankings
or inclusion in AI answers. FAQ rich results are generally restricted to
authoritative government and health sites, so the existing FAQ is not a promised
search enhancement.

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
