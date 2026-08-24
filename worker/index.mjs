const STATIC_EXTENSION =
  /\.(?:css|js|mjs|map|md|png|jpe?g|webp|gif|svg|avif|ico|woff2?|ttf|otf|eot|xml|txt|json|pdf|mp4|webm|mp3|wav|ogg|zip)$/i;

export function parseAccept(header) {
  return header
    .split(",")
    .map((raw, position) => {
      const parts = raw
        .trim()
        .split(";")
        .map((part) => part.trim());
      const type = parts[0].toLowerCase();
      if (!type) return null;
      let quality = 1;
      for (const parameter of parts.slice(1)) {
        const [name, value] = parameter.split("=").map((part) => part.trim());
        if (name.toLowerCase() === "q") {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) {
            quality = Math.max(0, Math.min(1, parsed));
          }
        }
      }
      const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
      return { type, quality, specificity, position };
    })
    .filter(Boolean);
}

function matches(entry, candidate) {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) {
    return candidate.startsWith(entry.type.slice(0, -1));
  }
  return entry.type === candidate;
}

export function preferredType(
  header,
  produces = ["text/html", "text/markdown"],
) {
  if (!header) return produces[0] ?? null;
  const entries = parseAccept(header);
  if (entries.length === 0) return produces[0] ?? null;

  let selected = null;
  let selectedQuality = -1;
  let selectedPosition = Number.POSITIVE_INFINITY;

  for (const candidate of produces) {
    let match = null;
    for (const entry of entries) {
      if (!matches(entry, candidate)) continue;
      if (
        match === null ||
        entry.specificity > match.specificity ||
        (entry.specificity === match.specificity &&
          entry.position < match.position)
      ) {
        match = entry;
      }
    }
    if (!match || match.quality <= 0) continue;
    if (
      match.quality > selectedQuality ||
      (match.quality === selectedQuality && match.position < selectedPosition)
    ) {
      selected = candidate;
      selectedQuality = match.quality;
      selectedPosition = match.position;
    }
  }
  return selected;
}

export function appendVaryAccept(headers) {
  const existing = headers.get("Vary");
  const values = existing
    ? existing.split(",").map((value) => value.trim())
    : [];
  for (const required of ["Accept", "Accept-Encoding"]) {
    if (
      !values.some((value) => value.toLowerCase() === required.toLowerCase())
    ) {
      values.push(required);
    }
  }
  headers.set("Vary", values.join(", "));
}

export function markdownPath(pathname) {
  if (pathname === "/" || pathname === "") return "/index.md";
  if (pathname.endsWith(".html")) return pathname.replace(/\.html$/, ".md");
  const clean = pathname.replace(/\/$/, "");
  return `${clean}/index.md`;
}

function notAcceptable(message) {
  const response = new Response(`${message}\n`, {
    status: 406,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
  appendVaryAccept(response.headers);
  return response;
}

async function assetResponse(request, assets) {
  const response = await assets.fetch(request);
  return new Response(response.body, response);
}

export default {
  async fetch(request, environment) {
    const url = new URL(request.url);
    if (url.hostname === "sajeetharan.dev") {
      url.protocol = "https:";
      url.hostname = "www.sajeetharan.dev";
      return Response.redirect(url, 308);
    }

    if (
      STATIC_EXTENSION.test(url.pathname) ||
      url.pathname.startsWith("/.well-known/")
    ) {
      return environment.ASSETS.fetch(request);
    }

    const accept = request.headers.get("Accept");
    const chosen = preferredType(accept);
    if (chosen === null && accept) {
      return notAcceptable(
        "Not Acceptable. Available: text/html, text/markdown",
      );
    }

    if (chosen === "text/markdown") {
      const markdownUrl = new URL(url);
      markdownUrl.pathname = markdownPath(url.pathname);
      const markdownResponse = await environment.ASSETS.fetch(
        new Request(markdownUrl, request),
      );
      if (markdownResponse.status === 200) {
        const response = new Response(markdownResponse.body, markdownResponse);
        response.headers.set("Content-Type", "text/markdown; charset=utf-8");
        appendVaryAccept(response.headers);
        return response;
      }

      const fallbackUrl = new URL("/404.md", url);
      const fallback = await environment.ASSETS.fetch(
        new Request(fallbackUrl, request),
      );
      const response = new Response(fallback.body, {
        status: 404,
        headers: fallback.headers,
      });
      response.headers.set("Content-Type", "text/markdown; charset=utf-8");
      appendVaryAccept(response.headers);
      return response;
    }

    const response = await assetResponse(request, environment.ASSETS);
    appendVaryAccept(response.headers);
    if (response.headers.get("Content-Type")?.includes("text/html")) {
      response.headers.append(
        "Link",
        `<${markdownPath(url.pathname)}>; rel="alternate"; type="text/markdown"`,
      );
    }
    return response;
  },
};
