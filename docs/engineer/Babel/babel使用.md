---
title: babel使用
---

## babel 是什么

`babel`就是针对 JavaScript 语言的编译器，它主要负责将`ES6+`的源代码转换成版本向后兼容不同浏览器的 JS 代码。

### plugins

> [plugins](https://babeljs.io/docs/en/plugins)

`babel`目前的转换功能全部依赖于`plugins`，如果未使用`plugins`，那么`babel`默认不会对代码进行任何处理。例如`@babel/plugin-transform-arrow-functions`这个插件是将箭头函数转换成普通函数。

`plugins`的使用具有先后顺序之分，

- `plugins`在`presets`之前执行
- `plugins`按照数组配置顺序来执行
- 但是`presets`的执行顺序是相反的，按数组配置顺序从最后一个往前执行

- 最后，`plugins`支持自定义编写并发布到`npm`，然后配置使用

### presets

`presets`就是一系列`plugins`的集合，避免重复配置`plugins`带来的繁琐开发任务，同时也降低了 TC39 新提案更新以后增加语法特性时维护的难度。

`babel`团队提供以下四个`preset`：

- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [@babel/preset-flow](https://babeljs.io/docs/en/babel-preset-flow)
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)
- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)

`babel`还为那些尚未发布的 TC39（Technical Committee No.39，技术委员会）提案开发了`preset`。TC39（Technical Committee No.39）是推动 JS 现代化发展最重要的成员（没有之一），它是由各个主流浏览器厂商的代表构成的一个组织，负责提案并起草 ECMAScript 标准。JS 对应的在 ECMA（European Computer Manufacturers Association，欧洲计算机制造联合会）中的标准就是 ECMA-262。

TC39 会定期在 [GitHub](https://github.com/tc39/proposals) 更新不同状态提案的进度。

- [Stage 0](https://babeljs.io/docs/en/babel-preset-stage-0)：想法阶段，可能有部分`plugin`实现
- [Stage 1](https://babeljs.io/docs/en/babel-preset-stage-1)：表示 TC39 已经有部分成员开始推动该提案往下发展，
- [Stage 2](https://babeljs.io/docs/en/babel-preset-stage-2)：表示提案草稿已完成
- [Stage 3](https://babeljs.io/docs/en/babel-preset-stage-3)：表示提案草稿已敲定，坐等浏览器实现
- Stage 4：表示下一版本的 ES 规范将正式宣读这一提案，届时只需要`polyfill`支持不兼容的浏览器即可

### polyfill

在`babel 7.4`以前，`babel`提供`@babel/polyfill`模块用于为代码降级提供更多的兼容性补丁。其内部包含`core-js`以及运行时`generator`补丁，这样在一些老破旧的浏览器（IE）上就可以使用`Promise`，`generator function`等`ES6+`的语法。

但是如果直接使用`@babel/polyfill`有两个缺陷：

- 污染全局作用域，使用的`Array`，`Promise`，`String`等构造函数的原型会被`core-js`修改；
- 单独使用`@babel/polyfill`会将`core-js`全量导入，造成项目打包体积过大

不过`@babel/preset-env`提供了一个`useBuiltIns`属性，将其值设置为`usage`就只会按需打包，即对使用到的高版本语法才进行转换打包。

从`babel 7.4`以后，`polyfill`就被废弃了，使用的方式变成在代码需要用到`polyfill`的地方直接引入`core-js`和`regenerator-runtime/runtime`即可

```javascript
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

## babel 用法

单独使用`babel`编译程序需要安装以下 package

```
yarn add @babel/core @babel/cli @babel/preset-env @babel/polyfill
```

### 配置方式

`babel`支持多种配置方式，不同配置文件其作用范围也不同

- 项目全局级别的配置，以`babel.config.xx`开头，后缀可以是`.js`, `.cjs`, `.mjs`，`json`
- 文件级别的配置，`.babelrc.xxx`配置文件，后缀可以是`.js`, `.cjs`, `.mjs`，`json`，或者直接叫`.babelrc`；也可以直接在`package.json`下写入`babel`字段

这里比较通用且常用的还是`babel.config.js`

```javascript
module.exports = function(api) {
  return {};
};
```

这里的参数`api`还提供以下调用项可以在函数内部使用。

#### api.cache

`api.cache`是`babel`内置用来缓存加载配置项的函数的执行结果，这样可以避免每次在使用`babel`编译的时候都要重新调用`babel.config.js`来获取配置项，也就是可以提高编译速度。

**这个配置项必须在使用`babel`的时候指定，旨在提高`babel`性能，如果不指定可能会有报错提示。**

- `api.cache.forever()`或`api.cache(true)`：永久缓存加载配置项的结果
- `api.cache.never()`或`api.cache(false)`：不使用缓存
- `api.cache.using(() => process.env.NODE_ENV)`
- `api.cache.invalidate(() => process.env.NODE_ENV)`根据执行环境来设置是否重新加载配置项

#### api.env(...)

这个函数用来根据`process.env.NODE_ENV`判断当前执行环境

- `api.env()`：直接使用会返回`process.env.NODE_ENV`

- `api.env("production")`：当`process.env.NODE_ENV === "production"`的时候返回`true`

- `api.env(["development", "test"])`：当`["development", "test"]`包含`process.env.NODE_ENV`的时候返回`true`
- `api.env(envName => envName.startsWith("test-"))`：传入一个函数，其会接收`process.env.NODE_ENV`作为参数

在项目根目录新建`babel`的配置文件`babel.config.js`

```javascript
module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/env',
        {
          targets: {
            edge: '17',
            firefox: '60',
            chrome: '67',
            safari: '11.1',
          },
          useBuiltIns: 'usage',
          corejs: '3.6.4',
        },
      ],
    ],
  };
};
```

执行以下命令，开始运行`babel`，这将会把项目`src`目录下的代码编译输出到`lib`目录

```
./node_modules/.bin/babel src --out-dir lib
```

从`babel 7`开始，`babel`下的所有 package 都在`@babel`命名空间下，支持以模块化的方式去导入然后使用

## 配置项

### plugins | Array

一系列`plugins`的配置数组，`plugins`会按照数组索引顺序执行。同时也支持嵌套数组的插件配置形式：

```javascript
plugins: [
  'jsx',
  [
    'flow',
    {
      ...options,
    },
  ],
];
```

如果`plugin`的 package 的`name`属性前缀是`babel-plugin-`，那么在配置使用这个`plugin`的时候可以简写其名称，例如下面两种配置是一样的效果。

```javascript
"plugins": [
  "myPlugin",
  "babel-plugin-myPlugin"
]
```

### presets | Array

一系列`presets`的配置数组，`presets`会按照数组逆向顺序执行

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "loose": true,
        "modules": false
      }
    ]
  ]
}
```

### 模块

#### sourceType

`sourceType`用于指定`babel`解析 JS 模块的类型，其支持以下三种配置值：

- `"script"`：表示`babel`会根据远古 JS 文件模块的规则解析源代码的模块，例如不适用`“use strict”`模式。不允许在 JS 代码中出现 ES 模块的语法 —— `import`和`export`
- `“module”`：表示`babel`会根据最新的 ES Modules 的语法解析 JS 模块，自动使用`“use strict”`模式，允许使用`import`和`export`
- `“unambiguous”`：视情况而定，如果源代码文件中包含`import`和`export`则使用 ES Modules 的语法解析。使用`“unambiguous”`看起来最方便，但是如果在文件中不包含任何`import`和`export`，那么此时可能会出现解析错误的情况。

这个配置项不仅影响`babel`**解析（Parse）**源代码文件的过程，也同时影响`babel`对源代码进行**转换（Transform）**的过程，例如 [`@babel/plugin-transform-runtime`](https://babeljs.io/docs/en/babel-plugin-transform-runtime) 需要判断是否在转换源代码的时候对指定的模块导入语法进行转换，将其替换成`import`或者`require`。

[`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env)同样需要根据`sourceType`，并将其应用于`useBuiltIns`配置项。

### 环境配置项

#### env

**`{ [envKey: string]: Options }`**

这是一个键值对的配置项，其中键与`babel`的环境变量名对应，其属性值可以是一系列对应环境下的配置，配置项会和顶层的配置项合并。

环境变量名可以由`envName`指定，或者当使用`babel.config.js`配置文件时，通过`api.anv(x)`来指定。

```json
(module.exports = function(api) {
  api.env(process.env.NODE_ENV);

  return {
    "env": {
      "dev": {
        "presets": ["es2015"],
        "plugins": ["x"]
      },
      "test": {
        "presets": ["es2015"]
      }
    }
  };
})
```

#### targets

根据[`Browserslist`](https://github.com/browserslist/browserslist)指定经过`babel`编译以后需要兼容的浏览器环境。

注意：如果未指定该配置项，`babel`默认就会尽可能得兼容旧浏览器，例如`@babel/preset-env`将会转换所有 ES6+ 得代码到 ES5 的版本，这将导致编译过程非常慢，并且代码打包体积也非常大。

- `targets.esmodules`：指定`babel`编译生成支持 ES Modules 的代码
- `targets.node`：指定`babel`编译的代码支持的`nodejs`环境
- `targets.safari`：指定支持`safari`版本
- `targets.browsers`：指定`browserlist`的浏览器版本，其结果会被直接在`targets`中指定的覆盖掉

```json
{
  "targets": {
    "chrome": "58",
    "ie": "11"
  }
}
```

### 文件匹配模式

#### test | RegExp

指定一个正则表达式来匹配文件名或者文件夹，如果没有匹配上，则当前配置项会被忽略掉。

#### include | RegExp

这个配置项和`test`作用一样。

#### exclude | RegExp

指定要`babel`忽略的文件名或者文件夹正则表达式。

#### ignore | RegExp

指定要`babel`忽略的文件名或者文件夹正则表达式。 例如下面的`ignore`会忽略相对于`babel.config.js`相对的`./lib`文件夹。

```javascript
ignore: ['./lib'];
```

#### only | RegExp

这个配置项和`ignore`相对，表示指定`babel`只针对具体的文件名或者文件夹进行编译。

### 配置项覆盖

#### extends | string

`extends`也就是继承的意思，指定当前配置项继承自某一配置文件名，然后当前配置项会和额外的配置文件的配置项合并。

#### overrides | Array

`override`也就是重载的意思，表示提供一个数组的配置项用于覆盖当前配置，这种情况常用于覆盖`preset`的配置。

### SourceMap

source map 本质上就是一个以`.map`为后缀名的 JSON 文件，里面写入了一些源文件和压缩文件的映射关系属性，例如

```json
{
  "version": 3, //版本
  "file": "script.js.map", //source map文件名
  "sources": [
    //源文件名
    "app.js",
    "content.js",
    "widget.js"
  ],
  "sourceRoot": "/", //源文件路径
  "names": ["slideUp", "slideDown", "save"], //包含源文件中所有变量和函数名称的数组
  "mappings": "AAA0B,kBAAhBA,QAAOC,SACjBD,OAAOC,OAAO..." //
}
```

根据 source map 文件，在压缩后的代码文件底部通过一个注释字段`sourceMappingURL`写入 source map 文件的路径，告知浏览器我这个压缩文件有一个源代码文件映射可以用，这样就可以在直接在浏览器里打断点调试源文件，例如：

```javascript
//# sourceMappingURL=/path/to/script.js.map
```

#### sourceMaps

`boolean | "inline" | "both"`，默认是`false`

- `true`表示使用`babel`为编译代码生成 sourcemap 文件，并写入源代码和编译代码的映射关系
- `“inline”`：使用`babel`生成 sourcemap，但是会将其转换成 Base64 格式的 Data URL 然后追加到编译代码的下方，但是并不会写入源代码和编译代码的映射关系
- `"both"`：和`“inline”`类似，但是会写入源代码和编译代码的映射关系

#### sourceRoot

指定生成`.map`文件的根目录

#### sourceFileName

指定`.map`文件内使用的 sourcemap 文件的名称。