export default [
	{
		path: '/register',
		component: () => import('@/views/register'),
		children: [
			{
				path: '/register/registering',
				component: () => import('@/components/register/Registering'),
			},
			{
				path: '/register/BackNumber',
				component: () => import('@/components/register/BackNumber'),
			},
			{
				path: '/register/showCaseNumber',
				component: () => import('@/components/register/ShowRegister'),
			},
			{
				path: '/register/invoicemanage',
				component: () => import('@/components/register/InvoiceManage'),
			},
			{
				path: '/register/expensemanage',
				component: () => import('@/components/register/ExpenseManage'),
			},
		]
	}
]
