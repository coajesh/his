<template>
  <div id="app">
    <el-container class="home-container">
      <!-- 头部顶栏 -->
      <el-header>
        <h1>东软云医院HIS系统</h1>
        <el-button type="primary" @click="logout">退出</el-button>
      </el-header>
      <!-- 内容 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <h3>基础信息维护</h3>
          <el-menu class="el-menu-vertical">
            <el-submenu index="1">
              <template slot="title">
                <i class="fa fa-hospital-o"></i>&nbsp;
                <span>科室管理</span>      
              </template>
              <el-menu-item-group>
                <router-link to="/basic/departmentSearch">
                  <el-menu-item index="1-1">查询</el-menu-item>
                </router-link>
                <router-link to="/basic/addDepartment">
                  <el-menu-item index="1-2">新增</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="fa fa-user-md"></i>&nbsp;
                <span>用户管理</span>      
              </template>
              <el-menu-item-group>
                <router-link to="/basic/employeeSearch">
                  <el-menu-item index="2-1">查询</el-menu-item>
                </router-link>
                <router-link to="/basic/addEmployee">
                  <el-menu-item index="2-2">新增</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                  <i class="fa fa-stethoscope"></i>&nbsp;
                  <span>挂号级别管理</span>      
                </template>
                <el-menu-item-group>
                  <router-link to="/basic/registLevelSearch">
                    <el-menu-item index="3-1">查询</el-menu-item>
                  </router-link>
                  <router-link to="/basic/addRegistLevel">
                    <el-menu-item index="3-2">新增</el-menu-item>
                  </router-link>
                </el-menu-item-group>
            </el-submenu>
            <router-link to="/basic/diseaseSearch">
              <el-menu-item index="4">
                <i class="fa fa-medkit"></i>&nbsp;
                <span slot="title">诊断目录管理</span>                
              </el-menu-item>
            </router-link>
            <el-submenu index="5">
              <template slot="title">
                <i class="fa fa-ambulance"></i>&nbsp;
                <span>非药品项目管理</span>      
              </template>
              <el-menu-item-group>
                <router-link to="/basic/nondrugCharge">
                  <el-menu-item index="5-1">查询</el-menu-item>
                </router-link>
                <router-link to="/basic/newNondrugCharge">
                  <el-menu-item index="5-2">新增</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="fa fa-bell"></i>&nbsp;
                <span>医生排班管理</span>      
              </template>
              <el-menu-item-group>
                <router-link to="/basic/showScheduling">
                  <el-menu-item index="6-1">排班计划</el-menu-item>
                </router-link>
                <router-link to="/basic/newScheduling">
                  <el-menu-item index="6-2">设置排班规则</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 显示内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
    name: 'app',
    methods: {
      logout(){
        this.$router.push('/');
      }
    }
}
</script>

<style scoped>
.el-header{
  position : relative;
  width: 100%;
  height : 60px;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
}

.el-aside {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  }

.el-main {
  position: absolute;
  left: 200px;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
  }

.el-button{
  margin-right:20px;
}
</style>