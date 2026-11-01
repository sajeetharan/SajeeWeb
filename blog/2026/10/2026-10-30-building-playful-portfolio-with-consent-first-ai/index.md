---
title: "Nine moods and one AI assistant: how this website works"
Date: "2026-10-30"
slug: building-playful-portfolio-with-consent-first-ai
authors:
  - Sajeetharan
tags:
  - web-development
  - react
  - accessibility
  - ai
  - developer-tools
utcDate: "2026-10-30T00:00:00.000Z"
description: "Inside this portfolio's nine-photo React interaction, consent-first AI assistant, and GitHub Pages plus Cloudflare API deployment, including their limitations."
---

The homepage lets visitors interact with nine expressions of the same developer. The [Hire Me page](/hire-me) offers a different interaction: an optional AI assistant that answers questions about published professional information.

They look like parts of one experience, but they have deliberately different implementations. The portrait is a local, deterministic React component. The assistant sends a consented question to a server-side model. Neither needs to make the rest of the website depend on AI.

This is a walkthrough of the [site's source code](https://github.com/sajeetharan/SajeeWeb), including the boundaries that are easy to miss when adding a playful interaction or a chat box to a static portfolio.

<!-- truncate -->

## Two features, two execution paths

```text
Browser
  |
  +-- Website pages, articles, and photos --> GitHub Pages
  |
  +-- Portrait input --> React state --> existing expression photo
  |
  +-- Consented question --> /api/hire-me --> Cloudflare Worker
                                                |
                                                +--> Workers AI
```

The website uses Docusaurus and React. Cloudflare proxies the domain, but the Worker is routed only to the AI API prefix. HTML pages and generated Markdown files remain on GitHub Pages.

That distinction matters operationally: deploying a Worker does not automatically make every page execute its code. It also matters to documentation. The homepage's Markdown is available at [/index.md](https://www.sajeetharan.dev/index.md); setting an `Accept: text/markdown` header on the homepage does not enable content negotiation with these API-only routes.

## The portrait does not generate faces

There are nine existing WebP photographs, one per expression. The [reaction data](https://github.com/sajeetharan/SajeeWeb/blob/main/src/data/portrait-reactions.ts) maps each prop to an ordered list:

| Prop         | Expression sequence    |
| ------------ | ---------------------- |
| Slap         | Wonder, anger, sadness |
| Pinch        | Wonder, anger, disgust |
| Boxing glove | Anger, sadness         |
| Feather      | Joy                    |
| Flower       | Affection, calm        |
| Spider       | Fear, disgust, courage |

Each prop has its own use count. The expression index is `(uses - 1) % reactions.length`, so repeated interactions cycle predictably rather than choosing an unrelated random face.

This separation makes the behavior testable without simulating a browser animation. The reaction function validates the use count and returns the next expression and visual-effect state. React owns the current scene; CSS and SVG provide the presentation.

No portrait interaction calls a generative model or uploads a visitor's photograph. This feature is photographic, not face recognition, live emotion detection, or an AI image service.

## Keep gestures from becoming accidental actions

The [portrait component](https://github.com/sajeetharan/SajeeWeb/blob/main/src/components/homepage/PortraitPlayground.tsx) supports a normal button activation as well as a horizontal swipe. It records the initial pointer coordinates and compares the movement when that pointer is released.

A horizontal gesture must travel at least 24 pixels and be more horizontal than vertical: `abs(dx) > abs(dy) * 1.25`. A sufficiently vertical movement suppresses the follow-up click rather than treating a page-scrolling gesture as another interaction.

After a recognized swipe, the component also suppresses the synthetic pointer click. Otherwise, one gesture could increment the scene twice. Keyboard activation still uses the button's normal click path.

Pointer movement updates CSS properties through `requestAnimationFrame`. The pending frame is cancelled when appropriate, including component cleanup. This keeps cursor-following decoration separate from the React state transition that chooses a reaction.

These details are small, but they are the difference between an interaction that merely works with a mouse and one that behaves predictably on a phone.

## Accessibility belongs in the interaction model

The photo is a native button with an action-specific accessible name. The six prop controls are labeled, and a screen-reader announcement describes the current expression. Decorative SVG effects do not become extra interactive controls.

All expression images have fixed dimensions. Only the active expression exposes descriptive alternative text; inactive images are hidden from assistive technology. Reduced-motion styling disables movement instead of making the feature unusable.

Loading all nine photographs has a tradeoff: more image data up front, in exchange for expression changes that do not wait for a new network request. This is a finite collection of optimized images, not a pattern to copy unchanged for hundreds of frames. Measure the actual image budget before expanding it.

## The assistant starts with published facts

The assistant's source material is a checked-in [professional profile](https://github.com/sajeetharan/SajeeWeb/blob/main/src/data/hire-me.json), not a private CV, employer systems, or unrestricted web search. The page also displays ordinary FAQs and source links without requiring a model response.

The [Worker handler](https://github.com/sajeetharan/SajeeWeb/blob/main/worker/hire-me.mjs) supplies those facts in its system prompt. It asks the model to identify itself as an assistant, use third person, distinguish author and contributor roles, and say when a fact is not documented.

Those instructions are behavioral guidance, not a proof that a model cannot hallucinate or follow a malicious prompt. The model has no tools to book meetings, negotiate, or act on someone's behalf. Visitors should still verify important statements against the linked pages and contact the person directly.

## Consent and limits are separate checks

Before submitting a question, the visitor must consent to its processing. The endpoint checks that the JSON body includes `consent: true`; an enabled submit button is not the only check.

The request must contain one to seven alternating user/assistant messages, ending with a user question. Individual messages are limited to 1,200 characters, and the complete request has a separate 8,192-byte limit. A conversation can therefore exceed the request budget even if each message fits individually, particularly with multibyte text.

The server also checks the origin, the content type, feature availability, and rate limits before inference. Origin checking is not authentication: a non-browser client can supply that header.

The configured rate limits are approximately five requests per visitor and 30 requests for the shared key per minute, **per Cloudflare location**. They are not strict worldwide spending caps. Provider allowances remain a separate operational boundary.

The site does not write chat transcripts to its own database or log question text. Messages are sent to Cloudflare for inference, so provider processing still applies. Read the [privacy notice](/privacy#hire-me-ai-assistant), and do not submit confidential information.

## Make unavailability an ordinary state

The client can check availability without generating an answer:

```shell
curl https://www.sajeetharan.dev/api/hire-me
```

A healthy enabled endpoint reports `{"available":true}`. This checks configuration, not whether the next inference will succeed or how accurate its answer will be.

Malformed input, missing consent, rate limiting, unusable model output, and provider failures have explicit error responses. The FAQs and contact route remain useful when AI is disabled or unavailable.

This is why a local static preview and a production smoke test cover different things. A static preview can exercise the page and portrait, but it does not itself run Workers AI.

## Verify behavior rather than the presence of a widget

The repository includes focused checks for the [portrait](https://github.com/sajeetharan/SajeeWeb/blob/main/tests/portrait-playground.test.mjs), [assistant endpoint](https://github.com/sajeetharan/SajeeWeb/blob/main/tests/hire-me.test.mjs), and [deployment configuration](https://github.com/sajeetharan/SajeeWeb/blob/main/tests/cloudflare-deployment.test.mjs). Build first because several checks inspect generated HTML and CSS:

```shell
npm run typecheck
npm run build
node --test tests/portrait-playground.test.mjs tests/hire-me.test.mjs tests/cloudflare-deployment.test.mjs
```

Endpoint tests use mocked inference. They verify application behavior, not a provider's uptime or the factual accuracy of arbitrary future answers. A live deployment still needs an availability check and a consented question through the real page.

For the portrait, browser checks should include keyboard activation, each prop, a vertical scroll, reduced motion, and a narrow viewport. For the assistant, check consent, an error response, recovery, and access to the non-AI information.

The reusable design choice is not to add AI everywhere. Keep deterministic play local, make published information useful on its own, and give the model a narrow, optional role with visible limits.
