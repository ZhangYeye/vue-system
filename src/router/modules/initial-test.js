
import Layout from '@/layout'

const initialTestRouter = {
  path: '/initial-test',
  component: Layout,
  redirect: 'noRedirect',
  name: 'initialTest',
  meta: {
    title: 'initialTest',
    icon: 'coordinate'
  },
  children: [
    {
      path: 'check-bill-edit',
      component: () => import('@/views/initial-test/check-bill-edit'),
      name: 'checkEdit',
      meta: { title: 'checkEdit', noCache: true }
    },
    {
      path: 'check-bill-list',
      component: () => import('@/views/initial-test/check-bill-list'),
      name: 'checkList',
      meta: { title: 'checkList', noCache: true }
    },
  ]
}

export default initialTestRouter
