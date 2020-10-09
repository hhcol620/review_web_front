/* 
    center区域高度必然大于left、right区域
    left、right区域溢出后与center区域共用同一滚动条
    当left、right区域内容溢出后，请实现以下功能：
    
    left、right区域跟随滚动条滚动到底部就固定住，center区域继续滚动
    滚动条向上滚动，当center区域滚动到和left、right相同高度时，left、right跟随滚动，滚动到顶部时，left、right同时到达顶部

*/

// window.innerHeight   视口高度
// dom.offsetTop 元素顶部距离视口顶部的距离
// dom.offsetLeft 元素左边距离视口左边的距离
