
import Layout from '@/layout'

const deliverRouter = {
  path: '/deliver',
  component: Layout,
  redirect: 'noRedirect',
  name: 'deliver',
  meta: {
    title: 'deliver',
    icon: 'shopping'
  },
  children: [{
      path: 'examine-bill-edit',
      component: () => import('@/views/deliver-bills/examine-bill-edit'),
      name: 'examineEdit',
      meta: { title: 'examineEdit' }
    },
    {
      path: 'examine-bill-list',
      component: () => import('@/views/deliver-bills/examine-bill-list'),
      name: 'examineList',
      meta: { title: 'examineList' }
    },
    {
      path: 'deliver-bill-edit',
      component: () => import('@/views/deliver-bills/deliver-bill-edit'),
      name: 'deliverEdit',
      meta: { title: 'deliverEdit' }
    },
    {
      path: 'deliver-bill-list',
      component: () => import('@/views/deliver-bills/deliver-bill-list'),
      name: 'deliverList',
      meta: { title: 'deliverList' }
    }]
}

export default deliverRouter
