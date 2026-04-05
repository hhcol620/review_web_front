# CSS 继承

## 概念

子元素可以从父元素（及祖先元素）继承某些 CSS 属性值，无需重复声明。

## 哪些属性可以继承

只有以下开头的属性才能被继承：

| 前缀 | 示例 |
|------|------|
| `color` | `color` |
| `font-` | `font-size`、`font-family`、`font-weight` |
| `text-` | `text-align`、`text-indent`、`text-decoration` |
| `line-` | `line-height` |

> 其他属性（如 `width`、`height`、`margin`、`padding`、`border` 等）**不可继承**。

## 继承范围

不仅仅是直接子元素，**所有后代元素**都能继承。

## 特殊情况（继承失效）

- **`<a>` 标签**：文字颜色和下划线不继承，浏览器有默认样式覆盖。
- **`<h1>`~`<h6>` 标签**：字体大小不继承，浏览器默认样式优先级更高。

## 常见用途

通常在 `body` 上统一设置全局共性样式：

```css
body {
  color: #333;
  font-size: 16px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}
```
