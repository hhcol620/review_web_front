/* 自定义promise   IIFE方式 */
;(function (window) {
  // Promise 构造函数
  // excutor  执行器函数(同步执行)
  function Promise(excutor) {
    // 将当前的promise对象保存起来
    const self = this
    // 属性
    self.status = 'pending' //  给promise对象指定的status属性,初始值为pending
    self.data = undefined //  给promise 对象指定一个用于存储结果数据的属性
    self.callbacks = [] //  每个元素的结构:{onResolved(){},onRejected(){}}
    function resolve(value) {
      // 如果当前的状态不是pending 直接结束
      if (self.status !== 'pending') {
        return
      }

      // 将状态改为  resolved
      self.status = 'resolved'
      // 保存value数据
      self.data = value
      // 如果有带执行的callback函数   立即异步执行回调函数  onResolved
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          //放入队列中执行所有成功的回调
          self.callbacks.forEach((callbacksObjs) => {
            callbacksObjs.onResolved(value)
          })
        })
      }
    }
    function reject(reason) {
      // 如果当前的状态不是pending 直接结束
      if (self.status !== 'pending') {
        return
      }
      // 将状态改为  rejected
      self.status = 'rejected'
      // 保存reason数据
      self.data = reason
      // 如果有带执行的callback函数   立即异步执行回调函数  onRejected
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          //放入队列中执行所有成功的回调
          self.callbacks.forEach((callbacksObjs) => {
            callbacksObjs.onRejected(reason)
          })
        })
      }
    }
    try {
      // 立即同步执行
      excutor(resolve, reject)
    } catch (error) {
      //  如果执行器抛出异常,promise对象变为rejected状态
      reject(error)
    }
  }

  /* 
    Promise 原型对象的then
    指定成功和失败的回调函数
    返回一个新的Promise对象
  
  */
  Promise.prototype.then = function (onResolved, onRejected) {
    const self = this
    // 假设状态还是pending
    self.callbacks.push({ onResolved, onRejected })
  }

  /* 
    Promise 原型对象的catch
    指定失败的回调函数
    返回一个新的Promise 对象
  
  */
  Promise.prototype.catch = function (onRejected) {
    const self = this
  }

  /* 
    Promise函数对象resolve 方法
    返回指定结果的成功的promise
  
  */

  Promise.resolve = function (value) {}
  /* 
    Promise函数对象reject  方法
    返回指定结果的失败的promise
  */
  Promise.reject = function (reason) {}
  /* 
    Promise函数对象 all  方法
    返回一个promise   只有当所有的promise都成功的时候才成功,否则只有一个失败的时候就失败
  */
  Promise.all = function (promises) {}
  /* 
    Promise函数对象 race  方法
    返回一个promise  其结果由第一个完成的promise决定
  */
  Promise.race = function (promises) {}
})(window)
