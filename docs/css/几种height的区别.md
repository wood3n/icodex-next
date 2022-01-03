### window.innerHeight

表示浏览器视口高度像素值，包括水平方向滚动条的高度，不包括浏览器 UI 组件（地址栏，书签栏等），会随着浏览器窗口的缩放比例，以及浏览器本身调节窗口大小而改变。

![image-20210204001332178](../../public/images/image-20210204001332178.png)

### window.outerHeight

整个浏览器的高度，包括地址栏，书签栏等部分，且不会随着浏览器缩放比例或者浏览器标签页大小改变而改变，所以这是一个**固定**值。

![image-20210204002042853](../../public/images/image-20210204002042853.png)

### scrollHeight **readonly**

元素内容区域的整体高度，包括溢出父元素的隐藏区域；包含元素的`padding`部分，不包含`border`，`margin`以及水平方向滚动条的高度，如果有伪元素`::before`，`::after`等，也会包含在内。

![img](../../public/images/scrollheight.png)

### clientHeight **readonly**

```javascript
CSS height + CSS padding - 水平方向滚动条高度
```

包含元素的`padding`部分，不包含`border`，`margin`以及水平方向滚动条的高度。

根元素`html`的`clientHeight`就是`viewport`的高度，也不包含水平方向滚动条高度。

![img](../../public/images/dimensions-client.png)

### offsetHeight **readonly**

包含元素`padding`，`border`和水平滚动条高度，不包含`margin`，伪元素的高度。

![img](../../public/images/dimensions-offset.png)