import {ajax} from '@/api/ajax'
import {lang,aticket,svc} from '@/store/attr'
const state = {
  orgList:'',
  orgDetail:'',
  siteList:'',
  siteDetail:'',
  accountList:'',
  accountDetail:'',
  roleList:'',
  roleDetail:'',
  privilegeList:'',
  lang:lang,
}

const mutations = {
  SET_ORGLIST: (state, list) => {
    state.orgList = list
  },
  SET_ORGDETAIL: (state, list) => {
    state.orgDetail = list
  },
  SET_SITELIST: (state, list) => {
    state.siteList = list
  },
  SET_SITEDETAIL: (state, list) => {
    state.siteDetail = list
  },
  SET_ACCOUNTLIST: (state, list) => {
    state.accountList = list
  },
  SET_ACCOUNTDETAIL: (state, list) => {
    state.accountDetail = list
  },
  SET_ROLELIST: (state, list) => {
    state.roleList = list
  },
  SET_ROLEDETAIL: (state, list) => {
    state.roleDetail = list
  },
  SET_PRIVILEGELIST: (state, list) => {
    state.privilegeList = list
  },
}

const actions = {
  //组织
  getOrgList({ commit },param) {
    const {start,limit} = param
    const head = {
      svc: svc,
      cmd: 'load_org_list',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      start:start,
      limit:limit,
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        const data = response
        commit('SET_ORGLIST', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getOrgDetail({ commit },orgid){
    const head = {
      svc: svc,
      cmd: 'load_org',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      orgid: orgid,
      withLangs: true,
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        const data = response
        commit('SET_ORGDETAIL',response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveOrg({commit},param){
    const {org,orgLangs} = param
    const head = {
      svc: svc,
      cmd: 'save_org',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      org:{
        orgid:org.orgid,
        code:org.code,
        enabled:org.enabled,
      },
      orgLangs:orgLangs
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        if(response.org){
          window.history.back(-1);
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  enableOrg({commit},param){
    const {orgid,enabled} = param
    const head = {
      svc: svc,
      cmd: 'enable_org',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      orgid:orgid,
      enabled:enabled
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        const data = response
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteOrg({commit},param){
    const head = {
      svc: svc,
      cmd: 'delete_org',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      orgid:param,
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //站点
  getSiteList({ commit },param) {
    const {start,limit,orgid} = param
    const head = {
      svc: svc,
      cmd: 'load_site_list',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      start:start,
      limit:limit,
      orgid:orgid
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        const data = response
        commit('SET_SITELIST', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSiteDetail({ commit },siteid){
    const head = {
      svc: svc,
      cmd: 'load_site',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      sitid: siteid,
      withLangs: true,
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        const data = response
        commit('SET_SITEDETAIL',response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveSite({commit},param){
    const {site,siteLangs} = param
    const head = {
      svc: svc,
      cmd: 'save_site',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      site:{
        sitid:site.sitid,
        orgid:site.orgid,
        code:site.code,
        enabled:site.enabled,
        siteType:site.siteType
      },
      siteLangs:siteLangs
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        if(response.site){
          window.history.back(-1);
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  enableSite({commit},param){
    const {sitid,enabled} = param
    const head = {
      svc: svc,
      cmd: 'enable_site',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      sitid:sitid,
      enabled:enabled
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        const data = response
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteSite({commit},param){
    const head = {
      svc: svc,
      cmd: 'delete_site',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      sitid:param,
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //账号
  getAccountList({ commit },param) {
    const {start,limit,sitid} = param
    const head = {
      svc: svc,
      cmd: 'load_account_list',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      start:start,
      limit:limit,
      sitid:sitid
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        const data = response
        commit('SET_ACCOUNTLIST', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAccountDetail({ commit },accid){
    const head = {
      svc: svc,
      cmd: 'load_account',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      accid: accid,
      withRoles: true,
      withPrivileges: false
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        const data = response
        commit('SET_ACCOUNTDETAIL',response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveAccount({commit},param){
    const {account,rolids} = param
    const head = {
      svc: svc,
      cmd: 'save_account',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      account:{
        accid:account.accid,
        sitid:account.sitid,
        aname:account.aname,
        apass:account.apass,
        secreted:account.secreted,
        enabled:account.enabled,
        remark:account.remark
      },
      rolids:rolids
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        if(response.account){
          window.history.back(-1);
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  enableAccount({commit},param){
    const {accid,enabled} = param
    const head = {
      svc: svc,
      cmd: 'enable_account',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      accid:accid,
      enabled:enabled
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        const data = response
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteAccount({commit},param){
    const head = {
      svc: svc,
      cmd: 'delete_account',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      accid:param,
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //角色
  getRoleList({ commit },param) {
    const {start,limit,sysid} = param
    const head = {
      svc: svc,
      cmd: 'load_role_list',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      start:start,
      limit:limit,
      sysid:sysid
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        commit('SET_ROLELIST', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getRoleDetail({ commit },rolid){
    const head = {
      svc: svc,
      cmd: 'load_role',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      rolid: rolid,
      withLangs: true,
      withAccounts: false,
      withPrivileges: true
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        commit('SET_ROLEDETAIL',response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveRole({commit},param){
    const {role,roleLangs,pvgids} = param
    const head = {
      svc: svc,
      cmd: 'save_role',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      role:{
        rolid:role.rolid,
        sysid: role.sysid,
        code: role.code,
        enabled: role.enabled,
      },
      roleLangs:roleLangs,
      pvgids:pvgids
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        if(response.role){
          window.history.back(-1);
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  enableRole({commit},param){
    const {rolid,enabled} = param
    const head = {
      svc: svc,
      cmd: 'enable_role',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      rolid:rolid,
      enabled:enabled
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteRole({commit},param){
    const head = {
      svc: svc,
      cmd: 'delete_role',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      rolid:param,
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //获取权限表
  getPrivilegeList({ commit },param) {
    const head = {
      svc: svc,
      cmd: 'load_privilege_list',
      lang:lang,
      aticket:aticket,
    }
    const body = {
      sysid:param
    }
    return new Promise((resolve, reject) => {
      ajax({head,body}).then(response => {
        const data = response
        commit('SET_PRIVILEGELIST', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
