<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/finance' }">门诊财务管理</el-breadcrumb-item>
		  <el-breadcrumb-item>工作量统计</el-breadcrumb-item>
		  <el-breadcrumb-item>科室工作量</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<!-- 搜索框 -->
			<el-row :gutter="30">
				<el-col :span="8">
					<el-input v-model="input" placeholder="请输入科室名称" prefix-icon="el-icon-search"></el-input>
				</el-col>
				<el-col :span="12">
					统计日期：<el-date-picker
						  v-model="value1"
						  value-format="yyyy-MM-dd"
						  type="daterange"
						  align="right"
						  unlink-panels
						  range-separator="至"
						  start-placeholder="开始日期"
						  end-placeholder="结束日期"
						  :picker-options="pickerOptions">
						</el-date-picker>
				  </el-col>
				  </el-row>
				   <hr/>
				  <el-row :gutter="90">
				  <el-col :span="4" :offset="8">
				  		<el-button  @click="search" type="primary">查询</el-button>
				  </el-col>
				<el-col :span="4">
					<el-button  @click="clear" type="info">清空</el-button>
				  </el-col>
				  
			  </el-row>
		</el-card>
		<h3 align="center">门诊科室工作量统计</h3>
		<hr />
		<el-card>
			<el-table
			    :data="tableData"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="department"
			      label="科室名称">
			    </el-table-column>
			    <el-table-column
			      prop="patient"
			      label="看诊人数">
			    </el-table-column>
			    <el-table-column
			      prop="invoice"
			      label="发票数量">
			    </el-table-column>
			    <el-table-column
			      prop="westernMedicine"
			      label="西药费">
			    </el-table-column>
			    <el-table-column
			      prop="chinesePatentMedicine"
			      label="中成药">
			    </el-table-column>
			    <el-table-column
			      prop="chineseHerbalMedicine"
			      label="中草药">
			    </el-table-column>
			    <el-table-column
			      prop="registration"
			      label="挂号费">
			    </el-table-column>
			    <el-table-column
			      prop="inspection"
			      label="检验费">
			    </el-table-column>
			    <el-table-column
			      prop="examination"
			      label="检查费">
			    </el-table-column>
			    <el-table-column
			      prop="treatment"
			      label="治疗费">
			    </el-table-column>
			  </el-table>
		</el-card>
		<h3 align="center">统计图</h3>
		<hr />
		<el-tabs type="border-card">
		  <el-tab-pane label="工作量业绩统计">
			   <div class="echart" id="mychart" style="width: 1000px;height: 400px;"></div>
			  <h5>说明：统计量为各科室的各项费用之和</h5>
		  </el-tab-pane>
		</el-tabs>
		<!-- <el-empty :image-size="200"></el-empty> -->
	</div>
</template>

<script>
	import * as echarts from 'echarts'; 
	export default{
		data() {
			return {
				pickerOptions: {
				  shortcuts: [{
					text: '最近一周',
					onClick(picker) {
					  const end = new Date();
					  const start = new Date();
					  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					  picker.$emit('pick', [start, end]);
					}
				  }, {
					text: '最近一个月',
					onClick(picker) {
					  const end = new Date();
					  const start = new Date();
					  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					  picker.$emit('pick', [start, end]);
					}
				  }, {
					text: '最近三个月',
					onClick(picker) {
					  const end = new Date();
					  const start = new Date();
					  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
					  picker.$emit('pick', [start, end]);
					}
				  }]
				},
				value1: '',
			   	input: '',
				tableData: [],
				mychart: null,
				data: [],
				data2: [],
			}
		},
		methods: {
			clear(){
				this.input = ''
				this.value1 = ''
			}, 
			search(){
				let n = this.input
				let d1 = this.value1[0]
				let d2 = this.value1[1]
				let that = this
				if(!d1 || !d2) {	//避免时间undefined
					d1=''
					d2=''
				}
				this.data = []	//数据清零
				this.data2 = []
				//图
				this.$axios.get("http://localhost:8080/departmentworkload/searchinfo?date1="+d1+"&date2="+d2).then(function(res){
					for(let i in res.data) {
						that.data.push(res.data[i].department)
						let cnt = res.data[i].chineseHerbalMedicine+res.data[i].chinesePatentMedicine+res.data[i].examination+res.data[i].inspection+res.data[i].registration+res.data[i].treatment+res.data[i].westernMedicine
						that.data2.push(cnt)
					}
					that.initEcharts();
				})
				//表
				this.$axios.get("http://localhost:8080/departmentworkload/searchinfo?dept="+n+"&date1="+d1+"&date2="+d2).then(function(res){
					console.log(res.data);
					that.tableData=res.data
					})
				},
				initEcharts() {
				  // 基本柱状图
				  this.myChart = echarts.init(document.getElementById("mychart"));
				  this.myChart.setOption({	
						xAxis: {
							data: this.data
						},
						yAxis: {},
						series: [
							{
								type: 'bar',
								data: this.data2
							}
						]
				  });
				   window.addEventListener("resize", () => {
				        myChart.resize();
				    });
				}
		},
		created() {
			let that = this
			this.$axios.get("http://localhost:8080/departmentworkload/allinfo").then(function(res){
				for(let i in res.data) {
					that.data.push(res.data[i].department)
					let cnt = res.data[i].chineseHerbalMedicine+res.data[i].chinesePatentMedicine+res.data[i].examination+res.data[i].inspection+res.data[i].registration+res.data[i].treatment+res.data[i].westernMedicine
					that.data2.push(cnt)
				}
				that.initEcharts();
				console.log(res.data);
				that.tableData=res.data
		})
	}
}
</script>

<style>
</style>