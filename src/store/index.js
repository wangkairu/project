import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'
import permission from './modules/permission'
// import getters from './getters'
// import { getInfo } from '@/api/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // dynamicRoutes: []
  },
  mutations: {
  },
  // getters,
  actions: {

  },
  modules: {
    user,
    app,
    permission
  }
})
