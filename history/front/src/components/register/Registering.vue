<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/register' }">现场挂号</el-breadcrumb-item>
      <el-breadcrumb-item>挂号</el-breadcrumb-item>
    </el-breadcrumb>


    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="form.realName"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="form.gender" placeholder="--输入性别--" prop="gender">
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
        <el-input v-model="form.age"></el-input>
      </el-form-item>

      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-date-picker value-format="yyyy-mm-dd" type="date" @change="dateChange" placeholder="选择日期"
            v-model="form.birthdate" style="width: 100%;"></el-date-picker>
        </el-col>

        <el-col class="line" :span="2"></el-col>

      </el-form-item>

      <!--
  	作者：offline
  	时间：2022-08-02
  	描述：身份证号
  -->
      <el-form-item label="身份证号" prop="cardNumber">
        <el-input v-model="form.cardNumber"></el-input>
      </el-form-item>
      <!--
  	作者：offline
  	时间：2022-08-02
  	描述：住址
  -->
      <el-form-item label="家庭住址" prop="homeAddress">
        <el-input v-model="form.homeAddress"></el-input>
      </el-form-item>
      <!--
  	作者：offline
  	时间：2022-08-02
  	描述：挂号科室
  -->
      <el-form-item label="挂号科室" prop="depmentId">
        <el-select @change="depmentSelect" v-model="form.deptmentId" placeholder="--请选择挂号科室--">
          <el-option v-for="(item, index) in depments" :key="index" :label="item.deptName" :value="item.id">
            {{ item.deptName }}</el-option>
          <!-- <el-option label="神经内科" value="2"></el-option>
          <el-option label="普通内科" value="3"></el-option>
          <el-option label="消化内科" value="4"></el-option>
          <el-option label="呼吸内科" value="5"></el-option>
          <el-option label="内分泌科" value="6"></el-option>
          <el-option label="肾病内科" value="7"></el-option>
          <el-option label="血液内科" value="8"></el-option>
          <el-option label="感染内科" value="9"></el-option>
          <el-option label="老年病内科" value="10"></el-option>
          <el-option label="风湿免疫内科" value="11"></el-option>
          <el-option label="透析科" value="12"></el-option>
          <el-option label="变态反应科" value="13"></el-option>
          <el-option label="普通外科" value="14"></el-option>
          <el-option label="泌尿外科" value="15"></el-option>
          <el-option label="神经外科" value="16"></el-option>
          <el-option label="胸外科" value="17"></el-option>
          <el-option label="整形外科" value="18"></el-option>
          <el-option label="肛肠外科" value="19"></el-option>
          <el-option label="乳腺外科" value="20"></el-option>
          <el-option label="心血管外科" value="21"></el-option>
          <el-option label="器官移植" value="22"></el-option>
          <el-option label="微创外科" value="23"></el-option>
          <el-option label="功能神经外科" value="24"></el-option>
          <el-option label="腺体外科" value="25"></el-option>
          <el-option label="儿科综合" value="26"></el-option>
          <el-option label="小儿外科" value="27"></el-option>
          <el-option label="儿童保健科" value="28"></el-option>
          <el-option label="新生儿科" value="29"></el-option> -->
          <!-- <el-row>
            <el-button type="success" @click="SubmitDept" icon="el-icon-check" circle></el-button>

          </el-row> -->
        </el-select>
      </el-form-item>
      <el-form-item label="挂号类别" prop="registLevelId">
        <el-select @change="depmentSelect" v-model="form.registLevelId" placeholder="--请选择挂号科室--">
          <el-option v-for="(item, index) in registLevels" :key="index" :label="item.registName" :value="item.id">
            {{ item.registName }}</el-option>
        </el-select>
      </el-form-item>
      <!--
  	作者：offline
  	时间：2022-08-02
  	描述：挂号医生
  -->

      <el-form-item label="挂号医生">
        <el-select v-model="form.employeeId" :disabled="employeeFlag" placeholder="--请选择医生--" prop="id">
          <el-option v-for="(item, index) in employees" :key="index" :label="item.realname" :value="item.id">
            {{ item.realname }}</el-option>
          <!-- <el-option label="任汉云--副主任医师" value="2"></el-option>
          <el-option label="林巧稚--主任医师" value="3"></el-option>
          <el-option label="袁云--知名专家" value="4"></el-option> -->

        </el-select>
      </el-form-item>
      <!--
  	作者：offline
  	时间：2022-08-02
  	描述：挂号时间
  -->
      <el-form-item label="挂号日期">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="--z--" v-model="form.visit_date" style="width: 100%;">
          </el-date-picker>
        </el-col>
        <el-col class="line" :span="2"></el-col>


      </el-form-item>

      <!-- </el-form-item> -->
      <el-form-item label="挂号午别">
        <el-radio-group v-model="form.noon" prop="noon">
          <el-radio label="上午"></el-radio>
          <el-radio label="下午"></el-radio>
        </el-radio-group>
      </el-form-item>


      <!-- </el-form-item> -->
      <el-form-item label="需要病历本" prop="isBook">
        <el-switch v-model="form.isBook" active-value="1" inactive-value="0"></el-switch>
      </el-form-item>

      <!--
  	作者：offline
  	时间：2022-08-02
  	描述：收费方式
  -->

      <!-- 
      </el-form-item> -->
      <el-form-item label="支付方式">
        <el-radio-group v-model="form.registMethod">
          <el-radio label="线上支付"></el-radio>
          <el-radio label="现金"></el-radio>
        </el-radio-group>
      </el-form-item>



      <el-form-item>

        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {

        // realName: '',

        // gender: '',
        // age: '',
        // birthdate: '',
        // cardNumber: '',
        // homeAddress: '',
        // deptmentId: '',
        // employeeId: '',

        // noon: '',
        // isBook: '',
        // registMethod: '',
        id: "",
        caseNumber: "",
        realName: "",
        gender: "",
        cardNumber: "",
        birthdate: "",
        age: "",
        ageType: "",
        homeAddress: "",
        visitDate: "",
        noon: "",
        deptmentId: "",
        employeeId: "",
        registLevelId: "",
        settleCategoryId: "",
        isBook: "",
        registMethod: "",
        registMoney: "",
        visitState: "",

      },
      // 医生列表
      employees: [],
      depments: [],
      registLevels: [],
      employeeFlag: true,
    }
  },
  created() {
    this.init()
  },
  methods: {
    depmentSelect(e) {
      console.log(this.form.deptmentId + " " + this.form.registLevelId);
      // let params = {
      //   deptmentId: this.form.deptmentId,
      //   registLevelId: this.form.registLevelId
      // }
      if (this.form.deptmentId != '' && this.form.registLevelId != '') {
        if (this.form.deptmentId != null && this.form.registLevelId != null) {
          if (this.form.deptmentId && this.form.registLevelId) {
            console.log("11111");
            var obj = this.registLevels.find(item => item.id === this.form.registLevelId);
            console.log(obj);
            this.form.registMoney = obj.registFee
            console.log(this.form.registMoney);
            this.employeeFlag = false;
            // console.log(params);
            this.axios.post('http://localhost:8080/employee/allEmployees?deptmentId='+this.form.deptmentId+'&registLevelId='+this.form.registLevelId).then(res => {
              console.log(res);
              if (res.status == 200) {
                this.employees = res.data
              } else {
              }
            });
          }
        }
      }
      console.log(e);
      // // /employee/allEmployee

    },
    init() {
      // // /employee/allEmployee
      // this.axios.post('http://localhost:8080/employee/allEmployees',{deptmentId:1}).then(res => {
      //   console.log(res);
      //   if (res.status == 200) {
      //     this.employees = res.data
      //   } else {
      //   }
      // });
      this.axios.post('http://localhost:8080/department/allDepartment').then(res => {
        console.log(res);
        if (res.status == 200) {
          this.depments = res.data
        } else {
        }
      });
      // /registLevel/allRegistLevel
      this.axios.post('http://localhost:8080/registLevel/allRegistLevel').then(res => {
        console.log(res);
        if (res.status == 200) {
          this.registLevels = res.data
        } else {
        }
      });
    },
    SubmitDept() { },
    dateChange(e) {
      console.log(e);
      var myDate = new Date();
      var myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      var myMonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var myToday = myDate.getDate(); //获取当前日(1-31)
      let arr = e.split("-");
      console.log(arr);
      var Year = myYear - arr[0];
      var Month = myMonth - arr[1];
      var Today = myToday - arr[2];
      if (Month > 0 && Today > 0) {
        Year++;
      }
      this.form.age = Year;
      console.log(Year);
      // console.log(this.age);
    },
    onSubmit(form) {
      var time = new Date();
      // console.log(time.getTime());
      // return
      this.$refs['form'].validate((valid) => {
        this.form.caseNumber = this.form.employeeId +''+ this.form.deptmentId +'' + time.getTime()
        if (valid) {
          this.axios.post('http://localhost:8080/register/addRegister', this.form).then(res => {
            if (res.data == true) {
              // alert("添加成功");
              this.$message.success("添加成功")
              this.$router.push('/register');
            } else {
              // alert("添加失败");
              this.$message.error("添加失败")

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
<style>
</style>