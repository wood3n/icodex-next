---
title: 编写 webpack loader
slug: /webpackloader
keywords: ["webpack", "loader", "是什么", "为什么需要", "运行模式", "的链式调用", "辅助工具", "loader-utilshttps"]
tags: ["webpack", "loader", "是什么", "为什么需要", "运行模式"]
---

## webpack loader 是什么

`loader`就是一个函数，用于编译源代码内部不同类型的模块，同时输出编译后的代码，用来拓展 webpack 的解析能力。

## 为什么需要 loader

本身 webpack 只能处理`.js`，·`.json`文件，对于其他类型的模块代码，webpack 需要借助`loader`来处理源码，可以把`loader`直接理解为编译器，因为它主要负责将 webpack 输入的模块代码转换成另一种形式的代码输出。

## loader 运行模式

`loader`接收以下三个参数：

- `content`：源代码
- `map`：可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
- `meta`：meta 数据，可以是任何内容

`loader`可以直接返回处理后的代码，表示该`loader`是以同步模式运行的

```javascript
module.exports = function(content, map, meta) {
  let result = '';

  // 一些处理
  return result;
};
```

当`loader`内部具有异步处理时，需要对结果使用`callback`函数进行包装，`callback`依次接收四个参数：

- `error`：第一个参数是错误信息`Error`或者`null`
- `result`：第二个参数则是处理过后的代码
- `source map`：第三个参数是 source map
- `meta`：第四个参数，会被 webpack 忽略，可以是任何类型的参数

```javascript
module.exports = function(content, map, meta) {
  // 获取 callback 函数
  var callback = this.async();
  someAsyncOperation(content, function(err, result) {
    if (err) {
      return callback(err);
    }
    callback(null, result, map, meta);
  });
};
```

### loader 的链式调用

`module.rules.use`这个数组传递的多个`loader`按照数组索引的顺序从后往前执行，第一个执行的`loader`会获取模块源代码作为参数，然后其执行结果会传递给下一个执行的`loader`，最后一个`loader`执行期望返回`JS`代码和`sourcemap`；比较常见的就是`less`的处理流程

```javascript
module: {
  rules: [
   	test: /\.less$/,
    use: [
    	"style-loader",
    	"css-loader",
    	"less-loader"
  	]
  ]
}
```

## 辅助工具

### [loader-utils](https://github.com/webpack/loader-utils#readme)

常用于获取在`webpack`配置项中传递给`loader`的参数配置，返回的参数配置项是一个**只读**的对象

```javascript
// 在loader内部使用
const loaderUtils = require('loader-utils');
const options = loaderUtils.getOptions(this);

// 通过queryString指定的配置项，例如loader?some&params
const params = loaderUtils.parseQuery(this.resourceQuery);
```

### [schema-utils](https://github.com/webpack/schema-utils)

`schema-utils`可以对`loader`获取的配置参数进行校验，从`schema-utils`中获取的`validate`方法接收三个参数：

- `schema`：用于定义`options`配置项的类型和校验不通过时的描述，也就是校验规则
- `options`：即外部传递进来的配置项
- `configuration`：最后一个参数用于补充对于`schema`的描述信息

```javascript
import { getOptions } from 'loader-utils';
import { validate } from 'schema-utils';

// 校验规则
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    query: {
      type: 'number',
    },
  },
  additionalProperties: false,
};

function loader(src, map) {
  const options = getOptions(this);

  validate(schema, options, {
    name: 'Loader Name',
    baseDataPath: 'options',
  });

  // Code...
  return `function() {xxx}`;
}

export default loader;
```

## 编写 loader 的注意事项

- 功能单一原则：一个`loader`应该只处理一种类型的源代码
- 禁止写绝对路径

