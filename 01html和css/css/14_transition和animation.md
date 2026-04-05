# transition 过渡 与 animation 动画

## transition 过渡

元素从一个状态**平滑过渡**到另一个状态，需要触发条件（如 hover、class 切换）。

### 语法

```css
transition: 属性 时长 时间函数 延迟;
```

```css
.box {
  width: 100px;
  transition: width 0.3s ease 0s;
}
.box:hover {
  width: 200px;
}
```

### 各属性说明

| 属性 | 说明 | 常用值 |
|------|------|--------|
| `transition-property` | 要过渡的属性 | `all`、`width`、`opacity` |
| `transition-duration` | 过渡时长 | `0.3s`、`300ms` |
| `transition-timing-function` | 时间曲线 | `ease`、`linear`、`ease-in`、`ease-out`、`cubic-bezier()` |
| `transition-delay` | 延迟开始 | `0s`、`0.2s` |

### 时间曲线对比

```
ease       → 慢-快-慢（默认）
linear     → 匀速
ease-in    → 慢-快（加速）
ease-out   → 快-慢（减速）
ease-in-out → 慢-快-慢（比 ease 更对称）
```

### 注意点

- `display` 属性无法过渡。
- 性能最佳的过渡属性：`transform`、`opacity`（只触发合成层）。

---

## transform 变换

常配合 transition/animation 使用，**不触发回流**，性能优。

```css
/* 位移 */
transform: translateX(50px);
transform: translateY(50px);
transform: translate(50px, 50px);

/* 缩放 */
transform: scaleX(1.5);
transform: scale(1.5, 2);

/* 旋转 */
transform: rotate(45deg);

/* 倾斜 */
transform: skewX(30deg);

/* 组合（从右往左执行） */
transform: translate(-50%, -50%) rotate(45deg) scale(1.2);
```

**transform-origin** — 设置变换基点（默认元素中心）：

```css
transform-origin: left top;    /* 左上角 */
transform-origin: 50% 50%;     /* 中心（默认） */
```

---

## animation 动画

比 transition 更强大，可以**自动执行**、**循环播放**、**精细控制每一帧**。

### 定义关键帧

```css
@keyframes slide-in {
  from { transform: translateX(-100%); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
}

/* 多帧 */
@keyframes bounce {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-30px); }
  100% { transform: translateY(0); }
}
```

### 使用动画

```css
animation: 名称 时长 时间函数 延迟 次数 方向 填充模式 状态;
```

```css
.box {
  animation: slide-in 0.5s ease-out 0s 1 normal forwards running;
}
```

### 各属性说明

| 属性 | 说明 | 常用值 |
|------|------|--------|
| `animation-name` | 关键帧名称 | 自定义名 |
| `animation-duration` | 单次时长 | `0.5s` |
| `animation-timing-function` | 时间曲线 | `ease`、`linear` |
| `animation-delay` | 延迟 | `0s` |
| `animation-iteration-count` | 重复次数 | `1`、`infinite` |
| `animation-direction` | 方向 | `normal`、`reverse`、`alternate`（来回） |
| `animation-fill-mode` | 结束后状态 | `none`、`forwards`（保持结束状态）、`backwards` |
| `animation-play-state` | 播放状态 | `running`、`paused` |

---

## transition vs animation 对比

| | transition | animation |
|--|------------|-----------|
| 触发方式 | 需要触发（hover/class） | 自动执行 |
| 关键帧控制 | 只有开始和结束 | 可定义任意帧 |
| 循环 | ❌ | ✅ `infinite` |
| 暂停/恢复 | ❌ | ✅ `play-state` |
| 适用场景 | 简单状态切换 | 复杂动画、循环动画 |
