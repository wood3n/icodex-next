---
title: tsconfig.json 文件配置
---

## 什么是 tsconfig

根据 TypeScript 官方文档的介绍，tsconfig.json 用于指定 TypeScript 项目的根目录以及指定编译选项。TypeScript 本身提供了一些基于不同运行时环境的 tsconfig.json 的配置项 —— [基本的 TSConfig](https://www.typescriptlang.org/zh/docs/handbook/tsconfig-json.html#基本的-tsconfig)。

## 配置项

`tsconfig.json`可用的配置项非常多，这里日常收集用到的配置项

### 顶级配置

| 配置项                                                       | 类型       | 含义                           |
| ------------------------------------------------------------ | ---------- | ------------------------------ |
| `files`                                                      | `string[]` | 一些特定的需要编译的文件名集合 |
| `include`                                                    | `string[]` | 一些文件目录匹配模式集合       |
| `exclude`                                                    | `string[]` | 一些相对于`include`排除的文件  |
| [`compilerOptions`](https://www.typescriptlang.org/tsconfig#compiler-options) | `object`   | 一些编译时的配置项             |

## compilerOptions

### target

[`target`](https://www.typescriptlang.org/tsconfig#target)指定编译后的目标语言环境，默认是 ES3

### lib

[`lib`](https://www.typescriptlang.org/tsconfig#lib)根据`target`指定的目标语言环境适当引入可用的 js 特性，例如当`target >= ES6`的时候，`Map`可用，当然也可以指定的具体的语言特性，例如：

```json
"lib": ["es2019", "es2020.promise", "es2020.bigint", "es2020.string"]
```

### module

[`module`](https://www.typescriptlang.org/tsconfig#module)配置项指定模块语法，模块语法可选的就是以下几项：_'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'_；默认情况下如果`target`指定为`ES3/ES5`，模块语法按照`CommonJS`处理，其他情况按照`ES Modules`处理。

### esModuleInterop

[`esModuleInterop`](https://www.typescriptlang.org/tsconfig#esModuleInterop)解决不同模块语法的转换问题

### strict

[`strict`](https://www.typescriptlang.org/tsconfig#strict)配置项启用所有`Strict`模式的严格检查配置项，这些配置项具体由以下几项组成：

- `alwaysStrict`始终使用 JS 的严格模式
- `strictBindCallApply`检查`bind`、`call`和`apply`这些方法在调用原函数的时候传递的参数是否符合原函数定义的参数类型
- `strictNullChecks`检查类型是否设置了允许传递`undefined`、`null`

- `strictFunctionTypes`严格检查函数类型
- `strictPropertyInitialization`检查`class`的公共属性是否在`constructor`中定义了
- `noImplicitAny`必须为`any`显式指定类型
- `noImplicitThis`检查函数内部的`this`类型是否显式指定了`any`
- `useUnknownInCatchVariables`配置项使得编译时可以自动识别`catch`语句中捕获的错误变量的类型，而无需为其指定为`any`或者`unknown`

这些单独的配置项都可以在`compilerOptions`单独配置来覆盖`strict`的配置

### baseUrl

[`baseUrl`](https://www.typescriptlang.org/tsconfig#baseUrl)指定文件模块路径解析的相对基础路径，默认是`taconfig.json`的目录

### paths

[`paths`](https://www.typescriptlang.org/tsconfig#paths)配置路径别名，相对于`baseUrl`来解析，例如

```json
    "paths": {
      "@/*": ["./src/*"]
    },
```

### skipLibCheck

[`skipLibCheck`](https://www.typescriptlang.org/tsconfig#skipLibCheck)指定是否跳过`.d.ts`类型定义文件的类型检查，跳过可以提高编译速度。

### forceConsistentCasingInFileNames

`forceConsistentCasingInFileNames`是否强制代码中使用的模块文件名必须和文件系统中的文件名保持大小写一致，例如`import fileManager.ts`查找指定的`fileManager.ts`文件而不是`FileManager.ts`文件。

