<template>
    <div class="basic">
        <div class="title">药 品 借 出 审 批</div>
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>

        <!--表格区-->
        <el-table :data="chemicalData" style="width: 99%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form
                        label-position="left"
                        inline
                        class="demo-table-expand"
                    >
                        <el-form-item label="反应类型">
                            <span>{{ props.row.reactionType }}</span>
                        </el-form-item>
                        <el-form-item label="第二申请人">
                            <span>{{ props.row.applicant2Id }}</span>
                        </el-form-item>

                        <el-form-item label="反应燃烧类型">
                            <span>{{ props.row.burnType }}</span>
                        </el-form-item>
                        <el-form-item label="申请提交时间">
                            <span>{{ props.row.createTime }}</span>
                        </el-form-item>
                        <el-form-item label="火灾类型">
                            <span>{{ props.row.fireType }}</span>
                        </el-form-item>
                        <el-form-item label="预计取药时间">
                            <span>{{ props.row.useTime }}</span>
                        </el-form-item>
                        <el-form-item label="所在物品柜代码">
                            <span>{{ props.row.cabinetId }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="药品名称" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.chemicalId
                    }}</span>
                </template>
            </el-table-column>

            <el-table-column label="药品代码" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.chemicalId
                    }}</span>
                </template>
            </el-table-column>

            <el-table-column label="数量" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.quantity
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="单位" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.unit }}</span>
                </template>
            </el-table-column>
            <el-table-column label="第一申请人" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.createUserId
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                        @click="chemicalApprove(scope.$index, scope.row)"
                        >同意借出</el-button
                    >
                    <el-button
                        size="mini"
                        type="primary"
                        @click="refuseApprove(scope.$index, scope.row)"
                        >驳回</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="stopProcess(scope.$index, scope.row)"
                        >终止流程</el-button
                    >
                </template>
            </el-table-column>
        </el-table>

        <br /><br /><br />
        <div class="block">
            <span class="demonstration"></span>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[5, 10, 20]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        //光标离开后的提示
        var validateName = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入药品名称"));
            } else {
                callback();
            }
        };
        var validateChemicalId = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入药品代码"));
            } else {
                callback();
            }
        };
        var validateQuantity = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入质量"));
            } else {
                callback();
            }
        };
        var validateUnit = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入药品单位"));
            } else {
                callback();
            }
        };

        return {
            total: "",
            pages: {
                pageSize: "",
                pageNum: "",
            },
            chemicalData: [], //借用药品接口接收数据，待处理
            borrowChemical: [], //处理后的药品借用列表
            rowId:{
                id:""
            }
        };
    },
    //创建页面时初始化数据
    created() {
        this.handleSizeChange();
        this.handleCurrentChange();
        this.getChemicalData();
    },
    //方法
    methods: {
        handleSizeChange(val = 5) {
            //console.log(`每页 ${val} 条`);
            this.pages.pageSize = val;

            this.getChemicalData();
            //return val;
        },
        handleCurrentChange(val = 1) {
            this.pages.pageNum = val;
            this.getChemicalData();
        },
        async getChemicalData() {
            //获取待审批药品借出列表
            let { data } = await this.$get(
                "/chemical/borrow/validapply",
                this.pages
            );
            this.chemicalData = data.records;
            this.total = data.total;
            console.log(this.chemicalData[0])
            for( let item in this.chemicalData){
                console.log(item)
            }
        },
        async chemicalApprove(index, row){
            let url="chemical/borrow/verify/"+row.id
            let code=await this.$get(url)
            if(code){
                alert("成功借出，请前往去药品")
                this.getChemicalData()
            }
        },
        changeRawData() {
            
        },
        dataFormat() {
            
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
    .search {
        padding: 10px 0;
    }
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>