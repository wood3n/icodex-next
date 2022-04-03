---
title: ReactDOM-render渲染过程
slug: /reactdom-render
---

## ReactDOM.render API用法

> `ReactDOM.render(element, container[, callback])`

`ReactDOM.render`API，在指定 DOM 元素 `container` 里渲染一个 React 元素，`class`组件会返回组件实例，函数组件返回`null`。

首次调用`ReactDOM.render`时，会清空 DOM 元素，将 React 组件渲染进去；后续调用则会使用 DOM diffing 算法进行更新。

## JSX 和 createElement

`JSX`本质上是编写代码时的语法糖，经过 babel 等编译工具最终转换成`React.createElement(component, props, ...children)`的函数调用形式。

例如：

```jsx
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

编译为：

```js
React.createElement(
  MyButton,
  { color: 'blue', shadowSize: 2 },
  'Click Me'
)
```

`React.createElement`会生成一个`React`元素，下面来看看其内部逻辑。

## 使用 createElement 创建 React 元素

创建一个`React`元素主要分为以下几步

### 校验组件类型

`createElement` 在`React`内部对应 `createElementWithValidation(type, props, children)`方法，首先会校验组件参数`type`，对于函数组件来说，`type = function`

```js
/**
 * React.createElement
 */
function createElementWithValidation(type, props, children) {
  // 校验组件
  var validType = isValidElementType(type);
  
  // 创建 React 元素
  var element = createElement.apply(this, arguments);
  
  // 校验子组件 key 值
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  // 根据 propTypes 校验组件 props
  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }
  
  return element;
}
```

`isValidElementType`主要通过组件本身的类型，或者组件的`$$typeof`属性来判断其类型。

```js
var hasSymbol = typeof Symbol === "function" && Symbol.for;

// 以下 React 组件类型使用 16 进制标记
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 0xeacb;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol
? Symbol.for("react.concurrent_mode")
: 0xeacf;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 0xead2;
var REACT_STRICT_MODE_TYPE = hasSymbol
? Symbol.for("react.strict_mode")
: 0xeacc;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol
? Symbol.for("react.suspense_list")
: 0xead8;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 0xead4;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 0xead3;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 0xeace;
var REACT_FORWARD_REF_TYPE = hasSymbol
? Symbol.for("react.forward_ref")
: 0xead0;
var REACT_FUNDAMENTAL_TYPE = hasSymbol
? Symbol.for("react.fundamental")
: 0xead5;

function isValidElementType(type) {
  return (
    typeof type === "string" ||
    typeof type === "function" ||
    type === REACT_FRAGMENT_TYPE ||
    type === REACT_CONCURRENT_MODE_TYPE ||
    type === REACT_PROFILER_TYPE ||
    type === REACT_STRICT_MODE_TYPE ||
    type === REACT_SUSPENSE_TYPE ||
    type === REACT_SUSPENSE_LIST_TYPE ||
    (typeof type === "object" &&
     type !== null &&
     (type.$$typeof === REACT_LAZY_TYPE ||
      type.$$typeof === REACT_MEMO_TYPE ||
      type.$$typeof === REACT_PROVIDER_TYPE ||
      type.$$typeof === REACT_CONTEXT_TYPE ||
      type.$$typeof === REACT_FORWARD_REF_TYPE ||
      type.$$typeof === REACT_FUNDAMENTAL_TYPE ||
      type.$$typeof === REACT_RESPONDER_TYPE ||
      type.$$typeof === REACT_SCOPE_TYPE))
  );
}
```

###工厂方法创建React元素对象

然后调用`createElement`创建`React.Element`元素，这里会遍历组件`props`所有可枚举属性, 并且过滤掉 `key`，`ref `等`React`禁止访问的属性，并且把所有子组件也挂载到`props.children`属性上。

然后还会根据`defaultProps`处理`props`默认值的情况。

```js
/**
 * React 内部保留的 props 属性,外界无法访问
 */
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

function createElement(type, config, children) {
  // 组件的 props
  var props = {};
  // props 的 key
  var key = null;
  // ref
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    // 遍历对象所有可枚举属性, 除 Symbol 外, 过滤掉 key, ref 等组件内部保留的 props 属性
    for (propName in config) {
      if (
        Object.prototype.hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // 将所有子元素挂载到 props 对象内部，并且不允许修改子元素数组
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }

    props.children = childArray;
  }

  // 根据 defaultProps 处理 props 内部属性的默认值
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;

    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  // 使用工厂函数创建 React 元素
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    // 当前元素归属的上层父元素，对于根元素来说，这个值为 null
    ReactCurrentOwner.current,
    props
  );
}
```

这里用了一个工厂函数来包装元素对象，不需要使用`new`来调用，生成的元素包含`$$typeof`属性，用来判断组件类型。

```js
// react 元素类型
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 0xeac7;

var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // 用来判断一个组件是否是 React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // 元素本身，函数组件就是该函数
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner,
  };

  // 禁止修改元素本身以及它的 props
  if (Object.freeze) {
    Object.freeze(element.props);
    Object.freeze(element);
  }
  
  return element;
}
```

###校验列表子元素 key 值

对于相同列表的子元素，需要校验`key`是否传递

```js
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }

  warning$1(
    false,
    'Each child in a list should have a unique "key" prop.' +
    "%s%s See https://fb.me/react-warning-keys for more information.",
    currentComponentErrorInfo,
    childOwner
  );
}
```

### 校验props类型

大致过程就是遍历`propTypes`定义的类型和`props`对应属性值比较；对于 TS 来说，这步没啥用。

```js
function validatePropTypes(element) { 
  var propTypes;
  if (typeof type === "function") {
    propTypes = type.propTypes;
  } else if (
    typeof type === "object" &&
    (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
     // Inner props are checked in the reconciler.
     type.$$typeof === REACT_MEMO_TYPE)
  ) {
    propTypes = type.propTypes;
  } else {
    return;
  }

  if (propTypes) {
    checkPropTypes(
      propTypes,
      element.props,
    )
  }
}

function checkPropTypes(typeSpecs, values) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      //...
    }
  }
}
```

## ReactDOM.render(element, container)

### 创建 fiberRoot 节点

`ReactDOM.render`使用的是`legacy`模式渲染组件树，其内部执行`legacy`开头的方法调用栈：

> `legacyRenderSubtreeIntoContainer` -> `legacyCreateRootFromDOMContainer` -> `createLegacyRoot`

`createLegacyRoot`使用`legacy`模式创建`ReactDOMBlockingRoot`类型的对象，该对象具有一个`_internalRoot`属性，该属性实际指向`Fiber`树的根节点对象`FiberRootNode`.

```js
/**
 * ReactDOM.render
 * 当首次调用时，容器节点里的所有 DOM 元素都会被替换，后续的调用则会使用 React 的 DOM diff 进行更新
 * @param {*} element 组件元素
 * @param {*} container DOM 容器
 * @param {*} callback 渲染完组件或者后续更新完组件之后调用的回调函数
 * @returns 渲染渲染完的组件
 */
function render(element, container, callback) {
  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback
  );
}

function legacyRenderSubtreeIntoContainer() {
  var root = container._reactRootContainer;
  var fiberRoot;
  
  if (!root) {
    // 将 DOM 的 _reactRootContainer 属性关联起来
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate
    );
    
    // 创建 fiberRoot，指向一个 FiberRootNode 类型的对象
    fiberRoot = root._internalRoot;
  }
}

function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  return createLegacyRoot(
    container,
    shouldHydrate
    ? {
      hydrate: true,
    }
    : undefined
  );
}

var LegacyRoot = 0;
var BlockingRoot = 1;
var ConcurrentRoot = 2;

/**
 * 这里传入标记 LegacyRoot 表示使用 legacy 渲染模式
 */
function createLegacyRoot(container, options) {
  return new ReactDOMBlockingRoot(container, LegacyRoot, options);
}

function ReactDOMBlockingRoot(container, tag, options) {
  this._internalRoot = createRootImpl(container, tag, options);
}
```

`createRootImpl`经过以下函数调用栈来创建一个`FiberRootNode`对象

> `createRootImpl` -> `createContainer` -> `createFiberRoot` -> `new FiberRootNode`

```js
function createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks) {
  // 创建 FiberRootNode
  var root = new FiberRootNode(containerInfo, tag, hydrate);
  //...
}

/**
 * 创建 Fiber 根节点
 * @param {*} containerInfo 容器 DOM 元素
 * @param {*} tag 对应不同的渲染模式 LegacyRoot = 0; BlockingRoot = 1; ConcurrentRoot = 2;
 * @param {*} hydrate 是否 SSR
 */
function FiberRootNode(containerInfo, tag, hydrate) {
  // 渲染模式
  this.tag = tag;
  this.current = null;
  // 容器元素 DOM
  this.containerInfo = containerInfo;
  this.pendingChildren = null;
  this.pingCache = null;
  this.finishedExpirationTime = NoWork; // var NoWork = 0;
  this.finishedWork = null;
  this.timeoutHandle = noTimeout;				// var noTimeout = -1
  this.context = null;
  this.pendingContext = null;
  this.hydrate = hydrate;
  this.callbackNode = null;
  this.callbackPriority = NoPriority;		// var NoPriority = 90;
  this.firstPendingTime = NoWork;
  this.firstSuspendedTime = NoWork;
  this.lastSuspendedTime = NoWork;
  this.nextKnownPendingLevel = NoWork;
  this.lastPingedTime = NoWork;
  this.lastExpiredTime = NoWork;

  // true
  if (enableSchedulerTracing) {
    // 从 1 开始叠加
    this.interactionThreadID = unstable_getThreadID();
    this.memoizedInteractions = new Set();
    this.pendingInteractionMap = new Map();
  }

  // false
  if (enableSuspenseCallback) {
    this.hydrationCallbacks = null;
  }
}

var threadIDCounter = 0;
function unstable_getThreadID() {
  // 先加 1 再返回
  return ++threadIDCounter;
}
```

创建`FiberRootNode`对象以后，需要再通过以下调用栈初始化一个`HostRoot`类型`FiberNode`的对象。这里会判断不同的[渲染模式](https://zh-hans.reactjs.org/docs/concurrent-mode-adoption.html#migration-step-blocking-mode)，不同的渲染模式得到的`FiberNode`节点的`tag`属性不同。

> `createHostRootFiber` -> `createFiber` -> `new FiberNode`

```js
var LegacyRoot = 0;
var BlockingRoot = 1;
var ConcurrentRoot = 2;
var HostRoot = 3;

var NoMode = 0;
var StrictMode = 1; 
var BlockingMode = 2;
var ConcurrentMode = 4;

function createHostRootFiber(tag) {
  var mode;
	
  // 判断渲染模式：https://zh-hans.reactjs.org/docs/concurrent-mode-adoption.html#migration-step-blocking-mode
  // 使用 ReactDOM.render 时 tag = LegacyRoot，所以 mode = NoMode = 0
  if (tag === ConcurrentRoot) {
    mode = ConcurrentMode | BlockingMode | StrictMode;
  } else if (tag === BlockingRoot) {
    mode = BlockingMode | StrictMode;
  } else {
    mode = NoMode;
  }

  // false
  if (enableProfilerTimer && isDevToolsPresent) {
    mode |= ProfileMode;
  }
	
  // 这里传入 HostRoot 来创建 HostRootFiber 对象
  return createFiber(HostRoot, null, null, mode);
}

// tag = 3, mode = 0
var createFiber = function (tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
};
```

一个`FiberNode`类型的对象具有以下属性

```js
function FiberNode(tag, pendingProps, key, mode) {
  // Fiber 节点类型，对于上面的 HostRootFiber，这里就是 HostRoot = 3
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  // 指向 FiberRootNode
  this.stateNode = null; // Fiber
	
  // 指向父节点
  this.return = null;
  // 子节点
  this.child = null;
  // 兄弟节点
  this.sibling = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;
  this.mode = mode; // Effects

  // 副作用标记值，react 把不能在 render 期间完成的任务标记为有副作用，见下面标记类型
  this.effectTag = NoEffect;					//   var NoEffect = 0
  this.nextEffect = null;
  this.firstEffect = null;
  this.lastEffect = null;
  this.expirationTime = NoWork;
  this.childExpirationTime = NoWork;	// var NoWork = 0;
  this.alternate = null;
}

// 副作用 effectTag，使用二进制数进行标记
var NoEffect = 0;
var PerformedWork = 1; // You can change the rest (and add more).

var Placement = 2;
var Update = 4;
var PlacementAndUpdate = 6;
var Deletion = 8;
var ContentReset = 16;
var Callback = 32;
var DidCapture = 64;
var Ref = 128;
var Snapshot = 256;
var Passive = 512;
var Hydrating = 1024;
var HydratingAndUpdate = 1028; // Passive & Update & Callback & Ref & Snapshot

var LifecycleEffectMask = 932; // Union of all host effects

var HostEffectMask = 2047;
var Incomplete = 2048;
var ShouldCapture = 4096;
```

创建完`FiberRootNode`和`HostRoot`以后，他们之间通过各自的属性关联起来；`FiberRootNode`具有一个`current`属性，指向`HostRoot`节点对象；同时`HostRoot`对象有一个`stateNode`属性，指向`FiberRootNode`类型节点。

```js
// 创建 FiberRootNode
var root = new FiberRootNode(containerInfo, tag, hydrate);
// 创建 HostRoot 类型的 FiberNode
var uninitializedFiber = createHostRootFiber(tag);
// 通过 current 和 stateNode 属性相互关联
root.current = uninitializedFiber;
uninitializedFiber.stateNode = root;
```

