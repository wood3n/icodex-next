---
title: 常用 Skills
author: icodex
slug: /ai/skills
description: 常用 Skills 目录与使用方式整理
tags:
  - ai
  - skills
---

## 官方 Skills 仓库

### OpenAI Skills

也是 Codex 的 skills 仓库

https://github.com/openai/skills/tree/main/skills

### Anthropic Skills

https://github.com/anthropics/skills/tree/main/skills

### Vercel Skills

https://github.com/vercel-labs/agent-skills/tree/main/skills

### Figma Skills

https://github.com/figma/mcp-server-guide/tree/main/skills

## Skills 聚合网站

### Officialskills.sh

收录各软件厂商发布的官方 Skills，包括 OpenAI、Vercel、Anthropic、Google、Cloudflare、Stripe 等。

网站：

https://officialskills.sh/?utm_source=chatgpt.com#find-skills

### AwesomeSkills.dev

Skills 搜索网站。

特点：

- 在线搜索
- 分类浏览
- 最新 Skills
- 热门 Skills
- 官方 Skills
- 社区 Skills

网站：

https://www.awesomeskills.dev/zh-CN#skills

## Skills 管理工具

### vercel skills cli

Vercel Skills CLI 是 Vercel 推出的开源 Agent Skills 包管理工具，它支持从 GitHub、GitLab、本地目录等来源安装和管理 Skills，可搜索、安装、更新、检查更新，并支持在 Codex、Claude Code、Cursor、GitHub Copilot 等数十种 AI Coding Agent 之间共享和同步 Skills。同时提供 skills.sh 作为官方 Skills 目录，方便发现和分发社区 Skills。

GitHub：

https://github.com/vercel-labs/skills

网站

https://www.skills.sh/

### gh skill cli

gh skill 是 GitHub CLI 内置的 Skills 管理命令，将 Agent Skills 纳入 GitHub 原生生态。它支持搜索、预览、安装、发布和更新 GitHub 上的 Skills，并利用 Git 标签、Release 和版本锁定（Version Pinning）等机制保障供应链安全和版本可追溯性。由于同样遵循 Agent Skills 标准，与 Vercel Skills CLI 保持兼容，可无缝管理现有的 Skills 仓库。

GitHub：

https://cli.github.com/manual/gh_skill

## AI工作流

### find-skills

Vercel 官方维护的 Skill 发现工具，帮助 AI 根据用户需求自动搜索、推荐并安装合适的 Agent Skills，而不是重复实现已有能力。适合作为整个 Skills 生态的入口。

**主要能力**

- 根据任务或需求自动搜索相关 Skills，快速发现已有解决方案。
- 推荐适合的 Skills，并优先选择官方或高质量、广泛使用的实现。
- 使用 `npx skills find` 按关键字搜索 Skills，支持交互式查找。
- 使用 `npx skills add` 安装来自 GitHub 或其他来源的 Skills。
- 支持检查和更新已安装 Skills（`check`、`update`），保持 Skills 为最新版本。
- 帮助扩展 AI Agent 的能力，覆盖设计、测试、部署、文档、开发工具等多个领域。

**适用场景：** 查找 Agent Skills、扩展 AI Agent 能力、安装和管理 Skills、发现适合特定任务的工作流或工具。

```shell
npx skills add https://github.com/vercel-labs/skills --skill find-skills
```

GitHub

https://github.com/vercel-labs/skills/blob/main/skills/find-skills/SKILL.md

### skill-creator

Anthropic 官方维护的 Skill 创建工具，用于帮助 AI 设计、生成、测试和持续优化自定义 Skills。它通过对话引导整个 Skill 开发流程，而不是手动从零编写 `SKILL.md`。

**主要能力**

- 通过对话收集需求，自动生成完整的 Skill 目录结构、`SKILL.md` 及相关资源。
- 指导设计 Skill 的触发条件（Description）、工作流程和最佳实践，提高自动调用准确率。
- 支持对已有 Skills 进行分析、重构和优化，改进内容组织和可维护性。
- 提供评估（Evaluation）与迭代优化流程，根据测试结果持续改进 Skill 效果。
- 帮助编写模板、脚本、参考资料等辅助文件，构建完整的可复用 Skill。
- 提供 Skill 设计规范，包括目录结构、文档编写、资源组织及质量检查建议。

```shell
npx skills add https://github.com/anthropics/skills --skill skill-creator
```

GitHub

https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md

### grill-me

通过连续提问和深入追问，帮助澄清需求、完善设计，避免在开发过程中返工。

**主要能力**

- 围绕需求、设计和实现方案持续提问
- 一次只提出一个关键问题，逐步深入
- 为每个问题提供推荐答案或建议
- 尽可能从项目代码或文档中获取信息，减少无效提问
- 覆盖边界条件、异常场景和潜在风险
- 在开始编码前形成完整、明确的实现方案

**适用场景**

- 新功能开发前的需求澄清
- 技术方案设计评审
- PRD 或功能规格讨论
- AI 编码前的方案确认
- 重构、架构调整或复杂项目规划

```shell
npx skills add https://github.com/mattpocock/skills --skill grill-me
```

GitHub

https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md

### grill-with-doc

基于项目代码、领域文档和架构决策（ADR）进行需求质询，确保方案符合现有系统设计，并同步沉淀文档。

**主要能力**

- 基于 `CONTEXT.md` 和 ADR 对方案进行连续追问
- 检查需求是否符合现有领域模型和术语
- 发现并纠正模糊、不一致或冲突的概念
- 优先从代码库获取答案，减少无效提问
- 在需求逐步明确的过程中同步更新 `CONTEXT.md`、ADR 等文档
- 保证新功能与项目架构、领域语言保持一致

**适用场景**

- 在已有项目中设计新功能
- DDD（领域驱动设计）项目开发
- 大型团队协作开发
- 架构演进与重构
- 编写 PRD、Issue 前的方案确认

```shell
npx skills add https://github.com/mattpocock/skills --skill grill-with-docs
```

GitHub

https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md

### caveman

超精简回答模式，通过“穴居人风格”压缩输出内容，在保持技术准确性的同时减少约 75% 的输出 Token。

**主要能力**

- 自动压缩回复，减少冗余表达
- 保留代码、命令、错误信息等技术细节
- 支持 `lite`、`full`、`ultra` 等多种压缩等级
- 支持文言文（`wenyan`）压缩模式
- 用户请求简洁回答时可自动触发
- 持续保持精简风格，直到手动关闭

**适用场景**

- 节省 LLM 输出 Token 成本
- 提高 AI 编程助手响应速度
- 日常开发问答和代码解释
- CLI / Codex / Claude Code 等终端交互
- 长时间 AI 编程对话，减少上下文消耗
- 只关注技术内容，不需要客套和冗余说明

## 前端开发

### vercel-react-best-practices

Vercel 官方维护的 React / Next.js 最佳实践 Skill，用于指导 AI 在编写、重构和审查 React 代码时自动遵循现代开发规范。

**主要能力**

- 自动优化 React 组件性能，减少不必要的渲染和状态管理。
- 提供约 70 条 React / Next.js 最佳实践，覆盖性能、数据获取、Bundle 优化等方面。
- 避免常见反模式（如滥用 `useEffect`、请求瀑布流、不合理的 Client Component 等）。
- 优化数据获取策略，推荐并行请求、缓存、Suspense 等现代方案。
- 减少客户端 JavaScript 体积，优先采用动态加载、Tree Shaking 和 Server Component（Next.js）。
- 支持 React 代码 Review 和重构，自动发现性能问题并给出优化建议。

```shell
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```

GitHub

https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md

### pnpm

提供 pnpm 包管理器的完整使用指南，帮助 AI 正确管理依赖、Workspace、Monorepo 和发布流程，避免生成不符合 pnpm 最佳实践的命令和配置。

**主要能力**

- 使用 pnpm 管理项目依赖，包括安装、更新、删除和锁定版本。
- 支持 Workspace / Monorepo 配置与管理，正确处理多包项目。
- 指导使用 `pnpm-workspace.yaml`、过滤（`--filter`）、递归命令等高级功能。
- 优化依赖管理策略，包括 Hoisting、Store、Link、Catalog 等 pnpm 特性。
- 提供脚本执行、缓存管理、安装配置及性能优化建议。
- 支持包发布流程，包括版本管理、发布、CI 集成及常见问题处理。

```shell
npx skills add https://github.com/antfu/skills --skill pnpm
```

GitHub

https://github.com/antfu/skills/blob/main/skills/pnpm/SKILL.md

### vite

提供 Vite 官方开发、配置和构建最佳实践，帮助 AI 正确使用现代 Vite（基于 ESM、Rolldown、Oxc）的开发模式，并生成符合最佳实践的项目配置。

**主要能力**

- 使用 `vite.config.ts` 配置项目，推荐 TypeScript 和 ESM 开发模式。
- 配置开发服务器、生产构建、环境变量及多环境配置。
- 指导使用 Vite 核心特性，如 `import.meta.glob`、`import.meta.env`、资源查询（`?raw`、`?url`）和 HMR。
- 支持 Vite Plugin 开发，包括插件生命周期、虚拟模块和插件执行顺序。
- 支持 Library Mode、SSR、中间件模式及 JavaScript API 等高级构建能力。
- 提供 Vite 8（Rolldown + Oxc）迁移指南，帮助升级旧版本项目。

```shell
npx skills add https://github.com/antfu/skills --skill vite
```

GitHub

https://github.com/antfu/skills/blob/main/skills/vite/SKILL.md

### vitepress

提供 VitePress 静态站点生成器（SSG）的完整开发指南，帮助 AI 正确构建、配置、定制和部署文档站点、博客及官网，并遵循 VitePress 最佳实践。

**主要能力**

- 配置 VitePress 项目，包括站点信息、导航、侧边栏、搜索等主题配置。
- 编写 Markdown 文档，支持 Frontmatter、代码块、容器、自定义组件等高级语法。
- 在 Markdown 中集成 Vue 组件，实现交互式文档。
- 自定义主题，包括样式、布局、全局组件和主题扩展。
- 支持国际化（i18n）、SSR 兼容、构建时数据加载等高级功能。
- 提供 GitHub Pages、Vercel、Cloudflare Pages、Netlify 等平台的部署方案。

```shell
npx skills add https://github.com/antfu/skills --skill vitepress

```

GitHub

https://github.com/antfu/skills/blob/main/skills/vitepress/SKILL.md

### vitest

提供 Vitest 测试框架的完整开发指南，帮助 AI 编写、调试和维护单元测试、集成测试及组件测试，并遵循现代 Vite 测试最佳实践。

**主要能力**

- 配置 Vitest，包括 `vitest.config.ts`、Workspace、多项目及 CLI 参数。
- 编写单元测试、集成测试和 Snapshot 测试，使用 Jest 兼容的 API。
- 使用 Mock、Spy、Fake Timer、Fixture 等能力模拟依赖和测试复杂场景。
- 支持 Vue、React、Svelte 等框架的组件测试，并与 Testing Library 集成。
- 配置代码覆盖率（V8 / Istanbul）、并行执行、Watch 模式及测试过滤。
- 提供 TypeScript、ESM、JSX 环境下的测试最佳实践，以及调试和性能优化建议。

```shell
npx skills add https://github.com/antfu/skills --skill vitest
```

GitHub

https://github.com/antfu/skills/blob/main/skills/vitest/SKILL.md

### tsdown

提供 tsdown（基于 Rolldown 的 TypeScript 库构建工具）完整开发指南，帮助 AI 正确配置、构建和发布 TypeScript 库，并遵循现代库开发最佳实践。

**主要能力**

- 配置 `tsdown.config.ts`，管理入口、输出格式、目标平台及构建选项。
- 构建 TypeScript 库，支持 ESM、CJS、类型声明（`.d.ts`）及多入口输出。
- 配置代码压缩、Source Map、External、Shims、Banner 等构建能力。
- 支持 Tree Shaking、Package Exports、Monorepo 及现代 Node.js 包发布规范。
- 集成监听（Watch）、CI/CD、发布流程及构建性能优化。
- 提供 Rolldown 生态下的库构建最佳实践及常见问题排查。

```shell
npx skills add https://github.com/rolldown/tsdown --skill tsdown
```

GitHub

https://www.skills.sh/rolldown/tsdown/tsdown

### turborepo

提供 Turborepo Monorepo 的完整开发指南，帮助 AI 正确管理多包项目、任务流水线、缓存和构建流程，并遵循 Turborepo 最佳实践。

**主要能力**

- 配置 Turborepo，包括 `turbo.json`、Workspace 及任务依赖关系（Pipeline）。
- 管理 Monorepo 中的应用与共享包，支持 React、Next.js、Node.js 等多项目协作。
- 配置本地缓存与远程缓存（Remote Cache），提升 CI/CD 和团队构建效率。
- 使用 `dependsOn`、`outputs`、过滤器（`--filter`）等功能优化构建、测试和发布流程。
- 集成 pnpm、npm、Yarn、Bun 等包管理器，并支持版本管理和增量构建。
- 提供 Monorepo 架构设计、性能优化及常见问题排查建议。

```shell
npx skills add https://github.com/vercel/turborepo --skill turborepo
```

GitHub

https://github.com/vercel/turborepo/blob/main/skills/turborepo/SKILL.md

### shadcn

shadcn/ui 官方维护的 Skill，帮助 AI 理解当前项目的 `components.json` 配置，并正确查找、安装、组合、调试和自定义 shadcn/ui 组件，确保生成的代码符合项目实际配置和最佳实践。

**主要能力**

- 自动识别项目配置（框架、别名、图标库、主题、已安装组件等），生成与项目一致的代码。
- 使用 shadcn CLI 正确添加、更新、删除和管理组件，避免错误命令或 API 用法。
- 根据需求自动组合多个组件，快速搭建登录页、Dashboard、设置页、数据表等常见界面。
- 支持组件样式定制，包括主题、CSS Variables、设计 Token 及组件扩展。
- 支持 Registry、Preset 和第三方组件库，能够搜索、安装并切换不同组件来源。
- 提供组件调试、迁移、升级及最佳实践建议，确保生成的代码符合最新 shadcn/ui API。

```shell
npx skills add https://github.com/shadcn/ui --skill shadcn
```

GitHub

https://github.com/shadcn-ui/ui/blob/main/skills/shadcn/SKILL.md

### antd

提供 antd cli 来帮助模型更好地使用 antd 组件开发。

```shell
npx skills add ant-design/ant-design-cli
```

GitHub

https://github.com/ant-design/ant-design-cli

### better-icons

为 AI 提供语义化图标搜索能力，自动选择并使用正确的图标库，而不是依赖模型猜测图标名称。

**主要能力**

- 根据自然语言搜索图标（如 `download`、`music`、`warning`）
- 支持 **150+** 图标库（Lucide、Heroicons、Tabler、Material Symbols 等）
- 自动返回最匹配的图标候选，避免使用不存在的图标
- 可获取图标组件代码或 SVG，直接用于项目
- 优先通过 MCP / CLI 检索图标，而非占用 Prompt 上下文
- 适用于 Claude Code、Codex、Cursor 等 AI Coding 工具

**适用场景**

- shadcn/ui + `lucide-react` 项目开发
- AI 自动生成 React / Vue 组件
- 为按钮、菜单、状态等选择合适的图标
- 避免 AI 编造图标名称导致编译失败
- 多图标库项目统一图标搜索与管理

```shell
npx skills add https://github.com/better-auth/better-icons --skill better-icons
```

GitHub

https://github.com/better-auth/better-icons/blob/main/skills/SKILL.md

## 测试

### webapp-testing

Anthropic 官方维护的 Web 应用测试 Skill，基于 Playwright 自动化浏览器，帮助 AI 对本地 Web 应用进行功能验证、UI 调试和端到端测试，并提供完整的测试工作流。

**主要能力**

- 使用 Playwright 编写和执行自动化测试，验证页面功能及用户交互流程。
- 自动管理本地开发服务器生命周期，支持前后端或多个服务同时启动与测试。
- 模拟真实用户操作，包括点击、输入、滚动、导航、表单提交等浏览器行为。
- 捕获浏览器截图、控制台日志及错误信息，辅助定位 UI 和前端问题。
- 支持功能验证、回归测试、端到端（E2E）测试及交互调试。
- 采用“先探索、后操作（Reconnaissance-then-Action）”的测试模式，提高自动化测试的稳定性和准确性。

**适用场景：** 本地 Web 应用测试、Playwright 自动化测试、前端功能验证、UI 调试、回归测试、CI/CD 自动化测试。

```shell
npx skills add https://github.com/anthropics/skills --skill webapp-testing
```

GitHub

https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md

## CR

### code-review

从**代码规范（Standards）**和**需求实现（Spec）**两个维度并行审查代码变更，确保代码质量和功能符合预期。

**主要能力**

- 对指定分支、Commit 或 Tag 与 `HEAD` 的差异进行 Review
- 并行检查代码规范（Standards）和需求实现（Spec）
- 根据仓库规范检查代码风格、架构和最佳实践
- 根据 Issue、PRD 或需求确认功能是否完整实现
- 汇总两个维度的 Review 结果，分别给出问题和建议
- 要求明确 Review 基准点（如 `main`、分支或 Commit）后再开始审查

**适用场景**

- Pull Request Review
- Feature 开发完成后的质量检查
- 合并代码前的最终验收
- 回归检查某个分支的所有改动
- AI 自动代码审查

```shell
npx skills add https://github.com/mattpocock/skills --skill code-review
```

GitHub

https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md

## 文档检索

### context7

```shell
npx ctx7 setup

# 选择 skills+cli
```

## 写作

### writing-guidelines

Vercel 官方维护的技术写作规范，帮助 AI 审查和优化文档，使其符合一致的文档风格、结构和可读性要求。主要用于 README、文档站、API 文档和技术博客的质量审查。

**主要能力**

- 审查文档结构，确保页面类型（教程、指南、参考等）清晰且目标明确。
- 优化写作风格，采用主动语态、简洁句式、直接面向读者的表达方式。
- 检查标题、段落、列表、步骤等组织结构，提高可读性和一致性。
- 识别冗余、模糊或营销化措辞，提供更准确、具体的表达建议。
- 统一术语、时态、语气和格式，保证整套文档风格一致。
- 以 `file:line` 格式输出审查结果，便于在 PR 或 CI 中快速定位和修改问题。

**适用场景：** README、技术博客、开发者文档、API 文档、产品文档、文档站点及文档 Code Review。

```shell
npx skills add https://github.com/vercel-labs/agent-skills --skill writing-guidelines
```

GitHub

https://github.com/vercel-labs/agent-skills/blob/main/skills/writing-guidelines/SKILL.md

## 文档

### prd

帮助 AI 将模糊的产品想法转化为结构化、可执行的产品需求文档（PRD），覆盖需求分析、用户流程、技术方案和交付计划。

**主要能力**

- 梳理产品目标、用户需求和核心问题，明确产品价值。
- 分析功能范围、依赖关系、约束条件及潜在风险。
- 绘制完整的用户流程（User Flow），定义关键交互路径。
- 明确功能需求、非目标（Non-Goals）及验收标准（Acceptance Criteria）。
- 输出结构化 PRD，包括功能说明、技术考虑、里程碑及实施计划。
- 识别隐藏复杂度，帮助产品、设计和开发团队达成一致。

```shell
npx skills add https://github.com/github/awesome-copilot --skill prd
```

GitHub

https://github.com/github/awesome-copilot/raw/refs/heads/main/skills/prd/SKILL.md

### 文档翻译

宝玉提供的翻译 skill，让 AI 在翻译长文档时，更接近专业译者的工作方式，主要能力如下：

- 三种翻译模式：
  - Quick：直接翻译，速度最快。
  - Normal：先分析上下文，再翻译。
  - Refined：分析 → 翻译 → Review → 润色，适合最终发布版本。
- 长文自动分块：
  - 自动按 Markdown 结构拆分文章。
  - 多个 Agent 可以并行翻译，提高速度。
  - 最终再合并结果。
- 术语一致性（最大的亮点）：
  - 整篇文章共享 Glossary（术语表）。
  - 保证同一个词不会一会儿翻成 A，一会儿翻成 B。
  - 特别适合技术文档、API 文档、产品文档。
- 支持自定义偏好：
  - 通过 EXTEND.md 配置：
    - 目标语言
    - 翻译风格
    - 目标读者
    - 专有名词
    - 自定义术语
  - 每次翻译都会自动读取这些配置。
- 保留 Markdown 结构：
  - 标题、列表、表格、代码块、链接不会被破坏。
  - 输出仍然是可继续编辑的 Markdown。

主要用于下面这些需求：

- 翻译 GitHub README
- 翻译官方技术文档（React、Vue、Tailwind 等）
- 翻译博客文章
- 翻译电子书
- 翻译产品文档
- 翻译 PRD、设计文档

```shell
npx skills add https://github.com/jimliu/baoyu-skills --skill baoyu-translate
```

GitHub

https://github.com/JimLiu/baoyu-skills/blob/main/skills/baoyu-translate/SKILL.md

### pptx

**主要能力**

- 创建完整的 `.pptx` 演示文稿
- 编辑和更新已有 PowerPoint 文件
- 提取、解析和分析幻灯片内容
- 管理模板、母版、布局、备注等元素
- 自动优化排版、字体和视觉一致性
- 导出可直接使用的专业 `.pptx` 文件

```shell
npx skills add https://github.com/anthropics/skills --skill pptx
```

GitHub

https://github.com/anthropics/skills/blob/main/skills/pptx/SKILL.md

### docx

创建、编辑、解析和处理 Word（.docx）文档，生成可直接交付的专业文档。

**主要能力**

- 创建新的 `.docx` Word 文档
- 编辑和更新已有 Word 文档
- 提取、解析和分析文档内容
- 处理批注、修订（Track Changes）和评论
- 管理表格、图片、页眉页脚、目录等文档元素
- 导出格式规范的专业 `.docx` 文件

```shell
npx skills add https://github.com/anthropics/skills --skill docx
```

GitHub

https://github.com/anthropics/skills/blob/main/skills/docx/SKILL.md

### pdf

创建、编辑、解析和处理 PDF 文档，支持文本提取、页面操作、表单填写及格式转换。

**主要能力**

- 创建和生成 PDF 文档
- 提取、解析和分析 PDF 文本内容
- 合并、拆分、旋转、重排 PDF 页面
- 填写和处理 PDF 表单（AcroForm）
- 提取图片、元数据及其他资源
- PDF 与图片、Markdown、Word 等格式互相转换

```shell
npx skills add https://github.com/anthropics/skills --skill pdf
```

GitHub

https://github.com/anthropics/skills/blob/main/skills/pdf/SKILL.md

### xlsx

创建、编辑、分析和处理 Excel（.xlsx）电子表格，支持公式、图表、数据清洗及格式转换。

**主要能力**

- 创建和编辑 `.xlsx`、`.xlsm`、`.csv`、`.tsv` 文件
- 提取、分析和统计表格数据
- 编写和计算 Excel 公式
- 清洗、整理、格式化数据
- 创建图表、数据透视表和报表
- 在不同表格格式之间相互转换

```shell
npx skills add https://github.com/anthropics/skills --skill xlsx
```

GitHub

https://github.com/anthropics/skills/blob/main/skills/xlsx/SKILL.md

## 设计

### frontend-design

Anthropic 官方维护的前端设计 Skill，帮助 AI 构建具有独特视觉风格、生产级质量的 Web 界面，避免生成千篇一律的 AI 风格页面。它强调在编码前先确定设计理念，再实现高质量的前端代码。

**主要能力**

- 在编码前确定设计方向，包括目标用户、设计风格、视觉主题和差异化亮点。
- 生成生产级 HTML、CSS、JavaScript、React、Vue 等前端代码，兼顾美观与可用性。
- 强调独特的视觉设计，包括字体搭配、色彩体系、空间布局、背景纹理和层次感。
- 提供高质量动画与交互设计，推荐使用 CSS 动画、滚动动画和微交互提升体验。
- 避免常见 AI UI 模板化设计，如默认字体、紫色渐变、同质化布局和组件样式。
- 注重整体设计一致性，在排版、颜色、组件和动效之间建立统一的设计语言。

**适用场景：** Landing Page、后台管理系统、Dashboard、React/Vue 组件、产品官网、营销页面、HTML/CSS 原型及各类 Web UI 设计。

```shell
npx skills add https://github.com/anthropics/skills --skill frontend-design
```

GitHub

https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md
