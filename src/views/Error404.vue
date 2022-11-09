<template>
    <div class="errorName">
        <br /><br /><br />
        <h1>南京工业大学</h1>
        <br />
        <h1>实验室安全管理平台</h1>
        <br />
        <h1>您所访问的页面不存在</h1>
        <br />
        <hr />
        <br />
        <div class="error">
            <img src="../../public/img/404/404.png" alt="" />
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.errorName {
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    .error {
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        white-space: pre-wrap; //只对中文起作用，强制换行
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
}
</style>