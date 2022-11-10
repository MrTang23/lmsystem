<template>
    <div class="main">
        <!--背景画布，参考https://www.17sucai.com/pins/34850.html-->
        <canvas id="particle-canvas" width="" height="1000"></canvas>
        <div class="content">
            <div class="login">
                <div class="title">南京工业大学</div>
                <div class="title">实验室安全管理系统</div>
                <el-form
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    label-width="40px"
                    class="demo-ruleForm"
                >
                    <el-form-item prop="username">
                        <span slot="label">
                            <span style="color: white">学号</span>
                        </span>

                        <el-input
                            type="text"
                            v-model="ruleForm.username"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <span slot="label">
                            <span style="color: white">密码</span>
                        </span>
                        <el-input
                            type="password"
                            v-model="ruleForm.password"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="checkMe">
                        <el-checkbox
                            v-model="checkMeRule.checkMe"
                            style="color: white"
                            >记住我</el-checkbox
                        >
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm('ruleForm')"
                            >登陆</el-button
                        >
                        <el-button @click="resetForm('ruleForm')"
                            >重置</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { start } from "../assets/js/login";
export default {
    mounted() {
        //DOM加载完毕
        start();
    },
    data() {
        //光标离开后的提示
        var validatePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                callback();
            }
        };
        var validateUsername = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入您的学号"));
            } else {
                callback();
            }
        };

        return {
            //表单数据
            ruleForm: {
                username: "",
                password: "",
                //checkMe:false
            },
            checkMeRule: {
                checkMe: false,
            },
            //表单验证数据
            rules: {
                password: [{ validator: validatePassword, trigger: "blur" }], //验证密码
                username: [{ validator: validateUsername, trigger: "blur" }], //trigger: 'blur'表示失去光标时触发
            },
        };
    },
    methods: {
        //表单提交方法
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                //判断表单数据是否验证成功
                if (valid) {
                    //实现登陆
                    let { code, data } = await this.$post(
                        "/login",
                        this.ruleForm
                    );
                    //console.log(message)
                    //判断是否登录成功
                    if ((code, data)) {
                        this.$message.success(
                            "欢迎登陆南京工业大学实验室安全管理系统"
                        );
                        //服务器返回登录token令牌（保存个人信息）
                        //保存在浏览器缓存空间
                        localStorage.setItem(
                            "user_token",
                            data.tokenValue
                        );
                        //在浏览器中保存登录名
                        localStorage.setItem(
                            "username",
                            this.ruleForm.username
                        );
                        if (this.checkMeRule.checkMe) {
                            localStorage.setItem(
                                "password",
                                this.ruleForm.password
                            );
                        }
                        //将token信息放到请求头中
                        this.$setToken();
                        //跳转到后台管理

                        this.$router.push("/layout");
                    } else {
                        this.$message.error("账号或密码错误");
                    }
                } else {
                    this.$message.error("请求超时，请检查网络设置");
                    return false;
                }
            });
        },
        //表单重置方法
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};
</script>
<style scoped lang='scss'>
.main {
    width: 100vw;
    height: 100vh;
    position: relative;

    .content {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        .login {
            width: 400px;
            height: 350px;
            border: 1px solid #ccc;
            padding: 40px;
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(5px);
            .title {
                font-size: 30px;
                color: white;
                text-align: center;
                margin-bottom: 30px;
            }
        }
    }
}

//背景画布样式
#particle-canvas {
    width: 100%;
    height: 100vh;
    background: linear-gradient(
        to bottom,
        rgb(10, 10, 50) 0%,
        rgb(60, 10, 60) 100%
    );
    vertical-align: middle;
}
</style>