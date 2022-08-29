import outpatient from '../components/outpatient/Outpatient.vue'
import checkpatient from '../components/outpatient/CheckPatient.vue'
import medicalrecord from '../components/outpatient/MedicalRecord.vue'
import confirm from '../components/outpatient/Confirm.vue'
import prescription from '../components/outpatient/Prescription.vue'
import querycost from '../components/outpatient/QueryCost.vue'
		
export default [
	{
		path:'/outpatient',
		name:'outpatient',
		component: outpatient,
		children:[
			{
				path:'/outpatient/checkpatient',
				component:checkpatient
			},
			{
				path:'/outpatient/medicalrecord',
				component:medicalrecord
			},
			{
				path:'/outpatient/confirm',
				component:confirm
			},
			{
				path:'/outpatient/prescription',
				component:prescription
			},
			{
				path:'/outpatient/querycost',
				component:querycost
			}
		]
	}
]