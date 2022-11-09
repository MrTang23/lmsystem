<template>
    <div class="basic">
        <div class="title">添 加 成 员</div>
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
        <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="150px"
            class="demo-ruleForm"
            style="width: 60%"
        >
            <el-form-item prop="username">
                <span slot="label">
                    <span style="color: black">添加用户姓名：</span>
                </span>

                <el-input
                    type="text"
                    v-model="ruleForm.username"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span slot="label">
                    <span style="color: black">设置密码：</span>
                </span>
                <el-input
                    type="password"
                    v-model="ruleForm.password"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item prop="roleId">
                <span slot="label">
                    <span style="color: black">请选择身份：</span>
                </span>
                <el-select
                    v-model="ruleForm.roleId"
                    placeholder="管理员/普通成员"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                    >添加</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        //光标离开后的提示
        var validatePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请预设密码"));
            } else {
                callback();
            }
        };
        var validateUsername = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入添加成员的姓名"));
            } else {
                callback();
            }
        };
        var validateRoleId = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入该成员的身份"));
            } else {
                callback();
            }
        };

        return {
            options: [
                {
                    value: "1",
                    label: "管理员",
                },
                {
                    value: "2",
                    label: "普通成员",
                },
            ],
            value: "",

            //表单数据
            ruleForm: {
                username: "",
                password: "",
                roleId: "",
                //checkMe:false
            },

            //表单验证数据
            rules: {
                password: [{ validator: validatePassword, trigger: "blur" }], //验证密码
                username: [{ validator: validateUsername, trigger: "blur" }], //trigger: 'blur'表示失去光标时触发
                roleId: [{ validator: validateRoleId, trigger: "blur" }], //trigger: 'blur'表示失去光标时触发
            },
        };
    },
    methods: {
        //表单提交方法
        submitForm(formName) {
            if (this.ruleForm.roleId == "管理员") {
                this.ruleForm.roleId = 1;
            }
            if (this.ruleForm.roleId == "普通成员") {
                this.ruleForm.roleId = 2;
            }
            this.$refs[formName].validate(async (valid) => {
                //判断表单数据是否验证成功
                if (valid) {
                    //添加用户请求
                    let { code, msg } = await this.$get(
                        "/user/add",
                        this.ruleForm
                    );
                    //console.log(message)

                    if (code) {
                        this.$message.success("您已成功添加该用户！");

                        //跳转到后台管理

                        this.$router.push("/layout/role");
                    } else {
                        this.$message.error("添加失败，管理员不得超过三个");
                    }
                } else {
                    this.$message.error("添加失败，请检查输入内容或网络状况");
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
.basic {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    .title {
        font-size: 50px;
    }
}
</style>