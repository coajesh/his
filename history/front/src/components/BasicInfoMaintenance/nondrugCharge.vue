<template>
<div id="App">
<h1>非药品收费项目查询</h1><hr/>
<div>
    <!-- 表格 -->
    <el-table class="table" :data="tech_Info">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="项目代号" prop="techCode"></el-table-column>
        <el-table-column label="项目名称" prop="techName"></el-table-column>
        <el-table-column label="规格" prop="techFormat"></el-table-column>
        <el-table-column label="单价" prop="techPrice"></el-table-column>
        <el-table-column label="类型" prop="techType"></el-table-column>
        <el-table-column label="费用分类" prop="priceType"></el-table-column>
        <el-table-column label="执行科室" prop="department.deptName"></el-table-column>
        <el-table-column align="right">
            <!-- eslint-disable-next-line -->
            <template slot="header" slot-scope="scope" >
                <el-input v-model="search" size="mini" @change="searchName" placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
                <div style="float: left;">
                    <el-button type="mini" @click="handleEdit(scope.$index)">编辑</el-button>
                    <template>
                        <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.$index, scope.row)">
                            <el-button type="mini" slot="reference" >删除</el-button>
                        </el-popconfirm>
                    </template>
                </div>
            </template>
        </el-table-column>
    </el-table>
    <div class="block">
        <el-pagination layout="prev, pager, next" :total="1000" 
        @current-change="handleCurrentChange" :current-page.sync="currentPage">
        </el-pagination>
    </div>
    <!-- Dialog 组件 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="项目代号" label-width="120px">
                <el-input v-model="form.techCode" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="项目名称" label-width="120px">
                <el-input v-model="form.techName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="规格" label-width="120px">
                <el-input v-model="form.techFormat" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="单价" label-width="120px">
                <el-input v-model="form.techPrice" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型" label-width="120px">
                <el-input v-model="form.techType" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="费用分类" label-width="120px">
                <el-input v-model="form.priceType" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="执行科室" label-width="120px">
                <el-select v-model="deptNameId" filterable remote reserve-keyword placeholder="请输入科室"
                    :remote-method="remoteTech"
                    :loading="loading">
                    <el-option v-for="item in deptOptions" :key="item.id" :label="item.deptName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editTech">确 定</el-button>
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
           tech_Info:[],
           search: "",
           form: {
            id: "",
            techCode: "",
            techName: "",
            techFormat: "",
            techPrice: "",
            techType: "",
            priceType: "",
            deptmentId: "",
           },
           dialogFormVisible: false,
           deptOptions: [],
           deptNames: [],
           loading: false,
           deptNameId: "",
           currentPage: 1,
        }
    },
    mounted() {
        this.updateTable();
    },
    methods: {
        updateTable(){
            this.axios.get('http://localhost:8080/non-drugCharge/getMedicalTechnology',{
                params: {
                    name: this.search
                }
            }).then(res=>{
                this.tech_Info = res.data;
                for(let item of this.tech_Info){
                    var fee = item.techPrice+"";
                    var pos = fee.indexOf('.');
                    if(pos < 0){
                        pos = fee.length;
                        fee += '.';
                    }
                    while(fee.length <= pos + 2){
                        fee += '0';
                    }
                    item.techPrice = fee;
                }
            });
        },

        handleEdit(index){
            this.dialogFormVisible = true;
            this.form.id = this.tech_Info[index].id;
            this.form.techCode = this.tech_Info[index].techCode;
            this.form.techName = this.tech_Info[index].techName;
            this.form.techFormat = this.tech_Info[index].techFormat;
            this.form.techPrice = this.tech_Info[index].techPrice;
            this.form.techType = this.tech_Info[index].techType;
            this.form.priceType = this.tech_Info[index].priceType;
            this.form.deptmentId = this.tech_Info[index].department.id;

            this.axios.get('http://localhost:8080/department/allDepartment').then(res=>{
                this.deptNames = JSON.parse(JSON.stringify(res.data,['id','deptName']));
            });
        },

        handleDelete(index,row){
            this.axios.get('http://localhost:8080/non-drugCharge/deleteById',{
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

        editTech(){
            this.form.deptmentId = this.deptNameId;
            this.axios.post('http://localhost:8080/non-drugCharge/update',this.form
            ).then(res=>{
                this.dialogFormVisible = false;
                if(res.data == true){
                    alert("修改成功");
                }else{
                    alert("修改失败");
                }
                this.updateTable();
            });
        },

        searchName(){
            this.axios.get('http://localhost:8080/non-drugCharge/getMedicalTechnology',{
                params:{
                    name: this.search
                }
            }).then(res=>{
                this.tech_Info = res.data;
                for(let item of this.tech_Info){
                    var fee = item.techPrice+"";
                    var pos = fee.indexOf('.');
                    if(pos < 0){
                        pos = fee.length;
                        fee += '.';
                    }
                    while(fee.length <= pos + 2){
                        fee += '0';
                    }
                    item.techPrice = fee;
                }
            });
        },

        remoteTech(query){
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

        handleCurrentChange(val){
            this.axios.get('http://localhost:8080/non-drugCharge/getMedicalTechnology',{
                params: {
                    page: `${val}`,
                    name: this.search
                }
            }).then(res=>{
                this.tech_Info = res.data;
            });
        },
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