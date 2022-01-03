---
title: react router简介

---

## API 分类

在`react router`中的 API 分为以下三类：

- 基础路由组件，用于全局处理路由转发任务，包括`BrowserRouter`和`HashRouter`
- 路由匹配组件，用于根据 URL 匹配指定的页面组件，包括`Route`和`Switch`
- 页面跳转组件，包括`Link`、`NavLink`和`Redirect`，最终会转换成`a`标签嵌入页面

## BrowserRouter 和 HashRouter

`BrowserRouter`和`HashRouter`作为基础组件，通常作为跟组件包裹整个应用。它们俩的不同是`HashRouter`会将当前页面配置的路由路径显示在 URL 的`hash`部分，因此 URL 看起来像`xxx.com/path#user/xxxx`，单页面应用来说这点其实没什么影响，但是对于`SSR`(server side render)的应用，改变 URL 的`path`会向服务端发送请求 HTML 页面，而改变`hash`并不会发送请求。

```jsx | pure
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
```

## Switch 和 Route

`Switch`用来包裹一系列的`Route`组件，当 URL 改变的时候，`Switch`组件会搜索子组件中的`Route`，根据给定的`path`属性来匹配当前的 URL，当匹配到第一个时就会停止匹配。如果不用`Switch`包裹`Route`，那么`Route`指定的组件将都会被渲染出来。

```jsx | pure
function App() {
  return (
    <div>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact/:id">
          <Contact />
        </Route>
      </Switch>
    </div>
  );
}
```

### Route

`Route`组件是最主要的用来配置 URL 路径以及根据路由渲染组件。其中`path`属性必传，其余还有三种引入组件的方式：[`component`](https://reactrouter.com/web/api/Route/component)、[`render`](https://reactrouter.com/web/api/Route/render-func)和[`children`](https://reactrouter.com/web/api/Route/children-func)。

#### path

首先`path`也就是最终推送到 URL 的路径部分属性，支持传入一个字符串或者字符串数组，字符串数组也就是多个路径匹配到同一个显示的页面组件。字符串的形式支持根据[`path-to-regexp@^1.7.0`](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0)的形式，常见的有：

- `/:xxx`指定 URL 的`pathname`部分的参数

和`path`配合使用的属性还有`exact`、`strict`和`sensitive`：

- `exact`：是否必须精准匹配当前的`location.pathname`部分，例如当指定`exact`的时候，`/one`只会匹配`location.pathname = one`的 URL，后面如果再串接一个子路径就不会被匹配。

- `strict`：是否精准匹配 URL 的`location.pathname`最后的斜杠，例如当指定`strict`的时候，`/one/`只会匹配`/one/`而不会匹配`/one`，但是当`location.pathname`包含子路径的时候，`strict`就无效了，也就是此时`/one/`也会匹配`/one/two`
- `sensitive`：是否大小写敏感

### component

`component`属性直接接收一个组件。需要注意的是，`Route`内部对`component`的处理是直接使用`React.createElement`来创建一个新的组件，一旦组件接收的`props`发生改变，那么就会导致整个组件卸载重新创建一个新的组件替换上去，而不是使用 DIFF 算法更新原来的组件，此举会带来轻微的性能问题。

```jsx | pure
function User(props) {
  return <h1>Hello {props.match.params.username}!</h1>;
}

ReactDOM.render(
  <Router>
    <Route path="/user/:username" component={User} />
  </Router>,
  node,
);
```

### render

`render`就是利用 render props 的概念，传入一个函数属性，该函数返回一个组件，在`Route`匹配的时候直接调用函数渲染组件。

由于 render props 概念的特殊性，该函数可以轻易改造称为一个高阶组件，即将`render`函数的参数直接通过`props`传入到组件本身即可，这样组件内部也会获得`react router`的`match`, `location` 和 `history`这些属性。

```jsx | pure
function FadingRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={routeProps => (
        <FadeIn>
          <Component {...routeProps} />
        </FadeIn>
      )}
    />
  );
}
```

### children

`children`也是一个函数，和`render`函数的区别就是如果当前`location`没有匹配到当前的`Route`配置，那么`children`函数接收的参数中的`match`属性会是`null`，根据这个可以动态的为组件增加一些个性化的定制，例如最为常见的根据 URL 动态的渲染`Menu`组件的样式：

```jsx | pure
function ListItemLink({ to, ...rest }) {
  return (
    <Route
      path={to}
      children={({ match }) => (
        <li className={match ? 'active' : ''}>
          <Link to={to} {...rest} />
        </li>
      )}
    />
  );
}

ReactDOM.render(
  <BrowserRouter>
    <ul>
      <ListItemLink to="/somewhere" />
      <ListItemLink to="/somewhere-else" />
    </ul>
  </BrowserRouter>,
  node,
);
```

## Link

`Link`组件可以用于页面跳转链接生成，其可以接受以下属性：

### to

`to`可以是路由路径字符串，也可以是一个`location`对象，或者是一个函数，函数会接受`location`对象作为参数，必须返回一个新的路径字符串或者`location`对象。

### replace

指定使用`history.replace`来进行跳转

## Redirect

### to

同上`Link`

### from

值得一提的是`Redirect`表示重定向操作，这个组件可以和`Switch`结合，通过指定`from`传递一个希望重定向的路径，会在`Switch`匹配到`from`指定的路径后，自动跳转到`to`指定的新的 URL。

## 路由对象

`react router`对 HTML 的[`history`](https://developer.mozilla.org/zh-CN/docs/Web/API/History)，[`location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location)对象进行了一些改造，并在通过`Route`的`render`或者`children`渲染组件时，以`render props`以及高阶组件的形式将这些对象注入到组件中。

### history

`react router`的[`history`](https://reactrouter.com/web/api/history)对象与 HTML 本身提供的`History`接口的对象属性不同，其具有一定改造后的属性和方法，相比 HTML 原生 API 更加方便开发使用。具体来说，其具有以下属性和方法：

- `length`：历史记录堆栈长度
- `action`：当前执行的操作方法名称，`PUSH`, `REPLACE`, 或`POP`
- `location`：具有以下属性
  - `pathname`：URL 的`path`部分
  - `search`： URL 的 queryString 部分
  - `hash`: URL 的 hash 部分
  - `state`：当前状态数据，例如通过执行`push(path, state)`方法
- `push(path, [state])`：跳转路由
- `replace(path, [state])`：跳转路由，与`push`不同的是，被`replace`替换掉的当前页面不会保存在历史记录中
- `go(n)`：根据历史记录的堆栈索引跳转页面，`go(-1)`也就是返回
- `goBack()`：返回上一页
- `goForward()`：前进一页

对应的可以通过`useHistory`获取这个`history`对象。

### location

单独拎出来的`location`和`history`具有一样的属性，不同的是`history.location`是禁止修改的对象，但是`location`可以。

对应的，可以通过`useLocation`来获取这个`location`对象。

### match

`match`包含与 URL 匹配的当前`Route`指定的一些属性：

- `params`：从 URL 的参数部分解析出来的一个对象，键是通过`Route`的`path`指定的参数匹配字符串，值也就是当前在 URL 里传递进去的值；例如当前 URL 为`/user/1234`，对应匹配的`Route`指定的`path`应该是`/user/:id`，那么此时`params`就是`{ id: 1234 }`

- `isExact`：如果是整个 URL 都匹配当前`Route`，则该值为`true`
- `path`：当前匹配的`Route`中指定的`path`
- `url`：URL 中匹配`Route`中指定的`path`的该部分内容

可以使用`useParams`来获取`match`的`params`属性，解析出 URL 中`pathname`的参数值。

### useRouteMatch | hook

`useRouteMatch`可以接收和`Route`组件相同的属性作为参数，用来匹配当前 URL，如果成功匹配则返回`match`对象，否则返回`null`。

### withRouter

`withRouter`是一个高阶组件，通过包裹指定组件，组件内部可以自动获得`history`，`location`，`match`这些对象。

## 滚动位置恢复

[React Router: Declarative Routing for React.js](https://reactrouter.com/web/guides/scroll-restoration)