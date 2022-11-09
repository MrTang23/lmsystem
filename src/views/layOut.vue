<template>
    <div class="main">
        <!--左侧导航栏-->
        <div
            class="left"
            :style="{
                backgroundColor: themeColor,
                width: !isCollapse ? '200px' : 'auto',
            }"
        >
            <div
                class="logo"
                :style="{ fontSize: !isCollapse ? '15px' : '0.1px' }"
                id="logo"
            >
                LabReview
            </div>
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :background-color="themeColor"
                text-color="#fff"
                active-text-color="#ffd04b"
                :collapse="isCollapse"
                router
            >
                <el-submenu index="0">
                    <template slot="title">
                        <i class="el-icon-s-platform"></i>
                        <span>操作台</span>
                    </template>
                    <el-menu-item index="/layout/personal"
                        >我的信息</el-menu-item
                    >
                    <el-menu-item index="/layout/myTeam">我的团队</el-menu-item>
                    <el-menu-item index="/layout/platform"
                        >实验平台预约</el-menu-item
                    >
                </el-submenu>

                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-s-home"></i>
                        <span>物视镜</span>
                    </template>
                    <el-menu-item index="/layout/chemicalAdd"
                        >入库管理</el-menu-item
                    >
                    <el-menu-item index="/layout/platformManagement"
                        >实验平台管理</el-menu-item
                    >
                    <el-menu-item index="/layout/chemicalList"
                        >我的物品柜</el-menu-item
                    >
                    <el-menu-item index="/layout/borrowChemical"
                        >借出管理</el-menu-item
                    >
                </el-submenu>

                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-s-tools"></i>
                        <span>系统配置</span>
                    </template>
                    <el-menu-item index="/layout/role">成员管理</el-menu-item>
                    <el-menu-item index="/layout/addMember"
                        >添加成员</el-menu-item
                    >
                </el-submenu>
            </el-menu>
        </div>
        <!--右侧导航栏-->
        <div class="right">
            <div class="nav" :style="{ backgroundColor: themeColor }">
                <div class="icon" @click="isCollapse = !isCollapse">
                    <i
                        :class="
                            !isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'
                        "
                    ></i>
                </div>
                <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    :background-color="themeColor"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                >
                    <el-menu-item index="1"
                        ><i class="el-icon-s-home"></i>首页</el-menu-item
                    >
                    <el-menu-item @click="messagePage" index="2"
                        ><i class="el-icon-message-solid"></i>消息</el-menu-item
                    >
                    <el-submenu>
                        <template slot="title"
                            ><i class="el-icon-s-open"></i>主题</template
                        >
                        <el-menu-item
                            @click="changeTheme(item.value)"
                            v-for="(item, index) in theme"
                            :key="index"
                            >{{ item.name }}</el-menu-item
                        >
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"
                            ><i class="el-icon-s-tools"></i>设置</template
                        >
                        <el-menu-item index="5-1">个人中心</el-menu-item>
                        <el-menu-item index="5-2">修改密码</el-menu-item>
                        <el-menu-item index="5-3" @click="exit"
                            >退出登录</el-menu-item
                        >
                    </el-submenu>
                </el-menu>
            </div>
            <div class="content">
                <!--路由试图-->
                <router-view> </router-view>
            </div>
        </div>
    </div>
</template>

<script>
//导入vuex的映射函数
import { mapState } from "vuex";

export default {
    data() {
        return {
            activeIndex2: "1",
            themeColor: localStorage.getItem("theme") || "#101f30",
            //是否折叠左侧菜单
            isCollapse: false,
        };
    },
    computed: {
        ...mapState("theme", ["theme"]),
    },
    methods: {
        messagePage() {
            this.$router.push("/layout/chemicalApprove");
            console.log(1);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        //切换主题
        changeTheme(color) {
            this.themeColor = color;
            localStorage.setItem("theme", color);
        },

        //推出
        exit() {
            //sessionStorage.removeItem('token')
            //localStorage.removeItem('token')
            let satoken = localStorage.getItem("user_token");
            this.$get("/logout", { satoken });
            sessionStorage.clear();
            localStorage.clear();
            this.$router.push("/login");
        },
    },
};
</script>

<style lang="scss" scoped>
.main {
    width: 100vw;
    height: 100vh;
    display: flex;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    .left {
        //width: 200px;
        //background-color: #fff;
        .logo {
            width: 90%;
            color: white;
            //font-size: 18px;
            text-align: center;
            padding: 10px 0;
            border: 1px solid white;
            margin: 10px auto;
        }
    }
    .right {
        flex: 1;
        .nav {
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            //background-color: #101f30;
            .icon {
                padding-left: 10px;
                i {
                    color: white;
                    font-size: 25px;
                }
            }
        }
        .content {
            padding: 10px;
        }
    }
}
</style>