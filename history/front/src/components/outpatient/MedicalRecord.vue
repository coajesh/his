<template>
	<div>
		<el-page-header @back="goBack" content="门诊病历首页">
		</el-page-header>
		<h3 class="el-icon-document">门诊病历首页</h3>
		<el-descriptions title="患者信息">
			<el-descriptions-item>
				<template slot="label">
					<i class="el-icon-document"></i>
					病历号
				</template>
				{{$store.state.patientinfo.caseNumber}}
			</el-descriptions-item>
			<el-descriptions-item>
				<template slot="label">
					<i class="el-icon-user"></i>
					姓名
				</template>
				{{$store.state.patientinfo.realName}}
			</el-descriptions-item>
		</el-descriptions>
		<hr>
		<el-form label-width="100px" ref="Medicalrecord" :model="Medicalrecord">
			<el-form-item label="主诉" placeholder="请输入主诉" prop="readme">
				<el-input v-model="Medicalrecord.readme"></el-input>
			</el-form-item>
			<el-form-item label="现病史" placeholder="请输入现病史" prop="present">
				<el-input v-model="Medicalrecord.present"></el-input>
			</el-form-item>
			<el-form-item label="现病治疗情况" placeholder="请输入现病治疗情况" prop="presentTreat">
				<el-input v-model="Medicalrecord.presentTreat"></el-input>
			</el-form-item>
			<el-form-item label="既往史" placeholder="请输入既往史" prop="history">
				<el-input v-model="Medicalrecord.history"></el-input>
			</el-form-item>
			<el-form-item label="过敏史" placeholder="请输入过敏史" prop="allergy">
				<el-input v-model="Medicalrecord.allergy"></el-input>
			</el-form-item>
			<el-form-item label="体格检查" placeholder="请输入体格检查" prop="physique">
				<el-input v-model="Medicalrecord.physique"></el-input>
			</el-form-item>
			<el-form-item label="检查检验建议" placeholder="请输入检查检验建议" prop="proposal">
				<el-input v-model="Medicalrecord.proposal"></el-input>
			</el-form-item>
			<el-form-item label="注意事项" placeholder="请输入注意事项" prop="careful">
				<el-input v-model="Medicalrecord.careful"></el-input>
			</el-form-item>
			<el-form-item label="诊断" prop="table">
				<el-table :data="selectionDisease" @selection-change="handleSelectionChange" style="width: 100%">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="diseaseCode" label="疾病助记编码" width="140">
					</el-table-column>
					<el-table-column prop="diseaseName" label="疾病名称" width="140">
					</el-table-column>
					<el-table-column prop="diseaseIcd" label="国际ICD编码" width="140">
					</el-table-column>
					<el-table-column prop="diseaseCategory" label="疾病所属分类">
					</el-table-column>
				</el-table>
				<el-button @click="delSelectionRows">删除</el-button>
				<el-button @click="dialogVisible=true">添加</el-button>
				<el-dialog title="诊断" :visible.sync="dialogVisible" width="50%">
					<el-form :inline="true">
						<el-form-item>
							<el-input v-model="dc" placeholder="请输入疾病助记编号"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input v-model="dn" placeholder="请输入疾病名称"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button @click="searchData" icon="el-icon-search">搜索</el-button>
						</el-form-item>
					</el-form>
					<el-table :data="newDisease" style="width: 100%">
						<el-table-column prop="diseaseCode" label="疾病助记编码">
						</el-table-column>
						<el-table-column prop="diseaseName" label="疾病名称">
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button type="primary" @click="doInsert(scope.row)">添 加</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
					  layout="prev, pager, next"
					  :total="disease.length"
					  :page-size="pageSize"
					  background
					  @current-change="dopaging"
					  align="center"
					  >
					</el-pagination>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible = false">取 消</el-button>
					</span>
				</el-dialog>
			</el-form-item>
			<hr>
			<el-form-item>
				<el-button @click="Submit" type="primary">立即保存</el-button>
				<el-button @click="clearForm">清空</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				Medicalrecord: {
					registerId: '',
					readme: '',
					present: '',
					presentTreat: '',
					history: '',
					allergy: '',
					physique: '',
					proposal: '',
					careful: ''
				},
				disease: [],
				newDisease:[],
				selectionDisease: [],
				dc: '',
				dn: '',
				medicalRecordId: [],
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
		methods: {
			goBack() {
				this.$router.push("/outpatient")
			},
			Submit() {
				this.$confirm('此操作不可撤销，请确认信息无误后进行保存?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				          this.Medicalrecord.registerId = this.$store.state.patientinfo.id;
				          this.axios.post('http://localhost:8080/medicalRecord/insertRecord?registerId=' + this.Medicalrecord
				          	.registerId + '&readme=' + this.Medicalrecord.readme + '&present=' + this.Medicalrecord.present +
				          	'&presentTreat=' + this.Medicalrecord.presentTreat + '&history=' + this.Medicalrecord.history +
				          	'&allergy=' + this.Medicalrecord.allergy + '&physique=' + this.Medicalrecord.physique +
				          	'&proposal=' + this.Medicalrecord.proposal + '&careful=' + this.Medicalrecord
				          	.careful /*,this.Medicalrecord*/ ).then(res => {
				          
				          	// this.Medicalrecord.registerId=this.$store.state.patientinfo.id;
				          	// console.log(this.Medicalrecord.registerId);
				          	// this.axios.get('http://localhost:8080/medicalRecord/insertRecord',this.Medicalrecord).then(res=>{
				          
				          	if (res.data == true) {
				          		this.$message({
				          			showClose: true,
				          			message: '保存成功',
				          			type: 'success',
				          		});
				          		this.axios.get('http://localhost:8080/medicalRecord/selectId?registerId=' + this.Medicalrecord.registerId)
				          			.then(res => {
				          				this.medicalRecordId = res.data
				          				console.log(this.medicalRecordId);
				          				this.selectionDisease.forEach(item => {
				          					this.axios.post('http://localhost:8080/medicalRecordDisease/addMedRec?medicalRecordId=' + this
				          						.medicalRecordId[0].id + '&diseaseId=' + item.id)
				          				})
				          			})
				          	} else {
				          		this.$message({
				          			showClose: true,
				          			message: '保存失败',
				          			type: 'error'
				          		});
				          	}
				          })
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消保存'
				          });          
				        });
				
			},
			clearForm() {
				this.$refs['Medicalrecord'].resetFields();
			},
			delSelectionRows() {
				for (let i in this.delArr) {
					let data = this.delArr[i]
					for (let j in this.selectionDisease) {
						if (data.diseaseCode == this.selectionDisease[j].diseaseCode) {
							this.selectionDisease.splice(j, 1)
						}
					}
				}
			},
			searchData() {
				this.axios.get('http://localhost:8080/disease/selectDisease?dc=' + this.dc + '&dn=' + this.dn).then((
					res) => {
					this.disease = res.data
					this.dopaging(1)
				})
			},
			doInsert(row) {
				if (this.selectionDisease.indexOf(row) == -1) {
					this.selectionDisease.unshift(row);
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
				this.newDisease=this.disease.slice(start,end)	
			},
			handleSelectionChange(arr) {
				this.delArr = arr
			},

		}
	}
</script>

<style>
</style>
