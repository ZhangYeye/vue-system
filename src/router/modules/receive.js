
import Layout from '@/layout'

const receiveRouter = {
  path: '/receive-manage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'receiveManage',
  meta: {
    title: 'receiveManage',
    icon: 'suitcase'
  },
  children: [
    {
      path: 'arrival-bill-edit',
      component: () => import('@/views/receive-bills/arrival-bill-edit'),
      name: 'arrivalEdit',
      meta: { title: 'arrivalEdit' }
    },
    {
      path: 'arrival-bill-list',
      component: () => import('@/views/receive-bills/arrival-bill-list'),
      name: 'arrivalList',
      meta: { title: 'arrivalList' }
    },{
      path:'arrival-bill-info',
      component: () => import('@/views/receive-bills/info/arrival-bill-info'),
      name:'arrivalInfo',
      meta:{title:'arrivalInfo'},
      hidden:true
    },{
      path: 'accept-bill-edit',
      component: () => import('@/views/receive-bills/accept-bill-edit'),
      name: 'acceptEdit',
      meta: { title: 'acceptEdit' }
    },
    {
      path: 'accept-bill-list',
      component: () => import('@/views/receive-bills/accept-bill-list'),
      name: 'acceptList',
      meta: { title: 'acceptList' }
    },{
      path:'accept-bill-info',
      component: () => import('@/views/receive-bills/info/accept-bill-info'),
      name:'acceptInfo',
      meta:{title:'acceptInfo'},
      hidden:true
    }
  ]
}

export default receiveRouter
