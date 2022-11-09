<template>
    <div>
        <div class="title">实 验 室 平 台 预 约</div>
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="实验名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="实验室名">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="实验室一" value="shanghai"></el-option>
                    <el-option label="实验室二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="实验时间">
                <el-col :span="11">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.date1"
                        style="width: 100%"
                    ></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker
                        placeholder="选择时间"
                        v-model="form.date2"
                        style="width: 100%"
                    ></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="立即开始">
                <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="实验性质">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="易燃易爆" name="type"></el-checkbox>
                    <el-checkbox
                        label="是否有人身安全"
                        name="type"
                    ></el-checkbox>
                    <el-checkbox label="气体泄漏" name="type"></el-checkbox>
                    <el-checkbox label="长时间" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="其他因素">
                <el-radio-group v-model="form.resource">
                    <el-radio label="线上"></el-radio>
                    <el-radio label="线下"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="实验形式">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

  <script>
export default {
    data() {
        return {
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
            },
        };
    },
    methods: {
        onSubmit() {
            console.log("submit!");
        },
    },
};
</script>
  <style lang="scss" scoped>
.title {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 50px;
}
</style>
