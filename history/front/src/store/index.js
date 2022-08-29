import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  expenseinfo:{},
	  patientinfo:{}
  },
  getters: {
  },
  mutations: {
	  expenseinfo(state, e){
	  		  state.expenseinfo = e
	  },
	  patientinfo(state,data){
		  state.patientinfo=data
	  }
  },
  actions: {
  },
  modules: {
  }
})
