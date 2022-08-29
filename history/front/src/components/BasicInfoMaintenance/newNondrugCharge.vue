<template>
<div id="App">
<h1>新增非药品收费项目</h1><hr/>
<div class="main">
    <div class="main-item">
    <el-form :model="newTech" ref="newTech" label-width="100px">
        <el-form-item label="项目代号" prop="techCode">
            <el-input v-model="newTech.techCode"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="techName">
            <el-input v-model="newTech.techName"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="techFormat">
            <el-input v-model="newTech.techFormat"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="techPrice">
            <el-input v-model="newTech.techPrice"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="techType">
            <el-input v-model="newTech.techType"></el-input>
        </el-form-item>
        <el-form-item label="费用分类" prop="priceType">
            <el-input v-model="newTech.priceType"></el-input>
        </el-form-item>
        <el-form-item label="执行科室" label-width="120px">
            <el-select v-model="deptNameId" filterable remote reserve-keyword placeholder="请输入科室"
                :remote-method="remoteDept"
                :loading="loading">
                <el-option v-for="item in deptOptions" :key="item.id" :label="item.deptName" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('newTech')">提交</el-button>
        </el-form-item>
    </el-form>          
</div> 
</div>
</div>
</template>

<script>
export default {
    name: 'App',
    components:{},
    data() {
        return {
           newTech: {
            techCode: "",
            techName: "",
            techFormat: "",
            techPrice: "",
            techType: "",
            priceType: "",
            deptmentId: "",
           },
           deptNameId: "",
           deptNames: [],
           loading: false,
           deptOptions: [],
        }
    },
    mounted() {
        this.axios.get('http://localhost:8080/department/allDepartment').then(res=>{
            this.deptNames = JSON.parse(JSON.stringify(res.data,['id','deptName']));
        });
    },
    methods: {
         submitForm(newTech) {
            this.newTech.deptmentId = this.deptNameId;
            this.axios.post('http://localhost:8080/non-drugCharge/addMedicalTechnology',this.newTech).then(res=>{
                if(res.data == true){
                    alert("添加成功");
                    this.$router.push('/basic/nondrugCharge');
                }else{
                    alert("添加失败");
                }
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
                this.options = [];
            }
        },
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