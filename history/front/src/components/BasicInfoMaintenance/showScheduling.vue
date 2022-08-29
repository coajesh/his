<template>
<div id="App">
<h1>排班计划列表</h1><hr/>
<div class="main">
    <!-- 表格 -->
    <el-table class="table" 
    :data="rule_Info.filter(data => !search || data.ruleName.toLowerCase().includes(search.toLowerCase()))">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="规则名" prop="ruleName"></el-table-column>
        <el-table-column label="规则" prop="weekRule"></el-table-column>
        <el-table-column align="right">
            <!-- eslint-disable-next-line -->
            <template slot="header" slot-scope="scope" >
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
                <div style="float: left;">
                    <el-button @click="handleEdit(scope.$index)">编辑</el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>
    <!-- Dialog 组件 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="规则名" label-width="120px">
                <el-input v-model="form.ruleName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="星期规则" label-width="120px">
                <el-input v-model="form.weekRule" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editRule">确 定</el-button>
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
            search: "",
            rule_Info:[],
            form: {
                id: "",
                ruleName: "",
                weekRule: ""
            },
           dialogFormVisible: false,
        }
    },
    mounted() {
        this.updateTable();
    },
    methods: {
         updateTable(){
            this.axios('http://localhost:8080/scheduling/allScheduling',{
                params: {
                    name: this.search
                }
            }).then(res=>{
                this.rule_Info = res.data;
            });
         },

        handleEdit(index){
            this.dialogFormVisible = true;
            this.form.id = this.rule_Info[index].id;
            this.form.ruleName = this.rule_Info[index].ruleName;
            this.form.weekRule = this.rule_Info[index].weekRule;
        },
        
        editRule(){
            this.axios.post('http://localhost:8080/scheduling/update',this.form
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
.main{
    display: flex;
    align-items: center;
    justify-content: center;
}
.main-item{
    width: 400px;
}
</style>