---
name: write-weekly-tech-blog
description: Draft, review, or revise Chinese weekly technology blog posts based on dated primary sources. Use for frontend ecosystem reports, AI product reports, release-note roundups, changelog summaries, and Codex automations that must turn official updates into selective, evidence-linked, actionable technical writing.
---

# Write Weekly Tech Blog

Produce a concise engineering briefing, not a changelog dump. Keep only changes that affect code, compatibility, security, cost, availability, or developer workflow.

## Workflow

1. Read only repository conventions, automation prompt, and at most one recent post.
2. Define exact reporting window with absolute dates.
3. Batch-search official sources. Open only results inside the reporting window that appear material.
4. Omit routine patches, cosmetic changes, minor performance claims, undated updates, repeated announcements, and releases without concrete engineering impact.
5. Rank remaining items by security, breaking change, retirement, stable capability, then preview capability.
6. Draft 1–7 technology subsections. Never add weak items to reach a quota. Use this sequence:
   - `### Technology`
   - `> 参考来源：[direct primary source](URL)`
   - one sentence stating exact version/date/status and material change
   - one short paragraph stating affected users, risk, or required action
7. Run `scripts/lint_weekly_blog.py <post.md>`.
8. Run repository build or content validation.
9. Recheck only high-risk claims against direct sources.

Do not add `本周观察`, `本周总结`, `趋势观察`, `本周未记录`, omitted-product lists, or research-process notes.

## Token Budget

- Reuse one official index page to locate dated entries; do not repeatedly reopen it.
- Search multiple products in one batch.
- Use page find or targeted excerpts instead of reading full pages.
- Stop researching a product after finding one sufficient direct source.
- Do not collect evidence for items that will be omitted.
- Do not copy long release-note lists into context. Extract only date, version, status, changed behavior, constraint, and URL.
- Draft directly from compact notes. Do not create scoring tables, evidence ledgers, or intermediate prose summaries.
- Prefer omission over spending tokens proving a marginal update.

## Evidence Rules

- Prefer dated release pages, migration guides, security advisories, official docs, and official changelog entries.
- Link direct item pages when available; avoid relying only on generic changelog index pages.
- Keep source links local to each technology subsection. Do not use one category-level source list as substitute for claim provenance.
- Separate fact from inference. Omit broad inference unless it changes an engineering decision.
- State stable, beta, preview, canary, deprecated, and retired status precisely.
- Verify dates belong to reporting window. Publication date and effective date may differ; state both when relevant.
- For availability claims, record plan, region, platform, rollout status, and account restrictions.
- Missing or weak evidence means omit item. Do not explain omission in article.

## Editorial Rules

- Tone: professional, minimal, objective, engineering-led.
- Lead with highest-value change. Intro: 60–100 Chinese characters; name at most three leading items.
- Use 1–2 compact paragraphs per technology. Target 120–220 Chinese characters excluding source links.
- Delete setup, transitions, rhetorical conclusions, repeated benefits, and generic advice.
- State action only when required: upgrade, migrate, verify, or wait.
- Prefer examples, affected configurations, commands, API fields, or failure modes over adjectives.
- Keep English terms when they are established technical names; write surrounding Chinese naturally.
- Do not inflate canary work into production guidance.
- Avoid first-person and second-person wording.
- Forbidden text: `总而言之`, `众所周知`, `值得注意的是`, `画卷`, `框架`.
- Also avoid filler patterns: `值得关注`, `更重要的是`, `这一点很关键`, `对团队来说`, `本周更新主要集中在`.

## Review Output

When reviewing an existing post, report:

1. publishing blockers: incorrect provenance, unsupported claim, wrong date/status, missing compatibility constraint
2. structural issues: weak prioritization, excessive breadth, filler, repeated language, source placement
3. line-level examples with proposed rewrites
4. automation changes that prevent recurrence

Do not rewrite the whole article unless asked.

## Automation Integration

Make automation invoke this skill explicitly before research and drafting:

```text
Use $write-weekly-tech-blog to research, draft, lint, and validate the weekly post.
```

If the runtime does not auto-discover repository-local skills, use:

```text
Read and follow /Users/a1-6/code/blog/skills/write-weekly-tech-blog/SKILL.md before researching or drafting.
```

Keep automation prompt responsible for schedule, target file, commit, and push. Keep editorial method in this skill to prevent two large prompts drifting apart.
