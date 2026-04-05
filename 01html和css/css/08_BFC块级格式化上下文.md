# BFC 块级格式化上下文

## 什么是 BFC

BFC（Block Formatting Context）是页面中一块**独立的渲染区域**，内部元素的布局不会影响外部，外部也不会影响内部。

---

## 触发 BFC 的条件

满足以下任意一条即可触发：

| 属性 | 值 |
|------|----|
| `overflow` | `hidden` / `auto` / `scroll`（非 visible） |
| `display` | `inline-block` / `table-cell` / `flex` / `grid` |
| `position` | `absolute` / `fixed` |
| `float` | `left` / `right`（非 none） |

---

## BFC 的特性与应用

### 1. 清除浮动（解决高度塌陷）

子元素浮动后父元素高度为 0，给父元素触发 BFC 即可包裹浮动子元素。

```css
.parent { overflow: hidden; }
```

### 2. 阻止外边距重叠

同一个 BFC 内的相邻块元素垂直外边距会合并；将其中一个放入新的 BFC 容器，可阻止合并。

```css
/* 用包裹元素触发新 BFC，阻止 margin 折叠 */
.wrap { overflow: hidden; }
```

### 3. 阻止浮动元素覆盖（自适应布局）

BFC 区域不会与浮动元素重叠，常用于实现两栏自适应布局。

```css
.left  { float: left; width: 200px; }
.right { overflow: hidden; } /* 触发 BFC，自动避开左侧浮动 */
```

---

## 总结

| 问题 | BFC 解法 |
|------|---------|
| 浮动导致父元素高度塌陷 | 父元素触发 BFC |
| 相邻元素外边距合并 | 其中一个元素触发 BFC |
| 两栏布局右侧被浮动覆盖 | 右侧元素触发 BFC |
| 子元素 margin-top 穿透父元素 | 父元素触发 BFC |

> 理解 BFC 是理解浮动、定位、外边距重叠等问题的根本。
