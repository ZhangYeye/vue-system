import {ajax} from "../../api/ajax";

const state = {
  // workBillList:[],
  workBillInfo:{},
  workBillList:[
    {
    mtbid: 0,
    billTime: '2019-11-11',
    oBillId: '033201806111043348315jfk3J7b067A',
    billType: 2,
    sendBillNo:'1000203045',
    site: '深圳',
    sendTranser: '顺丰',
    sendCount: 0,
    remark: '范德萨范德萨发',
    payment: 2,           //快递付费方式（有哪些枚举值？1寄付 2到付）
    account: '张三',            //官网登录账号    （工单详情）
    name: '',               //姓名
    phone: '',              //电话
    country: '',            //国家（值类型？）
    province: '',           //省份（值类型？）
    city: '',               //城市（值类型？）
    address: '',            //详细地址
    postcode: '',           //邮编
    backTranser: '',        //返回物流商（值类型？）
    billStatus: 0,          //工单状态（有哪些枚举值？待收货、已收货、待发货、已发货）      -------- 工单初建待收货；完成收货已收货；DOA/保内/二返自动转待发货，其他在付款后转待发货；发货后转已发货
    issued: 1,            //是否待处理包裹                                           -------- 收货完成后自动标记
    issueCode: '',          //待处理包裹问题代码                                     -------- 收货完成后自动标记
    billLines: [{
      mtlid: 0,               //mes工单行ID
      mtbid: '101801112（蚂蚁矿机S9 SE 16T EMC）',               //所属工单ID
      oLineId: '',            //官网工单行ID
      deviceType: 1,      //设备类型（有哪些枚举值？）
      product: '',            //产品（值类型？）
      lineCount: 0,           //工单数量
      receiveCount: 0,        //收货数量
      deliverCount: 0,        //发货数量
      scrapCount: 0,          //报废数量                                          -------- 故障判定不良代码，需要标记是否是报废代码
      discardCount: 0,        //丢弃数量
      issued: 1,            //是否待处理
      issueCode: '',          //待处理问题代码
      items: [{
        mtiid: 0,               //明细行ID
        mtbid: 0,               //所属工单ID
        mtlid: 'DGYK42DAIJCBE0AC5',               //所属工单行ID
        oItemId: '',            //官网明细行ID
        receiveStatus: 0,       //收货状态（1正常收货、2异常收货）
        receiveTime: '2019-11-11',         //收货时间
        receiveSn: '',          //收货产品SN
        receiveUrl1: '',        //收货图片1,
        receiveUrl2: '',        //收货图片2,
        receiveUrl3: '',        //收货图片3,
        warranty: 1,            //保修状态（1DOA、2保内、4保外）                    -------- 调用销售数据接口
        secodnHand: 1,        //是否二手机                                     -------- 从返修白名单获取
        maintains: 0,           //返修次数                                      -------- 以SN查找产品实例库，找到实例，再查找该实例的工单数量
        checkStatus: 0,         //初测状态（0未判定故障、1已判定故障）
        checkTime: '2019-11-11',           //初测时间
        checkCode: '',          //初测不良代码
        checkUrl1: '',          //初测图片1,
        checkUrl2: '',          //初测图片2,
        checkUrl3: '',          //初测图片3,
        continues: 0,           //二返、三返                                     -------- 以SN查找产品实例库，找到实例，再查找该实例最近一次非售后良工单，在此工单基础上计算二返
        mixbound: 1,          //是否混板                                      -------- 故障判定代码，需要标记是否是混板代码
        maintainess: 1,       //是否继续维修（0不修、1维修）
        returness: 1,         //是否退回原机（0不退回、1原机退回）
        priority: 1,          //是否优先发货
        remark: '' ,             //客服备注
        shouldPay: 0,           //应付金额，单位：分    为0无需付款
        realPay: 0,             //实付金额，单位：分
        payTime: '2019-11-11',             //付款时间
        exchange: 1,          //是否换货                                      -------- 发货完成后，根据发货SN和收货SN是否一致决定
        deliverStatus: 0,     //发货状态（0未发货、1已发货）
        deliverTime: '2019-11-11',         //发货时间
        deliverProduct: '',     //发货产品销售编码
        deliverSn: '',          //发货产品SN
        deliverTranser: '',     //发货物流商
        deliverBillNo: '',      //发货运单号
        deliverSite: '',        //替换发货仓库
        payment: 2,           //快递付款方式（有哪些枚举值？）
        repairStatus: 0,        //维修状态（0未维修、1正在维修、2已完成）
        repairTime: 0           //维修时间
      }]
    }]
  }, {
      mtbid: 0,
      billTime: '2019-11-11',
      oBillId: '033201806111043348315jfk3J7b067A',
      billType: 2,
      sendBillNo:'1000203045',
      site: '深圳',
      sendTranser: '顺丰',
      sendCount: 0,
      remark: '范德萨范德萨发',
      payment: 2,           //快递付费方式（有哪些枚举值？1寄付 2到付）
      account: '张三',            //官网登录账号    （工单详情）
      name: '',               //姓名
      phone: '',              //电话
      country: '',            //国家（值类型？）
      province: '',           //省份（值类型？）
      city: '',               //城市（值类型？）
      address: '',            //详细地址
      postcode: '',           //邮编
      backTranser: '',        //返回物流商（值类型？）
      billStatus: 0,          //工单状态（有哪些枚举值？待收货、已收货、待发货、已发货）      -------- 工单初建待收货；完成收货已收货；DOA/保内/二返自动转待发货，其他在付款后转待发货；发货后转已发货
      issued: 1,            //是否待处理包裹                                           -------- 收货完成后自动标记
      issueCode: '',          //待处理包裹问题代码                                     -------- 收货完成后自动标记
      billLines: [{
        mtlid: 0,               //mes工单行ID
        mtbid: '101801112（蚂蚁矿机S9 SE 16T EMC）',               //所属工单ID
        oLineId: '',            //官网工单行ID
        deviceType: 1,      //设备类型（有哪些枚举值？）
        product: '',            //产品（值类型？）
        lineCount: 0,           //工单数量
        receiveCount: 0,        //收货数量
        deliverCount: 0,        //发货数量
        scrapCount: 0,          //报废数量                                          -------- 故障判定不良代码，需要标记是否是报废代码
        discardCount: 0,        //丢弃数量
        issued: 1,            //是否待处理
        issueCode: '',          //待处理问题代码
        items: [{
          mtiid: 0,               //明细行ID
          mtbid: 0,               //所属工单ID
          mtlid: 'DGYK42DAIJCBE0AC5',               //所属工单行ID
          oItemId: '',            //官网明细行ID
          receiveStatus: 0,       //收货状态（1正常收货、2异常收货）
          receiveTime: '2019-11-11',         //收货时间
          receiveSn: '',          //收货产品SN
          receiveUrl1: '',        //收货图片1,
          receiveUrl2: '',        //收货图片2,
          receiveUrl3: '',        //收货图片3,
          warranty: 1,            //保修状态（1DOA、2保内、4保外）                    -------- 调用销售数据接口
          secodnHand: 1,        //是否二手机                                     -------- 从返修白名单获取
          maintains: 0,           //返修次数                                      -------- 以SN查找产品实例库，找到实例，再查找该实例的工单数量
          checkStatus: 0,         //初测状态（0未判定故障、1已判定故障）
          checkTime: '2019-11-11',           //初测时间
          checkCode: '',          //初测不良代码
          checkUrl1: '',          //初测图片1,
          checkUrl2: '',          //初测图片2,
          checkUrl3: '',          //初测图片3,
          continues: 0,           //二返、三返                                     -------- 以SN查找产品实例库，找到实例，再查找该实例最近一次非售后良工单，在此工单基础上计算二返
          mixbound: 1,          //是否混板                                      -------- 故障判定代码，需要标记是否是混板代码
          maintainess: 1,       //是否继续维修（0不修、1维修）
          returness: 1,         //是否退回原机（0不退回、1原机退回）
          priority: 1,          //是否优先发货
          remark: '' ,             //客服备注
          shouldPay: 0,           //应付金额，单位：分    为0无需付款
          realPay: 0,             //实付金额，单位：分
          payTime: '2019-11-11',             //付款时间
          exchange: 1,          //是否换货                                      -------- 发货完成后，根据发货SN和收货SN是否一致决定
          deliverStatus: 0,     //发货状态（0未发货、1已发货）
          deliverTime: '2019-11-11',         //发货时间
          deliverProduct: '',     //发货产品销售编码
          deliverSn: '',          //发货产品SN
          deliverTranser: '',     //发货物流商
          deliverBillNo: '',      //发货运单号
          deliverSite: '',        //替换发货仓库
          payment: 2,           //快递付款方式（有哪些枚举值？）
          repairStatus: 0,        //维修状态（0未维修、1正在维修、2已完成）
          repairTime: 0           //维修时间
        }]
      }]
    }, {
      mtbid: 0,
      billTime: '2019-11-11',
      oBillId: '033201806111043348315jfk3J7b067A',
      billType: 2,
      sendBillNo:'1000203045',
      site: '深圳',
      sendTranser: '顺丰',
      sendCount: 0,
      remark: '范德萨范德萨发',
      payment: 2,           //快递付费方式（有哪些枚举值？1寄付 2到付）
      account: '张三',            //官网登录账号    （工单详情）
      name: '',               //姓名
      phone: '',              //电话
      country: '',            //国家（值类型？）
      province: '',           //省份（值类型？）
      city: '',               //城市（值类型？）
      address: '',            //详细地址
      postcode: '',           //邮编
      backTranser: '',        //返回物流商（值类型？）
      billStatus: 0,          //工单状态（有哪些枚举值？待收货、已收货、待发货、已发货）      -------- 工单初建待收货；完成收货已收货；DOA/保内/二返自动转待发货，其他在付款后转待发货；发货后转已发货
      issued: 1,            //是否待处理包裹                                           -------- 收货完成后自动标记
      issueCode: '',          //待处理包裹问题代码                                     -------- 收货完成后自动标记
      billLines: [{
        mtlid: 0,               //mes工单行ID
        mtbid: '101801112（蚂蚁矿机S9 SE 16T EMC）',               //所属工单ID
        oLineId: '',            //官网工单行ID
        deviceType: 1,      //设备类型（有哪些枚举值？）
        product: '',            //产品（值类型？）
        lineCount: 0,           //工单数量
        receiveCount: 0,        //收货数量
        deliverCount: 0,        //发货数量
        scrapCount: 0,          //报废数量                                          -------- 故障判定不良代码，需要标记是否是报废代码
        discardCount: 0,        //丢弃数量
        issued: 1,            //是否待处理
        issueCode: '',          //待处理问题代码
        items: [{
          mtiid: 0,               //明细行ID
          mtbid: 0,               //所属工单ID
          mtlid: 'DGYK42DAIJCBE0AC5',               //所属工单行ID
          oItemId: '',            //官网明细行ID
          receiveStatus: 0,       //收货状态（1正常收货、2异常收货）
          receiveTime: '2019-11-11',         //收货时间
          receiveSn: '',          //收货产品SN
          receiveUrl1: '',        //收货图片1,
          receiveUrl2: '',        //收货图片2,
          receiveUrl3: '',        //收货图片3,
          warranty: 1,            //保修状态（1DOA、2保内、4保外）                    -------- 调用销售数据接口
          secodnHand: 1,        //是否二手机                                     -------- 从返修白名单获取
          maintains: 0,           //返修次数                                      -------- 以SN查找产品实例库，找到实例，再查找该实例的工单数量
          checkStatus: 0,         //初测状态（0未判定故障、1已判定故障）
          checkTime: '2019-11-11',           //初测时间
          checkCode: '',          //初测不良代码
          checkUrl1: '',          //初测图片1,
          checkUrl2: '',          //初测图片2,
          checkUrl3: '',          //初测图片3,
          continues: 0,           //二返、三返                                     -------- 以SN查找产品实例库，找到实例，再查找该实例最近一次非售后良工单，在此工单基础上计算二返
          mixbound: 1,          //是否混板                                      -------- 故障判定代码，需要标记是否是混板代码
          maintainess: 1,       //是否继续维修（0不修、1维修）
          returness: 1,         //是否退回原机（0不退回、1原机退回）
          priority: 1,          //是否优先发货
          remark: '' ,             //客服备注
          shouldPay: 0,           //应付金额，单位：分    为0无需付款
          realPay: 0,             //实付金额，单位：分
          payTime: '2019-11-11',             //付款时间
          exchange: 1,          //是否换货                                      -------- 发货完成后，根据发货SN和收货SN是否一致决定
          deliverStatus: 0,     //发货状态（0未发货、1已发货）
          deliverTime: '2019-11-11',         //发货时间
          deliverProduct: '',     //发货产品销售编码
          deliverSn: '',          //发货产品SN
          deliverTranser: '',     //发货物流商
          deliverBillNo: '',      //发货运单号
          deliverSite: '',        //替换发货仓库
          payment: 2,           //快递付款方式（有哪些枚举值？）
          repairStatus: 0,        //维修状态（0未维修、1正在维修、2已完成）
          repairTime: 0           //维修时间
        }]
      }]
    }]
}

const mutations = {
  //获取工单列表
  GET_BILL_LIST:(state,{data}) => {
    state.workBillList = data
  },
  //获取返修工单信息
  GET_BILL_INFO:(state,{data}) => {
    state.workBillInfo = data
  }
}

const actions = {
  GetBillList({commit}, param) {
    const params = param
    const head = {}
    const body = {}
    return new Promise((resolve, reject) => {
      ajax({head, body}).then(response => {
          commit('GET_BILL_LIST', response.billList)
          resolve()
        })
        .catch(
          error => {
            reject(error)
          })
    })
  },
  GetBillDetail({commit}, param) {
    const params = param
    const head = {}
    const body = {}
    return new Promise((resolve, reject) => {
      ajax({head, body}).then(response => {
          commit('GET_BILL_INFO', response)
          resolve()
        })
        .catch(
          error => {
            reject(error)
          })
    })
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}
