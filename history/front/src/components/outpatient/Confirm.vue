<template>
	<div>
		</el-alert>
		<el-page-header @back="goBack" content="门诊确诊">
		</el-page-header>
		<h3 class="el-icon-document">门诊确诊</h3>
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
		<el-form ref="confirmForm" :model="confirmForm" label-width="80px">
			<el-form-item label="诊断结果" prop="diagnosis">
				<el-input v-model="confirmForm.diagnosis"></el-input>
			</el-form-item>
			<el-form-item label="治疗意见" prop="cure">
				<el-input v-model="confirmForm.cure"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="Submit">提交</el-button>
				<el-button @click="clear">清空</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				confirmForm: []
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
			clear() {
				this.$refs['confirmForm'].resetFields();
			},
			Submit() {
				this.axios.post('http://localhost:8080/medicalRecord/insertResult?diagnosis=' + this.confirmForm
					.diagnosis + '&cure=' + this.confirmForm.cure + '&id=' + this.$store.state.patientinfo.id).then(
					res => {
						if (res.data == true) {
							this.$message({
								showClose: true,
								message: '提交成功',
								type: 'success'
							});
						} else {
							this.$message({
								showClose: true,
								message: '提交失败',
								type: 'error'
							});
						}
					})
			}
		}
	}
</script>

<style>
</style>
