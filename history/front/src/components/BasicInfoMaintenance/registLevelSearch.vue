<template>
<div id="App">
<h1>挂号等级查询</h1><hr/>
<div>
    <!-- 表格 -->
    <el-table class="table"
    :data="registLevel_Info.filter(data => !search || data.registName.toLowerCase().includes(search.toLowerCase()))">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="挂号代码" prop="registCode"></el-table-column>
        <el-table-column label="号别名称" prop="registName"></el-table-column>
        <el-table-column label="价格" prop="registFee"></el-table-column>
        <el-table-column label="号额" prop="registQuota"></el-table-column>
        <el-table-column label="显示顺序号" prop="sequenceNo"></el-table-column>
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
            <el-form-item label="号别编码" label-width="120px">
                <el-input v-model="form.registCode" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="号别名称" label-width="120px">
                <el-input v-model="form.registName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="挂号费" label-width="120px">
                <el-input v-model="form.registFee" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="挂号限额" label-width="120px">
                <el-input v-model="form.registQuota" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editRegistLevel">确 定</el-button>
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
           registLevel_Info:[],
           search: "",
           form: {
            id: "",
            registCode: "",
            registName: "",
            registFee: "",
            registQuota: "",
           },
           dialogFormVisible: false
        }
    },
    mounted() {
        this.updateTable();
    },
    methods: {
        updateTable(){
            this.axios.get('http://localhost:8080/registLevel/allRegistLevel').then(res=>{
                this.registLevel_Info = res.data;
                for(let item of this.registLevel_Info){
                    var fee = item.registFee+"";
                    var pos = fee.indexOf('.');
                    if(pos < 0){
                        pos = fee.length;
                        fee += '.';
                    }
                    while(fee.length <= pos + 2){
                        fee += '0';
                    }
                    item.registFee = fee;
                }
            });
            
        },

        handleEdit(index){
            this.dialogFormVisible = true;
            this.form.id = this.registLevel_Info[index].id;
            this.form.registCode = this.registLevel_Info[index].registCode;
            this.form.registName = this.registLevel_Info[index].registName;
            this.form.registFee = this.registLevel_Info[index].registFee;
            this.form.registQuota = this.registLevel_Info[index].registQuota;
        },

        handleDelete(index,row){
            this.axios.get('http://localhost:8080/registLevel/deleteById',{
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

        editRegistLevel(){
            this.axios.post('http://localhost:8080/registLevel/update',this.form
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