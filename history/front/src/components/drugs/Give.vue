<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/drugs' }">药房</el-breadcrumb-item>
			<el-breadcrumb-item>药房管理</el-breadcrumb-item>
			<el-breadcrumb-item>订单处理</el-breadcrumb-item>
			<el-breadcrumb-item>药房发药</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片区域 -->


		<!-- 列表卡片 -->
		<el-card>
			<el-table :data="register_list" stripe style="width: 100%">
				<el-table-column prop="id" label="编号" width="180">
				</el-table-column>
				<el-table-column prop="caseNumber" label="患者病历号" width="180">
				</el-table-column>
				<el-table-column prop="realName" label="患者姓名">
				</el-table-column>
				<el-table-column prop="age" label="患者年龄">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- 编辑按钮 -->
						<el-button @click="check(scope.row.id)" type="primary" icon="el-icon-top-left" size="mini"></el-button>
					</template>
				</el-table-column>
			</el-table>
			
			<!-- 处方展示对话框 -->
			<el-dialog
				title="处方信息"
				:visible.sync="prescriptionDialogVisible"
				width="30%">
				<el-form label-width="80px">
					<el-form-item label="药品ID">
						<el-input disabled v-model="prescription.drugId"></el-input>
					</el-form-item>
					<el-form-item label="药品名称">
						<el-input disabled v-model="drugName"></el-input>
					</el-form-item>
					<el-form-item label="药品用法">
						<el-input disabled v-model="prescription.drugUsage"></el-input>
					</el-form-item>
					<el-form-item label="药品数量">
						<el-input disabled v-model="prescription.drugNumber"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-input disabled v-model="prescription.drugState"></el-input>
					</el-form-item>
					<el-form-item label="金额">
						<el-input disabled v-model="price"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="prescriptionDialogVisible=false">关闭</el-button>
						<el-button @click="giveMedicine">发药</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				register_list:[],
				prescription:[],
				prescriptionDialogVisible:false,
				drugInfo:[],
				drugName:'',
				price:0,
			}
		},
		methods: {
			// 获取需要发药的病人的病历信息
			async getRegisterList(){
				this.register_list=await this.$axios.get("http://localhost:8080/drug/giveList").then(res => res.data)
			},
			// 根据id查找病人处方
			async check(id){
				this.prescriptionDialogVisible=true
				this.prescription=await this.$axios.get("http://localhost:8080/drug/prescription?id="+id).then(res => res.data[0])
				this.drugInfo=await this.$axios.get("http://localhost:8080/drug/selectDrug?id="+this.prescription.drugId).then(res => res.data[0])
				this.drugName=this.drugInfo.drugName
				this.price=parseInt(this.prescription.drugNumber)*this.drugInfo.drugPrice
				this.price=this.price.toFixed(2)
			},
			//发药操作
			async giveMedicine(){
				this.prescriptionDialogVisible=false
				await this.$axios.get("http://localhost:8080/drug/change?id="+this.prescription.id+"&state=0")
				this.getRegisterList()
			}
		},
		created(){
			this.getRegisterList()
		}
	}
</script>

<style>
</style>
