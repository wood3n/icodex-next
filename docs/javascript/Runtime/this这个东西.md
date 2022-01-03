> JavaScript 的 this 原理是什么？ - Lucas HC 的回答 - 知乎 https://www.zhihu.com/question/353757734/answer/964557747

`this`是一个关键字，因此不能在 JS 中为其赋值，它用来指向一个对象，使得可以在代码中使用`this`指向的对象的属性和方法；`this`可以在脚本范围内使用，也可以在函数体内使用，但是严格模式下禁止函数体内的`this`指向全局对象，它的值有可能是`undefined`，因此函数内使用`this`要十分小心。

总体来看，`this`的指向只有以下六种情况：

- 全局环境内的`this`，始终指向全局对象，在浏览器中就是`window`对象；
- 函数体内的`this`，在函数单独被调用时，非严格模式下指向`window`；严格模式下为`undefined`；
- 函数作为对象的方法使用，那么函数体内的`this`将指向该对象；如果是 DOM 回调函数，则`this`指向触发事件的`DOM`对象
- 箭头函数没有`this`，它内部的`this`是外层环境传给它的，始终跟随外层环境`this`指向；
- 通过`call`，`apply`调用的函数，`this`指向传入的对象；通过`bind`创建的新函数，内部`this`也被绑定到传入的对象
- 通过`new`将函数作为构造函数调用，其内部`this`指向新创建的对象

### 全局环境

在全局环境中使用`this`，不论什么严格非严格，`this`始终指向全局对象；也就是使用`this`添加的属性，函数等会被附加在下面这些全局对象中处理

- 在浏览器中，`window`就是当前窗口的全局对象，`this`就等于`window`，通过`this`声明的属性和方法将被附加到`window`上
- 在 nodejs 中，全局对象是`global`
- 在 Web Workers 中，全局对象是`self`

```javascript
'use strict';

console.log(this === window); //true
```

### 函数体内

在函数内部的`this`，需要根据函数被调用的位置来解析

#### 函数被单独调用

只要看到函数被单独调用的时候，非严格模式下`this`指向`window`；而在`"use strict";`指明严格模式的情况下禁止函数体内的`this`指向，此时`this`的值是`undefined`

```javascript
'use strict';

function foo() {
  console.log(this);
}

foo(); // undefined
```

```javascript
const foo = {
  bar: 10,
  fn: function() {
    console.log(this); // window / undefined
    console.log(this.bar); // undefined或者报错
  },
};
var fn1 = foo.fn;
fn1(); // 函数前面没东西，也是单独调用的情况
```

```javascript
var o = {
  m: function() {
    var self = this; // o

    function f() {
      console.log(this); // window / undefined
      console.log(self); // o
    }

    f();
  },
};

o.m();
```

匿名函数也是仍然要看函数调用的方式，匿名函数作为`setTimeout`的回调函数时，相当于单独被调用，所以内部`this`指向全局对象

```javascript
const foo = {
  fn: function() {
    setTimeout(function() {
      console.log(this);
    });
  },
};
console.log(foo.fn()); // window
```

而匿名函数作为`addEventListener`的事件处理函数时，其内部`this`将指向触发事件的元素

```javascript
var button = document.querySelector('#btn');
button.addEventListener('click', function() {
  console.log(this); // button本身
});
```

如果不使用`call/apply`调用，IIFE 内部的`this`总是指向全局对象，严格模式`this`就是`undefined`

```javascript
var o = {
  m: function() {
    var self = this; // o

    (function f() {
      console.log(this); // window / undefined
      console.log(self);
    })();
  },
};

o.m();
```

#### 作为构造函数被调用

当函数被用作构造函数时，内部`this`将被绑定到使用`new`创建的对象上，这也是面向对象编程语言的特点；但是需要注意的是构造函数本身和普通函数没区别，它可能会被直接调用，而导致内部`this`指向发生变化，所以**构造函数内部一定要进行`this`的检查**。如果是使用`new`调用的构造函数，那么`this`就指向新创建的对象，所以可以使用`instanceof`检测`this`是不是构造函数的实例

```javascript
function Person(name, age) {
  if (this instanceof Person) {
    this.name = name;
    this.age = age;
  } else {
    return new Person(name, age);
  }
}
```

#### 作用对象的方法被调用

只要看到被调用的函数前面有一个点`.`或者`[]`这种属性的调用方法，那么`this`就指向`.`前面的东西，也就是**最后调用函数的对象**

```javascript
var obj = {
  text: 'test',
  fn: function() {
    return this.text;
  },
};

obj.fn(); // test
obj['fn'](); // test

const o1 = {
  text: 'o1',
  fn: function() {
    return this.text;
  },
};
const o2 = {
  text: 'o2',
  fn: o1.fn,
};
console.log(o2.fn()); // "o2"
```

需要注意这种调用方式根本不受函数定义的方式影响，也就是说**无论直接在属性中声明函数还是在属性中引用其他位置声明过的函数，最后都执行这个对象**

```javascript
const o1 = {
  text: 'o1',
  fn: function() {
    return this.text;
  },
};
const o2 = {
  text: 'o2',
  fn: function() {
    return o1.fn(); // o1
  },
};
const o3 = {
  text: 'o3',
  fn: o1.fn,
};

// 结合闭包来看
function fn() {
  function foo() {
    console.log(this.text);
  }

  return foo;
}

var f = fn();
var o = {
  text: 'closure',
  m: f,
};

o.m(); // "closure"

console.log(o1.fn()); // "o1"
console.log(o2.fn()); // "o1"
console.log(o3.fn()); // "o3"
```

#### 作用函数的返回值

> "匿名函数的执行环境具有全局性，因此`this`对象通常指向 window"——《JS 高级程序设计第三版·中文》

这个说法是完全错误的，匿名函数执行环境没有全局性这个说法，英文原文根本没有出现"global"这样的字眼；并且匿名函数内部的`this`可以指向任何对象，你可以通过`call/apply`去改变其指向，也可以将其作为对象的方法进行调用，例如以下两种情况

```javascript
// 这种情况相当于将返回的函数单独调用
function fn() {
  function foo() {
    console.log(this); // window / undefined
  }

  return foo;
}

fn()();

// 这种情况相当于返回的匿名函数被作为对象的方法再次调用，所以内部this肯定指向对象
function wapper() {
  return function() {
    console.log(this); // obj
  };
}

var obj = {
  m: wapper(),
};

obj.m();
```

#### call/apply

对于`call`，`apply`这两个方法都是直接指定经它们调用时函数内部的`this`，观察语句就能得知

#### bind

`bind`会根据指定的`this`值创建一个新函数，需要注意的是经过`bind`创建的新函数，内部`this`无法通过对象调用，`call`，`apply`这些方法修改，如果支持的话，可以通过`new`调用来修改

```javascript
const func = function() {
  console.log(this.name);
};

const obj1 = {
  name: 'obj1',
};

const newFunc = func.bind(obj1); // 绑定obj1

const obj2 = {
  name: 'obj2',
  pFunc: newFunc,
};

obj2.pFunc(); // obj1
obj2.pFunc.call(obj2); // obj1
```

### 箭头函数内部的 this

箭头函数是最特殊的，它自己没有`this`，其**内部`this`跟随定义时的环境，也就是取决于静态作用域了。**

当作为对象方法时，如果对象定义的时候处于全局环境，所以箭头函数内部`this`也是指向全局上下文，严格模式下就是`undefined`，在使用 TypeScript 的环境下，下面的代码会直接报错。

```javascript
'use strict';
var obj = {
  name: 'oxygen',
  func: () => {
    console.log(this.name);
  },
};

obj.func();
```

![image-20201005181535245](../../../public/images/image-20201005181535245.png)

要解决上述问题就是在箭头函数外面包裹一层普通函数，或者使用普通函数定义对象的方法

```typescript
'use strict';
var obj = {
  name: 'oxygen',
  func: function() {
    console.log(this.name);
  },
};

obj.func(); // "oxygen"

'use strict';
var obj = {
  name: 'oxygen',
  func: function() {
    const func = () => {
      console.log(this.name);
    };
    func();
  },
};

obj.func(); // "oxygen"
```

如果在函数环境内，其`this`也是取决于当前包裹它的函数

```javascript
function wrapper() {
  console.log(this);
  return () => {
    //始终和外层函数wrapper内部的this一致
    console.log(this);
  };
}

var obj = {
  m: wapper,
};

// obj.m()会调用wapper，此时wrapper内部this指向obj，那么返回的闭包也是指向obj
obj.m()();

// 如果改成下面这种，对wrapper进行了单独调用然后将值传给obj的属性m，所以wapper内部this指向全局对象，那么返回的箭头函数也是指向全局对象
var obj = {
  m: wrapper(),
};

obj.m();
```

### class 内部的 this

在大部分面向对象的编程语言内部，都有类的概念，在类中使用`this`，会将`this`指向使用`new`创建的新对象上，在这一方面来说，JS 从 ES6 新增的类也是一样的。

```javascript
class SuperClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  func() {
    console.log(this);
  }
}

var person = new SuperClass('张三', 100); // {name: "张三", age: 100}
person.func(); // this指向person
```

### DOM 回调函数

#### 普通函数

当普通函数被用作`addEventListener`的事件处理函数时，它的`this`指向触发事件的元素（一些浏览器在使用非`addEventListener`的函数动态添加监听函数时不遵守这个约定）

```javascript
// 被调用时，将关联的元素变成蓝色
function bluify(e) {
  console.log(this === e.currentTarget); // 总是 true

  // 当 currentTarget 和 target 是同一个对象时为 true
  console.log(this === e.target);
  this.style.backgroundColor = '#A5D9F3';
}

// 获取文档中的所有元素的列表
var elements = document.getElementsByTagName('*');

// 将bluify作为元素的点击监听函数，当元素被点击时，就会变成蓝色
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', bluify, false);
}
```

#### 箭头函数

如果指定箭头函数作为回调事件，其`this`仍然根据当前执行上下文来判断，反正不可能指向监听元素

```javascript
const handleClick = e => {
  console.log(this); // window / undefined
};

var button = document.querySelector('#btn');
button.addEventListener('click', handleClick);
```

## this 的传递

> [ES6 子类有没有自己的 this](https://www.zhihu.com/question/378032472/answer/1089697467)

在 ES6 之前，也就是没有`class`的语法的时候，实现继承的方式有很多种，什么寄生继承，组合继承之类的，基本思想都是实现原型链接，然后传递`this`这样；**传递`this`的方法就一种，在子构造函数中去调用父构造函数**，当然了要注意子构造函数中去调用父构造函数要放在子构造函数内的顶部位置，否则可能造成父构造函数的属性覆盖掉子构造函数的同名属性

```javascript
function SuperType() {
  this.name = 'super';
}

function SubType() {
  SuperType.call(this); // 传递this
  this.name = 'sub';
  this.age = 21;
}

var person = new SubType();
console.log(person); // {name: "sub", age: 21}
```

在 ES6 之后，可以使用类`class`语法实现继承，但是有一项硬性规定是如果在子类的`constructor`中必须使用`super`，如果不适用`super`将会抛出`ReferenceError`的异常，如果用 TS，直接编码阶段就会报错；`super`的作用并不是传递`this`，它实际上是将对象经过父类重新创建一下，然后又返回给子类，再去初始化子类构造函数中声明的属性和方法。

具体可以在 babel 编译器里观察一下，关键就是这一句代码

```javascript
// 利用父类构造函数创建一个新的对象，并将这个对象原型对象的constructor属性指向子类构造函数，然后再返回给子类构造函数
var result = Reflect.construct(SuperType, arguments, SubType);
```

## this 指向变化

### 普通函数

`this`在同一个函数中的指向肯定会随着调用方式发生变化

```javascript
var obj = {
  a: 1,
  func: function() {
    console.log(this.a);
  },
};

function f(fn) {
  var a = 2;
  fn(); //回调函数，是单独调用，则this指向全局对象，undefined
}

f(obj.func);
```

在上面这个例子中，如果要让 a 的值等于 1，可以使用`call`，`apply`等方法；如果要让 a 等于 2，得把`var a = 2`挪到全局作用域中声明

```javascript
var myObj = {
  name: '测试',
  showThis: function() {
    console.log(this); // 指向myObj
    function bar() {
      console.log(this);
    } // 指向window / undefined
    bar();
  },
};
myObj.showThis();
```

这种丢失`this`指向的问题非常常见，常见的解决方法是使用一个局部变量`self`来缓存外部的`this`，如下：

```javascript
var myObj = {
  name: '测试',
  showThis: function() {
    console.log(this); // 指向myObj
    var self = this;
    function bar() {
      console.log(self);
    } // 指向myObj
    bar();
  },
};
myObj.showThis();
```

或者使用箭头函数来定义函数，因为箭头函数没有属于自己的`this`，跟随外部包裹的执行上下文的`this`

```javascript
var myObj = {
  name: '测试',
  showThis: function() {
    console.log(this); // 指向myObj
    var bar = () => {
      console.log(this);
    };
    bar();
  },
};
myObj.showThis();
```

### 回调函数

在`setTimeout`的回调函数中使用`this`是最容易发生`this`丢失的情况，下面的代码经过 1 秒延迟执行后，最后会输出 `undefined`。造成这种情况的原因是因为回调函数是函数的参数传递的形式，这是一个复制引用类型值的过程，简答来说，就是回调函数的引用地址值赋值给了参数，然后以参数的形式单独再调用。

不光是这种情况，实际上在很多形式的回调函数种都会发生这种情况，例如 DOM 事件处理函数，以及 React`class`组件内部使用`this`引用`class`内部的方法等。

```javascript
var obj = {
  a: 1,
  f: function() {
    console.log(this.a);
  },
};

setTimeout(obj.f, 1000);
```

要解决这种方式方法也有很多：

- 使用箭头函数来编写回调函数；
- 或者使用`bind`创建一个绑定`this`的新函数，这里不能用`call`，JS 禁止这样的调用

```javascript
// 箭头函数
var obj = {
  a: 1,
  f: function() {
    console.log(this.a);
  },
};

setTimeout(() => {
  obj.f();
}, 1000);

// bind
var obj = {
  a: 1,
  f: function() {
    console.log(this.a);
  },
};

setTimeout(obj.f.bind(obj), 1000);

// React的bind使用
class Foo extends Component {
  handleClick() {
    console.log('Click happened');
  }

  render() {
    return <button onClick={this.handleClick.bind(this)}>beng</button>;
  }
}
```