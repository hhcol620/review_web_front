/**
 *
 * 手写promise一波
 */

const PENDING = 'PENDING'; //  进行中
const FULFILLED = 'FULILLED'; // 已成功
const REJECTED = 'REJECTED'; //  已失败

class Promise {
    constructor(executor) {
        // 初始化状态
        this.status = PENDING;
        // 将成功失败结果放在this上,便于then catch 访问
        this.value = undefined;
        this.reason = undefined;
        // 成功态回调函数队列
        this.onFulfilledCallbacks = [];
        // 失败态回调函数队列
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            // 只有进行中的状态才能更改状态
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
            }
        };
        const reject = (reason) => {
            // 只有进行中状态才能更改状态
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                // 失败态函数一次执行
                this.onRejectedCallbacks.forEach((fn) => fn(this.reason));
            }
        };
        try {
            // 立即执行executor
            // 把内部的resolve和reject传入executor,用户可调用resolve 和reject
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled =
            typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : (reason) => {
                      throw new TypeError(
                          reason instanceof Error ? this.reason.message : reason
                      );
                  };
        const self = this;
        return new Promise((resolve, reject) => {
            if (self.status === PENDING) {
                self.onFulfilledCallbacks.push(() => {
                    // try...catch捕获错误
                    try {
                        // 模拟微任务
                        setTimeout(() => {
                            const result = onFulfilled(self.value);
                            // 分两种情况
                            // 1 回调函数返回值是promise 执行then操作
                            // 2 如果不是promise 调用promise的resolve
                            result instanceof Promise
                                ? result.then(resolve, reject)
                                : resolve(result);
                        });
                    } catch (e) {
                        reject(e);
                    }
                });
                self.onRejectedCallbacks.push(() => {
                    try {
                        setTimeout(() => {
                            const result = onRejected(self.reason);
                            result instanceof Promise
                                ? result.then(resolve, reject)
                                : reject(result);
                        });
                    } catch (e) {
                        reject(e);
                    }
                });
            } else if (self.status === FULFILLED) {
                try {
                    setTimeout(() => {
                        const result = onFulfilled(self.value);
                        result instanceof Promise
                            ? result.then(resolve, reject)
                            : resolve(result);
                    });
                } catch (e) {
                    reject(e);
                }
            } else if (self.status === REJECTED) {
                try {
                    setTimeout(() => {
                        const result = onRejected(self.reason);
                        result instanceof Promise
                            ? result.then(resolve, reject)
                            : reject(result);
                    });
                } catch (e) {
                    reject(e);
                }
            }
        });
    }
    catch(onRejected) {
        return this.then(null, onRejected);
    }
    static resolve(value) {
        if (value instanceof Promise) {
            // 如果是Prommise实例  直接返回
            return value;
        } else {
            // 如果不是promise实例  返回一个新的promise对象  状态为FULFILLED
            return new Promise((reslove, reject) => reslove(value));
        }
    }
    static reject(reason) {
        return new Promise((resolve, reject) => reject(reason));
    }
}

// Promise.all 是支持链式调用的 本质上就是返回一个Promise实例,通过resolve和reject来该表实例
Promise.myAll = function (promiseArr) {
    return new Promise((resolve, reject) => {
        const ans = [];
        let index = 0;
        for (let i = 0; i < promiseArr.length; i++) {
            // 每一个promise之间基本可以看作是异步执行 (同时开始)
            promiseArr[i]
                .then((res) => {
                    ans[i] = res; // 将返回的promise进行保存
                    index++;
                    if (index === promiseArr.length) {
                        resolve(ans);
                    }
                })
                .catch((err) => reject(err));
        }
    });
};

// Promise.race()
Promise.race = function (promiseArr) {
    return new Promise((resolve, reject) => {
        promiseArr.forEach((p) => {
            // 一旦有一个Promise已经resolve或者是reject那么就使用

            // 如果不是Promise实例需要转化为Promise实例
            Promise.resolve(p).then(
                (val) => resolve(val),
                (err) => reject(err)
            );
        });
    });
};

Promise.race = function (promiseArr) {
    return new Promise((resolve, reject) => {
        promiseArr.forEach((p) => {
            Promise.resolve(p).then(
                (val) => resolve(val),
                (err) => reject(err)
            );
        });
    });
};

// Promise并行限制  实现有并发限制的Promise调度器问题
/** 高频面试题 实现有并发限制的Promise调度器 */

class Scheduler {
    constructor() {
        this.queue = [];
        this.maxCount = 2;
        this.runCounts = 0;
    }
    add(promiseCreator) {
        this.queue.push(promiseCreator);
    }
    taskStart() {
        for (let i = 0; i < this.maxCount; i++) {
            this.request();
        }
    }
    request() {
        if (
            !this.queue ||
            !this.queue.length ||
            this.runCounts >= this.maxCount
        ) {
            return;
        }
        this.runCounts++;
        this.queue
            .shift()()
            .then(() => {
                this.runCounts--;
                this.request();
            });
    }
}

const timeout = (time) =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });

const scheduler = new Scheduler();

const addTask = (time, order) => {
    scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
scheduler.taskStart();
