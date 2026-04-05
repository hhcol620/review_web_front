# CSS 盒模型

## 两种盒模型

| | W3C 标准盒模型 | IE 盒模型 |
|---|---|---|
| `box-sizing` 值 | `content-box`（默认） | `border-box` |
| `width`/`height` 包含范围 | 仅 content | content + padding + border |
| 实际占位宽度 | width + padding + border + margin | width + margin |

---

## W3C 标准盒模型（`content-box`）

```
┌─────────────────────────────┐  ← margin
│  ┌───────────────────────┐  │  ← border
│  │  ┌─────────────────┐  │  │  ← padding
│  │  │    content      │  │  │
│  │  │  width × height │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

设置 `width: 200px`，实际渲染宽度 = `200 + padding×2 + border×2`。

---

## IE 盒模型（`border-box`）

设置 `width: 200px`，padding 和 border 向内挤压，content 实际宽度缩小，总宽度始终是 200px。

```css
/* 推荐全局重置，方便布局计算 */
*, *::before, *::after {
  box-sizing: border-box;
}
```

---

## 外边距重叠（Margin Collapse）

**发生条件**：垂直方向上相邻的块级元素外边距会合并为两者中的**较大值**。

常见场景：
1. 相邻兄弟元素之间的上下 `margin`。
2. 父元素与第一个/最后一个子元素之间（子元素 `margin-top` 会"穿透"父元素）。

**解决父子外边距穿透：**

```css
/* 方案1：给父元素设置 border 或 padding */
.parent { padding-top: 1px; }

/* 方案2：触发 BFC */
.parent { overflow: hidden; }
```
