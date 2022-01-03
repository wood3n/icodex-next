### 什么是按需加载

按需加载（或者叫懒加载）就是通过 ES2020 的动态加载语法[`import(path)`](https://es6.ruanyifeng.com/?search=import&x=0&y=0#docs/module#import)传入指定的组件路径作为参数，使得该部分代码仅在需要用到的时候才会去请求并加载。

该方法看起来有点奇葩，使用`import()`会返回一个`Promise`对象。

```javascript | pure
import('./math').then(math => {
  console.log(math.add(16, 26));
});
```

由于这部分语法比较新，所以需要编译器的代码降级支持，如果使用`babel`，需要使用[`@babel/plugin-syntax-dynamic-import`](https://classic.yarnpkg.com/en/package/@babel/plugin-syntax-dynamic-import)插件来解析动态`import()`语法。

### React.lazy 和 React.Suspense

`React`对于动态加载语法`import()`直接提供了`React.lazy`和`React.Suspense`进行支持。

`React.lazy`接受一个函数，这个函数需要动态调用 `import()`。 通过`import()`加载的组件必须具有默认导出`export default`。

```jsx | pure
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

`React.Suspense`属于体验优化上的组件，其接受`React.lazy`返回的组件作为子组件，同时可以接受一个`fallback`的属性作为在组件加载过程中显示的组件，例如加载 loading 效果等。`React.Suspense`同时支持包裹多个懒加载的子组件。

```jsx | pure
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

### React.lazy 和 React Router 结合

`React.lazy`可以很好的和`React Router`进行结合，创建基于路由的代码分割方案，因为日常使用的构建工具`webpack`会自动对使用`import()`动态加载的代码做`code split`，使得该部分代码在页面使用到的时候才会去请求并加载，通过和`React Router`结合，可以做到首屏加载时避免完全请求应用的所有代码，而是只请求首屏页面的代码，大幅提升体验。

```jsx | pure
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
);
```