---
title: electron 开发问题
slug: /electron1
---

## eletron+vite开发遇到的问题

1. `electron`下载[镜像地址修改](https://www.electronjs.org/zh/docs/latest/tutorial/installation#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%95%9C%E5%83%8F%E5%92%8C%E7%BC%93%E5%AD%98)
2. 使用 nodejs 开启 electron main 进程的方式

```js
const electronPath = require('electron');
const { spawn } = require('child_process');

// 这个 . 的路径也就是 main.js 的路径

```

或者借助开源工具[catdad/electronmon](https://github.com/catdad/electronmon)，这个开源工具还会检测`main.js`的变化自动重启`electron`

2. vite 打包的 esmodule 语法`<script type="module">`不支持`electron`的`File`协议，使用`vite-plugin-singleFile`将打包产物内联到 HTML 中；

3. web 内部访问 electron 的 api，例如[关闭窗口](https://www.electronjs.org/docs/latest/api/browser-window#winclose)等，需要借助[`electron-preload`](https://www.electronjs.org/docs/latest/tutorial/tutorial-preload)线程间通信的机制

4. [无边框拖拽](https://www.electronjs.org/docs/latest/tutorial/window-customization#set-custom-draggable-region)

5. 拖拽区域右键会显示系统菜单解决方法 —— https://github.com/electron/electron/issues/26726#issuecomment-1143199775

6. 如何处理`File`协议和`HTTP`协议的冲突，本以为`electron`在生产环境使用`File`协议加载本地文件会在 HTTP 请求的时候限制跨域，实际上只要在`axios`这种 ajax 工具内部设置请求 URL 的`baseUrl`，在请求的时候串接完整的 URL 就可以直接发起 HTTP 请求

7. `electron-builder`打包遇到下载错误的问题，一般需要这三个包：
   - [winCodeSign](https://github.com/electron-userland/electron-builder-binaries/releases/tag/winCodeSign-2.6.0)
   - [nsis-3.0.5.0](https://github.com/electron-userland/electron-builder-binaries/releases/tag/nsis-3.0.5.0)
   - [nsis-resources-3.4.1](https://github.com/electron-userland/electron-builder-binaries/releases/tag/nsis-resources-3.4.1)

下载下来放在本地`%LOCALAPPDATA%\electron-builder\Cache`这个目录下并解压
