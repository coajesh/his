import Drugs from '../views/Drugs.vue'
import Give from '../components/drugs/Give.vue'
import Refund from '../components/drugs/Refund.vue'
import Manage from '../components/drugs/Manage.vue'

export default [
	{
		path:'/drugs',
		name:'drugs',
		component: Drugs,
		children:[
			  {
				  path:'/give-medicine',
				  component:Give
			  },
			  {
				  path:'/refund-medicine',
				  component:Refund
			  },
			  {
				  path:'/manage',
				  component:Manage
			  }
		]
	}
]