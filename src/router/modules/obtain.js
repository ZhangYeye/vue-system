
import Layout from '@/layout'

const obtainRouter = {
  path: '/obtain',
  component: Layout,
  redirect: 'noRedirect',
  name: 'obtain',
  meta: {
    title: 'obtain',
    icon: 'checked'
  },
  children: [{
      path: 'obtain-bill-edit',
      component: () => import('@/views/obtain-bills/obtain-bill-edit'),
      name: 'obtainEdit',
      meta: { title: 'obtainEdit', noCache: true }
    }, {
      path: 'obtain-bill-list',
      component: () => import('@/views/obtain-bills/obtain-bill-list'),
      name: 'obtainList',
      meta: { title: 'obtainList', noCache: true }
    },
    {
      path: 'obtain-pick-bill-edit',
      component: () => import('@/views/obtain-bills/obtain-pick-bill-edit'),
      name: 'obtainPickEdit',
      meta: { title: 'obtainPickEdit', noCache: true }
    },
    {
      path: 'obtain-pick-bill-list',
      component: () => import('@/views/obtain-bills/obtain-pick-bill-list'),
      name: 'obtainPickList',
      meta: { title: 'obtainPickList', noCache: true }
    },
    {
      path: 'obtain-accept-bill-edit',
      component: () => import('@/views/obtain-bills/obtain-accept-bill-edit'),
      name: 'obtainAcceptEdit',
      meta: { title: 'obtainAcceptEdit', noCache: true }
    },
    {
      path: 'obtain-accept-bill-list',
      component: () => import('@/views/obtain-bills/obtain-accept-bill-list'),
      name: 'obtainAcceptList',
      meta: { title: 'obtainAcceptList', noCache: true }
    }]
}
export default obtainRouter
