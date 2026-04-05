# CSS 居中方案汇总

## 水平居中

### 行内元素 / 文字

```css
.parent { text-align: center; }
```

### 块级元素（已知宽度）

```css
.child {
  width: 200px;
  margin: 0 auto;
}
```

### Flex

```css
.parent { display: flex; justify-content: center; }
```

---

## 垂直居中

### 单行文字

```css
.parent {
  height: 50px;
  line-height: 50px; /* 等于高度 */
}
```

### Flex

```css
.parent { display: flex; align-items: center; }
```

### 绝对定位 + transform（不需要知道子元素尺寸）

```css
.parent { position: relative; }
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

### 绝对定位 + 负 margin（需要知道子元素尺寸）

```css
.parent { position: relative; }
.child {
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px; /* 高度的一半 */
}
```

---

## 水平垂直居中

### 方案一：Flex（推荐）

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 方案二：绝对定位 + transform

```css
.parent { position: relative; }
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### 方案三：绝对定位 + margin auto（子元素需有宽高）

```css
.parent { position: relative; }
.child {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  width: 100px;
  height: 100px;
  margin: auto;
}
```

### 方案四：Grid

```css
.parent {
  display: grid;
  place-items: center; /* align-items + justify-items 的简写 */
}
```

### 方案五：table-cell（兼容旧浏览器）

```css
.parent {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.child { display: inline-block; }
```

---

## 对比

| 方案 | 是否需要知道子元素尺寸 | 推荐度 |
|------|----------------------|--------|
| Flex | 否 | ✅ 首选 |
| 绝对定位 + transform | 否 | ✅ 常用 |
| 绝对定位 + margin auto | 需要 | 可用 |
| Grid place-items | 否 | ✅ 简洁 |
| line-height | 仅单行文字 | 有限场景 |
