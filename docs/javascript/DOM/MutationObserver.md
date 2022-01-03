## MutationObserver

> [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

`MutationObserver`是用来监听 DOM 节点的变化的接口，使用`MutationObserver`观察一个 DOM 节点的方式只需要三步：

- 获取观察的节点
- 编写回调函数
- 创建`MutationObserver`对象并调用`observe`方法注册观察事件

```javascript
// 创建一个MutationObserver对象
function createMutationObserver(handler, targetNode, options) {
  const observer = new MutationObserver(handler);
  observer.observe(targetNode, options);
  return observer;
}

// 回调函数
function domChangeCall() {
  console.log('domchange:', arguments);
}
let observer = createMutationObserver(
  domChangeCall,
  document.getElementById('some-id'),
  {
    childList: true, // 观察目标子节点的变化，是否有添加或者删除
    attributes: true, // 观察属性变动
    subtree: true, // 观察后代节点，默认为 false
  },
);

// 取消监听
observer.disconnect();
```

使用`MutationObserver`的时候会注册回调函数，在浏览器的渲染进程监听到 DOM 变化需要重新渲染的时候，会将 DOM 变化信息传递给回调函数，并且封装成为一个微任务放进微任务队列中，微任务队列中的任务会等待任务队列中的任务执行完再去执行。