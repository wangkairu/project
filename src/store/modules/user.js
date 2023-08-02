import { getInfo } from '@/api/index'
import { setToken, removeToken } from '@/utils/auth'
// import { filterAsyncRouter, getRoutes } from '@/utils/getMenu_1'
import router, { resetRouter } from '@/router/index'

export default {
    state: {
        val: "",
        menuList: [],
        token: "",
    },
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload
        },
        SET_MENULIST(state, payload) {
            state.menuList = payload
        },
    },
    getters: {
        SET_MENULIST: state => {
            return state.menuList = JSON.parse(localStorage.getItem('menuList')) || []
        },
        SET_ISLOADROUTERS: (state) => {
            return state.isLoadRouters
        }
    },
    actions: {
        async submit({ commit }, ruleForm) {
            const loginName = ruleForm.loginName.trim()
            await getInfo({ loginName: loginName, passWord: ruleForm.passWord }).then(res => {
                const data = res.data

                setToken(data.token)
                commit('SET_TOKEN', data.token)
                commit('SET_MENULIST', data.menuVoList)
                localStorage.setItem('data', JSON.stringify(data))
                localStorage.setItem('menuList', JSON.stringify(data.menuVoList))
            })
        },
        restToken({ commit }) {
            localStorage.clear()
            removeToken()
            // resetRouter()
            location.reload()
        }
    },

    namespaced: true,
}
