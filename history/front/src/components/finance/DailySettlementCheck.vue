<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/finance' }">门诊财务管理</el-breadcrumb-item>
		  <el-breadcrumb-item>日结核对</el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-card>
			<!-- 搜索框 -->
			<el-row :gutter="30">
				<el-col :span="9">
					收款员：<el-select v-model="label" placeholder="请选择收款员" >
							<el-option
							      v-for="item in options"
							      :key="item.tpyevalue"
							      :label="item.label"
							      :value="item.typevalue">
							    </el-option>
							</el-select>
				</el-col>
				<el-col :span="9">
					统计日期：<el-date-picker
							  v-model="value1"
							  value-format="yyyy-MM-dd"
							  align="right"
							  type="date"
							  placeholder="选择日期"
							  :picker-options="pickerOptions">
							</el-date-picker>
				  </el-col>
				  <el-col :span="6">
					  <el-button @click="submit" type="success" class="el-icon-document-checked" size="medium" circle></el-button>通过
					<el-button @click="dismiss" type="danger" class="el-icon-document-delete" size="medium" circle></el-button>驳回
				  </el-col>
			  </el-row>
		<hr />
		<el-row :gutter="90">
				<el-col :span="4" :offset="8">
					<el-button  @click="getdata" type="primary">查询</el-button>
				</el-col>
				<el-col :span="4">
					<el-button  @click="clear" type="info">清空</el-button>
			   </el-col>
			   </el-row>
		</el-card>
		<h2 align="center">东软云医院门诊收费日结单</h2>
		<hr />
		<!-- <el-empty :image-size="200"></el-empty> -->
		<el-card>
			<el-row :gutter="5">
			<el-col :span="3">日结核对时间：</el-col>
			 <el-col :span="18">
				 <el-input
					v-model="checktime"
					readonly="true"
					suffix-icon="el-icon-date">
				</el-input>
				
			</el-col>
			<el-col :span="3" >
				<div >
					<img src="../../assets/img/checked.png" height="40px" width="78px" v-if="show1"/>
				</div>
				<div >
					<img src="../../assets/img/notcheck.png" height="40px" width="78px" v-if="show2"/>
				</div>
			  </el-col>
		  </el-row>	
		  <hr/>
		  <el-row>
			  <el-col :span="2">制表人：</el-col>
			  <el-col :span="6"><el-input v-model="label" size="mini" style="width:150px;" readonly="true"></el-input></el-col>
			  <el-col :span="2">收款员：</el-col>
			  <el-col :span="6"><el-input v-model="label" size="mini" style="width:150px;" readonly="true"></el-input></el-col>
			  <el-col :span="2">制表时间：</el-col>
			  <el-col :span="6"><el-input v-model="time" size="mini" style="width:235px;" readonly="true"></el-input></el-col>
		  </el-row>
		  <hr />
		  <el-row>
			  <el-col :span="3">起始发票号：</el-col>
			  <el-col :span="1">|</el-col>
			  <el-col :span="10"><el-input v-model="invoice1" size="mini" style="width:840px;" readonly="true"></el-input></el-col>
			  
		  </el-row>
		  <hr />
		  <el-row>
		  		<el-col :span="3">作废发票号：</el-col>	
				  <el-col :span="1">|</el-col>
				  <el-col :span="10"><el-input v-model="invoice2" size="mini" style="width:840px;" readonly="true"></el-input></el-col>
		  </el-row>
		  <hr />
		  <el-row>
		  		<el-col :span="3">重打发票号：</el-col>	  
				<el-col :span="1">|</el-col>
				<el-col :span="10"><el-input v-model="invoice3" size="mini" style="width:840px;" readonly="true"></el-input></el-col>
		  </el-row>
		  <hr />
		  <el-row>
		  		<el-col :span="3">发票汇总：</el-col>
				<el-col :span="1">|</el-col>
				<el-col :span="4">总金额：<el-input v-model="totalamount" size="mini" style="width:90px;" readonly="true"></el-input></el-col>
				<el-col :span="1">|</el-col>
				<el-col :span="4">自费金额：<el-input v-model="selffundedamount" size="mini" style="width:90px;" readonly="true"></el-input></el-col>
				<el-col :span="1">|</el-col>
				<el-col :span="4">自付金额：<el-input v-model="deductible_Amount" size="mini" style="width:90px;" readonly="true"></el-input></el-col>
				<el-col :span="1">|</el-col>
				<el-col :span="4">报销金额：<el-input v-model="reimbursementamount" size="mini" style="width:90px;" readonly="true"></el-input></el-col>
		  </el-row>
		  <hr />
		  <el-row>
		  		<el-col :span="3">药费：</el-col>
				<el-col :span="1">|</el-col>
		  		<el-col :span="4">西药费：<el-input v-model="westernMedicine" size="mini" style="width:100px;" readonly="true"></el-input></el-col>
				<el-col :span="1">|</el-col>
		  		<el-col :span="4">中药费：<el-input v-model="chineseMedicine" size="mini" style="width:100px;" readonly="true"></el-input></el-col>
				<el-col :span="1">|</el-col>
		  </el-row>
		  <hr />
		  <el-row>
		  		<el-col :span="3">共计：</el-col>
				<el-col :span="1">|</el-col>
				<el-col :span="10"><el-input v-model="totalMedicine" size="mini" style="width:840px;" readonly="true"></el-input></el-col>
		  </el-row>
		  <hr />
		  <el-row>
		  		<el-col :span="3">医疗费用：</el-col>
				<el-col :span="1">|</el-col>
		  		<el-col :span="4">挂号费：<el-input v-model="registration" size="mini" style="width:100px;" readonly="true"></el-input></el-col>
				<el-col :span="1">|</el-col>
				<el-col :span="4">检查费：<el-input v-model="examination" size="mini" style="width:100px;" readonly="true"></el-input></el-col>
				<el-col :span="1">|</el-col>
				<el-col :span="4">治疗费：<el-input v-model="treatment" size="mini" style="width:100px;" readonly="true"></el-input></el-col>
				<el-col :span="1">|</el-col>
				<el-col :span="4">住院费：<el-input v-model="hospitalization" size="mini" style="width:100px;" readonly="true"></el-input></el-col>
		  </el-row>
		  <hr />
		  <el-row>
		  			  <el-col :span="3">共计：</el-col>
					 <el-col :span="1">|</el-col>
					 <el-col :span="10"><el-input v-model="medicalcosts" size="mini" style="width:840px;" readonly="true"></el-input></el-col>
		  </el-row>
		  <hr />
		  <el-row>
		  		<el-col :span="3">总业务收入：</el-col>
				<el-col :span="1">|</el-col>
		  		<el-col :span="4">现金：<el-input v-model="total" size="mini" style="width:100px;" readonly="true"></el-input></el-col>  
				<el-col :span="1">|</el-col>
		  </el-row>
		  <hr />
		  <el-row>
		  		<el-col :span="3">共计：</el-col>
				<el-col :span="1">|</el-col>
				<el-col :span="4">(大写) <el-input v-model="total1" size="mini" style="width:100px;" readonly="true"></el-input></el-col>
				<el-col :span="1">|</el-col>
				<el-col :span="4">(小写) <el-input v-model="total" size="mini" style="width:100px;" readonly="true"></el-input></el-col>
				<el-col :span="1">|</el-col>
		  </el-row>
		</el-card>
	</div>
</template>

<script>
export default{
	data() {
		 return {
			pickerOptions: {
			          disabledDate(time) {
			            return time.getTime() > Date.now();
			          },
			          shortcuts: [{
			            text: '今天',
			            onClick(picker) {
			              picker.$emit('pick', new Date());
			            }
			          }, {
			            text: '昨天',
			            onClick(picker) {
			              const date = new Date();
			              date.setTime(date.getTime() - 3600 * 1000 * 24);
			              picker.$emit('pick', date);
			            }
			          }, {
			            text: '一周前',
			            onClick(picker) {
			              const date = new Date();
			              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
			              picker.$emit('pick', date);
			            }
			          }]
			        },
				value1: '',
			
		     options: [{
				typevalue: '赵会计',
				label: '赵会计'
			},
			{
				typevalue: '钱会计',
				label: '钱会计'
			}, 
			{
				typevalue: '孙出纳',
				label: '孙出纳'
			}, 
			{
				typevalue: '李出纳',
				label: '李出纳'
		    }],
			select: '',
			label: '',
			time: '',
			checktime: '',
			invoice1: '',
			invoice2: '',
			invoice3: '',
			totalamount: '',
			selffundedamount: '',
			deductible_Amount: '',
			reimbursementamount: '',
			westernMedicine: '',
			chineseMedicine: '',
			totalMedicine: ',',
			registration: '',
			examination: '',
			treatment: '',
			hospitalization: '',
			medicalcosts: '',
			total: '',
			total1: '',
			show1: false,
			show2: false,
			mark: '',
		}
	},
	methods: {
		clear() {
			this.label = ''
			this.value1 = ''
		},
		getdata() {
			this.show1 = false
			this.show2 = false
			this.checktime = ''
			if(this.label=='' || this.label == null) {
				this.$message.error('请选择收款员');
			}else if(this.value1=='' || this.value1 == null) {
				this.$message.error('请选择日期');
			}else{	//收款员和日期都输入进行查找
				var date = new Date();
				var year = date.getFullYear(); //月份从0~11，所以加一
				var dateArr = [date.getMonth() + 1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()];
				for(var i=0;i<dateArr.length;i++){
					if (dateArr[i] >= 1 && dateArr[i] <= 9) { 
						dateArr[i] = "0" + dateArr[i];
					}
				}
				this.time = year+'-'+dateArr[0]+'-'+dateArr[1]+' '+dateArr[2]+':'+dateArr[3]+':'+dateArr[4];
				let c = this.label
				let d = this.value1
				let that = this
				this.$axios.get("http://localhost:8080/dailycheck/searchinfo?cashier="+c+"&date="+d).then(function(res){
					console.log(res.data);
					if(res.data.length == 0){//没搜到
						that.$message('未查询到'+that.label+'该日门诊收费日结单');
						that.invoice1 = ''
						that.invoice2 = ''
						that.invoice3 = ''
						that.totalamount = ''
						that.selffundedamount = ''
						that.deductible_Amount = ''
						that.reimbursementamount = ''
						that.westernMedicine = ''
						that.chineseMedicine = ''
						that.totalMedicine = ''
						that.registration = ''
						that.examination = ''
						that.treatment = ''
						that.hospitalization = ''
						that.medicalcosts = ''
						that.total = ''
						that.total1 = ''
					}
					else {
						that.invoice1 = res.data[0].originalInvoice
						that.invoice2 = res.data[0].voidInvoice
						that.invoice3 = res.data[0].newInvoice
						that.totalamount = res.data[0].totalAmount
						that.selffundedamount = res.data[0].selffundedAmount
						that.deductible_Amount = res.data[0].deductibleAmount
						that.reimbursementamount = res.data[0].reimbursementAmount
						that.westernMedicine = res.data[0].westernMedicine
						that.chineseMedicine = res.data[0].chineseMedicine
						that.totalMedicine = that.westernMedicine +that.chineseMedicine 
						that.registration = res.data[0].registration
						that.examination = res.data[0].examination
						that.treatment = res.data[0].treatment
						that.hospitalization = res.data[0].hospitalization
						that.medicalcosts = that.registration +that.examination +that.treatment +that.hospitalization
						that.total = that.totalMedicine + that.medicalcosts
						that.total1 = that.smallToBIG(that.total)
						if(res.data[0].checkMark == 1){	//已核对，核对时间转YY-mm-dd HH:mm:ss
							that.show1 = true
							var date=new Date(res.data[0].checkDate);
							var year=date.getFullYear();
							var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
							var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
							var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
							var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
							var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
							// 拼接
							that.checktime = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
							console.log(that.checktime);
		
						} else {
							that.show2 = true
						}
					}
				})
			}
			},
			smallToBIG(price) {
			        let fraction = ['角', '分'];
			        let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
			        let unit = [['圆', '万,', '亿,'], ['', '拾', '佰', '仟']];
			        let head = price < 0 ? '欠' : '';
			        price = Math.abs(price);
			        let upper = '';
			        for (let i = 0; i < fraction.length; i++) {
			          upper += (digit[Math.floor(price * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
			        }
			        upper = upper || '整';
			        price = Math.floor(price);
			        for (let i = 0; i < unit[0].length && price > 0; i++) {
			          let p = '';
			          for (let j = 0; j < unit[1].length && price > 0; j++) {
			            p = digit[price % 10] + unit[1][j] + p;
			            price = Math.floor(price / 10);
			          }
			          upper = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + upper;
			        }
			        return head + upper.replace(/(零.)*零圆/, '圆').replace(/(零.)+/g, '零').replace(/^整$/, '零圆整')
			      },
		submit() {
			if(this.show1 == true){
				this.$message.error('核对已通过，请勿重复操作');
			} else {
				var date = new Date();
				var year = date.getFullYear(); //月份从0~11，所以加一
				var dateArr = [date.getMonth() + 1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()];
				for(var i=0;i<dateArr.length;i++){
					if (dateArr[i] >= 1 && dateArr[i] <= 9) { 
						dateArr[i] = "0" + dateArr[i];
					}
				}
				let cd  = year+'-'+dateArr[0]+'-'+dateArr[1]+' '+dateArr[2]+':'+dateArr[3]+':'+dateArr[4];
				let c = this.label
				let d = this.value1
				let that = this
				this.$axios.get("http://localhost:8080/dailycheck/submit?cashier="+c+"&date="+d+"&checkdate="+cd).then(function(res){
					console.log(res.data);
					if(res.data == 1) {
						that.show1 = true
						that.show2 = false
						that.checktime = cd
						that.$message({
								  message: '日结核对成功，完成财务入库',
								  type: 'success'
								});
					}else {
						that.$message.error('提交失败');
					}
						
				})
			}
		},
		dismiss() {
			if(this.show2 == true) {
				this.$message.error('核对未通过，驳回操作失败');
			}else{
				let c = this.label
				let d = this.value1
				let that = this
				this.$axios.get("http://localhost:8080/dailycheck/dismiss?cashier="+c+"&date="+d).then(function(res){
					console.log(res.data);
					if(res.data == 1) {
						that.show1 = false
						that.show2 = true
						that.checktime = ''
						that.$message({
								  message: '日结核对已驳回',
								  type: 'success'
								});
					}else {
						that.$message.error('驳回失败');
					}
				})
			}
		}
	}
}
</script>

<style scoped>
</style>