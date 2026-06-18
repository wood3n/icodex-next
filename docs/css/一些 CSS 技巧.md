# 一些CSS技巧

## 让 input 或 textarea 宽高随输入内容变化

```css
input,
textarea {
  field-sizing: content;
}
```

## 使用 CSS 自定义 API 实现搜索关键词高亮

demo：https://project-three-xi-93.vercel.app/

```js
// Step 1 — 遍历目标容器内所有文本节点
const walker = document.createTreeWalker(
  root, NodeFilter.SHOW_TEXT
);
const nodes = [];
while ((node = walker.nextNode())) nodes.push(node);

// Step 2 — 在每个文本节点中查找匹配，创建 Range
const ranges = [];
for (const node of nodes) {
  let startPos = 0;
  while (startPos < node.textContent.length) {
    const idx = node.textContent.toLowerCase()
      .indexOf(query.toLowerCase(), startPos);
    if (idx === -1) break;
    const range = document.createRange();
    range.setStart(node, idx);
    range.setEnd(node, idx + query.length);
    ranges.push(range);
    startPos = idx + 1;
  }
}

// Step 3 — 用 Highlight 包装 Range，注册到 CSS.highlights
CSS.highlights.set("search-result", new Highlight(...ranges));

// Step 4 — 在 CSS 中用 ::highlight() 伪元素定义样式（无需改 DOM）
::highlight(search-result) {
  background-color: oklch(0.85 0.22 95 / 85%);
  color: oklch(0.13 0 0);
}
```
