<template>
    <div class="basic">
        <div class="title">我 的 物 品 柜</div>
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
        <el-button type="primary" @click="addCabinet()"
            >点击增加物品柜</el-button
        >
        <!--抽屉区-->
        <el-drawer
            title="查看物品"
            :visible.sync="watchCabinet"
            direction="rtl"
            :before-close="handleClose"
            size="50%"
        >
        
            <el-table :data="cabinetContent" style="width: 99%">
                <el-table-column label="药品名" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-s-cooperation"></i>
                        <span style="margin-left: 10px">{{
                            scope.row.name
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="药品代码" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-user"></i>
                        <span style="margin-left: 10px">{{
                            scope.row.chemicalId
                        }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="数量" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-info"></i>
                        <span style="margin-left: 10px">{{
                            scope.row.quantity
                        }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="单位" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-info"></i>
                        <span style="margin-left: 10px">{{
                            scope.row.unit
                        }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <span class="demonstration"></span>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[5, 10, 20]"
                    :page-size="5"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total=this.total
                >
                </el-pagination>
            </div>
        </el-drawer>

        <el-drawer
            title="增加物品柜"
            :visible.sync="drawer"
            direction="rtl"
            :before-close="handleClose"
        >
            <el-steps :active="1" align-center>
                <el-step title="步骤1" description="填写相关信息"></el-step>
                <el-step title="步骤2" description="管理员审核"></el-step>
                <el-step
                    title="步骤3"
                    description="增加成功，可在物品柜列表中查看"
                ></el-step>
            </el-steps>
            <br /><br />
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                style="width: 90%"
            >
                <el-form-item prop="name">
                    <span slot="label">
                        <span style="color: black">物品柜名称</span>
                    </span>
                    <el-input
                        type="text"
                        v-model="ruleForm.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="cabinetId">
                    <span slot="label">
                        <span style="color: black">物品柜编号</span>
                    </span>
                    <el-input
                        type="text"
                        v-model="ruleForm.cabinetId"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="typeId">
                    <span slot="label">
                        <span style="color: black">分类</span>
                    </span>
                    <el-input
                        type="text"
                        v-model="ruleForm.typeId"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button
                        type="primary"
                        @click="submitFormCabinet('ruleForm')"
                        >提交</el-button
                    >
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
        <!--表格区---->
        <el-table :data="tableData" style="width: 99%">
            <el-table-column label="物品柜名" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-s-cooperation"></i>
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="负责人" width="200">
                <template slot-scope="scope">
                    <i class="el-icon-user"></i>
                    <span style="margin-left: 10px">{{
                        scope.row.ownerId
                    }}</span>
                </template>
            </el-table-column>

            <el-table-column label="物品柜编号" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-info"></i>
                    <span style="margin-left: 10px">{{
                        scope.row.cabinetId
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="物品柜id" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-s-cooperation"></i>
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="info"
                        @click="getRowId(scope.$index, scope.row)"
                        >查看物品</el-button
                    >
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleDelete(scope.$index, scope.row)"
                        >开门</el-button
                    >
                    <el-button
                        size="mini"
                        type="warning"
                        @click="handleDelete(scope.$index, scope.row)"
                        >获取密钥</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        //光标离开后的提示
        var validateName = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入物品柜名称"));
            } else {
                callback();
            }
        };
        var validateCabinetId = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入物品柜编号"));
            } else {
                callback();
            }
        };
        var validateTypeId = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入分类"));
            } else {
                callback();
            }
        };

        return {
            ownerName:[],
            total:"",
            pages: {
                //查看物品柜内药品翻页信息和物品柜id
                id: "",
                pageNum: "",
                pageSize: "",
            },
            ruleForm: {
                name: "",
                cabinetId: "",
                typeId: "",
                //checkMe:false
            },

            //表单验证数据
            rules: {
                name: [{ validator: validateName, trigger: "blur" }], //验证密码
                cabinetId: [{ validator: validateCabinetId, trigger: "blur" }],
                typeId: [{ validator: validateTypeId, trigger: "blur" }],
            },
            tableData: [], //物品柜信息
            //person:[]
            drawer: false,
            watchCabinet: false,
            cabinetContent: [], //查看物品柜有哪些物品
        };
    },

    //创建页面时初始化数据
    created() {
        this.getTableData();
    },
    //方法
    methods: {
        handleSizeChange(val = 5) {
            //console.log(`每页 ${val} 条`);
            this.pages.pageSize = val;

            this.watch();
            //return val;
        },
        handleCurrentChange(val = 1) {
            this.pages.pageNum = val;

            //console.log(`当前页: ${val}`);
            this.watch();
            //return val;
        },
        async getTableData() {
            let { code, data } = await this.$get("/cabinet/listall");
            //console.log(code);
            //console.log(this.tableData);
            //console.log(data)
            this.tableData = data;
            

        },
        addCabinet() {
            this.drawer = true; //是否打开抽屉
        },
        async submitFormCabinet() {
            let { code, msg } = await this.$get("/cabinet/add", this.ruleForm); //新增物品柜提交按钮
            if (code) {
                this.$message.success("添加物品柜成功");
                this.$router.push("/layout/chemicalList");
            } else {
                this.$message.warning("添加失败");
            }
        },
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => {});
        },
        getRowId(index, row) {//点击查看物品时执行的函数
            this.pages.id = row.id;
            this.watch();
            let url="user/info/id/"+row.ownerId
            let {data} = this.$get(url)
            //this.ownerName=data
            //console.log(typeof data)
            //console.log(data[1])
            let values=Object.values(data)
            console.log(values[1])

            
        },
        async watch() {
            //查看物品柜内物品函数
            this.watchCabinet = true;

            //this.handleSizeChange(this.val);
            this.pages.pageNum = 1;
            this.pages.pageSize = 5;
            //this.handleCurrentChange(this.val);


            let { code, msg, data } = await this.$get(
                "/cabinet/getcontent",
                this.pages
            );
            if (code) {
                //this.$message.success("查看成功");
                this.cabinetContent = data.records;
                this.total=data.total
            } else {
                this.$message.error("查看失败");
            }
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