import Layout from '@/layout'

const basicRouter = {
  path: '/basic-data',
  component: Layout,
  redirect: 'noRedirect',
  name: 'basicData',
  meta: {
    title: 'basicData',
    icon: 'coin'
  },
  children: [
    {
      path: 'bom',
      component: () => import('@/views/basic-data/BOM'),
      name: 'bom',
      meta: {title: 'bom'}
    }, {
      path: 'product',
      component: () => import('@/views/basic-data/product'),
      name: 'product',
      meta: {title: 'product'}
    }, {
      path: 'issue-code',
      component: () => import('@/views/basic-data/issue-code-list'),
      name: 'issueCode',
      meta: {title: 'issueCode'}
    }, {
      path: 'product-alias-list',
      component: () => import('@/views/basic-data/product-alias-list'),
      name: 'aliasList',
      meta: {title: 'aliasList'}
    }, {
      path: 'product-define-list',
      component: () => import('@/views/basic-data/product-define-list'),
      name: 'defineList',
      meta: {title: 'defineList'}
    }, {
      path: 'maintain-deadline-list',
      component: () => import('@/views/basic-data/maintain-deadline-list'),
      name: 'deadlineList',
      meta: {title: 'deadlineList'}
    }, {
      path: 'logistics-management',
      component: () => import('@/views/basic-data/logistics-management'),
      name: 'logistics',
      meta: {title: 'logistics'}
    }, {
      path: 'add',
      component: () => import('@/views/basic-data/item/add-item'),
      name: 'addData',
      meta: {title: 'addData'},
      hidden: true
    }, {
      path: 'edit',
      component: () => import('@/views/basic-data/item/edit-item'),
      name: 'editData',
      meta: {title: 'editData'},
      hidden: true
    }
  ]
}
export default basicRouter
