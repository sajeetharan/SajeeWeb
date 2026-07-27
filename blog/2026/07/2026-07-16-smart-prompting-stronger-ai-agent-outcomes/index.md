---
title: "Smart Prompting, Stronger AI Agent Outcomes — What Actually Works"
Date: "2026-07-16"
tags:
  - ai
  - coding-agents
  - prompting
  - skills
  - developer-tools
  - github-copilot
  - microsoft
coverImage: images/smart-prompting-framework.png
utcDate: "2026-07-16T00:00:00.000Z"
description: "Over the past few months, one prompting pattern has consistently produced better AI agents for me. Not bigger prompts. Not more skills. Just a better separation of responsibilities."
---

Over the past few months, one prompting pattern has consistently produced better AI agents for me.

Not bigger prompts.

Not more skills.

Just a better separation of responsibilities.

<!-- truncate -->

## The Framework

My current approach boils down to three pillars:

![Smart Prompting Framework](./images/smart-prompting-framework.png)

### ✅ Lean Prompts

Tell the agent **what** to do, not **how** to do everything.

- Be clear about the goal
- Include only what's essential
- Avoid fluff and unnecessary details

Instead of writing a 500-line prompt that tries to cover every edge case, I keep it short:

> _"List the top 5 features of our product."_

That's it. No preamble. No over-explanation. The agent doesn't need a backstory.

### 📚 Rich Artifacts & Context

Put the heavy lifting into documentation, examples, schemas, and project knowledge — not the prompt itself.

- Add docs, schemas, references
- Share examples and constraints
- Include relevant project knowledge

This is where files like `architecture.md`, `schema.json`, `coding-standards.md`, and `examples/` come in. The agent reads these as context, so your prompt stays lean while the agent still has everything it needs.

### 🧩 Small, Focused Skills

Keep skills modular with a single responsibility instead of building giant "do everything" tools.

- Single purpose
- Modular and composable
- Easy to maintain and extend

Think `query-data`, `run-tests`, `generate-report`, `create-pr` — each skill does one thing well. Not a monolithic "handle-everything" skill that tries to be clever.

## Why This Works

The result of applying this pattern consistently:

- **More consistent outputs** — The agent isn't distracted by irrelevant instructions
- **Better reasoning** — Smaller context means the agent focuses on what matters
- **Easier maintenance** — Change one skill without breaking everything else
- **Lower token usage** — Less prompt bloat means faster, cheaper responses

## What I Learned Building This in Practice

This isn't theoretical. I arrived at this framework through months of hands-on work building AI agent skills and tools. Here are some concrete examples from my own experience:

### Building the Cosmos DB Best Practices Skill

When I started building skills for the [Azure Cosmos DB Agent Kit](https://github.com/AzureCosmosDB/cosmosdb-agent-kit), I fell into the **"more is better" trap**. We wrote down everything — partition key strategies, indexing decisions, query optimization, change feed patterns, vector search setup. The skill file kept growing past 2,000 lines.

Then we started measuring. Some of that guidance made **zero measurable difference** — the model already knew it from training data. A few cases actually made things **worse** because the model spent attention budget processing our instructions instead of solving the problem.

The fix? We trimmed to a ~400-line core backed by reference files that load on-demand. Performance improved. Token usage dropped by ~60%. The lesson: **skills matter most where the model's training data is thin.**

I wrote about this journey in depth in my post [What Six Months of Building AI Agent Skills Taught Me About Writing for Machines](/blogs/building-skills-for-ai-coding-agents).

### Using Skills for Real Customer Scenarios

The framework proved itself in real support scenarios. When a customer needed help understanding why they couldn't scale down their Cosmos DB autoscale throughput after a test, I used the best practices skill to quickly generate accurate, context-aware guidance. The skill provided the precise domain knowledge the agent needed — not a generic explanation, but the exact autoscale behavior rules. Lean prompt + rich context = accurate answer in seconds.

### The MCP Toolkit — Composable by Design

The [Azure Cosmos DB MCP Toolkit](https://github.com/AzureCosmosDB/MCPToolKit) is another example of this philosophy in action. Instead of one massive MCP server that does everything, we built focused tools — query execution, data modeling, natural language to NoSQL — each with a single responsibility. When we shipped the GA, the modular design made it straightforward to add new capabilities like hybrid search without touching existing tools.

### Building Dashboards and Mockups with Agents

I've used this pattern beyond skills authoring. When building ADX dashboards for tracking agent kit telemetry, I gave the agent a lean prompt ("build a dashboard for these KQL queries") with rich artifacts (the schema, query files, and dashboard conventions). The agent produced a working build script in one shot.

Same pattern when prototyping the [Cosmos DB Data Modelling Workbench](https://cosmosdbmockup7822.z20.web.core.windows.net/mockup-data-modelling-flow-only.html) — a focused prompt with rich context artifacts, and the agent generated a complete interactive mockup.

### Even Personal Projects Follow This Pattern

I even applied this to non-work projects. My [fitness plan tracker](https://delightful-stone-0ebc7d41e.7.azurestaticapps.net/) deployed on Azure Static Web Apps was built entirely with an AI agent. Short prompts. A workout schema as context. Focused skills for deployment. The agent handled the rest.

## The Anti-Pattern: Why Long Prompts Fail

I've seen (and written) the opposite approach — massive prompts that try to anticipate every scenario. They fail for predictable reasons:

1. **Context rot** — Even models with 200K token windows lose attention in the middle. [Research confirms this](https://trychroma.com/research/context-rot). A big context window is not the same as a big _useful_ context window.

2. **Diminishing returns** — Past ~800 lines, performance degrades regardless of model. More tokens ≠ better output.

3. **Maintenance nightmare** — One giant prompt means every change risks breaking something else. Small skills are independently testable and updatable.

4. **Duplicating training data** — Frontier models already know common patterns. Writing skills for things models already handle is wasted effort.

## How to Get Started

If you want to try this framework:

1. **Audit your prompts** — Find the ones that are doing too much. Split the "what to do" from the "how to do it."

2. **Extract context into files** — Move schemas, examples, coding standards, and domain knowledge into separate artifacts the agent can reference.

3. **Build small skills** — One skill per capability. If a skill description needs the word "and," it's probably two skills.

4. **Measure** — Even a crude evaluation (5 test cases, 3 trials each) is infinitely better than vibes. You'll be surprised what the model already knows.

5. **Iterate** — Treat skills like code. Test them. Version them. Cut what doesn't help.

## What's Your Prompting Philosophy?

I'm curious if others have arrived at the same conclusion.

- Do you rely on long prompts?
- Do you invest more in context?
- Or have you found another approach that works even better?

Share your tips, prompts, or real-world examples — let's learn from each other.
