import {ajax} from '@/api/ajax'
import {lang, aticket, svc_base, svc_rma} from '@/store/attr'

const state = {
  shipList: {
    shipmentList: [{
      shpid: "fdsafdsafds",
      code: "100010",
      name: "顺丰",
      remark: "",
      enabled: 1
    }, {
      shpid: "fdsafdsa",
      code: "100011",
      name: "顺丰",
      remark: "",
      enabled: 1
    }, {
      shpid: "fdsafdsa",
      code: "100011",
      name: "顺丰",
      remark: "",
      enabled: 1
    }],
    total:3
  },
  shipDetail:{
    "shipment":{
      "shpid":"SElyXNjz9NqAjlxvzuojVA==",
      "code":"fdsafdsafds",
      "name":"顺丰",
      "remark":"范德萨范德萨",
      "enabled":0
    },
    "shipmentLangs":[
      {
        "shpid":"SElyXNjz9NqAjlxvzuojVA==",
        "lngid":"MxESOwvewXouJ4dYQQDLyQ==",
        "name":"shunfeng",
        "remark":"fdsafd",
        "lang":"en"
      },
      {
        "shpid":"SElyXNjz9NqAjlxvzuojVA==",
        "lngid":"SElyXNjz9NqAjlxvzuojVA==",
        "name":"顺丰",
        "remark":"范德萨发生",
        "lang":"zh"
      }
    ]
  },
  warrantyList:{
    maintainDeadline:[{
        mdlid: "fdsa",
        sn: "DGYK42DAIJCBE0AC5",
        deadline: "2019-12-04",
        secondhand: 0,
        remark: "",
        enabled: 1
      },{
      mdlid: "fdsfdfdsa",
      sn: "DGYK42DAIJCBE0AC5",
      deadline: "2019-12-04",
      secondhand: 0,
      remark: "",
      enabled: 1
    },{
      mdlid: "gdsgda",
      sn: "DGYK42DAIJCBE0AC5",
      deadline: "2019-12-04",
      secondhand: 1,
      remark: "",
      enabled: 0
    }],
    total: 3
  }
}

const mutations = {
  SET_SHIP_LIST: (state, list) => {
    state.shipList = list
  },
  SET_SHIP_DETAIL: (state, list) => {
    state.shipDetail = list
  },
  SET_WARRANTY_LIST: (state, list) => {
    state.warrantyList = list
  },
  SET_WARRANTY_DETAIL: (state, list) => {
    state.warrantyDetail = list
  }
}

const actions = {
  getShipList({commit}, param) {
    const {start, limit} = param
    const head = {
      svc: svc_base,
      cmd: 'load_shipment_list',
      lang: lang,
      aticket: aticket,
    }
    const body = {
      start: start,
      limit: limit,
    }
    return new Promise((resolve, reject) => {
      ajax({head, body}).then(response => {
        const data = response
        commit('SET_SHIP_LIST', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getShipDetail({commit}, param) {
    const head = {
      svc: svc_base,
      cmd: 'load_shipment',
      lang: lang,
      aticket: aticket,
    }
    const body = {
      shpid: param,
      withLangs: true,
      shadow: true
    }
    return new Promise((resolve, reject) => {
      ajax({head, body}).then(response => {
        commit('SET_SHIP_DETAIL', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveShip({commit}, param) {
    const {shipment, shipmentLangs} = param
    const head = {
      svc: svc_base,
      cmd: 'save_shipment',
      lang: lang,
      aticket: aticket,
    }
    const body = {
      shipment: {
        shpid: shipment.shpid,
        code: shipment.code,
        enabled: shipment.enabled,
      },
      shipmentLangs: shipmentLangs,
    }
    return new Promise((resolve, reject) => {
      ajax({head, body}).then(response => {
        if (response.role) {
          window.history.back(-1);
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  enableShip({commit}, param) {
    const {shpid, enabled} = param
    const head = {
      svc: svc_base,
      cmd: 'enable_shipment',
      lang: lang,
      aticket: aticket,
    }
    const body = {
      shpid: shpid,
      enabled: enabled
    }
    return new Promise((resolve, reject) => {
      ajax({head, body}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteShip({commit}, param) {
    const head = {
      svc: svc_base,
      cmd: 'delete_shipment',
      lang: lang,
      aticket: aticket,
    }
    const body = {
      shpid: param,
    }
    return new Promise((resolve, reject) => {
      ajax({head, body}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  //保修白名单
  getWarrantyList({commit}, param) {
    const {start, limit} = param
    const head = {
      svc: svc_rma,
      cmd: 'load_maintain_deadline_list',
      lang: lang,
      aticket: aticket,
    }
    const body = {
      start: start,
      limit: limit,
    }
    return new Promise((resolve, reject) => {
      ajax({head, body}).then(response => {
        const data = response
        commit('SET_WARRANTY_LIST', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getWarrantyDetail({commit}, param) {
    const head = {
      svc: svc_rma,
      cmd: 'load_maintain_deadline',
      lang: lang,
      aticket: aticket,
    }
    const body = {
      mdlid: param,
      shadow: true
    }
    return new Promise((resolve, reject) => {
      ajax({head, body}).then(response => {
        commit('SET_WARRANTY_DETAIL', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveWarranty({commit}, param) {
    const head = {
      svc: svc_rma,
      cmd: 'save_maintain_deadline',
      lang: lang,
      aticket: aticket,
    }
    const body = {
      maintainDeadline: param
    }
    return new Promise((resolve, reject) => {
      ajax({head, body}).then(response => {
        if (response.role) {
          window.history.back(-1);
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  enableWarranty({commit}, param) {
    const {mdlid, enabled} = param
    const head = {
      svc: svc_rma,
      cmd: 'enable_maintain_deadline',
      lang: lang,
      aticket: aticket,
    }
    const body = {
      mdlid: mdlid,
      enabled: enabled
    }
    return new Promise((resolve, reject) => {
      ajax({head, body}).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteWarranty({commit}, param) {
    const head = {
      svc: svc_rma,
      cmd: 'delete_maintain_deadline',
      lang: lang,
      aticket: aticket,
    }
    const body = {
      mdlid: param,
    }
    return new Promise((resolve, reject) => {
      ajax({head, body}).then(response => {
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
