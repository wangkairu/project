import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import VRouter from 'vue-router'
// import './router/permission'
import './router/permission'
import '@/utils/global'//全局
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AFTableColumn from 'af-table-column'
Vue.use(AFTableColumn)
import '@/style/index.scss'
import '@/utils/btnPremission.js'
import '@/utils/rem.js'
import * as echarts from 'echarts';
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api' 
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.config.productionTip = false
import '@/icons'
new Vue({
  router,
  store,
  render: h => h(App),
  // created(){
  //   store.commit()
  // }
}).$mount('#app')
