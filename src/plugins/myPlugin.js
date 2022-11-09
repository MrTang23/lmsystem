//参考https://v2.cn.vuejs.org/v2/guide/plugins.html#开发插件
import { get, post, setToken } from '../util/request.js'

//定义自己的插件
export default {
    //插件中必须包含一个install方法
    install: function (Vue) {
        Vue.mixin({
            //给vue混入成员
            methods: {
                //get,post请求方法
                $get(url, params) {
                    return get(url, params)
                },
                $post(url, params) {
                    return post(url, params)
                },
                $setToken() {
                    //执行该方法，就会将浏览器缓存里面的token信息保存到ajax的请求头
                    setToken()
                }
            },
        })
    }
}