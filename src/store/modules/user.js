import {ajax} from '@/api/ajax'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { asyncRoutes, constantRoutes } from '@/router'
import {lang,aticket,svc} from '@/store/attr'
import {system} from "../attr";
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  routes: constantRoutes,
  systemList:''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_SYSTEMLIST: (state, list) => {
    state.systemList = list
  },
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    const head = {
      svc: svc,
      cmd: 'login',
      lang:lang
    }
    const body = {
      system: system,
      aname: username,
      apass: password
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        localStorage.setItem('account',response.account.aname)
        localStorage.setItem('token',response.aticket)
        resolve()
      })
        .catch(error => {
        reject(error)
      })
    })
  },
  // 获取Menu
  getMenuList({commit}) {
    const head = {
        svc: svc,
        cmd: 'authed_menu_list',
        lang:lang,
        aticket:aticket
    }
      const body = {
        system:system
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        localStorage.setItem('menuList',JSON.stringify(response.menuList))
        resolve()
      }).catch(error => {
        reject(error.message)
      })
    })
  },

  // 获取systemMenu
  getSystemList({commit}) {
    const head = {
        svc: svc,
        cmd: 'authed_system_list',
        lang:lang,
        aticket:aticket
    }
    const body = {}
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        commit('SET_SYSTEMLIST',response)
        resolve()
      }).catch(error => {
        reject(error.message)
      })
    })
  },
  
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      ajax(state.token).then(response => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      ajax(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  

  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
