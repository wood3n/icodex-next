"use strict";(self.webpackChunkicodex_next=self.webpackChunkicodex_next||[]).push([[7429],{3905:function(e,t,a){a.d(t,{Zo:function(){return d},kt:function(){return N}});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),m=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):p(p({},t),e)),a},d=function(e){var t=m(e.components);return n.createElement(o.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=m(a),N=r,c=u["".concat(o,".").concat(N)]||u[N]||k[N]||l;return a?n.createElement(c,p(p({ref:t},d),{},{components:a})):n.createElement(c,p({ref:t},d))}));function N(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,p=new Array(l);p[0]=u;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:r,p[1]=i;for(var m=2;m<l;m++)p[m]=a[m];return n.createElement.apply(null,p)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},61222:function(e,t,a){a.r(t),a.d(t,{assets:function(){return d},contentTitle:function(){return o},default:function(){return N},frontMatter:function(){return i},metadata:function(){return m},toc:function(){return k}});var n=a(83117),r=a(80102),l=(a(67294),a(3905)),p=["components"],i={},o=void 0,m={unversionedId:"javascript/Date/Date\u7c7b\u578b",id:"javascript/Date/Date\u7c7b\u578b",title:"Date\u7c7b\u578b",description:"\u6839\u636e ES \u89c4\u8303\uff0cJS \u7684Date\u7c7b\u578b\u7684\u503c\u672c\u8d28\u4e0a\u662f\u4e00\u4e2aNumber\u7c7b\u578b\u7684\u6574\u6570\uff0c\u8868\u793a\u4ece UTC \u65f6\u95f41970\u5e7401\u670801\u65e500\u65f600\u520600\u79d2\u5230\u8be5\u65e5\u671f\u7684\u6beb\u79d2\u6570\u3002\u867d\u7136 Date \u5bf9\u8c61\u7684\u6838\u5fc3\u65f6\u95f4\u503c\u662f UTC \u65f6\u95f4\u6233\uff0c\u4f46\u83b7\u53d6\u65e5\u671f\u548c\u65f6\u95f4\u6216\u5176\u7ec4\u6210\u90e8\u5206\u7684\u57fa\u672c\u65b9\u6cd5\u90fd\u662f\u5728\u672c\u5730\uff08\u5373\u4e3b\u673a\u7cfb\u7edf\uff09\u65f6\u533a\u548c\u504f\u79fb\u91cf\u4e0b\u5de5\u4f5c\u7684\u3002",source:"@site/docs/javascript/Date/Date\u7c7b\u578b.md",sourceDirName:"javascript/Date",slug:"/javascript/Date/Date\u7c7b\u578b",permalink:"/docs/javascript/Date/Date\u7c7b\u578b",draft:!1,editUrl:"https://github.com/wood3n/icodex-next/tree/master/docs/javascript/Date/Date\u7c7b\u578b.md",tags:[],version:"current",frontMatter:{},sidebar:"javascript",previous:{title:"Date",permalink:"/docs/category/date"},next:{title:"\u8ba1\u7b97\u673a\u65f6\u95f4\u7684\u8868\u793a\u65b9\u6cd5",permalink:"/docs/javascript/Date/\u8ba1\u7b97\u673a\u65f6\u95f4\u7684\u8868\u793a\u65b9\u6cd5"}},d={},k=[{value:"\u6784\u9020\u51fd\u6570",id:"\u6784\u9020\u51fd\u6570",level:3},{value:"\u6784\u9020\u51fd\u6570\u7684\u9759\u6001\u65b9\u6cd5",id:"\u6784\u9020\u51fd\u6570\u7684\u9759\u6001\u65b9\u6cd5",level:3},{value:"Date.UTC()",id:"dateutc",level:4},{value:"Date.now()",id:"datenow",level:4},{value:"Date.parse()",id:"dateparse",level:4},{value:"\u5b9e\u4f8b\u65b9\u6cd5",id:"\u5b9e\u4f8b\u65b9\u6cd5",level:3},{value:"DateToString",id:"datetostring",level:3},{value:"DateToNumber",id:"datetonumber",level:3}],u={toc:k};function N(e){var t=e.components,a=(0,r.Z)(e,p);return(0,l.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"\u6839\u636e ES \u89c4\u8303\uff0cJS \u7684",(0,l.kt)("inlineCode",{parentName:"p"},"Date"),"\u7c7b\u578b\u7684\u503c\u672c\u8d28\u4e0a\u662f\u4e00\u4e2a",(0,l.kt)("inlineCode",{parentName:"p"},"Number"),"\u7c7b\u578b\u7684\u6574\u6570\uff0c\u8868\u793a\u4ece UTC \u65f6\u95f4",(0,l.kt)("inlineCode",{parentName:"p"},"1970\u5e7401\u670801\u65e500\u65f600\u520600\u79d2"),"\u5230\u8be5\u65e5\u671f\u7684",(0,l.kt)("strong",{parentName:"p"},"\u6beb\u79d2\u6570"),"\u3002\u867d\u7136 Date \u5bf9\u8c61\u7684\u6838\u5fc3\u65f6\u95f4\u503c\u662f UTC \u65f6\u95f4\u6233\uff0c\u4f46\u83b7\u53d6\u65e5\u671f\u548c\u65f6\u95f4\u6216\u5176\u7ec4\u6210\u90e8\u5206\u7684\u57fa\u672c\u65b9\u6cd5\u90fd\u662f\u5728\u672c\u5730\uff08\u5373\u4e3b\u673a\u7cfb\u7edf\uff09\u65f6\u533a\u548c\u504f\u79fb\u91cf\u4e0b\u5de5\u4f5c\u7684\u3002"),(0,l.kt)("p",null,"\u6839\u636e ES \u6587\u6863\u7684\u89c4\u5b9a\uff0c\u65e5\u671f\u8303\u56f4\u662f\u4ece April 20, 271821 BCE ~ September 13, 275760 CE\uff08BCE\uff1a\u516c\u5143\u524d\uff0cCE\uff1a\u516c\u5143\uff09\u3002"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},(0,l.kt)("a",{parentName:"p",href:"https://tc39.es/ecma262/#sec-time-values-and-time-range"},"Time Values and Time Range"))),(0,l.kt)("h3",{id:"\u6784\u9020\u51fd\u6570"},"\u6784\u9020\u51fd\u6570"),(0,l.kt)("p",null,"\u8981\u521b\u5efa\u4e00\u4e2a",(0,l.kt)("inlineCode",{parentName:"p"},"Date"),"\u7c7b\u578b\u7684\u5bf9\u8c61\uff0c\u5fc5\u987b\u4f7f\u7528",(0,l.kt)("inlineCode",{parentName:"p"},"new"),"\u8c03\u7528\u6784\u9020\u51fd\u6570",(0,l.kt)("inlineCode",{parentName:"p"},"Date"),"\uff1b"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},(0,l.kt)("inlineCode",{parentName:"p"},"new Date(year, month, [day, hours, minutes, seconds, ms])")),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"year")," \u5fc5\u4f20\uff0c\u53ea\u6709 1900~1999 \u4e4b\u95f4\u7684\u5e74\u4efd\u53ef\u4ee5\u7528 \u4e24\u4f4d\u6570\u5f62\u5f0f",(0,l.kt)("inlineCode",{parentName:"p"},"[0, 99]"),"\u4ee3\u8868"),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"month")," \u5fc5\u4f20 ","[0, 11]"),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"day")," \u53ef\u9009","[1, 31]","\uff0c\u9ed8\u8ba4\u662f 1"),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"hours")," \u53ef\u9009","[0, 23]","\uff0c\u9ed8\u8ba4\u662f 0"),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"minutes")," \u53ef\u9009","[0, 59]","\uff0c\u9ed8\u8ba4\u662f 0"),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"seconds")," \u53ef\u9009","[0, 59]","\uff0c\u9ed8\u8ba4\u662f 0"),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"ms")," \u53ef\u9009","[0, 999]","\uff0c\u9ed8\u8ba4\u662f 0"),(0,l.kt)("p",{parentName:"blockquote"},"@return Date \u65e5\u671f\u5bf9\u8c61")),(0,l.kt)("p",null,"\u4f9d\u6b21\u4f20\u5165\u5e74\u6708\u65e5\u65f6\u5206\u79d2\uff0c\u6beb\u79d2\u6765\u521d\u59cb\u5316\u521b\u5efa\u4e00\u4e2a\u65e5\u671f\u5bf9\u8c61\uff1b\u5728\u8fd9\u79cd\u5f62\u5f0f\u4e0b\uff0c",(0,l.kt)("inlineCode",{parentName:"p"},"year"),"\u548c",(0,l.kt)("inlineCode",{parentName:"p"},"month"),"\u5fc5\u4f20\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},"let date = new Date(1995, 11, 17, 3, 24, 0, 233);\n// Sun Dec 17 1995 03:24:00 GMT+0800 (\u4e2d\u56fd\u6807\u51c6\u65f6\u95f4)\n")),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},(0,l.kt)("inlineCode",{parentName:"p"},"new Date(dateString)"))),(0,l.kt)("p",null,"\u4f20\u5165\u4e00\u4e2a\u65f6\u95f4\u7684\u5b57\u7b26\u4e32\u5f62\u5f0f\uff0c\u6765\u521b\u5efa\u4e00\u4e2a\u5bf9\u8c61\uff1b\u8fd9\u4e2a\u53c2\u6570\u548c",(0,l.kt)("inlineCode",{parentName:"p"},"Date.parse()"),"\u8fd9\u4e2a\u65b9\u6cd5\u7684\u53c2\u6570\u4e00\u81f4\uff0c\u6309\u7167 ES \u89c4\u8303\u6587\u6863\u5e94\u8be5\u4f7f\u7528 ISO 8601 \u5f62\u5f0f\u7684\u5b57\u7b26\u4e32\u3002\u800c\u4e0d\u540c\u6d4f\u89c8\u5668\u89e3\u6790\u5b57\u7b26\u4e32\u7684\u5b9e\u73b0\u4e0d\u4e00\u6837\uff0c\u5927\u90e8\u5206\u90fd\u517c\u5bb9 RFC 2282 \u5f62\u5f0f\u7684\u5b57\u7b26\u4e32\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},"// ISO 8601\nlet date = new Date('1995-12-17T03:24:00');\n\n// RFC 2282\nlet date = new Date('Fri 20 Jul 2018 00:00:00 +0800');\n")),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},(0,l.kt)("inlineCode",{parentName:"p"},"new Date(timestamp)"))),(0,l.kt)("p",null,"\u4f20\u5165\u4e00\u4e2a Unix \u65f6\u95f4\u6233\u6574\u6570\u6765\u521b\u5efa\u4e00\u4e2a\u5bf9\u8c61"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},"let date = new Date(1595938968);\n// Mon Jan 19 1970 19:18:58 GMT+0800 (\u4e2d\u56fd\u6807\u51c6\u65f6\u95f4)\n")),(0,l.kt)("p",null,"\u5982\u679c\u5355\u72ec\u4f7f\u7528\u6784\u9020\u51fd\u6570\uff0c\u53ea\u4f1a\u8fd4\u56de\u4e00\u4e2a\u8868\u793a\u672c\u5730\u65f6\u533a\u5f53\u524d\u65f6\u95f4\u7684\u5b57\u7b26\u4e32\uff0c\u5e76\u4e14\u65e0\u8bba",(0,l.kt)("inlineCode",{parentName:"p"},"Date()"),"\u8fd9\u79cd\u5f62\u5f0f\u7684\u5355\u72ec\u8c03\u7528\uff0c\u62ec\u53f7\u91cc\u9762\u4f20\u4e0d\u4f20\u53c2\u6570\uff0c\u4f20\u4efb\u4f55\u53c2\u6570\uff0c\u90fd\u53ea\u4f1a\u8fd4\u56de\u5f53\u524d\u65f6\u533a\u7684\u65f6\u95f4\u5b57\u7b26\u4e32\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},"Date(); //String : Tue Jul 28 2020 20:16:28 GMT+0800 (\u4e2d\u56fd\u6807\u51c6\u65f6\u95f4)\n")),(0,l.kt)("h3",{id:"\u6784\u9020\u51fd\u6570\u7684\u9759\u6001\u65b9\u6cd5"},"\u6784\u9020\u51fd\u6570\u7684\u9759\u6001\u65b9\u6cd5"),(0,l.kt)("h4",{id:"dateutc"},"Date.UTC()"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},(0,l.kt)("inlineCode",{parentName:"p"},"Date.UTC(year, [month, day, hours, minutes, seconds, ms])")),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"year")," \u5fc5\u4f20\uff0c\u53ea\u6709 1900~1999 \u4e4b\u95f4\u7684\u5e74\u4efd\u53ef\u4ee5\u7528 \u4e24\u4f4d\u6570\u5f62\u5f0f",(0,l.kt)("inlineCode",{parentName:"p"},"[0, 99]"),"\u4ee3\u8868"),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"month")," \u53ef\u9009 ","[0, 11]","\uff0c\u9ed8\u8ba4\u662f 0"),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"day")," \u53ef\u9009","[1, 31]","\uff0c\u9ed8\u8ba4\u662f 1"),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"hours")," \u53ef\u9009","[0, 23]","\uff0c\u9ed8\u8ba4\u662f 0"),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"minutes")," \u53ef\u9009","[0, 59]","\uff0c\u9ed8\u8ba4\u662f 0"),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"seconds")," \u53ef\u9009","[0, 59]","\uff0c\u9ed8\u8ba4\u662f 0"),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"ms")," \u53ef\u9009","[0, 999]","\uff0c\u9ed8\u8ba4\u662f 0"),(0,l.kt)("p",{parentName:"blockquote"},"@return Number \u6beb\u79d2\u6570")),(0,l.kt)("p",null,"\u8fd4\u56de\u6307\u5b9a\u65e5\u671f\u8ddd\u79bb",(0,l.kt)("inlineCode",{parentName:"p"},"1, 1970, 00:00:00 UTC"),"\u4e4b\u95f4\u7684\u6beb\u79d2\u6570\uff0c\u5176\u5b9e\u4e5f\u5c31\u662f\u751f\u6210\u4e00\u4e2a\u65f6\u95f4\u6233\u3002"),(0,l.kt)("p",null,"\u5728\u6700\u65b0\u7684 ES \u89c4\u8303\u4e2d\uff0c",(0,l.kt)("inlineCode",{parentName:"p"},"year"),"\u5fc5\u4f20\uff0c\u5176\u5b83\u53ef\u9009\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},"console.log(Date.UTC(96, 1, 2, 3, 4, 5)); //823230245000\n")),(0,l.kt)("h4",{id:"datenow"},"Date.now()"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},(0,l.kt)("inlineCode",{parentName:"p"},"Date.now()")),(0,l.kt)("p",{parentName:"blockquote"},"@return Number \u6beb\u79d2\u6570")),(0,l.kt)("p",null,"\u8fd4\u56de\u5f53\u524d UTC \u65f6\u95f4\u5230",(0,l.kt)("inlineCode",{parentName:"p"},"1, 1970, 00:00:00 UTC"),"\u4e4b\u95f4\u7684\u6beb\u79d2\u6570"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},"console.log(Date.now()); //1595943465351\n")),(0,l.kt)("h4",{id:"dateparse"},"Date.parse()"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},(0,l.kt)("inlineCode",{parentName:"p"},"Date.parse(dateString)")),(0,l.kt)("p",{parentName:"blockquote"},"@param ",(0,l.kt)("inlineCode",{parentName:"p"},"dateString")," ISO8601 \u5f62\u5f0f\u65f6\u95f4\u5b57\u7b26\u4e32\uff0c\u4e5f\u517c\u5bb9 RFC 2282 \u5f62\u5f0f\u7684\u5b57\u7b26\u4e32"),(0,l.kt)("p",{parentName:"blockquote"},"@return Number \u6beb\u79d2\u6570")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},"// ISO 8601\nDate.parse('1995-12-17T03:24:00');\n\n// RFC 2282\nDate.parse('Fri 20 Jul 2018 00:00:00 +0800');\n")),(0,l.kt)("h3",{id:"\u5b9e\u4f8b\u65b9\u6cd5"},"\u5b9e\u4f8b\u65b9\u6cd5"),(0,l.kt)("p",null,"\u4ee5\u4e0b\u8fd4\u56de\u65e5\u671f\u5bf9\u8c61\u7684\u6307\u5b9a\u90e8\u5206"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u65b9\u6cd5"),(0,l.kt)("th",{parentName:"tr",align:null},"\u7ed3\u679c"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.getDay()")),(0,l.kt)("td",{parentName:"tr",align:null},"\u6839\u636e\u672c\u5730\u65f6\u95f4\u8fd4\u56de\u6307\u5b9a\u65e5\u671f\u7684\u661f\u671f\u51e0\uff0c",(0,l.kt)("inlineCode",{parentName:"td"},"[0, 6]"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.getDate()")),(0,l.kt)("td",{parentName:"tr",align:null},"\u6839\u636e\u5f53\u5730\u65f6\u95f4\u8fd4\u56de\u6307\u5b9a\u65e5\u671f\u5728\u6708\u4e2d\u7684\u7b2c\u51e0\u5929\uff0c",(0,l.kt)("inlineCode",{parentName:"td"},"[1, 31]"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.getMonth()")),(0,l.kt)("td",{parentName:"tr",align:null},"\u6839\u636e\u672c\u5730\u65f6\u95f4\u8fd4\u56de\u6307\u5b9a\u65e5\u671f\u7684\u6708\u4efd\uff0c",(0,l.kt)("inlineCode",{parentName:"td"},"[0, 11]"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.getFullYear()")),(0,l.kt)("td",{parentName:"tr",align:null},"\u6839\u636e\u5f53\u5730\u65f6\u95f4\u8fd4\u56de\u6307\u5b9a\u65e5\u671f\u7684\u5e74\u4efd\uff0c",(0,l.kt)("inlineCode",{parentName:"td"},"[0000, 9999]"),(0,l.kt)("br",null),"\u8981\u6ce8\u610f\u4e24\u4f4d\u6570",(0,l.kt)("inlineCode",{parentName:"td"},"[0, 99]"),"\u53ea\u80fd\u4ee3\u8868",(0,l.kt)("inlineCode",{parentName:"td"},"1900~1999"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.getHours()")),(0,l.kt)("td",{parentName:"tr",align:null},"\u6839\u636e\u5f53\u5730\u65f6\u95f4\u8fd4\u56de\u6307\u5b9a\u65e5\u671f\u7684\u5c0f\u65f6\uff0c",(0,l.kt)("inlineCode",{parentName:"td"},"[0, 23]"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.getMinutes()")),(0,l.kt)("td",{parentName:"tr",align:null},"\u6839\u636e\u5f53\u5730\u65f6\u95f4\u8fd4\u56de\u6307\u5b9a\u65e5\u671f\u7684\u5206\u949f\uff0c",(0,l.kt)("inlineCode",{parentName:"td"},"[0, 59]"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.getSeconds()")),(0,l.kt)("td",{parentName:"tr",align:null},"\u6839\u636e\u5f53\u5730\u65f6\u95f4\u8fd4\u56de\u6307\u5b9a\u65e5\u671f\u7684\u79d2\uff0c",(0,l.kt)("inlineCode",{parentName:"td"},"[0, 59]"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.getMilliseconds()")),(0,l.kt)("td",{parentName:"tr",align:null},"\u6839\u636e\u5f53\u5730\u65f6\u95f4\u8fd4\u56de\u6307\u5b9a\u65e5\u671f\u7684\u6beb\u79d2\uff0c",(0,l.kt)("inlineCode",{parentName:"td"},"[0, 999]"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.getTime()")),(0,l.kt)("td",{parentName:"tr",align:null},"\u57fa\u4e8e\u6807\u51c6 UTC \u6b64\u523b\u7684\u65f6\u95f4\uff0c\u8fd4\u56de unix \u65f6\u95f4\u6233\uff0c\u6ca1\u6709\u65f6\u533a\u7684\u533a\u522b")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.getUTCDate()")),(0,l.kt)("td",{parentName:"tr",align:null},"\u57fa\u4e8e\u6307\u5b9a\u65e5\u671f\u52a0\u51cf\u504f\u79fb\u91cf\u540e\u5f97\u5230\u7684 UTC \u65f6\u95f4\u5728\u6708\u4e2d\u7684\u7b2c\u51e0\u5929\uff0c",(0,l.kt)("inlineCode",{parentName:"td"},"[1, 31]"))))),(0,l.kt)("p",null,"\u4ee5",(0,l.kt)("inlineCode",{parentName:"p"},"getDate"),"\u548c",(0,l.kt)("inlineCode",{parentName:"p"},"getUTCDate"),"\u4e3a\u4f8b\uff0c\u533a\u522b UTC \u65f6\u95f4\u548c\u65f6\u533a\u504f\u79fb\u91cf\u65f6\u95f4\uff0c\u5f53\u5730\u662f\u4e2d\u56fd\u65f6\u533a\uff0c\u76f8\u5bf9\u4e8e UTC \u65f6\u95f4\u504f\u79fb\u91cf\u662f",(0,l.kt)("inlineCode",{parentName:"p"},"UTC+0800"),"\uff0c\u4e5f\u5c31\u662f\u6bd4 UTC \u5feb 8 \u5c0f\u65f6\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},"// getUTCDate\u9700\u8981\u4ee5UTC\u65f6\u95f4\u4e3a\u53c2\u8003\uff0c\u5982\u679c\u65e5\u671f\u5bf9\u8c61\u4e0d\u662f\u4ee5UTC\u4e3a\u57fa\u51c6\u5efa\u7acb\u7684\uff0c\u5fc5\u987b\u51cf\u53bb\u504f\u79fb\u91cf\u5f97\u5230UTC\u65f6\u95f4\u624d\u884c\uff0c1995-12-17T03:24:00 \u51cf\u53bb\u504f\u79fb\u91cf 8\u5c0f\u65f6 \u4e5f\u5c31\u662f\u524d\u4e00\u5929 1995-12-16T19:24:00Z \u5de6\u53f3\uff0c\u5219 getUTCDate\u8fd4\u56de\u8fd9\u4e2a\u65e5\u671f\u8868\u793a\u7684\u5929\u6570\u5c31\u662f 16\nlet date = new Date('1995-12-17T03:24:00');\n\nconsole.log(date.getDate()); // 17\nconsole.log(date.getUTCDate()); // 16\n\n//\u800c\u5982\u679c\u5728\u5efa\u7acb\u65e5\u671f\u5bf9\u8c61\u7684\u65f6\u5019\u6307\u5b9a\u5176\u4e3aUTC\u65f6\u95f4\uff0c\u4e5f\u5c31\u662f\u4e0b\u9762\u7b2c\u4e09\u4e2a\u4f8b\u5b50\uff0c\u90a3\u4e48\u5c31\u4e0d\u7528\u51cf\u53bb\u504f\u79fb\u91cf\uff0c\u56e0\u4e3a\u7cfb\u7edf\u8ba4\u5b9a\u8fd9\u4e2a\u65f6\u95f4\u5c31\u662fUTC\u65f6\u95f4\uff0c\u6240\u4ee5\u76f4\u63a5\u770b\u5176\u65e5\u671f\u90e8\u5206\uff0c\u5f97\u5230 17\nlet date = new Date('1995-12-17T03:24:00Z');\n\nconsole.log(date.getDate()); // 17\nconsole.log(date.getUTCDate()); // 17\n\n//\u800c\u5982\u679c\u6307\u5b9a\u4e86\u504f\u79fb\u91cf\uff0c\u5219\u76f4\u63a5\u6839\u636e\u8fd9\u4e2a\u504f\u79fb\u91cf\u5f97\u5230UTC\u65f6\u95f4\u4e86\uff0c1995-12-17T03:24:00 \u51cf\u53bb\u504f\u79fb\u91cf 2\u5c0f\u65f6 \u4e5f\u5c31\u662f 1995-12-17T01:24:00Z\uff0c\u4ecd\u7136\u5728\u5f53\u5929\nlet date = new Date('1995-12-17T03:24:00+0200');\n\nconsole.log(date.getDate()); // 17\nconsole.log(date.getUTCDate()); // 17\n")),(0,l.kt)("h3",{id:"datetostring"},"DateToString"),(0,l.kt)("p",null,"\u4ee5\u4e0b\u662f",(0,l.kt)("inlineCode",{parentName:"p"},"Date"),"\u5b9e\u4f8b\u4e0a\u7684\u8f6c\u5b57\u7b26\u4e32\u65b9\u6cd5"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u65b9\u6cd5"),(0,l.kt)("th",{parentName:"tr",align:null},"\u8f6c\u6362\u7ed3\u679c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u793a\u4f8b"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.toString")),(0,l.kt)("td",{parentName:"tr",align:null},"\u83b7\u53d6\u65e5\u671f\uff0c\u65f6\u95f4\uff0c\u65f6\u533a\u5b57\u7b26\u4e32\u7684\u4e32\u63a5\u7ed3\u679c"),(0,l.kt)("td",{parentName:"tr",align:null},"Fri Jul 24 2020 22:22:44 GMT+0800 (\u4e2d\u56fd\u6807\u51c6\u65f6\u95f4)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.toDateString")),(0,l.kt)("td",{parentName:"tr",align:null},"\u83b7\u53d6\u65e5\u671f\u90e8\u5206"),(0,l.kt)("td",{parentName:"tr",align:null},"Fri Jul 24 2020")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.toTimeString")),(0,l.kt)("td",{parentName:"tr",align:null},"\u83b7\u53d6\u65f6\u95f4\u90e8\u5206"),(0,l.kt)("td",{parentName:"tr",align:null},"10:34:53 GMT+0800 (\u4e2d\u56fd\u6807\u51c6\u65f6\u95f4)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.toISOString")),(0,l.kt)("td",{parentName:"tr",align:null},"\u83b7\u53d6 ISO \u683c\u5f0f\u7684\u5b57\u7b26\u4e32"),(0,l.kt)("td",{parentName:"tr",align:null},"2020-07-24T14:22:44.600Z")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.toUTCString")),(0,l.kt)("td",{parentName:"tr",align:null},"\u83b7\u53d6 RFC 7231 \u5b9a\u4e49\u7684 HTTP-date \u7684\u5f62\u5f0f"),(0,l.kt)("td",{parentName:"tr",align:null},"Fri, 24 Jul 2020 14:22:44 GMT")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.toJSON")),(0,l.kt)("td",{parentName:"tr",align:null},"\u83b7\u53d6 ISO \u683c\u5f0f\u7684\u5b57\u7b26\u4e32"),(0,l.kt)("td",{parentName:"tr",align:null},"2020-07-24T14:22:44.600Z")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.toLocaleDateString")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e0b\u5348 10:22:44\uff08\u6d4f\u89c8\u5668\u8bed\u8a00\u8bbe\u5b9a\u662f\u4e2d\u6587\uff09")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.toLocaleTimeString")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e0b\u5348 10:22:44\uff08\u6d4f\u89c8\u5668\u8bed\u8a00\u8bbe\u5b9a\u662f\u4e2d\u6587\uff09")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dateObj.toLocaleString")),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"2020/7/24 \u4e0b\u5348 10:22:44\uff08\u6d4f\u89c8\u5668\u8bed\u8a00\u8bbe\u5b9a\u662f\u4e2d\u6587\uff09")))),(0,l.kt)("p",null,"\u5728 Chrome \u7684 devtool \u6267\u884c",(0,l.kt)("inlineCode",{parentName:"p"},"console"),"\u547d\u4ee4\u6253\u5370\u51fa\u6765\u7684\u65e5\u671f\u5b57\u7b26\u4e32\u5b9e\u9645\u4e0a\u662f",(0,l.kt)("inlineCode",{parentName:"p"},"Date"),"\u7c7b\u578b\u6267\u884c",(0,l.kt)("inlineCode",{parentName:"p"},"toString()"),"\u65b9\u6cd5\u5f97\u5230\u7684\uff0c\u6240\u4ee5\u770b\u8d77\u6765\u548c UTC \u65f6\u95f4\u683c\u5f0f\u5e76\u4e0d\u4e00\u81f4\uff0c\u6ce8\u610f\u4e0d\u8981\u548c UTC \u6807\u51c6\u65f6\u95f4\u683c\u5f0f\u641e\u6df7\u6dc6\u3002"),(0,l.kt)("h3",{id:"datetonumber"},"DateToNumber"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u65b9\u6cd5"),(0,l.kt)("th",{parentName:"tr",align:null},"\u7ed3\u679c"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"Date.now()")),(0,l.kt)("td",{parentName:"tr",align:null},"\u8fd4\u56de\u81ea 1970 \u5e74 1 \u6708 1 \u65e5 00:00:00 (UTC) \u5230\u5f53\u524d UTC \u65f6\u95f4\u7684\u6beb\u79d2\u6570")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"new Date().valueOf()")),(0,l.kt)("td",{parentName:"tr",align:null},"\u8fd4\u56de\u81ea 1970 \u5e74 1 \u6708 1 \u65e5 00:00:00 (UTC) \u6307\u5b9a UTC \u65f6\u95f4\u7684\u6beb\u79d2\u6570")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"Number(new Date())")),(0,l.kt)("td",{parentName:"tr",align:null},"\u5f3a\u5236\u7c7b\u578b\u8f6c\u6362")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"+new Date()")),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e00\u5143",(0,l.kt)("inlineCode",{parentName:"td"},"+"),"\u64cd\u4f5c\u7b26\u4f1a\u5bf9\u540e\u9762\u7684\u64cd\u4f5c\u6570\u6267\u884c ToNumber \u7684\u8f6c\u6362")))),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"Date"),"\u4e0d\u662f\u539f\u59cb\u7c7b\u578b\uff0c\u5c5e\u4e8e",(0,l.kt)("inlineCode",{parentName:"p"},"Object"),"\u7c7b\u578b\uff0c\u8981\u5bf9",(0,l.kt)("inlineCode",{parentName:"p"},"Date"),"\u8f6c\u6362\u6210",(0,l.kt)("inlineCode",{parentName:"p"},"Number"),"\u7c7b\u578b\u7684\u7684\u65f6\u5019\uff0c\u4f1a\u6309\u7167\u4ee5\u4e0b\u6b65\u9aa4\u8fdb\u884c\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5148\u6267\u884c\u89c4\u8303\u5b9a\u4e49\u7684\u62bd\u8c61\u64cd\u4f5c",(0,l.kt)("a",{parentName:"li",href:"https://tc39.es/ecma262/#sec-toprimitive"},"ToPrimitive(dateObj,number)"),"\u5c06",(0,l.kt)("inlineCode",{parentName:"li"},"Date"),"\u8f6c\u539f\u59cb\u7c7b\u578b\uff0cToPrimitive \u5185\u90e8\u4f1a\u83b7\u53d6\u7c7b\u578b\u7684",(0,l.kt)("inlineCode",{parentName:"li"},"@@toPrimitive"),"\u65b9\u6cd5\uff0c\u4e5f\u5c31\u662f\u83b7\u53d6",(0,l.kt)("a",{parentName:"li",href:"https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive"},(0,l.kt)("inlineCode",{parentName:"a"},"Date.prototype[@@toPrimitive]")),"\uff1b"),(0,l.kt)("li",{parentName:"ul"},"\u63a5\u4e0b\u6765",(0,l.kt)("inlineCode",{parentName:"li"},"Date.prototype[@@toPrimitive]"),"\u5185\u90e8\u6267\u884c\u7684\u65f6\u5019\u4f1a\u5c06\u4f20\u5165\u7684\u8f6c\u6362\u7c7b\u578b\u53c2\u6570",(0,l.kt)("em",{parentName:"li"},"number"),"\u518d\u4f20\u9012\u7ed9 ES \u89c4\u8303\u5b9a\u4e49\u7684\u62bd\u8c61\u64cd\u4f5c",(0,l.kt)("a",{parentName:"li",href:"https://tc39.es/ecma262/#sec-ordinarytoprimitive"},"OrdinaryToPrimitive"),"\u53bb\u6267\u884c\uff1b"),(0,l.kt)("li",{parentName:"ul"},"OrdinaryToPrimitive \u6839\u636e\u4f20\u5165",(0,l.kt)("em",{parentName:"li"},"number"),"\uff0c\u4fbf\u5148\u6267\u884c\u5b9e\u4f8b\u4e0a\u7684",(0,l.kt)("inlineCode",{parentName:"li"},"valueOf"),"\u65b9\u6cd5\uff0c\u7136\u540e\u518d\u6267\u884c",(0,l.kt)("inlineCode",{parentName:"li"},"toString"),"\u65b9\u6cd5\uff0c\u6240\u4ee5\u4f7f\u7528",(0,l.kt)("inlineCode",{parentName:"li"},"Number"),"\u548c",(0,l.kt)("inlineCode",{parentName:"li"},"+"),"\u64cd\u4f5c\u7b26\u6267\u884c\u7684\u5f3a\u5236\u7c7b\u578b\u8f6c\u6362\u53ef\u4ee5\u5c06",(0,l.kt)("inlineCode",{parentName:"li"},"Date"),"\u7c7b\u578b\u7684\u503c\u8f6c\u6362\u6210",(0,l.kt)("inlineCode",{parentName:"li"},"Number"))),(0,l.kt)("p",null,"\u6240\u4ee5\uff0c\u7406\u8bba\u4e0a\u6240\u6709\u80fd\u5bf9\u64cd\u4f5c\u6570\u8c03\u7528\u62bd\u8c61\u64cd\u4f5c",(0,l.kt)("a",{parentName:"p",href:"https://tc39.es/ecma262/#sec-tonumber"},"ToNumber"),"\u7684\u90fd\u80fd\u5c06",(0,l.kt)("inlineCode",{parentName:"p"},"Date"),"\u7c7b\u578b\u7684\u503c\u8f6c\u6362\u6210",(0,l.kt)("inlineCode",{parentName:"p"},"Number"),"\u3002"))}N.isMDXComponent=!0}}]);