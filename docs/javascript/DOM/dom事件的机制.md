## DOM 事件的捕获和冒泡机制

图源 - [w3 - events](https://www.w3.org/TR/2003/NOTE-DOM-Level-3-Events-20031107/events.html)

![image](../../../public/images/129870638-e1cfaf60-c41e-4243-8cb7-d71a88958134.png)

### 捕获阶段（capture）

根据 w3 规范中的描述，DOM 事件在触发过程是从根元素开始调度，直到到达目标事件元素。在这个过程中会发生捕获，触发，冒泡三个阶段。
捕获阶段中，DOM 事件会从根元素`html`开始，检测其是否具有相同的事件监听机制，例如在内部`div`上设置的`onClick`事件，如果在`html`上也设置了，那么同样会涉及调度。
这个过程会从`html`开始逐层向目标事件元素的祖先元素调度，直到到达目标事件元素。

### 触发阶段

在到达目标元素以后，会触发目标元素的监听函数调用。

### 冒泡阶段（bubble）

冒泡阶段则是从目标事件元素开始，按照 DOM 树的结构，从里向外调度的过程，直到回到根元素`html`上。
在现代浏览器中，所有事件的注册都默认会执行冒泡过程。当然了，如果在事件注册时设置禁止冒泡的选项，这个冒泡过程就不会发生。
可以通过事件对象的实例属性[Event.bubbles](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles)来判断事件是否处于冒泡阶段。

### currentTarget vs target

事件接口对象`Event`上存在两种目标对象：[target](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)和[currentTarget](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget)；在了解了事件的捕获和冒泡阶段后就能区分这两种对象：

- `target`：指向实际触发事件的元素
- `currentTarget`：指向`addEventListener`添加事件时绑定的元素

用事件委托可以清楚的解释这种区别，例如在`ul`设置事件监听子元素`li`

```js
const ul = document.createElement("ul");
document.body.appendChild(ul);

const li1 = document.createElement("li");
const li2 = document.createElement("li");
ul.appendChild(li1);
ul.appendChild(li2);

function hide(evt) {
  // evt.target 指向 <li> 
  // 而 evt.currentTarget 指向 <ul>
  evt.target.style.visibility = "hidden";
}

ul.addEventListener("click", hide, false);
```

## 事件注册

事件监听的注册方式具有以下几种方式：

### 元素的事件处理器属性

```javascript
const btn = document.querySelector('button');

btn.onclick = function() {
  const rndCol =
    'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
};
```

### addEventListener

可以直接在`document`上调用`addEventListener`，当然也可以在具体 DOM 元素上。`addEventListener`具有两种类型 API，主要区别在于方法传递的第三个参数类型

> target.addEventListener(type, listener, options);

- `type`：指定[事件类型](https://developer.mozilla.org/zh-CN/docs/Web/Events)的字符串
- `listener`：设置监听函数
- `options`：一个对象，可以指定以下属性

1. `capture`：默认`false`，表示 listener 是否会在该类型的事件捕获阶段传播到该 EventTarget 时触发；
2. `once`：默认`false`，表示 listener 在添加之后是否最多只调用一次；如果是 `true`， listener 会在其被调用之后自动移除；
3. `passive`：默认`false`，表示 listener 是否永远不会调用 preventDefault()。当设置为`true`时，如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。

根据规范，`passive` 选项的默认值始终为`false`。但是，这引入了移动端在处理某些触摸事件（以及其他）的事件监听器在尝试处理滚动时阻止浏览器的主线程的可能性，从而导致滚动处理期间性能可能大大降低。
为防止出现此问题，某些浏览器（特别是 Chrome 和 Firefox）已将文档级节点`Window`，`Document`和`Document.body`的`touchstart`和`touchmove`事件的`passive`选项的默认值更改为`true`。
这可以防止调用事件监听器，因此在用户滚动时无法阻止页面呈现，提升移动端的性能。见 - https://developers.google.com/web/updates/2016/06/passive-event-listeners

4. `signal`：一个[`AbortSignal`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal)对象，如果该对象的`abort()`方法被调用，则当前监听器也会被移除。
   `AbortSignal`可以中断事件监听器的响应，同时更有用的一个地方是在中断异步请求上，例如下方的`fetch`请求内部传递`signal`对象，当`abort()`被调用时，`fetch`会直接`reject`一个`AbortError`的异常。

```javascript
var controller = new AbortController();
var signal = controller.signal;

var downloadBtn = document.querySelector('.download');
var abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', function() {
  controller.abort();
  console.log('Download aborted');
});

function fetchVideo() {
  ...
  fetch(url, {signal}).then(function(response) {
    ...
  }).catch(function(e) {
    reports.textContent = 'Download error: ' + e.message;
  })
}
```

> target.addEventListener(type, listener, useCapture);

- `type`：指定[事件类型](https://developer.mozilla.org/zh-CN/docs/Web/Events)的字符串
- `listener`：设置监听函数
- `useCapture`：默认`false`。当一个元素嵌套了另一个元素，并且两个元素都对同一事件注册了一个处理函数时，所发生的事件冒泡和事件捕获是两种不同的事件传播方式。事件传播模式决定了元素以哪个顺序接收事件。对于事件目标上的事件监听器来说，事件会处于**目标阶段**，而不是冒泡阶段或者捕获阶段，所以`useCapture`无影响。而当父元素设置了`useCapture=true`的时候，仅在捕获阶段触发事件，见下面的例子：

```mdx-code-block
import Demo from '@/demo/domEvent';

<Demo />
```

### addEventListener vs onclick

绝大多数情况下都应该使用`addEventListener`来注册事件，这样做有以下优点：

- `addEventListener`方法提供的事件处理选项更加齐全，例如`addEventListener`的第三个参数`useCapture`支持处理捕获和冒泡期间的事件触发机制；
- 可以方便的使用`removeEventListener`移除事件处理程序
- `addEventListener`针对相同元素注册多个相同类型的事件，不会存在覆盖，而使用`onclick`等的形式，后续注册的回调函数会覆盖前面的方法。

```javascript
  var a = document.getElementById('a');
  a.onclick = doThing_1;		// 不会调用
  a.onclick = doThing_2;

  a.addEventListener('click', doThing_3);
  a.addEventListener('click', doThing_4);
```

但是`addEventListener`本身使用不当也会导致一些问题：

#### this 指向问题

ES6 以后引入的箭头函数和`class`语法；因此在`addEventListener`注册的回调函数需要分为三种情况：

- 如果是普通函数，则其内部`this`将始终指向 DOM 事件触发的目标元素；即使普通函数是作为对象的方法或者作为`class`中定义的方法被调用；

```javascript
const obj = {
  b: '测试',
  a() {
    console.log(this);
  },
};

document.getElementById('btn')?.addEventListener('click', obj.a);
```

- 如果是箭头函数，则指向箭头函数定义时的执行上下文。根据最新的 ES 规范的定义，[执行上下文](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts)可以分为全局执行上下文、模块执行上下文（ES Module）和函数执行上下文，那么箭头函数内部`this`也就是这两种情况。

下面的 DOM 事件回调函数定义在对象的方法中，但是对象是在全局环境中定义的，所以其内部`this`指向全局执行上下文，非严格模式下是`window`，严格模式下就是`undefined`

```javascript
// 在全局环境中定义
const obj = {
  b: '测试',
  a: () => {
    console.log(this); // undefined
  },
};

document.getElementById('btn')?.addEventListener('click', obj.a);
```

下面的 DOM 事件回调函数在对象的方法中定义，那么其内部`this`就是定义时的函数执行上下文中的`this`，也就是指向对象`obj`。

```javascript
// 在函数中定义
const obj = {
  b: '测试',
  a() {
    return () => {
      console.log(this); // obj
    };
  },
};

document.getElementById('btn')?.addEventListener('click', obj.a());
```

- 对于`class`内部定义的 DOM 回调函数，是使用 React class 组件开发中必须了解的问题。首先来说普通函数；

如果直接看`class`内部的`this`，根据面向对象的语法特点，`this`将指向实例对象；

但是普通函数内部的`this`是始终指向 DOM 事件触发的目标元素的，所以在普通函数内部要想通过`this`访问`class`内部的其他成员，这时候就必须改变普通函数内部的`this`指向，最常用的方法就是使用`bind`来实现，将普通函数内部`this`始终绑定到实例对象上。

```javascript
class P {
  a() {
    console.log(this); // DOM - btn
  }
}

const p = new P();

document.getElementById('btn')?.addEventListener('click', p.a);
```

如果使用箭头函数，那么将始终指向实例对象，也就是不存在`this`丢失的问题

```javascript
class P {
  a = () => {
    console.log(this); // 对象 p
  };
}

const p = new P();

document.getElementById('btn')?.addEventListener('click', p.a);
```

#### 内存问题

如果是单一的事件注册，一般可以直接在`addEventListener`中创建回调函数，但是对于大量元素注册相同事件的时候，就应该单独创建回调函数，将引用地址传递给`addEventListener`。

## 事件委托

事件委托简单来说就是将目标事件元素的监听器设置到其他元素上来达到事件监听的目的。

事件委托比较常见的情景就是大量列表元素`li`注册事件时委托在其父元素`ul`上去注册，这样里用事件冒泡阶段的处理去触发。

```html
<ul id="parent-list">
  <li id="post-1">Item 1</li>
  <li id="post-2">Item 2</li>
  <li id="post-3">Item 3</li>
  <li id="post-4">Item 4</li>
  <li id="post-5">Item 5</li>
  <li id="post-6">Item 6</li>
</ul>
```

```javascript
document.getElementById('parent-list').addEventListener('click', function(e) {
  // 判断事件触发的目标元素类型
  if (e.target && e.target.nodeName == 'LI') {
    console.log(
      'List item ',
      e.target.id.replace('post-', ''),
      ' was clicked!',
    );
  }
});
```

使用事件委托的好处在于以下几点：

- 简化事件注册并节省内存：无需为大量重复的 DOM 元素添加相同的处理函数；
- 更少的代码：添加或移除元素时，无需添加/移除处理程序。
