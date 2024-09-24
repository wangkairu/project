import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'
// import permission from './modules/permission'
// import getters from './getters'
// import { getInfo } from '@/api/index'
import {getCustomerAndSpecification} from '@/api/realTime'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // dynamicRoutes: [],
    list:{},
    warehouse:"",
    warehouseCode:"",
    areaCode:"",
    autoAllocate:"",
    obj:{},
  },
  mutations: {
    setList(state,val){
      state.list=val
    },
    setWarehouse(state,val){
      state.warehouse=val
    },
    setWarehouseCode(state,val){
      state.warehouseCode = val
    },
    setAreaCode(state,val){
      state.areaCode=val
    },
    autoAllocate(state,val){
      state.autoAllocate=val
    },
    realObj(state,val){
      state.obj=val
    }
  },
  // getters,
  actions: {
    async realList(context){
      const res = await getCustomerAndSpecification()
      let data=res.data
      context.commit('realObj',data)
    }
  },
  modules: {
    user,
    app,
    // permission
  }
})
