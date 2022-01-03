---
title: 搭建 React 项目（5）

---

## resolve

webpack 的底层配置项`resolve`主要和模块解析的路径相关，常见的例如`mainFiles` ，`extensions`等

### resolve.alias

配置模块依赖别名，常见的`@`解析到`src`文件夹，`path.resolve`本身是用来构造绝对路径的，所以`@`总能解析到`src`目录的路径

```javascript
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
```

### resolve.enforceExtension

引入模块必须添加拓展名，默认是`false`

### resolve.extensions

配置文件依赖后缀名

使用`resolve.extensions`可以配置文件的默认后缀名，默认是`['.wasm', '.mjs', '.js', '.json']`。当省略文件后缀名时，webpack 会尝试对文件名依次添加后缀名并解析，如果找到相关后缀的文件就停止解析。例如`import "./data"`，那么 webpack 首先会去找文件夹是否存在`./data.wasm`的文件，找不到就换下一个后缀名`./data.mjs`，就这样依次解析，如果最后都找不到就会报错。

需要注意的是默认的配置项不要删除，否则会发生错误，现在在默认配置的基础上加上`jsx`，即：

```javascript
module.exports = {
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', 'jsx'],
  },
};
```

下面是 CRA 内置的解析顺序是这样的：

```javascript
const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];
```

### resolve.mainFiles

解析目录时要使用的文件名，默认是`['index']`，我在 webpack V4.44.1 的版本使用中发现单纯使用这个配置项并不会让 webpack 去自动解析文件夹下的`index`命名的文件，然后我在 stackoverflow 上发现了这个问题的回答 —— [webpack can't find module if file named jsx](https://stackoverflow.com/questions/34678314/webpack-cant-find-module-if-file-named-jsx#comment85968209_34678598)，对于从 webpack 4.36.1 起，还需要在`babel-loader`中去配置`rule.resolve.extensions`，并且这个配置项是决定性的，必须加上`rule.resolve.extensions`的配置才会让 webpack 自动解析文件夹的`index`文件，并且`".js"`也不能省略，否则 react fast refresh 会报错。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                },
              ],
              ['@babel/preset-react'],
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
        resolve: { extensions: ['.js', '.jsx'] }, //必须加上这个配置
      },
    ],
  },
};
```

### resolve.mainFields

`resolve.mainFields`针对的是使用第三方库的代码如何进行解析，因为 JS 可以编写在浏览器中使用的代码，也可以编写使用在 nodejs 中的代码，或者一些通用的在服务端和浏览器都可以使用的代码。有的第三方库会针对不同的环境提供几份打包代码放在一起打包，它们会在`package.json`文件中指定不同环境代码的入口，例如：

```json
{
  "browser": "build/upstream.js",
  "module": "index"
}
```

一般情况下，在搭建项目的时候，会通过 webpack 的配置项 `target`来指定 webpack 去指定当前项目运行在什么样的环境中，例如`target: 'node'`指定当前代码最终运行在 nodejs 环境下。具体见 —— [`target` ](https://webpack.docschina.org/configuration/target/)。

当 webpack 的`target`属性设置成 `webworker`, `web` 或者没有指定的时候，那么`mainFields`的默认值就是`['browser', 'module', 'main']`，也就是 webpack 会最优先选择`browser`属性作为入口去解析第三方库的代码，对应上文说的`package.json`里面提供的`"browser"`属性的字段值。

而对于其它指定的`target`的属性值，例如`node`等，`mainFields`的默认值都是`['module', 'main']`。

### resolve.modules

告诉 webpack 解析模块时应该搜索的目录，默认是`['node_modules']`。webpack 通过路径解析解析模块的时候会首先查找项目根目录的`./node_modules`文件夹去寻找模块，如果找不到就往上一级目录 `../node_modules` 中去找。

有时候这个配置比`alias`还简洁，比方说对于项目中封装通用业务组件库位于`src/components`下面，然后通过`resolve.modules`配置模块解析规则如下

```javascript
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, './src/components'), 'node_modules'],
  },
};
```

这时候在编写页面的时候，如果`import`一个`src/components`下里面的组件，就不用带任何路径前缀直接写文件夹就行了，nice！不过这时候的弊端就是如果你的组件和第三方库的组件同名，就会把第三方库的组件覆盖掉了。

```javascript
import { Button } from 'Button/index.jsx';
```

这个配置加上上文提到的`rule.resolve.extensions`，结合在一起就是神器，对于`src/components`的组件，例如`src/components/Button`，直接一句话就搞定，webpack 会自动查找`src/components/Button`文件夹下的`index`文件。

```javascript
import { Button } from 'Button';
```

### resolve.plugins

定义解析模块过程中使用的插件，常用的应该是`pnp-webpack-plugin`。这个理要了解一下[yarn pnp](https://classic.yarnpkg.com/en/docs/pnp/)，简单来说`Plug'n'Play`是替代`node_modules`依赖机制的方案，对于一个简单项目来说，如果使用 pnp 替代 npm 的机制，可以通过在`package.json`中配置即可，对于 webpack 项目可以使用插件来支持 pnp 的模块解析机制。例如，CRS 内部就是使用了[`pnp-webpack-plugin`](https://github.com/arcanis/pnp-webpack-plugin)这个插件。

```shell
yarn add pnp-webpack-plugin -D
```

```javascript
const PnpWebpackPlugin = require('pnp-webpack-plugin');

module.exports = {
  resolve: {
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
};
```

CRA 还使用了一个插件，是[`react-dev-utils/ModuleScopePlugin`](https://github.com/facebook/create-react-app/tree/e9abde739240b3124ab7237cbf32a370c209511e/packages/react-dev-utils#new-modulescopepluginappsrc-string-allowedfiles-string)，这个插件的作用是阻止项目内部从`src`或者`node_modules`以外的地方引入模块，因为这通常会引起混乱。一般来说项目代码都会放在`src`中，一般也不会瞎搞随便引用外面的文件夹。

## resolveLoader

`resolveLoader`的配置项和`resolve`相同，不过`resolveLoader`只用于解析特定的 loader 模块，例如`resolveLoader.moduleExtensions`默认是`['-loader']`，也就是解析 loader 的时候，默认会自动添加`-loader`的后缀名。

## module.rule.resolve

`module.rule.resolve`在上文提到过，也就是在解析特定类型的模块时使用的解析规则，如上文所说，它对于解析`index`命名的模块是必须配置的项。

也可以使用上述的`resolve`的其他配置项，这些配置项会和顶层的`resolve`配置项进行合并。