# TypeScript 工具类型 & infer

## 工具类型底层实现（面试常考手写）

```ts
// 1. Partial - 所有属性变可选
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// 2. Required - 所有属性变必选
type MyRequired<T> = {
  [K in keyof T]-?: T[K]; // -? 表示移除可选修饰符
};

// 3. Pick - 选取指定属性
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 4. Omit - 排除指定属性
type MyOmit<T, K extends keyof T> = MyPick<T, Exclude<keyof T, K>>;

// 5. ReturnType - 获取函数返回类型（这里就用到了 infer）
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;
```

type Partial<T> = {
[K in keyof T]?:T[K]
}

type Required<T> = {
[K in keyof T]-?: T[K]
}

type Pick<T, K extends keyof T> = {
[P in K]: T[P]
}

type Omit<T, K extends keyof T> = Pick<T, Excludes<keyof T, K>>

type ReturnType<T extends (...args: any) => any> T extends (...args: any) => infer R ? R : nerver

---

## infer 是什么

`infer` 只能用在**条件类型**（`extends ? :`）中，作用是：**在匹配时"捕获"某个位置的类型，赋给一个变量供后续使用**。

可以理解为条件类型里的"局部变量声明"。

```ts
// 没有 infer：只能判断，拿不到内部类型
type IsArray<T> = T extends Array<any> ? true : false;

// 有 infer：判断的同时，把内部类型"抠出来"
type GetArrayItem<T> = T extends Array<infer Item> ? Item : never;

type R = GetArrayItem<string[]>; // string
type R2 = GetArrayItem<number[]>; // number
```

---

## infer 常见使用场景

**获取函数参数类型：**

```ts
type MyParameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type F = (a: string, b: number) => void;
type P = MyParameters<F>; // [a: string, b: number]
```

**获取 Promise 的泛型：**

```ts
type UnwrapPromise<T> = T extends Promise<infer V> ? V : T;

type R = UnwrapPromise<Promise<string>>; // string
type R2 = UnwrapPromise<number>; // number（不是 Promise 原样返回）
```

**获取数组第一个元素类型：**

```ts
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;

type R = First<[string, number, boolean]>; // string
```

**递归展开嵌套 Promise：**

```ts
type DeepUnwrap<T> = T extends Promise<infer V> ? DeepUnwrap<V> : T;

type R = DeepUnwrap<Promise<Promise<string>>>; // string
```

---

## 一句话总结 infer

> `infer` = 在条件类型匹配时，**声明一个占位变量捕获未知类型**，让你能把"藏在泛型里"的类型提取出来使用。
