---
title: "rust语言类型"
keywords: ["rust语言类型", "rust数据类型", "整型", "浮点型", "布尔型", "字符型", "字符串", "str字面量字符串"]
tags: ["rust语言类型", "rust数据类型", "整型", "浮点型", "布尔型"]
---

# rust语言类型

区别于 javascript，rust 是**预编译静态类型语言**，也就是程序在编写过程中确定数据类型，编写完成之后需要编译成程序才能运行。而 js 则无需编译只需要解释器就可以运行。

# rust数据类型

rust 比较方便的一点是无需在程序中直接指定变量的类型，编译器通常可以推断出我们想要用的类型。但是在使用某些转换类型的方法时，编译器无法自动推断要转换的目标类型，这时候就需要明确指定类型：

```rust
// 字符串的 parse 方法将字符串转换成其他类型
let guess: u32 = "42".parse().expect("Not a number!");
```

## 整型

一般使用`u32`做为数值的默认类型，其中`isize` 或 `usize` 主要作为某些集合的索引

| 长度    | 有符号  | 无符号  | 数值范围     |
| ------- | ------- | ------- | ------------ |
| 8-bit   | `i8`    | `u8`    | 2^8：0 ~ 255 |
| 16-bit  | `i16`   | `u16`   |              |
| 32-bit  | `i32`   | `u32`   |              |
| 64-bit  | `i64`   | `u64`   |              |
| 128-bit | `i128`  | `u128`  |              |
| arch    | `isize` | `usize` |              |

## 浮点型

浮点数采用 IEEE-754 标准表示。`f32` 是单精度浮点数，`f64` 是双精度浮点数，分别占 32 位和 64 位。

默认类型是 `f64`，因为在现代 CPU 中，它与 `f32` 速度几乎一样，不过精度更高。

```rust
let x = 2.0; // f64

let y: f32 = 3.0; // f32
```

## 布尔型

布尔类型使用 `bool` 表示，只有两个值：`true` 和 `false`.

```rust
let t: bool = true;
```

## 字符型

布尔类型使用 `char` 表示，并用单引号包裹值。`char` 类型的大小为四个字节 (four bytes)，并代表了一个 Unicode 标量值（Unicode Scalar Value），也就是说字符型的变量只能包含一个 Unicode 字符。

```rust
let a = 'z';
```

## 字符串

### &str(字面量字符串)

字面量字符串在 rust 中的类型是`&str`，其中`str`表示类型，而`&`符号表示指针，`&`表示该类型的引用，即一个指针。

声明字符串字面量无需指定其类型。

字符串字面量在初始化完以后就不可变了。

```rust
let s = "hello";
```

### String类型

`String`类型管理被分配到堆上的数据，能够存储在编译时未知大小的文本。

使用`String::from`函数基于字面量创建`String`类型：

```rust
let mut s = String::from("hello");

s.push_str(", world!"); // push_str() 在字符串后追加字面值
```

## 元组 turple

使用圆括号`()`包裹，并指定每个元素类型的方式来声明一个元祖。

**元组长度固定，一旦声明，其长度不会增大或缩小。**

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
```

元组支持解构语法，解构需要为所有元素指定变量名；如果不需要使用某个位置的元素，可以使用下划线或者下划线前缀名称的变量来代替：

```rust
let tup = (500, 6.4, 1);

let (x, _, z) = tup;
```

元组支持使用点`.`和索引获取每个索引位置的值：

```rust
let x: (i32, f64, u8) = (500, 6.4, 1);

let five_hundred = x.0;

let six_point_four = x.1;

let one = x.2;
```

不保存任何数据的元组表示为`()`。在Rust中，它是特殊的，它有自己的类型：`unit`。

`unit`类型通常用在那些不关心返回值的函数中作为返回值。

```rust
let x: ()  =  ();

fn no_value() {
  ()
}
```

## 数组 array

使用包含在方括号中的逗号分隔的值列表来创建一个数组。数组中的每个元素的类型必须相同，而且**Rust 中的数组长度是固定的**。

如果要在声明时指定数组元素的类型，可以在方括号中包含每个元素的类型，后跟分号，再后跟数组元素的数量。

```rust
let a = [1, 2, 3, 4, 5];
  
// 创建一个长度为 5，元素类型为 i32 的数组
let b: [i32; 5] = [1, 2, 3, 4, 5];
```

还可以通过在方括号中指定初始值加分号再加元素个数的方式来创建一个每个元素都为相同值的数组：

```rust
// 创建一个长度为 5，每个元素值都是 3 的数组
let a = [3; 5];
```

数组也支持解构语法：

```rust
let array = [1, 2, 3];
    
// 解构数组
let [a, b, c] = array;
```

数组支持使用方括号+索引的方式获取每个索引位置的元素值：

```rust
let a = [1, 2, 3, 4, 5];

let first = a[0];
let second = a[1];
```

## Slice类型



# 变量和常量

1. 常量使用`const`声明，名称使用全大写加下划线的命名风格；
2. 变量使用`let`声明，名称使用`snake`命名风格，即小写并使用下划线分隔单词；
3. 仅使用`let`声明的变量不可修改：

```rust	
// 不能直接修改 let 声明的变量
fn main() {
    let x = 5;
    x = 6;

    println!("The value of x is: {x}");
}
```

```shell
# 修改变量报错
error[E0384]: cannot assign twice to immutable variable `x`
 --> src\main.rs:3:5
  |
2 |     let x = 5;
  |         -
  |         |
  |         first assignment to `x`
  |         help: consider making this binding mutable: `mut x`
3 |     x = 6;
  |     ^^^^^ cannot assign twice to immutable variable

For more information about this error, try `rustc --explain E0384`.
warning: `hello_cargo` (bin "hello_cargo") generated 1 warning
error: could not compile `hello_cargo` (bin "hello_cargo") due to 1 previous error; 1 warning emitted
```

4. 使用`let mut`声明的变量可以修改值，但是不能修改类型

```rust
// 以下代码可以正常运行
fn main() {
    let mut x = 5;
    x = 6;

    println!("The value of x is: {x}");
}
```

5. 使用`let`重新声明相同名称的变量，也就是[变量遮蔽](https://zh.wikipedia.org/wiki/%E8%AE%8A%E6%95%B8%E9%81%AE%E8%94%BD)，此时既可以修改值也可以修改类型

```rust
// 但是可以覆盖声明
fn main() {
    let x = 5;
    let x = 6;

    println!("The value of x is: {x}");
}
```

6. 可以使用 turple 同时声明多个变量：

```rust
let (a, b) = (123, "hello world");
```

7. 声明但不使用的变量会引起编译器提示，可以在变量名前加上下划线前缀来忽略提示；下划线前缀也用于不使用的函数参数的占位符。

```rust
let _a = 123;
```



# 语句和表达式

:::info

**语句**（*Statements*）是执行一些操作但不返回值的指令。 **表达式**（*Expressions*）计算并产生一个值。

:::

代码块的值是其最后一个表达式的值，例如下面`if`条件表达式最终也会返回一个值`6`

```rust
fn main() {
    let condition = true;
    
    // 将 if 条件语句的值传给变量 number
    let number = if condition { 5 } else { 6 };

    println!("The value of number is: {number}");
}
```

**表达式不能使用分号结尾**，使用分号结尾就是一个语句了。

```rust
fn plus_one(x: i32) -> i32 {
    // 不带分号，是一个表达式
    x + 1
}
```

```rust
fn plus_one(x: i32) -> i32 {
  	// 带上分号，变成了语句，而原本函数声明了返回值类型，但函数的实现并没有返回表达式，所以这里编译无法通过
    x + 1;
}
```

## if…else表达式

在 rust 中，`if...else`条件表达式不对条件表达式加括号，并且条件表达式的值类型必须是`bool`类型

```rust
fn main() {
    let number = 3;

    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}
```

因为`if..else`是一个表达式，所以可以将其放在语句的右侧：

```rust
fn main() {
    let condition = true;
    let number = if condition { 5 } else { 6 };

    println!("The value of number is: {number}");
}
```

## for循环

`for`循环比较常用的情况是遍历数组元素：

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {element}");
    }
}
```

## loop和while表达式

`loop`表示无限循环，除非内部使用`break`跳出循环，否则不会自动结束：

在循环体结构中，`rust`一样支持`continue`和`break`:

- `continue`表示跳过这个循环中的任何剩余代码，并转到下一个循环；
- `break`表示彻底终止循环，而且`break`支持返回值

```rust
fn main() {
    let mut counter = 0;

    // 从 loop 循环得到 break 返回的值
    let result = loop {
        counter += 1;

        if counter == 10 {	
          	// 返回值
            break counter * 2;
        }
    };

    println!("The result is {result}");
}
```

`while`则是带有条件的循环，相当于`loop`、`if`、`else`和`break`的组合结构：

```rust
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");

        number -= 1;
    }

    println!("LIFTOFF!!!");
}
```

# move & copy

## copy

以下数据类型被整个存储在栈上，值传递的过程称为 copy。copy 的过程不会对原来的变量值有影响。

```rust
let x = 5;
// copy
let y = x;

// copy 完 x、y 同样有效
println!("x = {}, y = {}", x, y);
```

- 所有整数类型，比如 `u32`。
- 布尔类型，`bool`，它的值是 `true` 和 `false`。
- 所有浮点数类型，比如 `f64`。
- 字符类型，`char`。
- 元组，当且仅当其包含的类型也都实现 `Copy` 的时候。比如，`(i32, i32)` 实现了 `Copy`，但 `(i32, String)` 就没有。

## move

`String`，数组等复杂类型传递的过程称为移动，移动完成后，旧的变量就被销毁了，不能再访问。

```rust
let s1 = String::from("hello");
// move
let s2 = s1;

// 无法编译通过，因为 s1 移动到 s2 后就被销毁了
println!("{}, world!", s1);
```

# 函数

## 函数签名

函数签名由`fn`，函数名，参数，返回类型四个部分组成。

rust 中的函数使用`fn`关键字声明，函数名称使用`snake`命名风格，每个函数参数必须指定类型；如果函数有返回值，则需要使用箭头`->`指定返回值类型。

```rust
fn five() -> i32 {
   5
}

fn main() {
    let x = five();

    println!("The value of x is: {x}");
}
```

:::warning

在 Rust 中，大部分函数不会使用`return`返回值，都是隐式的返回最后的表达式，函数返回值等同于函数体最后一个表达式的值。

:::

简单来说，函数要返回值，直接把变量放在函数体尾部就行，注意不能加分号。

```rust
fn main() {
    let x = plus_one(5);

    println!("The value of x is: {x}");
}

fn plus_one(x: i32) -> i32 {
    x + 1
}
```

可以使用元组来返回多个值：

```rust
fn temp(x: i32) {
    (x, 1)
}
```

如果使用`return`来返回值，则需要在结尾加上分号；而如果`return`后不加任何表达式，则表示返回空元组`()`

```rust
fn plus(a: i32, b: i32) -> i32 {
  return a + b;
}
```

## main 函数

`main`函数是 rust 程序的入口函数。不能指定返回类型。



# 所有权和作用域

## 块级作用域

rust 只具有块级作用域，也就是使用花括号`{}`包围的代码，常见的具有花括号的情况有以下几种：

1. 函数
2. `if...else`
3. `loop`

```rust
```



