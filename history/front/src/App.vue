<template>
  <div id="App">
    <div id="nav-item">
      <router-link to="/">登录</router-link> |
	    <router-link to="/basic/index">基础信息维护</router-link> |
	    <router-link to="/drugs">药房</router-link> |
	    <router-link to="/finance">门诊财务管理</router-link>|
	    <router-link to="/register">挂号系统</router-link> |
		<router-link to="/outpatient">门诊医生工作站</router-link>
    </div>
	  <router-view></router-view>
  </div>
</template>

<script>
import LoginPage from '@/views/Login.vue'
export default {
  name: 'App',
  components: {
    LoginPage
  },
  
}
</script>

<style lang="less">
  #App{
    margin: 0;
    padding: 0;
  }

  html{
    height: 100%;
  }

  body{
    height: 100%;
    margin: 0;
    padding: 0;
  }

  router-link-active {     
    text-decoration: none;
  }

  a {
    text-decoration: none;
  }
</style>
