"use strict";(self.webpackChunkicodex_next=self.webpackChunkicodex_next||[]).push([[6468],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return d}});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,c=e.originalType,l=e.parentName,s=a(e,["components","mdxType","originalType","parentName"]),f=u(n),d=i,p=f["".concat(l,".").concat(d)]||f[d]||m[d]||c;return n?r.createElement(p,o(o({ref:t},s),{},{components:n})):r.createElement(p,o({ref:t},s))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var c=n.length,o=new Array(c);o[0]=f;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:i,o[1]=a;for(var u=2;u<c;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},52991:function(e,t,n){n.d(t,{Z:function(){return v}});var r=n(67294),i=n(34334),c=n(24575),o=n(39960),a=n(13919),l=n(95999),u="cardContainer_fWXF",s="cardTitle_rnsV",m="cardDescription_PWke";function f(e){var t=e.href,n=e.children;return r.createElement(o.Z,{href:t,className:(0,i.Z)("card padding--lg",u)},n)}function d(e){var t=e.href,n=e.icon,c=e.title,o=e.description;return r.createElement(f,{href:t},r.createElement("h2",{className:(0,i.Z)("text--truncate",s),title:c},n," ",c),o&&r.createElement("p",{className:(0,i.Z)("text--truncate",m),title:o},o))}function p(e){var t=e.item,n=(0,c.Wl)(t);return n?r.createElement(d,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:(0,l.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function g(e){var t,n=e.item,i=(0,a.Z)(n.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",o=(0,c.xz)(null!=(t=n.docId)?t:void 0);return r.createElement(d,{href:n.href,icon:i,title:n.label,description:null==o?void 0:o.description})}function y(e){var t=e.item;switch(t.type){case"link":return r.createElement(g,{item:t});case"category":return r.createElement(p,{item:t});default:throw new Error("unknown item type "+JSON.stringify(t))}}function b(e){var t=e.className,n=(0,c.jA)();return r.createElement(v,{items:n.items,className:t})}function v(e){var t=e.items,n=e.className;if(!t)return r.createElement(b,e);var o=(0,c.MN)(t);return r.createElement("section",{className:(0,i.Z)("row",n)},o.map((function(e,t){return r.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},r.createElement(y,{item:e}))})))}},98941:function(e,t,n){n.r(t),n.d(t,{assets:function(){return f},contentTitle:function(){return s},default:function(){return g},frontMatter:function(){return u},metadata:function(){return m},toc:function(){return d}});var r=n(83117),i=n(80102),c=(n(67294),n(3905)),o=n(52991),a=n(24575),l=["components"],u={title:"\u76ee\u5f55",slug:"/engineer/guides"},s=void 0,m={unversionedId:"engineer/index",id:"engineer/index",title:"\u76ee\u5f55",description:"",source:"@site/docs/engineer/index.md",sourceDirName:"engineer",slug:"/engineer/guides",permalink:"/docs/engineer/guides",draft:!1,editUrl:"https://github.com/wood3n/icodex-next/tree/master/docs/engineer/index.md",tags:[],version:"current",frontMatter:{title:"\u76ee\u5f55",slug:"/engineer/guides"},sidebar:"engineer",next:{title:"\u5982\u4f55\u5f00\u53d1\u4e00\u4e2ababel plugin",permalink:"/docs/engineer/Babel/babel plugin\u7f16\u5199"}},f={},d=[],p={toc:d};function g(e){var t=e.components,n=(0,i.Z)(e,l);return(0,c.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,c.kt)(o.Z,{items:(0,a.jA)().items,mdxType:"DocCardList"}))}g.isMDXComponent=!0}}]);