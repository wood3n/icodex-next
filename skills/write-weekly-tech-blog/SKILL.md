---
name: write-weekly-tech-blog
description: Draft, review, or revise Chinese weekly technology blog posts from a fixed set of official sources (React, TypeScript, Shadcn/UI, Tailwind CSS, Ant Design, Vite, webpack, Rspack, Rolldown, Oxlint, Oxfmt, pnpm, npm, Turborepo, SWC, Babel, ESLint, Prettier, Node.js, Bun, Electron, Codex, ChatGPT, Cursor, Voidzero, Tanstack, Web Platform). Use for frontend and AI weekly reports, release-note roundups, changelog summaries, and Codex automations that must turn official updates into selective, evidence-linked, actionable technical writing.
---

# Write Weekly Tech Blog

Produce a comprehensive engineering briefing. Include all official announcements, releases, events, and updates — including bug fixes and minor changes. Do not filter out routine patches or small feature additions.

## Workflow

1. Read only repository conventions, automation prompt, and at most one recent post.
2. Define exact reporting window with absolute dates.
3. Search from the fixed Data Sources list below. Open ALL results inside the reporting window — include every release, announcement, bug fix, and minor change.
4. For index pages that only list summaries with links to detail pages (e.g. blog listing with "Read more →", release index with per-version links, changelog with linked entries), follow those secondary links to scrape the full content. Continue following links deeper until the actual update details are obtained — do not stop at surface-level summaries.
5. Rank items by security, breaking change, retirement, stable capability, then preview capability. Place bug fixes and minor changes after feature-level items but still include them.
6. Draft technology subsections covering all items found in the window. Use this sequence:
   - `### Technology`
   - `> 参考来源：[direct primary source](URL)`
   - one sentence stating exact version/date/status and material change
   - one short paragraph stating affected users, risk, or required action
7. 在正文末尾添加 `## 本周推荐阅读` 章节，从以下重点技术栈中精选最多 5 个高质量内容：
   - **重点技术栈**：ChatGPT、Codex、Voidzero、React、TypeScript、pnpm、Web Platform、Turborepo、Tanstack、Rolldown
   - **筛选标准**：主版本发布说明、重大 RFC、深度技术文章、对开发者工作流有显著影响的更新。非大版本更新的常规发布说明不纳入推荐阅读
   - 每条格式：链接标题与一句话推荐理由
   - 若本周无值得推荐的内容，省略该章节
8. 不要在 `##` 分类标题下添加 `本分类参考来源：` 汇总行。每条技术栈的参考来源仅出现在各自的 `> 参考来源：` 链接中。
9. Run `scripts/lint_weekly_blog.py <post.md>`.
10. Run repository build or content validation.
11. Recheck only high-risk claims against direct sources.

Do not add `本周观察`, `本周总结`, `趋势观察`, `本周未记录`, omitted-product lists, or research-process notes.

## Data Sources

Collect information strictly from the following sources. Do not search outside this list.

Each product in the table below has one or two source URLs. Follow these rules when checking each source:

0. **抓取工具**：抓取网页内容时优先使用 `firecrawl_scrape`（Firecrawl MCP）。若 Firecrawl 报错、超时或返回空内容，则使用 `WebFetch` 作为回退方案。
1. **优先级**：若 `CHANGELOG.md / Releases` 列有链接，则将其作为首要信息来源；若该列为空（`—` 或空白），则使用 `Official Blog / News` 列的链接。
2. **日期过滤**：仅读取发布时间（或版本日期）落在本周报告窗口内的条目，忽略窗口外的所有条目。
3. **无更新则跳过**：若某个产品在本周窗口内没有任何条目，直接跳过该产品，不在博文中提及。
4. **RSS/XML 源**：部分链接为 RSS 或 XML 格式的 feed（如 `feed.xml`、`releases.xml`、`rss.xml`）。解析 feed 后仅提取 `<item>` 或 `<entry>` 元素中发布日期落在报告窗口内的条目。
5. **raw CHANGELOG.md**：部分链接为 GitHub raw 文件（`raw.githubusercontent.com/...`），直接读取 Markdown 内容，按发布日期或版本号定位本周窗口内的条目。
6. **跳过规则**：以下类型的更新即使日期在窗口内也直接跳过，不收录：
   - 文档更新（除非是重大文档改版或迁移指南）
   - 依赖升级（除非包含安全修复或破坏性变更）
   - 无实质进展的讨论（如 RFC 早期讨论、issue 讨论）
   - 重复公告（已在前期周报中收录过的同一事件）

**重要变更**：Patch 版本、Bug 修复、小型功能补充均须收录。官方宣布的事件（如公测上线、新功能预览、合作伙伴关系）不论规模大小一律收录。

7. **深度链接追踪**：当数据源页面为列表/索引页（如博客列表仅显示摘要、Releases 页仅显示版本号和标题），而非完整的更新内容时，必须继续抓取每个条目的详情页（二级链接），获取完整的更新内容。若详情页内还有链接指向更具体的子页面（如 PR 链接、设计文档链接），也需跟进抓取，直到取得可供撰写的具体信息。此规则特别适用于：
   - `voidzero.dev/blog` — 文章列表仅显示标题和摘要，需打开 `/posts/...` 详情页
   - `turborepo.dev/blog` — 博客列表显示摘要，需打开 `/blog/...` 详情页
   - `tanstack.com/blog` — 文章列表，需打开详情页
   - `bun.com/blog` — 版本发布文章列表，需打开详情页
   - `pnpm.io/blog` — 博客列表，需打开详情页
   - `vite.dev/blog` — 博客列表，需打开详情页
   - `react.dev/blog` — 博客列表，需打开详情页
   - GitHub Releases 页面 — 仅显示标题，需打开每个 release 的详情页

**报告类型与搜索范围**：博文标题统一为「前端与AI技术周报」，搜索全部数据源（前端 + AI + Web Platform），不再区分报告类型。

**单页 changelog**：`cursor.com/en-US/changelog`、`developers.openai.com/codex/changelog`、`releases.electronjs.org/` 等页面为无分页单页 changelog，直接抓取可能只显示最新若干条目，需使用站点搜索或归档页面定位报告窗口内的内容。

| Product      | Official Blog / News                                         | CHANGELOG.md / Releases                                      |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| React        | https://react.dev/blog                                       | https://raw.githubusercontent.com/react/react/refs/heads/main/CHANGELOG.md |
| TypeScript   | https://devblogs.microsoft.com/typescript/                   | -                                                            |
| Shadcn/UI    | -                                                            | https://ui.shadcn.com/docs/changelog                         |
| Tailwind CSS | https://tailwindcss.com/blog                                 | https://raw.githubusercontent.com/tailwindlabs/tailwindcss/refs/heads/main/CHANGELOG.md |
| Ant Design   | -                                                            | https://raw.githubusercontent.com/ant-design/ant-design/refs/heads/main/CHANGELOG.md |
| Vite         | https://vite.dev/blog                                        | https://raw.githubusercontent.com/vitejs/vite/refs/heads/main/packages/vite/CHANGELOG.md |
| webpack      | -                                                            | https://raw.githubusercontent.com/webpack/webpack/refs/heads/main/CHANGELOG.md |
| Rspack       | —                                                            | https://rspack.rs/blog/index.md                              |
| Rolldown     | https://voidzero.dev/blog                                    | https://raw.githubusercontent.com/rolldown/rolldown/refs/heads/main/CHANGELOG.md |
| Oxlint       | -                                                            | https://raw.githubusercontent.com/oxc-project/oxc/refs/heads/main/crates/oxc_linter/CHANGELOG.md |
| Oxfmt        | -                                                            | https://raw.githubusercontent.com/oxc-project/oxc/refs/heads/main/crates/oxc_formatter/CHANGELOG.md |
| pnpm         | https://pnpm.io/blog                                         | -                                                            |
| npm          | -                                                            | https://raw.githubusercontent.com/npm/cli/refs/heads/latest/CHANGELOG.md |
| Turborepo    | https://turborepo.dev/blog                                   | -                                                            |
| SWC          | -                                                            | https://raw.githubusercontent.com/swc-project/swc/refs/heads/main/CHANGELOG.md |
| Babel        | https://babeljs.io/blog/                                     | https://raw.githubusercontent.com/babel/babel/refs/heads/main/CHANGELOG.md |
| ESLint       | https://eslint.org/blog/                                     | https://raw.githubusercontent.com/eslint/eslint/refs/heads/main/CHANGELOG.md |
| Prettier     | https://prettier.io/blog                                     | https://raw.githubusercontent.com/prettier/prettier/refs/heads/main/CHANGELOG.md |
| Node.js      | https://nodejs.org/en/blog/all                               | -                                                            |
| Bun          | https://bun.com/blog                                         | -                                                            |
| Electron     | https://releases.electronjs.org/                             | -                                                            |
| Codex        | -                                                            | https://developers.openai.com/codex/changelog                |
| ChatGPT      | https://openai.com/research/index/                           | -                                                            |
| Cursor       | -                                                            | https://cursor.com/en-US/changelog                           |
| Voidzero     | https://voidzero.dev/blog                                    | -                                                            |
| Tanstack     | https://tanstack.com/blog                                    | -                                                            |
| Web Platform | https://web.dev/blog?hl=zh-cn<br />https://developer.chrome.com/blog | -                                                            |

## Token Budget

- Reuse one official index page to locate dated entries; do not repeatedly reopen it.
- Search multiple products in one batch.
- Use page find or targeted excerpts instead of reading full pages.
- For index pages, open the primary source, then follow deep links to detail pages only for entries inside the reporting window.
- Do not collect evidence for items outside the reporting window.
- Do not copy long release-note lists into context. Extract only date, version, status, changed behavior, constraint, and URL.
- Draft directly from compact notes. Do not create scoring tables, evidence ledgers, or intermediate prose summaries.

## Evidence Rules

- Sources must come from the fixed Data Sources list. Prefer dated release pages, migration guides, security advisories, official docs, and official changelog entries.
- Link direct item pages when available; avoid relying only on generic changelog index pages.
- Keep source links local to each technology subsection. Do not use one category-level source list as substitute for claim provenance.
- Separate fact from inference. Omit broad inference unless it changes an engineering decision.
- State stable, beta, preview, canary, deprecated, and retired status precisely.
- Verify dates belong to reporting window. Publication date and effective date may differ; state both when relevant.
- For availability claims, record plan, region, platform, rollout status, and account restrictions.
- Missing or weak evidence means flag item as unverified; still include it with a note if it falls inside the reporting window.

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
