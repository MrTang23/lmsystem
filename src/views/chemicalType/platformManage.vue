<template>
    <div class="basic">
        <div class="title">实 验 平 台 管 理</div>
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
                    :total="10"
                >
                </el-pagination>
            </div>
        </el-drawer>
        <el-drawer
            title="编辑物品柜信息"
            :visible.sync="drawerEdit"
            direction="rtl"
            :before-close="handleClose"
        >
            <el-steps :active="1" align-center>
                <el-step title="步骤1" description="填写相关信息"></el-step>
                <el-step title="步骤2" description="管理员审核"></el-step>
                <el-step
                    title="步骤3"
                    description="修改成功，可在物品柜列表中查看"
                ></el-step>
            </el-steps>
            <br /><br />
            <el-form
                :model="updateCabinet"
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
                        v-model="updateCabinet.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="cabinetId">
                    <span slot="label">
                        <span style="color: black">物品柜编号</span>
                    </span>
                    <el-input
                        type="text"
                        v-model="updateCabinet.cabinetId"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="typeId">
                    <span slot="label">
                        <span style="color: black">分类</span>
                    </span>
                    <el-input
                        type="text"
                        v-model="updateCabinet.typeId"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="ownerId">
                    <span slot="label">
                        <span style="color: black">负责人用户名</span>
                    </span>
                    <el-input
                        type="text"
                        v-model="updateCabinet.ownerId"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button
                        type="primary"
                        @click="editCabinet('updateCabinet')"
                        >提交</el-button
                    >
                    <el-button @click="resetForm('updateCabinet')"
                        >重置</el-button
                    >
                </el-form-item>
            </el-form>
        </el-drawer>
        <!--抽屉区增加物品柜-->
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
            <el-table-column
                label="负责人"
                width="200"
                :formatter="stateFormat"
            >
                <template slot-scope="scope">
                    <i class="el-icon-user"></i>
                    <span style="margin-left: 10px">{{
                        scope.row.ownerId
                    }}</span>
                </template>
            </el-table-column>

            <el-table-column label="cabinetId" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-info"></i>
                    <span style="margin-left: 10px">{{
                        scope.row.cabinetId
                    }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="getRowId(scope.$index, scope.row)"
                        >查看物品</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除物品柜</el-button
                    >
                    <el-button
                        size="mini"
                        type="warning"
                        @click="editCabinetButton(scope.$index, scope.row)"
                        >修改信息</el-button
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
            pages: {
                //查看物品柜内药品翻页信息和物品柜id
                id: "",
                pageNum: "",
                pageSize: "",
            },
            cabinetIdBefore: "", //获取某一行的物品柜id
            ruleForm: {
                name: "",
                cabinetId: "",
                typeId: "",
                //checkMe:false
            },
            watchCabinet: false,
            cabinetContent: [], //查看物品柜有哪些物品
            //表单验证数据
            rules: {
                name: [{ validator: validateName, trigger: "blur" }],
                cabinetId: [{ validator: validateCabinetId, trigger: "blur" }],
                typeId: [{ validator: validateTypeId, trigger: "blur" }],
            },
            tableData: [], //物品柜信息
            //person:[]
            drawer: false,
            drawerEdit: false,
            updateCabinet: {
                name: "",
                cabinetId: "",
                typeId: "",
                ownerId: "",
            }, //更新物品柜信息
            updateCabinetId: {
                name: "",
                cabinetId: "",
                typeId: "",
                ownerId: "",
            },
        };
    },

    //创建页面时初始化数据
    created() {
        this.getTableData();
    },
    //方法
    methods: {
        stateFormat(row, column) {//修改表格中负责人显示id的问题
            if (row.ownerId) {
                let url="user/info/id/"+row.ownerId
                let data=this.get("url")
                return data
            } else {
                return "暂时没有负责人";
            }
        },
        async getTableData() {
            let { code, data } = await this.$get("/cabinet/listall");
            //console.log(code);
            //console.log(this.tableData);
            //console.log(data)
            this.tableData = data;
            //for (let i = 0; i < this.tableData.length; i++) {
            //  for (let keyName in this.tableData[i]) {
            //    let obj = this.tableData[i];
            //  if (keyName == "id") {
            //    let url = "/user/info/id/";
            //  obj[keyName] = await this.get(url);
            //}

            //}
            //}
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
        async handleDelete(index, row) {
            let id = row.id;
            let url = "/cabinet/remove/" + id;
            //console.log(url);
            let { code, msg } = await this.$get(url);
            if (code) {
                this.$message.success("删除物品柜成功");
                this.getTableData();
            } else {
                this.$message.error("删除失败");
            }
        },
        async editCabinetButton(index, row) {
            this.drawerEdit = true;
            this.cabinetIdBefore = row.id;
        },
        async editCabinet() {
            let searchUserIdUrl =
                "/user/info/username/" + this.updateCabinet.ownerId;
            let { data } = await this.$get(searchUserIdUrl);
            this.updateCabinetId.ownerId = data.info.id; //获取用户名对应id
            this.updateCabinetId.name = this.updateCabinet.name;
            this.updateCabinetId.cabinetId = this.updateCabinet.cabinetId;
            this.updateCabinetId.typeId = this.updateCabinet.typeId;
            //为防止前端显示用户id，使用两个数组
            //console.log(this.updateCabinetId);
            this.sendUpdate();
        },
        async sendUpdate(index, row) {
            let url = "/cabinet/update/" + this.cabinetIdBefore;
            //console.log(url);
            let { code, msg } = await this.$post(url, this.updateCabinetId);
            if (code) {
                this.$message.success("编辑物品柜成功");
                //this.getTableData();
                this.$router.push("/layout/chemicalList");
            } else {
                this.$message.error(msg);
            }
        },
        getRowId(index, row) {
            this.pages.id = row.id;
            this.watch();
        },
        async watch() {
            //查看物品柜内物品函数
            this.watchCabinet = true;

            //this.handleSizeChange(this.val);
            this.pages.pageNum = 1;
            this.pages.pageSize = 5;
            //this.handleCurrentChange(this.val);

            // console.log(typeof this.pages.id);
            //console.log(typeof this.pages.pageNum);
            //console.log(typeof this.pages.pageSize);

            let { code, msg, data } = await this.$get(
                "/cabinet/getcontent",
                this.pages
            );
            //console.log(code);
            if (code) {
                //this.$message.success("查看成功");
                this.cabinetContent = data.records;
            } else {
                this.$message.error(msg);
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