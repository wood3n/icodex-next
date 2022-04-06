---
title: webpack5 配置项（一）
slug: /webpack5
---

## [target](https://webpack.docschina.org/configuration/target#target)

指定 webpack 构建环境，如果项目集成了`browserslist`，则默认值为`browserslist`，否则为`web`。

## [entry](https://webpack.docschina.org/configuration/entry-context/#entry)

`entry`的配置主要分为以下几种：

### string | string[]

如果`entry`指定为一个具体的文件路径字符串或者一个字符串数组，则 webpack 会从解析这个模块开始构建依赖树，生成单独的 chunk 并命名为`main`。对于 SPA 应用来说一般采取这种配置。

### object

如果是一个对象，则属性名为 chunk 的名称，属性值则为 chunk 打包入口，常用来构建多页应用。

#### dependOn

对象属性`dependOn`指定在多个 chunk 之间共享的相同的 chunk 名称，例如多个入口共享`react`，`react-dom`这些库，则可以通过以下配置将`react`，`react-dom`抽离到一个单独的 chunk 中，然后其他入口的模块通过`dependOn`共享这个 chunk，避免多个入口打包时需要构建相同的依赖模块。

```javascript
  entry: {
    home: './home.js',
    shared: ['react', 'react-dom', 'redux', 'react-redux'],
    catalog: {
      import: './catalog.js',
      filename: 'pages/catalog.js',
      dependOn: 'shared',
    },
    personal: {
      import: './personal.js',
      filename: 'pages/personal.js',
      dependOn: 'shared',
    },
  },
```

### import

`import`指定 chunk 包含的模块，可以是单个字符串路径，或者一个字符串数组。

#### filename

webpack 默认从`output.filename`生成入口 chunk 的名称，不过也可以在`entry`中通过指定单独的`filename`

## output

`output`的配置项相当复杂，不过一般常用的是以下几项：

### path

生产环境打包输出文件夹，需要指定一个绝对路径，所以一般需要用到`path.resolve`来构建这个路径

```js
  output: {
    path: path.resolve(__dirname, 'dist'),
  }
```

### filename

如果指定`filename`为单个的字符串，并且`entry`是单个入口，那么就对应单个 bundle `js`。

但是鉴于大部分情况下都会使用 [code-splitting](https://webpack.docschina.org/guides/code-splitting/) 的模式，则需要使用以下**可替换模板字符串**模式来为每个 chunk 指定特定的文件名称

```js
  output: {
    filename: "static/js/[name].[contenthash:8].js",
  }
```

其中`name`表示多个`entry`指定的 chunk 名称，或者通过 SplitChunksPlugin 拆分的多个 chunk 的名称；而`contenthash`则对应 chunk 打包的资源内容生成的 hash 值，有利于 web 持久化缓存资源请求。

### chunkFilename

`chunkFilename`用于指定按需加载的 chunk 的名称，webpack 支持使用[动态导入`import()`](https://webpack.docschina.org/guides/code-splitting/#dynamic-imports)的语法，这些异步加载的模块都会被使用`chunkFilename`创建为单独的 chunk.

```js
  output: {
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
  }
```

### clean

是否生成输出文件之前清空`path`目录，可以干掉`CleanWebpackPlugin `了。

### compareBeforeEmit

告知 webpack 在写入到输出文件系统时检查输出的文件是否已经存在并且拥有相同内容

### assetModuleFilename✨

`assetModuleFilename`属于 webpack5 新增的关于输出非`js`，`json`资源的文件名名称，例如图片，视频等静态资源。

```js
 output: {
	 assetModuleFilename: 'static/media/[name].[hash][ext]'
 }
```

## module

### [静态资源处理](https://webpack.docschina.org/guides/asset-modules/)✨

webpack5 其中一个更新是内置了对部分非`js`，`json`资源模块的处理，来替代过去需要配置的`loader`。在 webpack5 中定义的资源类型`rules.type`有以下几种值：

- `asset/resource`：发送单独的文件请求并导出 URL，可以替换`file-loader`
- `asset/inline`：将某些资源转换成 Base64 编码的 data URL，从而减少 HTTP 请求，可以替换之前的`url-loader`
- `asset/source`：导出资源的源代码，可替换`raw-loader`
- `asset`：在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现，这个需要配合[`parser.dataUrlCondition`](https://webpack.docschina.org/configuration/module/#ruleparserdataurlcondition)来使用。

其他模块类型还有：

- `javascript/auto`：支持所有模块导入语法：CommonJS、AMD、ESM 等

- `javascript/esm`：只支持 ESM 语法
- `javascript/dynamic`：仅支持 CommonJS 和 AMD 模块语法，ESM 不可用
- `json`：可通过 `require` 和 `import` 导入 `.json`格式的数据
- `webassembly/sync`和`webassembly/async`：支持使用 ESM 导入 WASM 模块，例如

```js
import init from './example.wasm'

init().then((exports) => {
  exports.test()
})
```

### rules.parser

如果 `rules.type` 的值为 `asset`，那么 `rules.parser` 选项可能是一个对象或一个函数，其作用是配合`parser.dataUrlCondition`来指定文件大小阈值来将文件内容编码为 Base64，还是将其当做单独文件 emit 到输出目录。例如处理图片资源可以使用以下配置：

```js
module: {
  rules: {
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 1024 * 4, // 4KB
        },
      },
    },
  }
}
```

如果 `rules.type` 被设置成 `'json'`，那么 `rules.parser.parse` 选择可能会是一个方法，该方法实现自定义的逻辑，以解析模块的源和并将它转换成 JavaScript 对象。 它可能在没有特定加载器的时候，对将 `toml`, `yaml` 和其它非 JSON 文件导入成导入非常有用：

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.toml/,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
    ],
  },
};
```

### rules.issuer

指定当前模块关联的模块的匹配规则，例如处理 react 中引入的`.svg`模块的时候，同时需要匹配到 react 模块类型才会应用该规则，这样在 CSS 文件中通过`url`引入的`.svg`文件就不会受到影响。

```js
module: {
  rules: [
    {
      // allow to import SVG as React components.
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
      // 关联模块类型
      issuer: {
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
      },
    },
  ]
}
```

### rules.resourceQuery

`resourceQuery`用来处理模块路径中查询字符串部分，例如`import svg from './assets/file.svg?url'`，例如`svg`的情况，在 React 中，svg 一般可以作为图标组件单独使用，同时也可以传给`img`的`src`属性，作为`url`，配置如下：

```js
  module: {
    rules: [
      {
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
```

```jsx
import svg from './assets/file.svg?url'
import Svg from './assets/file.svg'

const App = () => {
  return (
    <div>
      <img src={svg} width="200" height="200" />
      <Svg width="200" height="200" viewBox="0 0 3500 3500" />
    </div>
  )
}
```

### noParse

指定一个 RegExp，让 webpack 忽略该模式匹配的模块的构建，例如`lodash`，`jquery`等。可以提升构建性能。

```js
  module: {
    noParse: /jquery|lodash/,
  },
```

## cache✨

webpack5 集成了缓存模块和 chunk 的配置，并且开发模式默认开启，从而提升构建速度。

:::tip

`cache:true`和`cache: { type: 'memory' }`效果相同，都是指定 webpack 仅在构建期间使用内存存储缓存，可以加快热更新的速度，但是重启 WDS 仍然很慢。可以使用以下配置项

:::

### maxGenerations

定义**内存缓存**中未使用的缓存项的生命周期。

- `maxGenerations: 1`：在一次编译中未使用的缓存被删除
- `maxGenerations: Infinity`：缓存将永远保存

:::tip

设置`cache: { type: 'filesystem' }`则会指定 webpack 将缓存内容存储到硬盘，从而在二次构建中提速，可以使用以下额外配置项

:::

### buildDependencies

指定 webpack 缓存失效的策略，推荐是指定`config: [__filename]`，在 webpack 配置或者 webpack 依赖的模块版本发生改变时重建缓存内容。

```js
  cache: {
    buildDependencies: {
      defaultWebpack: ['webpack/lib/'],
      config: [__filename],
    }
  }
```

webpack 默认使用`'webpack/lib/'`查找依赖项版本

### cacheDirectory

指定缓存目录，默认是`node_modules/.cache/webpack`

### name

指定缓存的名称

### store

指定 webpack 什么时候将数据存放在文件系统中，只支持一个字符串值`pack`，含义是当编译器闲置时候，将缓存数据都存放在一个文件中。

### maxAge

缓存的过期时间，毫秒为单位，默认是一个月时间。

### maxMemoryGenerations

定义在文件系统中未使用的缓存项的生命周期，开发模式下默认是`10`，生产模式则是`Infinity`

- `maxMemoryGenerations: 0`：将项目缓存到内存中，直到它们被序列化到磁盘。一旦序列化，下一次读取将再次从磁盘反序列化它们。这种模式将最小化内存使用，但会带来性能成本。
- `maxMemoryGenerations: 1`：从内存缓存中清除已序列化且在至少一次编译中未使用的项。当再次使用它们时，它们将从磁盘反序列化。这种模式将最小化内存使用量，同时仍将活动项保留在内存缓存中。

### version

设置缓存的版本，更新缓存的版本，可以让缓存失效。

