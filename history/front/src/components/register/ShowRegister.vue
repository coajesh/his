<template>
<div id="App">
<h1>病历号查询</h1><hr/>
<div>
    <!-- 表格 -->
    <el-table class="table" :data="register_Info">
        <el-table-column type="index" width="50"> </el-table-column>
         <el-table-column label="姓名"  prop="realName"></el-table-column>
        <el-table-column label="病历号"  prop="caseNumber"></el-table-column>

        <el-table-column align="right">
            <!-- eslint-disable-next-line -->
            <template slot="header" slot-scope="scope" >
                
            </template>
            <template slot-scope="scope">
                <div style="float: left;">
                                                               <template>
                        <el-popconfirm title="确定退号吗？" @confirm="handleDelete(scope.$index, scope.row)">
                            <el-button slot="reference" >退号</el-button>
                        </el-popconfirm>
                    </template>
                </div>
            </template>
        </el-table-column>
    </el-table>
          
           
</div> 
</div>
</template>

<script>
export default {
    name: 'App',
    components:{},
    data() {
        return {
           register_Info:[],
           search: "",
           form: {
      
            realname: "",
            casenumber: "", 
            
           },
           dialogFormVisible: false
        }
    },
    mounted() {
        this.updateTable();
    },
    methods: {
        updateTable(){
            this.axios.get('http://localhost:8080/register/showCaseNumber').then(res=>{
                this.register_Info = res.data;
                console.log(this.register_Info);
                
            });
        },
        handleDelete(index,row){
            this.axios.get('http://localhost:8080/register/deleteRegister',{
                params: {
                    caseNumber : row.caseNumber
                }
            }).then(res=>{
                if(res.data == true){
                    alert("退号成功");
                }else{
                    alert("退号失败");
                }
                this.updateTable();
            });
        },

     

    }
}
</script>

<style scoped>
.table{
    width: 100%;
}
</style>