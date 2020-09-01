#### location

window.location 对象用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面。

- location.href 返回当前页面的url
- location.hostname 返回 web 主机的域名
- location.pathname 返回当前页面的路径和文件名
- location.port 返回 web 主机的端口 （80 或 443）
- location.protocol 返回所使用的 web 协议（http: 或 https:）

window.location.assign(url) ： 加载 URL 指定的新的 HTML 文档。 就相当于一个链接，跳转到指定的url，当前页面会转为新页面内容，可以点击后退返回上一个页面。

window.location.replace(url) ： 通过加载 URL 指定的文档来替换当前文档 ，这个方法是替换当前窗口页面，前后两个页面共用一个窗口，所以是没有后退返回上一页的

#### history

window.history 对象包含浏览器的历史

- history.back() - 与在浏览器点击后退按钮相同
- history.forward() - 与在浏览器中点击向前按钮相同
- history.go(index):index表示前进后退的步数，0表示刷新页面

#### navigator

window.navigator 对象包含有关访问者浏览器的信息