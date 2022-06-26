## historyjs

[![npm version](https://badge.fury.io/js/history.svg?style=flat-square&logo=appveyor)](https://badge.fury.io/js/history)

[![GitHub stars](https://img.shields.io/github/stars/remix-run/history?style=flat-square)](https://github.com/remix-run/history/stargazers)

[![GitHub license](https://img.shields.io/github/license/remix-run/history?style=flat-square)](https://github.com/remix-run/history/blob/dev/LICENSE)

使用 ts 基于 HTML5 的 [History 接口方法](https://developer.mozilla.org/zh-CN/docs/Web/API/History#%E6%96%B9%E6%B3%95)开发，1k 行代码，非常 tiny。

## History API

```typescript
interface History {
  // 历史会话数目，包含当前页面
  readonly length: number;
  // 当前页面缓存的状态值，一个对象
  readonly state: any;
  // 获取或控制浏览器是否自动恢复页面滚动位置，默认 auto，也就是自动恢复
  scrollRestoration: ScrollRestoration;
  back(): void;
  forward(): void;
  go(delta?: number): void;
  pushState(data: any, unused: string, url?: string | URL | null): void;
  replaceState(data: any, unused: string, url?: string | URL | null): void;
}

// URL 接口属性
interface URL {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  toString(): string;
  readonly origin: string;
  password: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  readonly searchParams: URLSearchParams;
  username: string;
  toJSON(): string;
}

type ScrollRestoration = "auto" | "manual";
```

HTML5 定义的 History 接口包含以下属性：

- `history.state`表示当前页面携带的状态，刷新页面会丢失，不推荐使用
- `history.length`表示历史会话数目，包含当前页面
- `history.scrollRestoration`获取或者控制浏览器是否自动恢复页面滚动位置，这个值默认是`auto`，也就是会自动恢复，当设置成`manual`则表示需要用户自己手动恢复。

History 接口提供以下方法：

### history.pushState

`history.pushState`一共接收三个参数：

- `state`: 一个可序列化的对象，表示状态，大小限制`2MiB`，当发生浏览器导航也就是切换路由的时候，会触发`popstate`事件。
- `title`: 没啥用的参数，但是又不能不传，所以一般传空字符串。
- `url`：可选参数，一个新链接 url 字符串，或者 URL 类型的对象，同时必须和当前网页同源，如果未指定的话，则默认为当前网页的 url。

### history.replaceState

参数同上。

`replaceState`和`pushState`的区别就是`replace`会替换当前网页在浏览器的历史堆栈中的记录，也就是一旦替换完成将无法返回之前的页面，而`pushState`是在历史堆栈中新增一条记录。

### history.back

返回上一历史记录，也就是点击浏览器返回按钮的行为，等同于`history.go(-1)`。

### history.forward

前往下一条历史记录，也就是点击浏览器前进按钮的行为，等同于`history.go(1)`。

### history.go

前往相对于当前页面的指定索引的历史记录，当`number`越界的时候，这个方法或者上面的方法也不会报错。

## historyjs

`history`在 HTML5 history api 基础上做了以下改造：

- 使用`push`方法代替`pushState`方法
- 使用`replace`方法代替`replace`方法
- 注入`location`对象，包含当期页面 URL 的一些属性
- 注入`listen`方法，用于监听 URL 变化，当执行`push`，`replace`方法时会触发
- 注入`block`方法，用于在某些场景（例如用户页面数据未保存）下禁止用户跳转页面
- 注入`createHref`方法，用于创建用于`<a>`元素的`href`属性值，就是创建一段带`search`或者`hash`的 url 字符串

具体类型如下：

```typescript
interface History {
  readonly action: Action;
  readonly location: Location;
  createHref(to: To): string;
  push(to: To, state?: any): void;
  replace(to: To, state?: any): void;
  go(delta: number): void;
  back(): void;
  forward(): void;
  listen(listener: Listener): () => void;
  block(blocker: Blocker): () => void;
}

enum Action {
  Pop = "POP",
  Push = "PUSH",
  Replace = "REPLACE",
}

// push 或者 replace 的第一个参数，可以是字符串或者一个表示 url 的对象
export type To = string | Partial<Path>;

interface Path {
  pathname: string;
  search: string;
  hash: string;
}

interface Location extends Path {
  state: unknown;
  key: string;
}

// 监听路由跳转的回调函数
interface Listener {
  (update: Update): void;
}

interface Update {
  action: Action;
  location: Location;
}

interface Blocker {
  (tx: Transition): void;
}

interface Transition extends Update {
  retry(): void;
}
```

### history.push / history.replace

```typescript
history.push("/home");

// 带上状态
history.push("/home?the=query", { some: "state" });

// 传对象
history.push(
  {
    pathname: "/home",
    search: "?the=query",
  },
  {
    some: state,
  }
);
```

### history.listen

`listen`方法用来监听路由跳转，当调用`push`，`replace`,`go`,`back`,`forward`这些方法并发生页面跳转时，回调函数会被调用。同时，`listen`会返回一个用于取消监听的函数。

```js
const unlisten = history.listen(({ action, location }) => {
  // 路由跳转的时候调用
});

// 取消监听
unlisten();
```

`listen`方法内部逻辑比较简单，传递的回调函数去维护到一个数组中，当跳转完成后依次调用回调函数。

```typescript
function listen(listener) {
  return listeners.push(listener);
}

// 一个对象，包含回调函数的数组，会在路由跳转的时候依次调用
let listeners = createEvents<Listener>();
function createEvents<F extends Function>(): Events<F> {
  let handlers: F[] = [];

  return {
    get length() {
      return handlers.length;
    },
    // 添加新的回调函数
    push(fn: F) {
      handlers.push(fn);
      return function () {
        handlers = handlers.filter((handler) => handler !== fn);
      };
    },
   	// 依次调用数组中的回调函数
    call(arg) {
      handlers.forEach((fn) => fn && fn(arg));
    },
  };
}

function push(to: To, state?: any) {
  let nextAction = Action.Push;
  // ...

  // 如果允许跳转
  if (allowTx(nextAction, nextLocation, retry)) {
    // 先执行跳转
    history.pushState(historyState, "", url);

    applyTx(nextAction);
  }
}

// 传递 action 和跳转到的页面的 location 对象，依次调用监听回调函数
function applyTx(nextAction: Action) {
  action = nextAction;
  [index, location] = getIndexAndLocation();
  listeners.call({ action, location });
}
```

### history.block

`history.block`方法传递一个回调函数，在发生路由跳转的时候调用。同时，`block`方法也会返回一个函数，用于取消监听路由跳转。

```js
let unblock = history.block(({ action, location, retry }) => {
  
  let url = location.pathname;
  // 提醒用户是否执行跳转
  if (window.confirm(`Are you sure you want to go to ${url}?`)) {
    // 移除 block 函数
    unblock();

    // 再次执行跳转
    retry();
  }
});
```

`block`内部和`listen`一样使用`createEvents`维护了一个函数数组，同时会设置监听页面`beforeunload`函数。因为单页面应用利用`history`方法跳转页面并不会触发页面卸载等事件；而在用户手动刷新页面或者关闭浏览器标签页的时候又不会触发`history`监听队列，所以这里利用原生事件`beforeunload`事件保底。

```typescript
let blockers = createEvents<Blocker>();
function block(blocker) {
  let unblock = blockers.push(blocker);

  if (blockers.length === 1) {
    window.addEventListener("beforeunload", promptBeforeUnload);
  }

  return function () {
    unblock();

    // Remove the beforeunload listener so the document may
    // still be salvageable in the pagehide event.
    // See https://html.spec.whatwg.org/#unloading-documents
    if (!blockers.length) {
      window.removeEventListener("beforeunload", promptBeforeUnload);
    }
  };
}

// 触发浏览器内置的提醒弹窗
function promptBeforeUnload(event: BeforeUnloadEvent) {
  // Cancel the event.
  event.preventDefault();
  // Chrome (and legacy IE) requires returnValue to be set.
  event.returnValue = "";
}
```

当使用`push`,`replace`,`go`等方法进行跳转的时候，首先会判断`blockers`是否设置了回调函数，如果有的话，就依次调用，并且阻止此次跳转，除非在`block`回调函数中调用`retry`再次执行跳转，否则不会跳转。

```typescript
function push(to: To, state?: any) {
  let nextAction = Action.Push;
  // ...

  // 如果允许跳转
  if (allowTx(nextAction, nextLocation, retry)) {
    // 执行跳转
    history.pushState(historyState, "", url);
  }
}

// 判断是否允许跳转，如果设置了 block 回调函数，则不会跳转
function allowTx(action: Action, location: Location, retry: () => void) {
  // 这里第二个逗号连接的表达式先依次执行，但是始终返回 false
  return (
    !blockers.length || (blockers.call({ action, location, retry }), false)
  );
}
```



