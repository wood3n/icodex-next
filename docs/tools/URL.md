---
title: URL

---

## URI

### URI

URI，Uniform Recource Identifier，统一资源标识符，用一串字符明确标识一个特定的资源，URI 使用分层命名的方案来标识资源，这样的标识使得能够使用特定的协议通过网络与资源进行交互。URI 最常见的形式是 URL。

### 格式

URI 的表示形式是以协议名称作为开头，这样每种协议都能根据自己的规范内容来拓展 URI 的形式，URI 通用形式相当于这些协议规范的超集。

URI 通用的形式只包含主要的两部分：协议和路径

> `scheme://[authority]path[?query][#fragment]`

权限信息部分`authority`由以下部分组成：

> `authority = [userinfo@]host[:port]`

![Snipaste_20200801155123](../../public/images/Snipaste_20200801155123.png)

#### 协议

协议名称由一系列字符组成，这些字符**以字母开头**，后跟字母，数字，加号（+），句点（。）或连字符（-）的任意组合。

| 方案          | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| `data`        | [Data URIs](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs) |
| `file`        | 指定主机上文件的名称                                         |
| `ftp`         | [文件传输协议](https://developer.mozilla.org/en-US/docs/Glossary/FTP) |
| `http/https`  | [超文本传输协议／安全的超文本传输协议](https://developer.mozilla.org/en-US/docs/Glossary/HTTP) |
| `mailto`      | 电子邮件地址                                                 |
| `ssh`         | 安全 shell                                                   |
| `tel`         | 电话                                                         |
| `urn`         | 统一资源名称                                                 |
| `view-source` | 资源的源代码                                                 |
| `ws/wss`      | （加密的） [WebSocket](https://developer.mozilla.org/zh-CN/docs/WebSockets) 连接 |

#### 权限

权限部分由双斜线引导`//`，权限部分是完全可选的。

- `userinfo`：以用户名和密码组合的形式`username:password`，但是出于安全原因不建议任何时候在 URI 中包含密码
- `host`：主机部分可以用域名或者 IP 地址来表示，IPv4 必须用点分十进制格式，IPv6 必须放在方括号里面`[]`
- `post`：端口

#### 路径

路径部分以斜线`/`进行分隔，如果 URI 包含`userinfo`部分，则路径必须为空或者以斜线开头`/`；如果没有`userinfo`，则路径不能为空，并且不能以斜线开头

#### 查询

查询部分由`?`分隔，其形式一般是由分隔符进行分隔的键值对组成

| 查询定界符  |            例             |
| :---------: | :-----------------------: |
| ＆符（`&`） | `key1=value1&key2=value2` |
| 分号（`;`） | `key1=value1;key2=value2` |

#### 片段

片段是一个 hash 值，使用`#`分隔，指向辅助资源的位置。如果资源是 HTML 文档，片段值通常是特定元素的`id`属性值，表示页面锚点位置。

## URL-HTTP

URL，Uniform Resource Locator，统一资源定位符，是表示 URI 的一种方式。URL 有多种协议，这种只讨论 HTTP 协议相关的。

![image-20200731214020188](../../public/images/image-20200731214020188.png)

- 主机：主机可以域名，也可以是 IP 地址。其中域名又分为顶级域名，二级域名和三级域名等等。

  - 顶级域名：.com，.cn 这些
  - 二级域名：google.com，google 属于二级域名
  - 三级域名：google.com.hk，google 属于三级域名

- 端口：如果访问的该 Web 服务器使用 HTTP 协议的标准端口（**HTTP 为`80`，HTTPS 为`443`**）授予对其资源的访问权限，则通常省略此部分。否则端口就是 URI 必须的部分。

- 路径：一般是 Wbe 服务器上文件路径的一部分，但是在`WebAPI`中这个地址可以随意定义，遵循 RESTful 设计风格的 API 一般会使用名词表示路径。

- 查询参数查询参数是`?`后面接的字符串部分，每部分参数使用`&`作为分隔符。

- 锚点：锚点一般是网页中的标题链接，使用`#`后面接某个 HTML 标签内的文本内容，对于给定锚点链接的网页，在点击锚点地址后，浏览器会直接无刷新滚动到锚点所在位置。HTML5 启用了`name`属性，所以现在创建锚点的方式就是`<a>`标签的`href`设置为`#id`的形式，`id`就是要跳转的目标元素的 id 值。锚点的内容在请求的时候不会发送到服务器。

```html
<h3 id="简单请求">简单请求</h3>

<a href="#简单请求">测试</a>
```

## URL 编码 / 百分号编码

> [百分号编码（Percent-encoding）](https://zh.wikipedia.org/wiki/百分号编码)又称 URL 编码，形式就是百分号`%`后跟十六进制数字`[0,F]`组成。

在 URL-http 中允许的字符必须是 ASCII 字符集中的字符，英文字母不区分大小写，但是英文字母建议用小写。而 ASCII 字符集又分为保留字符和非保留字符：

- 保留字符：在 URI 中具有特殊用法的字符，例如斜线字符`/`用于分隔 URI 的不同部分，`?`用于串接参数，URI 中的保留字符有以下这些
  - `:/?#[]@`：这几个字符永远定界符，即分隔 URI 不同部分；
  - `!$&'()*+,;=`：这几个字符允许在`host`，`path`中作为分隔符

```javascript
!	*	'' ()	;	:  @	&	=	+	$	,	/	?	#	[ ]
```

- 非保留字符：也就是除了保留字符以外的其他 ASCII 字符，也就是大小写字母，数字等

```javascript
A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z
a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z
0	1	2	3	4	5	6	7	8	9
-	_	.	~
```

如果在 URL 中将保留字符用于其他目的（例如斜线`/`不用做定界符），或者在 URL 中包含非 ASCII 字符，都需要进行编码处理，这里使用的是百分号编码。

### 保留字符的编码

如果是在 URL 中将 ASCII 保留字符用于其他目的（例如斜线`/`不用做定界符），那么就是对 ASCII 字符进行百分号编码；ASCII 字符本身只有单字节 8 位二进制，也就是能转成*两个 16 进制数字*，然后再前面加上百分号`%`即可表示百分比编码形式。

例如斜线`/`的 ASCII 值是 47，转二进制再每四位合并得到十六进制 2F，则斜线`/`的百分比编码就是`%2F`。

```javascript
47  =>  101111	=> 	 101111   => 2F
```

所有保留字符的百分比编码如下：

| `':'` | `'/'` | `'?'` | `'#'` | `'['` | `']'` | `'@'` | `'!'` | `'$'` | `'&'` | `"'"` | `'('` | `')'` | `'*'` | `'+'` | `','` | `';'` | `'='` | `'%'` | `' '`        |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ------------ |
| `%3A` | `%2F` | `%3F` | `%23` | `%5B` | `%5D` | `%40` | `%21` | `%24` | `%26` | `%27` | `%28` | `%29` | `%2A` | `%2B` | `%2C` | `%3B` | `%3D` | `%25` | `%20` 或 `+` |

空白字符的编码取决于不同情况：

- 在标准的 URI 形式中，空白字符会被编码成`%20`。

- 在`enctype = application/x-www-form-urlencoded`并且`method = post`提交的表单数据中，空格会使用`+`来替换；
- 在表单使用默认的`method = get`方式提交数据时，数据会串接在 URL 的查询字符串部分，此时空格也会使用`+`来替换

```javascript
https://interactive-examples.mdn.mozilla.net/pages/tabbed/form.html?name=test+test&email=test%40gmail.com
```

### 非 ASCII 字符的编码

对于非 ASCII 字符在 URL 的编码如下：

- 首先得到其 UTF-8 编码值，
- 然后每个字节也就是每两个十六进制数前面加上百分号得到`%xx`的形式
- 最后再合并

例如汉字`我`，Unicode 字符为`U+6211`，转 UTF-8 编码，再转百分比编码。

```javascript
`U+6211` 			=>			110 0010 0001 0001

//依次填入
1110xxxx 10xxxxxx 10xxxxxx
		 110   001000   010001

//得到
11100110 10001000 10010001

//转16进制
1110 0110 1000 1000 1001 0001
E 6 8 8 9 1

//UTF-8
E68891

//百分比编码
%e6%88%91
```

### application/x-www-form-urlencoded

HTML 的`<form>`表单元素具有`enctype`属性，`enctype` 就是将表单的内容提交给服务器的 [MIME 类型](http://en.wikipedia.org/wiki/Mime_type) ，这个属性的默认值是`application/x-www-form-urlencoded`。

当指定表单提交的方式`method`为`post`时，如果`enctype` 等于`application/x-www-form-urlencoded`，那么执行以下动作：

- 请求头的`Content-Type`指定为`application/x-www-form-urlencoded`；
- 表单的数据使用`&`分隔的键值对形式`key1=val1&key2=val2`提交到服务器，**键和属性值都会进行百分比编码**，这也是这种形式不支持文件上传的原因，文件一般都是以二进制数据流上传，不能编码。

> HTTP 请求体
>
> ```shell
> POST http://www.example.com HTTP/1.1 Content-Type:
> application/x-www-form-urlencoded;charset=utf-8
> title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
> ```

## JS 里的 URL 接口

### Location 接口

> [Location](https://developer.mozilla.org/en-US/docs/Web/API/Location)

`Location`接口是 HTML5 规范定义的表示当前网页 URL 的接口，在 JS 中一般使用`Document`和`Window`接口的对象属性`document.location`和`window.location`来表示当前页面的`Location`对象，`Location`没有构造函数，**拿来即用**。

#### 属性

`Location`根据 URL 的组成部分，划分了诸多属性：

- [`Location.protocol`](https://developer.mozilla.org/en-US/docs/Web/API/Location/protocol)
- [`Location.hostname`](https://developer.mozilla.org/en-US/docs/Web/API/Location/hostname)
- [`Location.port`](https://developer.mozilla.org/en-US/docs/Web/API/Location/port)
- [`Location.host`](https://developer.mozilla.org/en-US/docs/Web/API/Location/host)
- [`Location.pathname`](https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname)
- [`Location.search`](https://developer.mozilla.org/en-US/docs/Web/API/Location/search)
- [`Location.hash`](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash)
- [`Location.origin`](https://developer.mozilla.org/en-US/docs/Web/API/Location/origin) **Read only**
- [`Location.href`](https://developer.mozilla.org/en-US/docs/Web/API/Location/href)

![Snipaste_20200801182416](../../public/images/Snipaste_20200801182416.png)

#### 方法

`Location`下还提供了一些操作 URL 的方法：

- `location.assign(url)`：跳转到指定的`url`，`history.push`是无感的，但是`location.assign`会有跳转加载动画
- `location.reload(forcedReload)`：重新加载当前页面，其接受一个`boolean`类型的参数，为`true`的时候就强制浏览器从服务器加载页面资源；否则浏览器可能从缓存中读取页面
- `location.replace(url)`：跳转到指定`url`，会有跳转动画
- `location.toString()`：该方法返回一个经过百分比编码的`url`

### History

`history`和`location`的主要区别就是`location`会附带浏览器的页面跳转和加载动画效果，但是`history`是无刷新的。

#### 属性

- `history.length`：会话历史页面数目，包括当前页面；例如新开的标签页面，这个数目就是`1`
- `history.state`：历史会话状态数据
- `history.scrollRestoration`：储存回复页面滚动历史，如果这个值是`auto`则表示用户滚动到的页面位置将被恢复；如果这个值是`manual`则表示历史页面的滚动位置需要用户手动恢复

#### 方法

- `history.back()`：回退上个历史页面，如果没有历史记录则不会发生任何改变
- `history.go([delta])`：接收一个整数作为参数，表示相对于当前页面的历史堆栈偏移量，从而跳转到那个页面；如果不传这相当于`location.reload()`
- `history.forward()`：在会话历史记录中前进一页
- [`history.pushState(state, title [, url])`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)：跳转到指定`url`，并携带会话状态参数`state`和指定的`document.title`。很多现代浏览器都直接忽略了`title`这个参数，例如`chrome`，`firefox`等
- [`history.replaceState(stateObj, title, [url])`](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState)：以指定`url`和`state`替换当前页面

### URL

> [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)

#### 构造函数

`new URL(url [, base])`：根据指定`url`字符串创建`URL`接口的对象，可选参数`base`表示相对的`url`

```javascript
let m = 'https://developer.mozilla.org';
let a = new URL('/', m); // => 'https://developer.mozilla.org/'
```

#### 属性

`URL`接口里的属性和`Location`差不多，不同点为：

1. `URL`接口不能直接使用，需要通过构造函数初始化创建`URL`对象才可以，从这点来说，`location`拿过来就能用更方便

2. `Location`没有这个`searchParams`这个属性

以下是`URL`接口包含的常用属性

- `protocal`：协议
- `host`：域名
- `hostname`：域名 + 端口
- `port`：端口
- `origin`：协议，域名，端口
- `pathname`：`/`开头的路径
- `search`：`?`开头的查询字符串
- `searchParams`：[`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)格式的查询对象，`Location`没有这个属性
- `hash`：`#`开头的锚点
- `href`：整个`url`，经过百分比编码的

#### 方法

- `URL.createObjectURL(object)`：静态方法，根据指定的[`File`](https://developer.mozilla.org/en-US/docs/Web/API/File)，[`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob)，或者[`MediaSource`](https://developer.mozilla.org/en-US/docs/Web/API/MediaSource)创建`URL`对象并返回，可以用在`img`的`src`等属性中

- `URL.revokeObjectURL(objectURL)`：静态方法，将`URL.createObjectURL`创建的`URL`再转换成原始对象，通常和`URL.createObjectURL`一起使用

- `url.toString()`：返回经过百分比编码的`url`
- `url.toJSON()`：返回经过百分比编码的`url`

### URLSearchParams

`URLSearchParams`专门用来操作`url.search`部分的字符串

#### 构造函数

`new URLSearchParams(searchParams)`：创建一个`URLSearchParams`对象，可接受以下类型的参数：

```javascript
// 普通字符串
var params2 = new URLSearchParams('foo=1&bar=2');

// location.search或者url.search
var params2a = new URLSearchParams('?foo=1&bar=2');

// 键值对形式的数组
var params3 = new URLSearchParams([
  ['foo', '1'],
  ['bar', '2'],
]);

// 对象
var params4 = new URLSearchParams({ foo: '1', bar: '2' });
```

#### 方法

- `urlSearchParams.has(name)`：是否找得到指定属性
- `urlSearchParams.get(name)`：返回指定的属性值，没找到就返回`null`
- `urlSearchParams.getAll(name)`：返回所有属性的值组成的数组
- `urlSearchParams.set(name, value)`：设置某个属性的值
- `urlSearchParams.append(name, value)`：向`URLSearchParams`对象添加键值对
- `urlSearchParams.delete(name)`：删除`URLSear chParams`对象中指定属性
- `urlSearchParams.forEach(fn)`：接受一个函数，函数的的参数是`value`和`key`
- `urlSearchParams.keys()`：返回一个可被`for...of`迭代的迭代器，每次遍历返回属性名称
- `urlSearchParams.values()`：返回一个可被`for...of`迭代的迭代器，每次遍历返回属性的值
- `urlSearchParams.entries()`：返回一个可被`for...of`迭代的迭代器，每次遍历返回当前键值对形式的数组
- `urlSearchParams.sort()`：根据属性名称所在的 Unicode 码点值进行排序，这种排序算法是稳定的，即具有相同键的键/值对之间的相对顺序每次排序都是相同的

```javascript
var paramsString = 'q=URLUtils.searchParams&topic=api';
var searchParams = new URLSearchParams(paramsString);

for (let p of searchParams) {
  console.log(p);
}

searchParams.has('topic') === true; // true
searchParams.get('topic') === 'api'; // true
searchParams.getAll('topic'); // ["api"]
searchParams.get('foo') === null; // true
searchParams.append('topic', 'webdev');
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set('topic', 'More webdev');
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete('topic');
searchParams.toString(); // "q=URLUtils.searchParams"
```

## JS 中的 URL 编码方法

在 ES 规范文档中提供两个标准的全局函数用于处理 URL 编码，`encodeURI`和`encodeURIComponent`，与他们分别对应的还有两个解码方法`decodeURI`和`decodeURIComponent`

### encodeURI

> [encodeURI(str)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) -> `decodeURI`

`encodeURI`不会对 ASCII 字符集中的以下字符进行编码，包括大小写英文字母，数字，URI 保留字符：

```javascript
A-Z
a-z
0-9
- _ . ! ~ * ' ( )  		; , / ? : @ & = + $ #
```

### encodeURIComponent

> [encodeURIComponent(str)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) -> `decodeURIComponent`

`encodeURIComponent`不会对以下 71 个字符进行编码

```javascript
A-Z
a-z
0-9
- _ . ! ~ * ' ( )
```

### 使用场景

`encodeURI`不会对 URL 中用于分隔的字符进行编码，而`encodeURIComponent`不编码的字符只有 71 个，其中用于分隔 URI 各部分的字符`/`，`?`，`=`，`&`，`#`等都会进行编码，所以

- **`encodeURIComponent`适合编码 URI 中的一部分内容**，例如`queryString`部分，编码完了再和 URL 串接起来发送到后端去处理，`encodeURIComponent`使用的更多；
- 如果你希望将整个 URL 放进另一个 URL 中去处理请求，这样就应该使用`encodeURIComponent`了

```javascript
console.log(
  encodeURIComponent(
    'http://www.example.com:8080/path1/path2?name=test&value=1#anchor',
  ),
);

// http%3A%2F%2Fwww.example.com%3A8080%2Fpath1%2Fpath2%3Fname%3Dtest%26value%3D1%23anchor

console.log(
  encodeURI('http://www.example.com:8080/path1/path2?name=test&value=1#anchor'),
);

// http://www.example.com:8080/path1/path2?name=test&value=1#anchor
```

## URL 的最大长度

URL 的长度问题其实不是太常涉及到，一般来说不太了解 HTTP `GET`请求方法的人喜欢将`URL长度限制`这种结论归结到`GET`请求的不足中去。

根据 stackoverflow 提问 —— [What is the maximum length of a URL in different browsers](https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers)，该问题的第一个回答大致可以看出 HTTP 方面并没有限制 URI 长度的规定，但是不同浏览器对 URL 的限制长度不同，并且服务器方面也会有限制，当服务器无法处理超长 URL 时，应该返回`414`状态码表示**请求的 URL 过长**。同时答案也建议 URL 控制在`2000`个字符以内，这样基本能满足不同浏览器和服务器的限制。

| 浏览器  | 长度限制                                         |
| ------- | ------------------------------------------------ |
| Chrome  | 2M，超出后不会尝试打开页面                       |
| FireFox | 1M，超出后报异常也不会打开页面                   |
| Safari  | 无限制                                           |
| IE      | IE11 之前是 2083 个字符，IE11 以后是 2048 个字符 |

| 服务器                                                       | 限制                         |
| ------------------------------------------------------------ | ---------------------------- |
| [nginx - large_client_header_buffers](http://nginx.org/en/docs/http/ngx_http_core_module.html#large_client_header_buffers) | 默认是 8kB，可以手动配置修改 |
| [apache](https://httpd.apache.org/docs/2.4/mod/core.html#limitrequestline) | 默认是 8190，8 KB            |
| [Tomcat - maxHttpHeaderSize](https://tomcat.apache.org/tomcat-8.0-doc/config/http.html) | 默认是 8192 ，8 KB           |
