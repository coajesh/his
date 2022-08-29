<template>
<div id="App">
<h1>新增科室</h1><hr/>
<div class="main">
    <div class="main-item">
    <el-form :model="newDept" :rules="rules" ref="newDept" label-width="100px">
        <el-form-item label="部门代号" prop="deptCode">
            <el-input v-model="newDept.deptCode"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
            <el-input v-model="newDept.deptName"></el-input>
        </el-form-item>
        <el-form-item label="部门类型" prop="deptType">
            <el-input v-model="newDept.deptType"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('newDept')">提交</el-button>
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
           newDept: {
            deptCode: "",
            deptName: "",
            deptType: "",
           },
           rules: {
            deptCode: [
                { required: true, message: '请输入部门代号', trigger: 'blur' }
            ],
            deptName: [
                { required: true, message: '请输入部门名称', trigger: 'blur' }
            ],
            deptType: [
                { required: true, message: '请输入部门类别', trigger: 'blur' }
            ]
           }
        }
    },
    methods: {
         submitForm(newDept) {
            this.$refs[newDept].validate((valid) => {
            if (valid) {
                this.axios.post('http://localhost:8080/department/addDepartment',this.newDept).then(res=>{
                    if(res.data == true){
                        alert("添加成功");
                        this.$router.push('/basic/departmentSearch');
                    }else{
                        alert("添加失败");
                    }
                });
            } else {
                console.log('error submit!!');
                return false;
            }
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