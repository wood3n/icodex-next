# CSS三大特性

1. **层叠性 (Cascading)**：层叠性允许多个样式规则应用于同一元素。当多个规则冲突时，CSS 根据特定的规则和权重来决定哪个规则将优先应用。
2. **继承性 (Inheritance)**：继承性是指子元素可以继承其父元素的一些样式属性。继承使得代码更具效率，因为您可以将通用样式规则应用于父元素，而不必在每个子元素上都进行相同的设置。
3. **优先级 (Specificity)**：优先级是通过计算样式规则的特殊性和源文件顺序，来确定在多个样式中应用哪个规则。如果特殊性相同，那么后声明的规则通常会覆盖先声明的规则。

# CSS权重和优先级

权重：从0开始，一个行内样式+1000，一个id选择器+100，一个属性选择器、class或者伪类+10，一个元素选择器，或者伪元素+1，通配符+0

优先级：

- 权重相同，写在后面的覆盖前面的
- 使用 `!important` 达到最大优先级，都使用 `!important` 时，权重大的优先级高

# CSS 选择器有哪些

| 选择器                                                       | 示例             | 用法                                                         |
| ------------------------------------------------------------ | ---------------- | ------------------------------------------------------------ |
| [元素选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Type_selectors) | `tag { }`        | 或者叫类型选择器，选择所有该标签名的元素                     |
| [通配选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Universal_selectors) | `* { }`          | 选择所有元素                                                 |
| [类选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Class_selectors) | `.class { }`     | 选择具有该`class`名称的所有元素                              |
| [ID 选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/ID_selectors) | `#id{ }`         | 选择具有该`id`的所有元素，一般来说`id`设置都是唯一的         |
| [属性选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors) | `a[prop] { }`    | 使用标签名+方括号选择具有该属性的元素                        |
| [伪类选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes) | `div:hover { }`  | 单冒号，**改变已存在的元素的状态**                           |
| [伪元素选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements) | `div::after { }` | 双冒号，**创建不存在的元素**                                 |
| [后代选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Descendant_combinator) | `article p`      | 会递归选择所有子元素，不需要有严格的父子关系                 |
| [子代选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Child_combinator) | `article > p`    | 只选择具有严格的父子关系的所有子元素                         |
| [相邻兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Adjacent_sibling_combinator) | `h1 + p`         | 当第二个元素**紧跟在**第一个元素之后，并且两个元素都是属于同一个父元素的子元素时，则第二个元素将被选中 |
| [通用兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/General_sibling_combinator) | `h1 ~ p`         | 元素都是属于同一个父元素的子元素，**位置无须紧邻**           |

# 什么是CSS盒模型？如何计算盒模型的宽度和高度？

每个 HTML 元素都被视为一个矩形的盒子，盒子从内向外依次由四个部分组成：内容区域`content`、内边距`padding`、边框`border`和外边距`margin`。

盒模型分为标准盒模型和怪异盒模型，主要区别在于盒子的宽高计算方式不同。

标准盒模型下元素的宽高指的就是内容区域`content`的宽高；

怪异盒模型来源于 IE 盒模型缺陷问题，在 IE6 版本以前的大多数浏览器，包括 IE，NetScape 等对盒模型计算尺寸时，对通过`width`设置的块级元素，将其内容宽度`content`，`padding`，`border`三者的和作为`width`来看，也就是相比实际的标准盒模型，计算出来的盒模型的尺寸要小。

CSS3 引入了`box-sizing`属性，使得开发者可以使用`box-sizing`改变盒子模型的尺寸计算方式，这个属性的初始值为`content-box`也就是标准盒模型的计算方式，也可以设置成`border-box`，使用怪异盒模型的计算方式，对于日常开发来说使用`border-box`会更方便，便于计算盒子的实际显示尺寸。

# 行内元素的margin和padding特点

行内元素的`margin`和`padding`只在水平方向上生效。

# BFC

BFC 是块级格式化上下文（Block Formatting Context）的缩写，是一个在 CSS 中用于控制块级元素布局和定位的概念。

BFC 具有以下特性和行为：

1. **元素内部的块级框会在垂直方向上一个接一个排列**：这意味着块级元素在垂直方向上不会重叠，而是按照从上到下的顺序排列。
2. **BFC 可以清除上方浮动元素的浮动效果**：通过将一个元素设置为 BFC，它可以清除其前面的浮动元素，使其在垂直方向上占据浮动元素下方的空间。
3. **BFC 可以防止外部元素的外边距重叠**：当两个相邻的块级元素的外边距发生重叠时，将其中一个元素包装在 BFC 中可以防止外边距重叠。

创建 BFC 有以下方式：

- 根元素`<html>`整体属于块格式化上下文
- `float`属性不等于`none`元素
- `position:absolue`，或`position:fixed`的绝对定位元素
- 生成块容器，但是非块盒的元素，例如`display`属性值为`inline-block`，`table-cell`或者`table-caption`
- `display:flow-root`可以创建没有副作用的块格式化上下文，不会对容器元素本身造成任何影响
- 生成块盒子，且`overflow`属性值不是默认值`visible`的元素

# visibility和display和opacity的区别

- `visibility`设置`hidden`会隐藏元素，但是其位置还存在与页面文档流中，不会被删除，所以会触发浏览器渲染引擎的重绘。
- `display`设置了`none`属性会隐藏元素，且其位置也不会被保留下来，所以会触发浏览器渲染引擎的回流和重绘。
- `opacity `会将元素设置为透明，但是其位置也在页面文档流中，不会被删除，所以会触发浏览器渲染引擎的重绘；而且`opacity`支持设置`transition`过渡效果。

# animation、transition、transform、translate的区别



# flex几种值的区别

1. `flex:initial`：初始值，`flex: 0 1 auto`，会缩小到适合容器的最小尺寸，但不会扩大占据容器剩余空间。
2. `flex:none`：`flex: 0 0 auto`，不具有伸缩性，宽度根据内容自适应。
3. `flex:auto`：`flex: 1 1 auto`，会缩小到适合容器的最小尺寸，也会扩大占据容器剩余空间。
4. `flex:1`：`flex: 1 1 0`
   - 单个`flex`数字值，则用来指定`flex-grow`的值，同时`flex-shrink`为`1`，`flex-basis`为`0`
   - 单个`flex`宽度值，则用来指定`flex-basis`的值，同时`flex-grow`为`1`，`flex-shrink`为`1`
5. `flex: 1 1`：`flex: 1 1 0`，
   1. 两个`flex`数字值，则用来指定`flex-grow`和`flex-shrink`，`flex-basis`为`0`;
   2. 数字值+宽度值组合，则用来指定`flex-grow`和`flex-basis`的值，`flex-shrink`为`1`
6. `flex: 1 1 100%`



# 盒子高度塌陷问题

当盒子内部具有浮动、绝对定位的元素时，这些元素会脱离正常布局的文档流，导致父元素无法根据子元素高度自适应调整。

解决父元素高度塌陷的问题可以使用以下方法：

1. 设置父元素的高度；

2. 在父元素的最后一个浮动元素之后插入一个具有 `clear: both;` 属性的空元素；

3. 在浮动元素后面添加`after`伪元素清除浮动

   ```css
   .clearfix {
     *zoom: 1;
   }
   
   .clearfix:before,.clearfix:after {
     display: table;
     line-height: 0;
     content: "";
   }
   
   .clearfix:after {
     clear: both;
   }
   ```

4. 使用`flex`布局代替`absolute`绝对定位的方式

# 居中布局方式

行内元素居中设置`line-height`等于`height`

```CSS
.box {
  texta-align: center;
  height: 300px;
  line-height:300px;
}
```

多行文本垂直居中，设置单元格布局

```CSS
.parent {
  display: table-cell;
  vertical-align: middle;
}
```

`flex`布局居中

```CSS
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

绝对定位居中

```css
.parent {
  position:relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
```

使用表格布局`table-cell`+`text-align:center`+`vertical-align:middle`

```css
.parent {
  display: table;
  text-align: center;
}

.child {
  display:table-cell;
  vertical-align: middle;
}
```

# 用flex布局实现九宫格

父元素和子元素都不设置高度，父元素设置`flex-wrap:wrap`让子元素自适应换行，同时设置`justify-content: space-around;`让子元素间距相同。

子元素设置`padding-top/padding-bottom`百分比，因为`padding`的百分比计算是往上查找其父元素的宽度，父元素没有宽度则相对于根元素的宽度；而`width`也为父元素宽度的百分比。

```html
 <div class="parent">
  <div class="child"></div>
  <div class="child"></div>
  <div class="child"></div>
  <div class="child"></div>
  <div class="child"></div>
  <div class="child"></div>
  <div class="child"></div>
  <div class="child"></div>
  <div class="child"></div>
</div>

<style>
.parent  {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
  
.child {
  padding-top: 30%;
  margin-top: 3%;
  border-radius: 10%;
  background-color: red;
  width: 30%;
}
</style>
```

# div 垂直水平居中，并完成 div 高度永远是宽度的一半

1. 利用`aspect-ratio`，`aspect-ratio`用来指定盒子的宽和高的比例，可以轻松定义盒子的宽高比

```CSS
div {
  aspect-ratio: 1/0.5;
}
```

2. 利用视口单位`vw`

```css
div {
  width: 100vw;
  height: 50vw;
}
```

3. 利用百分比`padding`，因为`padding`设置百分比值时，其计算是相对于父元素的`width`，所以我们可以让子元素高度为`0`，利用上下`padding-bottom:50%`来实现其自身高度为宽度的一半

```css
.parent {
	width: 400px;
}

.child {
  width: '100%';
  padding-bottom: 50%;
}
```

# CSS实现等腰三角形

等腰三角形可以通过`div`的边框`border`来实现，通过设置左右`border`宽度相同且透明，由于元素内容区域无宽高，所以设置底部`bottom`可以覆盖左右`border`区域。

```CSS
div {
  width: 0px;
  height: 0px;
  /* 三角形底边的一半 */
  border-left: 80px solid transparent;
  /* 三角形底边的一半 */
  border-right: 80px solid transparent;
  /* 三角形高 */
  border-bottom: 120px solid #A962CE;
}
```

同理，实现等边三角形时，只需要根据等边三角形的特点，即可得出高约为底边长度的`0.866`
$$
高 = (边长 * √3) / 2
$$

# CSS实现环形进度条

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        .container{
            display:flex
        }

        .left{
            width: 100px;
            height: 200px;
            position: relative;
            overflow: hidden;
            background: pink;
        }

        .leftcircle{
            width: 160px;
            height: 160px;
            border: 20px solid white;
            position: absolute;
            border-radius: 50%;
            left: 0px;
            top:0px;
            border-bottom: 20px solid orange;
            border-left: 20px solid orange;
            transform: rotate(45deg);
            animation-name:circle_left;
            animation-duration: 2s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;

        }

        .right {
            width: 100px;
            height: 200px;
            position: relative;
            overflow: hidden;
            background-color: pink;
        }

        .rightcircle {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            border: 20px solid white;
            position: absolute;
            border-top: 20px solid orange;
            border-right: 20px solid orange;
            right: 0px;
            top: 0px;
            animation-name: circle_right;
            animation-duration: 2s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            transform: rotate(-135deg);
        }

        @keyframes circle_right {
            0% {
                transform: rotate(-135deg);
            }

            50%,100% {
                transform: rotate(45deg);
            }
        }
        @keyframes circle_left {
            0%,50% {
                transform: rotate(-135deg);
            }

            100% {
                transform: rotate(45deg);
            }
        }
    </style>
</head>

<body>
    <!-- <div class="demo"></div> -->
    <div class='container'>
        <div class="left">
            <div class="leftcircle"></div>
        </div>
        <div class="right">
            <div class="rightcircle"></div>
        </div>
    </div>
</body>

</html>
```

