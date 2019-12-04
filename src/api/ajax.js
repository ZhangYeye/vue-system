import request from '@/utils/request'
export function ajax(params) {
  return request({
    method: 'post',
    data:params
  })
}


