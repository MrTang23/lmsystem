import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//路由信息数组
const routes = [
    //首页
    {
        path: '/',
        component: () => import('../views/index.vue')
    },
    //登陆页
    {
        path: '/login',
        component: () => import('../views/logIn.vue')
        //eslint强制检测是否驼峰命名，vue.config.js已经写了lintOnSave:false，不知道为什么无效
        //vue.config.js中配置路径别名后无法使用
    },
    //后台管理布局页
    {
        path: '/layout',
        component: () => import('../views/layOut.vue'),
        //配置嵌套路由
        children: [
            {//角色管理
                path: 'role',
                component: () => import('../views/role/roleList.vue')
            },
            {//角色管理
                path: 'addMember',
                component: () => import('../views/role/addMember.vue')
            },
            {//新增药品
                path: 'chemicalAdd',
                component: () => import('../views/chemicalType/chemicalAdd.vue')
            },
            {//物品柜
                path: 'chemicalList',
                component: () => import('../views/chemicalType/chemicalList.vue')
            },
            {//实验平台管理
                path: 'platformManagement',
                component:()=>import('../views/chemicalType/platformManage.vue')
            },
            {//修改个人信息
                path:'personal',
                component:()=>import('../views/console/personalInformation.vue')
            },
            {//修改个人信息
                path:'myTeam',
                component:()=>import('../views/console/myTeam.vue')
            },
            {//修改个人信息
                path:'platform',
                component:()=>import('../views/console/platform.vue')
            },
            {//药品借出
                path:'borrowChemical',
                component:()=>import('../views/chemicalType/borrowChemical/borrowChemical.vue')
            },
            {//药品借用审批页面
                path:'chemicalApprove',
                component:()=>import('../views/message/borrowMessage.vue')
            },
        ]
    },
    {
        //*表示其他任意地址
        path: '*',
        component: () => import('../views/Error404.vue')
    }

]


//创建路由对象
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//导出路由对象
export default router
