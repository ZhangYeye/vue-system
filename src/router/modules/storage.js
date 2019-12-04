
import Layout from '@/layout'

const storageRouter = {
  path: '/store-bills',
  component: Layout,
  redirect: 'noRedirect',
  name: 'store',
  meta: {
    title: 'store',
    icon: 'files'
  },
  children: [{
    path: 'store-bill-edit',
    component: () => import('@/views/store-bills/store-bill-edit'),
      name: 'storeEdit',
      meta: { title: 'storeEdit'}
    },
    {
      path: 'store-bill-list',
      component: () => import('@/views/store-bills/store-bill-list'),
      name: 'storeList',
      meta: { title: 'storeList'},
    }]
}

export default storageRouter
