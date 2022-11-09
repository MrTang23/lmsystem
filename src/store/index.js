import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import theme from './module/theme'//导入颜色主题数据模块

export default new Vuex.Store({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        theme
    }
})
