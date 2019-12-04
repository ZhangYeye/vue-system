
import Layout from '@/layout'
const repairRouter = {
  path: '/repair',
  component: Layout,
  redirect: 'noRedirect',
  name: 'repair',
  meta: {
    title: 'repair',
    icon: 'attract'
  },
  children: [
    {
      path: 'repair-bill-edit',
      component: () => import('@/views/repair-bills/repair-bill-edit'), // Parent router-view
      name: 'repairEdit',
      meta: { title: 'repairEdit' },
    },
    {
      path: 'repair-bill-list',
      component: () => import('@/views/repair-bills/repair-bill-list'),
      name: 'repairList',
      meta: { title: 'repairList' }
    },
    {
      path: 'assemble-bill-edit',
      component: () => import('@/views/repair-bills/assemble-bill-edit'), // Parent router-view
      name: 'assembleEdit',
      meta: { title: 'assembleEdit' },
    },
    {
      path: 'assemble-bill-list',
      component: () => import('@/views/repair-bills/assemble-bill-list'),
      name: 'assembleList',
      meta: { title: 'assembleList' }
    }
  ]
}

export default repairRouter
