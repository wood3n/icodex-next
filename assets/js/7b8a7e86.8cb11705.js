"use strict";(self.webpackChunkicodex_next=self.webpackChunkicodex_next||[]).push([[5737],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),d=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=d(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),s=d(n),m=a,k=s["".concat(p,".").concat(m)]||s[m]||u[m]||o;return n?r.createElement(k,i(i({ref:t},c),{},{components:n})):r.createElement(k,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=s;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var d=2;d<o;d++)i[d]=n[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},60340:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return l},metadata:function(){return d},toc:function(){return u}});var r=n(83117),a=n(80102),o=(n(67294),n(3905)),i=["components"],l={title:"Redux\u5165\u95e8"},p=void 0,d={unversionedId:"react/redux/redux\u5165\u95e8",id:"react/redux/redux\u5165\u95e8",title:"Redux\u5165\u95e8",description:"\u4ec0\u4e48\u662f Redux",source:"@site/docs/react/redux/redux\u5165\u95e8.md",sourceDirName:"react/redux",slug:"/react/redux/redux\u5165\u95e8",permalink:"/docs/react/redux/redux\u5165\u95e8",draft:!1,editUrl:"https://github.com/wood3n/icodex-next/tree/master/docs/react/redux/redux\u5165\u95e8.md",tags:[],version:"current",frontMatter:{title:"Redux\u5165\u95e8"},sidebar:"react",previous:{title:"redux",permalink:"/docs/category/redux"},next:{title:"router",permalink:"/docs/category/router"}},c={},u=[{value:"\u4ec0\u4e48\u662f Redux",id:"\u4ec0\u4e48\u662f-redux",level:2},{value:"Action",id:"action",level:3},{value:"Reducer",id:"reducer",level:3},{value:"Store",id:"store",level:3},{value:"middleware",id:"middleware",level:3},{value:"React-Redux",id:"react-redux",level:2},{value:"\u5b89\u88c5",id:"\u5b89\u88c5",level:3},{value:"API",id:"api",level:3},{value:"Provider",id:"provider",level:4},{value:"createStore",id:"createstore",level:4},{value:"connect",id:"connect",level:4},{value:"\u9879\u76ee\u7684\u7ba1\u7406",id:"\u9879\u76ee\u7684\u7ba1\u7406",level:3}],s={toc:u};function m(e){var t=e.components,l=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},s,l,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"\u4ec0\u4e48\u662f-redux"},"\u4ec0\u4e48\u662f Redux"),(0,o.kt)("p",null,"Redux \u662f\u4e00\u4e2a JavaScript \u72b6\u6001\u5bb9\u5668\uff0c\u63d0\u4f9b\u53ef\u9884\u6d4b\u5316\u7684\u72b6\u6001\u7ba1\u7406\u3002\u4e0d\u5149\u80fd\u7528\u4e8e React\uff0c\u4e5f\u80fd\u7528\u4e8e\u5176\u5b83 JS \u5e93\u3002\u5b83\u7684\u5927\u5c0f\u53ea\u6709 2KB \u5de6\u53f3\uff0c\u975e\u5e38\u5f97\u8f7b\u91cf\u3002"),(0,o.kt)("p",null,"Redux \u63d0\u4f9b\u4e86\u4e00\u79cd\u5c06 UI \u548c\u6570\u636e\u5206\u79bb\u7684\u673a\u5236\uff0c\u4e2a\u4eba\u611f\u89c9\u5176\u5b9e\u548c MVC \u5dee\u4e0d\u591a"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Redux\u673a\u5236",src:n(80997).Z,width:"805",height:"561"})),(0,o.kt)("h3",{id:"action"},"Action"),(0,o.kt)("p",null,"\u9700\u8981\u6ce8\u610f\u7684\u65f6\uff0c\u5728 Redux \u4e2d",(0,o.kt)("strong",{parentName:"p"},"Action \u662f\u4e00\u4e2a\u5bf9\u8c61"),"\uff0c\u8868\u793a\u6570\u636e\u7684\u64cd\u4f5c\u7c7b\u578b\u548c\u643a\u5e26\u7684\u6570\u636e\u672c\u8eab\uff0c\u5c06\u5176\u9001\u5f80",(0,o.kt)("inlineCode",{parentName:"p"},"store"),"\u8fdb\u884c\u5904\u7406\u3002\u4e5f\u5c31\u662f\u8bf4",(0,o.kt)("strong",{parentName:"p"},"\u5728 Redux \u4e2d\u4e0d\u5b58\u5728",(0,o.kt)("inlineCode",{parentName:"strong"},"props"),"\u548c",(0,o.kt)("inlineCode",{parentName:"strong"},"state"),"\u7684\u6982\u5ff5\u4e86\uff0c\u6240\u6709\u7684\u6570\u636e\u901a\u8fc7 Action \u8fdb\u884c\u4f20\u9001"),"\u3002"),(0,o.kt)("p",null,"Action \u901a\u5e38\u5177\u6709\u6570\u636e\u64cd\u4f5c\u7c7b\u578b\u540d\u79f0\u548c\u643a\u5e26\u7684\u6570\u636e\u672c\u8eab\uff0c\u4f8b\u5982\u6dfb\u52a0\u4e00\u6761\u5f85\u529e\u4e8b\u9879\u7684 Action \u5982\u4e0b\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},'{\n  type: "ADD_TODO",\n  payload: {\n    id: 1,\n    value,\n  },\n}\n')),(0,o.kt)("p",null,"\u53ef\u4ee5\u4f7f\u7528\u4e00\u4e2a\u8d1f\u8d23\u751f\u6210\u7684",(0,o.kt)("inlineCode",{parentName:"p"},"action"),"\u7684\u51fd\u6570\uff0c\u8fd9\u6837\u5c31\u53ef\u4ee5\u5c06\u6570\u636e\u64cd\u4f5c\u5b8c\u5168\u7684\u4ece\u9875\u9762\u5265\u79bb\u5f00\uff0c\u4e0d\u7528\u5728 UI \u7ec4\u4ef6\u4e2d\u53bb\u751f\u6210 Action\uff0c\u8fd9\u6837\u505a\u53ef\u4ee5\u4f7f\u4ee3\u7801\u5c42\u6b21\u66f4\u6e05\u6670\uff1b\u6bd4\u5982\u70b9\u51fb\u6dfb\u52a0\u5f85\u529e\u4e8b\u9879\u6309\u94ae",(0,o.kt)("inlineCode",{parentName:"p"},"onClick"),"\uff0c\u901a\u8fc7 Action \u751f\u6210\u51fd\u6570\u53ef\u4ee5\u4ea7\u751f\u4e00\u4e2a",(0,o.kt)("inlineCode",{parentName:"p"},'type:"ADD_TODO"'),"\u7684 Action \u5bf9\u8c61"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"let todoId = 0;\n\n//\u521b\u5efaaction\nexport const addTodo = value => ({\n  type: 'ADD_TODO',\n  payload: {\n    id: ++todoId,\n    value,\n  },\n});\n")),(0,o.kt)("h3",{id:"reducer"},"Reducer"),(0,o.kt)("p",null,"Reducer \u65f6\u771f\u6b63",(0,o.kt)("strong",{parentName:"p"},"\u8d1f\u8d23\u7ba1\u7406",(0,o.kt)("inlineCode",{parentName:"strong"},"state"),"\u7684\u7eaf\u51fd\u6570"),"\uff0c\u5b83\u8d1f\u8d23\u63a5\u53d7\u5f53\u524d",(0,o.kt)("inlineCode",{parentName:"p"},"state"),"\u4ee5\u53ca Action\uff0c\u901a\u8fc7\u5224\u65ad Action \u7684\u7c7b\u578b\uff0c\u51b3\u5b9a\u6267\u884c\u4ec0\u4e48\u6837\u7684\u64cd\u4f5c\u53bb\u4fee\u6539",(0,o.kt)("inlineCode",{parentName:"p"},"state"),"\u5e76\u8fd4\u56de\u65b0\u7684",(0,o.kt)("inlineCode",{parentName:"p"},"state"),"\u3002"),(0,o.kt)("p",null,"Reducer \u53ef\u4ee5\u62c6\u5206\uff0c\u6700\u540e\u518d\u901a\u8fc7",(0,o.kt)("inlineCode",{parentName:"p"},"combineReducers"),"\u51fd\u6570\u5c06\u5b83\u4eec\u5408\u5e76\u7136\u540e\u4f20\u5165 Store \u4e2d"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Note: \u5c24\u5176\u9700\u8981\u6ce8\u610f\u7684\u4e00\u70b9\u662f",(0,o.kt)("strong",{parentName:"p"},"Reducer \u4e2d\u4fee\u6539 state \u7684\u64cd\u4f5c\u8981\u4fdd\u8bc1 immutable\uff0c\u5bf9\u4e8e\u6df1\u5c42\u5d4c\u5957\u7684 state\uff0c\u4e00\u5b9a\u8981\u6df1\u62f7\u8d1d"))),(0,o.kt)("p",null,"\u4f8b\u5982\uff0c\u5728\u6dfb\u52a0\u4e00\u6761\u4ee3\u529e\u4e8b\u9879\u540e\uff0c\u7ec4\u88c5\u7684 Action \u5bf9\u8c61\u4f1a\u88ab\u9001\u5230 Reducer \u7279\u5b9a\u7684\u51fd\u6570\u8fd9\u91cc\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"const initState = {\n  todoList: [],\n};\n\nexport default function(state = initState, action) {\n  switch (action.type) {\n    // \u5224\u65adAction\u7684\u64cd\u4f5c\u7c7b\u578b\n    case 'ADD_TODO': {\n      const { id, value } = action.payload;\n      // \u8fd4\u56de\u65b0\u7684state\n      return {\n        todoList: [\n          ...state.todoList,\n          {\n            id,\n            value,\n            isComplete: false,\n          },\n        ],\n      };\n    }\n    default:\n      return state;\n  }\n}\n")),(0,o.kt)("h3",{id:"store"},"Store"),(0,o.kt)("p",null,"Store \u5728 Redux \u4e2d\u662f\u4e00\u4e2a",(0,o.kt)("strong",{parentName:"p"},"\u4e2d\u5fc3\u7ba1\u7406\u5668"),"\uff0c\u5b83\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"createStore"),"\u51fd\u6570\u6839\u636e\u7279\u5b9a\u7684 Reducer \u751f\u6210\uff0c\u8d1f\u8d23\u5c06 Action \u6d3e\u53d1\u5230 Reducer\uff0c\u540c\u65f6\u5c06 Reducer \u4ea7\u751f\u7684\u65b0\u7684",(0,o.kt)("inlineCode",{parentName:"p"},"state"),"\u4ee5",(0,o.kt)("inlineCode",{parentName:"p"},"props"),"\u7684\u5f62\u5f0f\u4f20\u5165\u7ec4\u4ef6\u5185\u90e8\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { createStore } from 'redux';\nimport reducer from '../reducers';\n\nexport default createStore(reducer);\n")),(0,o.kt)("p",null,"\u9875\u9762\u7ec4\u4ef6\u53d1\u751f\u4ea4\u4e92\u4e8b\u4ef6\uff0c\u4f1a\u4ea7\u751f Action\uff0c\u800c\u9875\u9762\u7ec4\u4ef6\u65e0\u6cd5\u76f4\u63a5\u5c06 Action \u9001\u5f80 Reducer \u53bb\u5904\u7406\uff0c\u5b83\u9700\u8981\u901a\u8fc7",(0,o.kt)("inlineCode",{parentName:"p"},"store.dispatch(action)"),"\u6765\u5206\u53d1 Action \u7ed9 Reducer\uff1b\u800c\u5f53 Reducer \u5904\u7406\u5b8c\u4e86\u4ee5\u540e\uff0cReducer \u4e5f\u65e0\u6cd5\u5c06",(0,o.kt)("inlineCode",{parentName:"p"},"state"),"\u76f4\u63a5\u7ed9\u7ec4\u4ef6\uff0c\u6240\u4ee5\u7ec4\u4ef6\u9700\u8981\u901a\u8fc7",(0,o.kt)("inlineCode",{parentName:"p"},"store.subscribe(listener)"),"\u6765\u8ba2\u9605",(0,o.kt)("inlineCode",{parentName:"p"},"state"),"\u7684\u66f4\u65b0\u3002"),(0,o.kt)("h3",{id:"middleware"},"middleware"),(0,o.kt)("p",null,"middleware \u63d0\u4f9b\u7684\u662f\u751f\u6210 Action \u4ee5\u540e\uff0c\u5728\u5230\u8fbe Reducer \u4e4b\u524d\u7684\u529f\u80fd\u62d3\u5c55\uff0c\u6240\u4ee5\u53ef\u4ee5\u4f7f\u7528 middleware \u6765\u8fdb\u884c",(0,o.kt)("strong",{parentName:"p"},"\u8c03\u7528\u5f02\u6b65\u63a5\u53e3\uff0c\u65e5\u5fd7\u8bb0\u5f55"),"\u7b49\u529f\u80fd\u5f00\u53d1\u3002"),(0,o.kt)("p",null,"\u5728\u4f20\u7edf\u7684 Redux \u4f7f\u7528\u8fc7\u7a0b\u4e2d\uff0cAction \u53ea\u662f\u4e00\u4e2a\u5bf9\u8c61\uff0c\u5f53\u7ec4\u4ef6\u751f\u6210 Action \u4ee5\u540e\uff0c\u53ea\u80fd\u540c\u6b65\u4f20\u9012\u5230 Store \u4e2d\u5904\u7406\u3002\u6709\u4e86 middleware\uff0c\u5c31\u53ef\u4ee5\u5728 Action \u5904\u7406\u4e4b\u524d\u6267\u884c\u4e00\u4e9b\u5f02\u6b65\u64cd\u4f5c\uff0c\u8ba9 Action \u5ef6\u8fdf\u5206\u53d1\u5230 Store \u7684\u8fc7\u7a0b\uff0c\u5728\u7b49\u5230\u4e00\u5b9a\u5ef6\u8fdf\u4ee5\u540e\u518d\u5c06 Action \u53d1\u9001\u5230 Store \u53bb\u5904\u7406\u3002"),(0,o.kt)("h2",{id:"react-redux"},"React-Redux"),(0,o.kt)("p",null,"React Redux \u662f\u57fa\u4e8e React \u7684",(0,o.kt)("inlineCode",{parentName:"p"},"Context"),"\u5bf9 Redux \u7684\u8fdb\u4e00\u6b65\u5c01\u88c5\uff0c\u63d0\u4f9b\u5171\u4eab\u7684\u5168\u5c40\u72b6\u6001\u7ba1\u7406\u673a\u5236\u3002"),(0,o.kt)("h3",{id:"\u5b89\u88c5"},"\u5b89\u88c5"),(0,o.kt)("p",null,"React Redux \u9700\u8981\u914d\u5408 Redux \u4e00\u8d77\u4f7f\u7528"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add redux react-redux\n")),(0,o.kt)("h3",{id:"api"},"API"),(0,o.kt)("p",null,"React Redux \u4f7f\u7528\u90e8\u5206 Redux \u7684 API\uff0c\u540c\u65f6\u5c01\u88c5\u4e86\u81ea\u5df1\u7684 API"),(0,o.kt)("h4",{id:"provider"},"Provider"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"<Provider store={store}>"),"\u4f7f\u7528 React \u7684",(0,o.kt)("a",{parentName:"p",href:"https://zh-hans.reactjs.org/docs/context.html"},(0,o.kt)("inlineCode",{parentName:"a"},"Context")),"\u63d0\u4f9b\u5168\u5c40",(0,o.kt)("inlineCode",{parentName:"p"},"store"),"\u5171\u4eab\u7684\u673a\u5236\u3002",(0,o.kt)("inlineCode",{parentName:"p"},"Context"),"\u63d0\u4f9b\u7684\u662f\u5728\u8de8\u8d8a\u7ec4\u4ef6\u5c42\u7ea7\u7684\u5171\u4eab\u6570\u636e\u7ba1\u7406\u673a\u5236\uff0c\u5bf9\u4e8e\u67d0\u4e9b\u9700\u8981\u5168\u5c40\u5171\u4eab\u7684\u72b6\u6001\uff0c\u4f8b\u5982\u767b\u5f55\u7528\u6237\u4fe1\u606f\uff0c\u7528\u6237\u4e3b\u9898\u7b49\uff0c\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"Context"),"\u505a\u5230\u5168\u5c40\u5171\u4eab\u662f\u6700\u7b80\u5355\u7684\u65b9\u5f0f\u3002"),(0,o.kt)("p",null,"\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"Context"),"\u7684\u65b9\u5f0f\u5982\u4e0b\uff1a"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u9996\u5148\u5728\u7ec4\u4ef6\u5916\u90e8\u521b\u5efa",(0,o.kt)("inlineCode",{parentName:"li"},"Context"),"\uff0c\u5141\u8bb8\u540e\u4f20\u5165\u4e00\u4e2a\u9ed8\u8ba4\u503c\uff1b\u7136\u540e\u5c06\u9876\u5c42\u7ec4\u4ef6\u901a\u8fc7",(0,o.kt)("inlineCode",{parentName:"li"},"Context.Provider"),"\u5305\u88f9\u8d77\u6765\uff0c\u5e76\u8bbe\u7f6e\u4f20\u9012\u7684\u503c")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"| pure","|":!0,pure:!0},"import React from 'react';\n\nexport const UserContext = React.createContext();\nexport default function() {\n  return (\n    <UserContext.Provider value={'\u76ae\u76ae\u867e'}>\n      <Root />\n    </UserContext.Provider>\n  );\n}\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u8bb0\u5f97\u751f\u6210",(0,o.kt)("inlineCode",{parentName:"li"},"Context"),"\u4ee5\u540e\u8981\u5bfc\u51fa\uff0c\u8fd9\u6837\u5176\u5b83\u7ec4\u4ef6\u53ef\u4ee5\u901a\u8fc7",(0,o.kt)("inlineCode",{parentName:"li"},"import"),"\u83b7\u53d6",(0,o.kt)("inlineCode",{parentName:"li"},"Context"),"\u5171\u4eab\u7684\u503c"),(0,o.kt)("li",{parentName:"ul"},"\u5176\u4ed6\u7ec4\u4ef6\u5728\u901a\u8fc7",(0,o.kt)("inlineCode",{parentName:"li"},"import"),"\u5f15\u5165",(0,o.kt)("inlineCode",{parentName:"li"},"Context"),"\u4ee5\u540e\uff0c\u53ef\u4ee5\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"li"},"Context.Consumer"),"\u6765\u8ba2\u9605 context \u7684\u53d8\u5316\uff0c",(0,o.kt)("inlineCode",{parentName:"li"},"Context.Consumer"),"\u5185\u90e8\u5fc5\u987b\u662f\u4e00\u4e2a\u51fd\u6570\u4f5c\u4e3a\u5b50\u5143\u7d20\uff0c\u8fd9\u4e2a\u51fd\u6570\u63a5\u6536\u5f53\u524d\u7684 context \u503c\uff0c\u5e76\u8fd4\u56de\u4e00\u4e2a React \u8282\u70b9")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"| pure","|":!0,pure:!0},"<ThemeContext.Consumer>\n  {value => <input value={value} />}\n</ThemeContext.Consumer>\n")),(0,o.kt)("h4",{id:"createstore"},"createStore"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"createStore(reducer,[preloadedState],enhancer)"),"\u6839\u636e Reducer \u521b\u5efa Store\u3002"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"reducer"),"\uff1a\u5c31\u662f\u4ece Reucer \u5bfc\u51fa\u7684 reducer \u51fd\u6570\uff0c\u8d1f\u8d23\u63a5\u6536\u65b0\u7684",(0,o.kt)("inlineCode",{parentName:"p"},"state"),"\u548c Action\uff1b"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"preloadedState"),"\uff1a\u521d\u59cb\u65f6\u7684 state\uff0c\u4e00\u822c\u6765\u8bf4\u662f\u653e\u5728 reducer \u4e2d\uff0c\u65b9\u4fbf\u7ba1\u7406\uff1b"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"enhancer"),"\uff1a\u8fd9\u4e2a\u53c2\u6570\u4f20\u5165\u4e00\u4e2a\u7ec4\u5408\u591a\u4e2a Store \u7684\u9ad8\u9636\u51fd\u6570\uff0c\u8fd4\u56de\u4e00\u4e2a\u65b0\u7684\u4ea7\u751f Store \u7684\u51fd\u6570"),(0,o.kt)("h4",{id:"connect"},"connect"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"connect(mapStateToProps,mapDispatchToProps,[mergeProps],[options])"),"\u51fd\u6570\u662f\u4e00\u4e2a\u9ad8\u9636\u51fd\u6570\uff0c\u8d1f\u8d23\u5c06 UI \u7ec4\u4ef6\uff0cAction\uff0cReducer \u8fde\u63a5\u8d77\u6765\u3002"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps(state,[ownProps])"),"\uff1a\u5982\u679c\u4e00\u4e2a\u7ec4\u4ef6\u9700\u8981\u76d1\u542c Store \u5185\u90e8",(0,o.kt)("inlineCode",{parentName:"p"},"state"),"\u7684\u66f4\u65b0\uff0c\u90a3\u4e48\u5fc5\u987b\u4f20\u5165\u8fd9\u4e2a\u51fd\u6570\u3002\u8fd9\u4e2a\u51fd\u6570\u53ef\u4ee5\u63a5\u53d7\u4e24\u4e2a\u53c2\u6570\uff0c\u66f4\u65b0\u540e\u7684",(0,o.kt)("inlineCode",{parentName:"p"},"state"),"\u4ee5\u53ca\u5176\u4ed6\u7ec4\u4ef6\u4f20\u7ed9\u5f53\u524d\u7ec4\u4ef6",(0,o.kt)("inlineCode",{parentName:"p"},"ownProps"),"\uff1b\u5728\u63a5\u6536\u5230\u65b0\u7684",(0,o.kt)("inlineCode",{parentName:"p"},"state"),"\u4ee5\u540e\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"mapStateToProps"),"\u53ef\u4ee5\u5728\u5185\u90e8\u64cd\u4f5c\u8fd4\u56de\u5f53\u524d\u7ec4\u4ef6\u9700\u8981\u7684",(0,o.kt)("inlineCode",{parentName:"p"},"state"),"\uff0c\u901a\u8fc7",(0,o.kt)("inlineCode",{parentName:"p"},"props"),"\u7684\u5f62\u5f0f\u4f20\u9012\u5230\u7ec4\u4ef6\u5185\u90e8")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"mapDispatchToProps(dispatch,ownProps)"),"\uff1a\u8fd8\u8bb0\u5f97\u4e0a\u6587\u8bf4\u8fc7\u7684\u5417\uff0c",(0,o.kt)("strong",{parentName:"p"},"Redux \u4e0d\u5b58\u5728",(0,o.kt)("inlineCode",{parentName:"strong"},"state"),"\u548c",(0,o.kt)("inlineCode",{parentName:"strong"},"props"),"\u7684\u6982\u5ff5\u4f20\u9012\u6570\u636e\u4f9d\u8d56 Action"),"\uff1b",(0,o.kt)("inlineCode",{parentName:"p"},"mapDispatchToProps"),"\u51fd\u6570\u5c06\u8fd4\u56de\u4e00\u4e2a\u5bf9\u8c61\uff0c\u5bf9\u8c61\u7684\u6bcf\u4e2a\u5b57\u6bb5\u90fd\u662f\u4e00\u4e2a\u51fd\u6570\uff0c\u5728\u8c03\u7528\u8fd9\u4e9b\u51fd\u6570\u7684\u65f6\u5019\u5c31\u4f1a\u751f\u6210 Action\uff0c\u7136\u540e Action \u4f1a\u88ab\u4f20\u9001\u5230 Store \u5185\u90e8\u901a\u8fc7 Reducer \u8fdb\u884c\u5904\u7406\u3002"),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"dispatch"),"\u5c31\u662f\u751f\u6210 Action \u7684\u51fd\u6570\uff0c\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"dispatch")," \u4f1a\u901a\u8fc7",(0,o.kt)("inlineCode",{parentName:"p"},"props"),"\u6ce8\u5165\u5230\u7ec4\u4ef6\u5185\u90e8\uff0c\u8fd9\u6837\u7ec4\u4ef6\u5185\u90e8\u5c31\u53ef\u4ee5\u5728\u4ea4\u4e92\u7684\u8fc7\u7a0b\u4e2d\u4ea7\u751f Action \u89e6\u53d1",(0,o.kt)("inlineCode",{parentName:"p"},"dispatch")," \u4e8b\u4ef6\uff0c\u7136\u540e Store \u5c31\u53ef\u4ee5\u83b7\u53d6 Action\u3002")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"mergeProps"),"\uff1a\u989d\u5916\u7684\u4f20\u5165\u7ec4\u4ef6\u5185\u90e8\u7684",(0,o.kt)("inlineCode",{parentName:"p"},"props"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("inlineCode",{parentName:"p"},"options"),"\uff1a\u4e00\u4e2a\u989d\u5916\u7684\u53c2\u6570\u5bf9\u8c61\uff0c\u53ef\u4ee5\u8bbe\u7f6e\u4ee5\u4e0b\u53c2\u6570\uff1a"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"pure: true"),"\uff1a\u9ed8\u8ba4\u503c\u5c31\u662f",(0,o.kt)("inlineCode",{parentName:"li"},"true"),"\uff0c\u4e5f\u5c31\u662f\u5c06\u5bf9\u7ec4\u4ef6\u5185\u90e8\u7684",(0,o.kt)("inlineCode",{parentName:"li"},"state"),"\u8fdb\u884c\u4e00\u4e2a\u6d45\u6bd4\u8f83\uff0c\u907f\u514d\u4e0d\u5fc5\u8981\u7684\u6839\u672c\u66f4\u65b0"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"withRef: false"),"\uff1a\u9ed8\u8ba4\u503c",(0,o.kt)("inlineCode",{parentName:"li"},"false"),"\uff0c\u4fdd\u5b58\u4e00\u4e2a\u5bf9\u88ab\u88ab\u5305\u542b\u7684\u7ec4\u4ef6\u5b9e\u4f8b\u7684\u5f15\u7528\uff0c\u8be5\u5f15\u7528\u901a\u8fc7 ",(0,o.kt)("inlineCode",{parentName:"li"},"getWrappedInstance()")," \u65b9\u6cd5\u83b7\u5f97\u3002")))),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"connect"),"\u51fd\u6570\u4f1a\u88ab\u8c03\u7528\u4e24\u6b21\uff1a"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u7b2c\u4e00\u6b21\u8c03\u7528\uff0c\u901a\u8fc7\u5c06\u4e0a\u8ff0\u4e24\u4e2a\u51fd\u6570\u4f20\u5165\u5230",(0,o.kt)("inlineCode",{parentName:"li"},"connect"),"\u5185\u90e8\u4ee5\u540e\uff0c",(0,o.kt)("inlineCode",{parentName:"li"},"connect"),"\u4f1a\u751f\u6210\u4e00\u4e2a\u65b0\u7684\u9ad8\u9636\u51fd\u6570\uff0c\u65b0\u7684\u9ad8\u9636\u51fd\u6570\u63a5\u53d7\u7ec4\u4ef6\u4f5c\u4e3a\u53c2\u6570\uff0c\u53ef\u4ee5\u751f\u6210\u4e00\u4e2a\u9ad8\u9636\u7ec4\u4ef6"),(0,o.kt)("li",{parentName:"ul"},"\u7b2c\u4e8c\u6b21\u8c03\u7528\u4f1a\u751f\u6210\u4e00\u4e2a\u9ad8\u9636\u7ec4\u4ef6")),(0,o.kt)("h3",{id:"\u9879\u76ee\u7684\u7ba1\u7406"},"\u9879\u76ee\u7684\u7ba1\u7406"),(0,o.kt)("p",null,"\u4e00\u822c\u6765\u8bf4\uff0c\u6700\u76f4\u89c2\u7684\u5728\u9879\u76ee\u4e2d\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"react-redux"),"\u7684\u65b9\u5f0f\u662f\u5229\u7528\u4e00\u4e2a\u5355\u72ec\u7684\u6587\u4ef6\u5939",(0,o.kt)("inlineCode",{parentName:"p"},"redux"),"\u6765\u96c6\u4e2d\u7ba1\u7406\u6570\u636e\uff0c\u5728",(0,o.kt)("inlineCode",{parentName:"p"},"redux"),"\u76ee\u5f55\u4e2d\uff0c"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"actions"),"\u8d1f\u8d23\u751f\u6210 Action\uff0c\u8fd9\u6837\u7ec4\u4ef6\u5185\u90e8\u53ef\u4ee5\u76f4\u63a5\u5c06",(0,o.kt)("inlineCode",{parentName:"li"},"actions"),"\u5185\u90e8\u5bfc\u51fa\u751f\u6210 Action \u7684\u51fd\u6570\u4f20\u9012\u7ed9",(0,o.kt)("inlineCode",{parentName:"li"},"mapDispatchToProps"),"\uff0c\u7136\u540e\u7ec4\u4ef6\u5185\u90e8\u5c31\u53ef\u4ee5\u901a\u8fc7",(0,o.kt)("inlineCode",{parentName:"li"},"props"),"\u83b7\u53d6\u5230\u751f\u6210 Action \u7684\u51fd\u6570\uff0c\u5c06\u6570\u636e\u4f20\u9012\u7ed9\u5b83\uff0c\u4f8b\u5982\uff1a")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"// actions\u6587\u4ef6\u5939\u4e2d\u8d1f\u8d23\u751f\u6210Action\u7684\u51fd\u6570\nexport const addTodo = value => ({\n  type: 'ADD_TODO',\n  payload: {\n    id: ++todoId,\n    value,\n  },\n});\n\nexport const toggleTodo = todoId => ({\n  type: 'TOGGLE_TODO',\n  payload: { id: todoId },\n});\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"| pure","|":!0,pure:!0},"//\u7ec4\u4ef6\nimport React, { Component } from 'react';\nimport { connect } from 'react-redux';\nimport { addTodo } from '../../redux/actions';\n\nclass Input extends Component {\n  state = {\n    value: '',\n  };\n\n  handleInput = e => {\n    this.setState({\n      value: e.target.value,\n    });\n  };\n\n  handleEnterKeyUp = e => {\n    if (e.keyCode === 13) {\n      this.setState({ value: '' });\n      //\u83b7\u53d6props\u6ce8\u5165\u7684\u751f\u6210Action\u7684\u51fd\u6570\n      this.props.addTodo(this.state.value);\n    }\n  };\n\n  render() {\n    return (\n      <input\n        placeholder=\"\u8bf7\u8f93\u5165\u4e8b\u9879\"\n        value={this.state.value}\n        onChange={this.handleInput}\n        onKeyUp={this.handleEnterKeyUp}\n      />\n    );\n  }\n}\n\n//\u76f4\u63a5\u5c06\u751f\u6210Action\u7684\u51fd\u6570\u653e\u5728\u5bf9\u8c61\u4e2d\u4f20\u9012\u7ed9connect\uff0c\u7b80\u5355\u7b80\u6d01\nexport default connect(null, { addTodo })(Input);\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"reducers"),"\u8d1f\u8d23\u6784\u5efa\u64cd\u4f5c",(0,o.kt)("inlineCode",{parentName:"li"},"state"),"\u7684 Reducer\uff0c\u5e76\u751f\u6210\u65b0\u7684",(0,o.kt)("inlineCode",{parentName:"li"},"state"),"\uff1b\u5404\u4e2a\u7ec4\u4ef6\u6216\u8005\u9875\u9762\u7684 Reducer \u53ef\u4ee5\u62c6\u5206\uff0c\u7136\u540e\u5728",(0,o.kt)("inlineCode",{parentName:"li"},"index.js"),"\u4e2d\u7edf\u4e00\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"li"},"combineReducers"),"\u7ec4\u5408")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"const initState = {\n  todoList: [],\n};\n\n/**\n * \u63a5\u6536\u5f53\u524dstate\u548cAction\uff0c\u6839\u636e\u4e0d\u540c\u7684Action\u6267\u884c\u4e0d\u540c\u7684\u64cd\u4f5c\uff0c\u7136\u540e\u8fd4\u56de\u7684\u65b0\u7684state\n * @param {Object} state\n * @param {Object} action\n */\nexport default function(state = initState, action) {\n  switch (action.type) {\n    case actionType.add_todo: {\n      const { id, value } = action.payload;\n      return {\n        todoList: [\n          ...state.todoList,\n          {\n            id,\n            value,\n            isComplete: false,\n          },\n        ],\n      };\n    }\n    case actionType.set_complete: {\n      const { id } = action.payload;\n      const newTodoList = [...state.todoList];\n      const oldIndex = newTodoList.findIndex(item => item.id === id);\n      let todoItem = newTodoList[oldIndex];\n      todoItem.isComplete = true;\n      newTodoList.splice(oldIndex, 1, todoItem);\n      return {\n        todoList: newTodoList,\n      };\n    }\n    default:\n      return state;\n  }\n}\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"store"),"\u53ea\u8d1f\u8d23\u6839\u636e",(0,o.kt)("inlineCode",{parentName:"li"},"reducers"),"\u6587\u4ef6\u5939\u5bfc\u51fa\u7684 Reducer \u751f\u6210 Store")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { createStore } from 'redux';\nimport reducer from '../reducers';\n\nexport default createStore(reducer);\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u6700\u540e\u7531",(0,o.kt)("inlineCode",{parentName:"li"},"Provider"),"\u5bf9",(0,o.kt)("inlineCode",{parentName:"li"},"store"),"\u8fdb\u884c\u5168\u5c40\u5171\u4eab")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import React from 'react';\nimport { Provider } from 'react-redux';\nimport store from './redux/store';\n\nexport default function() {\n  return (\n    <Provider store={store}>\n      <Root />\n    </Provider>\n  );\n}\n")),(0,o.kt)("p",null,"\u6700\u540e\u5c31\u662f\u8fd9\u6837\u7684\u76ee\u5f55\u7ed3\u6784\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"redux\n\u251c\u2500 actions\n\u2502    \u251c\u2500 actionType.js\n\u2502    \u2514\u2500 index.js\n\u251c\u2500 reducers\n\u2502    \u2514\u2500 index.js\n\u2514\u2500 store\n       \u2514\u2500 index.js\n")))}m.isMDXComponent=!0},80997:function(e,t,n){t.Z=n.p+"assets/images/ZZimgx-164113721066227-2453b1d4b972c5152bfbd2a78c25c916.gif"}}]);