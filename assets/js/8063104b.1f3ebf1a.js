"use strict";(self.webpackChunkicodex_next=self.webpackChunkicodex_next||[]).push([[7632],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return d}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),m=l(n),d=o,h=m["".concat(c,".").concat(d)]||m[d]||u[d]||a;return n?r.createElement(h,i(i({ref:t},s),{},{components:n})):r.createElement(h,i({ref:t},s))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:o,i[1]=p;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},94867:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return c},default:function(){return d},frontMatter:function(){return p},metadata:function(){return l},toc:function(){return u}});var r=n(83117),o=n(80102),a=(n(67294),n(3905)),i=["components"],p={title:"react router\u6e90\u7801\u5b66\u4e60"},c=void 0,l={unversionedId:"react/router/react router\u6e90\u7801\u5b66\u4e60",id:"react/router/react router\u6e90\u7801\u5b66\u4e60",title:"react router\u6e90\u7801\u5b66\u4e60",description:"\u6982\u8ff0",source:"@site/docs/react/router/react router\u6e90\u7801\u5b66\u4e60.md",sourceDirName:"react/router",slug:"/react/router/react router\u6e90\u7801\u5b66\u4e60",permalink:"/docs/react/router/react router\u6e90\u7801\u5b66\u4e60",draft:!1,editUrl:"https://github.com/wood3n/icodex-next/tree/master/docs/react/router/react router\u6e90\u7801\u5b66\u4e60.md",tags:[],version:"current",frontMatter:{title:"react router\u6e90\u7801\u5b66\u4e60"},sidebar:"react",previous:{title:"react router\u7b80\u4ecb",permalink:"/docs/react/router/react router api"},next:{title:"react\u6309\u9700\u52a0\u8f7d",permalink:"/docs/react/router/react\u6309\u9700\u52a0\u8f7d"}},s={},u=[{value:"\u6982\u8ff0",id:"\u6982\u8ff0",level:2},{value:"\u57fa\u672c\u7ed3\u6784",id:"\u57fa\u672c\u7ed3\u6784",level:2},{value:"Context",id:"context",level:2},{value:"Switch",id:"switch",level:2},{value:"Route",id:"route",level:2}],m={toc:u};function d(e){var t=e.components,p=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},m,p,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u6982\u8ff0"},"\u6982\u8ff0"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"react router"),"\u7684\u539f\u7406\u603b\u7ed3\u6765\u8bf4\u5176\u5b9e\u975e\u5e38\u7b80\u5355\uff0c\u57fa\u4e8e",(0,a.kt)("a",{parentName:"p",href:"https://zh-hans.reactjs.org/docs/context.html"},(0,a.kt)("inlineCode",{parentName:"a"},"Context")),"\u900f\u4f20",(0,a.kt)("a",{parentName:"p",href:"https://github.com/browserstate/history.js/"},(0,a.kt)("inlineCode",{parentName:"a"},"history")),"\uff0c\u540c\u65f6\u4f7f\u7528",(0,a.kt)("a",{parentName:"p",href:"https://github.com/pillarjs/path-to-regexp"},(0,a.kt)("inlineCode",{parentName:"a"},"path-to-regexp")),"\u505a URL \u8def\u5f84\u89e3\u6790\u6765\u5339\u914d\u6e32\u67d3\u5bf9\u5e94\u7ec4\u4ef6\uff0cover\uff01"),(0,a.kt)("h2",{id:"\u57fa\u672c\u7ed3\u6784"},"\u57fa\u672c\u7ed3\u6784"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"react-router"),"\u672c\u8eab\u652f\u6301",(0,a.kt)("inlineCode",{parentName:"p"},"web"),"\u548c",(0,a.kt)("inlineCode",{parentName:"p"},"react native"),"\u4e24\u4e2a\u7248\u672c\uff0c\u5e73\u65f6\u5e38\u7528\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"react-router-dom"),"\u5c31\u662f",(0,a.kt)("inlineCode",{parentName:"p"},"web"),"\u7248\u672c\u7684\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"react-router-native"),"\u5219\u662f",(0,a.kt)("inlineCode",{parentName:"p"},"react native"),"\u7248\u672c\u7684\uff0c\u5219\u4e24\u4e2a\u90fd\u4f9d\u8d56\u4e8e\u6838\u5fc3\u5e93",(0,a.kt)("inlineCode",{parentName:"p"},"react-router"),"\u3002"),(0,a.kt)("p",null,"\u5bf9\u4e8e",(0,a.kt)("inlineCode",{parentName:"p"},"react-router"),"\u6e90\u7801\u90e8\u5206\uff0c\u7ed3\u6784\u4e5f\u662f\u4e00\u76ee\u4e86\u7136\uff0c\u51e0\u4e2a\u6838\u5fc3 API \u90fd\u662f\u548c\u6587\u4ef6\u540d\u79f0\u76f8\u5173\u8054\u7684\uff0c\u552f\u4e00\u4e0d\u8db3\u7684\u5c31\u662f\u6ca1\u6709\u57fa\u4e8e",(0,a.kt)("inlineCode",{parentName:"p"},"typescript"),"\u5b9e\u73b0\u3002"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"image-20210721222524954",src:n(44044).Z,width:"525",height:"711"})),(0,a.kt)("h2",{id:"context"},"Context"),(0,a.kt)("p",null,"\u57fa\u4e8e",(0,a.kt)("inlineCode",{parentName:"p"},"createNameContext"),"\u751f\u6210\u4e0d\u540c\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"context"),"\u5b9e\u4f8b\uff0c\u8fd9\u91cc",(0,a.kt)("inlineCode",{parentName:"p"},"displayName"),"\u5c5e\u6027\u53ef\u4ee5\u65b9\u4fbf\u5728 React DevTools \u4e2d\u8c03\u8bd5\uff0cReact DevTools \u4f7f\u7528\u8be5\u5b57\u7b26\u4e32\u6765\u786e\u5b9a ",(0,a.kt)("inlineCode",{parentName:"p"},"context"),"\u8981\u663e\u793a\u7684\u5185\u5bb9\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const createNamedContext = name => {\n  const context = createContext();\n  context.displayName = name;\n\n  return context;\n};\n")),(0,a.kt)("p",null,"\u7136\u540e\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"Router"),"\u7ec4\u4ef6\u4e2d\u4f1a\u6839\u636e\u521b\u5efa\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"context"),"\u5bf9\u8c61\u59d3\u66fe\u57fa\u7840\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"Provider"),"\uff0c\u4e8e\u662f\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"Router"),"\u7ec4\u4ef6\u5305\u88f9\u7684\u5185\u90e8\u7ec4\u4ef6\u90fd\u53ef\u4ee5\u901a\u8fc7",(0,a.kt)("inlineCode",{parentName:"p"},"Context"),"\u83b7\u53d6",(0,a.kt)("inlineCode",{parentName:"p"},"value"),"\u3002\u8fd9\u91cc\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"props"),"\u4f1a\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"react-router-dom"),"\u4e2d\u7ecf\u8fc7\u5904\u7406\uff0c\u901a\u8fc7\u7b2c\u4e09\u65b9\u5e93\u63d0\u4f9b\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"createHistory"),"\u65b9\u6cd5\u6765\u5851\u9020",(0,a.kt)("inlineCode",{parentName:"p"},"history"),"\u5bf9\u8c61\uff0c\u900f\u4f20\u4e0b\u53bb\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"| pure","|":!0,pure:!0},"// Router\nconst RouterContext = /*#__PURE__*/ createNamedContext('Router');\nconst HistoryContext = /*#__PURE__*/ createNamedContext('Router-History');\n\n<RouterContext.Provider\n  value={{\n    history: this.props.history,\n    location: this.state.location,\n    match: Router.computeRootMatch(this.state.location.pathname),\n    staticContext: this.props.staticContext,\n  }}\n>\n  <HistoryContext.Provider\n    children={this.props.children || null}\n    value={this.props.history}\n  />\n</RouterContext.Provider>;\n\n// react-router-dom\nimport { Router } from 'react-router';\nimport { createBrowserHistory as createHistory } from 'history';\n\nclass BrowserRouter extends React.Component {\n  history = createHistory(this.props);\n\n  render() {\n    return <Router history={this.history} children={this.props.children} />;\n  }\n}\n")),(0,a.kt)("h2",{id:"switch"},"Switch"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Switch"),"\u7ec4\u4ef6\u4f1a\u5305\u88f9\u4e00\u7cfb\u5217",(0,a.kt)("inlineCode",{parentName:"p"},"Route"),"\u7ec4\u4ef6\uff0c\u7528\u4e8e\u6839\u636e URL \u6e32\u67d3\u5339\u914d\u7684\u7ec4\u4ef6\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"| pure","|":!0,pure:!0},'<Switch>\n  <Route exact path="/">\n    <Home />\n  </Route>\n\n  <Route path="/users">\n    <Users />\n  </Route>\n  <Redirect from="/accounts" to="/users" />\n\n  <Route>\n    <NoMatch />\n  </Route>\n</Switch>\n')),(0,a.kt)("p",null,"\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"Switch"),"\u7ec4\u4ef6\u4e2d\uff0c\u9996\u5148\u9700\u8981\u83b7\u53d6",(0,a.kt)("inlineCode",{parentName:"p"},"Router"),"\u4f20\u9012\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"Context"),"\u5c5e\u6027\u503c\uff0c\u7136\u540e\u901a\u8fc7",(0,a.kt)("inlineCode",{parentName:"p"},"path-to-regexp"),"\u6765\u89e3\u6790\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"Route")),(0,a.kt)("p",null,"\u4e2d\u6307\u5b9a\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"path"),"\u6216\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"Redirect"),"\u4e2d\u6307\u5b9a\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"from"),"\u5c5e\u6027\uff0c\u6765\u548c\u5f53\u524d URL \u5339\u914d\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"| pure","|":!0,pure:!0},"class Switch extends React.Component {\n  render() {\n    return (\n      <RouterContext.Consumer>\n        {context => {\n          invariant(context, 'You should not use <Switch> outside a <Router>');\n\n          const location = this.props.location || context.location;\n\n          let element, match;\n\n          // \u8fd9\u91cc\u4f7f\u7528 forEach \u65b9\u6cd5\u800c\u4e0d\u662f React.Children.toArray().find()\uff0c\u662f\u56e0\u4e3a toArray\n          // \u4f1a\u9ed8\u8ba4\u7ed9\u5b50\u5143\u7d20\u8ffd\u52a0 key \u6216\u8005\u7ed9\u5b50\u5143\u7d20\u7684 key \u8ffd\u52a0\u524d\u7f00\uff0c\u8fd9\u6837\u4f1a\u5728\u4f7f\u4e0d\u540c URL \u6e32\u67d3\u6307\u5b9a\u7684\n          // \u76f8\u540c\u7ec4\u4ef6\u65f6\uff0c\u5bfc\u81f4\u7ec4\u4ef6\u91cd\u65b0\u6e32\u67d3\n          React.Children.forEach(this.props.children, child => {\n            if (match == null && React.isValidElement(child)) {\n              element = child;\n\n              const path = child.props.path || child.props.from;\n\n              // \u5982\u679c\u5339\u914d\uff0c\u5219 match \u4f1a\u83b7\u5f97\u4e00\u4e2a\u5bf9\u8c61\n              match = path\n                ? matchPath(location.pathname, { ...child.props, path })\n                : context.match;\n            }\n          });\n\n          return match\n            ? React.cloneElement(element, { location, computedMatch: match })\n            : null;\n        }}\n      </RouterContext.Consumer>\n    );\n  }\n}\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Switch"),"\u5173\u952e\u90e8\u5206\u5728\u4e8e",(0,a.kt)("inlineCode",{parentName:"p"},"matchPath"),"\u8fd9\u4e2a\u65b9\u6cd5\uff0c\u5176\u5185\u90e8\u4f7f\u7528\u4e86",(0,a.kt)("inlineCode",{parentName:"p"},"path-to-regexp"),"\u6765\u89e3\u6790\u6307\u5b9a\u7684\u5339\u914d\u89c4\u5219\uff0c\u8fd4\u56de\u4e00\u4e2a\u6b63\u5219\u8868\u8fbe\u5f0f\uff0c\u4f8b\u5982"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const keys = [];\nconst regexp = pathToRegexp('/foo/:bar');\n\n// \u7ed3\u679c\nregexp = /^\\/foo(?:\\/([^\\/#\\?]+?))[\\/#\\?]?$/i;\nkeys = [\n  {\n    name: 'bar',\n    prefix: '/',\n    suffix: '',\n    pattern: '[^\\\\/#\\\\?]+?',\n    modifier: '',\n  },\n];\n")),(0,a.kt)("p",null,"\u901a\u8fc7\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"Switch"),"\u4e2d\u83b7\u53d6",(0,a.kt)("inlineCode",{parentName:"p"},"Route"),"\u6307\u5b9a\u7684\u5339\u914d\u89c4\u5219\u6765\u751f\u6210\u6b63\u5219\u8868\u8fbe\u5f0f\uff0c\u7136\u540e\u4f7f\u7528\u6b63\u5219\u8868\u8fbe\u5f0f\u5339\u914d\u5f53\u524d URL \u7684",(0,a.kt)("inlineCode",{parentName:"p"},"pathname")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"function matchPath(pathname, options = {}) {\n  const { path, exact = false, strict = false, sensitive = false } = options;\n\n  const { regexp, keys } = pathToRegexp(path, [], {\n    end: exact,\n    strict,\n    sensitive,\n  });\n\n  // \u6b63\u5219\u5339\u914d\n  const match = regexp.exec(pathname);\n\n  // \u4e0d\u5339\u914d\u76f4\u63a5\u8fd4\u56de null\n  if (!match) return null;\n\n  const [url, ...values] = match;\n  const isExact = pathname === url;\n\n  if (exact && !isExact) return null;\n\n  return {\n    path,\n    url: path === '/' && url === '' ? '/' : url,\n    isExact,\n    params: keys.reduce((memo, key, index) => {\n      memo[key.name] = values[index];\n      return memo;\n    }, {}),\n  };\n}\n")),(0,a.kt)("h2",{id:"route"},"Route"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Route"),"\u7528\u6765\u6307\u5b9a\u5339\u914d\u89c4\u5219",(0,a.kt)("inlineCode",{parentName:"p"},"path"),"\u548c\u5bf9\u5e94\u6e32\u67d3\u7684\u7ec4\u4ef6\uff0c\u4e5f\u662f\u9700\u8981\u6d88\u8d39",(0,a.kt)("inlineCode",{parentName:"p"},"Router"),"\u63d0\u4f9b\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"Context"),"\u5c5e\u6027\uff0c\u5e76\u4e14\u53ef\u4ee5\u5728\u6307\u5b9a\u7684\u7ec4\u4ef6\u662f",(0,a.kt)("inlineCode",{parentName:"p"},"render props"),"\u5f62\u5f0f\u65f6\uff0c\u5c06\u8fd9\u4e9b\u5c5e\u6027\u4f20\u9012\u5230\u7ec4\u4ef6\u5185\u90e8\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"props")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"| pure","|":!0,pure:!0},"class Route extends React.Component {\n  render() {\n    return (\n      <RouterContext.Consumer>\n        {context => {\n          const location = this.props.location || context.location;\n          const match = this.props.computedMatch\n            ? this.props.computedMatch\n            : this.props.path\n            ? matchPath(location.pathname, this.props)\n            : context.match;\n\n          const props = { ...context, location, match };\n\n          // \u4e09\u79cd\u6e32\u67d3\u5f62\u5f0f\n          let { children, component, render } = this.props;\n\n          return (\n            <RouterContext.Provider value={props}>\n              {props.match\n                ? children\n                  ? typeof children === 'function'\n                    ? children(props)\n                    : children\n                  : component\n                  ? React.createElement(component, props)\n                  : render\n                  ? render(props)\n                  : null\n                : typeof children === 'function'\n                ? children(props)\n                : null}\n            </RouterContext.Provider>\n          );\n        }}\n      </RouterContext.Consumer>\n    );\n  }\n}\n")))}d.isMDXComponent=!0},44044:function(e,t,n){t.Z=n.p+"assets/images/image-20210721222524954-2432c7d88e5eb703e1be83ad8d40fc74.png"}}]);