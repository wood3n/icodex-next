根据 ES 规范，JS 的`Date`类型的值本质上是一个`Number`类型的整数，表示从 UTC 时间`1970年01月01日00时00分00秒`到该日期的**毫秒数**。虽然 Date 对象的核心时间值是 UTC 时间戳，但获取日期和时间或其组成部分的基本方法都是在本地（即主机系统）时区和偏移量下工作的。

根据 ES 文档的规定，日期范围是从 April 20, 271821 BCE ~ September 13, 275760 CE（BCE：公元前，CE：公元）。

> [Time Values and Time Range](https://tc39.es/ecma262/#sec-time-values-and-time-range)

### 构造函数

要创建一个`Date`类型的对象，必须使用`new`调用构造函数`Date`；

> `new Date(year, month, [day, hours, minutes, seconds, ms])`
>
> @param `year` 必传，只有 1900~1999 之间的年份可以用 两位数形式`[0, 99]`代表
>
> @param `month` 必传 [0, 11]
>
> @param `day` 可选[1, 31]，默认是 1
>
> @param `hours` 可选[0, 23]，默认是 0
>
> @param `minutes` 可选[0, 59]，默认是 0
>
> @param `seconds` 可选[0, 59]，默认是 0
>
> @param `ms` 可选[0, 999]，默认是 0
>
> @return Date 日期对象

依次传入年月日时分秒，毫秒来初始化创建一个日期对象；在这种形式下，`year`和`month`必传。

```javascript
let date = new Date(1995, 11, 17, 3, 24, 0, 233);
// Sun Dec 17 1995 03:24:00 GMT+0800 (中国标准时间)
```

> `new Date(dateString)`

传入一个时间的字符串形式，来创建一个对象；这个参数和`Date.parse()`这个方法的参数一致，按照 ES 规范文档应该使用 ISO 8601 形式的字符串。而不同浏览器解析字符串的实现不一样，大部分都兼容 RFC 2282 形式的字符串。

```javascript
// ISO 8601
let date = new Date('1995-12-17T03:24:00');

// RFC 2282
let date = new Date('Fri 20 Jul 2018 00:00:00 +0800');
```

> `new Date(timestamp)`

传入一个 Unix 时间戳整数来创建一个对象

```javascript
let date = new Date(1595938968);
// Mon Jan 19 1970 19:18:58 GMT+0800 (中国标准时间)
```

如果单独使用构造函数，只会返回一个表示本地时区当前时间的字符串，并且无论`Date()`这种形式的单独调用，括号里面传不传参数，传任何参数，都只会返回当前时区的时间字符串。

```javascript
Date(); //String : Tue Jul 28 2020 20:16:28 GMT+0800 (中国标准时间)
```

### 构造函数的静态方法

#### Date.UTC()

> `Date.UTC(year, [month, day, hours, minutes, seconds, ms])`
>
> @param `year` 必传，只有 1900~1999 之间的年份可以用 两位数形式`[0, 99]`代表
>
> @param `month` 可选 [0, 11]，默认是 0
>
> @param `day` 可选[1, 31]，默认是 1
>
> @param `hours` 可选[0, 23]，默认是 0
>
> @param `minutes` 可选[0, 59]，默认是 0
>
> @param `seconds` 可选[0, 59]，默认是 0
>
> @param `ms` 可选[0, 999]，默认是 0
>
> @return Number 毫秒数

返回指定日期距离`1, 1970, 00:00:00 UTC`之间的毫秒数，其实也就是生成一个时间戳。

在最新的 ES 规范中，`year`必传，其它可选。

```javascript
console.log(Date.UTC(96, 1, 2, 3, 4, 5)); //823230245000
```

#### Date.now()

> `Date.now()`
>
> @return Number 毫秒数

返回当前 UTC 时间到`1, 1970, 00:00:00 UTC`之间的毫秒数

```javascript
console.log(Date.now()); //1595943465351
```

#### Date.parse()

> `Date.parse(dateString)`
>
> @param `dateString` ISO8601 形式时间字符串，也兼容 RFC 2282 形式的字符串
>
> @return Number 毫秒数

```javascript
// ISO 8601
Date.parse('1995-12-17T03:24:00');

// RFC 2282
Date.parse('Fri 20 Jul 2018 00:00:00 +0800');
```

### 实例方法

以下返回日期对象的指定部分

| 方法                        | 结果                                                         |
| --------------------------- | ------------------------------------------------------------ |
| `dateObj.getDay()`          | 根据本地时间返回指定日期的星期几，`[0, 6]`                   |
| `dateObj.getDate()`         | 根据当地时间返回指定日期在月中的第几天，`[1, 31]`            |
| `dateObj.getMonth()`        | 根据本地时间返回指定日期的月份，`[0, 11]`                    |
| `dateObj.getFullYear()`     | 根据当地时间返回指定日期的年份，`[0000, 9999]`<br />要注意两位数`[0, 99]`只能代表`1900~1999` |
| `dateObj.getHours()`        | 根据当地时间返回指定日期的小时，`[0, 23]`                    |
| `dateObj.getMinutes()`      | 根据当地时间返回指定日期的分钟，`[0, 59]`                    |
| `dateObj.getSeconds()`      | 根据当地时间返回指定日期的秒，`[0, 59]`                      |
| `dateObj.getMilliseconds()` | 根据当地时间返回指定日期的毫秒，`[0, 999]`                   |
| `dateObj.getTime()`         | 基于标准 UTC 此刻的时间，返回 unix 时间戳，没有时区的区别    |
| `dateObj.getUTCDate()`      | 基于指定日期加减偏移量后得到的 UTC 时间在月中的第几天，`[1, 31]` |

以`getDate`和`getUTCDate`为例，区别 UTC 时间和时区偏移量时间，当地是中国时区，相对于 UTC 时间偏移量是`UTC+0800`，也就是比 UTC 快 8 小时。

```javascript
// getUTCDate需要以UTC时间为参考，如果日期对象不是以UTC为基准建立的，必须减去偏移量得到UTC时间才行，1995-12-17T03:24:00 减去偏移量 8小时 也就是前一天 1995-12-16T19:24:00Z 左右，则 getUTCDate返回这个日期表示的天数就是 16
let date = new Date('1995-12-17T03:24:00');

console.log(date.getDate()); // 17
console.log(date.getUTCDate()); // 16

//而如果在建立日期对象的时候指定其为UTC时间，也就是下面第三个例子，那么就不用减去偏移量，因为系统认定这个时间就是UTC时间，所以直接看其日期部分，得到 17
let date = new Date('1995-12-17T03:24:00Z');

console.log(date.getDate()); // 17
console.log(date.getUTCDate()); // 17

//而如果指定了偏移量，则直接根据这个偏移量得到UTC时间了，1995-12-17T03:24:00 减去偏移量 2小时 也就是 1995-12-17T01:24:00Z，仍然在当天
let date = new Date('1995-12-17T03:24:00+0200');

console.log(date.getDate()); // 17
console.log(date.getUTCDate()); // 17
```

### DateToString

以下是`Date`实例上的转字符串方法

| 方法                         | 转换结果                              | 示例                                             |
| ---------------------------- | ------------------------------------- | ------------------------------------------------ |
| `dateObj.toString`           | 获取日期，时间，时区字符串的串接结果  | Fri Jul 24 2020 22:22:44 GMT+0800 (中国标准时间) |
| `dateObj.toDateString`       | 获取日期部分                          | Fri Jul 24 2020                                  |
| `dateObj.toTimeString`       | 获取时间部分                          | 10:34:53 GMT+0800 (中国标准时间)                 |
| `dateObj.toISOString`        | 获取 ISO 格式的字符串                 | 2020-07-24T14:22:44.600Z                         |
| `dateObj.toUTCString`        | 获取 RFC 7231 定义的 HTTP-date 的形式 | Fri, 24 Jul 2020 14:22:44 GMT                    |
| `dateObj.toJSON`             | 获取 ISO 格式的字符串                 | 2020-07-24T14:22:44.600Z                         |
| `dateObj.toLocaleDateString` |                                       | 下午 10:22:44（浏览器语言设定是中文）            |
| `dateObj.toLocaleTimeString` |                                       | 下午 10:22:44（浏览器语言设定是中文）            |
| `dateObj.toLocaleString`     |                                       | 2020/7/24 下午 10:22:44（浏览器语言设定是中文）  |

在 Chrome 的 devtool 执行`console`命令打印出来的日期字符串实际上是`Date`类型执行`toString()`方法得到的，所以看起来和 UTC 时间格式并不一致，注意不要和 UTC 标准时间格式搞混淆。

### DateToNumber

| 方法                   | 结果                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `Date.now()`           | 返回自 1970 年 1 月 1 日 00:00:00 (UTC) 到当前 UTC 时间的毫秒数 |
| `new Date().valueOf()` | 返回自 1970 年 1 月 1 日 00:00:00 (UTC) 指定 UTC 时间的毫秒数 |
| `Number(new Date())`   | 强制类型转换                                                 |
| `+new Date()`          | 一元`+`操作符会对后面的操作数执行 ToNumber 的转换            |

`Date`不是原始类型，属于`Object`类型，要对`Date`转换成`Number`类型的的时候，会按照以下步骤进行：

- 先执行规范定义的抽象操作[ToPrimitive(dateObj,number)](https://tc39.es/ecma262/#sec-toprimitive)将`Date`转原始类型，ToPrimitive 内部会获取类型的`@@toPrimitive`方法，也就是获取[`Date.prototype[@@toPrimitive]`](https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive)；
- 接下来`Date.prototype[@@toPrimitive]`内部执行的时候会将传入的转换类型参数*number*再传递给 ES 规范定义的抽象操作[OrdinaryToPrimitive](https://tc39.es/ecma262/#sec-ordinarytoprimitive)去执行；
- OrdinaryToPrimitive 根据传入*number*，便先执行实例上的`valueOf`方法，然后再执行`toString`方法，所以使用`Number`和`+`操作符执行的强制类型转换可以将`Date`类型的值转换成`Number`

所以，理论上所有能对操作数调用抽象操作[ToNumber](https://tc39.es/ecma262/#sec-tonumber)的都能将`Date`类型的值转换成`Number`。