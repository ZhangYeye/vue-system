
import Layout from '@/layout'

const returnRouter = {
  path: '/return',
  component: Layout,
  redirect: 'noRedirect',
  name: 'return',
  meta: {
    title: 'return',
    icon: 'delete'
  },
  children: [
    {
      path: 'return-bill-edit',
      component: () => import('@/views/return-bills/return-bill-edit'),
      name: 'returnEdit',
      meta: { title: 'returnEdit' }
    },
    {
      path: 'return-bill-list',
      component: () => import('@/views/return-bills/return-bill-list'),
      name: 'returnList',
      meta: { title: 'returnList' }
    },
    {
      path: 'return-accept-bill-edit',
      component: () => import('@/views/return-bills/return-accept-bill-edit'),
      name: 'returnAcceptEdit',
      meta: { title: 'returnAcceptEdit' }
    },
    {
      path: 'return-accept-bill-list',
      component: () => import('@/views/return-bills/return-accept-bill-list'),
      name: 'returnAcceptList',
      meta: { title: 'returnAcceptList' }
    }
  ]
}
export default returnRouter
