<template>
	<div>
		<el-page-header @back="goBack" content="查看患者">
		</el-page-header>
		<h3 class="el-icon-document">查看患者</h3>
		<hr>
		<el-form :inline="true">
			<el-form-item>
				<el-input v-model="cn" placeholder="请输入患者病历号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="rn" placeholder="请输入患者姓名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="search" icon="el-icon-search">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="newPatient" style="width: 100%" >
			<el-table-column type="index" label="编号" width="200">
			</el-table-column>
			<el-table-column prop="caseNumber" label="患者病历号" width="200">
			</el-table-column>
			<el-table-column prop="realName" label="患者姓名" width="200px">
			</el-table-column>
			<el-table-column prop="visitDate" label="挂号时间" width="200px">
			</el-table-column>
			<el-table-column prop="visitState" label="状态" width="200px">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="callNumber(scope.row)">看诊</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
		  layout="prev, pager, next"
		  :total="patient.length"
		  @current-change="dopaging"
		  background
		  :page-size="pageSize"
		  align="center"
		  >
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				cn: '',
				rn: '',
				patient:[],
				newPatient:[],
				pageSize:5,
				currPage:1
			}
		},
		methods: {
			search() {
				this.axios.get('http://localhost:8080/register/selectRegister?cn='+this.cn+'&rn='+this.rn+'&visitState=1').then((res)=>{
					this.patient=res.data
					this.dopaging(1)
				})
			},
			callNumber(row){
				this.$store.commit('patientinfo',row)
				this.axios.post('http://localhost:8080/register/updateVisitState?vs=2&id='+row.id)
			},
			goBack() {
				this.$router.push("/outpatient")
			},
			dopaging(currPage){
				this.currPage=currPage
				let start=(currPage-1)*this.pageSize 
				let end=currPage*this.pageSize
				this.newPatient=this.patient.slice(start,end)
				
			},
		},
	}
</script>

<style scoped>

</style>
