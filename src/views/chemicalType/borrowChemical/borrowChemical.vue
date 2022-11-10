<template>
    <div class="basic">
        <div class="title">药 品 借 出</div>
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
        <el-form ref="form" :model="form" label-width="80px" style="width: 60%">
            <el-form-item label="实验名称">
                <el-input v-model="form.team"></el-input>
            </el-form-item>
            <el-form-item label="实验药品">
                <el-select
                    v-model="form.chemicalId"
                    filterable
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                label="预估质量"
                prop="quantity"
                :rules="[
                    { required: true, message: '质量不能为空' },
                    { type: 'number', message: '必须为数字值' },
                ]"
            >
                <el-input
                    placeholder="单位以物品柜内显示为准"
                    v-model.number="form.quantity"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="取药时间" class="block">
                <el-date-picker
                    v-model="form.valueDate"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="普通反应">
                <el-switch
                    v-model="reactionTypeDisabled"
                    :disabled="primaryDisabled"
                    active-color="#13ce66"
                ></el-switch>
            </el-form-item>
            <el-form-item label="特殊反应">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox-button
                        label="易燃类"
                        name="type"
                        :disabled="this.reactionTypeDisabled"
                    ></el-checkbox-button>
                    <el-checkbox-button
                        label="易爆类"
                        name="type"
                        :disabled="this.reactionTypeDisabled"
                    ></el-checkbox-button>
                    <el-checkbox-button
                        label="生成气体有毒类"
                        name="type"
                        :disabled="this.reactionTypeDisabled"
                    ></el-checkbox-button>
                    <el-checkbox-button
                        label="自燃类"
                        name="type"
                        :disabled="this.reactionTypeDisabled"
                    ></el-checkbox-button>
                    <el-checkbox-button
                        label="硝化类"
                        name="type"
                        :disabled="this.reactionTypeDisabled"
                    ></el-checkbox-button>
                    <el-checkbox-button
                        label="卤化类"
                        name="type"
                        :disabled="this.reactionTypeDisabled"
                    ></el-checkbox-button>
                    <el-checkbox-button
                        label="磺化类"
                        name="type"
                        :disabled="this.reactionTypeDisabled"
                    ></el-checkbox-button>
                    <el-checkbox-button
                        label="加氢类"
                        name="type"
                        :disabled="this.reactionTypeDisabled"
                    ></el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="备注">
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
            pickerOptions: {
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            picker.$emit("pick", new Date());
                        },
                    },
                    {
                        text: "昨天",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit("pick", date);
                        },
                    },
                    {
                        text: "一周前",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", date);
                        },
                    },
                ],
            },
            form: {
                //用户填写表单初始数据获取
                team: "",
                dateTime: "",
                delivery: false,
                type: [], //易燃,易爆
                valueDate: "", //获取时间值
                quantity: "",
                chemicalId: "",
            },

            submitBorrowForm: {
                //对初次获取的表单数据进行处理，格式统一
                chemicalId: "",
                quantity: "",
                reactionType: [],
                //burnType: "",
                //fireType: "",
                useTime: "",
                borrowType: "",
            },
            reactionTypeArr: [],
            options: [], //用户选择药品框的数据获取
            value: "", //绑定options
            reactionTypeDisabled: false, //打开普通反应开关后对特殊反应进行禁用
            primaryDisabled: this.reactionTypeDisabled ? true : false,
            pages: {
                page: 1,
                pageSize: 20,
            },
        };
    },
    created() {
        this.getAllChemical();
    },
    methods: {
        async onSubmit() {
            this.submitBorrowForm.chemicalId = this.form.chemicalId;
            this.submitBorrowForm.useTime = this.form.valueDate;
            this.submitBorrowForm.quantity = this.form.quantity;
            for (var item in this.form.type) {
                switch (this.form.type[item]) {
                    case "易燃类":
                        this.reactionTypeArr.push(1);
                        break;
                    case "易爆类":
                        this.reactionTypeArr.push(2);
                        break;
                    case "生成气体有毒类":
                        this.reactionTypeArr.push(3);
                        break;
                    case "自燃类":
                        this.reactionTypeArr.push(4);
                        break;
                    case "硝化类":
                        this.reactionTypeArr.push(5);
                        break;
                    case "卤化类":
                        this.reactionTypeArr.push(6);
                        break;
                    case "磺化类":
                        this.reactionTypeArr.push(7);
                        break;
                    case "加氢类":
                        this.reactionTypeArr.push(8);
                        break;
                }
            }

            this.submitBorrowForm.reactionType = this.reactionTypeArr.filter(
                (item, index, arr) => {
                    if (arr.indexOf(item) == index) {
                        return item;
                    }
                } //删除数组中重复元素
            );
            this.submitBorrowForm.reactionType =
                this.submitBorrowForm.reactionType.sort(); //排序
            let lastNumber = this.submitBorrowForm.reactionType.slice(-1); //获取最后一个值
            if (lastNumber == 9) {
                //删除函数默认删除0，补一个8，如果最后一位是8则在数组第一位补一个0同时删除8
                this.submitBorrowForm.reactionType.pop();
                this.submitBorrowForm.reactionType.unshift(0);
            }
            if (this.reactionTypeDisabled) {
                //如果选择普通反应，则特殊反应选项禁用（true），同时清空特殊反应数组
                this.submitBorrowForm.reactionType.length = 0;
                this.submitBorrowForm.borrowType = 0;
                this.submitBorrowForm.reactionType.unshift(0);
            } else {
                this.submitBorrowForm.borrowType = 1;
                alert(
                    "您所申请的实验类型属于危险\n该药品申请需要两人同时申请,请联系另一小组成员进行申请."
                );
                //this.dangerChemical();
            }
            console.log(this.submitBorrowForm);
            let { code, msg } = await this.$post(
                "/chemical/borrow/create",
                this.submitBorrowForm
            );
            if (code) {
                this.openBorrowSuccess();
            } else {
                this.openBorrowFailed();
            }
        },
        openBorrowSuccess() {
            this.$notify({
                title: "成功",
                message: "您已提交借出申请",
                type: "success",
            });
        },
        openBorrowFailed() {
            this.$notify.error({
                title: "错误",
                message: "借出失败",
            });
        },
        dangerChemical() {
            this.$confirm("您说申请的药品属于危化品，需要另一小组成员同时申请", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "请另一成员同时申请",
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消借用",
                    });
                });
        },
        async getAllChemical() {
            let { data } = await this.$get("/chemical/list", this.pages);
            this.options = data.records;
            //console.log(this.options)
        },
    },
};
</script>

<style lang="scss" scoped>
.basic {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    .title {
        font-size: 50px;
    }
}
</style>