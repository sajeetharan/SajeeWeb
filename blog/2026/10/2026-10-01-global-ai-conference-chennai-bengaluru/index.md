---
title: "Two Cities, Two Talks, One Agent-First Future: Bengaluru and Chennai"
Date: "2026-10-01"
slug: global-ai-conference-chennai-bengaluru-2026
tags:
  - ai
  - ai-agents
  - mcp
  - azure-cosmos-db
  - developer-tools
  - devglobe
  - conference
  - community
utcDate: "2026-10-01T00:00:00.000Z"
description: "Reflections from two back-to-back community conferences in Bengaluru and Chennai, where I spoke about trusted MCP tools and agent-first development with Azure Cosmos DB."
---

The final weekend of September took me to two cities, two developer communities, and two stages with a shared question:

**What does it take to move AI agents from impressive demos to experiences developers can trust every day?**

On September 26, I spoke at [MCP Community Connect in Bengaluru](https://globalai.community/e/bd1o37ln) about designing MCP tools around trust and consent. The next day, I joined the [Global AI Conference in Chennai](https://globalai.community/e/7f851feb) to share how we can build an agent-first experience for Azure Cosmos DB.

The talks approached the question from different directions, but they arrived at the same conclusion: an agent is only as useful as the context, boundaries, and developer experience we build around it.

<!-- truncate -->

## Stop one: MCP Community Connect, Bengaluru

MCP Community Connect was a full-day, community-run conference focused on taking the Model Context Protocol beyond experiments. The agenda went deep into production concerns: security, observability, governance, interoperability, and architecture.

My session, **"Beyond CRUD: Designing MCP Tools Around Trust and Consent,"** focused on a lesson I learned while building [DevGlobe](https://devglobe.dev): exposing data through MCP is relatively easy. Deciding what an agent should be allowed to discover, infer, and do is the real design challenge.

![Presenting Beyond CRUD at MCP Community Connect in Bengaluru](/img/talks/beyond-crud-mcp-trust-consent.jpg)

### Why a generic database tool was the wrong abstraction

When we first think about connecting an agent to a database, the obvious approach is to expose familiar operations: query, create, update, and delete. That interface is flexible, but it also transfers too much responsibility to the agent.

DevGlobe is a developer-discovery platform. It works with public professional evidence such as profiles, repositories, languages, locations, and contribution activity. It also supports introductions between people, which is a very different kind of action. Discovery can use public information; initiating contact requires consent.

Instead of exposing a general database interface, I designed domain-specific tools across two trust levels:

- **Anonymous tools** support bounded discovery using public evidence.
- **Authenticated tools** support consent-controlled introduction workflows.

That separation makes the intended behavior clear to both the agent and the developer. More importantly, it turns consent into an application boundary rather than a sentence hidden inside a prompt.

### Trust has to exist in the system

Prompts are useful guidance, but they are not security boundaries. If an action has consequences for another person, the system must enforce the rules.

For DevGlobe, that means:

- Returning bounded, structured results rather than unrestricted database access
- Including evidence and freshness so the agent does not invent unsupported conclusions
- Separating read-only discovery from consequential actions
- Requiring authentication before an introduction can be requested
- Persisting consent and introduction state as durable application data
- Returning explicit errors when a request is unauthorized or invalid

The MCP server can remain stateless while coordinating a stateful workflow in Azure Cosmos DB. The agent gets a small, purposeful set of capabilities, and people remain in control of when and how contact happens.

You can explore the full deck here:

[View the Beyond CRUD slides →](https://mcpdeck260726.z13.web.core.windows.net/index.html#1)

## Stop two: Global AI Conference, Chennai

The following day, I traveled to Chennai for the Global AI Conference, a free one-day gathering for developers, engineers, data professionals, students, and AI builders. The program combined expert sessions, live demos, and hands-on workshops, all focused on turning AI ideas into working systems.

My session was **"Building an Agent-First Experience for Azure Cosmos DB."**

![Presenting Agentic Development with Azure Cosmos DB at the Global AI Conference in Chennai](/img/talks/agent-first-cosmos-db.jpg)

### The audience for developer guidance has changed

Documentation used to be written primarily for people. Today, agents retrieve documentation, samples, schemas, and repository context before they generate code or recommend an implementation.

That changes the responsibility of developer platforms:

- **Agents read more of the documentation.** Information must be structured, current, and easy to retrieve.
- **Agents make more implementation decisions.** API choices, data models, query shapes, retries, and indexing strategies may be selected before a person reviews the result.
- **Every mistake is amplified.** Weak guidance can become repeated code across projects, while strong guidance makes the preferred path repeatable.

Documentation is no longer only content that people read. It is context that agents use to make decisions and write code.

### What an agent-first database experience needs

An agent-first experience is not a chat box placed in front of an existing product. It requires the product to expose the right context and capabilities in forms an agent can use safely.

For Azure Cosmos DB, that experience brings several pieces together:

1. **MCP tools** give agents bounded access to real database capabilities.
2. **Skills** encode domain guidance for data modeling, querying, indexing, and SDK usage.
3. **Schema and repository context** help agents understand the application they are changing.
4. **CLI workflows** allow agents to invoke existing tools, inspect results, and adapt.
5. **Human control** keeps consequential operations visible and reviewable.

The goal is not to remove the developer. It is to reduce the context switching that gets between a developer and the problem they are trying to solve.

You can view the Chennai session deck here:

[View the Agentic Development with Azure Cosmos DB slides →](https://devglobeactivityfn.z13.web.core.windows.net/talks/agent-first-cosmos-db#1)

## What connected both talks

Bengaluru was about **boundaries**. Chennai was about **context**.

An agent needs both.

Context without boundaries creates a capable system that people cannot safely trust. Boundaries without useful context create a safe system that cannot do meaningful work. Good agent experiences combine:

- The right information
- Purpose-built tools
- Clear trust levels
- Durable application state
- Observable actions
- Human approval where consequences matter

This is the product and engineering work behind agent-first development. The protocol is important, but the experience is shaped by the decisions around it.

## Community makes the ideas better

Speaking in Bengaluru and Chennai on consecutive days was a reminder of why local developer communities matter. A slide deck can explain an architecture, but conversations with builders reveal the questions that architecture must answer in the real world.

How much access is too much? Where should consent live? How do teams keep agent guidance current? What should be observable? Which actions should always require a person?

Those questions are not side topics. They are the work.

Thank you to the organizers, volunteers, speakers, and attendees at MCP Community Connect Bengaluru and the Global AI Conference Chennai for creating spaces where developers could examine these challenges together.

The agent-first future will not be built by agents alone. It will be built by communities of people deciding, deliberately, what agents should be able to do—and what must always remain in human hands.

## Resources

- [MCP Community Connect Bengaluru](https://globalai.community/e/bd1o37ln)
- [Global AI Conference Chennai](https://globalai.community/e/7f851feb)
- [Beyond CRUD slides](https://mcpdeck260726.z13.web.core.windows.net/index.html#1)
- [Agentic Development with Azure Cosmos DB slides](https://devglobeactivityfn.z13.web.core.windows.net/talks/agent-first-cosmos-db#1)
- [DevGlobe](https://devglobe.dev)
