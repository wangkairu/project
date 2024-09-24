import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
// import './permission'
Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: "/login",
    name: "login",
    hidden: true,
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
        meta: { title: '首页', loginRequest: 'true' },
        hidden: false,
        type:1,
        component: () => import('../views/home'),
      },
    ],
  },
  {
    path: '/dataTable/:url',
    name: 'dataTable',
    hidden: true,
    meta: { title: "数据展示" },
    component: () => import("@/views/dataTable")
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
  // 1. 保证 用户退出之后，将路由缓存记录换为/login
  // router.replace({ path: '/login' });
  // 2. 新用户登录之后从新获取路由列表
  location.reload()
  router.matcher = newRouter.matcher; //替换成新的空路由
}

export default router
