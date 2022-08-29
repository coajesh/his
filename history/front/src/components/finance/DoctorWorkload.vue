<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/finance' }">门诊财务管理</el-breadcrumb-item>
		  <el-breadcrumb-item>工作量统计</el-breadcrumb-item>
		  <el-breadcrumb-item>医生工作量</el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-card>
			<!-- 搜索框 -->
			<el-row :gutter="30">
				<el-col :span="8">
					<el-input v-model="input" placeholder="请输入医生姓名" prefix-icon="el-icon-search"></el-input>
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
		<h3 align="center">门诊医生工作量统计</h3>
		<hr />
		<el-card>
			<el-table
			    :data="tableData"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="doctorName"
			      label="医生姓名">
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
		<!-- <el-empty :image-size="200"></el> -->
		<h3 align="center">统计图</h3>
		<hr />
		<el-tabs type="border-card">
		  <el-tab-pane label="工作量业绩评级">
			  <div id="chartPie" class="pie-wrap"></div>
			  <h5>说明：工作量业绩评级统计根据每位医生的看诊人数、发票数量与各项费用之和等指标进行综合评估所得出</h5>
		  </el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	require('echarts/theme/macarons');//引入主题
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
				chartPie: null,
				tableData: [],
				grade1: '0',
				grade2: '0',
				grade3: '0',
				grade4: '0',
				grade5: '0',
				
		}
	},
	methods: {
		search() {
			let n = this.input
			let d1 = this.value1[0]
			let d2 = this.value1[1]
			let that = this
			if(!d1 || !d2) {	//避免时间undefined
				d1=''
				d2=''
			}
			this.grade1 = 0	//清零，不然不多次查询会累加
			this.grade2 = 0
			this.grade3 = 0
			this.grade4 = 0
			this.grade5 = 0
			//图
			this.$axios.get("http://localhost:8080/doctorworkload/searchinfo1?date1="+d1+"&date2="+d2).then(function(res){
				for(let i in res.data) {
					let doc = res.data[i]
					let index1 = doc.patient + doc.invoice
					let index2 = doc.chineseHerbalMedicine+doc.chinesePatentMedicine
									+doc.examination+doc.inspection+doc.registration+
									+doc.treatment+doc.westernMedicine
					if(index1<15 || index2<1200){
						that.grade1++
					}else if(index1<17 || index2<1500) {
						that.grade2++
					}else if(index1<19 || index2<1800) {
						that.grade3++
					}else if(index1<21 || index2<2000) {
						that.grade4++
					}else {
						that.grade5++
					}
				}
				that.$nextTick(() => {
					that.drawPieChart();
				})
			})
			//表
			this.$axios.get("http://localhost:8080/doctorworkload/searchinfo?name="+n+"&date1="+d1+"&date2="+d2).then(function(res){
				console.log(res.data);
				that.tableData=res.data
			})
		},
		clear(){
			this.input = ''
			this.value1 = ''
		},
		drawPieChart() {
			 let mytextStyle = {
			   color: "#333",                          
			   fontSize: 18,                            
			 };
			 let mylabel = {
			   show: true,                 
			   position: "right",          
			   offset: [30, 40],             
			   formatter: '{b} : {c} ({d}%)',      
			   textStyle: mytextStyle
			 };
			 this.chartPie = echarts.init(document.getElementById('chartPie'),'macarons');
			 this.chartPie.setOption({
			   title: {
				 text: '全体工作量业绩评级',
				 subtext: '饼状图',
				 x: 'center'
			   },
			   tooltip: {
				 trigger: 'item',
				 formatter: "{a} <br/>{b} : {c} ({d}%)",
			   },
			   legend: {
				 data: ['不合格', '合格', '中等', '良好', '优秀'],
				 left:"center",                              
				 top:"bottom",                              
				 orient:"horizontal",                        
			   },
			   series: [
				 {
				   name: '访问来源：工作量统计表',
				   type: 'pie',
				   radius: ['50%', '70%'],
				   center: ['50%', '50%'],
				   data: [
					 {value: this.grade1, name: '不合格'},
					 {value: this.grade2, name: '合格'},
					 {value: this.grade3, name: '中等'},
					 {value: this.grade4, name: '良好'},
					 {value: this.grade5, name: '优秀'}
				   ],
				   animationEasing: 'cubicInOut',
				   animationDuration: 2600,
				   label: {           
					 emphasis: mylabel
				   }
				 }
			   ]
			 });
		   }
		 },
	created() {
		let that = this
		this.$axios.get("http://localhost:8080/doctorworkload/allinfo").then(function(res){	 //每日工作量数据
			console.log(res.data);
			for(let i in res.data) {
				let doc = res.data[i]
				let index1 = doc.patient + doc.invoice
				let index2 = doc.chineseHerbalMedicine+doc.chinesePatentMedicine
								+doc.examination+doc.inspection+doc.registration+
								+doc.treatment+doc.westernMedicine
				if(index1<15 || index2<1200){
					that.grade1++
				}else if(index1<17 || index2<1500) {
					that.grade2++
				}else if(index1<19 || index2<1800) {
					that.grade3++
				}else if(index1<21 || index2<2000) {
					that.grade4++
				}else {
					that.grade5++
				}
			}
			that.$nextTick(() => {
				that.drawPieChart();
			})
		})
		this.$axios.get("http://localhost:8080/doctorworkload/docinfo").then(function(res){	//累计工作量数据
			that.tableData=res.data
		})
	}
}
</script>

<style lang='less' scope>
    .pie-wrap{
        width:100%;
        height:400px;
    }
</style>