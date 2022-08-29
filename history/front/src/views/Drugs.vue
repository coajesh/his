<template>
	<el-container class="home-container">
		<!--头部区域 -->
		<el-header>
			<div>
				<img src="../assets/logo.png" alt="" style="height:60px" />
				<span>东软云医院</span>
			</div>
			<el-button type="info" @click="logout">退出</el-button>
		</el-header>
		<!-- 页面主体区域 -->
		<el-container>
			<!-- 侧边栏 -->
			<el-aside width="200px">

				<!-- 导航菜单 -->
				<el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" :router="true">
					<!-- 一级菜单 -->
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>药房管理</span>
						</template>
						<!-- 二级菜单 -->
						<el-submenu index="1-1">
							<template slot="title">
								<!-- 图标 -->
								<i class="el-icon-menu"></i>
								<!-- 文本 -->
								<span>订单处理</span>
							</template>
							<el-menu-item index="/give-medicine">药房发药</el-menu-item>
							<el-menu-item index="/refund-medicine">药房退药</el-menu-item>
						</el-submenu>
						<!-- 二级菜单 -->
						<el-menu-item index="/manage">
							<template slot="title">
								<!-- 图标 -->
								<i class="el-icon-menu"></i>
								<!-- 文本 -->
								<span>药库管理</span>
							</template>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>

			<!-- 内容主体 -->
			<el-main>
				<!-- 路由占位符 -->
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		name: 'Drugs',
		props: {
			msg: String
		},
		methods: {
			logout() {

			},
			//菜单折叠与展开
			fold() {

			}
		}
	}
</script>

<style scoped>
	.home-container {
		height: 100vh;
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

	.el-header>div {
		display: flex;
		align-items: center;
	}

	.el-aside {
		background-color: #333744;
	}

	.el-main {
		background-color: #EAEDF1;
	}

	.el-aside>.el-menu {
		/* 去除边界 */
		border-right: none;
	}
</style>
