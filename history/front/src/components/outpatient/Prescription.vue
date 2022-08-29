<template>
	<div>
		<el-page-header @back="goBack" content="开设处方">
		</el-page-header>
		<h3 class="el-icon-document">开设处方</h3>
		<el-descriptions title="患者信息">
			<el-descriptions-item>
				<template slot="label">
					<i class="el-icon-document"></i>
					病历号
				</template>
				{{this.$store.state.patientinfo.caseNumber}}
			</el-descriptions-item>
			<el-descriptions-item>
				<template slot="label">
					<i class="el-icon-user"></i>
					姓名
				</template>
				{{this.$store.state.patientinfo.realName}}
			</el-descriptions-item>
		</el-descriptions>
		<hr>
		<el-descriptions title="">
			<el-descriptions-item>
				<template slot="label">
					<i class="el-icon-coin"></i>
					总金额：
				</template>
				{{this.drugTotalPrice}}
			</el-descriptions-item>
		</el-descriptions>
		<el-table :data="prescription" @selection-change="handleSelectionChange" style="width: 100%">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="drugName" label="药品名称" width="150">
			</el-table-column>
			<el-table-column prop="drugFormat" label="药品规格" width="130">
			</el-table-column>
			<el-table-column prop="drugPrice" label="单价" sortable width="130">
			</el-table-column>
			<el-table-column label="用法用量" prop="drugUsage">
				<template slot-scope="scope">
					<el-input v-model="scope.row.drugUsage" placeholder="请输入用法用量"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="drugNumber" label="数量">
				<template slot-scope="scope">
					<el-input-number v-model="scope.row.drugNumber" controls-position="right" @change="getTotalPrice"
						:min="1"></el-input-number>
				</template>
			</el-table-column>
			<el-table-column prop="creationTime" label="创建时间">
				<template slot-scope="scope">
					<el-date-picker v-model="scope.row.creationTime" type="datetime" placeholder="选择日期时间"
						value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
				</template> -->
			</el-table-column>
		</el-table>
		<el-button @click="delSelectionRows">删除</el-button>
		<el-button @click="dialogVisible=true">添加</el-button><br>
		<hr>
		<el-dialog title="新增处方" :visible.sync="dialogVisible" width="50%">
			<el-form :inline="true">
				<el-form-item>
					<el-input v-model="drugname" placeholder="请输入药品名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="mnemoniccode" placeholder="请输入拼音助记编码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="searchDrug" icon="el-icon-search">搜索</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="newDruginfo" style="width: 100%%">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="drugCode" label="药品编码">
				</el-table-column>
				<el-table-column prop="drugName" label="药品名称">
				</el-table-column>
				<el-table-column prop="drugFormat" label="药品规格">
				</el-table-column>
				<el-table-column prop="drugPrice" label="单价">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="primary" @click="insertDrug(scope.row)">添 加</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
			  layout="prev, pager, next"
			  :total="druginfo.length"
			  background
			  :page-size="pageSize"
			  align="center"
			  @current-change="dopaging"
			  >
			</el-pagination>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
		<el-button type="primary" @click="addPrescription">开设处方</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				drug: [],
				drugname: '',
				mnemoniccode: '',
				prescription: [],
				druginfo: [],
				newDruginfo:[],
				drugUsage: '',
				drugNumber: '',
				drugTotalPrice: '',
				currPage:1,
				pageSize:5
			}
		},
		mounted() {
			if (JSON.stringify(this.$store.state.patientinfo) == '{}') {
				this.$message({
					message: '请选择要看诊的患者',
					type: 'error',
					duration: 600,
				});
			}
		},
		computed: {
			getTotalPrice() {
				let sum = 0;
				this.prescription.forEach(item => {
					sum += item.drugPrice * item.drugNumber
				})
				this.drugTotalPrice = sum
				return sum.toFixed(2)
			}
		},
		methods: {
			goBack() {
				this.$router.push("/outpatient")
			},
			searchDrug() {
				this.axios.get('http://localhost:8080/drug/searchDrug?drugname=' + this.drugname + '&mnemoniccode=' +
					this.mnemoniccode).then((
					res) => {
					this.druginfo = res.data
					this.dopaging(1)
				})
			},
			delSelectionRows() {
				for (let i in this.delArr) {
					let data = this.delArr[i]
					for (let j in this.prescription) {
						if (data.drugName == this.prescription[j].drugName) {
							this.prescription.splice(j, 1)
						}
					}
				}
			},
			insertDrug(row) {
				if (this.prescription.indexOf(row) == -1) {
					this.prescription.unshift(row);
				} else {
					this.$message({
						message: '此项已添加',
						type: 'warning',
						duration: 600,
					});
				}
			},
			dopaging(currPage){
				this.currPage=currPage
				let start=(currPage-1)*this.pageSize 
				let end=currPage*this.pageSize
				this.newDruginfo=this.druginfo.slice(start,end)
				
			},
			handleSelectionChange(arr) {
				this.delArr = arr
			},
			addPrescription() {
				this.prescription.forEach(item => {
					item.registerId = this.$store.state.patientinfo.id;
					this.axios.post('http://localhost:8080/prescription/insertPrescription?registerId=' + item
						.registerId + '&drugId=' + item.id + '&drugUsage=' + item.drugUsage + '&drugNumber=' +
						item.drugNumber + '&creationTime=' + item.creationTime+'&drugState=1').then(res => {
						if (res.data == true) {
							this.$message({
								showClose: true,
								message: '开设处方成功',
								type: 'success'
							});
							this.axios.post('http://localhost:8080/register/updateVisitState?vs=3&id=' +
								this.$store.state
								.patientinfo.id)
						} else {
							this.$message({
								showClose: true,
								message: '开设处方失败',
								type: 'error'
							});
						}
					})
				});
			}
		},
	}
</script>

<style>
</style>
