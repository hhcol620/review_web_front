// 选择法排序

function selsetSort(arr) {
    var len = arr.length;
    var index;
    for (var i = 0; i < len - 1; i++) {
        index = i; // 假设这个位置就是最小值的下标
        for (var j = i + 1; j < len; j++) {
            if (arr[index] > arr[j]) {
                //寻找最小值
                index = j; //保存最小值的索引
            }
        }
        if (index != i) {
            var temp = arr[i];
            arr[i] = arr[index];
            arr[index] = temp;
        }
    }
    return arr;
}

let arr = [1, 2, 4, 5, 7, 4, 3, 0];
console.log(selsetSort(arr));

function selectFunc(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let minIdx = i;
        for (let j = i; j < len; j++) {
            if (arr[minIdx] > arr[j]) {
                minIdx = j;
            }
            if (minIdx !== i) {
                let tmp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = tmp;
            }
        }
    }
    return arr;
}

console.log(selectFunc(arr));
