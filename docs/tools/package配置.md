---
title: packagejson的配置项

---

## name

package 的名称，用于和`version`属性在一起唯一标识一个 package。如果不打算发布 package 到 npm，可以不配置`name`属性。

`name`的命名具有以下规则：

- 小于等于 214 个字符
- 不能以点`.`或者下划线`_`开头
- 不能包含大写字母
- 不能包含任何不安全的 URL 字符

`name`命名有以下建议：

- 不要使用与核心 Node 模块相同的名称
- 不要在名称中添加`js`或者`node`
- 这个名称可能会作为参数传递给`require()`或者`import`，简洁一点比较好
- 可以使用`@[scope]`限定 package 所属的组织，例如`@babel/core`

## version

使用[语义化版本 2.0.0 | Semantic Versioning (semver.org)](https://semver.org/lang/zh-CN/)，即`major.minor.patch`

- 第一位表示主版本号，一般表示大的功能更新迭代
- 第二位表示更新向后兼容的新功能，重构等
- 最后一位更新通常表示修复 bug

![image-20200701184919910](../../public/images/image-20200701184919910.png)

`~version`：近似等于版本

```json
~1.2.3   >=1.2.3 <1.3.0
~1.2	 >=1.2.0 <1.3.0			1.2.x
~1								1.x
```

`^version`：根据 npm 版本号最多只有三位的情况，允许在最左侧同一非 0 版本号的范围内匹配

```json
^1.2.3 	>=1.2.3 <2.0.0				//最左侧非0版本号就是第一个
^0.2.3  >=0.2.3 <0.3.0				//最左侧非0版本号是第二个
^0.0.3 	>=0.0.3 <0.0.4
```

其它还能用大于小于这些符号`>version`等，分别就表示大于小于版本号的匹配。

`-beta.2`：有时候会在版本号的后面带上`beta`的测试版本符号。

## description

package 的描述字符串，可以帮助在 npm 官网搜索。

## keywords

表示 package 信息关键字的字符串数组，可以帮助在 npm 官网搜索。

## homepage

通常是项目介绍官网的网址

## repository

开源项目可以指定`repository`属性，表示代码仓库的地址，例如：

```json
"repository": {
  "type" : "svn",
  "url" : "https://v8.googlecode.com/svn/trunk/"
}
```

## bugs

通常是 github 的 issue 地址

```json
{
  "url": "https://github.com/owner/project/issues",
  "email": "project@hostname.com"
}
```

## license

开源项目一般都会指定证书声明，例如：

```json
{ "license" : "BSD-3-Clause" }

{ "license": "UNLICENSED" }
```

关于如何选择 license，这里放阮一峰老师的一张图

![img](../../public/images/bg2011050101.png)

## private

设置`private:true` 的项目可以避免项目误发布。

## files

一个字符串数组，指定 package 发布的时候包含的文件，使用的是和`.gitignore`相同的文件 [glob 匹配模式](<https://en.wikipedia.org/wiki/Glob_(programming)>)。以下文件在发布打包的时候总会包含在内：

- `package.json`
- `README`
- `LICENSE` / `LICENCE`
- `main`
- `bin`

而以下文件总是会被忽略

- `.git`
- `CVS`
- `.svn`
- `.hg`
- `.lock-wscript`
- `.wafpickle-N`
- `.*.swp`
- `.DS_Store`
- `._*`
- `npm-debug.log`
- `.npmrc`
- `node_modules`
- `config.gypi`
- `*.orig`
- `package-lock.json`

![image-20211127225149009](../../public/images/image-20211127225149009.png)

## main

字符串路径，指定程序的主入口文件路径，例如 package 的`name`是`foo`，那么使用`require("foo")`就是查找`main`指定的文件路径返回的对象。如果没有指定`main`，默认是根目录下的`index.js`文件。

## engines

指定 package 所需的 nodejs 或 npm 的版本，这对某些项目使用比较新的 ES 语法会比较有用，例如使用 typescript 编写且使用了`?.`的语法，那么 nodejs 的版本至少需要 16 以上。

```json
{
  "engines": {
    "node": ">=0.10.3 <15"
  }
}
```

```json
{
  "engines": {
    "node": ">=0.10.3 <15"
  }
}
```

## bin

`bin`用于注册一个命令，该命令值指向 package 内部的可运行文件，这样在本地**全局安装** package 以后，可以直接使用该命令直接运行 package，这也就是常用的 nodejs 命令行工具的实现方式。

```json
{
  "bin": {
    "myapp": "./cli.js"
  }
}

// 或者
{
  "bin": "./bin/index.js"
}
```

对于`bin`指定命令链接的文件内部必须在顶部包含一行 [Shebang(翻译: 工作)](https://zh.wikipedia.org/wiki/Shebang) 可执行命令：

```bash
#!/usr/bin/env node
```

这行字符是在 Unix 系统中用于解析可执行脚本的 Shebang 字符串，由`#!`开头，且必须出现在文本文件的第一行。

当 Unix 系统遇到`#!`的时候，会将后面的内容作为脚本的解释器指令调用，例如下面的 nodejs 执行命令就是调用`/usr/bin/env`，`env`是个 Linux 命令，它会按照当前环境变量设置（主要是 PATH 变量），查找名为 `node`的可执行文件，然后执行后续的文件内容 JS 。这样就不需要在命令行工具内部使用`node xxx`，而是直接输入指定命令就可以执行了。

```js
#!/usr/bin/env node

'use strict';

require('../lib/index.js');
```

而 Windows 系统源于历史 DOS，所以在 Windows 系统并不会识别 Shebang 字符串，但是仍然需要添加这行字符串，因为`npm`会根据这行字符串创建可在 Windows 的 CMD 中执行的 PATH 变量。总之带上能跨平台使用当前的 package，不带可能只能在 Windows 使用。

## browser

如果 package 需要在浏览器环境运行，使用`browser`替代`main`较好，提示该 package 只能用在浏览器中，不能用在 NodeJS 模块中。

## scripts

`scripts`属性是一个对象，里边指定了项目的生命周期个各个环节需要执行的命令。key 是生命周期中的事件，value 是要执行的命令，例如常见的`install`，`start`，`build`

## dependencies

使用`npm install xxx`或者`npm install xxx --save/-D`会将安装的依赖项写入`dependencies`属性中。

`dependencies`是一个对象，指定项目使用的依赖项从 package `name`到版本范围映射。key 是 package 的名称，value 是 package 的语义化版本信息，见上文。

## devDependencies

使用`npm install -D xxx`命令安装的开发包依赖项会被放到`devDependencies`下面，这里的依赖项通常保存仅在开发环境下使用的 package，例如 babel 编译器，以及 webpack 的 loader，plugin 等，这些依赖项在正式使用 package 的用户来说是不需要的，因为它们已经完成了自己的工作，放在`devDependencies`下面就能保证用户使用 package 的时候不会去下载这些依赖项。

如果在开发环境指定`npm install -P`则不会安装`devDependencies`下的依赖。

## peerDependencies

`peer`本身是同等的意思，在 npm 早期的`npm@1.x`以及`npm@2.x`版本中，npm 是没有针对项目内部重复以来进行优化的，例如一个 webpack plugin 的 package，例如`html-webpack-plugin`，它的开发本身需要依赖于`webpack`，而一个使用`webpack`进行构建的项目也会安装`webpack`，这样就形成了重复的依赖关系。

```shell
node_modules/
  |
  +- webpack/
  +- html-webpack-plugin
  		/node_modules/
  		|
  		+- webpack/
```

**使用`peerDependencies`将`webpack`作为核心依赖库，就可以避免相同的依赖被重复安装，做到`node_modules`树扁平化处理**。

在`npm@1.x`以及`npm@2.x`版本中，如果用户没有显式依赖核心库，则按照插件`peerDependencies`中声明的版本会被自动安装到项目根目录的`node_modules`中。

在`npm@3.x`以后，npm 对`node_modules`树进行扁平化优化，在构建依赖树的时候，首先选择将所有顶层依赖以及它们各自内部的子依赖安装到项目根目录的`node_modules`中，然后后续遇到相同的模块依赖，如果符合版本范围就不再继续安装，如果不符合才将其放到对应模块的`node_modules`中。这样`peerDependencies`的依赖项也不会自动安装了，如果没有手动安装，npm 会提示进行手动安装。

## bundledDependencies

在`bundledDependencies`中定义的依赖项会在发布 package 的时候被打包一起发布，这样在用户使用的时候就不用再下载这些依赖项了。

## optionalDependencies

`optionalDependencies`表示可选的依赖项，也就是用不用得到无所谓，如果在 npm 安装 package 的时候报错，也不会影响其他 package 的安装。

## typings/types

`typings`/`types`属性用于指定该项目的 TypeScript 类型声明文件位置，当使用 TypeScript 时，如果在项目中使用到了第三方库，那么 TypeScript 需要根据类型声明文件才能获得对应的代码补全、接口提示等功能。

```json
{
  "typings": "lib/index.d.ts"
}
```