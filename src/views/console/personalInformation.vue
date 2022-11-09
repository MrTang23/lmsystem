<template>
    <div class="basic">
        <div class="title">我 的 信 息</div>
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form :model="passwordForm">
                <el-form-item label="旧密码" :label-width="formLabelWidth">
                    <el-input
                        type="text"
                        v-model="passwordForm.oldPassword"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input
                        type="text"
                        v-model="passwordForm.newPassword"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changePw('passwordForm')"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="150px"
            class="demo-ruleForm"
            style="width: 60%"
        >
            <el-form-item prop="name">
                <span slot="label">
                    <span style="color: black">设置用户姓名：</span>
                </span>

                <el-input
                    type="text"
                    v-model="ruleForm.name"
                    autocomplete="off"
                ></el-input>
            </el-form-item>

            <el-form-item prop="phoneNumber">
                <span slot="label">
                    <span style="color: black">联系方式：</span>
                </span>
                <el-input
                    type="text"
                    v-model="ruleForm.phoneNumber"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item prop="email">
                <span slot="label">
                    <span style="color: black">添加邮箱：</span>
                </span>
                <el-input
                    type="text"
                    v-model="ruleForm.email"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item prop="team">
                <span slot="label">
                    <span style="color: black">添加团队名称：</span>
                </span>
                <el-input
                    type="text"
                    v-model="ruleForm.team"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                    >添加</el-button
                >
                <el-button type="warning" @click="openChangePw()"
                    >修改密码</el-button
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
                callback(new Error("请设置密码"));
            } else {
                callback();
            }
        };
        var validatePhoneNumber = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请填写联系方式"));
            } else {
                callback();
            }
        };
        var validateTeam = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入团队名称"));
            } else {
                callback();
            }
        };
        var validateName = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请填写姓名"));
            } else {
                callback();
            }
        };
        var validateEmail = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入邮箱"));
            } else {
                callback();
            }
        };

        return {
            formLabelWidth: "120px",
            dialogFormVisible: false,
            value: "",
            passwordForm: {
                oldPassword: "",
                newPassword: "",
            },
            //表单数据
            ruleForm: {
                name: "",
                phoneNumber: "",
                team: "",
                email: "",
            },

            //表单验证数据
            rules: {
                oldPassword: [{ validator: validatePassword, trigger: "blur" }], //验证密码
                newPassword: [{ validator: validatePassword, trigger: "blur" }],
                phoneNumber: [
                    { validator: validatePhoneNumber, trigger: "blur" },
                ], //联系方式
                name: [{ validator: validateName, trigger: "blur" }], //trigger: 'blur'表示失去光标时触发
                email: [{ validator: validateEmail, trigger: "blur" }], //trigger: 'blur'表示失去光标时触发
                team: [{ validator: validateTeam, trigger: "blur" }],
            },
        };
    },
    methods: {
        //表单提交方法
        openChangePw() {
            this.dialogFormVisible = true;
        },
        async changePw(passwordForm) {
            let { code } = await this.$post(
                "/member/changepw",
                this.passwordForm
            );
            if (code) {
                this.$message.success("您已成功修改密码！");
                this.$router.push("/login");
            } else {
                this.$message.error("密码修改失败");
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                //判断表单数据是否验证成功
                if (valid) {
                    //添加用户请求
                    let { code } = await this.$post(
                        "/member/update",
                        this.ruleForm
                    );
                    if (code) {
                        this.$message.success("您已成功修改个人信息！");

                        //跳转到后台管理

                        this.$router.push("/login");
                    } else {
                        this.$message.error(msg);
                    }
                } else {
                    this.$message.error("修改失败");
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