import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import * as echarts from 'echarts'; 
import 'element-ui/lib/theme-chalk/index.css'
import './assets/CSS/global.css'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'
                        

Vue.use(VueAxios,axios)
Vue.prototype.$axios=axios;
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

