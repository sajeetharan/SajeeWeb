---
title: "Building DevGlobe with Azure Cosmos DB: From 3D Map to Agent-Ready Talent Graph"
Date: "2026-10-01"
slug: building-devglobe-with-azure-cosmos-db
tags:
  - devglobe
  - azure-cosmos-db
  - ai-agents
  - mcp
  - vector-search
  - developer-tools
  - open-source
  - architecture
utcDate: "2026-10-01T01:00:00.000Z"
description: "How I built DevGlobe as an open-source talent graph for humans and AI agents using Azure Cosmos DB, hybrid search, MCP, Azure Functions, and consent-aware workflows."
---

Finding a developer by name is easy. Finding the right developer for a problem is much harder.

A GitHub profile can show repositories. Stack Overflow can show answers. A professional network can show job titles. But none of those views, on their own, answer questions such as:

- Who has recent evidence of working with a specific technology?
- Which developers match the needs of an open-source repository?
- Who is active in a particular region or community?
- Can an AI agent discover a relevant expert without exposing private contact details?

Those questions led me to build [DevGlobe](https://www.devglobe.dev), an open-source talent graph for humans and AI agents. What started as an interactive 3D map became a search, data, and consent problem—and Azure Cosmos DB became the foundation that connected those pieces.

![DevGlobe connects developers and AI agents through an open talent graph](/img/blog/devglobe-product.png)

<!-- truncate -->

## The idea: discovery based on evidence, not popularity

Developer discovery often becomes a popularity contest. Follower counts, total stars, and reputation are useful signals, but they should not become unsupported conclusions about a person's expertise or suitability.

DevGlobe brings together public evidence from sources such as GitHub and Stack Overflow, then presents it through:

- An interactive 3D developer globe
- Search by skills, technologies, roles, names, and locations
- Developer profiles with contribution evidence
- Repository-to-developer matching
- A VS Code extension for opt-in live presence
- A hosted MCP server for AI-agent discovery
- Consent-gated introductions for verified agents

The goal is not to declare that one developer is "better" than another. The goal is to make relevant public evidence easier to discover and explain.

You can explore the live project at [devglobe.dev](https://www.devglobe.dev) or view the source on [GitHub](https://github.com/sajeetharan/devglobe).

## Why Azure Cosmos DB fit the problem

DevGlobe combines several workloads that look related in the interface but behave very differently in storage:

1. Public developer profiles change comparatively slowly and are read frequently.
2. Search needs both exact text signals and semantic similarity.
3. Live coding presence changes every few seconds and should expire automatically.
4. Private coding statistics belong only to the developer who generated them.
5. Introduction requests have a durable, consent-driven lifecycle.
6. Agents need bounded, structured access to public data and protected workflows.

Trying to force all of those workloads through one generic data path would make the system harder to scale and harder to reason about.

Azure Cosmos DB gave me a flexible document model, low-latency reads, vector search, automatic indexing, and workload-specific containers. More importantly, it let the architecture evolve as DevGlobe grew from a visualization into an agent-ready platform.

## The high-level architecture

The production system separates interactive product traffic, high-volume public reads, static snapshots, and scheduled ingestion:

```text
GitHub + Stack Overflow + public signals
                  |
            ingestion jobs
                  |
          Azure Cosmos DB
        /        |         \
 profiles    activities    workflow state
    |            |              |
    +------ search APIs --------+
           /             \
 Azure Functions     Azure Container Apps
 public reads        web, auth, MCP, mutations
           \             /
           humans + AI agents
```

![DevGlobe production architecture showing public signals, Azure Cosmos DB, Azure Functions, Blob Storage, Container Apps, humans, and AI agents](/img/blog/devglobe-architecture.svg)

The major runtime pieces are:

- **Next.js, React, and Three.js** for the product and interactive globe
- **Azure Container Apps** for the dynamic web application, authentication, private mutations, share metadata, and hosted MCP endpoint
- **Azure Functions** for high-volume public APIs, scheduled ingestion, and snapshot generation
- **Azure Cosmos DB** for profiles, activities, search, live presence, coding statistics, and workflow state
- **Azure Blob Storage** for a compressed developer snapshot that browsers can download efficiently
- **Azure OpenAI embeddings** for semantic and hybrid developer search

This split is intentional. Not every request needs to reach the full Next.js application, and not every browser load needs to query the database directly.

### Architecture and implementation references

The architecture is open for inspection. These documents go deeper than a single article can:

- [Azure backend and production traffic split](https://github.com/sajeetharan/devglobe/blob/main/docs/azure-backend.md)
- [Hosted MCP server and consent lifecycle](https://github.com/sajeetharan/devglobe/blob/main/docs/mcp-server.md)
- [Agent-readiness and machine-readable discovery](https://github.com/sajeetharan/devglobe/blob/main/docs/agent-readiness.md)
- [Public OpenAPI description](https://www.devglobe.dev/openapi.json)
- [Developer documentation](https://sajeetharan.github.io/devglobe/)
- [Complete source repository](https://github.com/sajeetharan/devglobe)

## Modeling developer profiles as useful documents

A developer profile is naturally document-shaped. Identity, location, languages, repository summaries, contribution totals, community credentials, search text, and embeddings are commonly retrieved together.

That makes a denormalized profile document practical for the primary read path. The interface can render a developer card without coordinating several joins, while search APIs can project only the fields required for a result.

The important design choice is to keep facts and conclusions separate.

DevGlobe stores public evidence such as:

- GitHub login and profile metadata
- Languages and repository signals
- Stars, commits, forks, and watchers
- Stack Overflow reputation and engagement
- Verified community credentials
- Geocoded public location
- Search text and vector embeddings

Credentials are explicit data, not guesses. A person is not labeled a Google Developer Expert, Microsoft MVP, GitHub Star, or community leader because an algorithm inferred it from popularity. Those tags require verifiable public evidence.

The same principle applies to search results: a relevance score is an ordinal discovery signal, not a probability that someone is suitable for a job.

## Combining text and vector search

Developer searches do not always use the exact words stored on a profile.

Someone may search for:

> "TypeScript developer working on AI agents in Bengaluru"

Text search is strong when the query contains names, locations, languages, or exact technologies. Vector search is useful when the intent is expressed through related concepts rather than matching terms. DevGlobe supports text, vector, and hybrid modes so those strengths can complement each other.

At a high level, the flow is:

1. Parse and normalize the query.
2. Generate an embedding when semantic search is available.
3. Retrieve a bounded candidate set from Azure Cosmos DB.
4. Combine text and semantic evidence.
5. Return projected public fields with explanations and search signals.

The vector query uses `VectorDistance` against the stored profile embedding and orders a bounded result set by distance. Text search remains available as a fallback, including for contributors running DevGlobe locally without Azure OpenAI.

That fallback matters. A development environment should not become unusable just because an optional AI dependency is unavailable.

## Designing for bounded cost and predictable queries

Search systems can become expensive when every interaction turns into an unbounded cross-partition scan. DevGlobe keeps public APIs bounded and treats the returned fields as part of the contract.

Several practices help:

- Limit result counts at the API boundary.
- Project only fields needed by list and search views.
- Keep full profile retrieval separate from result summaries.
- Parameterize user-provided values.
- Cache and reuse the Cosmos client and container references.
- Generate browser snapshots for high-volume read paths.
- Keep ephemeral and durable workloads in separate containers.

The browser can load the compressed developer snapshot from Blob Storage, while Azure Functions handle public detail and search requests. This reduces pressure on the application container and avoids routing every public read through a server-rendered page.

## Live presence is an expiry problem

The DevGlobe VS Code extension lets a developer opt in to appear on the live globe. It sends a bounded heartbeat every 30 seconds containing:

- Active language, when enabled
- Editor and platform
- Session start
- Last-seen time

It does **not** send source code, file paths, repository names, branches, or keystrokes. Coordinates come from the developer's existing public profile rather than the device.

Live presence has a very different lifecycle from a developer profile. A heartbeat is useful now, but it should not remain forever.

DevGlobe uses a TTL-enabled Cosmos DB container for this workload:

- A heartbeat is considered live for 90 seconds.
- A developer can remain visible as recently coding for 15 minutes.
- Cosmos DB TTL removes the item automatically after that window.

This is simpler and safer than building a separate cleanup process for expired presence. The data model expresses the retention policy directly.

## Private coding statistics use a separate boundary

The extension can also build private, owner-only daily coding totals from consecutive heartbeats. These aggregates are stored separately from public live presence and retained for 400 days.

That separation is important:

- Public presence answers, "Who has opted in to appear live?"
- Private statistics answer, "What does my own coding activity look like over time?"

They have different audiences, retention periods, and authorization requirements. Keeping them in separate containers makes those boundaries visible in both the data model and the APIs.

Aggregate writes are best-effort. A statistics failure should never prevent a developer from appearing live.

## From a database API to domain-specific MCP tools

DevGlobe exposes a hosted Streamable HTTP MCP endpoint:

```text
https://www.devglobe.dev/mcp
```

The easy implementation would have been a generic Cosmos DB query tool. I deliberately did not build that.

![Demonstrating DevGlobe and agent-first development with Azure Cosmos DB](/img/talks/agent-first-cosmos-db.jpg)

Agents instead receive domain-specific capabilities such as:

- Search public developer profiles
- Inspect a public developer profile
- Match developers to a public GitHub repository
- Discover trending developers
- Find similar developers
- Request a consent-gated introduction
- Check introduction status

This distinction matters. The agent should understand the action it is taking, not merely the database operation underneath it.

Public discovery works anonymously. Introduction requests require a verified agent credential and explicit developer consent. Private contact details are never returned through public discovery.

Cosmos DB persists the workflow state, but the MCP server exposes the domain contract: discover publicly, request transparently, and let the person decide.

## Consent is data, not prompt text

One of the most important lessons from DevGlobe is that prompts cannot enforce consent.

![Explaining how DevGlobe MCP tools separate trust and consent](/img/talks/beyond-crud-mcp-trust-consent.jpg)

A reliable introduction workflow needs durable state:

```text
agent requests introduction
          |
request stored with bounded context
          |
developer reviews request
       /         \
   accepts       declines
      |             |
status updated and exposed without leaking private data
```

The system—not the model—decides which transitions are allowed.

DevGlobe separates public discovery from consequential actions, validates scopes, returns structured errors, and records the consent lifecycle. An agent can help someone find a potential collaborator, but it cannot silently initiate contact or retrieve private details.

## Building an agent-readable product

Supporting agents involves more than adding an MCP endpoint.

DevGlobe publishes:

- An OpenAPI description
- An API catalog
- MCP server metadata
- Protected-resource metadata and permission names
- Agent Skill metadata with content digests
- A Markdown representation for clients that request `text/markdown`
- An `llms.txt` guide
- Guarded, read-only WebMCP tools in supported preview browsers

This makes the product discoverable through machine-readable contracts rather than requiring an agent to scrape the visual interface.

The API also returns stable error codes and actionable recovery hints. Agents need to know not just that a call failed, but whether they should correct input, authenticate, narrow a query, or stop.

## Local development without a cloud dependency

Open-source projects need a contributor path that does not start with provisioning several Azure resources.

DevGlobe supports three levels:

1. **Zero configuration:** bundled sample data and offline text search
2. **Cosmos DB Emulator:** full local database and API development
3. **Azure backend:** vector and hybrid search with Azure OpenAI

The application automatically falls back to sample data when Cosmos DB credentials are absent. Contributors can clone the repository, run `npm install`, and start exploring the product before deciding whether they need the emulator or cloud services.

That progression keeps the first-run experience simple without hiding the production architecture.

## What I would carry into the next Cosmos DB project

Building DevGlobe reinforced several principles that apply beyond developer discovery:

### Model around access patterns

Embed information retrieved together, project only what each API needs, and separate workloads with different audiences or retention policies.

### Use TTL for genuinely ephemeral data

Presence, temporary state, and short-lived signals should not require manual cleanup when the database can enforce expiry.

### Keep semantic search bounded

Vector search should retrieve a deliberate candidate set, not become an excuse for returning or ranking the entire dataset.

### Reuse the Cosmos client

Creating a client per request wastes connections and adds latency. DevGlobe caches client and container references for reuse.

### Design fallback paths

Text search and sample data keep the application useful when embeddings, cloud credentials, or the production backend are unavailable.

### Put trust boundaries in code and data

Authorization, consent, retention, and workflow transitions belong in the system—not only in instructions to an AI model.

## The larger lesson

DevGlobe began as a visual way to explore the global developer community. Azure Cosmos DB helped it evolve into something broader: a talent graph that humans can explore and agents can use through explicit, bounded contracts.

The most interesting part was not adding AI to a database. It was deciding how data, search, tools, and consent should work together.

An agent-ready platform needs more than powerful queries. It needs:

- Evidence instead of unsupported conclusions
- Context without unnecessary data exposure
- Search that explains why a result appeared
- Separate boundaries for public and private workloads
- Retention policies that match the value of the data
- Domain tools instead of unrestricted database access
- Human approval for actions that affect people

That is the architecture behind DevGlobe—and the direction I believe developer platforms must take as more software is used by both humans and AI agents.

## Help DevGlobe grow

DevGlobe is independently maintained, open source, and free to use. If the project is useful to you, there are three meaningful ways to support it:

1. **[Vote for and review DevGlobe on Product Hunt](https://www.producthunt.com/products/devglobe)** to help more builders discover it.
2. **[Star DevGlobe on GitHub](https://github.com/sajeetharan/devglobe)** to follow the project and signal that the work is valuable.
3. **[Sponsor the open-source work](https://github.com/sponsors/sajeetharan)** to help fund Azure hosting, observability, public-data refreshes, testing, security updates, and ongoing maintenance.

Sponsorship never influences developer rankings, search placement, moderation, or access to private information. Those boundaries remain part of the product's public trust contract.

## Explore DevGlobe

- [Try DevGlobe](https://www.devglobe.dev)
- [View the source on GitHub](https://github.com/sajeetharan/devglobe)
- [Vote or leave a Product Hunt review](https://www.producthunt.com/products/devglobe)
- [Sponsor DevGlobe](https://github.com/sponsors/sajeetharan)
- [Connect an MCP client](https://www.devglobe.dev/docs/mcp-server)
- [Read the OpenAPI description](https://www.devglobe.dev/openapi.json)
- [Install the VS Code extension](https://marketplace.visualstudio.com/items?itemName=devglobedev.devglobe-developer-discovery)
