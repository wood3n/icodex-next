---
title: electron 开发问题
slug: /electron1
---

## eletron+vite开发遇到的问题

1. 使用 nodejs 开启 electron main 进程的方式

```js
const electronPath = require('electron');
const { spawn } = require('child_process');

// 这个 . 的路径也就是 main.js 的路径
const electronProcess = spawn(electronPath, ['.'], {
  env: {
    NODE_ENV: 'development',
    PORT: port,
  },
  cwd: process.cwd(),
  windowsHide: false,
});

electronProcess.on('spawn', () => {
  console.log('Start electron successfully!');
});

electronProcess.on('error', (err) => {
  console.error(`Failed to start electron process: ${err}`, err);
});

electronProcess.on('close', (code) => {
  electronProcess.kill();
  process.exit(code);
});
```

或者借助开源工具[catdad/electronmon](https://github.com/catdad/electronmon)，这个开源工具还会检测`main.js`的变化自动重启`electron`

2. vite 打包的 esmodule 语法`<script type="module">`不支持`electron`的`File`协议

3. web 内部访问 electron 的 api，例如[关闭窗口](https://www.electronjs.org/docs/latest/api/browser-window#winclose)等，需要借助[`electron-preload`线程间通信的机制](https://www.electronjs.org/docs/latest/tutorial/tutorial-preload)

4. [无边框拖拽](https://www.electronjs.org/docs/latest/tutorial/window-customization#set-custom-draggable-region)