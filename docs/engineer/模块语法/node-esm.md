## Node-ESM发展

| 版本                          | 特性                                                         |
| :---------------------------- | :----------------------------------------------------------- |
| v18.6.0                       | Add support for chaining loaders.                            |
| v17.1.0, v16.14.0             | 支持[`import assert`语法](https://github.com/tc39/proposal-import-assertions) |
| v17.0.0, v16.12.0             | Consolidate loader hooks, removed `getFormat`, `getSource`, `transformSource`, and `getGlobalPreloadCode` hooks added `load` and `globalPreload` hooks allowed returning `format` from either `resolve` or `load` hooks. |
| v14.8.0                       | 支持 ESM 模块文件顶层`await`语法                             |
| v15.3.0, v14.17.0, `v12.22.0` | ESM 正式稳定支持                                             |
| v14.13.0, v12.20.0            | 支持检测 CommonJS 的命名导出格式                             |
| v14.0.0, v13.14.0, v12.20.0   | 移除 ESM 实验性警告提示                                      |
| v13.2.0, v12.17.0             | 在命令行执行`mjs`文件不再需要指定`--experimental-modules`参数 |
| v12.0.0                       | 支持通过在`package.json` 标识`"type": "module"`来全局指定`.js`文件为 ESM 文件 |
| v8.5.0                        | 仅支持`import`，`export`语法，和通过`.mjs`标识 ESM 文件；在命令行执行`mjs`文件需要额外指定`node --experimental-modules`参数 |

## CJS 和 ESM 的区别

### CJS 语法特点

1. 使用`require`语句加载模块，同步解析代码；
2. 支持加载文件夹，Node 会尝试查找文件夹内部的`package.json`指定的`main`文件，或者`index.js`文件；
3. 支持忽略模块后缀名，按照`.js`、`.json`、`.node`顺序匹配，如果没找到则尝试按照文件夹解析；
4. 支持加载`json`文件；
5. 不支持加载 ESM 模块文件，包括使用 ESM 语法的模块或者`.mjs`后缀的模块，会报[`ERR_REQUIRE_ESM`](https://nodejs.org/api/errors.html#err_require_esm)的错误。

### ESM 语法特点

1. 使用`import`或者`import()`语句加载模块，异步解析代码；
2. 不支持加载文件夹；
3. 不支持忽略模块名后缀，支持`.js`，`.mjs`，`.cjs`后缀；
4. 不支持加载`json`；
5. **支持使用`import`加载 CJS 模块，但是 ESM 模块内部不支持使用 CJS 语法**

## 如何判定模块

简单来说，Node 主要根据`package.json`内部的`type`判断模块标准，如果定义了`type:module`，则`.js`后缀的文件会被判定为 ESM，如果指定`type:commonjs`或没有定义`type`，则`.js`文件则会按照 CJS 模块语法解析。

### ESM 模块判定

1. `.mjs`后缀文件判定为 ESM 模块；
2. `.js`后缀的文件，如果最近的`package.json`内部定义的有`type:module`，则判定为 ESM 模块；
3. 通过`node --input-type=module`执行的命令行代码。

### CJS 模块判定

1. `.cjs`后缀判定为 CJS 模块
1. `.js`后缀的文件，如果最近的`package.json`内部定义的有`type:commonjs`或者没有定义`type`字段，则判定为 CJS 模块；
1. 通过`node --input-type=commonjs`执行的命令行代码。

## package 兼容

上面说了，ESM 模块无法通过 CJS 的`require`语句加载，而 CJS 模块可以通过 ESM 语法`import`加载，所以在基于`Node 12.22.0+`版本开发的时候，首选推荐使用 ESM 模块语法进行开发，最简单的方式是在项目目录的`package.json`下定义`type:module`，这样全局指定`.js`文件必须使用 ESM 模块语法。在这种情况下，如果使用 CJS 语法，只能在`.cjs`文件内部使用才行。

但是指定`type:module`的`package`无法在 CJS 模块内部使用，那么怎么解决这种问题呢？有以下两种解决方式：

### 1. 指定main和module

一些使用 Nodejs 开发的打包工具支持使用`package.json`内部的`module`来指定 ESM 模块入口，而原有的`main`字段指定 CJS 模块。例如[`esbuild`](https://esbuild.github.io/api/#main-fields)：

```json
{
	"main": "./lib/index.cjs",
  "module": "./lib/index.js"
}
```

但是`module`字段不会被 Nodejs 识别，这个方式可能带来潜在的危害——[Dual package hazard](https://nodejs.org/api/packages.html#dual-package-hazard)。

### 2. 使用条件导出 exports

我们知道，使用 Nodejs 开发非执行类的`package`时都需要指定`main`字段作为程序执行的入口模块（没有`main`，默认和`package.json`同目录层级的`index.js`文件），但是`main`只支持指定单个模块路径，针对上述所说的定义了`type:module`的`package`，显然无法通过`main`兼容到使用 CJS 语法开发的`package`.

于是，Node 从`12.7.0`版本后为`package.json`拓展了`exports`字段，其支持指定一个对象、字符串或者字符串数组作为值，来标识不同环境下的程序入口模块，这样我们就可以使用**条件导出**来为`package`兼容 CJS 语法。下面来看下`exports`的使用语法。

#### exports语法

`exports`内部支持指定以下关键字字段，会按顺序进行匹配：

1. `node-addons`：此条件可用于提供使用原生 C++ 插件的入口点；
1. `node`：普通 Node 模块路径；
1. `import`：ESM 模块入口路径；
1. `require`：CJS 模块入口路径;
1. `default`：备选入口模块路径，当按照上述顺序无法匹配时，选择`default`指定的模块作为入口

:::caution

`default`应该总是添加到`exports`对象字段的结尾，避免当仅定义`require`或者`import`时找不到指定模块而报`[ERR_PACKAGE_PATH_NOT_EXPORTED]`的错误。

:::

例如兼容 ESM 和 CJS 语法，需要在`exports`内部定义`import`和`require`来分别指定 ESM 和 CJS 模块入口文件路径：

```json
{
  "type": "module",
	"exports": {
    "import": "./lib/index.js",
    "require": "./lib/index.cjs"
  }
}
```

`exports`关键字之间支持嵌套，例如指定`node`环境不同的模块入口：

```json
{
  "exports": {
    "node": {
      "import": "./feature-node.mjs",
      "require": "./feature-node.cjs"
    },
    "default": "./feature.mjs"
  }
}
```

除了上面提供的关键字，`exports`还支持定义子模块路径，将子模块单独指定为 ESM 或者 CJS 模块，此时，`.`就相当于主入口程序，可以直接使用`pkg`的`name`加载，而子模块则需要带上子路径。这种情况主要用于一个`package`使用 CJS 语法开发并且不希望使用 ESM 重构，则需要定义子模块来兼容 ESM 使用。

例如下面的定义，使用`require('module')`加载 CJS 模块，而`require('module/wrapper')`则加载 ESM 模块。

```json
{
  "type": "module",
  "exports": {
    ".": "./index.cjs",
    "./module": "./wrapper.mjs"
  }
}
```

对于有多个子模块的`package`，例如`lodash`等，可以使用文件夹匹配模式来导出所有子模块路径，例如下面的定义可以使用`features`下的所有子模块，也包括`features`内子目录下的模块：

```js
// package.json 定义
{
  "exports": {
    "./features/*.js": "./src/features/*.js"
  },
}

// 加载
import featureX from 'es-module-package/features/x.js';
// Loads ./node_modules/es-module-package/src/features/x.js

import featureY from 'es-module-package/features/y/y.js';
// Loads ./node_modules/es-module-package/src/features/y/y.js
```

:::info

Node 从`12.20.0`版本正式支持所有`exports`定义的语法，所以推荐基于`12.20.0+`开发时在 `package.json`内部使用`exports`定义程序入口，如果同时定义了`main`字段，则`exports`优先级高于`main`。

:::



## 从 CJS 迁移到 ESM

参见 blog - [pureESM](https://icodex.me/pureesm/)
