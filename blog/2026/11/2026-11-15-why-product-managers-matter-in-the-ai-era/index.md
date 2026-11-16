---
title: "Why Product Managers Who Build Have an Edge in the AI Era"
Date: "2026-11-15"
slug: why-product-managers-matter-in-the-ai-era
image: /img/blog/product-managers-ai-era-preview.png
authors:
  - Sajeetharan
tags:
  - ai
  - product-management
  - developer-tools
  - career
  - agent-kit
keywords:
  - product managers in the AI era
  - AI product management
  - technical product manager
  - product engineers
  - product judgment
  - agent skills
utcDate: "2026-11-15T00:00:00.000Z"
description: "From customer problems to agent-skills prototypes and DevGlobe: my perspective on why hands-on technical product managers have an edge in the AI era."
---

If an engineer can use AI to build a feature without waiting for a PM, what exactly is the PM contributing?

I'm a PM with a development background, and I think that's a reasonable question. I enjoy building. Give me an idea and the tools to try it, and I'd often rather make a small prototype than write another page explaining what it might do.

So I understand the excitement about engineers doing more on their own. I want that too.

Where I disagree is the next leap: that because implementation is getting easier, the product decisions must be getting easier as well. In my own work, those are still the decisions I have to think hardest about.

Which customer problem deserves our attention? Is this prototype useful, or do I just like it because I built it? What should we stop doing to make room for this?

That's the part of the PM job I want to spend more time on.

<!-- truncate -->

## The customer problem came before the agent skill

Take the agent-skills work. Customers were running into a gap: a coding agent could help with general programming, but it didn't reliably have the domain-specific guidance they needed for database work.

That gave me something specific to investigate. Rather than leave it as a feature request, I built a proof of concept around agent skills, showed the value of the approach, and handed it over to engineering to take forward.

Being able to build helped. It gave us something to examine instead of asking everyone to imagine the same solution from a document.

But I wouldn't call the prototype the whole contribution. The customer problem gave it a purpose. Demonstrating the value gave us a reason to pursue it. Engineering still had to take it beyond the proof of concept.

And there were questions a demo couldn't settle: production readiness, maintenance, and whether the approach would keep helping customers over time.

This is why I value having a development background as a PM. I can make an uncertain idea easier to evaluate. That doesn't mean I should take over engineering, or that my first implementation is the one we should ship.

## DevGlobe made me ask a different question

I've had a related experience through DevGlobe, skill-graph work, and building a hackathon-winning project.

A hackathon rewards making an idea tangible under a deadline. I enjoy that. But winning doesn't answer whether someone will come back to use what you've built.

With DevGlobe, the initial idea was an interactive 3D map of developers. As I [wrote in the project walkthrough](/blogs/building-devglobe-with-azure-cosmos-db), it grew into a discovery problem: how do you find a developer with relevant experience, rather than just a popular profile?

Once I frame it that way, the map isn't enough. I need to ask:

- Are we helping someone discover relevant expertise, or just giving them an attractive visualization?
- What evidence makes a match understandable and credible?
- How should an agent request an introduction without bypassing consent?

Those questions affect what I build next, including the architecture.

I apply the same test to work on the Agent Kit and MCP Toolkit. A new capability gives me something to demonstrate. Whether it helps a developer finish a useful workflow is a separate question, and the one that matters more.

## The strongest engineers already practice product management

The engineers best positioned to benefit from AI aren't necessarily the ones producing the most code.

An engineer who understands the customer, spots an opportunity worth pursuing, and gets people behind it can now do more of the implementation independently too. That's a powerful combination.

I'd happily call that product thinking. PMs don't own those qualities.

[Cory House's observation about roles collapsing](https://x.com/housecor/status/2090821608080298396) captures the direction well: software engineers may increasingly act as product engineers, with responsibilities extending into design, UX, quality, and product thinking.

I agree with the direction. Where I'm less convinced is the idea that broader skills remove the need for depth. I can build a prototype without having an engineer's judgment about running it reliably in production. An engineer can have excellent product instincts without having time to do sustained discovery across several customer segments.

## Independence is a team expectation, not a PM service

Consider a simple dependency: a feature needs information or an API change from another engineering team.

I'd expect the person working on it to find the owner, start the conversation, and bring back options. If the teams disagree about priorities, that's a good place for me to help. If all that's missing is an introduction, I shouldn't need to become a permanent messenger.

The same standard applies to me. I should not wait for engineering to make every uncertain idea tangible when I can investigate, prototype, or clarify it myself.

Of course, some blockers need a manager, a budget decision, or agreement between teams. Asking for help with those is sensible. I don't think independence means quietly struggling with something you don't have the authority to change.

What I want to avoid, in myself as much as anyone else, is waiting for another role to do the next reasonable thing.

## Product management is still its own discipline

The case for a dedicated PM becomes clearer when there are hundreds of customer signals, dozens of possible features, and room to pursue only two or three.

Someone needs to work through the mess. A loud customer request might matter enormously, or it might pull the team away from the segment we've chosen to serve. Three similar requests might have different underlying problems. A useful feature might still cost more to support than the business can justify.

Then there is the work of getting engineering, design, data, research, and business stakeholders to understand the choice, including what we're saying no to. And changing course when the evidence doesn't support it.

AI is useful for organizing that material and challenging an argument. I still have to check the assumptions. A neatly ranked feature list isn't much help if we've misunderstood the customer.

[Marty Cagan and Marily Nika's article on AI product management](https://www.svpg.com/ai-product-management/) adds another complication: with AI products, we also have to decide what mistakes are acceptable, how to set expectations, and what happens when the system gets something wrong.

I don't want the PM to be the boss of all those decisions. I want engineering to lead on architecture, design to bring deep UX judgment, and research and data specialists to challenge our evidence. My responsibility is to help connect those decisions to a customer problem and a viable business.

## The hiring data challenges the replacement story

Lenny Rachitsky's latest job-market report also made me pause before accepting the claim that PMs are disappearing.

In his November 10, 2026 report, [_State of the tech job market: late 2026_](https://www.lennysnewsletter.com/p/state-of-the-tech-job-market-late), Lenny Rachitsky reports:

| Reported measure                                      | Finding                                   |
| ----------------------------------------------------- | ----------------------------------------- |
| Open PM roles compared with the March 2023 low        | Up 75%                                    |
| PM openings since the start of 2023                   | Up 56%, compared with 43% for engineering |
| PM share of hiring across the five core product roles | Increased from 16% in 2021 to 21% in 2026 |

The five roles are product management, engineering, design, data, and user research. PM was the only one whose hiring share increased in that comparison.

The methodology matters. The openings data comes from TrueUp's tracking of more than 9,000 tech companies globally. The hiring data comes from Live Data Technologies, with the report's hiring figures specifically covering the United States.

**Openings are not completed hires. Share of hiring is not absolute hiring growth.**

The same report says actual hiring across the core product roles has been flat or declining over the past few years. A role can gain share in a shrinking market. The data also does not establish that AI caused the relative resilience of PM demand.

That's a more mixed picture than the headline suggests. It doesn't tell me my role is safe. It does make me skeptical of blanket claims that companies no longer need PMs.

## The Reddit debate makes the distinction clearer

Two older discussions in r/ProductManagement are useful alongside the newer hiring data.

In [_I tried to replace a PM with AI. It kinda worked._](https://www.reddit.com/r/ProductManagement/comments/174o194/i_tried_to_replace_a_pm_with_ai_it_kinda_worked/), the author describes an informal experiment where AI could produce PM-like responses but struggled with pushback, conflict, and context-sensitive problem solving.

In [_Product Managers who build AI powered features_](https://www.reddit.com/r/ProductManagement/comments/18dsz2z/product_managers_who_build_ai_powered_features/), participants discuss fitting AI to actual workflows and recognizing when an AI solution is unnecessary.

These are practitioner anecdotes, not representative research or a benchmark of today's models. I take them as discussion prompts, not proof.

What interests me in both discussions is where the useful output stops. Drafting a requirement or suggesting a solution helps. Deciding whether to back that solution, push back on it, or investigate further is still work someone has to own.

## What I am taking forward

For my own work, there are three things I want to keep checking:

- **What am I trying to learn by building this?** If I can't answer that, I may be using the prototype to avoid a harder customer question.
- **What does engineering still need to decide?** A working PoC should make that conversation better, not imply that the difficult work is finished.
- **How will we know it helped?** Shipping is worth celebrating, but I need to come back to the problem that justified the work.

None of this requires everyone to do five jobs. It does require enough understanding of each other's work to know when to act independently and when to bring someone else in.

## Where I land

I don't think every team needs the same setup. On a small team, an engineer or founder may be doing much of this product work already. Giving someone a PM title doesn't automatically improve the decisions.

But the work still needs to happen. Someone has to sort through conflicting needs, decide what deserves attention, and stay with the problem after the demo.

For me, being a PM who builds is a useful way to do that. I can test an idea rather than only describe it, and bring something concrete to the team. The part I have to keep watching is whether I'm building because it helps the customer or because I enjoy building.

I'm not worried about having fewer documents to write. I'd be worried if I couldn't explain why the next thing we build is worth the team's time.

If you're a PM or engineer, I'd like to hear how this is changing on your team. Has AI actually shifted who makes product decisions, or mostly who can build the first version?

---

## Sources and further reading

- [Lenny Rachitsky: State of the tech job market, late 2026](https://www.lennysnewsletter.com/p/state-of-the-tech-job-market-late) - source and methodology for the hiring figures above.
- [Lenny's hiring-share post](https://x.com/lennysan/status/2120233742447042991) and [follow-up on the post-2021 recovery](https://x.com/lennysan/status/2120280055419228303).
- [Cory House on the shift toward product engineering](https://x.com/housecor/status/2090821608080298396) - commentary on broader engineering responsibilities, not a guarantee about future job titles.
- [Marty Cagan and Marily Nika: AI Product Management](https://www.svpg.com/ai-product-management/).
- [SVPG: Product in the AI Era resource guide](https://www.svpg.com/ai-resource-guide/) - related reading on judgment, discovery, and team autonomy.
- [Reddit: I tried to replace a PM with AI. It kinda worked.](https://www.reddit.com/r/ProductManagement/comments/174o194/i_tried_to_replace_a_pm_with_ai_it_kinda_worked/) and [Product Managers who build AI powered features](https://www.reddit.com/r/ProductManagement/comments/18dsz2z/product_managers_who_build_ai_powered_features/) - older, anecdotal practitioner discussions.
- My related posts: [building DevGlobe](/blogs/building-devglobe-with-azure-cosmos-db) and [the regression tax in agent skills](/blogs/the-regression-tax-when-agent-skills-hurt).
