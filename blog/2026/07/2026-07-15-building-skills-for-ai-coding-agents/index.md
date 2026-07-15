---
title: "What Six Months of Building AI Agent Skills Taught Me About Writing for Machines"
Date: "2026-07-15"
slug: building-skills-for-ai-coding-agents
tags:
  - ai
  - coding-agents
  - skills
  - evaluation
  - developer-tools
  - microsoft
utcDate: "2026-07-15T09:00:00.000Z"
---

Back in January, I started building skills for AI coding agents — domain-specific guidance that helps agents like GitHub Copilot, Claude, and others produce better code in areas they'd otherwise struggle with. My domain happened to be Azure Cosmos DB, but the lessons apply to anyone writing skills for any technology.

Six months later, what I learned about _how_ to write for AI agents turned out to be far more interesting than the domain knowledge itself.

<!-- truncate -->

## The starting point

The idea seemed simple enough: take deep expertise in a technology, write it down as structured guidance, and feed it to coding agents as a "skill." The agent reads the skill, follows the rules, and produces better output. Easy.

So that's what we did. We wrote down everything — design patterns, common pitfalls, configuration recipes, SDK best practices, operational guidance. For Cosmos DB specifically, this meant partition key strategies, indexing decisions, query optimization, change feed patterns, vector search setup. Hundreds of rules, all carefully documented.

It felt productive. We were _capturing knowledge_. Surely more knowledge = better outcomes?

## The "more is better" trap

We kept adding. Every edge case, every teammate's favorite gotcha, every "oh you should also mention..." went in. The skill file kept growing — 500 lines, 1000, eventually past 2000.

Then newer models came out — and they were already pretty good at a lot of what we'd written. Without any skill at all, they'd handle basic scenarios correctly. They already knew common patterns from training data.

Which raised the uncomfortable question: **were our skills actually helping, or were we just duplicating what models already knew?**

We had no idea. We were operating on vibes.

## We started measuring (and got humbled)

This is where things got real. We set up controlled experiments — give the same coding tasks to agents with and without our skills, then grade the output systematically.

We tested:

- Bare model, zero guidance
- Full monolithic skill (everything we'd written)
- Trimmed versions (cut the obvious stuff)
- Split by topic (separate skills per domain area)
- Across different foundation models
- Across different agent runtimes

Some results stung. There were scenarios where our carefully written guidance made _zero measurable difference_. A few cases where it actually made things _worse_ — the model spent attention budget processing our instructions instead of just solving the problem.

But there were also clear wins. Complex, nuanced scenarios — things where even frontier models would make mistakes — showed real improvement with skills. The pattern was clear: **skills matter most where the model's training data is thin or the task requires precise, multi-step domain reasoning.**

For Cosmos DB, that meant skills were invaluable for things like multi-container data modeling and vector search configuration, but unnecessary for basic CRUD operations or simple queries.

## The split skills experiment (and why it mostly didn't help)

We had a theory: break the monolith into smaller, topic-focused skills. One for data modeling. One for querying. One for SDK patterns. Clean separation.

Sounded great. In practice? The agent loaded three of them for a single task, ending up with roughly the same token count as the monolith. Different filing cabinet, same pile of paper on the desk.

The lesson: **splitting only helps if it changes what actually gets loaded per interaction.** Reorganizing files doesn't reduce context consumption. You need a mechanism that selectively loads only what's relevant for the current task.

## Context rot is real

Here's something that caught me off guard. A skill that worked beautifully on one model (long context window) completely fell apart on another (tighter window). Same content, wildly different results.

There's [research on this phenomenon](https://trychroma.com/research/context-rot) — even if a model technically supports 200K tokens, its actual attention degrades well before that limit. Information in the middle gets lost. Instructions at the end carry less weight. A big context window is not the same as a big _useful_ context window.

The takeaway: **how you package guidance matters as much as what's in it.** Skill design isn't just a content problem — it's a delivery problem.

## Five principles that actually work

After months of experimentation, five things consistently improved skill effectiveness regardless of the domain:

### 1. Steps beat prose, every time

Our early skills read like documentation — conversational, nuanced, full of "it depends." Models hated it. They'd cherry-pick fragments or hallucinate steps that weren't there.

Rewriting as numbered, deterministic procedures changed everything. For example, instead of _"Consider your access patterns and choose appropriately..."_, we'd write:

1. Identify the most frequent query predicate
2. Check candidate cardinality (must exceed threshold)
3. Validate with a concrete query
4. If below threshold, combine fields into a composite

No ambiguity. No interpretation needed. Pass rates improved immediately across every domain we tested.

### 2. How you describe the skill matters more than you think

Our first skill description was vague — something like "Best practices for [Technology X]." It got triggered for everything remotely related, including completely wrong contexts.

The fix: explicit scope boundaries and **negative triggers**. A good description says what the skill is for _and_ what it's not for. "Do NOT use for [related but different technology]" is surprisingly effective at preventing false matches.

We also found that skill registries degrade in selection accuracy past ~20-30 entries without a retrieval filter. Precise descriptions become doubly important as your skill library grows.

### 3. Don't front-load everything

We went from 2000+ lines to a ~400-line core backed by reference files that load on-demand. The core says _"For [specific topic], read `references/topic-details.md`"_ — and the agent only pulls that in when the task requires it.

Our empirical finding: performance degrades above ~800 lines regardless of model. Keep the entry point lean. Defer supplementary detail to separate files that get loaded only when explicitly needed.

### 4. Scripts over step-by-step instructions

Any multi-step operation with dependencies between steps (setup flows, migrations, environment configuration) should be wrapped in a single executable script. Models routinely skip steps, reorder operations, or miss conditional branches when given sequential instructions.

One script call = deterministic execution = no ambiguity. We apply this everywhere a task involves more than two sequential commands with dependencies.

### 5. Route, don't concatenate

The real breakthrough: a lightweight "router" skill that examines the task and selectively loads _only_ the relevant sub-skill. A modeling question loads the modeling skill. A performance question loads the optimization skill. Not both.

This cut average context consumption by ~60% with no loss in coverage. The key insight: **composition only works if it changes what gets loaded, not just how files are organized on disk.**

## The bigger lessons

Three things I'll carry with me:

**Measure before you write.** We would have sworn certain skills were helping. Data said otherwise. Start with evaluation, not authoring. You'll be surprised what models already know — and even more surprised what they consistently get wrong.

**Less is more.** Every token competes for attention. A focused 300-line skill covering what the model _doesn't already know_ beats a comprehensive 2000-line one that mostly repeats training data.

**This is a new discipline.** Writing for AI agents isn't like writing docs, tutorials, or prompts. It's closer to writing a curriculum for a very fast, very literal student who reads everything once and has limited short-term memory. That mental model changes how you structure everything.

## Hill-climbing: continuous improvement

We now treat skills like code — they get tested. The loop:

1. Define what success looks like for a set of tasks
2. Write 10-20 scenarios (including negative cases where the skill should _not_ trigger)
3. Run 5-30 trials per scenario
4. Grade with script graders (did the output actually work?) and LLM graders (was the reasoning sound?)
5. Identify failure patterns, tweak the skill
6. Re-run and compare

Each cycle pushes pass rates up incrementally. It catches regressions when underlying models update. It's tedious, but it's the only way to know if your skills are actually getting better versus just _feeling_ better.

## If you're starting out

My honest advice for anyone building skills in their own domain:

1. **Pick the hard stuff.** Don't write skills for things models already handle. Focus on areas where you see consistent failures or where domain expertise genuinely matters.
2. **Measure from day one.** Even a crude eval (5 test cases, 3 trials each) is infinitely better than vibes.
3. **Write procedures, not explanations.** The agent doesn't need to _understand why_ — it needs to know _what to do_.
4. **Keep it short.** If you can't fit the core guidance in 400-500 lines, you're probably trying to cover too much in one skill.
5. **Test negative cases.** Make sure your skill doesn't trigger where it shouldn't. False positives are as bad as missing coverage.

Minko Gechev gave a [great talk on skill design](https://mgechev.github.io/skill-design-for-llm-agents-slides/) at the AI Coding Summit that covers many of these same principles from a framework perspective. Highly recommend it if you're working in this space.

Six months in, I'm more convinced than ever that the hard problem isn't capturing knowledge — it's delivering it effectively to a system with very different attention patterns than a human reader. We're still learning. But the gap between "skills that feel right" and "skills that measurably work" is where all the interesting problems live.
