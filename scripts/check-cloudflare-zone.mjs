import { pathToFileURL } from "node:url";

const zoneName = "sajeetharan.dev";

export async function verifyCloudflareZone(
  { apiToken, accountId },
  fetcher = fetch,
) {
  if (typeof apiToken !== "string" || !apiToken.trim()) {
    throw new Error("Set the CLOUDFLARE_API_TOKEN repository secret.");
  }
  if (typeof accountId !== "string" || !accountId.trim()) {
    throw new Error("Set the CLOUDFLARE_ACCOUNT_ID repository secret.");
  }

  const url = new URL("https://api.cloudflare.com/client/v4/zones");
  url.searchParams.set("name", zoneName);
  const response = await fetcher(url, {
    headers: {
      Authorization: `Bearer ${apiToken.trim()}`,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) {
    throw new Error(
      `Cloudflare zone lookup returned HTTP ${response.status}. Verify the token is valid and grants Zone > Zone > Read for ${zoneName}. No DNS changes were made.`,
    );
  }
  if (!response.headers.get("Content-Type")?.includes("application/json")) {
    throw new Error("Cloudflare zone lookup returned a non-JSON response.");
  }
  let data;
  try {
    data = await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Cloudflare zone lookup returned invalid JSON.");
    }
    throw error;
  }
  if (data?.success !== true || !Array.isArray(data.result)) {
    throw new Error(
      "Cloudflare rejected the zone lookup or returned an invalid response. Verify the token's Zone > Zone > Read permission and resource scope.",
    );
  }
  const zones = data.result.filter((item) => item?.name === zoneName);
  if (!zones.length) {
    throw new Error(
      `The token cannot see ${zoneName}. Grant Zone > Zone > Read and scope the token to the Cloudflare account and zone that own this domain. Cloudflare nameservers alone do not prove this token can access the zone. Do not change DNS to fix token access.`,
    );
  }
  if (
    !zones.some(
      (zone) => typeof zone.account?.id === "string" && zone.account.id,
    )
  ) {
    throw new Error(
      "Cloudflare returned the zone without an owning account ID; cannot verify deployment access.",
    );
  }
  const zone = zones.find((item) => item.account?.id === accountId.trim());
  if (!zone) {
    throw new Error(
      `The token can see ${zoneName}, but its owning account does not match CLOUDFLARE_ACCOUNT_ID. Copy Account ID from this domain's Cloudflare Overview, not Zone ID or another account's ID, and update the GitHub secret.`,
    );
  }
  if (zone.status !== "active") {
    throw new Error(
      `Cloudflare can find ${zoneName} in the configured account, but the zone is not active. Review its status in the Cloudflare dashboard before deploying.`,
    );
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await verifyCloudflareZone({
    apiToken: process.env.CLOUDFLARE_API_TOKEN,
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  });
  console.log(
    `Verified token access to active zone ${zoneName} in the deployment account.`,
  );
}
