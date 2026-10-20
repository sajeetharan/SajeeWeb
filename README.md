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

### Deployment

The static site is deployed from `main` with GitHub Pages. The optional
Cloudflare Worker serves negotiated Markdown responses from the same build.

To deploy the Worker, configure `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` as GitHub Actions secrets, then dispatch **Deploy
Cloudflare Worker**. To publish the CLI, configure `NPM_TOKEN`, increment the
version in `cli/package.json`, and dispatch **Publish CLI**.
