<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/register' }">现场挂号</el-breadcrumb-item>
      <el-breadcrumb-item>费用管理</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>患者信息查询</h1>

    <el-card>
      <!-- 搜索框 -->
      <el-row>
        <el-col :span="20">
          <el-input placeholder="请输入病历号" v-model="id" class="input-with-select">
            <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="病历号" value="1"></el-option>
              <el-option label="身份证号" value="2"></el-option>
            </el-select> -->
            <el-button slot="append" @click="select" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="20">
          <el-input placeholder="请输入姓名" v-model="realName" class="input-with-select">
            <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="病历号" value="1"></el-option>
              <el-option label="身份证号" value="2"></el-option>
            </el-select> -->
            <el-button slot="append" @click="select" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>


      </el-row>


        <div v-if="radios.length!=0">
          <p>请选择您的订单：</p>
            <el-radio-group @change="radioChange" v-model="radio">
      <el-radio-button v-for="(item,index) in radios" :key="item.id" :value="index" :label="index">{{item.realName}}</el-radio-button>
    </el-radio-group>
        </div>
    </el-card>

    <h1>患者信息确认</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="form.realName" disabled></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="form.gender" disabled placeholder="--输入性别--" prop="gender">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <!--
  	作者：offline
  	时间：2022-08-02
  	描述：年龄or出生日期
  
  -->
      <el-form-item label="年龄" prop="age">
        <el-input v-model="form.age" disabled></el-input>
      </el-form-item>

      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-date-picker disabled value-format="yyyy-mm-dd" type="date" @change="dateChange" placeholder="选择日期"
            v-model="form.birthdate" style="width: 100%;"></el-date-picker>
        </el-col>

        <el-col class="line" :span="2"></el-col>

      </el-form-item>

      <!--
  	作者：offline
  	时间：2022-08-02
  	描述：身份证号
  -->
      <el-form-item label="身份证号"  prop="cardNumber">
        <el-input v-model="form.cardNumber" disabled></el-input>
      </el-form-item>
      <!--
  	作者：offline
  	时间：2022-08-02
  	描述：住址
  -->
      <el-form-item label="家庭住址" prop="homeAddress">
        <el-input v-model="form.homeAddress" disabled></el-input>
      </el-form-item>
      <el-form-item label="代缴费用" prop="homeAddress">
        <el-input v-model="form.registMoney" disabled></el-input>
      </el-form-item>
  </el-form>

    <!-- <el-row :gutter="20">
      <el-col :span="6">姓名：<div class="grid-content bg-purple"> </div>
      </el-col>
      <el-input v-model="input" style="width=6px;"></el-input>
      <el-col :span="8">身份证号：<div class="grid-content bg-purple"></div>
      </el-col>
      <el-input v-model="input" style="width=140px;"></el-input>

      <el-col :span="12">家庭住址：<div class="grid-content bg-purple"></div>
      </el-col>
      <el-input v-model="input" style="width=140px;"></el-input>

      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row> -->
    <!-- <el-card>
      <h1>患者挂号信息</h1>
      <hr>
      <el-col :span="3">病历号<div class="grid-content bg-purple">{{form.caseNumber}} </div>
      </el-col>
      <el-col :span="3">姓名<div class="grid-content bg-purple">      {{form.realName}}      </div>
      </el-col>
      <el-col :span="3">身份证号<div class="grid-content bg-purple">    {{form.cardNumber}}  </div>
      </el-col>
      <el-col :span="3">挂号日期<div class="grid-content bg-purple">    {{form.visitDate}}   </div>
      </el-col>
      <el-col :span="3">挂号时间<div class="grid-content bg-purple">    {{form.birthdate}}    </div>
      </el-col> 
      <el-col :span="3">挂号科室<div class="grid-content bg-purple">   {{form.}}  </div>
      </el-col>
      <el-col :span="3">挂号状态<div class="grid-content bg-purple">   {{form.}}      </div>
      </el-col>
      <el-col :span="3">操作<div class="grid-content bg-purple">     {{form.}}    </div>
      </el-col>

    </el-card> -->

    <template>
      <el-button @click="open1">缴费</el-button>
      <el-button @click="open">退费</el-button>



    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      input:'',
      realName:"",
      radio:'',
      radios:[],
      form:{},
    }
  },
  methods: {
    radioChange(e){
      console.log(e);
      this.form = this.radios[e];
      console.log(this.form);
      this.form.registMoney= (this.form.registMoney+(this.form.isBook=='1'?1:0))
    },
    select(){
      // /register/selectRegister
      this.axios.get('http://localhost:8080/register/selectRegister?'+'caseNumber='+this.id+'&'+'realName='+this.realName).then(res => {
            console.log(res);
            // return
            if (res.status == 200) {
              this.radios= res.data
            } else {
              // alert("添加失败");
              this.$message.error("查询失败")

            }
          });
    },
    open() {
      this.$confirm('此操作将退费, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '应退费金额是'+(this.form.registMoney)+'元'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },

    open1() {
      this.$confirm('缴费金额为'+(this.form.registMoney)+'元', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '缴费成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }

  }
}
</script>
	
	


<style>
</style>