// 接雨水    //   未解出
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let leftIdx = (rightIdx = 0);
    let len = height.length;
    let result = 0;
    // 遍历一次 选出所有的驼峰数
    let listIdx = []; //  符合的下标
    height.forEach((item, index) => {
        if (hump(height, index)) {
            listIdx.push(index);
        }
    });

    console.log(listIdx);
    // 跟listIdx 对应的数组
    let hs = listIdx.map((item) => height[item]);

    for (let i = 0; i < listIdx.length; i++) {
        result += humpSum(height, listIdx[i], listIdx[i + 1]);
    }
    console.log(result);
};

// 判断是否为驼峰数   即 两边的数字大小比中间这个数字小
function hump(height, idx) {
    let len = height.length;
    if (idx === 0) {
        // 判断右侧是否比当前值小\
        return height[idx + 1] < height[idx];
    } else if (idx === len - 1) {
        // 判断左侧是否比当前值小
        return height[idx - 1] < height[idx];
    } else {
        return height[idx - 1] < height[idx] && height[idx + 1] < height[idx];
    }
}

// 计算两个波峰之间的雨水量
function humpSum(height, leftIdx, rightIdx) {
    let res = 0;
    let min = Math.min(height[leftIdx], height[rightIdx]);
    for (let i = leftIdx + 1; i < rightIdx; i++) {
        res += min - height[i];
    }
    return res;
}

let height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
trap(height);
