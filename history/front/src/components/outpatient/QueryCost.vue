<template>
	<div>
		<el-page-header @back="goBack" content="患者费用查询">
		</el-page-header>
		<h3 class="el-icon-document">患者费用查询</h3>
		<hr>
		<el-form :inline="true">
			<el-form-item>
				<el-input v-model="casenumber" placeholder="请输入患者病历号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="realname" placeholder="请输入患者姓名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="selectRegister" icon="el-icon-search">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="register" border style="width: 100%">
			<el-table-column type="index" label="编号" width="120">
			</el-table-column>
			<el-table-column prop="realName" label="患者姓名" width="120">
			</el-table-column>
			<el-table-column prop="caseNumber" label="患者病历号" width="120">
			</el-table-column>
			<el-table-column prop="gender" label="性别" width="120">
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="120">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="queryCost(scope.row)" type="text" size="small">费用查询</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-table :data="cost" style="width: 100%">
			<el-table-column prop="drugName" label="药品名称" width="180">
			</el-table-column>
			<el-table-column prop="drugPrice" label="单价">
			</el-table-column>
			<el-table-column prop="drugFormat" label="规格">
			</el-table-column>
			<el-table-column prop="drugNumber" label="数量">
			</el-table-column>
			<el-table-column prop="drugState" label="状态">
			</el-table-column>
			<el-table-column prop="creationTime" label="创建时间">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				register: [],
				casenumber: '',
				realname: '',
				cost: {}
			}
		},
		methods: {
			goBack() {
				this.$router.push("/outpatient")
			},
			selectRegister() {
				this.axios.get('http://localhost:8080/register/selectRegister?cn=' + this.casenumber + '&rn=' + this
					.realname+'&visitState=3').then((res) => {
					this.register = res.data
				})
			},
			queryCost(row) {
				let that=this;
				this.axios.get('http://localhost:8080/prescription/selectPrescription?registerId=' + row.id).then((res) => {
					that.cost = res.data
					console.log(this.cost);
				})
			}
		},
	}
</script>

<style>
</style>
