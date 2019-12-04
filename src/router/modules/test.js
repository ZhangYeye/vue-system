
import Layout from '@/layout'

const tableRouter = {
  path: '/assemble',
  component: Layout,
  redirect: 'noRedirect',
  name: 'assemble',
  meta: {
    title: 'assemble',
    icon: 'search'
  },
  children: [
    {
      path: 'burnin-bill-edit',
      component: () => import('@/views/assemble-bills/burnin-bill-edit'),
      name: 'burninEdit',
      meta: { title: 'burninEdit' }
    },
    {
      path: 'burnin-bill-list',
      component: () => import('@/views/assemble-bills/burnin-bill-list'),
      name: 'burninList',
      meta: { title: 'burninList' }
    },
  ]
}
export default tableRouter
