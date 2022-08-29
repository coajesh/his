<template>
<div id="App">
<h1>诊断目录查询</h1><hr/>
<div>
    <!-- 表格 -->
    <el-table class="table" :data="disease_Info">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="疾病代号" prop="diseaseCode"></el-table-column>
        <el-table-column label="疾病名称" prop="diseaseName"></el-table-column>
        <el-table-column label="ICD" prop="diseaseIcd"></el-table-column>
        <el-table-column label="疾病分类" prop="diseaseCategory"></el-table-column>
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
    
    <!-- Dialog 组件 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="疾病代号" label-width="120px">
                <el-input v-model="form.diseaseCode" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="疾病名称" label-width="120px">
                <el-input v-model="form.diseaseName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="ICD" label-width="120px">
                <el-input v-model="form.diseaseIcd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="疾病分类" label-width="120px">
                <el-input v-model="form.diseaseCategory" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editDisease">确 定</el-button>
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
           disease_Info:[],
           search: "",
           form: {
            id: "",
            diseaseCode: "",
            diseaseName: "",
            diseaseIcd: "",
            diseaseCategory: "",
           },
           dialogFormVisible: false
        }
    },
    mounted() {
        this.updateTable();
    },
    methods: {
        updateTable(){
            this.axios.get('http://localhost:8080/disease/allDisease').then(res=>{
                this.disease_Info = res.data;
            });
        },

        handleEdit(index){
            this.dialogFormVisible = true;
            this.form.id = this.disease_Info[index].id;
            this.form.diseaseCode = this.disease_Info[index].diseaseCode;
            this.form.diseaseName = this.disease_Info[index].diseaseName;
            this.form.diseaseIcd = this.disease_Info[index].diseaseIcd;
            this.form.diseaseCategory = this.disease_Info[index].diseaseCategory;
        },

        handleDelete(index,row){
            this.axios.get('http://localhost:8080/disease/deleteById',{
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

        editDisease(){
            this.axios.post('http://localhost:8080/disease/updateDisease',this.form
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