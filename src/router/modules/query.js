
import Layout from '@/layout'

const queryRouter = {
  path: '/query',
  component: Layout,
  redirect: 'noRedirect',
  name: 'query',
  meta: {
    title: 'query',
    icon: 'magic-stick'
  },
  children: [
    {
      path: 'product-good-query',
      component: () => import('@/views/query-bills/product-good-query'),
      name: 'goodQuery',
      meta: { title: 'goodQuery' }
    },{
      path: 'product-broken-query',
      component: () => import('@/views/query-bills/product-broken-query'),
      name: 'brokenQuery',
      meta: { title: 'brokenQuery' }
    },{
      path: 'product-scrap-query',
      component: () => import('@/views/query-bills/product-scrap-query'),
      name: 'scrapQuery',
      meta: { title: 'scrapQuery' }
    },{
      path: 'material-query',
      component: () => import('@/views/query-bills/material-query'),
      name: 'materialQuery',
      meta: { title: 'materialQuery' }
    },{
      path: 'return-data-query',
      component: () => import('@/views/query-bills/return-data-query'),
      name: 'dataQuery',
      meta: { title: 'dataQuery' }
    },{
      path: 'deliver-bill-query',
      component: () => import('@/views/query-bills/deliver-bill-query'),
      name: 'deliverQuery',
      meta: { title: 'deliverQuery' }
    },{
      path: 'product-query',
      component: () => import('@/views/query-bills/product-query'),
      name: 'productQuery',
      meta: { title: 'productQuery' }
    },{
      path: 'statistics-development',
      component: () => import('@/views/query-bills/statistics-development'),
      name: 'statistics',
      meta: { title: 'statistics' }
    },{
      path:'product-query-detail',
      component: () => import('@/views/query-bills/detail/product-query-detail'),
      name:'productDetail',
      meta:{title:'productDetail'},
      hidden:true
    }
  ]
}
export default queryRouter
