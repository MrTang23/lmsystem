<template>
    <div class="basic">
        <div class="title">入 库 管 理</div>
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
        <!--入库区-->
        <div class="search">
            <el-button @click="addClick" type="primary">
                药品申请入库
            </el-button>
        </div>

        <!--表格区-->
        <el-table :data="chemicalData" style="width: 99%">
            <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand" >
          <el-form-item label="药品名称：">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="药品代码：">
            <span>{{ props.row.chemicalId }}</span>
          </el-form-item>
          <el-form-item label="药品id：">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="所在物品柜代码：">
            <span>{{ props.row.cabinetId }}</span>
          </el-form-item>
          <el-form-item label="药品质量：">
            <span>{{ props.row.quantity }}</span>
          </el-form-item>
          <el-form-item label="单位：">
            <span>{{ props.row.unit }}</span>
          </el-form-item>
          
          
        </el-form>
      </template>
    </el-table-column>
            <el-table-column label="药品名称" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
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

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="setInCabinet(scope.$index, scope.row)"
                        >修改所在物品柜</el-button
                    >
                    <el-button
                        size="mini"
                        type="warning"
                        @click="deleteChemical(scope.$index, scope.row)"
                        >删除药品</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <!--抽屉区-->
        <el-drawer
            title="修改所在物品柜"
            :visible.sync="chemicalInfoOpen"
            direction="rtl"
            :before-close="handleClose"
        >
            <el-steps :active="1" align-center>
                <el-step
                    title="步骤1"
                    description="填写相关信息，申请入库"
                ></el-step>
                <el-step title="步骤2" description="管理员审核"></el-step>
                <el-step
                    title="步骤3"
                    description="入库成功，可在物品柜中查看"
                ></el-step>
            </el-steps>
            <br /><br />
            <el-form
                :model="changeCabinet"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                style="width: 90%"
            >
                <el-form-item prop="cabinetId">
                    <span slot="label">
                        <span style="color: black">新物品柜：</span>
                    </span>
                    <el-input
                        type="text"
                        v-model="changeCabinetInfo.cabinetId"
                        autocomplete="off"
                        :disabled.sync="disabled"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="warning" @click="disable()"
                        >修改物品柜</el-button
                    >
                    <el-button
                        type="primary"
                        @click="changeCabinet('changeCabinetInfo')"
                        >提交</el-button
                    >
                    <el-button @click="resetForm('changeCabinet')"
                        >重置</el-button
                    >
                </el-form-item>
            </el-form>
        </el-drawer>

        <el-drawer
            title="购买药品入库申请"
            :visible.sync="drawer"
            direction="rtl"
            :before-close="handleClose"
        >
            <el-steps :active="1" align-center>
                <el-step
                    title="步骤1"
                    description="填写相关信息，申请入库"
                ></el-step>
                <el-step title="步骤2" description="管理员审核"></el-step>
                <el-step
                    title="步骤3"
                    description="入库成功，可在物品柜中查看"
                ></el-step>
            </el-steps>
            <br /><br />
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
                class="demo-ruleForm"
                style="width: 90%"
            >
                <el-form-item prop="name">
                    <span slot="label">
                        <span style="color: black">药品名称</span>
                    </span>
                    <el-input
                        type="text"
                        v-model="ruleForm.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="chemicalId">
                    <span slot="label">
                        <span style="color: black">药品代码</span>
                    </span>
                    <el-input
                        type="text"
                        v-model="ruleForm.chemicalId"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="quantity">
                    <span slot="label">
                        <span style="color: black">购买量</span>
                    </span>
                    <el-input
                        type="text"
                        v-model="ruleForm.quantity"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="unit">
                    <span slot="label">
                        <span style="color: black">单位</span>
                    </span>
                    <el-input
                        type="text"
                        v-model="ruleForm.unit"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')"
                        >提交</el-button
                    >
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
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
            ruleForm: {
                name: "",
                chemicalId: "",
                quantity: "",
                unit: "",
                //checkMe:false
            },
            pages: {
                pageSize: "",
                page: "",
            },

            //表单验证数据
            rules: {
                name: [{ validator: validateName, trigger: "blur" }], //验证密码
                chemicalId: [
                    { validator: validateChemicalId, trigger: "blur" },
                ],
                quantity: [{ validator: validateQuantity, trigger: "blur" }],
                unit: [{ validator: validateUnit, trigger: "blur" }],
            },
            chemicalData: [],
            rowId: {
                id: "",
            },
            chemicalCurrentCabinet: "",//目前物品柜信息
            //person:[]
            drawer: false,
            disabled: true, //物品柜修改按钮是否禁止填写
            chemicalInfoOpen: false,
            changeCabinetInfo: {
                id: "",
                cabinetId: "",
            },
        };
    },
    //创建页面时初始化数据
    created() {
        this.handleSizeChange();
        this.handleCurrentChange();
        //this.pages.page = 1;
        //this.pages.pageSize = 5;
        this.getChemicalData();
    },
    //方法
    methods: {
        async changeCabinet() {
            this.changeCabinetInfo.cabinetId = Number(
                this.changeCabinetInfo.cabinetId
            );
            let code = await this.$get(
                "/chemical/setcabinet",
                this.changeCabinetInfo
            );
            console.log(this.changeCabinetInfo);
            if (code) [this.$message.success("化学品入库成功！")];
        },
        async deleteChemical(index, row) {
            let url = "/chemical/remove/" + row.id;
            console.log(url);
            let code = await this.$get(url);
            if (code) {
                this.$message.success("删除成功");
                this.$router.push("/layout/chemicalAdd");
            }
        },
        disable() {
            this.disabled = false;
        },

        handleSizeChange(val = 5) {
            //console.log(`每页 ${val} 条`);
            this.pages.pageSize = val;

            this.getChemicalData();
            //return val;
        },
        handleCurrentChange(val = 1) {
            this.pages.page = val;

            //console.log(`当前页: ${val}`);
            this.getChemicalData();
            //return val;
        },
        async getChemicalData() {
            //console.log(this.pages)
            let { data } = await this.$get("/chemical/list", this.pages);

            //console.log(code);
            this.chemicalData = data.records;
            this.total = data.total;
            //this.$router.push("/layout/chemicalAdd")
            //console.log(chemicalData)
        },
        setInCabinet(index, row) {
            //打开修改物品柜抽屉
            this.chemicalInfoOpen = true;
            //console.log(row.id)
            this.changeCabinetInfo.id = row.id;
            this.rowId.id = row.id;
            //this.changeCabinetInfo.id = BigInt(row.id);
            let { data } = this.$get("/chemical/getcabinet", this.rowId);
            //console.log(data);
            //this.chemicalCurrentCabinet=data
            //this.chemicalInfo.cabinetName = data.cabinet.name;
            //console.log(code)
        },
        addClick() {
            this.drawer = true;
        },
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => {});
        },
        //申请表单提交
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                //判断表单数据是否验证成功
                if (valid) {
                    //实现登陆
                    let { code } = await this.$post(
                        "/chemical/add",
                        this.ruleForm
                    );
                    //console.log(message)
                    //判断是否登录成功
                    if (code) {
                        this.$message.success("入库请求成功，等待审批");

                        //this.$router.push("/layout/chemicalList");
                        this.$router.push("/layout/chemicalAdd");
                    } else {
                        this.$message.error("申请失败");
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