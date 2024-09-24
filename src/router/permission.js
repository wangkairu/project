import router from '@/router/index'
import { getRoutes } from '../utils/getMenu'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
// import Layout from '@/layout'
// 用来获取后台拿到的路由
const whiteList = ['/login']
var getRouter
router.beforeEach((to, from, next) => {
    localStorage.setItem('toCurrentRoute', to.path)
    document.title = getPageTitle(to.meta.title);
        if (getToken()) {
            if(whiteList.indexOf(to.path) !== -1){
                next({path:"/"})
            }
            else{
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
        } else {
                if (to.path.includes('/dataTable')) {
                    next()
                }
                 // 如果已登录且路由地址在白名单中，则重定向到主页去
                 else if (whiteList.indexOf(to.path) !== -1) {
                    console.log(222)
                    next()
                }
                // 如果已登录且路由地址不在白名单中，则直接进入该路由地址
                else {
                    console.log(333)
                    next('/login')
                }
    
        }
   
   
})

const async = [
    {
        path: '/404',
        component: () => import('../views/404'),
        hidden: true,
    }, {
        path: "*",
        redirect: "/404",
        hidden: true,
    }
]

function routerGo(to, next) {
    // 过滤路由
    let getRouter_1 = getRoutes(getRouter)
    // 动态添加路由
    getRouter_1.forEach((v) => {
        if (v.type === 0) {
            router.options.routes.push(v)
            router.addRoute(v)
        } else if (v.type === 1) {
            router.options.routes[1].children.push(v)
            router.addRoute("Layout",v)
        }
    })
    async.forEach((v) => {
        router.options.routes.push(v)
        router.addRoute(v)
    })
    // // 将路由数据传递给全局变量，左侧边栏菜单渲染工作
    global.antRouter = router.options.routes
    next({ ...to, replace: true })
}

function getObjArr(name) {
    return JSON.parse(sessionStorage.getItem(name))
}