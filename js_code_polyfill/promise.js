/**
 * promise
 * 使用的时候是 new Promise((resolve, reject) => {})
 * pro.then(onFulfilled, onRejected)
 */

const Status = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
};
class Promise {
  constructor(executor) {
    this.value = null;
    this.reason = null;
    this.status = Status.PENDING;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const _resolve = (value) => {
      const _run = () => {
        if (this.status === Status.PENDING) {
          this.status = Status.FULFILLED;
          this.value = value;
          this.onFulfilledCallbacks.forEach((fn) => fn());
        }
      };

      setTimeout(_run);
    };

    const _reject = (value) => {
      const _run = () => {
        if (this.status === Status.PENDING) {
          this.status = Status.REJECTED;
          this.reason = value;
          this.onRejectedCallbacks.forEach((fn) => fn());
        }
      };

      setTimeout(_run);
    };

    try {
      executor(_resolve, _reject);
    } catch (e) {
      _reject(e);
    }
  }

  //
  then(onFulfilled, onRejected) {
    // 这两个参数是否为函数 如果不是函数则包装成函数
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const self = this;

    // 返回一个promise 实现链式调用
    return new Promise((resolve, reject) => {
      const execFulfilledFn = () => {
        try {
          const x = onFulfilled(self.value);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          } else {
            resolve(x);
          }
        } catch (err) {
          reject(err);
        }
      };

      const execRejectedFn = () => {
        try {
          const x = onRejected(self.reason);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          } else {
            resolve(x);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (self.status === Status.FULFILLED) {
        execFulfilledFn();
      }

      if (self.status === Status.REJECTED) {
        execRejectedFn();
      }

      if (self.status === Status.PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    if (value instanceof Promise) {
      return value;
    }
    return new Promise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new Promise((_, reject) => reject(reason));
  }

  static all(promises) {
    const result = [];
    let count = 0;
    return new Promise((resolve, reject) => {
      promises.forEach((pro, idx) => {
        pro.then((res) => {
          count++;
          result[idx] = res;

          if(count === promises.length) {
            resolve(result);
          }
        }).catch((err) => reject(err));
      })
    })
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((pro) => {
        Promise.resolve(pro).then(resolve).catch(reject);
      })
    })
  }
}


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
