"use strict";(self.webpackChunkicodex_next=self.webpackChunkicodex_next||[]).push([[4498],{3905:function(e,n,t){t.d(n,{Zo:function(){return k},kt:function(){return s}});var a=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=a.createContext({}),c=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):p(p({},n),e)),t},k=function(e){var n=c(e.components);return a.createElement(l.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,k=r(e,["components","mdxType","originalType","parentName"]),u=c(t),s=o,d=u["".concat(l,".").concat(s)]||u[s]||m[s]||i;return t?a.createElement(d,p(p({ref:n},k),{},{components:t})):a.createElement(d,p({ref:n},k))}));function s(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,p=new Array(i);p[0]=u;var r={};for(var l in n)hasOwnProperty.call(n,l)&&(r[l]=n[l]);r.originalType=e,r.mdxType="string"==typeof e?e:o,p[1]=r;for(var c=2;c<i;c++)p[c]=t[c];return a.createElement.apply(null,p)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},20862:function(e,n,t){t.r(n),t.d(n,{assets:function(){return k},contentTitle:function(){return l},default:function(){return s},frontMatter:function(){return r},metadata:function(){return c},toc:function(){return m}});var a=t(83117),o=t(80102),i=(t(67294),t(3905)),p=["components"],r={title:"webpack plugin\u7f16\u5199",slug:"/webpackplugin"},l=void 0,c={unversionedId:"engineer/webpack\u539f\u7406/webpack plugin\u7f16\u5199",id:"engineer/webpack\u539f\u7406/webpack plugin\u7f16\u5199",title:"webpack plugin\u7f16\u5199",description:"\u4ec0\u4e48\u662f plugin",source:"@site/docs/engineer/webpack\u539f\u7406/webpack plugin\u7f16\u5199.md",sourceDirName:"engineer/webpack\u539f\u7406",slug:"/webpackplugin",permalink:"/docs/webpackplugin",draft:!1,editUrl:"https://github.com/wood3n/icodex-next/tree/master/docs/engineer/webpack\u539f\u7406/webpack plugin\u7f16\u5199.md",tags:[],version:"current",frontMatter:{title:"webpack plugin\u7f16\u5199",slug:"/webpackplugin"},sidebar:"engineer",previous:{title:"\u7f16\u5199 webpack loader",permalink:"/docs/webpackloader"},next:{title:"webpack\u57fa\u672c\u539f\u7406",permalink:"/docs/webpackinner"}},k={},m=[{value:"\u4ec0\u4e48\u662f plugin",id:"\u4ec0\u4e48\u662f-plugin",level:2},{value:"tapable",id:"tapable",level:2},{value:"\u751f\u547d\u5468\u671f hook",id:"\u751f\u547d\u5468\u671f-hook",level:3},{value:"\u5199\u4e00\u4e2a\u8f93\u51fa\u6253\u5305\u4ea7\u7269\u5927\u5c0f\u7684plugin",id:"\u5199\u4e00\u4e2a\u8f93\u51fa\u6253\u5305\u4ea7\u7269\u5927\u5c0f\u7684plugin",level:2}],u={toc:m};function s(e){var n=e.components,r=(0,o.Z)(e,p);return(0,i.kt)("wrapper",(0,a.Z)({},u,r,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"\u4ec0\u4e48\u662f-plugin"},"\u4ec0\u4e48\u662f plugin"),(0,i.kt)("p",null,"webpack \u7684",(0,i.kt)("inlineCode",{parentName:"p"},"plugin"),"\u662f\u4e00\u4e2a",(0,i.kt)("inlineCode",{parentName:"p"},"class"),"\uff0c\u5176\u5b9e\u4f8b\u5316\u4ee5\u540e\uff0c\u5bf9\u8c61\u5185\u90e8\u5177\u6709\u4e00\u4e2a",(0,i.kt)("inlineCode",{parentName:"p"},"apply"),"\u65b9\u6cd5\uff0c\u4f5c\u4e3a\u8c03\u7528\u7684\u5165\u53e3\u3002"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"plugin"),"\u4e3b\u8981\u7528\u4e8e\u62d3\u5c55",(0,i.kt)("inlineCode",{parentName:"p"},"webpack"),"\u80fd\u529b\uff0c\u5b83\u4eec\u53ef\u4ee5\u5728 webpack \u6784\u5efa\u7a0b\u5e8f\u8fd0\u884c\u7684\u6574\u4e2a\u751f\u547d\u5468\u671f\u53d1\u6325\u4f5c\u7528\uff0c\u4f8b\u5982\u538b\u7f29\u4ee3\u7801\uff0c\u5c06\u4ee3\u7801\u63d2\u5165\u5230 HTML \u9875\u9762\uff0c\u8f93\u51fa\u6784\u5efa\u65e5\u5fd7\u7b49\u3002"),(0,i.kt)("p",null,"\u7f16\u5199",(0,i.kt)("inlineCode",{parentName:"p"},"plugin"),"\u9700\u8981\u5bf9",(0,i.kt)("inlineCode",{parentName:"p"},"webpack"),"\u7684\u751f\u547d\u5468\u671f\u4e8b\u4ef6\u6709\u4e00\u5b9a\u7684\u4e86\u89e3\uff0c\u800c",(0,i.kt)("inlineCode",{parentName:"p"},"webpack"),"\u751f\u547d\u5468\u671f\u4e8b\u4ef6\u5efa\u7acb\u5728",(0,i.kt)("inlineCode",{parentName:"p"},"tapable"),"\u57fa\u7840\u4e0a\u3002"),(0,i.kt)("h2",{id:"tapable"},"tapable"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"webpack"),"\u7684\u6574\u4e2a\u751f\u547d\u5468\u671f\u6d41\u7a0b\u57fa\u4e8e",(0,i.kt)("a",{parentName:"p",href:"https://github.com/webpack/tapable#tapable"},(0,i.kt)("inlineCode",{parentName:"a"},"tapable")),"\u4e8b\u4ef6\u6d41\uff0c\u5728",(0,i.kt)("inlineCode",{parentName:"p"},"tappable"),"\u4e2d\u63d0\u4f9b\u4ee5\u4e0b\u57fa\u7840",(0,i.kt)("inlineCode",{parentName:"p"},"hook"),"\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"const {\n  SyncHook,\n  SyncBailHook,\n  SyncWaterfallHook,\n  SyncLoopHook,\n  AsyncParallelHook,\n  AsyncParallelBailHook,\n  AsyncSeriesHook,\n  AsyncSeriesBailHook,\n  AsyncSeriesWaterfallHook,\n} = require('tapable');\n")),(0,i.kt)("p",null,"\u8fd9\u4e9b",(0,i.kt)("inlineCode",{parentName:"p"},"hook"),"\u4ee3\u7406\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"plugin"),"\u51fd\u6570\u7684\u6267\u884c\u987a\u5e8f\u548c\u5b83\u4eec\u7684\u540d\u79f0\u5177\u6709\u5f88\u5927\u5173\u7cfb\uff0c\u4e0d\u8fc7\u597d\u5728\u4e5f\u6ca1\u591a\u5c11\u9700\u8981\u8bb0\u5fc6\u7684\uff0c\u5e38\u89c1\u7684\u4e5f\u5c31\u662f",(0,i.kt)("inlineCode",{parentName:"p"},"SyncHook"),"\u3001",(0,i.kt)("inlineCode",{parentName:"p"},"SyncBailHook"),"\u3001",(0,i.kt)("inlineCode",{parentName:"p"},"AsyncSeriesHook"),"\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"tapable",src:t(72809).Z,width:"1745",height:"901"})),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"tapable"),"\u7684\u4f7f\u7528\u6bd4\u8f83\u7b80\u5355\uff0c\u4e00\u822c\u662f\u5728\u5b9e\u4f8b\u5c5e\u6027",(0,i.kt)("inlineCode",{parentName:"p"},"hooks"),"\u4e0a\u57fa\u4e8e\u4e0a\u8ff0 hook \u7684\u5b9e\u4f8b\u6ce8\u518c\u65b0\u7684\u751f\u547d\u5468\u671f hook\uff0c\u7136\u540e\u5355\u72ec\u7684\u5b9e\u4f8b\u5c31\u53ef\u4ee5\u901a\u8fc7",(0,i.kt)("inlineCode",{parentName:"p"},"hooks"),"\u5c5e\u6027\u8bbf\u95ee\u8fd9\u4e9b\u6ce8\u518c\u7684\u751f\u547d\u5468\u671f\uff1b\u5728\u5b9e\u4f8b\u5316\u57fa\u7840 hook \u7684\u65f6\u5019\u53ef\u4ee5\u6307\u5b9a\u4e00\u4e2a\u5b57\u7b26\u4e32\u6570\u7ec4\u4f5c\u4e3a\u53c2\u6570\uff0c\u8fd9\u4e9b\u5b57\u7b26\u4e32\u6570\u7ec4\u540e\u7eed\u4f1a\u56de\u8c03\u51fd\u6570\u7684\u53c2\u6570\u540d\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"// Compilation \u7ee7\u627f\u81ea Tapable\nclass Compilation extends Tapable {\n  /**\n   * Creates an instance of Compilation.\n   * @param {Compiler} compiler the compiler which created the compilation\n   */\n  constructor(compiler) {\n    // \u5851\u9020\u5b50\u7c7b this\n    super();\n    // \u5728\u5b9e\u4f8b\u5c5e\u6027 hooks \u4e0a\u6ce8\u518c\u4ee5\u4e0b hook\n    this.hooks = {\n      buildModule: new SyncHook(['module']),\n\n      rebuildModule: new SyncHook(['module']),\n\n      failedModule: new SyncHook(['module', 'error']),\n\n      succeedModule: new SyncHook(['module']),\n\n      addEntry: new SyncHook(['entry', 'name']),\n\n      failedEntry: new SyncHook(['entry', 'name', 'error']),\n\n      succeedEntry: new SyncHook(['entry', 'name', 'module']),\n\n      dependencyReference: new SyncWaterfallHook([\n        'dependencyReference',\n        'dependency',\n        'module',\n      ]),\n\n      /** more **/\n    };\n  }\n}\n\n// \u4f7f\u7528 tap\u3001tapAsync\u3001tapPromise\u7b49\u65b9\u6cd5\u7f16\u5199 plugin \u56de\u8c03\u51fd\u6570\nconst compilation = new Compilation();\n\ncompilation.hooks.calculateRoutes.tap('EntryPlugin', (entry, name) => {\n  // ...\n});\n")),(0,i.kt)("p",null,"\u5bf9\u4e8e\u6ce8\u518c\u81ea",(0,i.kt)("inlineCode",{parentName:"p"},"Sync"),"\u5f00\u5934\u7684 hook \u53ea\u80fd\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"tap"),"\u65b9\u6cd5\u6765\u6ce8\u518c\u56de\u8c03\u51fd\u6570\uff0c\u800c\u57fa\u4e8e",(0,i.kt)("inlineCode",{parentName:"p"},"AsyncSeries"),"\u548c",(0,i.kt)("inlineCode",{parentName:"p"},"AsyncParallel"),"\u8fd9\u4e9b\u751f\u547d\u5468\u671f hook \u53ef\u4ee5\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"tap"),"\u3001",(0,i.kt)("inlineCode",{parentName:"p"},"tapAsync"),"\u548c",(0,i.kt)("inlineCode",{parentName:"p"},"tapPromise"),"\u6765\u6ce8\u518c\u56de\u8c03\u51fd\u6570\u3002"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"tapPromise"),"\u901a\u5e38\u4f1a\u8fd4\u56de",(0,i.kt)("inlineCode",{parentName:"p"},"promise"),"\u5bf9\u8c61\uff0c\u800c",(0,i.kt)("inlineCode",{parentName:"p"},"tapAsync"),"\u6ce8\u518c\u7684\u56de\u8c03\u51fd\u6570\u4f1a\u5e26\u6709\u4e00\u4e2a\u989d\u5916\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"callback"),"\u53c2\u6570\uff0c\u9700\u8981\u5728\u9002\u5f53\u7684\u65f6\u5019\u8c03\u7528\u8fd9\u4e2a",(0,i.kt)("inlineCode",{parentName:"p"},"callback"),"\u65b9\u6cd5\u6765\u901a\u77e5",(0,i.kt)("inlineCode",{parentName:"p"},"webpack"),"\u7ee7\u7eed\u6267\u884c\u540e\u7eed\u4efb\u52a1\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"compiler.hooks.entryOption.tap('MyPlugin', (context, entry) => {\n  /* ... */\n});\n\ncompiler.hooks.beforeCompile.tapAsync('MyPlugin', (params, callback) => {\n  params['MyPlugin - data'] = 'important stuff my plugin will use later';\n  callback();\n});\n\ncompiler.hooks.run.tapPromise('MyPlugin', (source, target, routesList) => {\n  return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {\n    console.log('\u4ee5\u5f02\u6b65\u7684\u65b9\u5f0f\u89e6\u53d1\u5177\u6709\u5ef6\u8fdf\u64cd\u4f5c\u7684\u94a9\u5b50\u3002');\n  });\n});\n")),(0,i.kt)("h3",{id:"\u751f\u547d\u5468\u671f-hook"},"\u751f\u547d\u5468\u671f hook"),(0,i.kt)("p",null,"\u5728",(0,i.kt)("inlineCode",{parentName:"p"},"webpack"),"\u5185\u90e8\u57fa\u4e8e",(0,i.kt)("inlineCode",{parentName:"p"},"tapable"),"\u63d0\u4f9b\u7684\u57fa\u7840 hooks\uff0c\u53c8\u5c01\u88c5\u4e86\u4e00\u4e9b\u5355\u72ec\u7684\u751f\u547d\u5468\u671f",(0,i.kt)("inlineCode",{parentName:"p"},"hook"),"\uff0c\u5b83\u4eec\u53ef\u4ee5\u5728",(0,i.kt)("inlineCode",{parentName:"p"},"plugin"),"\u5185\u90e8\u4f7f\u7528\uff0c\u5982\u4f60\u6240\u89c1\uff0c\u5728",(0,i.kt)("inlineCode",{parentName:"p"},"webpack"),"\u6587\u6863\u4e2d\u5c31\u5217\u4e3e\u4e86\u5de8\u91cf\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"hook")," \u2014\u2014 ",(0,i.kt)("a",{parentName:"p",href:"https://webpack.docschina.org/api/compiler-hooks/"},"compiler \u94a9\u5b50 | webpack \u4e2d\u6587\u6587\u6863 (docschina.org)"),"."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"compiler"),"\uff1a",(0,i.kt)("inlineCode",{parentName:"li"},"compiler"),"\u5bf9\u8c61\u76f8\u5f53\u4e8e",(0,i.kt)("inlineCode",{parentName:"li"},"webpack"),"\u6784\u5efa\u7a0b\u5e8f\u7684\u5b9e\u4f8b\uff0c\u4f34\u968f",(0,i.kt)("inlineCode",{parentName:"li"},"webpack"),"\u6784\u5efa\u7684\u6574\u4e2a\u751f\u547d\u5468\u671f"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"compilation"),"\uff1a",(0,i.kt)("inlineCode",{parentName:"li"},"compilation"),"\u5bf9\u8c61\u4f1a\u5728\u6bcf\u6b21\u89e6\u53d1\u91cd\u65b0\u7f16\u8bd1\u7684\u65f6\u5019\u5728",(0,i.kt)("inlineCode",{parentName:"li"},"compiler"),"\u5185\u90e8\u91cd\u65b0\u521b\u5efa\u4e00\u4e2a\u5b9e\u4f8b\uff0c\u6240\u4ee5",(0,i.kt)("inlineCode",{parentName:"li"},"compilation"),"\u6ce8\u518c\u7684 hook \u51fd\u6570\u4f1a\u5728\u6bcf\u6b21\u7f16\u8bd1\u7684\u65f6\u5019\u90fd\u4f1a\u6267\u884c"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"parser"),"\uff1a",(0,i.kt)("inlineCode",{parentName:"li"},"parser")," \u4f4d\u4e8e ",(0,i.kt)("a",{parentName:"li",href:"https://webpack.docschina.org/api/compiler-hooks/#normalmodulefactory"},"NormalModuleFactory")," \u4e2d\uff0c\u9700\u8981\u5728",(0,i.kt)("inlineCode",{parentName:"li"},"compiler.hooks.normalModuleFactory"),"\u7684\u5185\u90e8\u8bbf\u95ee\uff0c\u4e3b\u8981\u5728",(0,i.kt)("inlineCode",{parentName:"li"},"webpack"),"\u5185\u90e8\u89e3\u6790",(0,i.kt)("inlineCode",{parentName:"li"},"AST"),"\u7684\u65f6\u5019\u89e6\u53d1")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"compiler.hooks.normalModuleFactory.tap('MyPlugin', factory => {\n  factory.hooks.parser\n    .for('javascript/auto')\n    .tap('MyPlugin', (parser, options) => {\n      parser.hooks.someHook.tap(/* ... */);\n    });\n});\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"resolverFactory"),"\u548c",(0,i.kt)("inlineCode",{parentName:"li"},"ContextModuleFactory"),"\u4e3b\u8981\u662f\u5728",(0,i.kt)("inlineCode",{parentName:"li"},"webpack"),"\u89e3\u6790\u6587\u4ef6\u76ee\u5f55\u7684\u65f6\u5019\u89e6\u53d1")),(0,i.kt)("p",null,"\u4e00\u822c\u5173\u6ce8\u6bd4\u8f83\u591a\u7684\u8fd8\u662f",(0,i.kt)("inlineCode",{parentName:"p"},"compiler"),"\u548c",(0,i.kt)("inlineCode",{parentName:"p"},"compilation"),"\u8fd9\u4e24\u4e2a\u5bf9\u8c61\u5185\u90e8\u7684\u751f\u547d\u5468\u671f hook\uff0c\u5728\u4f7f\u7528\u5b83\u4eec\u7f16\u5199\u63d2\u4ef6\u7684\u65f6\u5019\u9700\u8981\u6ce8\u610f\u6839\u636e\u6587\u6863\u91cc\u7684\u7ee7\u627f\u5173\u7cfb\u770b\u6e05\u695a\u4f7f\u7528\u7684\u662f\u54ea\u4e2a\u57fa\u7840 hook \u6ce8\u518c\u7684\uff0c\u4ee5\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"tap"),"\u3001",(0,i.kt)("inlineCode",{parentName:"p"},"tapAsync"),"\u6216\u8005",(0,i.kt)("inlineCode",{parentName:"p"},"tapPromise"),"\u6765\u5bf9\u5e94\u6ce8\u518c\u56de\u8c03\u51fd\u6570\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"image-20220102233833961",src:t(48022).Z,width:"885",height:"450"})),(0,i.kt)("h2",{id:"\u5199\u4e00\u4e2a\u8f93\u51fa\u6253\u5305\u4ea7\u7269\u5927\u5c0f\u7684plugin"},"\u5199\u4e00\u4e2a\u8f93\u51fa\u6253\u5305\u4ea7\u7269\u5927\u5c0f\u7684plugin"),(0,i.kt)("p",null,"\u601d\u8def\u5c31\u662f\u5229\u7528 webpack \u6253\u5305\u5b8c\u7684\u4e8b\u4ef6",(0,i.kt)("inlineCode",{parentName:"p"},"done"),"\u6765\u6ce8\u518c\u56de\u8c03\u51fd\u6570\uff0c\u4ee3\u7801\u5730\u5740\uff1a",(0,i.kt)("a",{parentName:"p",href:"https://github.com/wood3n/webpack-stats-plugin"},"wood3n/webpack-stats-plugin (github.com)")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"class StatsPlugin {\n  apply(compiler) {\n    compiler.hooks.done.tap('StatsPlugin', (stats) => {\n          //do sth.\n    }\n  }\n}\n")))}s.isMDXComponent=!0},48022:function(e,n,t){n.Z=t.p+"assets/images/image-20220102233833961-0bcdfecfb8f9fde700cf3e3bc8002e1a.png"},72809:function(e,n,t){n.Z=t.p+"assets/images/tapable-b1ad0903d74666d1e82a190995c68a01.png"}}]);