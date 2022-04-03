---
tltle: webpack监听代理地址修改自动重启devServer
authors: oxygen
---

![image-20220105213328676](../public/images/image-20220105213328676.png)

本文介绍解决监听开发环境代理地址更改后自动重启`webpack-dev-server`的问题。

<!--truncate-->

## 背景

日常开发经常遇到的一个问题是切换 webpack 的`proxy`地址，需要重启`webpack-dev-server`或者另开一个终端去创建一个新的`webpack-dev-server`实例。

为了简化这个变态的过程，于是探索借助`chokidar`监听系统文件的能力，来监听`proxy`配置文件的修改并配合`webpack-dev-server`的 Nodejs  API达到自动重启的目的。

## 什么是chokidar

[chokidar](https://github.com/paulmillr/chokidar) 是一个基于 Nodejs 的`fs`模块开发的监听文件的工具，跨平台，同时解决了`fs`模块提供的原生方法`fs.watch`和`fs.watchFile`的不足。

### fs.watchFile

`fs.watchFile(filename[, options], listener)`用来监听单个文件的变化，其采用轮询的方法，可以指定`interval`设置轮询时间间隔，默认是`5007ms`，并且当文件被访问就会触发回调函数`listener`。

`fs.watchFile`的主要问题在于采用轮询的方式导致监听不精确，并且 CPU 占用高。

### fs.watch

`fs.watch(filename[, options][, listener])`可以监听单个文件或者文件夹，可以通过`eventType`指定监听文件命名或者修改文件内容导致的变化，但是`fs.watch` API 跨平台并非 100% 一致，并且在某些情况下不可用，至于什么情况下不可用，官方文档也没解释。在 Windows 上，如果监视目录被移动或重命名，则不会触发任何事件。

### chokidar.watch(paths, [options])

chokidar 解决了`fs.watch`和`fs.watchFile`的不足，并且 API 简单易用且监听效率更加高效，使得 vscode 内部的监听文件也使用了这个工具。

## API

### 配置项

```js
chokidar.watch('file', {
  // 是否持久化触发监听事件
  persistent: true,
  // 忽略监听的文件
  ignored: '*.txt',
  // 当设置为false时候，在 chokidar 初始化完成之前新增文件或者文件夹也会触发 add 和 addDir事件
  ignoreInitial: false,
  // 当设置成 false 时，只有 symlink 本身会被观察到变化，而不是跟随链接引用和冒泡事件通过链接的路径
  followSymlinks: true,
  // 监听文件或者文件夹的相对根目录
  cwd: '.',
  // 当设置成 true 的时候，会忽略 glob 模式的path设置，把它们当成文件名的一部分
  disableGlobbing: false,
	// 当设置成 false，使用 fs.watchFile 或者 fs.watch 监听文件
  usePolling: false,
    // 针对 fs.watchFile 设置的轮询间隔
    interval: 100,
    binaryInterval: 300,
  alwaysStat: false,
  // 设置多少层的子文件目录会被递归监听
  depth: 99,
  // 默认情况下，add事件将在文件首次出现在磁盘上时触发，此时还没有写入整个文件。此外，在某些情况下，在写入文件时将触发一些更改事件。在某些情况下，特别是在监视大文件时，将需要等待写操作完成，然后才能响应文件的创建或修改。将awaitWriteFinish设置为true(或true值)将轮询文件大小，保持其添加和更改事件，直到大小在可配置的时间内不变。适当的持续时间设置在很大程度上依赖于操作系统和硬件。为了准确的检测，这个参数应该相对较高，使得文件监视的响应更少。谨慎使用。
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  },
	// 指示是否监视没有读权限的文件
  ignorePermissionErrors: false,
  // 监听更为细节的控制，如果一个文件在被删除后的100毫秒内被重新添加，Chokidar会发出一个change事件，而不是unlink然后添加。如果默认的100毫秒不适合你，可以通过设置一个自定义值来覆盖它，以毫秒为单位。
  atomic: true
});
```

### 监听事件

`chokidar.watch`返回一个对象，可以使用该对象的`.on(event, callback)`方法设置监听事件`event`和回调函数`callback`，`event`类型如下：

- `add`：新增文件
- `addDir`：新增文件夹
- `change`：文件内容变化
- `unlink`：删除文件
- `unlink`：删除文件夹
- `ready`：扫描文件或文件夹结束，开始监听
- `error`：监听程序报错

## WDS 的 Nodejs API

`webpack-dev-server`提供 [Nodejs 的 API](https://webpack.js.org/api/webpack-dev-server/)，也就几个：

- `start`：启动 WDS；
- `startCallback`：启动并指定启动完的回调；
- `stop`：停止 WDS；
- `stopCallback`：停止并指定停止后的回调】

### 实现思路

在 WDS 提供的 Nodejs API 的基础上，我们利用`startCallback`回调注册`chokidar`监听文件的程序，当检测到`proxy`配置的文件变化后，`stop` WDS 并重启一个新的 WDS 实例。

```js
// server.js
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');
const proxy = require('./proxyConfig');
const chokidar = require('chokidar');

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer({
  ...webpackConfig.devServer,
  proxy
}, compiler);

function createServer() {
  const server = new WebpackDevServer({
    ...webpackConfig.devServer,
    proxy
  }, compiler);

  server.startCallback(() => {
    const watcher = chokidar.watch('./proxyConfig.js').on('change', () => {
      console.log("checked dev-server proxy changes, restarting server");
      server.stopCallback(() => {
        watcher.close();
        createServer();
      });
    });
  });
}

createServer();
```

```js
// proxyConfig.js
module.exports = {
  "/api": {
    target: "http://127.0.0.2"
  }
}
```

然后开发环境的情况下使用我们的`server.js`程序替代 webpack 的 cli 命令，即`node server.js`，这样就可以了。

![image-20220105224129440](../public/images/image-20220105224129440.png)