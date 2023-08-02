import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
// import './permission'
Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login"),
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: "/home",
        name: 'home',
        title: '首页',
        meta: { title: '首页' },
        component: () => import('../views/home'),
      },
    ],
  },
]
export const asyncRoutes = []

const createRouter = () => new VueRouter({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),//切换路由始终保持页面顶部
  // base: process.env.BASE_URL,
  routes: constantRouterMap
})
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; //替换成新的空路由
}


export default router
