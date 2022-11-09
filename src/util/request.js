//导入nprogress加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//请求相关的方法

//初始化一个axios对象
import axios from 'axios'
var instance = axios.create({
    baseURL: 'http://121.41.92.155:8080',//接口地址根路径
    timeout: 20000
})


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    NProgress.start();
    return config;
}, function (error) {
    // 对请求错误做些什么
    NProgress.done();
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    NProgress.done();
    return response;
}, function (error) {
    // 对响应错误做点什么
    NProgress.done();
    return Promise.reject(error);
});

//创建一个get/post请求方法
let get = async function (url, params) {
    let { data } = await instance.get(url, { params });//异步方法
    return data//数据返回成一个整体
}
let post = async function (url, params) {
    let { data } = await instance.post(url, params);
    return data
}

//创建一个将信息保存到请求头的方法
let setToken = function () {
    instance.defaults.headers.common['satoken'] = localStorage.getItem('user_token');
}



//导出get和post方法
export {
    get,
    post,
    setToken
}