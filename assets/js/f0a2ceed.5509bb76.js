"use strict";(self.webpackChunkicodex_next=self.webpackChunkicodex_next||[]).push([[8940],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return d}});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=n.createContext({}),l=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},s=function(e){var t=l(e.components);return n.createElement(u.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,s=a(e,["components","mdxType","originalType","parentName"]),f=l(r),d=o,p=f["".concat(u,".").concat(d)]||f[d]||m[d]||i;return r?n.createElement(p,c(c({ref:t},s),{},{components:r})):n.createElement(p,c({ref:t},s))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,c=new Array(i);c[0]=f;var a={};for(var u in t)hasOwnProperty.call(t,u)&&(a[u]=t[u]);a.originalType=e,a.mdxType="string"==typeof e?e:o,c[1]=a;for(var l=2;l<i;l++)c[l]=r[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},52991:function(e,t,r){r.d(t,{Z:function(){return w}});var n=r(67294),o=r(34334),i=r(24575),c=r(39960),a=r(13919),u=r(95999),l="cardContainer_fWXF",s="cardTitle_rnsV",m="cardDescription_PWke";function f(e){var t=e.href,r=e.children;return n.createElement(c.Z,{href:t,className:(0,o.Z)("card padding--lg",l)},r)}function d(e){var t=e.href,r=e.icon,i=e.title,c=e.description;return n.createElement(f,{href:t},n.createElement("h2",{className:(0,o.Z)("text--truncate",s),title:i},r," ",i),c&&n.createElement("p",{className:(0,o.Z)("text--truncate",m),title:c},c))}function p(e){var t=e.item,r=(0,i.Wl)(t);return r?n.createElement(d,{href:r,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:(0,u.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function y(e){var t,r=e.item,o=(0,a.Z)(r.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",c=(0,i.xz)(null!=(t=r.docId)?t:void 0);return n.createElement(d,{href:r.href,icon:o,title:r.label,description:null==c?void 0:c.description})}function g(e){var t=e.item;switch(t.type){case"link":return n.createElement(y,{item:t});case"category":return n.createElement(p,{item:t});default:throw new Error("unknown item type "+JSON.stringify(t))}}function v(e){var t=e.className,r=(0,i.jA)();return n.createElement(w,{items:r.items,className:t})}function w(e){var t=e.items,r=e.className;if(!t)return n.createElement(v,e);var c=(0,i.MN)(t);return n.createElement("section",{className:(0,o.Z)("row",r)},c.map((function(e,t){return n.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},n.createElement(g,{item:e}))})))}},3530:function(e,t,r){r.r(t),r.d(t,{assets:function(){return f},contentTitle:function(){return s},default:function(){return y},frontMatter:function(){return l},metadata:function(){return m},toc:function(){return d}});var n=r(83117),o=r(80102),i=(r(67294),r(3905)),c=r(52991),a=r(24575),u=["components"],l={title:"Network",slug:"/network/guides"},s=void 0,m={unversionedId:"network/index",id:"network/index",title:"Network",description:"",source:"@site/docs/network/index.md",sourceDirName:"network",slug:"/network/guides",permalink:"/docs/network/guides",draft:!1,editUrl:"https://github.com/wood3n/icodex-next/tree/master/docs/network/index.md",tags:[],version:"current",frontMatter:{title:"Network",slug:"/network/guides"},sidebar:"network",next:{title:"\u5e94\u7528\u5c42",permalink:"/docs/category/\u5e94\u7528\u5c42"}},f={},d=[],p={toc:d};function y(e){var t=e.components,r=(0,o.Z)(e,u);return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)(c.Z,{items:(0,a.jA)().items,mdxType:"DocCardList"}))}y.isMDXComponent=!0}}]);