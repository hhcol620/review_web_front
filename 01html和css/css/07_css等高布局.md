# CSS 等高布局

让多列在内容高度不同时，视觉上保持等高（背景色对齐）。

---

## 方案一：负 margin + 正 padding 抵消（经典方案）

```css
.container {
  overflow: hidden; /* 裁剪掉多余的背景色 */
}
.left, .right {
  margin-bottom: -9999px;
  padding-bottom: 9999px;
}
```

**原理：**

1. `padding-bottom: 9999px` 将每一列的背景色延伸到极远处。
2. `margin-bottom: -9999px` 将两个值正好抵消，不影响文档流高度。
3. 父容器 `overflow: hidden` 裁剪掉超出的背景，视觉上两列等高。

```html
<div class="container">
  <div class="left">左侧内容</div>
  <div class="right">右侧内容较多<br>第二行<br>第三行</div>
</div>
```

---

## 方案二：Flexbox（推荐）

Flex 容器默认 `align-items: stretch`，子元素自动拉伸到最高列的高度。

```css
.container {
  display: flex;
}
.left  { background: red; }
.right { background: green; }
```

无需任何额外技巧，天然等高。

---

## 方案三：table-cell

```css
.container {
  display: table;
  width: 100%;
}
.left, .right {
  display: table-cell;
}
```

表格单元格天然等高，但布局灵活性较低。

---

## 对比

| 方案 | 兼容性 | 代码复杂度 | 推荐度 |
|------|--------|-----------|--------|
| 负 margin + 正 padding | IE8+ | 中 | 了解原理 |
| Flexbox | IE10+ | 低 | ✅ 首选 |
| table-cell | IE8+ | 低 | 备用 |
