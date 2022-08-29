export default [
	{
		path: '/basic',
		component: () => import('@/views/basicInfoMaintenance'),
		children: [{
			path: '/basic/index',
			component: () => import('@/components/BasicInfoMaintenance/index'),
		},{
			path: '/basic/departmentSearch',
			component: () => import('@/components/BasicInfoMaintenance/departmentSearch'),
		},{
			path: '/basic/addDepartment',
			component: () => import('@/components/BasicInfoMaintenance/newDepartment'),
		},{
			path: '/basic/registLevelSearch',
			component: () => import('@/components/BasicInfoMaintenance/registLevelSearch'),
		},{
			path: '/basic/addRegistLevel',
			component: () => import('@/components/BasicInfoMaintenance/newRegistLevel'),
		},{
			path: '/basic/employeeSearch',
			component: () => import('@/components/BasicInfoMaintenance/employeeSearch'),
		},{
			path: '/basic/addEmployee',
			component: () => import('@/components/BasicInfoMaintenance/newEmployee'),
		},{
			path: '/basic/diseaseSearch',
			component: () => import('@/components/BasicInfoMaintenance/diseaseSearch'),
		},{
			path: '/basic/nondrugCharge',
			component: () => import('@/components/BasicInfoMaintenance/nondrugCharge'),
		},{
			path: '/basic/newNondrugCharge',
			component: () => import('@/components/BasicInfoMaintenance/newNondrugCharge'),
		},{
			path: '/basic/showScheduling',
			component: () => import('@/components/BasicInfoMaintenance/showScheduling'),
		},{
			path: '/basic/newScheduling',
			component: () => import('@/components/BasicInfoMaintenance/newScheduling'),
		}]
	}
]
