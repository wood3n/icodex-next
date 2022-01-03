---
title: d.ts文件
---

## d.ts

环境声明文件通常是以`.d.ts`结尾的一份 TypeScript 格式的文件，它们一般被放在项目的根目录，或者通过`package.json`的`typings`/`types`属性指定其定义的路径：

```json
{
  "typings": "lib/index.d.ts"
}
```

对于环境声明文件内部每个根级别的变量，函数声明等都必须使用 TypeScript 的`declare`（声明）关键字作为前缀，`declare`声明语法是隐藏内部实现细节的做法，也就是只会暴露函数，变量等类型，参数等，例如声明`jQuery`的全局变量：

```typescript
// src/jQuery.d.ts

declare let jQuery: (selector: string) => any;
```

对于`.d.ts`格式的文件，在发布 package 的时候，TypeScript 也不会对其进行编译，从而在其它项目将其作为第三方库使用的时候，能够通过 TypeScript 引用它的声明文件，**获得对应的代码补全、接口提示等功能**。

## 创建声明文件

### 自动生成

如果库本身使用 TypeScript 编写的，可以在 TypeScript 的配置文件`tsconfig.json`中添加 `declaration` 选项，就可以在项目构建的同时自动生成 `.d.ts` 声明文件，该声明文件也会被保存到`outDir`指定的文件目录中。

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "lib",
    "declaration": true
  }
}
```

除此之外，还有几个和声明文件相关的`tsconfig.json`配置项：

- `declarationDir` 设置生成 `.d.ts` 文件的目录
- `declarationMap` 对每个 `.d.ts` 文件，都生成对应的 `.d.ts.map`（sourcemap）文件
- `emitDeclarationOnly` 仅生成 `.d.ts` 文件，不生成 `.js` 文件

### 手动添加

对于一些没有使用 TypeScript 编写的项目，可以选择手动添加声明文件的方式：

- 一种方法是直接在项目根目录添加`index.d.ts` 文件，手动编写项目的类型声明；
- 另一种方式是通过`package.json` 中的 `types` 或 `typings` 字段指定一个类型声明文件的路径

## 发布声明文件

可以通过上面的方法为自己的 TypeScript 项目自动生成声明文件，并在发布库的时候跟随项目自动发布，但是为一些老的第三方库，甚至是已经停止维护的库添加类型声明是一件很麻烦的事，所以 TypeScript 团队提供了 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.cn.md) 类型声明仓库，为没有声明文件的 JavaScript 库提供类型定义，任何想为第三方库添加类型声明文件的 GitHub 成员都可以通过提 PR 的形式为该仓库提供代码，每一个 PR 在合并之前都会由 TypeScript 或 Definitely Typed 的团队成员进行审核，然后合并后的 `master`分支会被自动发布到 NPM 上的 `@types`下，这样我们就可以通过安装`@types/<package name>`的形式去安装第三方库的类型声明文件了。

例如 React 库本身没有自己的声明文件，就可以通过 DefinitelyTyped 获取它的声明文件。

```shell
yarn add @types/react -D
```

## 常见类型的声明文件

由于 TS 编译器只认识以`.ts`形式命名的后缀文件，所以在项目中使用的时候需要为其它类型的文件定义其类型，否则在项目中通过`import`引入文件的时候就会报诸如[can't find module less](https://stackoverflow.com/questions/46501297/typescript-cant-find-module-less) 这样的错误。

比较简单的解决方法是直接在项目的`src`目录下定义一个`xxx.d.ts`的类型声明文件，然后写入如下类型

```typescript
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

然后在`tsconfig.json`配置中的`include`属性下包含该类型定义文件即可，通常来说该定义文件放在`src`并配置`include`包含整个`src`目录总是没错的。

```json
// tsconfig.json

{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "jsx": "react-jsx"
    ...
  },
  "include": [
    "src"
  ]
}
```