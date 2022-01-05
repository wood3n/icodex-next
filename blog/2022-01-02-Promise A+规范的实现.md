---
title: Promise A+规范的实现
authors: oxygen
---

## Promise/A+

> https://promisesaplus.com/#terminology

### Promise 对象

- 一个对象或者函数，并且带有`then`方法
- 一个当前状态`state`，可以是`pending`、`fulfilled`和`rejected`，且`fulfilled`和`rejected`不可被改变
- 一个`resolve`值`value`，可以是任何 JS 值的形式
- 一个执行`reject`的原因`reason`

<!--truncate-->

### then 方法

> `newPromise = promise.then(onFulfilled, onRejected)`

`then`方法接收两个参数，且必须都是函数，否则忽略该参数

- `onFulfilled`：当前 Promise 对象的状态变成`fulfilled`以后执行，并且将`value`作为第一个参数，并且只允许执行一次
- `onRejected`：当前 Promise 对象的状态变成`rejected`以后执行，并且将`reason`作为第一个参数，并且只允许执行一次
- `onFulfilled`和`onRejected`必须在当前宏任务执行完以后才能执行，也就是异步的需求
- `then`执行完**返回一个新的 Promise 对象**`newPromise`：
  - 如果`onFulfilled`或者`onRejected`返回新的值`x`，则执行下文的方法`Resolve(newPromise, x)`
  - 如果`onFulfilled`或者`onRejected`执行抛出异常`e`，`promise2`也必须`reject(e)`
  - 如果`onFulfilled`不是函数（未提供），则当`promise`状态变成`fulfilled`的时候，`newPromise`内部状态也要变成`fulfilled`并以`promise`内部的`value`执行`resolve`；同理`onRejected`也是
- 同一个 Promise 对象的`then`方法可能调用多次
  - 并且各自`onFulfilled`或者`onRejected`回调必须按照调用`then`的顺序依次执行

### Resolve(promise, x)

`Resolve(promise, x)`这里是描述`then`执行以后的算法判断，也就是`then`的反复执行过程，这是一个特殊的内部方法，是处理`then`链式执行的算法；

- 如果`promise === x`，直接`reject promise`并返回`TypeError`的错误；
- 如果`x`是一个 Promise 对象，则当前 Promise 对象`promise`的状态必须和`x`同步；
- 如果`x`是一个对象或者函数：
  - 判断其是否具有`then`方法；
  - 如果没有，则`reject`；
  - 如果具有`then`，则使用`x`作为`then`内部的`this`执行`then`，第一个参数传递`resolvePromise`，第二个参数传递`rejectPromise`
    - 当`resolvePromise`被传递参数`y`调用的时候，执行`Resolve(promise, y)`
    - 当`rejectPromise`被传递参数`r`调用的时候，则`promise`也`reject`
    - 如果`resolvePromise`和`rejectPromise`都被调用了，或者被多次调用，首次调用优先执行，后续被忽略；
    - 如果执行`then`抛出异常，当`resolvePromise`或者`rejectPromise`被调用了，则忽略；否则`reject`顶层的`promise`
- 如果`x`不满足上述条件，`promise`直接`fulfilled`

## 实现

如果按照 promise-aplus 的算法慢慢摸索就可以直接实现一个完整的 Promise

### 初始化

Promise 对象在初始化以后，具有以上提到的`value`，`state`以及`reason`等状态值

```js
class APromise {
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('init parameter must be a function');
    }

    this.state = 'pending';
    this.value = null;
    this.reason = null;

    try {
      fn(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  resolve(value) {
    setTimeout(() => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
      }
    });
  }

  reject(reason) {
    setTimeout(() => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
      }
    });
  }
}
```

### then

在上述代码的基础上，添加`then`方法，因为`then`方法可能被调用多次，所以我们需要额外定义两个队列保存在 Promise 状态发生变化以后的回调函数`onFulfilled`或`onRejected`，这里做一个参数非函数类型的简单化处理，这样只需要考虑函数的回调形式，毕竟日常开发也不会传递其他类型的参数

```js
class APromise {
  constructor(fn) {
    this.state = 'pending';
    this.value = null;
    this.reason = null;
    this.fulfilledQue = [];
    this.rejectedQue = [];

    fn(this.resolve, this.reject);
  }

  then = (onFulfilled, onRejected) => {
    this.fulfilledQue.push(
      typeof onFulfilled === 'function' ? onFulfilled : value => value,
    );

    this.rejectedQue.push(
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason;
          },
    );
  };
}
```

然后`then`方法返回一个新的 Promise 对象`newPromise`，并且这个新的 Promise 对象和当前 Promise 的状态保持同步，所以在`then`内部需要判断当前 Promise 的状态来进行不同的处理：

- 如果是`fulfilled`状态，则表明当前 Promise 已经执行了`resolve`，所以应该以当前 Promise 的`value`异步执行`onFulfilled`，并把当前 Promise 的`value`传递下去；`rejected`状态同理
- 而如果当前 Promise 状态是`pending`，那么应该将`onFulfilled`或`onRejected`推到回调函数中去，等待状态改变的时候自动调用

```js
then = (onFulfilled, onRejected) => {
  onFulfilled =
    typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : reason => {
          throw reason;
        };
  const newPromise = new APromise((resolve, reject) => {
    if (this.state === 'fulfilled') {
      // https://promisesaplus.com/#point-43
      // 这里直接异步执行回调函数，保证返回的 Promise 状态和当前 Promise 状态一致
      setTimeout(() => {
        try {
          const x = onFulfilled(this.value);
          this.resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }

    if (this.state === 'rejected') {
      setTimeout(() => {
        try {
          const x = onRejected(this.reason);
          this.resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }

    // 如果当前 Promise 状态
    if (this.state === 'pending') {
      this.fulfilledQue.push(value => {
        try {
          const x = onFulfilled(value);
          this.resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });

      this.rejectedQue.push(reason => {
        try {
          const x = onRejected(reason);
          this.resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }
  });

  return newPromise;
};
```

然后我们需要在 Promise 状态发生改变的时候调用`onFulfilled`或`onRejected`，可以在原来的`resolve`和`reject`基础上进行补充，这里[使用`setTimeout`模拟异步实现](https://promisesaplus.com/#point-67)的方式

```js
resolve = value => {
  setTimeout(() => {
    if (this.state === 'pending') {
      this.state = 'fulfilled';
      this.value = value;
      this.fulfilledQue.forEach(cb => {
        cb(this.value);
      });
    }
  });
};

reject = reason => {
  setTimeout(() => {
    if (this.state === 'pending') {
      this.state = 'rejected';
      this.reason = reason;
      this.rejectedQue.forEach(cb => {
        cb(this.reason);
      });
    }
  });
};
```

### resolvePromise

`resolvePromise`的实现相对简单一点，直接按照规范定义一步一步来即可

```js
resolvePromise = (promise, x, resolve, reject) => {
  // https://promisesaplus.com/#point-48
  // 如果then提供的onFulfilled或者onRejected函数执行返回的值和then返回的是同一个promise，会导致下文this.resolvePromise重复调用，形成死循环
  if (promise === x) {
    reject(
      new TypeError(
        'then must return a different promise with fulfilled callback',
      ),
    );
  }

  // https://promisesaplus.com/#point-49
  // 如果是一个 Promise，需要判断其状态，并同步到后续的 Promise
  if (x instanceof APromise) {
    // https://promisesaplus.com/#point-50
    if (x.state === 'pending') {
      x.then(
        value => {
          this.resolvePromise(promise, value, resolve, reject);
        },
        reason => {
          reject(reason);
        },
      );
    } else {
      // https://promisesaplus.com/#point-51
      x.then(resolve, reject);
    }
  } else if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {
    // https://promisesaplus.com/#point-53
    // thenable 函数
    let then;
    // https://promisesaplus.com/#point-59
    // 保证x.then提供的回调函数只会被执行一次
    let hasBeenResolved = false;
    try {
      then = x.then;
      // https://promisesaplus.com/#point-56
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (!hasBeenResolved) {
              hasBeenResolved = true;
              // https://promisesaplus.com/#point-57
              this.resolvePromise(promise, y, resolve, reject);
            }
          },
          r => {
            if (!hasBeenResolved) {
              hasBeenResolved = true;
              reject(r);
            }
          },
        );
      } else {
        // https://promisesaplus.com/#point-63
        resolve(x);
      }
    } catch (e) {
      // https://promisesaplus.com/#point-60
      if (!hasBeenResolved) {
        reject(e);
      }
    }
  } else {
    // https://promisesaplus.com/#point-64
    resolve(x);
  }
};
```

### 测试

使用 promise-aplus 规范提供的[promises-tests](https://github.com/promises-aplus/promises-tests)进行测试，在原有代码上暴露以下入口方法，然后使用 cjs 语法导出即可

```js
/**
 * 测试入口
 */
APromise.defer = APromise.deferred = function() {
  let dfd = {};
  dfd.promise = new APromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
```

执行`promises-aplus-tests`，可以看到完美通过 872 个测试用例。