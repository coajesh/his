<template class="outpatient">
	<el-container>
		<el-header>
			<div class="header">
				<div class="logo">
					<img src="../../assets/logo.png" alt="" height="60px" />
					<span>东软云医院</span>
				</div>
				<el-dropdown trigger="click">
					<span class="el-dropdown-link">
						更多<i class="el-icon-more el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<!-- <el-dropdown-item icon="el-icon-user-solid">个人信息</el-dropdown-item> -->
						<el-dropdown-item icon="el-icon-back" @click.native="exit()">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>			
		</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu :router="true">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span>门诊医生工作站</span>
						</template>
						<el-menu-item index="/outpatient/checkpatient">查看患者</el-menu-item>
						<el-menu-item index="/outpatient/medicalrecord">门诊病历首页</el-menu-item>
						<el-menu-item index="/outpatient/confirm">门诊确诊</el-menu-item>
						<el-menu-item index="/outpatient/prescription">开设处方</el-menu-item>
						<el-menu-item index="/outpatient/querycost">患者费用查询</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		created() {
			if(sessionStorage.getItem('store')){
				this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem('store'))))
			}
			window.addEventListener('beforeunload',()=>{
				sessionStorage.setItem('store',JSON.stringify(this.$store.state))
			})
		},
		methods:{
			exit(){
				 this.$router.push("/")
			}
		}
	}
</script>

<style scoped>
	.el-header {
		background-color: #373d41;
		justify-content: space-between;
		padding-left: 0;
		align-items: center;
		color: #fff;
		font-size: 20px;
	}

	.el-header>.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.logo{
		display: flex;
		align-items: center;
	}
	
	.el-dropdown-link{
		color: #333;
		font-size: 15px;
	}

	.el-aside {
		background-color: #ffffff;
		color: #333;
		display: block;
		left: 0;
		top: 60px;
	}

	.el-main {
		background-color: #ffffff;
		color: #333;
	}
</style>
