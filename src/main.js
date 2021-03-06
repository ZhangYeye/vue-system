import Vue from 'vue'

import Cookies from 'js-cookie'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'default-passive-events'
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang'
import './icons' // icon
// import './permission' // permission control
import './utils/error-log' // error log
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})


