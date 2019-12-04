const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  name: state => state.user.name,
  systemList: state => state.user.systemList,
  permission_routes: state => state.user.routes,
  errorLogs: state => state.errorLog.logs,
  
  bills: state => state.workOrder.workBillList,
  workBillInfo: state => state.workOrder.workBillInfo,
  
  repairPoint: state => state.acceptList.repairPoint,
  arrivalList: state => state.acceptList.arrivalList,
  acceptList: state => state.acceptList.acceptList,
  
  shipList: state => state.basicData.shipList,
  shipDetail: state => state.basicData.shipDetail,
  warrantyList: state => state.basicData.warrantyList,
  warrantyDetail: state => state.basicData.warrantyDetail,
  
  orgList: state => state.systemSetting.orgList,
  orgDetail: state => state.systemSetting.orgDetail,
  siteList: state => state.systemSetting.siteList,
  siteDetail: state => state.systemSetting.siteDetail,
  accountList: state => state.systemSetting.accountList,
  accountDetail: state => state.systemSetting.accountDetail,
  roleList: state => state.systemSetting.roleList,
  roleDetail: state => state.systemSetting.roleDetail,
  privilegeList: state => state.systemSetting.privilegeList
}
export default getters
