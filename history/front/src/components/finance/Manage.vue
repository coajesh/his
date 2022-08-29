<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/finance' }">门诊财务管理</el-breadcrumb-item>
		  <el-breadcrumb-item>费用科目管理</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片区域 -->
		<el-card>
			<!-- 搜索框 -->
			<el-row :gutter="40">
				<el-col :span="8">
					<el-input v-model="inputname" placeholder="请输入费用科目名称" prefix-icon="el-icon-search"></el-input>
				</el-col>
				<el-col :span="8">
					<el-input v-model="inputcode" placeholder="请输入费用科目编码" prefix-icon="el-icon-search" ></el-input>
				</el-col>
				<el-col :span="8">
					分类：<el-select v-model="typevalue" placeholder="请选择类别" >
							<el-option
							      v-for="item in options"
							      :key="item.tpyevalue"
							      :label="item.label"
							      :value="item.typevalue">
							    </el-option>
							</el-select>
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
		<hr>
		<el-button @click="InsertdialogVisible=true" type="primary">增加费用科目</el-button>
		<el-button @click="modifyexpense" type="warning">修改费用科目</el-button>
		<el-button @click="delSelectionRows()" type="danger">删除费用科目</el-button>
		<el-button @click="select" type="success" style="float: right;">选择</el-button>
		<hr>
		<el-card>
			<el-table
				:data="expenseinfo"   
				@selection-change="hsc"
				stripe="true"
			    style="width: 100%">
				<el-table-column
				    type="selection"
				    width="55"
					v-if="show">
				</el-table-column>
				<el-table-column
				  prop="id"
				  label="序号"
				  width="150">
				</el-table-column>
			    <el-table-column
			      prop= "expenseCode"
			      label="科目编码"
			      width="180">
			    </el-table-column>
			   <el-table-column
			      prop="expenseName"
			      label="科目名称"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="expensePrice"
			      label="参考价格"
				   width="150">
			    </el-table-column>
				<el-table-column
				  prop="expenseDescription"
				  label="费用描述">
				</el-table-column>
			  </el-table>
		</el-card>
		
		<!-- 修改对话框 -->
		<el-dialog
			title="修改费用科目"
			:visible.sync="dialogVisible"
			width="30%">
			<el-form  label-width="80px">
				<el-form-item label="名称">
					<el-input v-model="Form.name"></el-input>
				</el-form-item>
				<el-form-item label="编码">
					<el-input v-model="Form.code"></el-input>
				</el-form-item>
				<el-form-item label="参考价格">
					<el-input v-model="Form.price"></el-input>
				</el-form-item>
				<el-form-item label="费用描述">
					<el-input type="textarea" v-model="Form.description"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="domodify">提交</el-button>
					<el-button @click="close()">取消</el-button>
				</el-form-item>
			</el-form>
			</el-dialog>
		
		<!-- 添加对话框 -->
		<el-dialog
			title="添加费用科目"
			:visible.sync="InsertdialogVisible"
			width="30%">
			<el-form  label-width="80px">
				<el-form-item label="名称">
					<el-input v-model="Form.name"></el-input>
				</el-form-item>
				<el-form-item label="编码">
					<el-input v-model="Form.code"></el-input>
				</el-form-item>
				<el-form-item label="参考价格">
					<el-input v-model="Form.price"></el-input>
				</el-form-item>
				<el-form-item label="费用描述">
					<el-input type="textarea" v-model="Form.description"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="addexpense">提交</el-button>
					<el-button @click="close()">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default{
	data() {
		 return {
		     options: [{
				typevalue: '检查费',
				label: '检查费'
		    }, 
			{
				typevalue: '材料费',
				label: '材料费'
		    }],
		    typevalue: '',
			inputname: '',
			inputcode: '',
			price: '',
			description: '',
			show: false,
			InsertdialogVisible:false,
			dialogVisible: false,
			Form: {
				code: '',
				name: '',
				price: '',
				description: ''
			},
			InsertRow:{},
			delArr: [],
			expenseinfo: [],
		}
	},
	methods: {
		clear(){
			this.inputname = ''
			this.inputcode = ''
			this.typevalue = ''
		},
		search() {
			let c = this.inputcode
			let n = this.inputname
			let t = this.typevalue
			let that = this
			this.$axios.get("http://localhost:8080/expenseinfo/searchinfo?code="+c+"&name="+n+"&type="+t).then(function(res){
				console.log(res.data);
				that.expenseinfo=res.data
			})
		},
		close() {
			this.InsertdialogVisible=false
			this.dialogVisible=false
			this.Form.code=''
			this.Form.name=''
			this.Form.price=''
			this.Form.description=''
		},
		addexpense() {
			this.InsertdialogVisible = false
			let c = this.Form.code
			let n = this.Form.name
			let p = this.Form.price
			let d = this.Form.description
			let that = this
			console.log("<<<<"+c);
			console.log("<<<<"+n);
			console.log("<<<<"+p);
			console.log("<<<<"+d);
			this.$axios.get("http://localhost:8080/expenseinfo/insertinfo?code="+c+"&name="+n+"&price="+p+"&description="+d).then(function(res){
				console.log(res.data);
				if(res.data == 1){
					that.$message({
						  message: '添加成功！',
						  type: 'success'
						});
					that.$axios.get("http://localhost:8080/expenseinfo/allinfo").then(function(res){
							that.expenseinfo=res.data
						})
						
				}else{
					that.$message.error('添加失败');
				}
			})
			//插入后清空对话框
			this.Form.code=''
			this.Form.name=''
			this.Form.price=0
			this.Form.description=''
		},
		modifyexpense() {
			if(!this.show || this.delArr.length==0)
				this.$message.error('请选择要修改的费用科目');

			if(this.delArr.length>1) {
				this.$message({
					  message: '请选择一个进行更改！',
					  type: 'warning'
					});
			} else if(this.delArr.length==1){
				this.dialogVisible = true
				let dr = this.delArr[0]
				console.log(dr);
				this.Form.code = dr.expenseCode
				this.Form.name = dr.expenseName
				this.Form.price = dr.expensePrice
				this.Form.description = dr.expenseDescription
			}
		},
		domodify() {
			this.dialogVisible = false
			let dr = this.delArr[0]
			let i = dr.id
			let c = this.Form.code
			let n = this.Form.name
			let p = this.Form.price
			let d = this.Form.description
			let that = this
			this.$axios.get("http://localhost:8080/expenseinfo/updateinfo?id="+i+"&code="+c+"&name="+n+"&price="+p+"&description="+d).then(function(res){
				console.log(res.data);
				if(res.data == 1){
					that.$message({
						  message: '修改成功！',
						  type: 'success'
						});
					for(let j in that.expenseinfo){
						if(that.delArr[0].expenseName==that.expenseinfo[j].expenseName){
							that.expenseinfo[j].expenseCode = that.Form.code
							that.expenseinfo[j].expenseName = that.Form.name 
							that.expenseinfo[j].expensePrice = that.Form.price
							that.expenseinfo[j].expenseDescription = that.Form.description
							//修改后清空对话框
							that.Form.code=''
							that.Form.name=''
							that.Form.price=0
							that.Form.description=''
						}
					}		
				}else{
					that.$message.error('修改失败');
				}
			})
		},
		delSelectionRows(){
			if(!this.show || this.delArr.length==0)
				this.$message.error('请选择要删除的费用科目');
			for(let i in this.delArr){
				let dr=this.delArr[i]   
				for(let j in this.expenseinfo){
					if(dr.expenseName==this.expenseinfo[j].expenseName){
						this.expenseinfo.splice(j,1)
					}
				}
				let id = dr.id
				let that = this
				this.$axios.get("http://localhost:8080/expenseinfo/deleteinfo?id="+id).then(function(res){
					console.log(res.data);
					if(res.data == 1){
						that.$message({
							  message: '删除成功！',
							  type: 'success'
							});
					}else{
						that.$message.error('删除失败');
					}
				})
			}
		},
		select() {
			this.show = !this.show
		},
		hsc(arr){
			this.delArr=arr
		},
		
	},
	created() {
			let that = this
			this.$axios.get("http://localhost:8080/expenseinfo/allinfo").then(function(res){
				console.log(res.data);
				that.expenseinfo=res.data
			})
		}
}
</script>

<style scoped>
</style>