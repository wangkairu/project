// import store from '@/store/index'
export default {
    state: {
        dynamicRoutes: [],
    },
    getters: {
        dynamicRoutes(state, payload) {
     
            state.dynamicRoutes = payload
            return state.dynamicRoutes
        }
    },
    mutations: {
        DynamicRoutes(state, payload) {
            state.dynamicRoutes = payload
        },
    },
    actions: {
        dynamicRoutes({ commit }, routes) {
            commit('DynamicRoutes', routes)
        }
    },
    namespaced: true,
}

