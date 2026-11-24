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

The retained review component in `src/components/homepage/Reviews.tsx` contains
verbatim excerpts from the public ADPList and Topmate profiles (verified
October 20, 2026). Keep author names, full text, and source links aligned with
the originals when updating them. These are curated snapshots, not a live feed.
It is no longer mounted on the simplified homepage. The `/mentored` page keeps
its approved testimonials and original source links.

### Mentoring services

The Get Mentored page (`src/pages/mentored.tsx`) promotes Topmate exclusively,
with direct links to all five services, led by the free 15-minute Discovery Call,
followed by 1:1 Mentorship, PM Interview Prep, Pathway to Product Management,
and Ask me anything. The page focuses on engineer-to-PM transitions and
interview preparation, with service audiences, practical takeaways, preparation
guidance, and two permission-approved Topmate testimonial excerpts.
Service names, formats, durations, links, and the free discovery call were
verified against the public Topmate profile on November 9, 2026; keep them
aligned when offerings change. Other pricing and availability remain on Topmate.
ADPList remains a source for the retained review component, not a booking
option on the Get Mentored page.

The homepage and SkillGraph award link to mentoring. Blog posts opt into a
career mentoring CTA with `mentoring: true` in front matter. The selected career,
PM, and DevGlobe product-building posts show it; other technical posts and
blog-list previews do not. The CTA links to the free discovery-call journey on
`/mentored` and the free `/engineer-to-pm-checklist` resource.
The checklist is also linked from the mentoring page. It provides ten
reflection prompts with native checkboxes and browser printing/PDF saving,
without email signup, a readiness score, storage, or checkbox analytics.
Selections reset on reload. Update the checklist in
`src/pages/engineer-to-pm-checklist.tsx`; Topmate details stay shared in
`src/data/mentoring.ts`.
Existing Google Analytics receives `mentoring_view` and `mentoring_click`
events with fixed placement/action labels only, including checklist links and
booking handoffs from the checklist. These measure visits and
interest, not confirmed bookings; no new analytics provider is added.

### Ask Sajee contact guide

`src/theme/Root.tsx` mounts the lightweight Ask Sajee launcher across the site.
The launcher opens a native dialog only when activated; without JavaScript its
ordinary link falls back to `/contact`. The dialog routes visitors to a
Topmate priority DM, four mentoring/video services, or an email draft for speaking,
collaboration, article questions, and corrections. It is not live chat or AI.
No message form, backend, external chat script, custom analytics events, or
conversation storage is added.
The launcher uses an outlined treatment to keep attention on page content,
filling with the accent color on hover or keyboard focus.

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
neutral charcoal surfaces, cool-gray secondary text, and apricot accents in dark mode.
Cream headings keep the dark palette warm. Shared theme tokens live in
`src/css/custom.scss`; homepage highlights and blog controls use those tokens
rather than hard-coded cyan. Existing browser-tab artwork is unchanged.

The landing page in `src/pages/index.tsx` keeps a concise introduction,
writing/talk links, mentoring, and contact links.
Its browser and social-sharing title use the full name, Sajeetharan Sinnathurai;
the visible greeting retains Sajee, while the navbar title beside the portrait
reads "I help Developers build what's next".
Compact GitHub, LinkedIn, X/Twitter, and email icons sit below the introduction
for quick contact, reusing the existing social-link component with accessible
names and 44px targets. Text contact links remain near the bottom.
Selected work is no longer shown on the landing page; projects remain accessible
from Projects in the navbar and Work in the compact footer. The footer also links to the career
profile, contact, topics, and privacy. The existing `#about`, `#work`, `#talks`,
`#mentoring`, and `#connect` targets remain available.

The office focuses on the portrait and navigation. There are no playful prop
actions, reaction effects, or separate "Nine moods, one developer" panel.
`src/components/homepage/DeveloperDesk.tsx` composes an original, fully layered
illustrated office drawn in `src/components/homepage/OfficeArtwork.tsx`, with
Sajeetharan's likeness, a laptop, cloud monitor, books, microphone, coffee,
trophy, plants, and robot. The room, character, foreground laptop, and each
navigation object are separate SVG layers, not crops or highlights
over a flattened image. No third-party office artwork is copied or loaded.
Each native navigation link contains its own illustrated object. Hovering or
focusing it plays an independent reaction: the note flutters, books bounce,
microphone swings, mug tilts with rising steam, trophy rocks and sparkles,
robot wiggles and blinks, GitHub sticker bounces, and Instagram photo sways.
Link targets stay fixed while their artwork moves.
The scene itself is the navigation at every screen size, without a separate
button grid. "My Projects" is written on a pinned wall note and links to Projects.
The books, microphone, mug, trophy, and robot link to Blogs, Talks, Get Mentored,
Awards, and Developers. An official GitHub logo sticker on the laptop links
to the GitHub profile, reusing the social-link component's icon and URL.
The Instagram photo on the wall links to `https://www.instagram.com/sajeetharan/`;
its official camera glyph comes from Simple Icons (CC0).
Small arrow badges and persistent destination labels mark every navigation
object, without an instruction paragraph. Labels remain readable without
hovering or waiting for animation, and adapt to the scene's actual width.
While the visible scene is idle, an object takes a turn every four seconds
to perform its own motion, starting with Projects. These invitations
yield to hovering or keyboard-focusing navigation and stop in a hidden tab,
outside the viewport, or with reduced motion. The static arrow cues and
destination labels remain available without animation.
Every object has an accessible
name and a minimum 44px target. Percentage-based positions keep these links
attached to the artwork as it resizes.
The character depicts AI-assisted coding in a 12.8-second pose loop:
pressing Tab, thinking, frustration, an annoyed laptop tap, praying,
relief, and a hands-up celebration.
These are generated photographic poses with short crossfades, not continuous video.
The whole character uses consistently shaded, photo-referenced illustrations,
including natural clothing folds, connected arms, and joined prayer hands.
Seven registered transparent WebP poses in `static/img/office-character` keep
the face, shoulders, and torso aligned and crossfade over 180ms.
The lower body in every pose is clipped to the desktop's shared back edge,
including during crossfades; the keyboard hand can extend onto the desktop.
The Tab key
animates during the keyboard pose and is positioned under the illustrated
index finger. The room does not move. The loop runs automatically; a labeled
Pause/Resume animation button with the same pause/play icons as Mentoring News
below the desk keeps the current pose still
without disabling navigation or pausing the separate reviews. Pausing also
stops the keyboard and automatic object invitations. The loop stops outside
the viewport or in a hidden tab. Reduced
motion leaves a still keyboard pose and disables object reactions.
The animation button is disabled and labeled "Motion reduced" in this mode.
The head and body have no tooltip or invisible click targets.
The "Tab Pray Repeat" quote remains printed on the shirt.
The smaller chest lettering and four-color Microsoft mark are composited into
each portrait WebP with pose-specific placement, fabric shading, and hand
occlusion. There are no floating text or logo overlays, or white badge backgrounds.
Both prints crossfade with the photograph and retain the same appearance in
light and dark themes.
The office illustration remains visible in full rather than becoming a photo
card. Material gradients on the wall, desk, and laptop, softer outlines, and
subtle object shadows bring the illustrated room closer to the shaded portrait.
Reduced motion disables pose transitions, the key press, and object animations;
keyboard focus outlines remain visible.
The portrait wears a four-color Microsoft chest print and the AI-coding quote
in all seven poses.
Clicking the logo opens the [LinkedIn profile](https://in.linkedin.com/in/sajeetharan);
the link is keyboard-accessible and has a minimum 44px target.
The wall displays framed photographs of the actual Microsoft MVP award
(2017-2019) and Google Developer Expert recognition (2018-present), reusing the optimized
images from `static/img/awards/thumbnails`. These are background artwork;
the trophy still provides the existing Awards navigation.
A compact "Mentoring news" banner below the desk shows 14 short review excerpts
verified on the public Topmate and ADPList profiles on 2026-11-23, stored in
`src/data/mentoring.ts`. Each entry retains its platform, public source URL,
and author when displayed by the source. The original curated Topmate pair
on the mentoring page stays unchanged. The banner crossfades every six seconds,
with manual next and pause controls for reviews only. Hover, keyboard focus,
hidden tabs, and leaving the viewport suspend rotation.
Reduced motion disables automatic rotation and fading. Overlaid grid entries
reserve the tallest review's space so changing text does not move the page.
It does not claim LinkedIn recommendations without verified excerpts.
The photographic playground, line portrait, and greeting-eyes components remain available but are not
mounted on the homepage.

The shared navbar shows Blogs, Talks, Projects, Awards, Get Mentored, and
Developers directly, with About me, Contact, and Hire Me under More.
The longer brand title wraps beside the logo, and mobile navigation retains
the native menu. No routes were removed. Light mode is the default, with system
preference and the theme toggle still supported; returning visitors retain
their saved choice.

### Recruiter and collaborator paths

The homepage pairs the office with a clear introduction and an "Explore my
projects" action, without repeating the award credentials under the greeting.
The wall artwork and trophy link retain award discovery.
Three featured project cards appear before Writing
& talks, with descriptions and explicit source links drawn from the shared
profile data. The homepage retains direct links to projects and mentoring.
Recruiter and collaborator details live on
the career and Contact pages rather than adding more homepage sections.
Featured project facts are exported by `src/data/featured-projects.ts` from
`static/profile.json` and shared by the career page and project listing.
Keep contribution roles and shipped deliverables
grounded in public evidence; do not invent adoption or business-impact metrics.
The Contact page has stable `#recruiters`, `#collaboration`, and `#speaking`
anchors with email drafts, a visible fallback address, and no delivery promise.

`src/theme/Root.tsx` sends custom GA4 events through the existing `gtag` integration:

- `career_view`: each client-side entry to `/career` (including a direct load).
- `project_click`: marked project links, with `project_id` and `action`
  (`source`, `demo`, or `guide`).
- `contact_click`: marked email links on Contact, with `audience`
  (`recruiter`, `collaborator`, or `speaking`).

Custom payloads do not include link URLs, email drafts, message text, or query
parameters. The widget and playground remain untracked by custom events. Missing
or blocked analytics never prevents navigation; there is no retry or alternate
tracking provider. Project source links elsewhere on the site are not inferred.
GA4's existing automatic collection settings remain separate.

To validate production collection, use GA4 Realtime/DebugView with your normal
debug setup: enter Career, follow a marked project source/demo link, then click
one of the Contact email links. Register `project_id`, `action`, and `audience` as
event-scoped custom dimensions if needed for reports. An email click measures
intent, not a confirmed enquiry. Use campaign links such as
`?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio` when sharing a
project; do not attach personal information to campaign parameters. Compare
qualified actions and engaged sessions by source rather than raw page views.

### Professional identity and search discovery

`static/profile.json` is the canonical public professional profile and is copied
unchanged to `/profile.json` by Docusaurus. It supplies the current role,
professional summary, expertise, career timeline, featured project facts, official
profile links, and contact URL. Only publish professional facts already supported
by the linked public career/project pages. Keep `lastUpdated` accurate when
editing these facts; it is an editorial update date, not proof of employment
verification or an automatically refreshed timestamp. Do not add private contact
details, confidential results, or inferred job-search status.

`src/data/profile.ts` derives the shared Person identity
`https://www.sajeetharan.dev/#person` and the career ProfilePage schema. The homepage,
career page, article authors/publisher, and official profile links connect to that
identity. The career page renders the same timeline and project evidence as JSON.
The Hire Me FAQs and `blog/authors.yml` retain their existing formats; keep their
name, role, and claims aligned with this source. Regression tests check identity,
schema links, and public resource discovery.

The JSON is advertised in sitewide HTML head links, the career/developer pages,
`llms.txt`, the API catalog, the site-navigation skill, and CLI resource aliases.
It is a site-specific format, not a standardized agent registration, a search
submission, or a guarantee of indexing, rich results, recruiter matching, or AI
recommendations. No new chat, MCP server, or homepage redesign is required.
GitHub Pages serves the `.json` file directly; `_headers` is only relevant to
hosting configurations that support it, not evidence that Pages sets those headers.

After deployment, the site owner still needs to:

1. Verify the domain in [Google Search Console](https://search.google.com/search-console/)
   and [Bing Webmaster Tools](https://www.bing.com/webmasters/), submit
   `https://www.sajeetharan.dev/sitemap.xml`, and inspect the canonical homepage
   and career page. Account verification requires the owner's credentials or
   provider-issued verification token; do not invent tokens or claim completion.
2. Use [Google's Rich Results Test](https://search.google.com/test/rich-results)
   and URL Inspection for the deployed career page. Valid JSON-LD alone does not
   guarantee a supported result or eligibility.
3. Check Cloudflare security events for legitimate Googlebot, Bingbot, and
   OAI-SearchBot requests. A public request with a crawler user-agent only tests
   basic reachability, not verified crawler IP access or account-level WAF rules.
   The existing `robots.txt` allows crawling; retain its training-preference
   signal. OpenAI's OAI-SearchBot search control is separate from GPTBot training
   access. Do not enable training as a supposed discovery requirement.
4. Align LinkedIn and GitHub with the public positioning:
   "Principal Product Manager specializing in developer experience, databases,
   and AI agents, with a hands-on engineering background." Link the canonical
   career page and project evidence. Change recruiter-visibility settings only
   deliberately; this site does not declare job availability or modify external
   accounts.
5. Monitor Search Console impressions/clicks for the name and relevant expertise,
   and qualified project/contact actions in GA4. Search appearance is not the
   same as confirmed recruiter interest.

Official guidance: [Google AI search features](https://developers.google.com/search/docs/appearance/ai-features),
[ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page),
and [OpenAI crawlers](https://developers.openai.com/api/docs/bots).

The homepage keeps the main navbar without a second sticky section menu.
Section IDs remain available for direct links. Minimal copy and
links to the biography and talks keep the page compact without hiding content
behind JavaScript. The complete talk collection remains at `/talks`.
Upcoming event details remain on the talks page through
`src/components/talks/UpcomingEvents.tsx`. Keep dates and the agenda link current;
only add session titles or times when confirmed by the organizer.

### Hire Me page and free-tier AI

`/hire-me` combines an original recruiter landing page, public FAQs, contact
links, and an optional text AI assistant with browser speech input/read-aloud.
One sitewide header combines the logo, Writing, Work, Mentoring, a More menu,
and the theme toggle. Contact and Hire Me remain available under More, including
in the mobile menu; social links remain in page content and the footer rather
than the header. The existing Ask Sajee widget remains a separate non-AI contact guide on
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
3. Set `HIRE_ASSISTANT_ENABLED` to `"true"` in `wrangler.jsonc` to opt in to AI
   inference after deploying the Worker; GitHub Pages alone cannot enable it.
   The `AI` binding uses Cloudflare's account
   authentication; no model API key belongs in the browser or repository.
4. Authenticate Wrangler locally (`npx wrangler login`) and run
   `npm run deploy:worker`, or use the existing Cloudflare deployment workflow.
   The configured Worker routes intercept only `/api/hire-me*` on the www and
   apex hostnames. Keep the existing Cloudflare-proxied DNS records pointing
   to GitHub Pages; do not delete A/CNAME records or add Worker Custom Domains.
   The website stays on GitHub Pages, so normal website updates continue
   automatically. Redeploy the Worker when its backend or configuration changes.
   The workflow preflight verifies token visibility, zone ownership against
   `CLOUDFLARE_ACCOUNT_ID`, and active zone status before building or uploading.
   An invisible zone requires checking `Zone > Zone > Read` and token resource
   scope; an account mismatch requires the domain's Account ID, not its Zone ID.
   The preflight does not print credentials, account IDs, or API response bodies
   and does not change DNS.
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

The Awards & Recognition page opens with five curated highlights, led by
SkillGraph's first-place win in the 2026 Microsoft Global Hackathon Executive
Challenge, awarded November 6, 2026. Its certificate is available in the image
dialog. The other highlights are Microsoft MVP, Google Developer Expert,
HackerNoon Noonies, and the Microsoft Global
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
44px minimum heights. The main listing renders compact metadata-only rows:
title, publication date, reading time, a two-line description, and at most two
tag links. Do not mount article bodies, author blocks, code, or large media in
these rows; full content remains on article and tag pages. Search stays visible,
while the Filters disclosure contains year, layout, tags, and curated topic
links. The disclosure shows the number of active year/tag filters even when
closed. Search, year, and tags combine across all posts, and Load more retains
the current filters. The complete archive and topics remain linked below the
results. Preserve those semantics when changing filters. The
awards image dialog supports Escape, keyboard focus containment, and focus
restoration through the native browser dialog behavior. Global focus indicators,
contrast-safe light-theme primary colors, and reduced-motion styles apply
across these surfaces.
Muted text, contribution/social cards, and code highlighting also use
contrast-safe colors in both themes. In the blog tag listing, the archived
pagination article has a sequential heading outline, and the book-giveaway
article's linked cover has descriptive alternative text.

Individual blog articles use a distraction-reduced reading layout. The
`BlogPostPage` wrapper omits the recent-post sidebar without changing tag or
archive pages. Article-only styles in `src/css/custom.scss` constrain the reading
column to 42rem, use 18px body type with 1.75 line height, and give section
headings more separation. A quieter contents panel remains on screens wider
than 996px; narrower screens use a single reading column. Keep article content,
author details, source links, code blocks, tables, pagination, and SEO metadata
intact when adjusting this layout. Listing styles are separate.

### Deployment

The static site is deployed from `main` with GitHub Pages. The Cloudflare Worker
is routed only to the Hire Me AI API; it does not take over website hosting or
modify the existing DNS records. Its code also supports negotiated Markdown and
legacy article redirects, but those features are not activated by the current
API-only routes.

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

The October 2026 content-quality pass expands the historical ESLint and Angular
search notes with usable examples and explicit update dates, while preserving
their original publication dates and URLs. The portfolio implementation guide
documents this repository's actual portrait, AI boundaries, and API-only routing;
it is linked from Projects and Developers. Article edit links target this
repository so readers can propose corrections.

The Developer portal and CLI use the generated static Markdown files, not
content negotiation on GitHub Pages. The sandbox reports non-2xx failures with
a recovery action. Keep `static/llms.txt` consistent with the production routing.
Validate these surfaces with `tests/content-quality.test.mjs` and
`tests/cli.test.mjs` after building.

These are content and usability improvements, not a resolution certified by
Google. Continue reviewing the remaining image-led tips, outdated instructions,
and personal announcements for original value and rights to embedded material.
Do not refresh publication dates, generate filler, or remove/index-block posts
solely to reach a word-count target. Request AdSense review only after the
published site has been checked; no article count guarantees approval.

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
The Worker must actually be deployed and explicitly routed to article paths for
these server-side redirects to take effect. The current API-only routes do not
activate them; GitHub Pages continues to serve the static HTML redirect fallback.

To refresh the mapping after importing more old posts, run `npx docusaurus build`,
then `npm run sync:blog-redirects`, then `npm run build` and `npm test`.
Only the explicit sync command calls the public WordPress API; ordinary builds
and deployments use the verified snapshot offline. Sync fails on missing or
ambiguous destinations instead of inventing redirects.

#### Manual launch checklist

1. Merge this PR and wait for the GitHub Pages deployment to succeed. Test
   `/2020/07/10/how-to-build-a-rocking-github-profile/` on the new domain:
   it must reach the matching article, not a 404.
2. To enable the Hire Me AI API, configure `CLOUDFLARE_API_TOKEN` and
   `CLOUDFLARE_ACCOUNT_ID`, then run the **Deploy Cloudflare Worker** workflow
   from the merged `main` branch. Confirm `/api/hire-me` returns
   `{"available":true}` and that normal website paths remain on GitHub Pages.
   The API-only routes do not enable server-side article 301s. The HTML redirect
   fallback remains functional, but it is not an HTTP 301; expanding the Worker
   routes for server-side redirects is a separate hosting decision.
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
