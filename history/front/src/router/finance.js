export default [
	{
		path: '/finance',
		component: () => import('@/views/OutpatientFinance'),
		children: [
			{
				path: '/finance/manage',
				component: () => import('@/components/finance/Manage'),
			},
			{
				path: '/finance/check',
				component: () => import('@/components/finance/DailySettlementCheck'),
			},
			{
				path: '/finance/doctor-workload',
				component: () => import('@/components/finance/DoctorWorkload'),
			},
			{
				path: '/finance/department-workload',
				component: () => import('@/components/finance/DepartmentWorkload'),
			},
		]
	}
]
