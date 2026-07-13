---
name: write-tech-blog
description: "Draft or substantially revise standalone Chinese technical blog posts for this repository, especially frontend engineering, JavaScript/TypeScript, build tooling, browser platform, architecture, and AI-assisted development topics. Use when the user asks to write a technical blog post, tutorial, explainer, implementation retrospective, technical comparison, or single-release deep-dive. Write for a senior frontend engineer with professional editorial judgment: rigorous, evidence-based, practical, and concise. Do not use for recurring weekly reports, dated multi-product changelog roundups, or prose-only reviews."
---

# Write Tech Blog

## Overview

Produce a publishable Chinese technical article that explains an engineering decision or mechanism clearly enough for experienced practitioners to evaluate and apply. Prioritize verified facts, explicit constraints, and implementation consequences over topical coverage or promotional language.

## Workflow

1. Determine the article’s core question, intended reader, and article type. If the user only supplies a topic, choose a narrow, decision-oriented angle rather than attempting an encyclopedia-style overview.
2. Read the repository conventions, front-matter conventions, and at most one comparable recent post. Before writing, check the target directory and choose a new, non-conflicting filename; preserve all existing posts and unrelated working-tree changes.
3. Build a claim outline before researching. Separate:
   - stable background knowledge that needs no time-sensitive verification;
   - current, versioned, or numerical claims that need authoritative sources;
   - engineering judgments that must be labeled as trade-offs or recommendations rather than facts.
4. Research only the claims required by the outline. Prefer primary sources: official documentation, release notes, specifications, source repositories, and original issue/RFC discussions. Follow repository instructions for documentation lookups and web fetching. Link sources next to the claims they support; do not fabricate benchmarks, compatibility statements, versions, or roadmaps.
5. Draft the article with the structure that best fits the subject. Use a precise title and a description that states the reader benefit without repeating the title. Add a concise opening that establishes the problem, scope, and conclusion; place `<!--truncate-->` after the opening when the site uses blog previews.
6. Explain the mechanism before prescribing a solution. Show the relevant code, configuration, command, data flow, or failure mode. Keep examples minimal, correct, and internally consistent; state prerequisites and version constraints where they matter.
7. End with a concrete decision boundary, migration sequence, or checklist only when it helps the reader act. Do not add generic summaries or filler conclusions.
8. Verify every high-risk claim, code block, link, front matter field, filename, route, and Markdown structure. Run the repository’s relevant content validation or build. Report any warnings that are unrelated to the new post separately.

## Editorial Standard

- Write in Chinese with established English technical terms retained where they improve precision, such as `tsconfig`, `tree-shaking`, `event loop`, and `LSP`.
- Lead with the result or engineering problem. Use headings that describe mechanisms, constraints, or decisions rather than vague labels such as “背景介绍” or “总结”.
- **Heading hierarchy**: Organize articles with a 2–3 level heading structure (`##` → `###`, occasionally `####`). Avoid flat single-level outlines that force readers to scan long undifferentiated sections.
- **Heading conciseness**: Keep headings short enough to stay on one line on a 13-inch laptop screen — typically no more than 10 Chinese characters for H3, and no more than 15 for H2. Drop explanatory colons and subordinate clauses; let the body text do the explaining. For example, prefer `## Go 原生编译器` over `## 性能：Go 原生编译器带来什么`.
- **Heading fidelity**: Every heading must faithfully represent the section’s core idea. Do not trim a heading to the point where it becomes generic or misaligned with the content that follows. Brevity serves scannability; accuracy preserves meaning.
- Prefer explicit scope, conditions, inputs, outputs, and failure modes. Qualify conclusions: use “在……条件下”, “官方文档表明”, “本文的建议是”, or “需要通过项目基准验证” when appropriate.
- Treat performance figures, compatibility claims, browser support, security guidance, release status, and API syntax as evidence-dependent. State the source, version, and date whenever they materially affect the conclusion.
- Explain trade-offs. Every recommendation that changes architecture, build configuration, deployment, dependency versions, or developer workflow should say who benefits, what can break, and when not to adopt it.
- Use short paragraphs. Use a table for repeated field comparisons and a diagram only when it materially clarifies a multi-stage flow or dependency relationship. Do not add visuals as decoration.
- Keep the authorial stance experienced but non-performative: no hype, faux certainty, rhetorical questions, broad industry predictions, or ungrounded “best practice” claims.

## Recommended Article Shapes

Choose one of these shapes instead of combining every section into every article:

| Article type | Recommended progression |
| --- | --- |
| Mechanism explainer | Problem → mental model → mechanism → example → limits |
| Tutorial or implementation note | Goal → prerequisites → steps → validation → common failures |
| Technical comparison | Decision criteria → comparable dimensions → evidence → recommendation by scenario |
| Architecture or incident retrospective | Context → constraints → decision/process → outcome → reusable lessons |
| Release deep-dive | What changed → affected workflows → compatibility boundary → adoption plan |

## Quality Gate

Before handing off a draft, confirm all of the following:

- The title, description, opening, and section hierarchy all express the same narrowly defined topic.
- Headings form a clear 2–3 level hierarchy (`##`/`###`), are concise enough to avoid line wrapping on narrow screens, and accurately capture each section's content.
- Every factual claim that can change over time has a direct, relevant source.
- Code and configuration snippets use valid syntax and match the stated version or environment.
- The article distinguishes documented behavior from the author’s interpretation or recommendation.
- The article does not promise universal performance gains, compatibility, or correctness without evidence.
- The new file neither overwrites an existing post nor introduces a duplicate slug or route.
- Build or content validation has been run when the repository provides one.

## Skill Boundaries

Use `write-weekly-tech-blog` only for recurring weekly reports or dated multi-product roundups. Use `writing-guidelines` when the user asks for a dedicated prose/style review of an existing article. This skill owns drafting and substantial content revision of standalone technical posts; it does not require the weekly report’s fixed source list, reporting window, or linter.
