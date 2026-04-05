# display / visibility / opacity 区别

三者都可以让元素"看不见"，但原理和影响完全不同。

---

## 对比表

| 特性 | `display: none` | `visibility: hidden` | `opacity: 0` |
|------|----------------|---------------------|--------------|
| 是否占据空间 | ❌ 不占 | ✅ 占 | ✅ 占 |
| 是否触发回流 | ✅ 触发 | ❌ 不触发（只重绘） | ❌ 不触发（只合成） |
| 子元素是否可见 | ❌ 不可见 | 可设置 `visibility: visible` 显示子元素 | ❌ 不可见（透明度继承） |
| 是否响应事件 | ❌ 不响应 | ❌ 不响应 | ✅ 仍然响应 |
| 是否可以做过渡动画 | ❌ 不支持 | ✅ 支持（0/1切换） | ✅ 支持（0~1渐变） |
| 是否被读屏器读取 | ❌ 不读 | ❌ 不读 | ✅ 会读 |

---

## 各自适用场景

### `display: none`
- 彻底隐藏元素，不占位置。
- 适合：折叠面板、tab 切换、条件渲染。

```css
.hidden { display: none; }
```

### `visibility: hidden`
- 隐藏元素但保留占位，不影响布局。
- 子元素可以单独设为 `visible` 来显示。
- 适合：需要保持布局稳定的场景。

```css
.hidden { visibility: hidden; }
/* 子元素可见 */
.hidden .child { visibility: visible; }
```

### `opacity: 0`
- 透明但仍存在，可以接收点击/鼠标事件。
- 适合：淡入淡出动画过渡效果。

```css
.fade-out {
  opacity: 0;
  transition: opacity 0.3s;
}
```

---

## 常见面试追问

**Q：`display:none` 和 `visibility:hidden` 哪个性能更好？**

`visibility: hidden` 性能更好，因为只触发重绘，不触发回流；`display: none` 会触发回流，代价更高。

**Q：如何实现元素淡出后不占空间？**

`opacity` 和 `display` 配合使用，但无法直接过渡 `display`，可用以下方案：

```css
/* 方案：先 opacity 过渡，动画结束后再 display:none */
.hide {
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}
/* 或使用 visibility + opacity 组合 */
.hide {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
}
```

---

## 深入：为什么 visibility + opacity 能先执行 opacity 再执行 visibility？

`visibility` 的过渡行为和数值类属性（如 `opacity`）**完全不同**：

- `opacity` 是连续值（0 ~ 1），可以平滑过渡。
- `visibility` 只有两个状态（`visible` / `hidden`），**无法平滑过渡，只能瞬间切换**。

但 CSS 规范对 `visibility` 的过渡做了特殊规定：

| 方向 | visibility 的行为 |
|------|-----------------|
| 显示（hidden → visible） | **立即**变为 `visible`（在过渡开始时） |
| 隐藏（visible → hidden） | **保持 `visible` 直到过渡结束**，最后一帧才切换为 `hidden` |

所以配合 `opacity` 使用时的时间线是：

**淡出（显示 → 隐藏）：**
```
t=0                    t=0.3s
opacity:    1  ──────────────►  0     （平滑渐变）
visibility: visible ──────────► hidden（最后一刻才切换）
```
视觉上 opacity 先渐渐变透明，动画结束后 visibility 才变 hidden，元素不再响应事件。

**淡入（隐藏 → 显示）：**
```
t=0                    t=0.3s
opacity:    0  ──────────────►  1     （平滑渐变）
visibility: hidden►visible            （第一帧立即变为 visible）
```
visibility 在动画开始时就立即变回 visible，opacity 渐变过程中元素已经可见可交互。

**完整示例：**

```css
.box {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s, visibility 0.3s;
}
/* 隐藏：opacity 渐变到 0，visibility 最后才切换 → 淡出动画 ✅ */
.box.hide {
  opacity: 0;
  visibility: hidden;
}
```

**为什么不直接用 `opacity: 0`？**

`opacity: 0` 只是视觉透明，元素**仍占据空间且响应鼠标事件**（会拦截点击）。
加上 `visibility: hidden`，动画结束时元素才真正"失效"，不再拦截事件。
