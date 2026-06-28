---
name: write-weekly-tech-blog
description: Draft, review, or revise Chinese weekly technology blog posts from a fixed set of official sources (React, TypeScript, Shadcn/UI, Tailwind CSS, Ant Design, Vite, webpack, Rspack, Rolldown, Oxlint, Oxfmt, pnpm, npm, Turborepo, SWC, Babel, ESLint, Prettier, Node.js, Bun, Electron, Codex, ChatGPT, Cursor, Web Platform). Use for frontend and AI weekly reports, release-note roundups, changelog summaries, and Codex automations that must turn official updates into selective, evidence-linked, actionable technical writing.
---

# Write Weekly Tech Blog

Produce a concise engineering briefing, not a changelog dump. Keep only changes that affect code, compatibility, security, cost, availability, or developer workflow.

## Workflow

1. Read only repository conventions, automation prompt, and at most one recent post.
2. Define exact reporting window with absolute dates.
3. Search from the fixed Data Sources list below. Open only results inside the reporting window that appear material.
4. Omit routine patches, cosmetic changes, minor performance claims, undated updates, repeated announcements, and releases without concrete engineering impact.
5. Rank remaining items by security, breaking change, retirement, stable capability, then preview capability.
6. Draft 1–12 technology subsections. Never add weak items to reach a quota. Use this sequence:
   - `### Technology`
   - `> 参考来源：[direct primary source](URL)`
   - one sentence stating exact version/date/status and material change
   - one short paragraph stating affected users, risk, or required action
7. 在正文末尾添加 `## 本周推荐阅读` 章节。从数据源中精选最多 5 个高质量内容（发布说明、RFC、技术文章），或对前端技术有较大影响力的更新。每条格式：
   - 链接标题与一句话推荐理由
   - 若本周无值得推荐的内容，省略该章节
8. 不要在 `##` 分类标题下添加 `本分类参考来源：` 汇总行。每条技术栈的参考来源仅出现在各自的 `> 参考来源：` 链接中。
9. Run `scripts/lint_weekly_blog.py <post.md>`.
10. Run repository build or content validation.
11. Recheck only high-risk claims against direct sources.

Do not add `本周观察`, `本周总结`, `趋势观察`, `本周未记录`, omitted-product lists, or research-process notes.

## Data Sources

Collect information strictly from the following sources. Do not search outside this list.

Each product in the table below has one or two source URLs. Follow these rules when checking each source:

1. **优先级**：若 `CHANGELOG.md / Releases` 列有链接，则将其作为首要信息来源；若该列为空（`—` 或空白），则使用 `Official Blog / News` 列的链接。
2. **日期过滤**：仅读取发布时间（或版本日期）落在本周报告窗口内的条目，忽略窗口外的所有条目。
3. **无更新则跳过**：若某个产品在本周窗口内没有任何条目，直接跳过该产品，不在博文中提及。
4. **RSS/XML 源**：部分链接为 RSS 或 XML 格式的 feed（如 `feed.xml`、`releases.xml`、`rss.xml`）。解析 feed 后仅提取 `<item>` 或 `<entry>` 元素中发布日期落在报告窗口内的条目。
5. **raw CHANGELOG.md**：部分链接为 GitHub raw 文件（`raw.githubusercontent.com/...`），直接读取 Markdown 内容，按发布日期或版本号定位本周窗口内的条目。
6. **跳过规则**：以下类型的更新即使日期在窗口内也直接跳过，不收录：
   - Patch 版本（仅修订号 `z` 变动）
   - 常规 Bug 修复
   - 文档更新
   - 依赖升级
   - 小型功能补充
   - 无实质进展的讨论（如 RFC 早期讨论、issue 讨论）
   - 对实际开发影响极小的更新

**报告类型与搜索范围**：博文标题统一为「前端与AI技术周报」，搜索全部数据源（前端 + AI + Web Platform），不再区分报告类型。

**单页 changelog**：`cursor.com/en-US/changelog`、`developers.openai.com/codex/changelog`、`releases.electronjs.org/` 等页面为无分页单页 changelog，直接抓取可能只显示最新若干条目，需使用站点搜索或归档页面定位报告窗口内的内容。

| Product | Official Blog / News | CHANGELOG.md / Releases |
|---|---|---|
| React | - | https://raw.githubusercontent.com/react/react/refs/heads/main/CHANGELOG.md |
| TypeScript | - | https://devblogs.microsoft.com/typescript/feed/ |
| Shadcn/UI | - | https://ui.shadcn.com/rss.xml |
| Tailwind CSS | https://tailwindcss.com/blog | https://raw.githubusercontent.com/tailwindlabs/tailwindcss/refs/heads/main/CHANGELOG.md |
| Ant Design | - | https://raw.githubusercontent.com/ant-design/ant-design/refs/heads/main/CHANGELOG.md |
| Vite | https://vite.dev/blog | https://raw.githubusercontent.com/vitejs/vite/refs/heads/main/packages/vite/CHANGELOG.md |
| webpack | - | https://raw.githubusercontent.com/webpack/webpack/refs/heads/main/CHANGELOG.md |
| Rspack | — | https://rspack.rs/blog/index.md |
| Rolldown | https://voidzero.dev/blog | https://raw.githubusercontent.com/rolldown/rolldown/refs/heads/main/CHANGELOG.md |
| Oxlint | - | https://raw.githubusercontent.com/oxc-project/oxc/refs/heads/main/crates/oxc_linter/CHANGELOG.md |
| Oxfmt | - | https://raw.githubusercontent.com/oxc-project/oxc/refs/heads/main/crates/oxc_formatter/CHANGELOG.md |
| pnpm | https://pnpm.io/blog | - |
| npm | - | https://raw.githubusercontent.com/npm/cli/refs/heads/latest/CHANGELOG.md |
| Turborepo | https://turborepo.dev/blog | - |
| SWC | - | https://raw.githubusercontent.com/swc-project/swc/refs/heads/main/CHANGELOG.md |
| Babel | https://babeljs.io/blog/ | https://raw.githubusercontent.com/babel/babel/refs/heads/main/CHANGELOG.md |
| ESLint | https://eslint.org/blog/ | https://raw.githubusercontent.com/eslint/eslint/refs/heads/main/CHANGELOG.md |
| Prettier | https://prettier.io/blog | https://raw.githubusercontent.com/prettier/prettier/refs/heads/main/CHANGELOG.md |
| Node.js | - | https://nodejs.org/en/feed/releases.xml |
| Bun | https://bun.com/blog | - |
| Electron | https://releases.electronjs.org/ | - |
| Codex | - | https://developers.openai.com/codex/changelog |
| ChatGPT | - | https://openai.com/products/release-notes/rss.xml |
| Cursor | - | https://cursor.com/en-US/changelog |
| Web Platform | - | https://developer.chrome.com/blog/feed.xml<br />https://web.dev/blog/feed.xml |

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

- Sources must come from the fixed Data Sources list. Prefer dated release pages, migration guides, security advisories, official docs, and official changelog entries.
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
