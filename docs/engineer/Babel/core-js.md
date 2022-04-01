---
title: core-js
---

## 什么是 core-js

`core-js`是一个集成 JS `polyfill`的库，支持模块化导入和按需编译。`polyfill`就是一块 JS 代码，为浏览器提供它还没有支持的较新的 JS 语法，这些新语法包含`ECMA-262`标准新语法，或者`WHATWG `/ `W3C`制定的一些 web 上的新特性。

`core-js@2`大概在一年半以前就已经不在更新 JS 语法的`polyfill`模块，推荐使用`core-js@3`版本。

### JS 新语法提案

欧洲计算机制造商协会，简称 ECMA，该组织成立于 1961 年，旨在实现欧洲计算机系统的标准化。他们日常主要负责制定计算机领域的一些标准和技术报告，并且还会印刷出版这些报告。
ECMA 指定了很多标准，每个标准都有编号，例如 JS 标准就是`ECMA-262`，C# 语言规范是`ECMA-334`等等。同时 ECMA 内部也有很多会员组织，分工管理这些标准， JS 这边就是`TC39`来管理。`TC39`成员全部都是业界知名的顶级程序员，国内的 360 也在里面。

TC39 的提案是开放性的，直接在 GitHub 上就能提，随便提但人家可以不采纳。一般提案周期从每年的 2 月份到 7 月份结束。

| 提案阶段 | 解释                                                         | 仓库地址                                                     |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| stage 1  | 有提案草稿，并且有 TC39 的成员有兴趣花时间探索提案的实现方案 | [proposals/stage-1](https://github.com/tc39/proposals/blob/main/stage-1-proposals.md) |
| stage 2  | 委员会希望开发该特性，并最终将其包含在标准中                 | [proposals/stage-2](https://github.com/tc39/proposals/blob/HEAD/README.md#stage-2) |
| stage 3  | TC 39 已经完成解决方案，所有的语义，语法和API都已被完整地描述；浏览器厂商开始实现 | [proposals/stage-3](https://github.com/tc39/proposals/blob/HEAD/README.md#stage-3) |
| stage 4  | 浏览器基本已经实现了，同时提案内容会包含在最新的 [ECMA262 规范](https://tc39.es/ecma262/)文档中 | [proposals/finished](https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md#finished-proposals) |

### 语法特性区分

`core-js`根据支持的语法特性，将模块划分为以下几种：

- `features`：所有语法特性，包括 ECMA-262，WHATWG 或者 W3C 制定的语法标准，稳定的和不稳定的全都有，需要从`features`内部引用

```js
// 引入特定的 set polyfill
import "core-js/features/set";

import Set from "core-js-pure/actual/set";
```

- `actual`：`actual`和`features`其实是一样的，`features`内部只是简单地从`actual`内部又`export`了一遍 API；

```js
import "core-js/actual/set";

import Set from "core-js-pure/actual/set";
```

- `stable`：稳定的新语法特性，通常是 ECMA-262 进入`stage 4`阶段的提案语法，或者稳定的 WHATWG / W3C

 web 特性

```js
import "core-js/stable/set";

import Set from "core-js-pure/stable/set";
```

- `es`：仅包含  ECMA-262 提出的新语法

```js
import "core-js/es/set";

import Set from "core-js-pure/es/set";
```

- `proposals`：尚处于 TC39 早期提案的 JS 语法，例如

```js
import "core-js/proposals/iterator-helpers";
```

- `stage/[x]`：处于 TC39 提案`stage x`阶段的语法特性，例如使用`stage 2`的语法

```js
import "core-js/stage/2";
```

### 构建版本

此外，`core-js`有以下三个构建版本：

1. `core-js`全局导入版本，在使用的地方注入`polyfill`即可，但是会重写原生 API，例如往函数的`prototype`上注入`polyfill`方法；

```js
// 只需要引入即可
import "core-js/stable";

// 或者引入特定的某个 polyfill
import "core-js/features/set";

// 这里的 Set 被重写了
var set = new Set([1, 2, 3]);
```

2. `core-js-pure`：推荐使用，不会对原生方法造成污染，因此需要使用引入的 API，例如

```js
import Set from "core-js-pure/features/set";

var set = new Set([1, 2, 3]);
```

3. `core-js-bundle`：使用`webpack`构建压缩后的版本，接近`200KiB`，也只支持全局引入，对于 Web 项目来说很少使用。

## 和第三方工具集成

### babel

和`babel`集成主要是和 `@babel/preset-env`配合使用，这里有几个关键的配置项和`core-js`有关。

```js
// babel.config.js

{
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> %1, last 2 version, ie 10",
        useBuiltIns: "entry",
        corejs: "3.21"
      }
    ]
  ]
}
```

#### useBuiltIns

首先`targets`帮助`babel`确定要兼容的目标浏览器的版本，然后当指定`useBuiltIns: usage`或者`useBuiltIns: entry`的时候，`babel`可以优化`core-js`的导入方式。

当指定`useBuiltIns: entry`时，`babel`会被全局导入版本的`core-js`进行编译优化，移除不需要的`polyfill`模块，例如针对 chrome 71 版本，从入口引入的`core-js`会被编译成以下指定模块：

```js
import 'core-js/stable';

// 会被编译成只引入以下模块
import "core-js/modules/es.array.unscopables.flat";
import "core-js/modules/es.array.unscopables.flat-map";
import "core-js/modules/es.object.from-entries";
import "core-js/modules/web.immediate";
```

当指定`useBuiltIns: usage`时，`babel`会根据目标浏览器，在使用到不支持的语法特性的地方自动加入相关`core-js`的`polyfill`模块，例如 IE 11 不支持`Set`

```js
const set = new Set([1, 2, 3]);

// 编译后
import 'core-js/modules/es.array.iterator';
import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.set';

const set = new Set([1, 2, 3]);
```

#### corejs

`corejs`用于配置`core-js`的版本，让`babel`判断是否支持`polyfill`的版本，默认情况下**只有`stable`模块下的`polyfill`会被引用**，其他新的语法特性，例如尚处于提案阶段的`proposals`模块，有两种方式使用：

1. 手动引入

```js
// useBuiltIns: entry
import "core-js/proposals/string-replace-all"

// useBuiltIns: usage
import replaceAll from "core-js-pure/proposals/string-replace-all"
```

2. `corejs`配置项支持对象结构，指定额外的`proposals: true`

```js
// babel.config.js

{
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> %1, last 2 version, ie 10",
        useBuiltIns: "entry",
        corejs: { 
          version: '3.21', 
          proposals: true 
        }
      }
    ]
  ]
}
```

3. 指定`@babel/preset-env`的 `shippedProposals: true`

```js
// babel.config.js

{
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> %1, last 2 version, ie 10",
        useBuiltIns: "entry",
        corejs: '3.21',
        shippedProposals: true
      }
    ]
  ]
}
```

