import { getInfo } from '@/api/index'
import { setToken, removeToken } from '@/utils/auth'
import { MessageBox, Message } from 'element-ui'
// import { filterAsyncRouter, getRoutes } from '@/utils/getMenu_1'
import router, { resetRouter } from '@/router/index'
import md5 from "js-md5";
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
            const res= await getInfo({ loginName: loginName, passWord: ruleForm.passWord })
            if(res.code==='0'){
                const data = res.data
                setToken(data.token)
                commit('SET_TOKEN', data.token)
                commit('SET_MENULIST', data.menuVoList)
                localStorage.setItem('data', JSON.stringify(data))
                sessionStorage.setItem('menuList', JSON.stringify(data.menuVoList))
                Message({
                    message: res.msg,
                    type: 'success',
                    duration: 1000
                })
            }else{
                Message({
                    message: res.msg,
                    type: 'error',
                    duration: 1000
                })
            }
        },
        restToken({ commit }) {
            localStorage.clear()
            sessionStorage.clear()
            removeToken()
            resetRouter()
            // location.reload()
        }
    },

    namespaced: true,
}
