//  插入法排序
let arr = [1, 2, 4, 5, 7, 3, 0];

//  插入法排序  两个循环 从第二个数开始依次和前面的数字进行比较   当前面的数字比后面的大的时候进行 循环 交换两个数字,这样的话一旦出现前面的数字比后面的数字小的情况就是这个前面的数字之前的位置都是排好序的(升序)
let len = arr.length;
for (let i = 1; i < len; i++) {
    for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
        swap(arr, j, j + 1);
    }
}
function swap(arr, i, j) {
    let tmp;
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

console.log(arr);
