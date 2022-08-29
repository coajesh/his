<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/drugs' }">药房</el-breadcrumb-item>
			<el-breadcrumb-item>药房管理</el-breadcrumb-item>
			<el-breadcrumb-item>药库管理</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片区域 -->
		<el-card>
			<!-- 搜索框 -->
			<el-row>
				<el-col :span="8">
					<el-input placeholder="请输入药品编码" v-model="input1"></el-input>
				</el-col>
				<el-col :span="8">
					<el-input placeholder="请输入药品名称" v-model="input2"></el-input>
				</el-col>
				<el-col :span="8">
					<el-input placeholder="请输入拼音助记码" v-model="input3">
						<el-button slot="append" icon="el-icon-search" @click="drugSearch"></el-button>
					</el-input>
				</el-col>
			</el-row>
		</el-card>
		<hr>
		<el-button type="primary" @click="addDialog">增加药品</el-button>
		<hr>
		<!-- 药品列表卡片 -->
		<el-card>
			<el-table id="drugtable" :data="sublist" stripe style="width: 100%">
				<el-table-column prop="id" label="" width="60">
				</el-table-column>
				<el-table-column prop="drugCode" label="药品编码" width="180">
				</el-table-column>
				<el-table-column prop="drugName" label="名称" width="180">
				</el-table-column>
				<el-table-column prop="drugFormat" label="规格" width="90">
				</el-table-column>
				<el-table-column prop="manufacturer" label="生产厂家">
				</el-table-column>
				<el-table-column prop="drugPrice" label="单价" width="70">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- 编辑按钮 -->
						<el-button @click="updateDialog(scope.row)" type="primary" icon="el-icon-edit" size="mini">
						</el-button>
						<!-- 删除按钮 -->
						<el-button @click="removeById(scope.row.id)" type="danger" icon="el-icon-delete" size="mini">
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
				:page-sizes="[6, 10, 20, 40]" :page-size="6" layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</el-card>
		<!-- 增加药品对话框 -->
		<el-dialog title="增加药品" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
			<el-form label-width="80px">
				<el-form-item label="id">
					<el-input disabled v-model="addDrug.id"></el-input>
				</el-form-item>
				<el-form-item label="药品编码">
					<el-input disabled v-model="addDrug.drugCode"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="drugName">
					<el-input v-model="addDrug.drugName"></el-input>
				</el-form-item>
				<el-form-item label="规格" prop="drugFormat">
					<el-input v-model="addDrug.drugFormat"></el-input>
				</el-form-item>
				<el-form-item label="生产厂家" prop="manufacturer">
					<el-input v-model="addDrug.manufacturer"></el-input>
				</el-form-item>
				<el-form-item label="单价" prop="drugPrice">
					<el-input v-model="addDrug.drugPrice"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="addConfirm">确定</el-button>
					<el-button @click="addDialogVisible=false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 修改信息对话框 -->
		<el-dialog title="修改信息" :visible.sync="updateDialogVisible" width="30%">
			<el-form label-width="80px">
				<el-form-item label="id">
					<el-input disabled v-model="updateDrug.id"></el-input>
				</el-form-item>
				<el-form-item label="药品编码">
					<el-input v-model="updateDrug.drugCode"></el-input>
				</el-form-item>
				<el-form-item label="名称">
					<el-input v-model="updateDrug.drugName"></el-input>
				</el-form-item>
				<el-form-item label="规格">
					<el-input v-model="updateDrug.drugFormat"></el-input>
				</el-form-item>
				<el-form-item label="生产厂家">
					<el-input v-model="updateDrug.manufacturer"></el-input>
				</el-form-item>
				<el-form-item label="单价">
					<el-input v-model="updateDrug.drugPrice"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="updateConfirm">确定</el-button>
					<el-button @click="updateDialogVisible=false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
	export default {
		data() {
			return {
				select: '',
				drug_list: [],
				sublist: [],
				pagenum: 1,
				pagesize: 6,
				total: 1,
				updateDialogVisible: false,
				addDialogVisible: false,
				updateDrug: {},
				addDrug: {},
				input1: '',
				input2: '',
				input3: '',
			}
		},
		methods: {
			//获取药品信息
			async getDrugList() {
				this.drug_list = await this.$axios.get("http://localhost:8080/drug/list").then(function(res) {
					return res.data
				})
				this.dopaging()
			},
			//分页函数
			dopaging() {
				let start = (this.pagenum - 1) * this.pagesize
				let end = this.pagenum * this.pagesize
				this.sublist = this.drug_list.slice(start, end)
			},
			// 监听pagesize改变的事件
			handleSizeChange(newSize) {
				this.pagesize = newSize
				this.dopaging()
			},
			// 监听页码值改变的事件
			handleCurrentChange(newPage) {
				this.pagenum = newPage
				this.dopaging()
			},
			//展示添加药品信息的对话框
			addDialog() {
				this.addDialogVisible = true
				let len = this.drug_list.length
				this.addDrug.id = this.drug_list[len - 1].id + 1
				this.addDrug.drugCode = parseInt(this.drug_list[len - 1].drugCode) + 1
			},
			// 监听添加药品对话框的关闭事件
			addDialogClosed() {
				for (let i in this.addDrug) {
					this.addDrug[i] = ''
				}
			},
			//提交增加结果
			async addConfirm() {
				this.addDialogVisible = false
				// console.log(this.addDrug);
				try{
					await this.$axios.get("http://localhost:8080/drug/insert", {
						params: {
							id: this.addDrug.id,
							drugCode: this.addDrug.drugCode,
							drugName: this.addDrug.drugName,
							drugFormat: this.addDrug.drugFormat,
							manufacturer: this.addDrug.manufacturer,
							drugPrice: this.addDrug.drugPrice,
							mnemonicCode: '',
							delMark: 1
						}
					})
				} catch(e){
					this.$message.error('添加失败')
				}
				this.getDrugList()
			},
			// 展示修改药品信息的对话框
			updateDialog(row) {
				this.updateDialogVisible = true
				let obj = JSON.parse(JSON.stringify(row))
				this.updateDrug = obj
			},

			//提交修改结果
			async updateConfirm() {
				this.updateDialogVisible = false
				try{
					await this.$axios.get("http://localhost:8080/drug/update", {
						params: {
							id: this.updateDrug.id,
							drugCode: this.updateDrug.drugCode,
							drugName: this.updateDrug.drugName,
							drugFormat: this.updateDrug.drugFormat,
							manufacturer: this.updateDrug.manufacturer,
							drugPrice: this.updateDrug.drugPrice,
							mnemonicCode: ''
						}
					})
				} catch(e){
					this.$message.error('修改失败')
				}
				this.getDrugList()
			},
			//删除某行数据
			async removeById(id) {
				const confirmResult = await this.$confirm(
					'此操作将永久删除该数据，是否继续？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					},
				).catch(err => err)
				if (confirmResult == 'cancel') {
					return this.$message.info('已取消删除')
				}
				await this.$axios.get("http://localhost:8080/drug/delete?id=" + id)
				this.getDrugList()
			},

			//搜索药品信息
			async drugSearch() {
				this.drug_list = await this.$axios.get("http://localhost:8080/drug/list?code=" + this.input1 +
					"&name=" + this.input2 + "&m_code=" + this.input3).then(res => res.data)
				this.dopaging()
			},
		},
		created() {
			let that = this
			this.$axios.get("http://localhost:8080/drug/list").then(function(res) {
				// console.log(res.data)
				that.drug_list = res.data
				that.total = res.data.length
				that.dopaging()
			})
		},
	}
</script>

<style scoped>

</style>
