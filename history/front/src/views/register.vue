<template>
<el-container style="height: 100%; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
  	<div>
					<img src="../assets/logo.png" alt="" style="height:60px" />
					<span>东软云医院</span>
		</div>
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>现场挂号</template>
         <router-link to="/register/Registering"> <el-menu-item index="1-1">
          	现场挂号</el-menu-item></router-link>
          <router-link to="/register/BackNumber"><el-menu-item index="1-2">
          	 退号
          </el-menu-item>   </router-link>
          
          
          <!--
          	作者：offline
          	时间：2022-08-03
          	描述：test
          	
          -->
          
          <router-link to="/register/showCaseNumber"> <el-menu-item index="1-3">
          	 查询病历号
          </el-menu-item>  </router-link>
          
          
          
          
          
          
        </el-submenu>
      <el-submenu index="2">
         <template slot="title"><i class="el-icon-menu"></i>费用管理</template>
         <router-link to="/register/expensemanage"> <el-menu-item index="2-1">
          费用管理
          </el-menu-item></router-link>

      </el-submenu>
         
      
      <!--
      	发票
      -->



    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
          	 <router-link to="/">登录</router-link> </el-dropdown-item>
          <el-dropdown-item>注册</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>用户</span>
    </el-header>
    
    <el-main>
    	
    	<h1>欢迎进入挂号界面</h1>
		  <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>





<script>
export default {
    name: 'app',
}
</script>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>