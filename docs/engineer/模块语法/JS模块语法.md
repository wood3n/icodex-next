## 什么是模块

模块可以简单理解为一个文件或者一段程序，一个 JS 函数，一个 js，css，img 等都可以称为一个模块。

前端模块化语法主要分为以下几种：

- AMD：ES6 之前的，大概 2013 年提出的异步加载模块的规范；最初由[`requirejs`](https://requirejs.org/)实现
- CommonJS：为 Node.js 服务器创建的模块系统；最早于 2009 年提出
- UMD：通用模块语法，兼容 AMD 和 CommonJS
- ESM：ES Modules，ES6 提出的模块化语法，主要在浏览器中使用，NodeJS 内部未来也会支持

## 为什么需要模块化

- 模块化的作用域限制标识符的解析范围，避免不同程序之间的相互影响，便于管理变量和函数声明；
- 拆分模块，增强代码可复用性和可维护性，提高开发效率；
- 前端页面根据模块之前的关联关系按需加载资源，提高页面渲染速度，优化用户体验；

## AMD

[AMD](<https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88)>) 全名`Asynchronous Module Definition`，也就是异步模块规范。它可以使模块和模块的依赖被异步加载，因此用于浏览器环境。

### define

AMD 通过`define`来定义模块，通过`require`加载模块，不过`require`区别于 CommonJS 的`require`语法，因为它是异步地加载动态的依赖。

> `define(id?, dependencies?, factory)`

`define`接收三个参数：

- `id`：表示模块的名称，由一个或多个单词以正斜杠为分隔符拼接成的字符串
- `dependencies`：该模块内部所依赖的模块名称的数组
- `factory`：模块初始化要执行的函数或对象，如果是函数会接收依赖数组中的位置顺序作为参数，同时返回一个值（对象，函数，或任意强制类型转换为 true 的值）作为模块的输出；如果是对象，此对象就是模块的输出值

```javascript
// 定义匿名模块，使用了 alpha 模块，并输出一个对象
define(['alpha'], function(alpha) {
  return {
    verb: function() {
      return alpha.verb() + 2;
    },
  };
});
```

### require

模块方法内部可以通过`require`加载模块，`require`可以做到同步和异步加载模块。

> `require(string)`

**同步**地返回模块 ID 所代表的模块。

```javascript
define(function(require) {
  var a = require('a');
});
```

> `require(Array, Function)`

**异步**加载模块并执行回调。参数 Array 是一个由模块 ID 组成的数组。当模块 ID 所代表的模块加载完成且可用时，回调函数 Function 才开始执行，并且只被执行一次。各个模块按照依赖数组中的位置顺序以参数的形式传入到 Function 里。

```javascript
define(function(require) {
  require(['a', 'b'], function(a, b) {});
});
```

## CommonJS

[CommonJS 规范](http://nodejs.cn/api/modules.html#modules_the_module_object)的目的是在浏览器以外的环境使用模块系统，用于 NodeJS 中来**同步**加载**本地**模块文件。CommonJS 规范特点如下：

- 建立在本地文件目录的基础上，**每个文件就是一个模块，有自己的作用域**。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见；

- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被**缓存**了，以后再加载，就直接读取缓存结果；
- 模块按照代码中出现的顺序**同步加载**，遇到 `require(id)` 时会停下来等待，直到新的模块加载完成之后再继续执行接下去的代码；虽然是同步串行加载，但是因为只是读取本地硬盘上的文件，不需要网络请求，所以此过程也非常迅速；
- **运行时解析**，所以支持在语句块内动态使用，不支持静态分析

### module.exports

> `module.exports = {}`

在每个模块中都有一个[`module` 对象](http://nodejs.cn/api/modules.html#modules_the_module_object)是对代表当前模块的对象的引用，其具有`id`，`path`，`parent`等属性，同时还具有一个`exports`属性，作为对外输出变量的接口，需要将对象或值赋值给 `module.exports`来导出。由于是赋值的机制，所以**一个模块只支持导出一个值**。

`module.exports`可以在文件级作用域内简写成`exports`，但是需要注意的是`exports`仅作为`module.exports`指向对象引用的拷贝，如果将新值分配给 `exports`，则它就不再绑定到 `module.exports`

```javascript
module.exports.hello = true; // 从模块的 require 中导出
exports.hello = false; // module.exports.hello的值也会变成false
exports = { hello: false }; // 未导出，仅在模块中可用
```

### require

> `require(id)`

`require`用于访问指定模块的 `module.exports`对象，来导入`js`、`JSON`模块。

`id`：模块名称或路径；根据 id 的不同格式，`require`命令会去不同路径寻找模块文件：

1. 如果参数字符串以“/”开头，则表示加载的是一个位于绝对路径的模块文件；
2. 如果参数字符串以“./”开头，则表示加载的是一个位于相对路径（跟当前执行脚本的位置相比）的模块文件，该路径将根据 [`__dirname`](http://nodejs.cn/api/modules.html#modules_dirname)（如果有定义）命名的目录或当前工作目录进行解析；
3. 如果没有前导 `'/'`、`'./'` 或 `'../'` 来指示文件，则该模块必须是核心模块或从 `node_modules` 文件夹加载；从 `node_modules` 查找时会从当前指定的文件目录开始，一层一层往上，直到到达文件系统的根目录；
4. 如果找不到确切的文件名，Node.js 将尝试加载所需的文件名，并添加扩展名：`.js`、`.json`，最后是 `.node`。当加载 JSON 的时候得到的是序列化的字符串文本。
4. `require`支持目录名称作为模块，虽然目前还只在试验特性阶段 —— [Modules: CommonJS modules | Node.js v17.6.0 Documentation (nodejs.org)](https://nodejs.org/api/modules.html#folders-as-modules)

### 作用域

NodeJS 会对使用`require`加载的模块使用一个函数进行包装，这样模块内部的变量就会被限制在函数作用域中

```javascript
(function(exports, require, module, __filename, __dirname) {
  // 模块代码实际存在于此处
});
```

### 缓存

`require`解析模块路径然后查找文件的过程比较耗时，NodeJS 会对使用`require`加载的模块按照模块的绝对路径和`module`对象进行缓存，这样后续解析相同的模块路径直接从缓存读取，以提高文件模块查找效率，同时还可以解决循环引用的问题。

可以使用`require.cache`查看缓存的`module`对象，类似于下面的数据结构

```javascript
{
    '/Users/evan/Desktop/demo/main.js':
       Module {
         id: '.',
         exports: {},
         parent: null,
         filename: '/Users/evan/Desktop/demo/main.js',
         loaded: false,
         children: [ [Object] ],
         paths:
          [ '/Users/evan/Desktop/demo/node_modules',
            '/Users/evan/Desktop/node_modules',
            '/Users/evan/node_modules',
            '/Users/node_modules',
            '/node_modules'
          ]
       },
  '/Users/evan/Desktop/demo/a.js':
       Module {
         id: '/Users/evan/Desktop/demo/a.js',
         exports: { foo: 1 },
         parent:
          Module {
            id: '.',
            exports: {},
            parent: null,
            filename: '/Users/evan/Desktop/demo/main.js',
            loaded: false,
            children: [Array],
            paths: [Array] },
         filename: '/Users/evan/Desktop/demo/a.js',
         loaded: true,
         children: [],
         paths:
          [ '/Users/evan/Desktop/demo/node_modules',
            '/Users/evan/Desktop/node_modules',
            '/Users/evan/node_modules',
            '/Users/node_modules',
            '/node_modules'
          ]
       }
}
```

### 值的拷贝

使用`require`访问的模块实际上是对模块导出值的拷贝，所以不同模块之间操作不会相互影响。

### 运行时解析

`require`支持动态导入，也就是可以在语句块中使用，例如下面解析文件目录导入文件的方法：

```js
const fs = require('fs');
const path = require('path');
const module_holder = {};

function LoadModules(path) {
  fs.lstat(path, function(err, stat) {
    if (stat.isDirectory()) {
      // 文件夹
      fs.readdir(path, function(err, files) {
        var f,
          l = files.length;
        for (var i = 0; i < l; i++) {
          f = path.join(path, files[i]);
          LoadModules(f);
        }
      });
    } else {
      // 加载文件
      require(path)(module_holder);
    }
  });
}
```

## UMD

[UMD](https://github.com/umdjs/umd)，全名 Universal Module Definition，即通用模块规范。UMD 的设计就是为了兼容 AMD 和 CommonJS 的语法，通常用于构建工具 webpack 等内部做语法兼容的使用。

经过 UMD 打包的模块代码会使用以下函数封装，以兼容 NodeJS，AMD 还有浏览器环境；此外还有其他兼容方式的语法，见 [github.com](https://github.com/umdjs/umd/)

```javascript
(function(root, factory) {
  // 判断 AMD
  if (typeof define === 'function' && define.amd) {
    define(['b'], factory);
    // 判断 Nodejs
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('b'));
  } else {
    // 浏览器
    root.returnExports = factory(root.b);
  }
})(typeof self !== 'undefined' ? self : this, function(b) {
  return {};
});
```

## ES Modules

ES Modules 是 ES6 提出目前唯一纳入语言规范的模块化标准。ES Modules 有以下几方面特点：

- 兼容性强，到目前为止，主流浏览器都已实现，["JavaScript modules" | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/?search=JavaScript modules)，[NodeJS 也已经支持](http://nodejs.cn/api/esm.html#esm_modules_ecmascript_modules)
- 编译时加载模块，支持静态分析；同时也支持动态加载模块语法`import()`
- 自动采用严格模式，语法格式更加规范

### type=module

在浏览器中，ES Modules 必须在声明了 `type="module"` 的 `script` 的标签中使用，其具有三个特点：

- 支持本地同步加载和浏览器异步加载；
- 声明了 `type="module"` 的 `script` 会使用严格模式，同时限制模块作用域；
- 声明该属性的 js 文件，默认是异步加载，不会阻塞 HTML 解析，会在 HTML 解析完以后才执行；但是如果附加了`async`属性，则会在加载完以后立即执行。

![image-20200824095546101](../../../public/images/image-20200824095546101.png)

### mjs

`.mjs`文件后缀被认为是在 NodeJS 中使用模块化语法的方案，并且目前 NodeJS 的 [http-server](https://github.com/http-party/http-server#readme) 模块已经支持了。

但是目前仍然和一些工具存在冲突，比如 TypeScript。

### export

`export`用于直接导出模块内部变量，函数，类等，且必须位于模块顶层，**不能放在语句块中**

```js
export const a = 1;

export const a = () => 1;

export class Person {

}

export {
 a: 1,
 b: 'xxx'
}
```

`export`还支持重命名导出，全部导出和默认导出三种语法格式：

```js
// 重命名导出
export { variable1 as name1, variable2 as name2, …, nameN };
export { default as DefaultExport } from 'xxx';

// 全部导出
export * from …;
// ES2021 才支持
export * as name1 from …;

// 默认导出
export default expression;
```

### import

`import`命令访问其它模块内部成员，其接受一对大括号，里面指定要从其他模块导入的变量名。

```js
<script type="module">import {a} from './xxx.js'</script>
```

`import`也支持重命名

```js
export const a = 1;

import { a as b } from './xxx.js';
```

如果一个文件内部导出大量成员而又没有默认导出`default`，可以使用重命名来简化

```js
import * as xxx from './xxxx';
```

`import`还支持运行时动态加载模块的语法`import(xxx).then()`，该语法将`import()`作为函数调用，传递模块路径作为参数，并返回一个 Promise 对象，详细见 —— [webpack 优化代码生成（1） (icodex.me)](https://icodex.me/react/webpack优化/webpack优化（1）#按需加载)

### import 到底干了啥

> [ES6 In Depth: Modules - Mozilla Hacks - the Web developer blog](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/)

#### 解析和加载

如果是浏览器，会按照 HTML 的顺序从第一个指定为`type=module`的`script`解析内部`import...from`指定的模块路径，选择从网络下载模块还是从本地缓存读取；如果是模块加载器（NodeJS），则会从指定的入口模块开始解析，从本地文件系统加载模块。

浏览器或者加载器会对加载的模块使用**模块映射**（Module Map）来管理缓存，模块映射使用模块的完成路径作为标记，使用模块实例作为值；当解析遇到相同路径的模块时，就会从缓存加载；因此一个模块文件只会被加载一次。

这种缓存方式即可以提高网络环境下的加载速度，也可以解决循环引用的问题。

![15_module_map.png](../../../public/images/bV785X.png)

在这个过程中还会发生变量提升和申请内存空间的行为，将函数声明和导出语句提升到作用域顶部，同时为他们申请内存地址，方便后续执行时更方便。

![40_top_level_code.png](../../../public/images/bV8ce1.png)

#### 链接

所谓链接就是对加载完的模块根据依赖关系关联起来，在这个过程中，JS 引擎会采用**深度优先后序遍历的方式**顺着关系图到达最底端没有任何依赖的模块，设置它们的导出，然后回到上一层把模块的导入链接起来。

在这个过程中，ES Modules 采用的是**实时绑定**（Live Binding）的方式。导出和导入的模块都指向相同的内存地址（即**值引用**）。所以，当导出模块内导出的值改变后，导入模块中的值也实时改变了。模块导出的值在任何时候都可能发生改变，但是导入模块却不能改变它所导入的值，因为它是**只读**的。举例来说，如果一个模块导入了一个对象，那么它只能改变该对象的属性，而不能改变对象本身。这与 CommonJS 导入的是值的拷贝不同。

#### 执行

执行过程中，会对已经申请内存空间的变量存入真实值，按照提升后的函数顺序进行执行。