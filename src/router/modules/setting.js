
import Layout from '@/layout'

const settingRouter = {
  path: '/setting',
  component: Layout,
  redirect: 'noRedirect',
  name: 'setting',
  meta: {
    title: 'setting',
    icon: 'setting'
  },
  children: [{
    path: 'organization-setting',
    component: () => import('@/views/setting/organization-setting'),
    name: 'organization',
    meta: { title: 'organization' }
  }, {
    path: 'site-setting',
    component: () => import('@/views/setting/site-setting'),
    name: 'site',
    meta: { title: 'site' }
  }, {
    path: 'account-setting',
    component: () => import('@/views/setting/account-setting'),
    name: 'account',
    meta: { title: 'account' }
  }, {
    path: 'role-setting',
    component: () => import('@/views/setting/role-setting'),
    name: 'role',
    meta: { title: 'role' }
  },{
    path: 'add',
    component: () => import('@/views/setting/edit/add-item'),
    name: 'addItem',
    meta: { title: 'addItem' },
    hidden:true
  },{
    path: 'edit',
    component: () => import('@/views/setting/edit/edit-item'),
    name: 'editItem',
    meta: { title: 'editItem' },
    hidden:true
  }]
}
export default settingRouter
