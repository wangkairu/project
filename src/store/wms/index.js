import { userAppLogin } from '@/api/index'
import { setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router/index'
export const wms = {
    namespaced: true,
    state: {
        warehouse:"",
    },
    mutations: {
        setWarehouse(state,payload){
            state.warehouse=payload
        },
    },
    actions: {
    },
    getters: {

    }
}