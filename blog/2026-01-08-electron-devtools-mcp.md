---
title: 在 electron 中使用 chrome-devtools-mcp
slug: electron-devtools-mcp
authors: ["oxygen"]
tags: ["electron", "chrome-devtools-mcp", "ai", "mcp"]
description: 介绍如何配置 chrome-devtools-mcp 并连接 electron 进行自动检查和调试
---

本文介绍在开发 electron 应用时如何使用 chrome-devtools-mcp，比较简单。

<!--truncate-->

## 安装 mcp

安装 chrome-devtools-mcp 比较简单，找到 GitHub 仓库，在 README 中能找到各种工具的安装方式，这里就不介绍了。

以 vscode 为例，推荐在项目目录下单独配置，避免多个项目之间配置无法共享。chrome-devtools-mcp 的基本配置如下：

```json
{
  "servers": {
    "chrome-devtools-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

## 配置 mcp 连接 electron

参考 chrome-devtools-mcp 中的文档 - [Manual connection using port forwarding](https://github.com/ChromeDevTools/chrome-devtools-mcp?tab=readme-ov-file#manual-connection-using-port-forwarding)，也就是通过 `--browser-url` 选项连接到正在运行的 Chrome 实例。适用于在沙箱环境中运行 MCP 服务器，且不允许启动新的 Chrome 实例。那 electron 就符合这种条件。

首先，我们需要在 chrome-devtools-mcp 配置中新增`--browser-url` 配置项，端口号随意

```json {10}
{
  "servers": {
    "chrome-devtools-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        // 加上这一个参数，端口号随意
        "--browser-url=http://127.0.0.1:9222"
      ]
    }
  }
}
```

然后在 electron 应用中增加以下开发环境配置来启动开发环境调试端口，端口号必须与你在 mcp 中`browser-url` 指定的端口号相同。

```typescript
import isDev from "electron-is-dev";

if (isDev) {
  // 启用远程调试端口
  app.commandLine.appendSwitch("remote-debugging-port", "9222");
  // 可选，开发环境数据隔离
  app.setPath("userData", join(app.getPath("appData"), `electron-mcp-dev`));
}
```

## 执行测试

就这么简单两步，接下来就能使用 chrome-devtools-mcp 执行你想做的任何自动测试了。

<iframe
  src="https://www.youtube.com/embed/BJxm06zCLl0"
  width="100%"
  height="400"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
