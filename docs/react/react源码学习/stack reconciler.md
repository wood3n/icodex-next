---
title: stack reconciler
---

## 专有名词

### renderer - 渲染器

`renderer`也就是渲染器的意思。React 最初只是服务于 DOM，但是这之后被改编成也能同时支持原生平台的 [React Native](https://reactnative.dev/)。因此，在 React 内部机制中引入了`renderer`这个概念。

`renderer`在浏览器中对应 ReactDOM API，负责将 React 组件渲染成 DOM。

### reconcilers

`reconcilers`翻译过来是协调器的意思，其实就是负责找出 React virtual dom 更新的部分，尽可能复用现有实例来保留 DOM 和状态，以及如何协调`renderer`去处理该部分更新。

`reconcilers`主要执行的是 Virtual DOM 的 diff 算法，找到更新过程中变化的组件。

不同平台上的`renderer`共享一致的`reconciler`。

### stack reconciler

`stack reconciler`是 React 15 及之前版本更新调度的实现。

### fiber reconciler

`fiber reconciler`是 React 16 及之后版本更新调度的实现。

### virtual dom

`virtual dom`也就是虚拟 DOM，本质上就是 React 程序执行过程中在内存中产生的一个对象。

## stack reconciler

> [实现说明 – React (reactjs.org)](https://zh-hans.reactjs.org/docs/implementation-notes.html)

### 挂载阶段

React 程序的入口一般是`index.js`下的`ReactDOM.render(<App />, document.getElementById('root'))`这段代码，而 JSX 的标记在编译过后会转换成`React.createElement(type, props, ...children)`这个方法，实际上是下面这样：

```js
ReactDOM.render(React.createElement(App), document.getElementById('root'));
```

当首次执行`ReactDOM.render`，React DOM 作为`renderer`会将`App`传递给`reconciler`，`reconciler`会根据`type`判断该组件是一个函数、类或者宿主组件（原生 HTML 标记，如`<div>`），去选择执行不同的操作获取渲染的元素，这个过程会递归渲染所有子元素，并最终形成一个 virtual dom tree.

```js
// 实例化组件
function instantiateComponent(element) {
  const type = element.type;
  if (typeof type === 'function') {
    // 自定义组件
    return new CompositeComponent(element);
  } else if (typeof type === 'string') {
    // 宿主元素
    return new DOMComponent(element);
  }
}

// 相当于ReactDOM.render
function mountTree(element, containerNode) {
  // 创建顶层内部实例
  const rootComponent = instantiateComponent(element);

  // 挂载顶层组件到容器中
  const node = rootComponent.mount();
  containerNode.appendChild(node);

  // 返回它提供的公共实例
  const publicInstance = rootComponent.getPublicInstance();
  return publicInstance;
}

mountTree(<App />, document.getElementById('root'));
```

#### 自定义组件

如果是用户定义的组件，`reconciler`会创建一个`CompositeComponent`类型的实例，实例上保存了当前组件必要的信息，以及挂载、更新等方法。

这里还会根据原型上是否具有`isReactComponent`这个属性来区分函数组件和`class`组件，如果是函数组件则直接调用组件函数，如果是类组件则`new`一个组件实例出来，并执行实例上的生命周期方法。

```js
class CompositeComponent {
  constructor(element) {
    // 当前组件
    this.currentElement = element;
    // 当前组件渲染的子组件元素
    this.renderedComponent = null;
    // 当前组件实例
    this.publicInstance = null;
  }

  getPublicInstance() {
    // 对于组合组件，公共类实例
    return this.publicInstance;
  }

  mount() {
    const element = this.currentElement;
    const type = element.type;
    const props = element.props;

    let publicInstance, renderedElement;
    if (isClass(type)) {
      // 类组件
      publicInstance = new type(props);
      // 设置 props
      publicInstance.props = props;
      // 如果有生命周期方法就调用
      if (publicInstance.componentWillMount) {
        publicInstance.componentWillMount();
      }
      // 获取组件返回的元素
      renderedElement = publicInstance.render();
    } else if (typeof type === 'function') {
      // 函数组件
      publicInstance = null;
      renderedElement = type(props);
    }

    // 保存公共实例
    this.publicInstance = publicInstance;

    // 根据元素实例化子内部实例。
    // <div /> 或者 <p /> 是 DOMComponent，
    // 而 <App /> 或者 <Button /> 是 CompositeComponent。
    const renderedComponent = instantiateComponent(renderedElement);
    this.renderedComponent = renderedComponent;

    // 递归挂载渲染后的输出
    return renderedComponent.mount();
  }
}
```

#### 宿主元素

对于 HTML 存在的宿主元素，例如`<div>`等，会创建`DOMComponent`的实例，属性和方法和上面类似

```js
class DOMComponent {
  constructor(element) {
    // 当前组件
    this.currentElement = element;
    this.renderedChildren = [];
    // 当前组件渲染的 DOM 节点
    this.node = null;
  }

  getPublicInstance() {
    // 对于 DOM 组件，只公共 DOM 节点
    return this.node;
  }

  mount() {
    const element = this.currentElement;
    const type = element.type;
    const props = element.props;
    const children = props.children || [];
    if (!Array.isArray(children)) {
      children = [children];
    }

    // 创建并保存节点
    const node = document.createElement(type);
    this.node = node;

    // 设置属性
    Object.keys(props).forEach(propName => {
      if (propName !== 'children') {
        node.setAttribute(propName, props[propName]);
      }
    });

    // 创建并保存包含的子项
    // 他们每个都可以是 DOMComponent 或者是 CompositeComponent，
    // 取决于类型是字符串还是函数
    const renderedChildren = children.map(instantiateComponent);
    this.renderedChildren = renderedChildren;

    // 收集他们在 mount 上返回的节点
    const childNodes = renderedChildren.map(child => child.mount());
    childNodes.forEach(childNode => node.appendChild(childNode));

    // DOM 节点作为挂载结果返回
    return node;
  }
}
```

### 卸载阶段

组件卸载也是一个递归的过程，从当前组件开始递归卸载子组件。

```js
class CompositeComponent {
  // ...

  unmount() {
    // 如果有生命周期方法就调用
    const publicInstance = this.publicInstance;
    if (publicInstance) {
      if (publicInstance.componentWillUnmount) {
        publicInstance.componentWillUnmount();
      }
    }

    // 卸载子组件
    const renderedComponent = this.renderedComponent;
    renderedComponent.unmount();
  }
}
```

### 更新阶段

#### diff 算法

在上述过程说到`reconciler`会创建一棵 virtual dom tree，当`state`或者`props`更新的时候，从组件获取的元素可能发生变化，React 需要对两个不同的 dom 元素进行对比以确定需要更新的部分。

React 基于**两个假设**的前提提出了一种高效的更新算法：

- 两个不同类型的元素会产生出不同的 dom tree；
- 开发者可以通过设置 `key` 属性，来告知渲染哪些子元素在不同的渲染下可以保存不变

在这两个基础假设的前提下，执行 diff 算法，首先会对比更新元素的`type`，当类型发生变化时，从当前元素到所有子元素全部卸载重建，状态也会被销毁，如果是类组件会执行卸载的生命周期方法。

```html
<div>
  <Counter />
</div>

// 更新后
<span>
  <Counter />
</span>
```

如果当前元素类型没有改变，第二步开始对比它们的`props`属性，选择仅更新发生改变的属性。

```jsx | pure
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

当前节点对比完以后如果存在子元素，则会递归对比子元素。由于子元素可能存在多个，当存在多个子元素时，React 会同时遍历子元素的列表，因此这里引入了`key`来标记子元素。

在上述第二个假设的前提下，当`key`发生变化的时候，就表示当前子元素发生变化，如果不变则服用当前子元素实例，这样来提高 diff 算法的效率。

```jsx | pure
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

这里有个需要注意的点是，对于会发生重新排序，删除，新增等情况的时候，禁止使用数组下标作为`key`，因为这样生成的`key`在这些情况下都会发生变化，**不稳定的`key`会导致许多组件实例和 DOM 节点被不必要地重新创建，这可能导致性能下降和子组件中的状态丢失**。

#### 执行更新

上面简单介绍了 diff 算法的过程，而在`CompositeComponent`和`DOMComponent`内部具有`receive`方法，其接收`state`或者`props`更新以后返回的新的组件元素作为参数，并进行 diff

```js
class CompositeComponent {
  receive(nextElement) {
    const prevRenderedComponent = this.renderedComponent;

    // 找当前元素下一次更新输出的元素
    let nextRenderedElement;
    if (isClass(type)) {
      // 类组件
      // 如果有生命周期方法就调用
      if (publicInstance.componentWillUpdate) {
        publicInstance.componentWillUpdate(nextProps);
      }
      // 更新 props
      publicInstance.props = nextProps;
      // 重新渲染
      nextRenderedElement = publicInstance.render();
    } else if (typeof type === 'function') {
      // 函数组件
      nextRenderedElement = type(nextProps);
    }

    // 如果渲染元素的 type 没有更改，重用已经存在组件实例并退出。
    if (prevRenderedElement.type === nextRenderedElement.type) {
      prevRenderedComponent.receive(nextRenderedElement);
      return;
    }

    // 如果渲染的元素 type 发生改变，则递归卸载当前元素及其子元素
    prevRenderedComponent.unmount();
    // 获取新的元素
    const nextRenderedComponent = instantiateComponent(nextRenderedElement);
    // 替换子组件的引用
    this.renderedComponent = nextRenderedComponent;
  }
}
```

如果是宿主元素，对应实际的 DOM 元素，所以会创建更新 DOM 的队列，进行批量 DOM 操作

```js
class DOMComponent {
  receive(nextElement) {
    // 当我们迭代子组件时，我们将向数组添加相应操作。
    const operationQueue = [];
    const nextRenderedChildren = [];
    const nextChildren = nextElement.props.children || [];

    // 递归处理子元素
    for (var i = 0; i < nextChildren.length; i++) {
      // 尝试去获取此子组件现有的内部实例
      const prevChild = this.renderedChildren[i];

      // 如果此索引下没有内部实例，则创建新的内部实例,挂载它,并使用其节点。
      if (!prevChild) {
        const nextChild = instantiateComponent(nextChildren[i]);
        const node = nextChild.mount();

        // 记录我们需要追加的节点
        operationQueue.push({ type: 'ADD', node });
        nextRenderedChildren.push(nextChild);
        continue;
      }

      // 类型不同，卸载当前子元素并替换成新的子元素
      if (prevChild.type !== nextChildren[i].type) {
        var prevNode = prevChild.getHostNode();
        prevChild.unmount();

        const nextChild = instantiateComponent(nextChildren[i]);
        const nextNode = nextChild.mount();

        // 记录我们需要替换的节点
        operationQueue.push({ type: 'REPLACE', prevNode, nextNode });
        nextRenderedChildren.push(nextChild);
        continue;
      }
    }

    // 批量操作 DOM
    while (operationQueue.length > 0) {
      var operation = operationQueue.shift();
      switch (operation.type) {
        case 'ADD':
          this.node.appendChild(operation.node);
          break;
        case 'REPLACE':
          this.node.replaceChild(operation.nextNode, operation.prevNode);
          break;
        case 'REMOVE':
          this.node.removeChild(operation.node);
          break;
      }
    }
  }
}
```

### 缺陷

从`stack reconciler`的伪代码介绍可以看出最后执行 DOM 更新的过程是一个队列遍历的过程，会对所有产生的更新一次性完成，这就导致在存在大量节点更新的时候，这个过程会异常耗时，进而阻塞页面渲染，导致更新过程的页面卡顿。同时，这个过程没有优先级区分，也不可中断。