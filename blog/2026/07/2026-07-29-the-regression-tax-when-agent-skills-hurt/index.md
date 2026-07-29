---
title: "The Regression Tax: Why Your Agent Skills Might Be Breaking More Than They Fix"
Date: "2026-07-29"
slug: the-regression-tax-when-agent-skills-hurt
tags:
  - ai
  - coding-agents
  - skills
  - evaluation
  - research
  - developer-tools
utcDate: "2026-07-29T00:00:00.000Z"
description: "Are agent skills always worth using? A new paper reveals that regressions offset 59% of gross gains — and the best skills win by breaking less, not helping more."
---

I've spent the last six months writing skills for AI coding agents. Somewhere around month three, I started noticing something uncomfortable: some of our best-intentioned guidance was making things worse. Not on every task — just on enough tasks to make me question whether we were actually helping.

I couldn't prove it. I had gut feelings and a few suspicious eval runs, but nothing concrete enough to point at and say "this is why."

Then I read [this paper](https://arxiv.org/abs/2607.22520).

<!-- truncate -->

## The paper that put numbers on the feeling

_The Regression Tax: Decomposing Why Skills Help — and Hurt — LLM Agents_ by Darshan Tank and Baran Nama (Sentient Labs) does something deceptively simple. They ran the same agent on the same tasks with and without skills — nearly 6,000 paired runs across two office-automation benchmarks and three different model–harness stacks (OpenCode + MiniMax-M2.7, Codex + GPT-5.4-mini, Claude Code + Sonnet 4.6).

Then instead of just reporting "skills improved pass rate by X%," they counted both sides: how many tasks did skills _fix_, and how many tasks did skills _break_.

The answer stung.

Across all conditions, **regressions wiped out 59% of the gains**. 553 tasks newly solved, 324 tasks newly broken. Net: 229.

That's not a rounding error. That's a tax.

## Breaking less matters more than helping more

Here's the finding that genuinely changed how I think about this work.

The best-performing skill libraries didn't get there by helping on dramatically more tasks. They got there by **breaking fewer things**. The separation between good and bad libraries was mostly on the regression side, not the gain side.

One example from the paper stuck with me. On Claude Code + Sonnet 4.6, three skill libraries gained 10, 11, and 12 tasks respectively on OfficeQA-Pro. Sounds like the 12-gain library wins, right? But they regressed 2, 4, and 7. The library that gained the _fewest_ tasks actually had the best net effect because it barely broke anything.

I thought back to our own work. When we cut the Cosmos DB skill from 2,000 lines down to ~400, the eval numbers went up. At the time I assumed it was because the trimmed version was more focused and helped more. Now I think the real story is simpler: we stopped breaking cases the model already handled. The trim removed more damage than it removed help.

## How skills break things

The paper names three mechanisms, and honestly, I've hit all three without knowing what to call them.

### Skills change behavior just by existing in context

They call this "skill-description osmosis." A skill sits in the system prompt — its name, its short description — on every single step. The body never loads. The skill is never invoked. And yet outcomes change.

They showed one task where all three independently written skill libraries caused the exact same wrong answer. None were invoked. The descriptions alone shifted how the agent interpreted a financial figure. Same wrong number, three decimal places, across all three libraries. That's not noise.

I've seen a version of this myself. We had a skill with "structured references" in its description, and it was causing the agent to reach for Excel table-reference syntax on completely unrelated spreadsheet tasks. The skill was never triggered — it was just... there, biasing things.

The scary part: any system that decides whether to suppress a skill based on whether it gets _called_ cannot catch this. The description is always present.

### Generic procedures override correct intuition

"Grounding displacement" — a skill tells the agent how to navigate to information, and that procedure sends it to the wrong place. The bare agent would have found the right table on its own. The skill's general-purpose navigation steps redirected it.

This accounted for 59 out of 81 regressions on one benchmark. The most common way skills break things is by overriding a correct reading with a generic one.

Think about it: you write a skill that says "always start by checking the summary table." Great advice most of the time. But for the task where the answer is in a footnote on page 7, you just sent the agent on a detour it never comes back from.

### Skills suppress the agent's own sanity checks

"Verification displacement." The skill's procedure takes over, and somewhere along the way the agent stops doing the final "does this answer actually make sense?" check it would have done on its own.

On SpreadsheetBench, 226 out of 663 formula failures were formulas that were **already correct**. The agent wrote the right formula. It just never verified the output. When the researchers re-graded those with a proper execution check, they all passed.

The agent did the hard work. The skill displaced the easy part — looking at what it produced and asking "is this right?"

## The pipeline problem

The paper frames it with a simple diagram that I keep coming back to:

```
INPUT → [grounding] → [method/reasoning] → [verification] → OUTPUT
```

Skills live almost entirely in the middle box — they're procedural, they tell the agent _how_ to do the work. But when the researchers traced where failures actually happen, procedure was the stage _least_ responsible. Grounding (did the agent read the right input?) and verification (did it check its output?) are where things go wrong.

We're over-engineering the part models are already decent at, and ignoring the parts where they actually need help.

Looking back at our own skill iterations, this tracks. The changes that moved our eval numbers the most weren't better procedures. They were things like "read the partition key path from container settings _before_ writing any query" (grounding) and "after generating output, verify the partition key appears in the WHERE clause" (verification). Boring, specific, and effective.

## What I'm changing

I'm not going to pretend I have this all figured out. But a few things are different now:

**We track regressions separately.** Not just "did pass rate go up?" but "which previously-passing tasks now fail?" Two skills with identical net improvement can have completely different regression profiles, and we want the one that breaks less.

**Descriptions get the same scrutiny as bodies.** Every word in a skill description is always-on context. It's not just a trigger condition — it's shaping agent behavior on every task, including the ones it has nothing to do with. We're rewriting descriptions to be narrower and more precise, with explicit "DO NOT USE FOR" boundaries.

**Less procedure, more anchoring.** Instead of 15-step how-to guides, we're writing short grounding statements ("the data you need is here, not there") and verification checks ("confirm your output satisfies X before returning"). The model knows how to write a Cosmos DB query. It sometimes looks at the wrong container or forgets to check its results.

**We test the description-only condition.** Descriptions present, bodies disabled. If outcomes shift, the description is doing unsupervised work. Sometimes that's fine. Sometimes it's osmosis you need to fix.

## The uncomfortable takeaway

I've written before about [how less is more with skills](/blogs/building-skills-for-ai-coding-agents). This paper makes me think I didn't go far enough.

The instinct when a skill helps on 10 tasks is to celebrate. But if it also silently breaks 7 tasks the bare model had already nailed, your net is 3. And you won't know that unless you're measuring both sides.

Most of the value in skill engineering isn't in the knowledge you add. It's in the damage you don't do. That's the regression tax, and it's higher than any of us assumed.

---

_Paper: [The Regression Tax: Decomposing Why Skills Help — and Hurt — LLM Agents](https://arxiv.org/abs/2607.22520) (Tank & Nama, 2026). If you're building agent skills, read this one._
