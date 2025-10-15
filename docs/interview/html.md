---
title: "什么是HTML5？有哪些新特性？"
keywords: ["什么是html5有哪些新特性", "什么是语义化html为什么它重要", "html", "起始标签", "doctype", "的作用", "文档的常见结构"]
tags: ["什么是html5有哪些新特性", "什么是语义化html为什么它重要", "html", "起始标签", "doctype"]
---

# 什么是HTML5？有哪些新特性？

HTML 全称 HyperText Markup Language，超文本标记语言，用来定义网页结构。每个网页都是由 HTML 元素组成，由一对尖括号包裹，开始的尖括号后面紧跟元素名（大小写不敏感），并且可以使用一些属性指定元素的其他特性。HTML 文件通常会以 `.htm` 或 `.html` 作为扩展名，同时内部允许定义 CSS 和 JS 语言组成的元素，用来定义网页样式和交互。

HTML 规范由国际标准组织——万维网联盟W3C(**W**orld **W**ide **W**eb **C**onsortium)来制定，HTML5 则是 W3C 在 2014 年发布的最新标准规范，沿用至今。

HTML5 的新特性包括以下部分：

1. 语义化元素：HTML5 引入了一些新的语义元素，如 `<header>`、`<footer>`、`<nav>`、`<article>`、`<section>` 等，有助于更清晰地定义网页内容的结构和目的。
2. 视频和音频支持：HTML5 提供了 `<video>` 和 `<audio>` 元素，使嵌入视频和音频变得更容易，不再需要使用第三方插件如 Flash。
3. Canvas 绘图：HTML5 中的 `<canvas>` 元素允许通过 JavaScript 绘制图形、动画和交互式图表，从而创建复杂的图形应用程序。
4. 本地存储：HTML5 引入了 Web Storage 和 IndexedDB，这些技术使得在浏览器中存储数据更加方便，而不依赖于服务器。
5. 新的表单元素和表单验证特性：HTML5 引入了一些新的表单元素，如 `<input type="date">`、`<input type=color>`、`<input type=email>` 等，同时 HTML5 提供了内置的表单验证功能，可以减少对客户端脚本的依赖，包括 `required`、`pattern`、`min`、`max` 等属性。
6. 改进的拖拽功能：HTML5 提供了更强大的拖放功能，使得在网页中实现拖放操作更容易。
7. 地理位置服务：HTML5 允许网页应用获取用户的地理位置信息，以提供基于位置的服务。
8. 增强的跨文档消息传递：HTML5 引入了跨文档消息传递 API，允许不同窗口或框架之间的通信。
9. WebSocket：HTML5 引入了 WebSocket API，允许双向通信，从而支持实时应用程序。
10. Web Workers：HTML5 允许通过 Web Workers 在后台线程中执行 JavaScript 代码，以提高性能和响应速度。

# 什么是语义化HTML？为什么它重要？

语义化 HTML 是指在编写 HTML 代码时，使用合适的 HTML 元素来明确表示文档中的内容结构和含义。常见的语义化 HTML 元素包括

`header`：用来展示网站介绍性内容，例如标题，Logo，搜索框等；

`nav`：用来展示导航链接，例如面包屑

`article`：展示网页主要内容模块

`section`：通常用于`article`内部的模块展示

`aside`：用来展示页面特定内容，通常与页面内容几乎无关的部分

`footer`：展示网页的页脚

使用语义化元素主要有以下几方面好处：

1. 增强 HTML 代码结构的可读性，便于开发者维护；
2. 便于优化搜索引擎的结果排名；
3. 有利于被屏幕阅读器等辅助技术解释和呈现给视觉障碍用户；

但是语义化元素的不足之处在于并没有特定的样式，需要开发者自定义。

# HTML 起始标签 !Doctype 的作用

W3C 标准指定编写 HTML [必须以一个DOCTYPE开始](https://www.w3.org/html/ig/zh/wiki/HTML5/syntax)，用来声明网页使用的 HTML 的版本。如果省略了DOCTYPE，浏览器会采用不符合某些标准的渲染模式。

HTML5 的声明为`<!DOCTYPE html>`。

HTML4 的声明为`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`

# HTML 文档的常见结构

HTML 文档通常由以下几部分组成：

1. `<!DOCTYPE html>`声明 HTML 的版本

2. `<html>`html标签开始声明 HTML 的主要内容
3. `<head>`head标签内部的元素用来指定网页标题、编码、引入的CSS样式和JS文件等，可以包含以下标签
   - `title`:网页标题
   - `base`:网页HTML内部链接的基准域名
   - `link`:指定网页CSS、字体、icon等外部资源的链接
   - `style`:网页CSS
   - `meta`:指定网页编码、网页缩放等元数据信息
   - `script`:指定网页使用的 JS、WebGL、JSON 等脚本
   - `noscript`:当`script`类型不支持时，显示的兼容性内容
   - `template`:指定在网页加载后可能被使用到的内容，这些内容并不会被浏览器渲染显示出来

4. `body`定义网页的主要内容区域，`body`内容会被浏览器解析渲染
