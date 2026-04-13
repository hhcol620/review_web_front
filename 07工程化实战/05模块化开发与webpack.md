# Webpack vs Vite

## 核心区别：开发模式的构建方式

**Webpack**
```
所有模块 → bundle → 启动 dev server
（先打包，再服务）
```

**Vite**
```
启动 dev server → 按需编译（浏览器请求哪个文件才编译哪个）
（先服务，再按需）
```

这就是为什么 Vite 冷启动快得多——项目再大，启动时间也不会随之增长。

---

## 详细对比

| | Webpack | Vite |
|---|---|---|
| 开发启动速度 | 慢（全量打包） | 极快（按需编译） |
| 热更新 HMR | 重新打包受影响模块链 | 只更新变化的模块，毫秒级 |
| 生产构建 | 自己的打包器 | 底层用 Rollup |
| 开发模式原理 | Bundle-based | ESM Native（浏览器原生模块） |
| 配置复杂度 | 高，loader/plugin 体系复杂 | 低，开箱即用 |
| 生态 | 极其成熟，插件丰富 | 较新，生态追赶中 |
| 旧浏览器兼容 | 好（可编译到 ES5） | 需额外配置 `@vitejs/plugin-legacy` |
| 适合场景 | 大型复杂项目、高度定制需求 | 现代项目、追求开发体验 |

---

## 常见面试题

### Q1: Vite 为什么比 Webpack 快？

两个原因：
1. **利用浏览器原生 ESM**：开发时不打包，浏览器直接请求源文件，Vite 拦截请求按需编译
2. **预构建用 esbuild**：`node_modules` 里的依赖用 esbuild 预构建，esbuild 是 Go 写的，比 JS 快 10-100 倍

### Q2: Vite 生产构建为什么不用 esbuild 而用 Rollup？

esbuild 对代码分割（code splitting）和 CSS 处理的支持还不够成熟，Rollup 在生产构建上更稳定、tree-shaking 更彻底。

### Q3: Webpack 的 loader 和 plugin 区别？

- **loader**：转换文件内容，链式处理（`css-loader → style-loader`），作用于单个文件
- **plugin**：介入整个构建生命周期，能做 loader 做不到的事（压缩、注入 HTML、环境变量）

### Q4: Webpack 如何优化构建速度？

```
1. thread-loader     → 多线程编译
2. cache-loader      → 缓存编译结果
3. DllPlugin         → 预编译不变的第三方库
4. externals         → CDN 引入，不打进 bundle
5. babel 只转译业务代码，排除 node_modules
```

### Q5: Vite 开发和生产行为不一致怎么办？

这是 Vite 的已知痛点，开发用 ESM、生产用 Rollup，可能导致差异。排查方向：
- 检查是否有 CommonJS 模块在开发时被 esbuild 处理、生产时行为不同
- 用 `vite preview` 本地预览生产包复现问题

### Q6: Tree-shaking 的原理？

依赖 **ES Module 静态结构**（`import/export` 在编译时确定，不能动态改变），打包工具在分析阶段标记哪些 export 没有被引用，最终打包时删掉。CommonJS 的 `require` 是动态的，无法静态分析，所以不支持 tree-shaking。

### Q7: Webpack 构建流程是什么？

```
1. 读取 webpack.config.js 合并配置
2. 从 entry 入口开始，递归解析依赖，构建依赖图
3. 每个模块按 loader 规则转换
4. 将依赖图组装成 chunk
5. 输出到 output 目录
```

### Q8: source map 是什么？生产环境要开吗？如何用它排查线上问题？

将压缩混淆后的代码映射回源码，便于调试。
- 开发环境：`eval-cheap-module-source-map`（构建快）
- 生产环境：用 `hidden-source-map`（生成 .map 但不在 js 里引用，上传到监控平台，用户拿不到）

**三种模式对比：**

| 模式 | .map 文件 | js 末尾有引用注释 | 用户能访问 |
|---|---|---|---|
| `source-map` | ✅ 生成 | ✅ 有 | ✅ 能（不安全） |
| `hidden-source-map` | ✅ 生成 | ❌ 无 | ❌ 不能（推荐）|
| `nosources-source-map` | ✅ 生成 | ✅ 有 | 能访问但看不到源码内容 |

**Webpack 配置：**
```js
devtool: process.env.NODE_ENV === 'development'
  ? 'eval-cheap-module-source-map'
  : 'hidden-source-map'
```

**线上问题排查流程：**

推荐方案：接入错误监控平台（Sentry / 阿里 ARMS），构建时 .map 文件只上传平台不部署 CDN，平台自动用报错的行列号反解析出源码位置。

```
构建产物
  ├── main.js       → 部署到 CDN（用户能访问）
  └── main.js.map   → 只上传监控平台（用户访问不到）
```

手动排查（无监控平台时）可用 Chrome DevTools：
```
Sources 面板 → 找到压缩的 js 文件 → 右键 Add source map
→ 输入 .map 文件路径 → DevTools 自动还原源码，支持断点调试
```

### Q9: HMR 热更新原理？

```
1. webpack 监听文件变化，重新编译变化的模块
2. 通过 WebSocket 通知浏览器有更新
3. 浏览器拉取新的模块 chunk
4. 运行时替换旧模块，触发 module.hot.accept 回调
（页面不刷新，只替换变化部分）
```

### Q10: 代码分割（Code Splitting）有几种方式？

```js
// 1. 多入口：entry 配置多个
entry: { a: './a.js', b: './b.js' }

// 2. 动态导入：import() 语法，自动分割
const module = await import('./heavy-module')

// 3. SplitChunksPlugin：抽取公共依赖
optimization: {
  splitChunks: { chunks: 'all' }
}
```

### Q11: 懒加载原理？使用场景是什么？解决什么问题？

**原理：** `import()` 返回 Promise，Webpack 将其编译为独立 chunk，运行时动态创建 `<script>` 标签加载，加载完成后 resolve。Vue/React 的路由懒加载底层都是这个原理。

**解决的问题：** 不做懒加载时所有代码打进一个 bundle，用户打开首页却要下载全部页面的 JS（可能 5MB），懒加载把"现在不需要的代码"推迟到"真正需要时"再加载，减少首屏 JS 体积，加快白屏时间。

```
不用懒加载：首屏加载 5MB JS → 白屏 3s → 用户看到页面
用懒加载：  首屏加载 200KB  → 白屏 0.5s → 用户看到页面，后续按需加载
```

**常见使用场景：**

```js
// 1. 路由懒加载（最常用）
const Detail = React.lazy(() => import('./pages/Detail'))         // React
const Detail = defineAsyncComponent(() => import('./pages/Detail.vue')) // Vue

// 2. 条件渲染的重组件（弹窗、抽屉，用户点击才出现）
const HeavyModal = React.lazy(() => import('./HeavyModal'))

// 3. 大型第三方库（图表、富文本，不是首屏必须的）
button.addEventListener('click', async () => {
  const { default: ECharts } = await import('echarts')
})

// 4. 图片懒加载（滚动到视口才加载）
<img src="./photo.jpg" loading="lazy" />
```

### Q12: Webpack 如何优化产物体积？

```
1. Tree-shaking            → 删除未使用代码（需 ES Module）
2. splitChunks             → 公共依赖单独打包，利用浏览器缓存
3. externals + CDN         → 大库不打进 bundle
4. TerserPlugin            → JS 压缩
   CssMinimizerPlugin      → CSS 压缩
5. 图片：小图转 base64，大图用 file-loader
6. 按需引入                → antd/lodash 用 babel-plugin-import
```

### Q13: 模块联邦（Module Federation）是什么？

Webpack 5 新特性，允许多个独立构建的应用在运行时共享模块，是微前端的核心方案之一。

```js
// 应用A 暴露组件
exposes: { './Button': './src/Button' }

// 应用B 远程消费
remotes: { appA: 'appA@http://localhost:3001/remoteEntry.js' }
```

---

## Vite 专题面试题

### Q1: Vite 的依赖预构建做了什么？

```
1. 将 CommonJS 模块转为 ESM（浏览器不支持 CJS）
2. 将有大量内部模块的包合并成单文件
   （如 lodash-es 有 600+ 文件，合并后只需 1 次请求）
3. 结果缓存在 node_modules/.vite 目录
```

### Q2: Vite 的插件机制是什么？

Vite 插件兼容 Rollup 插件接口，额外扩展了一些 Vite 专属钩子：

```js
export default function myPlugin() {
  return {
    name: 'my-plugin',
    // Rollup 通用钩子
    transform(code, id) { ... },      // 转换模块内容
    resolveId(id) { ... },            // 解析模块路径
    // Vite 专属钩子
    configureServer(server) { ... },  // 操作开发服务器
    handleHotUpdate(ctx) { ... },     // 自定义 HMR 行为
  }
}
```

### Q3: Vite 如何处理 CSS？

```
- 原生支持 CSS Modules（文件名加 .module.css）
- 原生支持 PostCSS（项目有 postcss.config.js 自动读取）
- 原生支持 Less/Sass/Stylus（安装对应预处理器即可，无需配置 loader）
- CSS 代码分割：异步 chunk 对应的 CSS 自动单独打包
```

### Q4: Vite 中 import.meta.env 和 import.meta.hot 是什么？

```js
// import.meta.env：内置环境变量
import.meta.env.MODE     // 'development' | 'production'
import.meta.env.VITE_API // .env 文件中 VITE_ 前缀的变量

// import.meta.hot：HMR API
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // 模块更新时的处理逻辑
  })
}
```

### Q5: Vite 如何配置代理解决跨域？

```js
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

### Q6: Vite 生产构建如何做性能优化？

```js
// vite.config.js
build: {
  rollupOptions: {
    output: {
      // 手动分包：第三方库单独打包，利用长期缓存
      manualChunks: {
        vendor: ['vue', 'vue-router'],
        utils: ['lodash-es', 'axios']
      }
    }
  },
  // 小于此大小的资源内联为 base64
  assetsInlineLimit: 4096,
  // 启用 CSS 代码分割
  cssCodeSplit: true,
}
```

### Q7: Vite 和 Webpack 的 HMR 有什么不同？

| | Webpack HMR | Vite HMR |
|---|---|---|
| 更新粒度 | 重新编译整个模块链 | 只更新变化的单个模块 |
| 速度 | 项目越大越慢 | 始终毫秒级，与项目大小无关 |
| 原理 | 重新打包 chunk 推送 | 利用浏览器 ESM，直接请求新模块 |

---

## 选型建议

> 新项目用 **Vite**，需要兼容旧浏览器或高度定制构建流程用 **Webpack**。
