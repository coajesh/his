<template>
	<div id="app">
		<el-container>
			<el-header :height="60">
				<div>
					<img src="../assets/logo.png" alt="" style="height:60px" />
					<span>东软云医院</span>
				</div>
			</el-header>
			
			<el-main>
				<el-row class="tac">
					<el-col :span="4">
						<h3>门诊财务管理</h3>
						<el-menu
						class="el-menu-vertical-demo"
						@open="handleOpen"
						@close="handleClose">
						<router-link to="/finance/manage">
							<el-menu-item index="1">
								<i class="el-icon-menu"></i>
									<span slot="title">费用科目管理</span>
							</el-menu-item>
						</router-link>
						<router-link to="/finance/check">
							<el-menu-item index="2">
								<i class="el-icon-document"></i>
									<span slot="title">日结核对</span>
							</el-menu-item>
						</router-link>
							
							<el-submenu index="3">
								<template slot="title">
									<i class="el-icon-location"></i>
										<span>工作量统计</span>      
								</template>
								<el-menu-item-group>
									<router-link to="/finance/doctor-workload">
										<el-menu-item index="3-1">医生工作量</el-menu-item>
									</router-link>
									<router-link to="/finance/department-workload">
										<el-menu-item index="3-2">科室工作量</el-menu-item>
									</router-link>
								</el-menu-item-group>
							</el-submenu>
						</el-menu>
					</el-col>
					<el-col :offset="1" :span="19">
						<router-view></router-view>
					</el-col>
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
export default {
    name: 'app',
}
</script>

<style scoped>
	html,body,#app,.el-container{
				/*设置内部填充为0，几个布局元素之间没有间距*/
				padding: 0px;
				 /*外部间距也是如此设置*/
				margin: 0px;
				/*统一设置高度为100%*/
				height: 100vh;
			}
			
		.el-header>div {
			display: flex;
			align-items: center;
		}
			
		.el-header {
			background-color: #373d41;
			display: flex;
			justify-content: space-between;
			padding-left: 0;
			align-items: center;
			color: #fff;
			font-size: 20px;
		}
		
		
		.el-main {
			background-color: #EAEDF1;
		}
		
		.el-aside {
			background-color: #333744;
		}
		
		.el-aside>.el-menu {
			/* 去除边界 */
			border-right: none;
		}
</style>