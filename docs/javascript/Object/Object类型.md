---
title: 对象基础知识
order: 1
nav:
  order: 3

---

## 什么是对象

- 无序属性的集合，其属性值可以是基本类型的值，或者对象，或者函数
- 对象具有唯一标识性，即使声明的完全相同的两个对象也不会相等，因为它们在内存上的引用地址是不一样的
- JS 的对象具有高度的动态性，即允许在运行的时候去添加，删除和修改内部属性

## 对象的分类

#### 宿主对象

- 由 JS 解析器嵌入的宿主环境定义的，比如浏览器，或者 node 环境，浏览器中常见的都是基于`window`对象的，例如`window.document`，`window.location`，`window.history`等

#### [内置对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)

- 由 JS 语言提供的对象，基本是原生对象，能够通过语言本身的构造器；可以在 MDN 查阅这些内置对象

![image-20200621160515651](../../../public/images/image-20200621160515651.png)

#### 自定义对象

- 由`{}`语法、`new Object`或者 `class` 关键字定义类创建的对象

## 创建对象

### 使用`Object`构造函数

如果使用`new`和`Object`构造函数创建对象，由于构造函数的参数是可选的，考虑以下情况

- 传递`null`和`undefined`生成的会是一个空对象
- 基本类型的值（`Number`，`Boolean`，`String`以及`Symbol`）会构造其包装类型的对象，如果你使用`typeof`判断返回结果的类型，那么会是`object`
- 传递引用类型的值，包括函数，仍然会返回这个值，也就是并不会构造一个新的对象
- 最后就是直接使用`Object`和使用`new`的行为是一样的

```javascript
var o = Object(['1', '2']);
console.log(o); //Array类型的包装对象

var o = Object('1');
console.log(o); //String类型的包装对象

var o = Object(1);
console.log(o); //Number类型的包装对象

var obj = { p: '1' };
var newObj = Object(obj); // {p:"1"}
console.log(obj === newObj); // true

var o = Object(null);
console.log(o); //{}

var o = Object(undefined);
console.log(o); //{}
```

### 使用对象字面量

`{}`对象字面量；每次使用对象字面量的形式都是创建一个新的对象，值得注意的是从 ES6 开始，对象字面形式的属性允许使用方括号`[]`传入表达式来定义属性名

```javascript
let i = 0;
let a = {
  ['foo' + ++i]: i,
  ['foo' + ++i]: i,
  ['foo' + ++i]: i,
}; //{foo1: 1,foo2: 2,foo3: 3,}
```

### 使用 Object.create

`Object.create()`是根据给定原型创建一个新的对象，它的第一个参数新创建的对象的`[[prototype]]/__proto__`，第二个参数是要添加到新对象的自有属性组成的对象，这些自有属性的写法需要按照其描述属性来定义（`configurable`，`enumerable`，`writable`，`value`，`get`，`set`）

```javascript
//下面三种方式是等价的
var obj = Object.create(Object.prototype, {
  year: {
    get: function() {
      return this._year;
    },

    set: function(value) {
      if (value > 2005) {
        this._year = value;
      }
    },
  },

  name: {
    value: 'JS权威指南',
    writable: true,
  },
});
```

如果使用`Object.create(null)`可以创建一个完全纯净的空对象，也就是不指定其原型对象，它不会继承那些`Object.prototype`的方法和属性，这种方式对于类库编写者十分常用，这样创造的对象不容易被污染。

```javascript
Object.create(null);
```

## 对象属性

- 属性名称==必须是字符串或 Symbol 类型的对象==，如果不是字符串，会进行`ToString`（toString，valueOf）强制转换成字符串
- 访问对象属性可以通过`.`或者`[]`，需要注意的是`[]`内可以是变量或者表达式，但是**如果是具体的属性名必须使用字符串**
- 属性的值默认是`undefined`

### 数据属性和访问器属性

- ES 规定对象属性有两种，数据属性和访问器属性

1.  数据属性，即直接表示数据值，有四个特性

```javascript
configurable：是否支持删除和修改

enumerable：是否支持for-in遍历

writable：是否支持修改

value：属性的值，读取属性值的时候就是这个，修改属性值也是写入这个，默认是undefined
```

2.  访问器属性，不包含数据值 value，但是用于读取数据值

```javascript
configurable

enumerable

get：获取属性值调用

set：写入属性值调用
```

### 自有属性和原型属性

- 自有属性是定义在每个对象自身的属性，可以使用`obj.hasOwnProperty()`来判断

```javascript
const object1 = {};
object1.property1 = 42;

console.log(object1.hasOwnProperty('property1')); //true
```

- 原型属性定义在构造函数的原型对象上，是对象继承来的属性，并且是每个对象共享的；可以通过`in`来判断，`in`能检测自有属性和原型链上的属性

```javascript
console.log('toString' in {}); //true
```

### 创建和修改属性

- 可以使用对象字面量直接定义属性，以这种形式定义的属性其数据属性默认都是`true`

```javascript
var o = {
  name: 'property',
  func: function() {},
};

console.log(Object.getOwnPropertyDescriptors(o));

// 属性配置
{
  configurable: true;
  enumerable: true;
  value: 'property';
  writable: true;
}
```

- 使用成员访问运算符`.`或`[]`定义属性，其中`[]`支持变量或者表达式形式，如果`[]`传入的值不是`String`类型，会对其进行`ToString`转换；以这种方式定义的属性，其**描述属性配置也全部默认是`true`**；

```javascript
var o = {};
o.name = 'property';

let foo = { unique_prop: 1 },
  bar = { unique_prop: 2 },
  object = {};
object[foo] = 'value';
console.log(object[bar]); // 2，bar被强制转换成"[object, Object]"

console.log(Object.getOwnPropertyDescriptor(o, 'name'));

// 属性配置
{
  configurable: true;
  enumerable: true;
  value: 'property';
  writable: true;
}
```

- 使用`Object.defineProperty()`，这个方法接收三个参数：属性所在的对象，属性的名称字符串，以及由属性的具体描述属性（`configurable`，`enumerable`，`writable`，`value`，`get`，`set`）组成的对象；如果是**创建的新属性，`configurable`，`enumerable`，`writable`值默认是`false`**

```javascript
var person = {};
Object.defineProperty(person, 'name', {
  value: 'test',
  writable: true,
  configurable: true,
  enumerable: true,
  get: function() {
    return 'test';
  },
  set: function(value) {},
});

console.log(person); //{name : "test"}
```

- `Object.defineProperties()`，这个方法用于一次定义多个属性，接收两个参数：要添加或者修改其属性的对象，要添加或修改的属性的描述属性组成的对象

```javascript
//定义多个属性
var book = {};
Object.defineProperties(book, {
  _year: {
    value: 2005,
  },

  year: {
    get: function() {
      return this._year;
    },

    set: function(value) {
      if (value > 2005) {
        this._year = value;
      }
    },
  },

  name: {
    value: 'JS权威指南',
    writable: true,
  },

  author: {
    value: '尼古拉斯',
    writable: false,
  },
});
```

### 删除属性

- `delete`用于删除自有属性，不能删除继承自原型的属性，并且不能删除`configurable`为`false`的属性

```javascript
var o = { a: 1 };
delete o.a; //返回true
```

### 遍历属性的方法

| 方法                              | 返回值                                           |
| --------------------------------- | ------------------------------------------------ |
| `for...in`                        | 获取自有属性和原型属性中可枚举的属性             |
| `Object.keys(obj)`                | 获取自有属性中可枚举属性，不包括`Symbol`属性名的 |
| `Object.getOwnPropertyNames(obj)` | 获取自有属性，并且包括不可枚举的属性             |
| `Reflect.ownKeys(obj)`            | 获取所有自有属性，包括`Symbol`以及不可枚举的属性 |
| `Object.getOwnPropertySymbols()`  | 获取自有属性中`Symbol`类型的属性名               |

给定一个对象如下：

```javascript
let obj = {
  a: 1,
  b: 'string',
  c: undefined,
  d: null,
  e: true,
  [Symbol()]: 'symbol',
};

obj.__proto__.testPrototype = 'prototypeObj';
```

1.  `for-in`：遍历对象中可枚举属性名称字符串，**包括自有属性和继承自原型的属性，不包括`Symbol`**

```javascript
let arr = [];
for (let prop in obj) {
  arr.push(prop);
}
console.log(arr); // ["a", "b", "c", "d", "e", "testPrototype"]
```

2.  `Object.keys(obj)`：返回对象中**自有属性名称字符串组成数组，不包括`Symbol`，不包括不可枚举的属性，不包括继承自原型的属性**；在 ES5 里，如果此方法的参数不是对象（而是一个原始值），那么它会抛出 `TypeError`，而从 ES2015 以后，非对象的参数将被强制转换为一个对象

```javascript
console.log(Object.keys(obj)); // ["a", "b", "c", "d", "e"]
```

3.  `Object.getOwnPropertyNames()`：返回对象中**自有属性名称字符串组成数组，包括不可枚举的属性，不包括`Symbol`和继承自原型的属性**；这个方法在遍历数组和字符串时会带出`length`属性

```javascript
console.log(Object.getOwnPropertyNames(obj)); // ["a", "b", "c", "d", "e"]
```

4.  `Object.getOwnPropertySymbols()`：返回对象的自有属性中`Symbol`属性的数组

```javascript
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol()]
```

- `Reflect.ownKeys(target)`：返回对象**所有自有属性组成的数组，包括`Symbol`作为键的属性**，**也包括不可枚举的属性**，这个方法相当于`Object.getOwnPropertyNames()`和`Object.getOwnPropertySymbols()`的集合

```javascript
console.log(Reflect.ownKeys(obj)); // ["a", "b", "c", "d", "e", Symbol()]
```

### 遍历属性值的方法

```javascript
let obj = {
  a: 1,
  b: 'string',
  c: undefined,
  d: null,
  e: true,
  [Symbol()]: 'symbol',
};

obj.__proto__.testPrototype = 'prototypeObj';
```

- `Object.values()`：返回对象的**自有属性中可枚举属性的值组成的数组**，这个方法只在 ES2017 规范以后才能用

```javascript
console.log(Object.values(obj)); // [1, "string", undefined, null, true]
```

### Object.entries({})

`Object.entries`遍历对象自有属性中可枚举属性，不包括`Symbol`，然后将属性和属性值包裹成`[key, value]`的数组，最后返回一个二维数组的形式

```javascript
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
```