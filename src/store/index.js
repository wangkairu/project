import Vue from 'vue'
import Vuex from 'vuex'
import { user } from './user/index'
import {wms} from './wms/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    warehouse:"",
    options:[],
    areaCode:"",
    code:"",
  },
  mutations: {
  
    setColOptions(state,payload){
      state.options = payload
    },
    setAreaCode(state,payload){
      state.areaCode=payload
    },
    setWarehouse(state,payload){
      state.code=payload
    }
  },
  actions: {
  },
  modules: {
    user,
    wms,
  }
})
