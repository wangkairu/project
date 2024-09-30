import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import Vant from 'vant';
import "./icons"; // icon
import 'vant/lib/index.css';
import '@/style/index.less';
import './router/permission'
import moment from "moment"
Vue.prototype.$moment = moment;
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
