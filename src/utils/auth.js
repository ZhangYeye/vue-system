import Cookies from 'js-cookie'

export function getToken() {
  return Cookies.get('token')
}

export function setToken(token) {
  return Cookies.set('token', token)
}

export function removeToken() {
  return Cookies.remove('token')
}

export function getLanguage() {
  if(!Cookies.get('language')){
    return 'zh'
  }else{
    return Cookies.get('language')
  }
}
