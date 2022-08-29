<template>
<div id="App">
<h1>新增员工</h1><hr/>
<div class="main">
    <div class="main-item">
    <el-form :model="form">
        <el-form-item label="科室" label-width="120px">
            <el-select v-model="deptNameId" filterable remote reserve-keyword placeholder="请输入科室"
                :remote-method="remoteDept"
                :loading="loading">
                <el-option v-for="item in deptOptions" :key="item.id" :label="item.deptName" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="挂号级别" label-width="120px">
            <el-select v-model="registNameId" filterable remote reserve-keyword placeholder="请输入挂号级别"
                :remote-method="remoteRegist"
                :loading="loading">
                <el-option v-for="item in registOptions" :key="item.id" :label="item.registName" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="参与排班" label-width="120px">
            <el-switch v-model="switchValue" active-color="#13ce66" inactive-color="#ff4949" @change="schedulingChange"></el-switch>
        </el-form-item>
        <el-form-item label="排班规则" label-width="120px"  v-if="switchValue">
            <el-select v-model="schedulingNameId" filterable remote reserve-keyword placeholder="请输入排班规则"
                :remote-method="remoteScheduling"
                :loading="loading">
                <el-option v-for="item in schedulingOptions" :key="item.id" :label="item.ruleName" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="真实姓名" label-width="120px">
            <el-input v-model="form.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
            <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm">提 交</el-button>

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
           form: {
            deptmentId: "",
            registLevelId: "",
            schedulingId: "",
            realname: "",
            password: "",
           },
           deptNameId: "",
           registNameId: "",
           schedulingNameId: "",
           deptNames: [],
           registNames: [],
           schedulingNames: [],
           loading: false,
           deptOptions: [],
           registOptions: [],
           schedulingOptions: [],
           switchValue: true
        }
    },
    mounted() {
        this.axios.get('http://localhost:8080/department/allDepartment').then(res=>{
            this.deptNames = JSON.parse(JSON.stringify(res.data,['id','deptName']));
        });

        this.axios.get('http://localhost:8080/registLevel/allRegistLevel').then(res=>{
            this.registNames = JSON.parse(JSON.stringify(res.data,['id','registName']));
        });

        this.axios.get('http://localhost:8080/scheduling/allScheduling').then(res=>{
            this.schedulingNames = JSON.parse(JSON.stringify(res.data,['id','ruleName']));
        });
    },
    methods: {
        submitForm() {
            let hook = 1;
            this.form.deptmentId = this.deptNameId;
            this.form.registLevelId = this.registNameId;
            if(this.switchValue == false){
                this.form.schedulingId = 0;
            }else this.form.schedulingId = this.schedulingNameId;
            if(this.form.deptmentId=="" || this.form.registLevelId=="" || this.form.schedulingId==undefined ||
                this.form.realname=="" || this.form.password==""){
                    alert("不得为空");
                    hook = 0;
            }
            if(hook == 1){
                this.axios.post('http://localhost:8080/employee/addEmployee',this.form).then(res=>{
                    if(res.data == true){
                        alert("添加成功");
                        this.$router.push('/basic/employeeSearch');
                    }else{
                        alert("添加失败");
                    }
                });
            }
            
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

        remoteRegist(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.registOptions = this.registNames.filter(item => {
                    return item.registName.toLowerCase().indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.options = [];
            }
        },

        remoteScheduling(query){
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.schedulingOptions = this.schedulingNames.filter(item => {
                    return item.ruleName.toLowerCase().indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.registOptions = [];
            }
        },

        schedulingChange(switchValue){
            if(switchValue == false){
                this.form.schedulingId = 0;
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
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>