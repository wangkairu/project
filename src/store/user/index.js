import { userAppLogin } from '@/api/index'
import { setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router/index'
export const user = {
    namespaced: true,
    state: {

    },
    mutations: {

    },
    actions: {
        async submit({ commit }, ruleForm) {
            await userAppLogin({ loginName: ruleForm.loginName, passWord: ruleForm.passWord }).then(res => {
                const data = res.data
                setToken(data.data.token)
                localStorage.setItem('data', JSON.stringify(res.data))
                sessionStorage.setItem('menuVoList', JSON.stringify(data.data.menuVoList))
            })
        },
        restToken({ commit }) {
            localStorage.clear()
            sessionStorage.clear()
            removeToken()
            resetRouter()
            location.reload()
        }
    },
    getters: {

    }
}