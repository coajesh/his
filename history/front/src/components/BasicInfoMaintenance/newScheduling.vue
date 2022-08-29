<template>
<div id="App">
<h1>新增号别</h1><hr/>
<div class="main">
    <div class="main-item">
    <el-form :model="newScheduling" ref="newScheduling" label-width="100px">
        <el-form-item label="规则名" prop="ruleName">
            <el-input v-model="newScheduling.ruleName"></el-input>
        </el-form-item>
        <el-form-item label="星期规则" prop="weekRule">
            <el-input v-model="newScheduling.weekRule"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('newScheduling')">提交</el-button>
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
           newScheduling: {
            ruleName: "",
            weekRule: "",
           },
        }
    },
    methods: {
         submitForm() {
            this.axios.post('http://localhost:8080/scheduling/addScheduling',this.newScheduling).then(res=>{
                if(res.data == true){
                    alert("添加成功");
                    this.$router.push('/basic/showScheduling');
                }else{
                    alert("添加失败");
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