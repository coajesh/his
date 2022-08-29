<template>
	
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/register' }">现场挂号</el-breadcrumb-item>
		  <el-breadcrumb-item>费用管理</el-breadcrumb-item>
		</el-breadcrumb>
			<h1>
				请输入病历号或者身份证号
				
			</h1>
				<el-card>
			<!-- 搜索框 -->
			  <el-row>
				  <el-col :span="20">
					  <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
					      <el-select v-model="select" slot="prepend" placeholder="请选择">
					        <el-option label="病历号" value="1"></el-option>
					        <el-option label="身份证号" value="2"></el-option>
					      </el-select>
					      <el-button slot="append" icon="el-icon-search"></el-button>
					    </el-input>
				  </el-col>
			  </el-row>
		</el-card>
  
  <template>
  <el-button  @click="open1">发票打印</el-button>
  

  
</template>
</div>
</template>

<script>
  export default {
    methods: {
      open1() {
        this.$confirm('此操作将进行发票打印, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '打印成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }}}
</script>

<style>
</style>