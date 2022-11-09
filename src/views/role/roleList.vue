<template>
    <div class="basic">
        <div class="title">成 员 管 理</div>
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
        <el-input
            v-model="gridData.inputUsername"
            placeholder="请输入用户名查询信息"
            style="width: 20%"
            autocomplete="off"
        ></el-input>
        <el-button type="primary" @click="submitForm('gridData')"
            >点击查询</el-button
        >

        <el-dialog
            title="查询信息"
            :visible.sync="dialogTableVisible"
            width="60%"
        >
            <el-table :data="searchTable" style="width: 90%">
                <el-table-column label="用户名" width="120">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                            scope.row.username
                        }}</span>
                    </template></el-table-column
                >
                <el-table-column label="姓名" width="120"
                    ><template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                            scope.row.name
                        }}</span>
                    </template></el-table-column
                >
                <el-table-column label="联系方式" width="120"
                    ><template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                            scope.row.phoneNumber
                        }}</span>
                    </template></el-table-column
                >
                <el-table-column label="团队" width="120">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                            scope.row.team
                        }}</span>
                    </template></el-table-column
                >
                <el-table-column label="身份" width="120">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                            scope.row.roleId == 1 ? "管理员" : "普通成员"
                        }}</span>
                    </template></el-table-column
                >
                <el-table-column label="邮箱">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                            scope.row.email
                        }}</span>
                    </template></el-table-column
                >
            </el-table>
        </el-dialog>
        <!--表格区-->
        <el-table :data="tableDataManager" style="width: 90%">
            <el-table-column label="用户名" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.username
                    }}</span>
                </template>
            </el-table-column>

            <el-table-column label="姓名" width="120">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>创建日期: {{ scope.row.date }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="身份" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.roleId == 1 ? "管理员" : "普通成员"
                    }}</span>
                </template>
            </el-table-column>

            <el-table-column label="联系方式" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.phoneNumber
                    }}</span>
                </template>
            </el-table-column>

            <el-table-column label="团队" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.team }}</span>
                </template>
            </el-table-column>

            <el-table-column label="邮箱" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.email }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="warning"
                        @click="handleEditManager(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDeleteManager(scope.$index, scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <br /><br /><br /><br />
        <el-table :data="tableData" style="width: 90%">
            <el-table-column label="用户名" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.username
                    }}</span>
                </template>
            </el-table-column>

            <el-table-column label="姓名" width="120">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>创建日期: {{ scope.row.date }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="身份" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.roleId == 1 ? "管理员" : "普通成员"
                    }}</span>
                </template>
            </el-table-column>

            <el-table-column label="联系方式" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.phoneNumber
                    }}</span>
                </template>
            </el-table-column>

            <el-table-column label="团队" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.team }}</span>
                </template>
            </el-table-column>

            <el-table-column label="邮箱" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.email }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="warning"
                        @click="handleEditMember(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDeleteMember(scope.$index, scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            tableDataManager: [],
            searchTable: {
                username:"",
                roleId:"",
                phoneNumber:"",
                team:"",
                name:"",
                email:""
            },
            gridData: {
                inputUsername: "",
            },
            dialogTableVisible: false,
        };
    },
    //创建页面时初始化数据
    created() {
        this.getTableData();
        this.getTableDataManager();
    },
    //方法
    methods: {
        async getTableData() {
            let { code, data } = await this.$get("/user/listmember");
            //console.log(member);
            this.tableData = data;
        },
        async getTableDataManager() {
            let { code, data } = await this.$get("/user/listadmin");
            //console.log(member);
            this.tableDataManager = data;
        },

        handleEditMember(index, row) {},
        async handleDeleteMember(index, row) {
            let id = row.id;
            let url = "/user/remove/" + id;
            //console.log(url)
            let code = await this.$get(url);
            if (code) {
                this.$message.success("删除用户成功！");
                this.getTableData();
            } else {
                this.$message.error("删除失败");
            }
        },
        handleEditManager(index, row) {
            //console.log(index, row);
        },
        async handleDeleteManager(index, row) {
            let id = row.id;
            let url = "/user/remove/" + id;
            //console.log(url)
            let { code, msg } = await this.$get(url);
            if (code) {
                this.$message.success("删除管理员成功");
                this.getTableDataManager();
            } else {
                this.$message.error(msg);
            }
        },
        async submitForm(formName) {
            //提交查询用户表单
            //let code = this.get("/user/info/{inputUsername}");
            let searchUrl =
                "/user/info/username/" + this.gridData.inputUsername;
            let { code, data } = await this.$get(searchUrl);
            this.dialogTableVisible = true;
            this.searchTable.username = data.info.username;
            this.searchTable.roleId=data.info.roleId;
            this.searchTable.phoneNumber=data.info.phoneNumber;
            this.searchTable.name=data.info.name;
            
            //console.log(this.searchTable);
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
</style>