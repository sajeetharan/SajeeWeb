# @sajeetharan/site-cli

Official CLI for scripting the public, read-only resources on sajeetharan.dev.

```bash
npm install --global @sajeetharan/site-cli
sajee resources
sajee fetch blogs
```

Set `SAJEE_SITE_URL` to target a local preview during development.

`fetch` reads static Markdown files for page paths: `home` uses `/index.md`
and `blogs` uses `/blogs/index.md`. Feeds, files, API paths, and
`/.well-known/` resources retain their original URLs. Query strings are
preserved. HTTP failures produce a nonzero exit code rather than a successful
HTML error page. This works with GitHub Pages without content negotiation.
