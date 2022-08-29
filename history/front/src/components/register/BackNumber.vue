<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/register' }">现场挂号</el-breadcrumb-item>
		  <el-breadcrumb-item>挂号信息查询</el-breadcrumb-item>
		</el-breadcrumb>
	
	<h1>患者信息查询</h1>
	
		<el-card>
			<!-- 搜索框 -->
			  <el-row>
				  <el-col :span="20">
					  <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
					      <el-select v-model="select" slot="prepend" placeholder="请选择">
					        <el-option label="病历号" value="1"></el-option>
					        <el-option label="身份证号" value="2"></el-option>
					      </el-select>
					      <el-button slot="append" icon="el-icon-search"></el-button>
					    </el-input>
				  </el-col>
			  </el-row>
		</el-card>
		
	
	
	
<!--
	作者：wzy
	时间：2022-08-02
	描述：挂号信息展示框
-->

		<h1>患者挂号信息</h1>


	<el-card>
			<el-table id="registertable" :data="register" stripe style="width: 100%">
				<el-table-column
					prop="id"
					label="id"
					width="60">
				</el-table-column>
				<el-table-column
					prop="realname"
					label="姓名"
					width="60">
				</el-table-column>
				<el-table-column
					prop="age"
					label="年龄"
					width="60">
				</el-table-column>
				<el-table-column
					prop="gender"
					label="性别"
					width="60">
				</el-table-column>
				<el-table-column
					prop="cardnumber"
					label="身份证号"
					width="180">
				</el-table-column>
				<el-table-column
					prop="caseNumber"
					label="病历号"
					width="180">
				</el-table-column>
				<el-table-column
					prop="deptmentid"
					label="挂号科室"
					width="100">
				</el-table-column>
				<el-table-column
					prop="empoyeeId"
					label="挂号医生"
					width="100">
				</el-table-column>
				<el-table-column
					prop="noon"
					label="挂号午别"
					width="90">
				</el-table-column>
				<el-table-column
					prop="visittime"
					label="挂号时间"
					width="100">
				</el-table-column>
			
				<el-table-column
					prop="visitstate"
					label="挂号状态"
					width="100">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- 编辑按钮 -->
						<el-button @click="updateDialog(scope.row)" type="primary" icon="el-icon-edit" size="mini"></el-button>
						<!-- 删除按钮 -->
						<el-button @click="removeById(scope.row.id)" type="danger" icon="el-icon-delete" size="mini"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
			    @size-change="handleSizeChange"
			    @current-change="handleCurrentChange"
			    :current-page="pagenum"
			    :page-sizes="[10, 20, 30, 40]"
			    :page-size="10"
			    layout="total, sizes, prev, pager, next, jumper"
			    :total="total">
			</el-pagination>
		</el-card>
		
	
	
	
	<template>
  <el-button  @click="open">退号</el-button>
</template>
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
	          id: "",
	          caseNumber: "",
	          realname: "",
	          gender: "",
	          cardNumber: "",
	          age: "",
			  vivitDate:"",
			  noon:"",
			  deptmentId:"",
			  employeeId:"",
			  registlevelId:",",
			  settleCategoryId:"",
			  idbook:"",
			  registMethod:"",
			  registMoney:"",
			  vivitstate:""
	         },
	         dialogFormVisible: false,
	        
	      }
	  },
	  mounted(){
	  	this.updateTable();
	  },
    methods: {
		updateTable(){
		    this.axios.get('http://localhost:8080/register/selectregister').then(res=>{
		        this.register_Info = res.data;
		    });
		},
    
      open() {
        this.$confirm('此操作将退号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退号成功!'
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