---
title: "Build an AI Agent with Azure Cosmos DB: End-to-End Guide"
Date: "2026-10-03"
slug: build-an-ai-agent-with-azure-cosmos-db
authors:
  - Sajeetharan
tags:
  - azure-cosmos-db
  - ai-agents
  - typescript
  - react
  - vector-search
  - developer-tools
  - azure
keywords:
  - create-cosmos-agent
  - Azure Cosmos DB
  - AI agent starter
  - Cosmos DB emulator
  - agent memory
  - TypeScript AI agent
  - React AI application
  - multi-tenant AI agent
  - production-ready AI agent
image: /img/blog/build-ai-agent-cosmos-db-og.png
utcDate: "2026-10-03T15:43:16.000Z"
description: "Build a TypeScript AI agent with Azure Cosmos DB, React, durable memory, tenant isolation, diagnostics, tests, and a clear path from local development to Azure."
---

import BlogPostSeo from "@site/src/components/BlogPostSeo";

export const faqItems = [
{
question: "Can I build this Azure Cosmos DB AI agent without an Azure subscription?",
answer:
"Yes. The default local path uses a deterministic mock model and either in-memory storage or the Azure Cosmos DB Linux emulator, so no Azure subscription or model API key is required.",
},
{
question: "Does the local sample require an AI model API key?",
answer:
"No. The mock provider produces deterministic development responses. You can later configure Azure OpenAI, OpenAI, or Ollama without changing the application contracts.",
},
{
question: "How does the sample isolate agent memory?",
answer:
"Authentication context carries tenant and user identifiers through storage and retrieval. A memory saved for one user is not returned to another user, even within the same tenant.",
},
{
question: "Is the Cosmos DB emulator equivalent to the Azure service?",
answer:
"No. It is ideal for local development, but request charges, vector indexing, performance, and hierarchical partition behavior can differ from Azure Cosmos DB.",
},
{
question: "How do I move the generated agent to Azure?",
answer:
"Configure Microsoft Entra ID, an Azure OpenAI deployment, and the required azd environment values. Run create-cosmos-agent prepare-azure before azd up to validate readiness.",
},
];

<BlogPostSeo
title="Build an AI Agent with Azure Cosmos DB | Sajeetharan"
headline="Build an AI Agent with Azure Cosmos DB: End-to-End Guide"
description="Build a TypeScript AI agent with Azure Cosmos DB, React, durable memory, tenant isolation, diagnostics, tests, and a clear path from local development to Azure."
path="/blogs/build-an-ai-agent-with-azure-cosmos-db"
image="/img/blog/build-ai-agent-cosmos-db-og.png"
imageAlt="Build an AI Agent with Azure Cosmos DB hands-on guide"
datePublished="2026-10-03T15:43:16.000Z"
dateModified="2026-10-03T18:30:00.000Z"
keywords={[
"Azure Cosmos DB",
"AI agent",
"TypeScript",
"React",
"agent memory",
"Cosmos DB emulator",
"multi-tenant AI agent",
]}
faq={faqItems}
/>

Building an AI agent with Azure Cosmos DB is easy to demonstrate. Building the secure, observable, and deployable application around that agent is the difficult part.

A real customer-facing agent needs more than a prompt and a model endpoint. It needs durable memory, tenant isolation, authentication, citations, diagnostics, tests, deployment infrastructure, and a safe way to move from a local prototype to production.

I wanted to see how much of that work could be removed from the critical path, so I tried the [`create-cosmos-agent`](https://github.com/sajeetharan/cosmos-agent-starter) starter from beginning to end. I generated a customer-support agent, ran it against the Azure Cosmos DB Linux emulator, stored a customer preference, retrieved it through the chat experience, verified user isolation, inspected diagnostics, and ran the complete validation suite.

The result was a working full-stack application without an Azure subscription, model API key, or cloud resource.

![Build an AI agent with Azure Cosmos DB using React, TypeScript, durable memory, tenant isolation, and the local emulator](/img/blog/build-ai-agent-cosmos-db-og.png)

:::tip Quick answer

`create-cosmos-agent` generates a React and TypeScript agent application with memory, tenant isolation, citations, diagnostics, tests, and Azure infrastructure. The default local path needs no Azure subscription or model key; choose the Cosmos DB emulator when you want durable local data.

:::

<!-- truncate -->

## What is `create-cosmos-agent`?

`create-cosmos-agent` is a guided CLI for generating production-oriented TypeScript agent applications. Instead of creating only a chat screen, it scaffolds the surrounding application contracts:

- An Express API and React web application
- Multiple AI provider adapters
- In-memory or Azure Cosmos DB storage
- Durable, scoped agent memory
- Knowledge ingestion and vector retrieval
- Customer-support workflows
- Multi-agent orchestration
- Approval-gated actions
- Microsoft Entra ID authentication support
- OpenTelemetry-style diagnostics
- Unit, security, cost, and integration tests
- Docker and Azure Developer CLI infrastructure

The local and Azure paths use the same application interfaces. That is important: moving to production should be a configuration and infrastructure step, not a rewrite of the application.

```text
Local development                         Azure production
-----------------                         ----------------
Mock or Ollama --------.                  Microsoft Entra ID
Memory or emulator ----+--> Agent API --> Managed Identity
Local identity --------'         |        Azure Cosmos DB
                                +-------> Azure OpenAI
                                +-------> Application Insights
                                '-------> Approval-gated actions
```

## The sample I built

For this walkthrough, I selected the **customer-support** scenario with:

- The deterministic mock model provider
- Local development authentication
- Azure Cosmos DB storage
- The Linux Cosmos DB emulator
- The React web interface

This combination is useful because it exercises the real database integration while keeping the model response deterministic and free. It isolates the application and data behavior from model availability, quota, and token cost.

I tested version `0.5.3` from source. The public quick-start command is:

```powershell
npx create-cosmos-agent@latest bootstrap customer-support-agent `
  --template customer-support-ts `
  --provider mock `
  --auth local `
  --storage cosmos `
  --local emulator `
  --yes
```

The `bootstrap` command does more than copy files. It:

1. Resolves the selected scenario and features.
2. Generates the API, web application, packages, tests, and infrastructure.
3. Creates the local emulator configuration.
4. Installs the project dependencies.
5. Initializes a Git repository.
6. Links a local project context.

It does **not** create Azure resources unless deployment is explicitly requested.

## Prerequisites

To follow the same emulator-backed path, install:

- Node.js 20 or later
- Git
- Docker Desktop using Linux containers

The application uses local ports `3000`, `5173`, `8080`, `8081`, and `1234`, so make sure they are available.

If you want the fastest possible first run and do not need durable local data, use in-memory storage instead:

```powershell
npx create-cosmos-agent@latest bootstrap customer-support-agent --yes
```

That path does not require Docker.

## Starting the complete application

After generation, start the application:

```powershell
cd customer-support-agent
npm run dev
```

For the emulator configuration, this single command performs several steps:

1. Starts the Cosmos DB Linux emulator with Docker Compose.
2. Waits for the emulator health check.
3. Creates the database and containers idempotently.
4. Starts the Express API on `http://localhost:3000`.
5. Starts the React application on `http://localhost:5173`.

The emulator's Data Explorer is also available at `http://localhost:1234`.

The first run takes longer because Docker must download the emulator image and npm must install the generated application's dependencies. Once those layers are available locally, subsequent starts are much faster.

## Touring the generated experience

The customer-support application opens with five work areas:

- **Chat** for context-aware conversations and memory
- **Knowledge** for document ingestion and retrieval
- **Support** for ticket workflows
- **Agent runs** for planner, specialist, and reviewer traces
- **Operations** for runtime diagnostics

The header clearly showed that I was using the `mock` provider and `cosmos` storage. The local identity panel used:

```text
Tenant: tenant-demo
User:   user-demo
```

These are development identities, not a production authentication mechanism. The generated application blocks local authentication and the mock provider in production.

## Proving durable memory

The most useful part of the walkthrough was testing memory as application data rather than hidden prompt text.

In the **Chat** tab, I saved this customer preference:

> The customer prefers deployment notifications in Microsoft Teams.

The application wrote a memory document to Cosmos DB with the tenant, user, agent, thread, retention class, provenance, schema version, and embedding metadata.

I then asked:

> What notification channel does this customer prefer?

Because the sample uses the deterministic local provider, the answer itself is intentionally simple:

```text
Local demo response: What notification channel does this customer prefer?
```

The important result was the attached citation. Expanding it showed the retrieved preference:

```text
preference
The customer prefers deployment notifications in Microsoft Teams.
```

The API response also included a retrieval trace containing the tenant, user, selected memory ID, embedding version, timestamp, and correlation ID. That makes memory retrieval inspectable instead of silently injecting data into a prompt.

You can create the same memory directly through the API:

```powershell
$headers = @{
  "x-tenant-id"      = "tenant-demo"
  "x-user-id"        = "user-demo"
  "x-correlation-id" = "memory-demo-001"
}

$body = @{
  type           = "preference"
  content        = "The customer prefers deployment notifications in Microsoft Teams."
  threadId       = "web-session"
  interactionId  = "interaction-001"
  retentionClass = "standard"
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:3000/api/memories" `
  -Headers $headers `
  -ContentType "application/json" `
  -Body $body
```

## Verifying tenant and user isolation

Memory is only useful when its security boundary is correct.

I changed the local user from `user-demo` to `user-other` and asked the same question. The second user received no memory citation. Querying the memory endpoint confirmed the difference:

```text
user-demo  -> 1 memory item
user-other -> 0 memory items
```

The retrieval traces told the same story:

```text
user-demo  -> selected the stored preference memory
user-other -> selected no memory IDs
```

This is a small test, but it verifies an important architectural decision: tenant and user scope are carried through authentication, partitioning, storage, and retrieval. They are not only UI filters.

## Looking at diagnostics

The **Operations** tab exposes redacted runtime diagnostics. After creating and retrieving the preference, my local run reported:

```text
Cosmos operations: 3
Request charge:    3
Errors:            0
```

The recent-operation list included the create and vector-query operations with duration, request charge, and correlation ID. Prompts and document bodies were not captured by default.

Treat emulator request-unit values as development signals rather than production measurements. The Linux emulator is still a preview, and its request charges, vector indexing, and hierarchical partition behavior can differ from Azure Cosmos DB. Measure representative workloads against the Azure service before making production capacity decisions.

## Running the quality gates

The CLI includes two useful commands:

```powershell
npx create-cosmos-agent doctor .
npx create-cosmos-agent validate .
```

`doctor` checks configuration, secret hygiene, security patterns, and multi-tenant partitioning. My generated project returned:

```text
HEALTHY No static safety issues found
Doctor 0 error(s), 0 warning(s), 1 info
```

`validate` runs the generated project's complete quality gate. In my test, it successfully completed:

- TypeScript type checking for the API and web application
- A production Vite build
- 8 unit tests
- 5 security tests
- 2 cost tests
- Bicep template validation

I also validated the generator itself before creating the sample: all 58 generator tests passed, followed by a successful TypeScript build and package creation.

The security tests are especially valuable for an agent starter. They verify behaviors such as production authentication requirements, tenant isolation, and protection of consequential actions instead of leaving those controls as documentation-only recommendations.

## What the generated Cosmos DB path gets right

The generated application applies several patterns that matter when an agent moves beyond a prototype:

### Scoped data modeling

Memory documents include explicit tenant, user, agent, and thread scope. Related data needed for retrieval is stored together, while schema and embedding versions make future evolution possible.

### Partition-aware access

The production path uses hierarchical partition keys aligned with tenant and user access patterns. This reduces accidental cross-tenant queries and gives the application a predictable isolation boundary.

### A reusable client

The Azure Cosmos DB client is reused instead of being created for every request. Reusing a singleton client is essential for efficient connection management and predictable latency.

### Bounded and parameterized retrieval

Vector and document queries are bounded and parameterized. The caller cannot inject query text, and retrieval does not return an unlimited result set.

### Optimistic concurrency

Protected state transitions use ETags. This is important for approval workflows, where two callers must not silently overwrite each other's decisions.

### Observable database operations

Request charge, duration, operation type, errors, and correlation IDs are available without recording prompts or document bodies by default.

## Moving from local development to Azure

The local mock/emulator combination is only one adapter configuration. The production path replaces:

| Local development      | Azure production                            |
| ---------------------- | ------------------------------------------- |
| Local identity headers | Microsoft Entra ID tokens                   |
| Mock or Ollama         | Azure OpenAI or another configured provider |
| Cosmos DB emulator     | Azure Cosmos DB                             |
| Emulator key           | Managed Identity                            |
| Local diagnostics      | Azure Monitor and Application Insights      |

Before deployment, configure the Entra application values and model endpoint, then run:

```powershell
azd auth login

azd env set ENTRA_TENANT_ID "<tenant-id>"
azd env set ENTRA_AUDIENCE "<api-audience>"
azd env set ENTRA_CLIENT_ID "<spa-client-id>"
azd env set ENTRA_SCOPE "<api-scope>"
azd env set AI_PROVIDER "azure-openai"
azd env set AZURE_OPENAI_ENDPOINT "<endpoint>"
azd env set AZURE_OPENAI_CHAT_DEPLOYMENT "<deployment>"

npx create-cosmos-agent prepare-azure . --environment customer-support-agent-dev
azd up
```

`prepare-azure` is a readiness check. It verifies Azure Developer CLI authentication, Entra configuration, the selected production provider, Cosmos DB capacity choices, and required settings without creating resources. `azd up` is the step that can provision billable resources.

Azure OpenAI capacity is bring-your-own, so confirm that the selected region and deployment have quota before deploying. The generated production infrastructure uses a user-assigned Managed Identity; grant it the required Azure Cosmos DB data-plane role and the `Cognitive Services OpenAI User` role.

## What I learned from the end-to-end run

Three aspects stood out.

First, **the starter treats memory as a product feature**. It has scope, provenance, retention, citations, retrieval traces, and diagnostics. That is much stronger than appending previous messages to every prompt.

Second, **local development is genuinely local**. I exercised Cosmos DB persistence and vector retrieval without creating an Azure account or supplying a model key.

Third, **the path to production is visible from the beginning**. Entra ID, Managed Identity, infrastructure, diagnostics, capacity, and validation are not postponed until after the prototype succeeds.

There are also practical caveats:

- Docker is required for the emulator-backed path.
- The first emulator image download can take time.
- The mock provider proves application behavior, not model quality.
- Emulator performance and request charges are not production benchmarks.
- Azure deployment still requires identity design, quota, capacity, and cost decisions.

Those are reasonable boundaries. The goal of a starter should be to remove repetitive work while keeping important production decisions explicit.

## Frequently asked questions

### Can I build this Azure Cosmos DB AI agent without an Azure subscription?

Yes. The default local path uses a deterministic mock model and either in-memory storage or the Azure Cosmos DB Linux emulator. You do not need an Azure subscription or model API key for the first run.

### Does the local sample require an AI model API key?

No. The mock provider produces deterministic development responses. You can later configure Azure OpenAI, OpenAI, or Ollama without changing the application contracts.

### How does the sample isolate agent memory?

Authentication context carries tenant and user identifiers through storage and retrieval. A memory saved for one user is not returned to another user, even within the same tenant.

### Is the Cosmos DB emulator equivalent to the Azure service?

No. It is ideal for local development, but request charges, vector indexing, performance, and hierarchical partition behavior can differ from Azure Cosmos DB. Test representative workloads against Azure before making production capacity decisions.

### How do I move the generated agent to Azure?

Configure Microsoft Entra ID, an Azure OpenAI deployment, and the required `azd` environment values. Run `create-cosmos-agent prepare-azure` before `azd up` to validate readiness.

## Clean up

Stop the development process with `Ctrl+C`, then stop and remove the emulator container:

```powershell
npm run emulator:stop
```

The generated data remains local to the emulator container lifecycle. If you used the default in-memory configuration instead, restarting the API resets the data.

## Try it yourself

Start with the repository and end-to-end demo:

- [Azure Cosmos DB Agent Starter on GitHub](https://github.com/sajeetharan/cosmos-agent-starter)
- [Watch the complete end-to-end video](https://raw.githubusercontent.com/sajeetharan/cosmos-agent-starter/main/docs/media/create-cosmos-agent-end-to-end.mp4)
- [Download the captioned walkthrough](https://github.com/sajeetharan/cosmos-agent-starter/blob/main/docs/media/create-cosmos-agent-end-to-end.srt)

Then generate an application:

```powershell
npx create-cosmos-agent@latest bootstrap my-agent --yes
cd my-agent
npm run dev
```

Open `http://localhost:5173`, save a preference, ask the agent to recall it, switch users, inspect the citation, and run the validation commands.

That short workflow demonstrates the bigger idea behind the project: start with a zero-cost local agent, preserve the application contracts, and move deliberately toward a secure Azure deployment.

## Related reading

- [Building DevGlobe with Azure Cosmos DB and AI Agents](/blogs/building-devglobe-with-azure-cosmos-db)
- [Turning Coding Agents into Azure Cosmos DB Experts with Scott Hanselman](/blogs/2026/07/10/2026/07/turning-coding-agents-cosmosdb-expert-scott-hanselman)
- [What Six Months of Building AI Agent Skills Taught Me About Writing for Machines](/blogs/building-skills-for-ai-coding-agents)
