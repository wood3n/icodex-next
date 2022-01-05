---
title: 编写vscode插件
authors: oxygen
---

## 官方脚手架

vscode 官方提供了一套基于 [yeoman](https://yeoman.io/)  的脚手架，通过以下命令就可以生成一套可用的 vscode 插件代码：

```shell
npm install -g yo generator-code

yo code
```

<!--truncate-->

### 配置项

vscode 通过`package.json`暴露出很多配置项：

- `name`和`publisher`：`name`通常是插件代码的仓库名称，`publisher`则是开发者，vscode 使用`<publisher>.<name>`来给定一个插件一个唯一的标识 ID；
- `main`：插件入口程序，如果是 TS 开发，则是编译后的代码；
- `activationEvents`：指定插件激活事件
- `contributes`：指定插件能力

- `engines.vscode`：指定插件依赖的 vscode 的版本
- 其他的还有这些 —— [Extension Manifest | Visual Studio Code Extension API](https://code.visualstudio.com/api/references/extension-manifest)

## 插件能力

vscode 插件需要通过`package.json`的`contributes`属性来指定多种插件能力，所有的注册能力在这里 —— [Contribution Points | Visual Studio Code Extension API](https://code.visualstudio.com/api/references/contribution-points)

一般来说常用的有以下这些：

- [注册 vscode 命令](https://code.visualstudio.com/api/references/vscode-api#commands)

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

- `onStartupFinished`：当 vscode 启动完成后触发

```json
"activationEvents": [
    "onStartupFinished"
]
```

