---
title: react router源码学习
---

## 概述

`react router`的原理总结来说其实非常简单，基于[`Context`](https://zh-hans.reactjs.org/docs/context.html)透传[`history`](https://github.com/browserstate/history.js/)，同时使用[`path-to-regexp`](https://github.com/pillarjs/path-to-regexp)做 URL 路径解析来匹配渲染对应组件，over！

## 基本结构

`react-router`本身支持`web`和`react native`两个版本，平时常用的`react-router-dom`就是`web`版本的，`react-router-native`则是`react native`版本的，则两个都依赖于核心库`react-router`。

对于`react-router`源码部分，结构也是一目了然，几个核心 API 都是和文件名称相关联的，唯一不足的就是没有基于`typescript`实现。

![image-20210721222524954](../../../public/images/image-20210721222524954.png)

## Context

基于`createNameContext`生成不同的`context`实例，这里`displayName`属性可以方便在 React DevTools 中调试，React DevTools 使用该字符串来确定 `context`要显示的内容。

```javascript
const createNamedContext = name => {
  const context = createContext();
  context.displayName = name;

  return context;
};
```

然后在`Router`组件中会根据创建的`context`对象姓曾基础的`Provider`，于是使用`Router`组件包裹的内部组件都可以通过`Context`获取`value`。这里的`props`会在`react-router-dom`中经过处理，通过第三方库提供的`createHistory`方法来塑造`history`对象，透传下去。

```jsx | pure
// Router
const RouterContext = /*#__PURE__*/ createNamedContext('Router');
const HistoryContext = /*#__PURE__*/ createNamedContext('Router-History');

<RouterContext.Provider
  value={{
    history: this.props.history,
    location: this.state.location,
    match: Router.computeRootMatch(this.state.location.pathname),
    staticContext: this.props.staticContext,
  }}
>
  <HistoryContext.Provider
    children={this.props.children || null}
    value={this.props.history}
  />
</RouterContext.Provider>;

// react-router-dom
import { Router } from 'react-router';
import { createBrowserHistory as createHistory } from 'history';

class BrowserRouter extends React.Component {
  history = createHistory(this.props);

  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}
```

## Switch

`Switch`组件会包裹一系列`Route`组件，用于根据 URL 渲染匹配的组件。

```jsx | pure
<Switch>
  <Route exact path="/">
    <Home />
  </Route>

  <Route path="/users">
    <Users />
  </Route>
  <Redirect from="/accounts" to="/users" />

  <Route>
    <NoMatch />
  </Route>
</Switch>
```

在`Switch`组件中，首先需要获取`Router`传递的`Context`属性值，然后通过`path-to-regexp`来解析在`Route`

中指定的`path`或在`Redirect`中指定的`from`属性，来和当前 URL 匹配。

```jsx | pure
class Switch extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          invariant(context, 'You should not use <Switch> outside a <Router>');

          const location = this.props.location || context.location;

          let element, match;

          // 这里使用 forEach 方法而不是 React.Children.toArray().find()，是因为 toArray
          // 会默认给子元素追加 key 或者给子元素的 key 追加前缀，这样会在使不同 URL 渲染指定的
          // 相同组件时，导致组件重新渲染
          React.Children.forEach(this.props.children, child => {
            if (match == null && React.isValidElement(child)) {
              element = child;

              const path = child.props.path || child.props.from;

              // 如果匹配，则 match 会获得一个对象
              match = path
                ? matchPath(location.pathname, { ...child.props, path })
                : context.match;
            }
          });

          return match
            ? React.cloneElement(element, { location, computedMatch: match })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
```

`Switch`关键部分在于`matchPath`这个方法，其内部使用了`path-to-regexp`来解析指定的匹配规则，返回一个正则表达式，例如

```javascript
const keys = [];
const regexp = pathToRegexp('/foo/:bar');

// 结果
regexp = /^\/foo(?:\/([^\/#\?]+?))[\/#\?]?$/i;
keys = [
  {
    name: 'bar',
    prefix: '/',
    suffix: '',
    pattern: '[^\\/#\\?]+?',
    modifier: '',
  },
];
```

通过在`Switch`中获取`Route`指定的匹配规则来生成正则表达式，然后使用正则表达式匹配当前 URL 的`pathname`

```javascript
function matchPath(pathname, options = {}) {
  const { path, exact = false, strict = false, sensitive = false } = options;

  const { regexp, keys } = pathToRegexp(path, [], {
    end: exact,
    strict,
    sensitive,
  });

  // 正则匹配
  const match = regexp.exec(pathname);

  // 不匹配直接返回 null
  if (!match) return null;

  const [url, ...values] = match;
  const isExact = pathname === url;

  if (exact && !isExact) return null;

  return {
    path,
    url: path === '/' && url === '' ? '/' : url,
    isExact,
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index];
      return memo;
    }, {}),
  };
}
```

## Route

`Route`用来指定匹配规则`path`和对应渲染的组件，也是需要消费`Router`提供的`Context`属性，并且可以在指定的组件是`render props`形式时，将这些属性传递到组件内部的`props`

```jsx | pure
class Route extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const location = this.props.location || context.location;
          const match = this.props.computedMatch
            ? this.props.computedMatch
            : this.props.path
            ? matchPath(location.pathname, this.props)
            : context.match;

          const props = { ...context, location, match };

          // 三种渲染形式
          let { children, component, render } = this.props;

          return (
            <RouterContext.Provider value={props}>
              {props.match
                ? children
                  ? typeof children === 'function'
                    ? children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === 'function'
                ? children(props)
                : null}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
```