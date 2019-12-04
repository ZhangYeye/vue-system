import {getToken, getLanguage} from '@/utils/auth'

export const svc = 'ubs_foundation'
export const svc_base = 'ubs_base'
export const svc_rma = 'rma_base'
export const system = '11'
export const lang = getLanguage()
export const aticket = localStorage.getItem('token')
export const account = localStorage.getItem('account')
