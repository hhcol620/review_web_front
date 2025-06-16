/**
 * 实现一个函数 find(obj, str)，满足:
   如var obj = {a:{b:{c:1}}};
   find(obj,'a.b.c') //返回1
   find(obj,'a.d.c') //返回undefined
 */

function find(obj, str) {
  const keyList = str.split('.');
  let res = obj;
  for (let i = 0; i < keyList.length; i++) {
    const key = keyList[i];
    const val = res[key];
    console.log('keyList', key, val);

    if (!val) {
      return undefined;
    } else {
      res = val;
    }
  }

  return res;
}

var obj = { a: { b: { c: 1 } } };
console.log(find(obj, 'a.b.c')); //返回1
console.log(find(obj, 'a.d.c')); //返回undefined

/**
 *
 *
 *
 */

function Modal(x, y) {
  this.x = x;
  this.y = y;
}
Modal.prototype.z = 10;
Modal.prototype.getX = function () {
  console.log(this.x);
};
Modal.prototype.getY = function () {
  console.log(this.y);
};
Modal.n = 200;
Modal.setNumber = function (n) {
  this.n = n;
};
let m = new Model(10, 20);

class Modal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getX() {
    console.log(this.x);
  }

  getY() {
    console.log(this.y);
  }

  static setNumber(n) {
    this.n = n;
  }

  static n = 200;
}

Modal.prototype.z = 10;



const obj = {
  a: 1,
  b: function () {
    return setTimeout(function () {
      console.log(this.a)
    })
  }
}


console.log(obj.a)


