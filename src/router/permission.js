import router from '@/router/index'
import { getRoutes } from '@/utils/getMenu'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import { Store } from 'vuex'
// 用来获取后台拿到的路由
const whiteList = ['/login']
var getRouter
// router.beforeEach((to, from, next) => {
//     localStorage.setItem('toCurrentRoute', to.path)
//     document.title = getPageTitle(to.meta.title);
//     if (getToken()) {
//         if (to.path === '/login') {
//             next({ path: "/" })
//             // next();
//         }
//         else {
//             if (!getRouter) {
//                 if (getObjArr('menuList')) {
//                     getRouter = getObjArr('menuList')// 拿到路由
//                     routerGo(to, next)
//                 } else {
//                     next({ path: "/" })
//                 }
//             } else {
//                 next();
//             }
//         }
//     } else {
//         if (whiteList.indexOf(to.path) !== -1) {
//             next()
//         } else {
//             next('/login')
//         }
//     }
// })

// const async = [
//     {
//         path: '/404',
//         component: () => import('../views/404'),
//         hidden: true,
//     }, {
//         path: "*",
//         redirect: "/404",
//         hidden: true,
//     }
// ]
// // const error =
// function routerGo(to, next) {
//     // 过滤路由
//     const getRouter1 = getRoutes(getRouter)
//     // 动态添加路由
//     getRouter1.forEach((v) => {
//         if (v.type === 2) {
//             router.options.routes.push(v)
//             router.addRoute(v)
//         }
//         //  else {
//         //     router.options.routes[0].children.push(v)
//         //     router.addRoute("Layout", v)
//         // }
//     })
//     async.forEach((v) => {
//         router.options.routes.push(v)
//         router.addRoute(v)
//     })

//     // 将路由数据传递给全局变量，左侧边栏菜单渲染工作
//     global.antRouter = router.options.routes
//     next({ ...to, replace: true })
// }
// function getObjArr(name) {
//     return JSON.parse(localStorage.getItem(name))
// }

router.beforeEach(async (to, form, next) => {
    document.title = getPageTitle(to.meta.title);
    try {
        // 如果有token 
        if (getToken()) {
            // 如果已登录且路由地址在白名单中，则重定向到主页去
            if (whiteList.indexOf(to.path) !== -1) {
                next('/')
            } else {
                // 如果已登录且路由地址不在白名单中，则直接进入该路由地址
                if(!getRouter){
                    if (getObjArr('menuVoList')) {
                        getRouter = getObjArr('menuVoList')//拿到路由
                        routerGo(to, next)
                    }
                    else {
                        next({ path: "/" })
                    } 
                }
                else{
                    next()
                }
                
            }
        } else {
            // 如果没有登陆且路由地址在白名单当中，则直接进入该路由地址
            if (whiteList.indexOf(to.path) !== -1) {
                next()
            }
            // 如果没有登陆且路由地址不在白名单当中，则重定向到登陆页面
            else {
                next(`/login`)
            }
        }
    } catch (err) {
        // await this.$store.dispatch('user/restToken')
        // Toast(err || 'Has Error');
        next(`/login`)
    }
})



function routerGo(to, next) {
    // 过滤路由
    let getRouter_1 = getRoutes(getRouter)
    // 动态添加路由
    getRouter_1.forEach((v) => {
        if (v.type == 2) {
            router.options.routes.push(v)
            router.addRoute(v)
        }
        //  else if (v.type === 1) {
        //     router.options.routes[1].children.push(v)
        //     router.addRoute("Layout",v)
        // }
    })
    // async.forEach((v) => {
    //     router.options.routes.push(v)
    //     router.addRoute(v)
    // })
    // // 将路由数据传递给全局变量，左侧边栏菜单渲染工作

    global.antRouter = router.options.routes
    next({ ...to, replace: true })
}


function getObjArr(name) {
    return JSON.parse(sessionStorage.getItem(name))
}