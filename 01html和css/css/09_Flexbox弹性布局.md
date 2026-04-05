# Flexbox 弹性布局

## 启用

```css
.container { display: flex; }
```

子元素自动成为 flex 子项，默认沿主轴（水平方向）排列。

---

## 容器属性（父元素）

### `flex-direction` — 主轴方向

```css
flex-direction: row;            /* → 默认，水平从左到右 */
flex-direction: row-reverse;    /* ← 水平从右到左 */
flex-direction: column;         /* ↓ 垂直从上到下 */
flex-direction: column-reverse; /* ↑ 垂直从下到上 */
```

### `flex-wrap` — 是否换行

```css
flex-wrap: nowrap;  /* 默认，不换行（子项可能被压缩） */
flex-wrap: wrap;    /* 超出后换行 */
```

### `flex-flow` — 缩写（direction + wrap）

```css
/* flex-flow: <flex-direction> <flex-wrap> */
flex-flow: row nowrap;        /* 默认值 */
flex-flow: column wrap;       /* 垂直排列 + 换行 */
flex-flow: row-reverse wrap;  /* 反向水平 + 换行 */
```

### `justify-content` — 主轴对齐

```css
justify-content: flex-start;    /* 左对齐（默认） */
justify-content: flex-end;      /* 右对齐 */
justify-content: center;        /* 居中 */
justify-content: space-between; /* 两端对齐，间距均分 */
justify-content: space-around;  /* 每个子项两侧间距相等 */
justify-content: space-evenly;  /* 所有间距完全相等 */
```

### `align-items` — 交叉轴对齐（单行）

```css
align-items: stretch;     /* 拉伸填满（默认） → 等高布局 */
align-items: flex-start;  /* 顶部对齐 */
align-items: flex-end;    /* 底部对齐 */
align-items: center;      /* 垂直居中 */
align-items: baseline;    /* 基线对齐 */
```

### `align-content` — 交叉轴对齐（多行，需配合 flex-wrap）

```css
align-content: flex-start | flex-end | center | space-between | space-around | stretch;
```

---

## 子项属性

### `flex` — 伸缩比（最常用）

```css
/* flex: flex-grow  flex-shrink  flex-basis */
.item { flex: 1; }        /* 等价于 flex: 1 1 0%，占据剩余空间 */
.item { flex: 0 0 200px;} /* 固定 200px，不伸缩 */
```

| 属性 | 说明 | 默认值 |
|------|------|--------|
| `flex-grow` | 有剩余空间时按比例放大 | `0`（不放大） |
| `flex-shrink` | 空间不足时按比例缩小 | `1`（等比缩小） |
| `flex-basis` | 主轴方向的初始大小 | `auto` |

### `flex` 关键字速查

| 写法 | 等价于 | 含义 |
|------|--------|------|
| `flex: initial` | `flex: 0 1 auto` | **默认值**。不放大，可缩小，尺寸由内容/width决定 |
| `flex: auto` | `flex: 1 1 auto` | 可放大也可缩小，尺寸由内容/width决定 |
| `flex: none` | `flex: 0 0 auto` | 完全固定，不放大不缩小，尺寸由内容/width决定 |
| `flex: 1` | `flex: 1 1 0%` | 可放大可缩小，初始尺寸为 0（忽略内容大小，纯按比例分配） |
| `flex: 0 0 200px` | — | 固定 200px，不伸缩 |

**`flex: auto` vs `flex: 1` 的关键区别：**

- `flex: auto`（`flex-basis: auto`）：先按内容/width分配空间，**剩余空间**再按比例分配 → 内容多的子项占更多。
- `flex: 1`（`flex-basis: 0%`）：忽略内容大小，把**全部空间**按比例分配 → 所有子项等宽。

```css
/* 示例：三个子项内容长短不同 */

/* flex: auto → 各子项宽度不等（内容长的更宽） */
.item { flex: auto; }

/* flex: 1 → 各子项宽度完全相等 */
.item { flex: 1; }
```

**`flex: none` 的典型用途：**

```css
/* 防止子项被压缩（如 icon、头像、固定宽度元素） */
.avatar { flex: none; width: 40px; }
.text   { flex: 1; overflow: hidden; text-overflow: ellipsis; }
```

### `align-self` — 单个子项的交叉轴对齐

```css
.item { align-self: center; } /* 覆盖父元素的 align-items */
```

### `order` — 排列顺序

```css
.item { order: -1; } /* 值越小越靠前，默认 0 */
```

---

## 常用场景速查

```css
/* 水平垂直居中 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 左定宽右自适应 */
.left  { flex: 0 0 200px; }
.right { flex: 1; }

/* 子项等分 */
.item { flex: 1; }

/* 最后一项靠右 */
.last { margin-left: auto; }
```
