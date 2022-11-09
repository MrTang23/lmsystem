import Vue from 'vue'
import App from './App.vue'
import router from './router'//导入路由
import store from './store'//导入状态管理

import './plugins'//倒入插件

Vue.config.productionTip = false




new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
