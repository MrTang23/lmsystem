<template>
    <div></div>
</template>

<script>
export default {
    async created() {
        //从浏览器的缓存中获取登录名和密码
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        if (!username || !password) {
            //如果账号或者密码有一个没有值
            //跳转到登陆页
            this.$router.push("/login");
        } else {
            let { code, data } = await this.$post("/login", {
                username,
                password,
            });
            //判断是否登录成功
            if (code) {
                //保存token
                localStorage.setItem("user_token", data.tokenValue);
                //console.log(satoken)
                //将token信息放到请求头中
                this.$setToken();
                //跳转到后台管理
                this.$router.push("/layOut");
            } else {
                //跳转到登陆页
                this.$router.push("/login");
            }
        }
    },
};
</script>

<style lang="scss" scoped>
</style>