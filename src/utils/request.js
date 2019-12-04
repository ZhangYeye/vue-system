import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  withCredentials:false
})

service.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)


service.interceptors.response.use(
  response => {
    const resHead = response.data.head
    const resBody = response.data.body
    if (resHead.code !== 0) {
      Message({
        message: resHead.message || 'error',
        type: 'error',
        duration: 5 * 1000
      })
      if (resHead.code === 50008 || resHead.code === 50012 || resHead.code === 50014) {
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
        })
      }
      return Promise.reject(resHead.message || 'error')
    } else {
      return resBody
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
