<template>
<div id="App">
<h1>用户查询</h1><hr/>
<div>
    <!-- 表格 -->
    <el-table class="table" :data="employee_Info">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="所属科室" prop="department.deptName"></el-table-column>
        <el-table-column label="挂号级别" prop="registLevel.registName"></el-table-column>
        <el-table-column label="是否参与排班" prop="isScheduling"></el-table-column>
        <el-table-column label="真实姓名" prop="realname"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column align="right">
            <!-- eslint-disable-next-line -->
            <template slot="header" slot-scope="scope" >
                <el-input v-model="search" size="mini" @change="searchName" placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
                <div style="float: left;">
                    <el-button @click="handleEdit(scope.$index)">编辑</el-button>
                    <template>
                        <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.$index, scope.row)">
                            <el-button slot="reference" >删除</el-button>
                        </el-popconfirm>
                    </template>
                </div>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
        <el-pagination layout="prev, pager, next" :total="1000" 
        @current-change="handleCurrentChange" :current-page.sync="currentPage">
        </el-pagination>
    </div>
    <!-- Dialog 组件 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="科室" label-width="120px">
                <el-select v-model="deptNameId" filterable remote reserve-keyword placeholder="请输入科室"
                    :remote-method="remoteDept"
                    :loading="loading">
                    <el-option v-for="item in deptOptions" :key="item.id" :label="item.deptName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="挂号级别" label-width="120px">
                <el-select v-model="registNameId" filterable remote reserve-keyword placeholder="请输入挂号级别"
                    :remote-method="remoteRegist"
                    :loading="loading">
                    <el-option v-for="item in registOptions" :key="item.id" :label="item.registName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="参与排班" label-width="120px">
                <el-switch v-model="switchValue" active-color="#13ce66" inactive-color="#ff4949" @change="schedulingChange"></el-switch>
            </el-form-item>
            <el-form-item label="排班规则" label-width="120px"  v-if="switchValue">
                <el-select v-model="schedulingNameId" filterable remote reserve-keyword placeholder="请输入排班规则"
                    :remote-method="remoteScheduling"
                    :loading="loading">
                    <el-option v-for="item in schedulingOptions" :key="item.id" :label="item.ruleName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="真实姓名" label-width="120px">
                <el-input v-model="form.realname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="120px">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editEmployee">确 定</el-button>
        </div>
    </el-dialog>

                
</div> 
</div>
</template>

<script>
export default {
    name: 'App',
    components:{},
    data() {
        return {
           employee_Info:[],
           search: "",
           form: {
            id: "",
            deptmentId: "",
            registLevelId: "",
            schedulingId: "",
            realname: "",
            password: "",
           },
           dialogFormVisible: false,
           currentPage: 1,
           deptNames: [],
           registNames: [],
           schedulingNames:[],
           loading: false,
           deptOptions: [],
           registOptions: [],
           schedulingOptions: [],
           switchValue: true,
           registNameId: "",
           deptNameId: "",
           schedulingNameId: ""
        }
    },
    mounted() {
        this.updateTable();
    },
    methods: {
        updateTable(){
            this.axios.get('http://localhost:8080/employee/allEmployee',{
                params: {
                    name: this.search
                }
            }).then(res=>{
                this.employee_Info = res.data;
                this.employee_Info.map((item) => {
                    if(item.scheduling == null || item.scheduling.id == 0) item.isScheduling = "否";
                    else item.isScheduling = "是";
                    return item; 
                })            
            });
        },

        handleEdit(index){
            this.dialogFormVisible = true;
            this.form.id = this.employee_Info[index].id;
            this.form.realname = this.employee_Info[index].realname;
            this.form.password = this.employee_Info[index].password;
            this.form.deptmentId = this.employee_Info[index].department.id;
            this.form.registLevelId = this.employee_Info[index].registLevel.id;
            if(this.employee_Info[index].scheduling != null) this.form.schedulingId = this.employee_Info[index].scheduling.id;
            else this.form.schedulingId = 0;

            if(this.form.schedulingId == 0) this.switchValue = false;
            else this.switchValue = true;

            this.axios.get('http://localhost:8080/department/allDepartment').then(res=>{
                this.deptNames = JSON.parse(JSON.stringify(res.data,['id','deptName']));
            });

            this.axios.get('http://localhost:8080/registLevel/allRegistLevel').then(res=>{
                this.registNames = JSON.parse(JSON.stringify(res.data,['id','registName']));
            });

            this.axios.get('http://localhost:8080/scheduling/allScheduling').then(res=>{
                this.schedulingNames = JSON.parse(JSON.stringify(res.data,['id','ruleName']));
            })
        },

        handleDelete(index,row){
            this.axios.get('http://localhost:8080/employee/deleteRegisterById',{
                params: {
                    id : row.id
                }
            }).then(res=>{
                if(res.data == true){
                    alert("删除成功");
                }else{
                    alert("删除失败");
                }
                this.updateTable();
            });
        },

        editEmployee(){
            this.form.deptmentId = this.deptNameId;
            this.form.registLevelId = this.registNameId;
            this.form.schedulingId = this.schedulingNameId;

            this.axios.post('http://localhost:8080/employee/updateEmployee',this.form
            ).then(res=>{
                this.dialogFormVisible = false;
                if(res.data == true){
                    alert("修改成功");
                }else{
                    alert("修改失败");
                }
                this.updateTable();
            });
            this.deptNameId = "";
            this.registNameId = "";
            this.schedulingNameId = "";
        },

        handleCurrentChange(val){
            this.axios.get('http://localhost:8080/employee/allEmployee',{
                params: {
                    page: `${val}`,
                    name: this.search
                }
            }).then(res=>{
                this.employee_Info = res.data;
            });
        },

        remoteDept(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.deptOptions = this.deptNames.filter(item => {
                    return item.deptName.toLowerCase().indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.deptOptions = [];
            }
        },

        remoteRegist(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.registOptions = this.registNames.filter(item => {
                    return item.registName.toLowerCase().indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.registOptions = [];
            }
        },

        remoteScheduling(query){
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.schedulingOptions = this.schedulingNames.filter(item => {
                    return item.ruleName.toLowerCase().indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.registOptions = [];
            }
        },

        schedulingChange(switchValue){
            if(switchValue == false){
                this.form.schedulingId = 0;
            }
        },

        searchName(){
            this.axios.get('http://localhost:8080/employee/allEmployee',{
                params:{
                    name: this.search
                }
            }).then(res=>{
                this.employee_Info = res.data;
            })
        }
    }
}
</script>

<style scoped>
.block{
    display: flex;
    align-items: center;
    justify-content: center;
}
.table{
    width: 100%;
}
</style>