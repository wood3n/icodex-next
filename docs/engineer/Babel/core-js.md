---
title: core-js
---

## 什么是 core-js

`core-js`是一个集成 JS `polyfill`的库，支持模块化导入和按需编译。`polyfill`就是一块 JS 代码，为浏览器提供它还没有支持的较新的 JS 语法，这些新语法通常由 ECMA-262 规范制定，或者 WHATWG / W3C 组织制定。

`core-js@2`大概在一年半以前就已经不在更新 JS 语法的`polyfill`模块，推荐使用`core-js@3`版本。

### 语法特性区分

`core-js`对支持的语法特性分为三种：

- `features`：所有语法特性，包括 ECMA-262，WHATWG 或者 W3C 制定的；
- `actual`：`actual`和`features`其实是一样的，`features`内部只是简单地从`actual`内部又`export`了一遍 API；
- `stable`：稳定的新语法特性，通常是 ECMA-262 进入`stage 4`阶段的提案语法，或者稳定的 WHATWG / W3C

 web 特性。

- `es`：仅包含  ECMA-262 提出的新语法
- `proposals`：尚处于 TC39 早期提案的 JS 语法 
- `stage/[x]`：处于 TC39 提案`stage x`阶段的语法特性

关于 TC39 提案阶段，可以从这里了解 —— [The TC39 Process](https://tc39.es/process-document/)

| 提案阶段 | 解释 | ECMA 是否接受 |
| -------- | ---- | ------------- |
|          |      |               |
|          |      |               |
|          |      |               |
|          |      |               |
|          |      |               |

`core-js`有以下三个构建版本：

### core-js

全局导入版本，在使用的地方注入`polyfill`即可，但是会重写原生 API，例如往函数的`prototype`上注入`polyfill`方法；

```js
// 只需要引入即可
import "core-js/stable";

// 或者引入特定的
```

- `core-js-pure`：需要引入对应的 API，不会对原生方法造成污染；

```js
```



- `core-js-bundle`：使用`webpack`构建压缩后的版本，接近`200KiB`，对于 Web 项目来说很少使用。

此外`core-js`内部还针对不同的 JS 语法特性划分为

## 导入方式

### 全局导入

```js
```

