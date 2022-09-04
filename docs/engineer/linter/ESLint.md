---
title: ESLint的使用
slug: /eslintconfig
---

## 什么是 ESLint

- 尼古拉斯·泽卡斯（《JS 高级程序设计》作者）在 2013 年创建的一个可配置的 JS，TS 等前端代码分析工具

## ESLint 的作用

- 约束团队开发的代码风格
- 代码质量检查，帮助减少 BUG
- 最强大的功能，还是配合 git hook 强约束代码的提交规范，不符合规范的代码别想提交上去了

## ESLint 使用

### 安装

```powershell
yarn global add eslint		//全局安装

yarn add eslint -D			//项目内安装
```

### 配置方式

ESLint 配置的方式有以下三种：

- 配置文件，在项目目录中新建一个`.eslintrc.js`文件（`rc`后缀表示`run control`，控制运行文件），导出配置规则，有些类似于 webpack 等工具的配置方式，这种是最常见的。同时，ESLint 支持一个目录一个配置文件；ESLint 会使用**离要检测的文件最近**的 `.eslintrc`文件作为最高优先级，然后往外层查找父目录里的配置文件。也可以在当前目录的配置项中写入`root:true`，将限制 ESLint 不再往外层目录查找配置项，保证最高优先级且防止配置项被覆盖。

```javascript
module.exports = {
    /*代码运行环境*/
	env: {},
    /*规则拓展*/
	extends: [],
    /*解析器*/
	parser: "",
    /*解析规则*/
	parserOptions: {},
    /*插件*/
	plugins: [],
    /*自定义规则，会覆盖拓展里的规则*/
	rules: {},
}

//也可以通过运行ESLint内置的初始化命令创建这个文件
yarn eslint --init		or    npx eslint --init
```

- 在`package.json`文件里添加`eslintConfig`字段进行配置，这种形式也有，不过不是很利于维护，有些对项目不熟悉的人上手可能不清楚 ESLint 的具体配置写在哪。
- 最后就是通过注释的方式直接在一个代码的源文件里用注释的形式嵌入配置

```javascript
/* eslint eqeqeq: "off", curly: "error" */ //配置rules
```

#### 优先级

ESLint 对`.eslintrc.js`文件的优先级最高，其次按如下优先级降序

1. `.eslintrc.js`
2. `.eslintrc.cjs`
3. `.eslintrc.yaml`
4. `.eslintrc.yml`
5. `.eslintrc.json`
6. `.eslintrc`
7. `package.json`

## 配置项

### env

> [`env`](https://eslint.org/docs/user-guide/configuring#specifying-environments)：指定 JS 运行环境

`env`是必须指定的属性，否则项目中使用多种模块化语法（`CommonJS`，ES Modules）的时候可能 ESLint 会提示错误。

```javascript
env: {
    browser: true,
    es2020: true,
    node: true,
}
```

### extends

> [`extends`](https://eslint.org/docs/user-guide/configuring#extending-configuration-files)：使用拓展的配置文件或者推荐的配置

`extends`可以是单个字符串，也可以使用数组，按数组中元素顺序后面的配置项是对前面的补充。这个配置项就是方便 ESLint 配置复用的，一些成熟的代码规范可以直接打包成 ESLint 插件通过`extends`来引入，这样团队内直接使用即可，避免了繁琐的配置。

- `eslint:recommended`：使用[推荐配置](https://cn.eslint.org/docs/rules/)
- 配置文件的绝对路径或者相对路径，相对路径是相对于配置文件`.eslintrc.js`的路径
- `plugin:包名/配置名`：使用安装的插件内置的配置，包名前缀`eslint-config-`，不过可以省略前缀
- `eslint:all`：启用当前安装的 ESLint 中所有的核心规则，基本用不到这个配置

```javascript
// eslint-plugin-myPlugin
module.exports = {
  configs: {
    myConfig: {
      plugins: ["myPlugin"],
      env: ["browser"],
      rules: {
        semi: "error",
        "myPlugin/my-rule": "error",
        "eslint-plugin-myPlugin/another-rule": "error"
      }
    },
    myOtherConfig: {
      plugins: ["myPlugin"],
      env: ["node"],
      rules: {
        "myPlugin/my-rule": "off",
        "eslint-plugin-myPlugin/another-rule": "off"
        "eslint-plugin-myPlugin/yet-another-rule": "error"
      }
    }
  }
};

extends: [
  "eslint:recommended",
  "plugin:react/recommended",
  "plugin:myPlugin/myConfig",				//自定义的插件配置
  "./node_modules/coding-standard/.eslintrc-es6",
]

{
  "extends": ["airbnb"]						//使用airbnb的配置
}
```

### parser

> [`parser`](https://eslint.org/docs/user-guide/configuring#specifying-parser)：指定解析器，需要配合`parserOptions`一起使用

ESLint 默认用的是 [Espree](https://github.com/eslint/espree) 作为 JS 解析器，但是也兼容以下解析器

- [Esprima](https://www.npmjs.com/package/esprima)
- [Babel-ESLint](https://www.npmjs.com/package/babel-eslint)：如果用了 babel 就要指定这个作为解析器
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)：如果用了 TypeScript 就要指定这个作为解析器

### parserOptions

> [`parserOptions`](https://eslint.org/docs/user-guide/configuring#specifying-parser-options)：指定要支持的 JS 语言选项

ESLint 默认使用的是 ES5 的词法环境，因此需要配置开启支持 ES6+语法，支持 React，支持 JSX，TSX 等文件格式。

**需要注意**：

- 支持 JSX 语法并不等同于支持 React，React 还需要用插件[`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react)

- 支持 ES6 语法并不意味着同时支持新的 ES6 全局变量或类型。对于 ES6 语法，使用 `{ "parserOptions": { "ecmaVersion": 6 } }`；对于新的 ES6 全局变量，使用 `{ "env":{ "es6": true } }`. `{ "env": { "es6": true } }` 自动启用 es6 语法，但 `{ "parserOptions": { "ecmaVersion": 6 } }` 不会自动启用 es6 全局变量

- `ecmaVersion`：默认是`5`，可以设置成 6/2015, 7/2016, 8/2017, 9/2018, 10/2019 或者 11/2020，年份或者版本号都行
- `sourceType`：默认是`script`，如果是模块化 JS，则必须是`module`

- `ecmaFeatures`：这是个对象，表示你想使用的额外的语言特性
  - `jsx`：默认`false`
  - `impliedStrict`：是否全局使用严格模式
  - `globalReturn`：允许在全局作用域下使用 `return` 语句

### plugins

> [`plugins`](https://eslint.org/docs/user-guide/configuring#configuring-plugins)：配置插件

插件需要安装 package 才能用，插件名以`eslint-plugin-`开头，但是也可以省略这个前缀

```javascript
plugins: [
    "react", 					//指的是eslint-plugin-react
    "@typescript-eslint", 		//@typescript-eslint/eslint-plugin
    "prettier"					//eslint-plugin-prettier
],
```

### rules

> [`rules`](https://eslint.org/docs/user-guide/configuring#configuring-rules)：自定义规则，可以覆盖`extends`拓展中的配置

可以在此查看——[全部规则表](https://eslint.org/docs/rules/)；规则属性的指可以是以下三种

- `off`/`0`：关闭规则
- `warn`/`1`：开启规则，使用警告级别的错误：`warn` (不会导致程序退出)

- `error`/`2`：开启规则，使用错误级别的错误：`error` (当被触发的时候，程序会退出)

### globals

> [`globals`](https://eslint.org/docs/user-guide/configuring#specifying-globals)：定义全局变量，避免[no-undef](https://cn.eslint.org/docs/rules/no-undef)发出警告

```javascript
globals: {
    "var1": "writable",
    "var2": "readonly"
}
```

### root:true

> `root:true`：将 ESLint 限制在当前目录

为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 `package.json` 文件或者 `.eslintrc.*` 文件里的 `eslintConfig` 字段下设置 `"root": true`。ESLint 一旦发现配置文件中有 `"root": true`，它就会停止在父级目录中寻找

### ignorePatterns

指定一组需要 ESLint 忽略检查的文件或者目录的路径，这些文件必须都在配置文件`.eslintrc.js`相同的目录里，可以使用`**`做模糊查询

```json
"ignorePatterns": ["temp.js", "**/vendor/*.js"]
```

## eslintignore

也可以在项目中单独创建一个`.eslintignore`文件来写入忽略检查的文件名，`.eslintignore` 文件是一个纯文本文件，其中的每一行都是一个 glob 模式表明哪些路径应该忽略检测，这些路径都是相对于 `.eslintignore` 的位置或当前工作目录；当 ESLint 运行时，在确定哪些文件要检测之前，它会在当前工作目录中查找一个 `.eslintignore` 文件。如果发现了这个文件，当遍历目录时，将会应用这些偏好设置。

Globs 匹配指的是使用 [node-ignore](https://github.com/kaelzhang/node-ignore)规则，有下面属性可用

- 以 `#` 开头的行被当作注释，不影响忽略模式
- 忽略模式依照 `.gitignore` [规范](https://git-scm.com/docs/gitignore)
- 可以覆盖`.eslintrc.js`配置中的`ignorePatterns`属性

例如常见的配置，忽略`node_modules`文件夹，忽略 TS 类型声明文件`*.d.ts`，忽略打包目录`build`，`dist`等

```javascript
typings
es/**/*
lib/**/*
node_modules
_site
dist
coverage
**/*.d.ts
```

## 第三方插件配置

### React 配置

React 需要安装插件`eslint-plugin-react`

```powershell
yarn add eslint-plugin-react -D
```

`settings`属性一般配置 React 的版本，`version: "detect"`表示自动根据安装的 React 确定版本。

```javascript
{
  plugins: [
    "react",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
```

### React hooks 配置

推荐安装[`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)插件

```javascript
{
  "extends": [
    // ...
    "plugin:react-hooks/recommended"
  ]
}
```

### TypeScript 配置

TypeScript 团队从 2019 年 1 月开始就采用 ESLint 作为代码检查工具，提供了 TypeScript 文件的解析器 [`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md#getting-started---linting-your-typescript-codebase) 和相关的 ESLint 插件 `@typescript-eslint/eslint-plugin`，其[文档](https://typescript-eslint.io/docs/linting/)也很完善，按照文档提示安装配置就可以使用了。

```shell
yarn add eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

在项目根目录写下配置文件`.eslintrc.js`，需要注意`tsconfig.json`配置要支持`"module": "commonjs"`和`"moduleResolution": "node"`，否则这里的 cjs 语法会报错。

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-var-requires': 0,
  },
};

```

### 结合 Prettier 使用

Prettier 是一个可以在开发过程中自动根据配置的格式修改代码的插件，ESLint 带有的代码格式化规则可能和 Prettier 发生冲突，需要通过安装拓展来解决。

> [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier#eslint-config-prettier)

关闭所有不必要或者会和 Prettier 冲突的 ESLint 规则，也就是让 Prettier 完全控制代码格式化的问题

```powershell
yarn add eslint-config-prettier -D
```

```powershell
{
  "extends": [
    "prettier"
  ]
}
```

但是 ESLint 针对 TypeScript，React 等语法规则的插件也同样支持；如果使用了`eslint-config-prettier`又同时使用了插件，建议使用`"prettier/that-plugin-name"`的格式添加`extends`规则；支持的常用插件如下

1. [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)
2. [eslint-plugin-babel](https://github.com/babel/eslint-plugin-babel)
3. [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype)
4. [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
5. [eslint-plugin-standard](https://github.com/xjamundx/eslint-plugin-standard)
6. [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
7. [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)

> [配置示例](https://github.com/prettier/eslint-config-prettier#example-configuration)

```json
{
  "extends": ["prettier", "prettier/@typescript-eslint", "prettier/react"]
}
```

> 推荐 - [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier#eslint-plugin-prettier-)

这个插件是和`eslint-config-prettier`配合使用的，如果没用``eslint-config-prettier`把ESLint的格式化规则都禁用，那么即使用了`eslint-plugin-prettier`，Prettier 还是可能会和 ESLint 起冲突。**把 Prettier 推荐的格式问题的配置以 ESLint rules 的方式写入**，这样 prettier 提示的时候也是作为 eslint 的插件来提示

```javascript
yarn add eslint-plugin-prettier -D
```

```javascript
// 和eslint-config-prettier组合起来的配置
{
  "plugins": ["prettier"],
  "extends": [
      "prettier",
      "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

## 常见问题

> [`Delete 'cr' prettier/prettier`](https://stackoverflow.com/questions/53516594/why-do-i-keep-getting-delete-cr-prettier-prettier)

```javascript
module.exports = {
  ...
  rules: {
    ...
    "prettier/prettier": [
      ...
      {
        endOfLine: "auto",
      },
    ],
  }
}
```

> Warning: React version not specified in eslint-plugin-react settings. See https://github.com/yannickcr/eslint-plugin-react#configuration .

按照提示地址点进去，发现 ESLint 的配置少了一个`settings`字段，里面设置了 react 的版本号

```json
{
  "settings": {
    "react": {
      "createClass": "createReactClass",
      "pragma": "React",
      "version": "detect" //默认detect，自动识别安装的react版本
    },
    "linkComponents": [
      "Hyperlink",
      { "name": "Link", "linkAttribute": "to" } //可以使用Link替换a标签
    ]
  }
}
```

> vscode 控制台没有显示 ESLint 任务

vscode 需要安装 ESLint 拓展，并且设置如下部分，开启保存自动格式化代码

```javascript
formatOnPaste: true;

formatOnSave: true;
```

> [ESLint: Require statement not part of import statement.(@typescript-eslint/no-var-requires)](https://stackoverflow.com/questions/59278151/eslint-require-statement-not-part-of-import-statement-typescript-eslint-no-va)

```javascript
module.exports = {
  ...
  rules: {
    ...
    '@typescript-eslint/no-var-requires': 0,
  }
}
```