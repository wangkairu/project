import router from '@/router/index'
import { getRoutes } from '../utils/getMenu'
import { getToken } from '@/utils/auth'

// 用来获取后台拿到的路由
const whiteList = ['/login']
var getRouter
router.beforeEach((to, from, next) => {
    localStorage.setItem('toCurrentRoute', to.path)
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: "/" })
        }
        else {

            if (!getRouter) {
                if (getObjArr('menuList')) {
                    getRouter = getObjArr('menuList')//拿到路由
                    routerGo(to, next)
                }
                else {
                    next({ path: "/" })
                }
            }
            else {

                next();
            }


        }
    }
    else {
        // console.log(whiteList.indexOf(to.path) !== -1)
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})

let async = {
    path: '/404',
    component: () => import('../views/404'),
    hidden: true,
}


function routerGo(to, next) {
    // 过滤路由
    let getRouter_1 = getRoutes(getRouter)
    // 动态添加路由
    getRouter_1.forEach((v) => {

        if (v.type === 0) {
            router.options.routes.push(v)
            router.addRoute(v)
        } else {
            router.options.routes[1].children.push(v)

            router.addRoute("Layout", v)
        }
    })
    // router.options.routes.push(async)
    // router.addRoute(async)

    // 将路由数据传递给全局变量，左侧边栏菜单渲染工作
    global.antRouter = router.options.routes
    console.log(global.antRouter, 'global.antRouter')
    next({ ...to, replace: true })
}

function getObjArr(name) {

    return JSON.parse(localStorage.getItem(name))
}