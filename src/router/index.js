import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: 'layout',
    redirect: "dashboard",
    component: Layout,
    // dashboard
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { title: "首页" },
        component: () => import('../views/dashboard')
      },
      {
        path: "/my",
        name: "my",
        meta: { title: "我的" },
        component: () => import("../views/my")
      }
    ]
  },
  // {
  //   path: "/inventory",
  //   name: "inventory",
  //   meta: { title: "盘点" },
  //   component: () => import('../views/inventory')
  // },
  {
    path: "/inventory/details",
    name: "inventoryDetails",
    meta: { title: "盘点明细" },
    component: () => import('../views/inventory/details')
  },
  {
    path: "/inventory/create",
    name: "inventoryCreate",
    meta: { title: "盘点创建" },
    component: () => import('../views/inventory/create')
  },
  // {
  //   path: "/storage",
  //   name: "storage",
  //   meta: { title: "入库" },
  //   component: () => import('../views/storage')
  // },
  // {
  //   path: "/manualPickup",
  //   name: "manualPickup",
  //   meta: { title: "人工取货" },
  //   component: () => import('../views/manualPickup')
  // },
  // {
  //   path:"/coupon",
  //   name:"coupon",
  //   meta: { title: "返库" },
  //   component:()=>import("../views/coupon")
  // },
  {
    path:"/coupon/detail",
    name:"couponDetail",
    meta: { title: "详情" },
    component:()=>import("../views/coupon/detail")
  },
  {
    path:"/coupon/createDispatch",
    name:"createDispatch",
    meta:{title:"创建发货单"},
    component:()=>import("../views/coupon/createDispatch")
  },
  {
    path:"/coupon/viewCoupon",
    name:"viewCoupon",
    meta:{title:"查看备货区"},
    component:()=>import("../views/coupon/viewCoupon")
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: "登录" },
    component: () => import(/* webpackChunkName: "about" */ '../views/login')
  },
  // {
  //   path:"/cargo",
  //   name:"cargo",
  //   meta:{title:"货物移位"},
  //   component:()=>import(/* webpackChunkName: "about" */ '../views/cargo')
  // },{
  //   path:"/manual",
  //   name:"manual",
  //   meta:{title:"手动入库下发"},
  //   component:()=>import(/* webpackChunkName: "about" */ '../views/manual')
  // },
  // {
  //   path:"/shift",
  //   name:"shift",
  //   meta:{title:"库内移位"},
  //   component:()=>import(/* webpackChunkName: "about" */ '../views/shift')
  // },
  {
    path:"/shift/details",
    name:"shiftDetails",
    meta:{title:"库内移位详情"},
    component:()=>import(/* webpackChunkName: "about" */ '../views/shift/details')
  },
  {
    path:"/shift/create",
    name:"shiftCreate",
    meta:{title:"创建库内移位单"},
    component:()=>import(/* webpackChunkName: "about" */ '../views/shift/create')
  },
  // {
  //   path:"/retrunComplate",
  //   name:"retrunComplate",
  //   meta:{title:"返工完成"},
  //   component:()=>import(/* webpackChunkName: "about" */ '../views/retrunComplate')
  // },
  // {
  //   path:"/returnWork",
  //   name:"returnWork",
  //   meta:{title:"返工"},
  //   component:()=>import(/* webpackChunkName: "about" */ '../views/returnWork')
  // },
  // {
  //   path:"/disableLocation",
  //   name:"disableLocation",
  //   meta:{title:"禁用库位"},
  //   component:()=>import(/* webpackChunkName: "about" */ '../views/disableLocation')
  // },
  // {
  //   path:"/enableLocation",
  //   name:"enableLocation",
  //   meta:{title:"启用库位"},
  //   component:()=>import(/* webpackChunkName: "about" */ '../views/enableLocation')
  // },
  // {
  //   path:"/shipmentComplete",
  //   name:"shipmentComplete",
  //   meta:{title:"发货完成"},
  //   component:()=>import(/* webpackChunkName: "about" */ '../views/shipmentComplete')
  // },
  // {
  //   path:"/allocateStorageOut",
  //   name:"allocateStorageOut",
  //   meta:{title:"调拨出库"},
  //   component:()=>import(/* webpackChunkName: "about" */ '../views/allocateStorageOut')
  // },
  {
    path:"/allocateStorageOut/create",
    name:"allocateStorageOutCreate",
    meta:{title:"创建调拨出库"},
    component:()=>import(/* webpackChunkName: "about" */ '../views/allocateStorageOut/create')
  },
  // {
  //   path:"/allocateStorageIn",
  //   name:"allocateStorageIn",
  //   meta:{title:"调拨入库"},
  //   component:()=>import(/* webpackChunkName: "about" */ '../views/allocateStorageIn')
  // },
  // {
  //   path:"/returnOrder",
  //   name:"returnOrder",
  //   meta:{title:"App返库"},
  //   component:()=>import(/* webpackChunkName: "about" */ '../views/returnOrder')
  // },
  {
    path:"/returnOrder/create",
    name:"returnCreate",
    meta:{title:"返库单创建"},
    component:()=>import(/* webpackChunkName: "about" */ '../views/returnOrder/create')
  },
  {
    path:"/returnOrder/detail",
    name:"returnDetail",
    meta:{title:"返库单明细"},
    component:()=>import(/* webpackChunkName: "about" */ '../views/returnOrder/detail')
  },
  // {
  //   path:"/inspection",
  //   name:"inSpection",
  //   meta:{title:"巡检"},
  //   component:()=>import(/* webpackChunkName: "about" */ '../views/inspection')
  // },
  // {
  //   path:"/abnormal",
  //   name:"abnormal",
  //   meta:{title:"异常入库"},
  //   component:()=>import(/* webpackChunkName: "about" */ '../views/abnormal')
  // }
  // 
]

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),//切换路由始终保持页面顶部
  routes
})
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter();
  // 2. 新用户登录之后从新获取路由列表
  // location.reload()
  router.matcher = newRouter.matcher; //替换成新的空路由
}


export default router
