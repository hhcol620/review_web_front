/**
 * script 标签不遵循同源协议，可以用来进行跨域请求，有点就是兼容性好，但是仅限get请求
 */

//  首先是拼接url 将数据拼接到后面，将callback拼接到最后面，当响应的时候调用全局上的这个方法
// 这个方法也要在发起请求前给window绑定这个方法 获取其响应的参数
const jsonP = ({ url, params, callbackName }) => {
    // 拼接url
    const generateUrl = () => {
        let dataSrc = '';
        for (let key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                dataSrc += `${key}=${params[key]}&`;
            }
        }
        // 拼接callbackName
        dataSrc += `callback=${callbackName}&`;
        return `${url}?${dataSrc}`;
    };
    return new Promise((resolve, reject) => {
        // 请求是异步的  使用promise
        const scriptEle = document.createElement('script');
        scriptEle.src = generateUrl();
        // 定义事件需要在挂载之前  要不就有可能监听不到返回值
        window[callbackName] = (data) => {
            resolve(data);
            document.removeChild(scriptEle);
        };
        document.body.appendChild(scriptEle);
    });
};

// const jsonP = ({ url, params, callbackName }) => {
//     // 拼接url
//     const generateUrl = () => {
//         let dataSrc = '';
//         for (let key in params) {
//             if (Object.prototype.hasOwnProperty.call(params, key)) {
//                 dataSrc += `${key}=${params[key]}`;
//             }
//         }
//         // 拼接callbackName
//         dataSrc += `callback=${callbackName}`;
//         return `${url}?${dataSrc}`;
//     };
//     return new Promise((resolve, reject) => {
//         // 请求是异步的  使用promise
//         const scriptEle = document.createElement('script');
//         scriptEle.src = generateUrl();
//         // 定义事件需要在挂载之前
//         window[callbackName] = (data) => {
//             resolve(data);
//             document.removeChild(scriptEle);
//         };
//         document.body.appendChild(scriptEle);
//     });
// };
