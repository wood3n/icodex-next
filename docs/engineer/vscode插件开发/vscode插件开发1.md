---
title: vscode 插件开发（1）
slug: vsex1
keywords: ["官方脚手架", "配置项", "插件能力", "激活事件", "生命周期", "activate", "deactivate", "插件配置"]
tags: ["官方脚手架", "配置项", "插件能力", "激活事件", "生命周期"]
---

## 官方脚手架

vscode 官方提供了一套基于 [yeoman](https://yeoman.io/)  的脚手架，通过以下命令就可以生成一套可用的 vscode 插件代码：

```shell
npm install -g yo generator-code

yo code
```

### 配置项

vscode 通过`package.json`暴露出很多配置项：

- `name`和`publisher`：`name`通常是插件代码的仓库名称，`publisher`则是开发者，vscode 使用`<publisher>.<name>`来给定一个插件一个唯一的标识 ID；
- `main`：插件入口程序，如果是 TS 开发，则需要是编译后的`js`代码程序；
- `activationEvents`：指定插件激活事件
- `contributes`：指定插件能力

- `engines.vscode`：指定插件依赖的 vscode 的版本
- 其他的还有这些 —— [Extension Manifest | Visual Studio Code Extension API](https://code.visualstudio.com/api/references/extension-manifest)

## 插件能力

vscode 插件需要通过`package.json`的`contributes`属性来指定多种插件能力，所有的支持的能力在这里 —— [Contribution Points | Visual Studio Code Extension API](https://code.visualstudio.com/api/references/contribution-points)

一般来说常用的有以下这些：

- [注册 vscode 命令](https://code.visualstudio.com/api/references/vscode-api#commands)，也就是在运行面板输入的命令

```json
{
  "contributes": {
    "commands": [
      {
        "command": "extension.sayHello",
        "title": "Hello World"
      }
    ]
  }
}
```

- [配置插件](https://code.visualstudio.com/api/references/contribution-points#contributes.configuration)

```json
{
  "contributes": {
    "configuration": {
      "title": "TypeScript",
      "properties": {
        "typescript.useCodeSnippetsOnMethodSuggest": {
          "type": "boolean",
          "default": false,
          "description": "Complete functions with their parameter signature."
        },
        "typescript.tsdk": {
          "type": ["string", "null"],
          "default": null,
          "description": "Specifies the folder path containing the tsserver and lib*.d.ts files to use."
        }
      }
    }
  }
}
```

- [按键绑定](https://code.visualstudio.com/api/references/contribution-points#contributes.keybindings)

```json
{
  "contributes": {
    "keybindings": [
      {
        "command": "extension.sayHello",
        "key": "ctrl+f1",
        "mac": "cmd+f1",
        "when": "editorTextFocus"
      }
    ]
  }
}
```

- [鼠标菜单](https://code.visualstudio.com/api/references/contribution-points#contributes.menus)
- [数据存储](https://code.visualstudio.com/api/extension-capabilities/common-capabilities#data-storage)
- [输入提示](https://code.visualstudio.com/api/extension-capabilities/common-capabilities#quick-pick)

## 激活事件

vscode 通过`package.json`中指定的`activationEvents`属性来定义插件激活事件，当指定的`activationEvents`发生时便会运行插件程序。

有以下类型的事件：

- `onLanguage`：当 vscode 打开某一类型的文件时触发，可以指定的多个文件类型

```json
"activationEvents": [
    "onLanguage:json",
    "onLanguage:markdown",
    "onLanguage:typescript"
]
```

- `onCommand`：当 vscode 执行某一命令时触发

```json
  "activationEvents": [
    "onCommand:vs-tvt.helloWorld"
  ]

// 当运行 helloWorld 时激活 vs-tvt
```

- `onDebug`：启动 vscode 调试时触发
- `workspaceContains`：当打开文件夹并且含有匹配（`glob`模式匹配）的文件时触发

```json
"activationEvents": [
    "workspaceContains:**/.editorconfig"
]
```

- `onFileSystem`：以某种协议打开文件时触发

```json
"activationEvents": [
    "onFileSystem:sftp"
]
```

- `*`：当 vscode 启动时触发，会导致 vscode 启动变慢

```json
"activationEvents": [
    "*"
]
```

- `onStartupFinished`：当 vscode 启动完成后触发，不会影响 vscode 的启动速度

```json
"activationEvents": [
    "onStartupFinished"
]
```

## 生命周期

### activate

当插件激活的时候调用的方法，接收一些 vscode 提供的方法作为参数，每一个插件都必须包含一个`activate`方法

```typescript
export function activate(context: vscode.ExtensionContext) {
  
}
```

### deactivate

当插件停用，被禁用或者被卸载的时候执行一些清理程序。但是如果定义的清理程序需要异步执行，`deactivate`必须返回一个 Promise 对象，如果同步执行的话，需要返回`undefined`.

```typescript
export function deactivate() {
  
}
```

## 插件配置

一些插件在 vscode 的配置菜单内可以定制一些专属的配置项，这些可以通过在`package.json`内[`contributes.configuration`](https://code.visualstudio.com/api/references/contribution-points#contributes.configuration)来定义，然后通过[`vscode.workspace.getConfiguration('myExtension')`](https://code.visualstudio.com/api/references/vscode-api#workspace.getConfiguration)来获取配置项。

`configuration`内的字段有以下这些，分别对应在 vscode 的设置面板的 UI 如下：

![image-20220203001039040](../../../public/images/image-20220203001039040.png)

1. `title`：禁止出现"Extension", "Configuration", and "Settings"这些单词

```json
{
  "configuration": {
    "title": "GitMagic"
  }
}
```

2. `properties`：定义多个配置项，使用`.`分割的属性名称会分层解析，例如上图的配置项为：

```json
gitMagic.blame.dateFormat
gitMagic.blame.format
gitMagic.blame.heatMap.enabled
gitMagic.blame.heatMap.location
```

解析出来的配置项为

> Blame: **Date Format**
>
> Blame: **Format**
>
> Blame › Heatmap: **Enabled**
>
> Blame › Heatmap: **Location**

`properties`包含以下属性：

```json
{
  "contributes": {
    "configuration": {
      "title": "TypeScript",
      "properties": {
        "typescript.useCodeSnippetsOnMethodSuggest": {
          "type": "boolean",
          "default": false,
          "description": "Complete functions with their parameter signature."
        },
        "typescript.tsdk": {
          "type": ["string", "null"],
          "default": null,
          "description": "Specifies the folder path containing the tsserver and lib*.d.ts files to use."
        }
      }
    }
  }
}
```

- 属性名用来定义配置项字段

- `description / markdownDescription`：配置项的描述信息
- `type`：配置项表单类型，`number`，`string`，`boolean`，`null`等类型，`boolean`类型会在设置面板渲染成`checkbox`，如果是嵌套的引用类型的`array`或者`object`，在 vscode 设置页会渲染出`Edit in settings.json`的链接。
- `default`：默认值
- `order`：指定配置项在 vscode 设置 UI面板 显示的顺序
- `enum / enumDescriptions`：`enum`用于指定下拉菜单选项，`enumDescriptions`用于指定下拉菜单选项对应的描述项，会在切换选项的时候显示在下拉菜单下方

![settings UI screenshot of dropdown](../../../public/images/settings-ui-enum.png)

- `deprecationMessage / markdownDeprecationMessage`：已经废弃的配置项以及描述
- 其他在这里 —— [Contribution Points | Visual Studio Code Extension API](https://code.visualstudio.com/api/references/contribution-points#contributes.configuration)

## 语言类插件

语言类插件提供的功能非为以下两类

### 声明类语言特性插件

声明类语言特性指的是以下这些能力：

- 语法高亮
- 代码段自动补全
- 括号匹配
- 括号自动闭合
- 自动包裹括号
- 切换注释
- 自动空格
- 代码段折叠标记

### 编程语言特性插件

编程语言特性需要通过一个本地服务器来支持以下服务：

- hover 提示
- 代码自动完成
- 定义跳转
- 错误检查
- 代码格式化
- 重构
- 代码折叠

