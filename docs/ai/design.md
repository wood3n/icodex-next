---
title: 常用 Design.md
author: icodex
slug: /ai/designskill
description: 常用 Design.md
tags:
  - ai
  - design
---

## 官方仓库

https://github.com/google-labs-code/design.md

## 规范标准

官方规定一个 DESIGN.md 由两部分组成：

1. YAML Front Matter
2. Markdown Body

### YAML Front Matter

```markdown
---
# YAML Front Matter
---
```

官方推荐把所有可计算的数据放进 YAML，例如颜色值，字体大小等：

```yaml
---
colors:
  primary:
    value: "#2563EB"

spacing:
  md:
    value: 16px

typography:
  body:
    fontSize:
      value: 16px
---
```

支持的 Token 类型包括：

- colors
- typography
- spacing
- sizing
- radius
- border
- opacity
- motion
- components
- 自定义 token

### Markdown Body

Markdown 内容部分用来描述设计意图（Design Rationale）和使用指导（Guidance）。例如：

```markdown
## Brand

The interface should feel calm and trustworthy.

## Buttons

Primary buttons should only appear once per screen.

## Accessibility

Always maintain WCAG AA contrast.
```

并且在 MD 主体内容部分支持使用`{}`来引用 YAML 内定义的 Token，例如`{colors.primary}`

## 合集仓库

### Awesome Design Md

https://github.com/VoltAgent/awesome-design-md

## 管理工具

### designmd.sh

类似于 skills.sh 的网站，搜索在 GitHub 开源的 Design.md 文件，并提供 CLI 安装命令。

https://designmd.sh/

### getdesign

[getdesign](https://getdesign.md/) 是 VoltAgent 维护的一个网站，收集了大量网站的 Design.md 文件，并提供通过`getdesign`命令安装的捷径。

## 产品官网

### Claude 暖色风格

```shell
npx getdesign@latest add claude
```

### Apple 官网风格

```shell
npx getdesign@latest add apple
```
