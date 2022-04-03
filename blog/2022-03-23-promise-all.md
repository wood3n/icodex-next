---
title: 实现 Promise.all 有哪些要点
slug: /promiseall
authors: oxygen
---

## Promise.all

`Promise.all`是日常使用频率非常高的异步方法，这两天回顾了一下`Promise`的几个静态方法，对`Promise.all`又有了一些新的认识。

<!--truncate-->

## Promise.all 的定义

> `Promise.all(iterable)`

理解`Promise.all`API 需要注意以下几点：

1. 接收一个**可迭代**对象作为参数，否则`throw TypeError`的错误；
2. 当迭代器内部所有`Promise`对象`fulfilled`的时候，`Promise.all`返回`fulfilled`状态的`Promise`对象，`resolve`参数为一个数组，包含所有非`Promise`对象以及所有`Promise`对象`resolve`的值；
3. 当迭代器内部存在一个`Promise`对象状态变为`rejected`或者非`Promise`元素执行出错时，`Promise.all`将立即返回`rejected`状态的`Promise`对象，`reject`参数为`rejected`的`Promise`对象抛出的信息，或者非`Promise`元素执行报错的信息；
4. `Promise.all`变成`fulfilled`状态时，`resolve`的数组元素按照迭代器元素的顺序，非`Promise`对象会直接放在对应位置返回。

从`Promise.all` API 定义来看，首先需要理解什么是可迭代对象。

### 什么是可迭代

可迭代是 ES6 提出的语法协议，是指满足以下两个要求的对象：

1. `iterable`：可迭代。可迭代指的是一个对象内部需要实现`Symbol.iterator`方法，该方法不接收参数，同时返回一个对象，这个对象必须是**迭代器**。当使用`for...of`遍历的时候，会调用`Symbol.iterator`方法。

2. `iterator`：迭代器。**迭代器是一个对象**，包含一个`next`方法，该方法可接收一个参数，同时返回一个包含以下两个属性的对象。

- `done: boolean`：表示当前迭代器是否迭代完毕，结束迭代则设为`true`，此时`value`可以省略，因为没东西要输出了嘛。
- `value:any`：迭代器每次调用返回的值

基于`class`实现的可迭代对象示例如下：

```js
class SimpleClass {
  constructor(data) {
    this.data = data
  }

  // 首先实现 Symbol.iterator 方法
  [Symbol.iterator]() {
    let index = 0;

    // 返回一个迭代器
    return {
      // 迭代器内部必须包含 next 方法
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false }
        } else {
          return { done: true }
        }
      }
    }
  }
}
```

目前内置的可迭代对象有以下这些：

```js
Array
String
Map
Set
TypedArray
```

这些类型的值都可以使用`for...of`遍历。

:::caution

有个需要注意的点是，无法准确判断一个对象是否可迭代，因为要同时满足上述说的两个条件有个 hack 的方法。

```js
const myIterator = {
  next: function() {
    // ...
  },
  [Symbol.iterator]: function() { return this; }
};
```

但是对于日常来说，谁会写这么 hack 的代码呢？所以要判断一个对象是否可迭代仍然可以使用：

```js
typeof sth[Symbol.iterator] === 'function'
```

:::

## Promise.all 的实现

```js
Promise._all = function (iterable) {
  // 判断迭代器
  if (typeof iterable?.[Symbol.iterator] !== "function") {
    throw new TypeError("parameter must be iterable");
  }

  return new Promise((resolve, reject) => {
    let count = [...iterable].length;
    // 如果是空的迭代器，则直接 resolve 空数组
    if (count === 0) {
      resolve([]);
    } else {
      const resultArr = [];
      for (let it of iterable) {
        Promise.resolve(it)
          .then((v) => {
            count--;
            resultArr.push(v);
            if (count === 0) {
              resolve(resultArr);
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
    }
  });
};
```

测试

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise._all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// [ 3, 42, 'foo' ]
```



