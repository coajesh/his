<template>
<div id="App">
<h1>新增号别</h1><hr/>
<div class="main">
    <div class="main-item">
    <el-form :model="newRegistLevel" :rules="rules" ref="newRegistLevel" label-width="100px">
        <el-form-item label="号别编码" prop="registCode">
            <el-input v-model="newRegistLevel.registCode"></el-input>
        </el-form-item>
        <el-form-item label="号别名称" prop="registName">
            <el-input v-model="newRegistLevel.registName"></el-input>
        </el-form-item>
        <el-form-item label="挂号限额" prop="registQuota">
            <el-input v-model.number="newRegistLevel.registQuota"></el-input>
        </el-form-item>
        <el-form-item label="挂号费" prop="registFee">
            <el-input v-model.number="newRegistLevel.registFee"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('newRegistLevel')">提交</el-button>
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
           newRegistLevel: {
            registCode: "",
            registName: "",
            registQuota:"",
            registFee: "",
           },
           rules: {
            registCode: [
                { required: true, message: '请输入代号', trigger: 'blur' }
            ],
            registName: [
                { required: true, message: '请输入名称', trigger: 'blur' }
            ],
            registFee: [
                { required: true, message: '请输入价格', trigger: 'blur' },
                { type: 'number', message: '必须为数字值'}
            ],
            registQuota: [
                { required: true, message: '请输入号额', trigger: 'blur' },
                { type: 'number', message: '必须为数字值'}
            ]
           }
        }
    },
    methods: {
         submitForm(newRegistLevel) {
            this.$refs[newRegistLevel].validate((valid) => {
            if (valid) {
                this.axios.post('http://localhost:8080/registLevel/addRegistLevel',this.newRegistLevel).then(res=>{
                    if(res.data == true){
                        alert("添加成功");
                        this.$router.push('/basic/registLevelSearch');
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