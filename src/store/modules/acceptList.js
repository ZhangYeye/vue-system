import {ajax} from "../../api/ajax";

const state = {
  acceptList:[
    {
    deviceType: '整机',
    product: {code: '101801112',name: '蚂蚁矿机S9 SE 16T EMC'},
    billCount: 4,
    acceptCount: 0,
    accepted:false,
    children:[]
  }, {
    deviceType: '整机',
    product: {code: '103454512',name: '蚂蚁矿机S9 SE 16.5T EMC'},
    billCount: 2,
    acceptCount: 2,
    accepted:true,
  }, {
    deviceType: '配件',
    product: {code: '103454512',name: '风扇'},
    billCount: 2,
    acceptCount: 0,
    accepted:false,
  }],
  arrivalList:[
    {
    org: '天任顺华',
    date: '2019-10-09',
    code: 'RCB-TRSH-20191009-0001',
    maintainBill: '03320180820134825970qO5k5USj06A9',
    total: 1,
    count: 1
  },{
    org: '天任顺华',
    date: '2019-10-08',
    code: 'RCB-TRSH-20191008-0001',
    maintainBill: '033201808201328354186DpJ4Q590625',
    total: 2,
    count: 1
  },{
    org: '天任顺华',
    date: '2019-10-08',
    code: 'RCB-TRSH-20191008-0001',
    maintainBill: '033201808201328354186DpJ4Q590625',
    total: 2,
    count: 1
  }],
  repairPoint:[]
}
const mutations = {
  GET_REPAIR_LOCATION:(state,{data}) => {
    state.repairPoint = data
  },
  GET_ARRIVAL_LIST:(state,{data}) => {
    state.arrivalList = data
  },
  GET_ACCEPT_LIST:(state,{data}) => {
    state.acceptList = data
  }
}

const actions = {
  GetArrivalList({commit},param){
    const head = {
    
    }
    const body = {
    
    }
    return new Promise((resolve,reject) => {
      ajax({head,body}).then(response =>{
        commit('GET_ARRIVAL_LIST',response)
        resolve()
      }).catch(error => {
        reject()
      })
    })
  },
  GetAcceptList({commit},param){
    const head = {
    
    }
    const body = {
    
    }
    return new Promise((resolve,reject) => {
      ajax({head,body}).then(response =>{
        commit('GET_ACCEPT_LIST',response)
        resolve()
      }).catch(error => {
        reject()
      })
    })
  },
  GetRepairPoint({commit},param){
    ajax({head,body}).then(response =>{
      commit('repairPoint',response)
      resolve()
    }).catch(error => {
      reject()
    })
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}
