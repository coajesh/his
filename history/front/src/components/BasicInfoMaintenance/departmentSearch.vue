<template>
<div id="App">
<h1>科室查询</h1><hr/>
<div>
    <!-- 表格 -->
    <el-table class="table"
    :data="dept_Info.filter(data => !search || data.deptName.toLowerCase().includes(search.toLowerCase()) 
                            || data.deptCode.toLowerCase().includes(search.toLowerCase()))">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="科室代号" prop="deptCode"></el-table-column>
        <el-table-column label="科室名" prop="deptName"></el-table-column>
        <el-table-column label="科室类型" prop="deptType"></el-table-column>
        <el-table-column align="right">
            <!-- eslint-disable-next-line -->
            <template slot="header" slot-scope="scope" >
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
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
    
    <!-- Dialog 组件 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="部门代号" label-width="120px">
                <el-input v-model="form.deptCode" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="部门名称" label-width="120px">
                <el-input v-model="form.deptName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="部门类型" label-width="120px">
                <el-input v-model="form.deptType" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editDepartment">确 定</el-button>
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
           dept_Info:[],
           search: "",
           form: {
            id: "",
            deptCode: "",
            deptName: "",
            deptType: "",
           },
           dialogFormVisible: false
        }
    },
    mounted() {
        this.updateTable();
    },
    methods: {
        updateTable(){
            this.axios.get('http://localhost:8080/department/allDepartment').then(res=>{
                this.dept_Info = res.data;
            });
        },

        handleEdit(index){
            this.dialogFormVisible = true;
            this.form.deptCode = this.dept_Info[index].deptCode;
            this.form.deptName = this.dept_Info[index].deptName;
            this.form.deptType = this.dept_Info[index].deptType;
            this.form.id = this.dept_Info[index].id;
        },

        handleDelete(index,row){
            this.axios.get('http://localhost:8080/department/deleteByCode',{
                params: {
                    code : row.deptCode
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

        editDepartment(){
            this.axios.post('http://localhost:8080/department/updateDepartment',this.form
            ).then(res=>{
                this.dialogFormVisible = false;
                if(res.data == true){
                    alert("修改成功");
                }else{
                    alert("修改失败");
                }
                this.updateTable();
            });
        }
    }
}
</script>

<style scoped>
.table{
    width: 100%;
}
</style>