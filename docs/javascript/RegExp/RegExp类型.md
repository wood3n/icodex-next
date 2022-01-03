---
title: RegExp类型
order: 1
nav:
  order: 6

---

## JS - RegExp

`RegExp`是 JS 中支持正则表达式的类型，每一个正则表达式都是`RegExp`的一个实例，其内部`[[prototype]]`属性指向`RegExp.prototype`

```javascript
var reg = /a+b/;
console.log(reg.__proto__);
console.log(reg.__proto__ === RegExp.prototype); //true
console.log(Object.prototype.toString.call(reg)); //[object, RegExp]
```

![image-20200703212423197](../../../public/images/image-20200703212423197.png)

### 构造函数

形式：`RegExp(pattern,flags)`

> param1：`pattern`

支持传入正则表达式的字符串内容形式（就是两斜杠之间部分），也支持正则表达式字面量传入

> param2：`flags`

可以是单个修饰符，也可以是多个修饰符组成的字符串，也可以是单个元素组成的数组，这点我是看了 lodash 深拷贝部分才知道

```javascript
//下面三种方式都可以
var re = new RegExp(/\w+/, ['ig']);
var re = new RegExp(/\w+/, 'ig');
var re = new RegExp('w+', 'ig');

//不能拆开放在数组里，会抛出SyntaxError:Invalid flags supplied to RegExp constructor 'i,g'
var re = new RegExp(/\w+/, ['i', 'g']);
```

支持以下修饰符

- `g`：global，表示匹配字符串的全部内容，并非在发现第一个匹配项就结束匹配
- `i`：insensitive，不敏感，也就是不区分大小写
- `m`：multiline，支持多行字符串的匹配
- `u`：unicode，表示提供对 unicode 的支持，JS 中的字符串使用 UTF16 编码，大多数字符使用 2 个字节编码，但这种编码方式只能编码最多`2^16`个字符，所以就需要一些字符用 4 个字节来编码，当 JS 遇到这些字符的时候，会把它们当作两个字符来处理，所以这就会引发错误，支持 Unicode 后，JS 就不会把它们"分开"，而是当作整体；例外使用`u`还可以支持查找属性字符`\p{…}`的模式
- `y`：sticky，粘滞模式，只匹配`lastIndex`指示的索引位置的字符
- `s`：singleline，连换行符也会被匹配，这个模式要和`.`一起使用

**设置了`g`或者`y`的正则表达式是有状态的，每次匹配成功会更新`lastIndex`属性，使得下一次匹配只会从`lastIndex`索引位置开始搜索，直到找不到匹配项的时候，会将`lastIndex`重新置`0`**

#### 构造函数调用

根据原型相关知识，构造函数都支持两种方式调用

> `new RegExp()`

如果第一个参数为正则表达式字面量，而未指定任何`flags`，那么将使用该正则表达式的`flags`创建一个新的对象，**新对象的实例属性都会被重置**；如果传入了`flags`，那么将使用该`flags`创建一个新的正则表达式对象

```javascript
var str = 'cat,bat,sat,fat';
var reg = /at/g;
reg.exec(str);
console.log('reg.lastIndex:', reg.lastIndex);

var newReg = new RegExp(reg);
console.log('newReg:', newReg);
console.log('newReg.lastIndex:', newReg.lastIndex);
```

![image-20200705150342485](../../../public/images/image-20200705150342485.png)

> `new regexp.constructor()`

使用正则表达式对象的`constructor`属性调用，因为`constructor`指向构造函数本身，就相当于掉用构造函数本身了

#### 构造函数属性

通过观察构造函数原型上的`constructor`属性，我们可以看到构造函数本身具有以下静态属性；这些属性适用于作用域种的所有正则表达式，并且基于所执行的最后一次正则表达式操作而变化；不过这些属性都是非标准的，不要在生产环境使用，例如`multiline`这个属性 JS 权威指南提了，但是现在已经从静态属性里面移除了

| 长属性名       | 短属性名 | 说明                                                       |
| -------------- | -------- | ---------------------------------------------------------- |
| `input`        | \$\_     | 最近一次要匹配的字符串                                     |
| `lastMatch`    | \$&      | 最近一次的匹配项                                           |
| `lastParen`    | \$+      | 最近一次匹配的捕获组                                       |
| `leftContext`  | \$`      | input 字符串中 lastMatch 之前的所有文本                    |
| `multiline`    | \$\*     | 布尔值，是否所有表达式都是用多行模式                       |
| `rightContext` | \$'      | input 字符串中 lastMatch 之后的所有文本                    |
|                | `$1~$9`  | 存储捕获组的字符，调用`exec`和`test`方法时，就会被自动填充 |

```javascript
var text = 'this has been a short summer';
var pattern = /(.)hort/g; //表示匹配后面带有hort的字符，并且把第一个字符放在捕获组中

if (pattern.test(text)) {
  console.log(RegExp.input); //this has been a short summer
  console.log(RegExp.lastMatch); //short
  console.log(RegExp.lastParen); //s
  console.log(RegExp.leftContext); //this has been a
  console.log(RegExp.multiline); //false
  console.log(RegExp.rightContext); // summer
}
```

### 创建正则表达式

正则表达式支持三种方式创建

- 使用正则表达式字面量，在两条斜杠之间书写，注意**第一个字符不能是`*`**，结尾串接修饰符

```javascript
var re = /\w+/;
```

- 使用`RegExp`构造函数和字面量

```javascript
var re = new RegExp(/\w+/, 'i');
```

- 使用`RegExp`构造函数和正则表达式的字符串内容，对于内部包含的特殊字符必须要转义

```javascript
var re = new RegExp('\\w+', 'g');
```

使用字面量和构造函数的区别是：

- 在 ES3 的时候使用正则表达式字面量使用的都是同一个实例，而使用构造函数创建的是不同的实例，因为正则表达式在 JS 中式引用类型，所以使用同一个实例在正则表达式变化时会有很大麻烦；ES5 之后明确正则表达式字面量也要每次创建一个实例；
- 如果正则表达式不变，使用字面量形式性能更好；因为字面量形式就是正则表达式的编译状态，例如当你在循环中使用字面量构造一个正则表达式时，正则表达式不会在每一次迭代中都被重新编译

### 实例属性

实际上这里的属性都是定义在原型上的，应该是原型属性，可以通过`Object.getPrototypeOf(obj)`或者`obj.__proto__`来查看到这些属性

| 属性         | 说明                                                         | 是否支持修改 |
| ------------ | ------------------------------------------------------------ | ------------ |
| `global`     | 是否设置了`g`                                                | no           |
| `ignoreCase` | 是否设置了`i`                                                | no           |
| `lastIndex`  | 表示开始搜索下一匹配项的字符位置，从`0`开始，是上一次匹配字符串结尾的下一个字符的索引 | 支持         |
| `multiline`  | 是否设置了`m`                                                | no           |
| `source`     | 正则表达式字面量两边斜杠里面的字符串，这个值和`toString()`的结果不一样 |              |
| `flags`      | ES6+，正则表达式的修饰符                                     | no           |
| `unicode`    | ES6+，是否设置了`u`修饰符                                    | no           |
| `sticky`     | ES6+，是否设置了`y`修饰符                                    | no           |
| `dotAll`     | ES6+，是否设置了`s`修饰符                                    | no           |

### 实例方法

#### [`RegExp.prototype.exec()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)

查找正则表达式在字符串中的第一个匹配项，或者分组子模式的匹配项

> param：String

默认是传入要匹配的字符串，传入其他类型会被隐式转换成 String 类型；即使传入`null`和`undefined`也不会报错

> return：Array / `null`

如果字符串中没有找到匹配项，那么会返回`null`；如果找到匹配项，`exec()`会始终返回由第一个匹配项组成的数组，该数组还包含三个额外属性如下；如果正则表达式进行了分组，那么返回的结果数组中还会包含每个分组子模式的匹配项

- `index`：表示匹配项在字符串中的索引
- `input`：表示应用正则表达式的字符串
- `groups`：这是一个新的属性，当在匹配组使用`(?<Name>x)`指定了匹配组的名称时，就会把每组结果存在`groups`的属性名下；如果没有指定任何匹配组名称，这个值就是`undefined`，具体见分组中的`()`

对于不同的正则表达式模式，`exec()`方法还会执行一些额外操作

- 如果正则表达式指定全局模式`g`，`exec()`在找到匹配项后会更新正则表达式的`lastIndex`属性，此后如果再次调用`exec()`方法，只会从`lastIndex`位置搜索剩余的字符串部分，找下一个匹配项，直到找不到匹配项，此时`exec()`会将`lastIndex`重置为`0`；如果之前人为指定了`lastIndex`属性，那么`exec()`只会从`lastIndex`属性开始匹配

```javascript
var str = 'cat,bat,sat,fat';
var reg = /at/g;

console.log(reg.exec(str)); // ["cat", .....]

console.log(reg.exec(str)); // ["bat", .....]
console.log(reg.lastIndex); // 7

console.log(reg.exec(str)); // ["sat", .....]
console.log(reg.lastIndex); // 11

console.log(reg.exec(str)); // ["fat", .....]
console.log(reg.lastIndex); // 15

console.log(reg.exec(str)); // null
console.log(reg.lastIndex); // 0
```

- 如果正则表达式未指定全局模式`g`，那么每次调用`exec()`都只会返回第一个匹配项，即使为正则表达式指定了`lastIndex`属性，`exec()`也不会受影响，也不会更新`lastIndex`属性

```javascript
var str = 'cat,bat,sat,fat';
var reg = /\wat/;

reg.lastIndex = 7; //指定lastIndex

console.log(reg.exec(str)); // ["cat", .....]

console.log(reg.exec(str)); // ["cat", .....]
console.log(reg.lastIndex); // 7

console.log(reg.exec(str)); // ["cat", .....]
console.log(reg.lastIndex); // 7
```

#### [`RegExp.prototype.test()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)

测试字符串中是否包含正则表达式匹配项

> param：String

默认是传入要匹配的字符串，传入其他类型会被隐式转换成 String 类型；传入`null`和`undefined`都只会返回`false`

> return：Boolean

`test`相比`exec`要简单很多，`test`执行搜索，当字符串中存在匹配项时就返回`true`，不存在就返回`false`；`test`同样会受到全局模式`g`和属性`lastIndex`的影响，多次调用只会从`lastIndex`位置开始搜索，直到找不到匹配项时将`lastIndex`又重新置`0`

```javascript
var str = 'cat,bat,sat,fat';
var reg = /.at/g; //匹配非空格字符后面紧跟at两个字母的字符串

var isMatch = reg.test(str);
console.log(isMatch); //true
console.log(reg.global); //true
console.log(reg.ignoreCase); //false
console.log(reg.lastIndex); //3
console.log(reg.multiline); //false
console.log(reg.source); //.at

isMatch = reg.test(str);
console.log(isMatch);
console.log(reg.global);
console.log(reg.ignoreCase);
console.log(reg.lastIndex); //7
console.log(reg.multiline);
console.log(reg.source);
```

#### `Object.prototype.valueOf()`

返回正则表达式的字面量形式，它仍然是一个正则表达式对象

```javascript
var reg = /.at/g;

console.log(reg.valueOf()); //    /.at/g
```

#### `Object.prototype.toString()`

`toString`方法会返回正则表达式的字面量形式的字符串，这个值和`source`不一样

```javascript
var reg = /.at/g;

console.log(reg.toString()); // 	   "/.at/g"
```

## 正则表达式匹配的几种方法

### `RegExp.prototype.exec()`

### `RegExp.prototype.test()`

### [`String.prototype.match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)

查找正则表达式在源字符串中的匹配项，如果正则表达式使用全局匹配模式，那么会返回所有匹配项

> param：RegExp

如果括号内传入的对象非正则表达式，会调用`new RegExp()`去转换成一个正则表达式

> return：Array / `null`

`match()`返回的结果和`exec()`有些许相似

- 如果正则表达式指定了全局模式`g`，`match()`会找到所有匹配项，然后组成数组返回；但是不会更新正则表达式的`lastIndex`属性，返回的数组也没有三个额外属性，即多次调用返回的结果也是一样的

```javascript
var str = 'cat,bat,sat,fat';
var reg = /\wat/g;

console.log(str.match(reg)); // ["cat", "bat", "sat", "fat"]
console.log(reg.lastIndex); // 0

console.log(str.match(reg)); // ["cat", "bat", "sat", "fat"]
console.log(reg.lastIndex); // 0
```

- 如果正则表达式未指定`g`，那么会始终返回由第一个匹配项组成的数组，如果正则表达式有分组，也会包含分组匹配项，同时该数组也具有三个属性，这时候就和调用`exec()`结果得到的一样
  - `index`：第一个匹配项在字符串中的索引
  - `input`：表示前面要匹配的字符串
  - `groups`：命名捕获组对象，如果没有使用过`(?<name>)`命名捕获组，这个值是`undefined`

```javascript
var str = 'cat,bat,sat,fat';
var reg = /at/;

var execArray = reg.exec(str);
var matchArray = str.match(reg);
console.log('exec:\r\n %o', execArray);
console.log('match:\r\n %o', matchArray);
```

![image-20200705141506739](../../../public/images/image-20200705141506739.png)

### [`String.prototype.matchAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)

查找正则表达式在源字符串中的所有匹配项

> param：RegExp

`matchAll`只能用在设置了全局模式`g`的正则表达式，如果没设置`g`，会抛出`TypeError`(String.prototype.matchAll called with a non-global RegExp argument)的错误；如果所传参数不是一个正则表达式对象，则会隐式地使用 `new RegExp(obj)` 将其转换为一个正则表达式

> return：iterator

`matchAll`会返回一个包含匹配正则表达式整体的匹配项和各个分组子模式的匹配项；`matchAll`就相当于在内部多次调用`exec()`并返回其值；`matchAll`内部对传入的正则表达式做了一个复制，因此不会更新`lastIndex`属性

```javascript
var str = 'cat,bat,sat,fat';
var reg = /(?<group>\wat)/g;

console.log('matchAll:\r\n %o', [...str.matchAll(reg)]);
```

![image-20200705164419241](../../../public/images/image-20200705164419241.png)

```javascript
var str = 'cat,bat,sat,fat';
var reg = /(cat),(bat),(sat)/g;

console.log('matchAll:\r\n %o', [...str.matchAll(reg)]);
```

![image-20200705171247916](../../../public/images/image-20200705171247916.png)

我们可以使用`Array.from`获取迭代每次返回的结果，然后存入数组，就得到了正则表达式在字符串中的所有匹配项

```javascript
var str = 'cat,bat,sat,fat';
var reg = /(?<group>\wat)/g;

var matchArr = Array.from(str.matchAll(reg), m => m[0]);
console.log(matchArr);
```

![image-20200705165001189](../../../public/images/image-20200705165001189.png)

### [`String.prototype.search()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search)

查找正则表达式在源字符串中第一个匹配项的索引

> param：RegExp

如果所传参数不是一个正则表达式对象，则会隐式地使用 `new RegExp(obj)` 将其转换为一个正则表达式

> return：Number / `-1`

`search()`方法会搜索在字符串在正则表达式中的匹配项，如果找不到就返回`-1`；如果找得到就返回第一个匹配项的索引位置；所以可以使用`> -1`来判断字符串是否匹配该正则表达式

```javascript
var str = 'cat,bat,sat,fat';
var reg1 = /at/;
var reg2 = /\d/;

console.log(str.search(reg1)); // 1
console.log(str.search(reg2)); // -1
```

### [`String.prototype.replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

使用替换字符串去替换源字符串中匹配的内容，并返回新的字符串

> param1：RegExp / String

如果第一个参数是一个字符串，那么源字符串中仅第一个匹配项会被替换；

如果第一个参数是正则表达式，根据模式的不同，源字符串中被替换的部分也不同

- 如果正则表达式指定了全局模式`g`，那么会将源字符串中所有匹配项都替换掉
- 没有指定就只替换第一个匹配项

> param2：String / Function

如果该参数是一个字符串，并且第一个参数是正则表达式，则可以在该字符串中使用`$`加数字，表示与正则表达式中的捕获组相匹配的字符串的引用。如下，正则表达式匹配到字符串的`cat,bat`部分，内部两个捕获组分别匹配到`cat`和`bat`，`replace`的第二个参数使用`$2`引用了第二个捕获组匹配到的`bat`，组合成替换项`abcbat`

```javascript
var str = 'cat,bat,sat,fat';
var reg = /(\wat),(\wat)/;

var newStr = str.replace(reg, 'abc$2');
console.log(newStr); // abcbat,sat,fat
```

如果该参数是一个函数，函数的返回值将作为替换字符串；并且如果第一个参数是指定了全局匹配模式`g`的正则表达式，那么这个函数会被多次调用，即正则表达式每找到一个匹配项，就会调用该函数一次；该函数会接收以下参数

- `match`：当前匹配项字符串
- `p1,p2, ...`，如果正则表达式指定了捕获组，则也会包含这些捕获组的匹配项
- `index`：当前匹配项在源字符串中的索引
- `source`：源字符串

```javascript
var str = 'cat,bat,sat,fat';
var reg = /(\wat)/g;

var newStr = str.replace(reg, function() {
  console.log(arguments);
});
```

![image-20200705185822696](../../../public/images/image-20200705185822696.png)

利用全局匹配模式的正则表达式和传入函数，我们可以实现分步处理一个字符串，例如

```javascript
var str = 'get-element-by-id';
var newStr = str.replace(/-\w/g, function(matchStr) {
  console.log(matchStr); // -e   -b   -i
  return matchStr.substring(1).toUpperCase();
});

console.log(newStr); // "getElementById"
```

> return： String

`replace()`最终会返回替换过后的字符串，`replace()`不会改变源字符串，毕竟字符串在 JS 中一旦声明也没有任何方法可以改变

### [`String.prototype.split()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)

将字符串按照指定的分隔字符串所在的位置，拆分成一个数组

> param1：String / RegExp，分隔字符串

如果不传这个参数，或者在源字符串中没找到，会返回只包含一个源字符串的数组；如果源字符串是空字符串`""`，分隔字符串也是空字符串`""`，会返回空数组

```javascript
console.log(''.split()); // [""]

console.log(''.split('')); // []
```

如果是单个字符组成的字符串，就找到字符位置，前后拆开就行了；

```javascript
var str = 'cat,bat,sat,fat';
var reg = 't';

var newStr = str.split();
console.log(newStr); // ["ca", ",ba", ",sa", ",fa", ""]
```

如果是多个字符组成的字符串，那么就需要整个字符串匹配；

```javascript
var str = 'cat,bat,sat,fat';
var reg = 'at';

var newStr = str.split(reg);
console.log(newStr); // ["c", ",b", ",s", ",f", ""]
```

如果这个参数字符串中的最后一个字符在源字符串的结尾，或者参数字符串中的第一个字符在源字符串的开头，拆开的数组中都会包含一个空字符串`""`，如上文例子

```javascript
var str = 'cat,bat,sat,fat';
var reg = 'c';

var newStr = str.split(reg);
console.log(newStr); // ["", "at,bat,sat,fat"]
```

如果传的是空字符串`""`，会把源字符串拆成 UTF16 形式的字符组成的数组

```javascript
var str = 'cat,bat';

var newStr = str.split('');
console.log(newStr); // ["c", "a", "t", ",", "b", "a", "t"]
```

如果传入的是一个正则表达式，始终按照全局模式匹配找到所有分隔的部分，带不带`g`都一样

```javascript
var str = 'cat,bat,sat,fat';

var newStr = str.split(/at/);
console.log(newStr); //["c", ",b", ",s", ",f", ""]
```

> param2：Number，非负整数

限制返回数组中的项

```javascript
var str = 'cat,bat,sat,fat';

var newStr = str.split('t', 2);
console.log(newStr); // ["ca", ", ba"]
```

> return：Array

`split`始终会返回一个数组，空对空也会返回一个空数组

## 正则表达式的复制

由于正则表达式的实例属性，要想复制一个正则表达式，不仅要注意修饰符，更要保持`lastIndex`属性的一致；所以思路是

- 使用`RegExp`构造函数

```javascript
function cloneRegExp(source) {
  var newRegExp = new RegExp(source, source.flags);
  newRegExp.lastIndex = source.lastIndex;
  return newRegExp;
}
```