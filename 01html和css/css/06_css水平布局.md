# CSS 水平布局

## 一栏定宽 + 一栏自适应

### 左定宽，右自适应

**方案一：浮动 + margin**

```css
.left {
  float: left;
  width: 200px;
}
.right {
  margin-left: 200px; /* 等于左侧宽度 */
}
```

**方案二：浮动 + overflow（BFC）**

```css
.left {
  float: left;
  width: 200px;
}
.right {
  overflow: hidden; /* 触发 BFC，自动避开浮动元素 */
}
```

---

### 右定宽，左自适应

```css
.right {
  float: right;
  width: 200px;
}
.left {
  margin-right: 200px;
}
```

---

## Flexbox 方案（推荐）

```css
.container {
  display: flex;
}
.left {
  width: 200px;
  flex-shrink: 0; /* 防止被压缩 */
}
.right {
  flex: 1; /* 占据剩余所有空间 */
}
```

---

## 三栏布局（两侧定宽，中间自适应）

```css
/* 圣杯布局 / 双飞翼布局核心思路 */
.container {
  display: flex;
}
.left, .right {
  width: 200px;
  flex-shrink: 0;
}
.center {
  flex: 1;
}
```
