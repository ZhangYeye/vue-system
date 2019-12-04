
import Layout from '@/layout'

const workOrderRouter = {
  path: '/work-order',
  component: Layout,
  redirect:'noRedirect',
  children: [
    {
      path: 'work-order',
      component: () => import('@/views/work-order/index'),
      name: 'workOrder',
      meta: { title: 'workOrder', icon: 'tickets'}
    },{
      path:'bill-info',
      component: () => import('@/views/work-order/bill-info/index'),
      hidden:true
    }
  ]
}
export default workOrderRouter
