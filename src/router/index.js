import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
import workOrderRouter from './modules/dashboard'
import receiveRouter from './modules/receive'
import initialTestRouter from './modules/initial-test'
import tableRouter from './modules/test'
import repairRouter from './modules/repair'
import storageRouter from './modules/storage'
import deliverRouter from './modules/deliver'
import obtainRouter from "./modules/obtain"
import returnRouter from './modules/return'
import queryRouter from "./modules/query"
import basicRouter from './modules/basic-data'
import settingRouter from './modules/setting'
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    meta: {
      title: 'dashboard',
      icon: 'attract'
    },
    hidden:true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        hidden:true
      }
    ]
  },
  workOrderRouter,
  receiveRouter,
  initialTestRouter,
  repairRouter,
  tableRouter,
  storageRouter,
  deliverRouter,
  obtainRouter,
  returnRouter,
  queryRouter,
  basicRouter,
  settingRouter,

]

export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
//console.log(localStorage.getItem('menuList'))
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
router.beforeEach(async(to,from,next)=>{
  if(to.path=="/login"){
    next();
  }else{
    if(localStorage.getItem('token')){
      next()
    }else{
      next({path:"/login"})
    }
  }
})

export default router
