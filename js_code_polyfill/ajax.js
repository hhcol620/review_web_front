// ajax 请求
const getJson = function (url) {
    return new Promise((resolve, reject) => {
        // 在这里面写ajax 请求的主要代码
        const xhr = XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject('Mscrosoft.XMLHtttp');
        xhr.open('GET', url, false); // 第三个参数表示是否异步发出请求
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200 || xhr.status === 304) {
                resolve(xhr.reponseText);
            } else {
                reject(new Error(xhr.reponseText));
            }
        };
        xhr.send();
    });
};

const getJson = function (url) {
    return new Promise((resolve, reject) => {
        const xhr = XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject('Mscrosoft.XMLHtttp');
        xhr.open('GET', url, false); // 第三个参数表示是否发出的是异步请求
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status == 200 || xhr.status == 304) {
                resolve(xhr.reponseText);
            } else {
                reject(new Error(xhr.reponseText));
            }
        };
    });
};

const getJson = function (url) {
    return new Promise((resolve, reject) => {
        const xhr = XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject('Mscrosoft.XMLHtttp');
        xhr.open('GET', url, false); // 第三个参数  表示是否为异步请求
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function () {};
    });
};
