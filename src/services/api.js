export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  // logoutUser: '/user/logout',
  logoutUser: '/logout.json',
  // loginUser: 'POST /user/login',
  loginUser: '/login.json',

  queryUser: '/user/:id',
  // queryUserList: '/users',
  queryUserList: '/list',
  updateUser: '/updateUser',
  createUser: '/createUser',//创建用户
  removeUser: '/deleteUser',
  removeUserList: 'POST /users/delete',
  getUserByName:"/getUserByName",//个人中心
  updateUserInfo:"/updateUser",//修改个人信息

  queryPostList: '/posts',

  queryDashboard: '/dashboard',

  //未读消息数
  messageCount: '/message/count',//获取未读消息数量
  messageList: '/message/list',//获取消息列表
  batchRead:'/message/batchRead',//设置已读

  // dashboard 事件
  totalEvent: '/totalEvent', // 事件总数
  typeEvent: '/typeEvent', // 威胁类型
  srcipEvent: '/srcipEvent', // 事件源地址TOP5
  dstipEvent: '/dstipEvent', // 事件目标地址TOP5
  listEvent: '/listEvent', // 最新事件
  queryBytime:'/queryBytime',//全屏监控list
  configFocusList:'/event/config/focus/list',//重点关注事件列表

  configQueryList:'/config/query/list',//查询首页配置
  configFocusDel:'/event/config/focus/del',//删除全部重点关注ip
  totalAsset:'/totalAsset',//资产总数

  isRegist:'/licenseController/isRegist',//判断是否激活
  activation:'/licenseController/regist',//激活

  getIpList:'/pageEvent',//事件源地址、目标地址列表

  //重点关注
  eventConfigList:'/eventConfig/list',//列表
  eventConfigSave:'/eventConfig/save',//添加
  eventConfigUpdate:'/eventConfig/update',//修改
  eventConfigRemove:'/eventConfig/remove',//删除
  eventConfigBatchRemove:'/eventConfig/batchRemove',//批量删除

  //事件日志
  pageEvent:'/pageEvent',//列表
  safetyTrend:'/safetyTrend',//安全趋势
  listEvent2: '/listEvent2', // 最新事件
  createBlockingUp:'/createBlockingUp',//添加阻断

  configSave:'/event/config/save',//添加过滤、例外、关注
  configPageList:'/event/config/page/list',//过滤管理、例外管理
  removeConfig:'/event/config/remove',//过滤管理、例外管理撤销
  batchRemoveConfig:'/event/config/batchRemove',//批量过滤管理、例外管理撤销
  configFocusInfo:'/event/config/focus/info',//重点关注
  getListDetail:'/eventWordRecode/getEventDetailById',//通过id获取详情
  relationEvent:'/relationEvent',//详情列表/关联事件

  login:'/login',//登录
  getVerify:'/getVerify',//登录验证码
  delEvent:'/delEvent',//忽略

  //资产
  //资产发现
  pageDiscover:'/pageAssetDiscover',
  delDiscover:'/delAssetDiscover',
  listAssetGroup:'/listAssetGroup',//资产组列表
  assetOperation:'/assetOperation',//更新
  getAssetGroup:'/getAssetGroup',//资产分组列表
  createAssetGroup:'/createAssetGroup',//添加资产分组
  updateAssetGroup:'/updateAssetGroup',//编辑资产分组
  removeAssetGroup:'/removeAssetGroup',//删除资产分组
  batchRemoveAssetGroup:'/batchRemoveAssetGroup',//批量删除资产分组
  listAssetGroupDetail:'/listAssetGroupDetail',//查看资产分组
  createAsset:'/createAsset',//添加资产发现分组
  getAssetStatus:'/getAssetStatus',//查看是否有任务执行
  endAssetDiscover:'/endAssetDiscover',//资产发现结束任务
  startAssetDiscover:'/startAssetDiscover',//资产发现开始任务
  assetTitle:'/assetTitle',//网站资产数量

  assetConfigList:'/assetConfig/list',//网段设置列表
  assetConfigSave:'/assetConfig/save',//新增网段
  assetConfigRemove:'/assetConfig/remove',//删除网段
  assetConfigUpdate:'/assetConfig/update',//修改网段

  menuEvent:'/getMenu',//菜单
  userList:'/getUsers',//用户列表
  rolesList:'/getRoles',//用户列表添加角色类别


  //系统状态
  getSysInfo:'/getSysInfo',//设备状态
  pageOperLog:'/pageOperLog',//操作日志
  pageSysLog:'/pageSysLog',//系统日志
  safeSysLog:'/configSafe/get',//安全设置
  updateConfigSafe:'/configSafe/update',//修改安全设置
  configShow:'/configShow/get',//显示设置
  updateConfigShow:'/configShow/update',//修改显示设置
  getRunTime:'/localMaintenance/getRunTime',//获取运行时间
  getTimeLimit:'/localMaintenance/getTimeLimit',//授权期限
  getMachineCode:'/licenseController/getMachineCode',//获取机器码

  configQueryInfo:'/config/query/info',//存储空间预警值查看
  configSaveGlobal:'/config/save/global',//存储空间预警值设置

  syncTime:'/localMaintenance/syncTime',//同步服务器时间
  reboot:'/localMaintenance/reboot',//重启
  nowTime:'/localMaintenance/nowTime',//获取当前时间
  aotuUpgradeStop:'/localMaintenance/aotuUpgradeStop',//关闭自动升级
  aotuUpgradeStart:'/localMaintenance/aotuUpgradeStart',//开启自动升级
  upgradeNow:'/localMaintenance/upgradeNow',//立即升级
  getVersion:'/localMaintenance/version',//获取版本号
  testing:'/localMaintenance/check',//系统检测
  upgradeAll:'/localMaintenance/upgradeAll',//统一升级
  aotuUpgradeStatus:'/localMaintenance/aotuUpgradeStatus',//自动更新状态
  setName:'/setName',//修改系统状态系统日志名称
  getIdentifyMode:'/configShow/getJianBie',//获取多重鉴别方式
  setIdentifyMode:'/configShow/setJianBie',//设置多重鉴别方式

  //规则策略
  pageRuleCustomer:'/pageRuleCustomer',//用户规则列表
  saveRuleCustomer:'/saveRuleCustomer',//新增用户规则
  updateRuleCustomer:'/updateRuleCustomer',//修改用户规则
  removeRuleCustomer:'/removeRuleCustomer',//删除用户规则
  batchRemoveRuleCustomer:'/batchRemoveRuleCustomer',//批量删除用户规则

  pageRuleSys:'/pageRuleSys',//系统规则
  getRuleSysById:'/getRuleSysById',//系统规则详情
  updateRuleSys:'/updateRuleSys',//修改系统规则
  saveRuleSys:'/saveRuleSys',//新增系统规则
  removeRuleSys:'/removeRuleSys',//删除系统规则
  batchRemoveRuleSys:'/batchRemoveRuleSys',//批量删除系统规则

  agreementList:'/protocol/list',//联动列表
  addAgreement:'/protocol/save',//新增联动
  updateAgreement:'/protocol/update',//修改联动
  pingAgreement:'/protocol/ping',//测试联动
  removeAgreement:'/protocol/remove',//删除联动

  userRuleList:'/ruleCustomer/list',//用户规则列表
  addRuleList:'/ruleCustomer/save',//新增用户规则
  updateRuleList:'/ruleCustomer/update',//修改用户规则
  removeRuleList:'/ruleCustomer/remove',//删除用户规则
  ruleCustomerCopy:'/ruleCustomer/copy',//复制用户规则
  ruleChangeStatus:'/ruleCustomer/changeStatus',//用户规则应用开关

  eventTypeList:'/eventType/listAll',//事件类型下拉框
 

  systemRuleList:'/ruleSys/list',//系统规则列表
  addSystemRuleList:'/ruleSys/save',//新增系统规则
  updateSystemRuleList:'/ruleSys/update',//修改系统规则
  removeSystemRuleList:'/ruleSys/remove',//删除系统规则
  ruleSysCopy:'/ruleSys/copy',//复制系统规则
  ruleSysChangeStatus:'/ruleSys/changeStatus',//系统规则应用开关

  responseList:'/response/list',//定制响应列表
  addResponseList:'/response/save',//新增定制响应
  updateResponseList:'/response/update',//修改定制响应
  removeResponseList:'/response/remove',//删除
  methodListAll:'/response/methodListAll',//事件名称下拉框

  trafficTrend:'/trafficTrend',//流量趋势
  getScore:'/getScore',//全屏威胁评分

  //白名单
  pageWhitelist:'/pageWhitelist',//列表
  saveWhitelist:'/saveWhitelist',//新增
  updateWhitelist:'/updateWhitelist',//修改
  removeWhitelist:'/removeWhitelist',//删除
  batchRemoveWhitelist:'/batchRemoveWhitelist',//批量删除

  //策略配置
  ruleMouldList:'/strategy/group/query/page/list',//列表
  saveRuleMouldList:'/strategy/group/save/info',//新增
  updateRuleMouldList:'/strategy/group/update/info',//修改
  removeRuleMouldList:'/strategy/group/del/info',//删除
  batchRemoveRuleMouldList:'/strategy/group/del/infos',//批量删除
  strategyTypeList:'/strategy/type/query/page/list',//策略种类列表
  strategyChangeStatus:'/strategy/type/update/status',//策略种类开关
  strategySystemList:'/strategy/rule/query/page/list',//系统策略
  strategySystemUpdate:'/strategy/rule/update/status',//系统策略修改

  //系统规则
  getStrategyType:'/getStrategyType',//列表
  getSysRule:'/getSysRule',//跳转列表
  updateStrategy:'/updateStrategy',//列表开关
  updateSysRule:'/updateSysRule',//跳转列表开关

  //漏洞管理
  pageHoleScanTask:'/pageHoleScanTask',//列表
  startHoleScan:'/startHoleScan',//添加
  holeScanBreak:'/holeScanBreak',//中断
  holeScanPause:'/holeScanPause',//暂停
  holeScanContinue:'/holeScanContinue',//暂停再开始
  changeHostName:'/changeHostName',//修改站点名称
  reStartHoleScan:'/reStartHoleScan',//再次扫描

  pageBugDo:'/pageBugDo',//资产漏洞列表
  bugDoCount:'/bugDoCount',//资产漏洞总数

  //配置管理
  getEmailConfig:'/getEmailConfig',//获取email告警管理
  setEmailConfig:'/setEmailConfig',//配置email告警管理
  getManagerConfig:'/getManagerConfig',//管理口获取
  setManagerConfig:'/setManagerConfig',//管理口设置
  hotstandbyRemove:'/hotstandby/remove',//双机热备删除

  //告警管理
  warnList:'/warn/list',//告警管理列表
  addWarnList:'/warn/save',//告警管理列表新增
  updateWarnList:'/warn/update',//告警管理列表修改
  removeWarnList:'/warn/remove',//告警管理列表删除
  updateSyslog:'/warn/sysLogUpdate',//修改syslog
  getSyslog:'/warn/sysLogFind',//获取syslog

  //威胁防护
  pageBlockingUp:'/pageBlockingUp',//ip阻断列表
  deleteBlockingUp:'/deleteBlockingUp',//ip阻断列表删除
  addBlockingUp:'/addBlockingUp',//添加

  distributionList:'/heartbeat/list',//分布管理列表
  addDistributionList:'/heartbeat/save',//新增分布管理
  updateDistributionList:'/heartbeat/update',//修改分布管理
  removeDistributionList:'/heartbeat/remove',//删除分布管理
  batchRemoveDistributionList:'/heartbeat/batchRemove',//批量删除分布管理
  distributionChangeStatus:'/heartbeat/changeStatus',//分布管理开关
  detailEventList:'/heartbeat/eventList',//分布管理详情列表
  detailPictureList:'/heartbeat/pictureList',//分布管理详情拓扑图
  heartbeatWarnList:'/heartbeatWarn/list',//分布管理全局预警列表
  removeHeartbeatWarnList:'/heartbeatWarn/remove',//分布管理全局预警列表删除
  batchRemoveHeartbeatWarnList:'/heartbeatWarn/batchRemove',//分布管理全局预警列表删除
  addHeartbeatWarnList:'/heartbeatWarn/save',//分布管理全局预警列表添加

  reportList:'/eventWordRecode/list',//统计报表列表
  saveReportList:'/eventWordRecode/save',//新增统计报表
  updateReportList:'/eventWordRecode/update',//修改统计报表
  removeReportList:'/eventWordRecode/remove',//删除统计报表
  eventWordRecode:'/eventWordRecode/exportWord',//导出统计报表

  hotstandby:'/hotstandby/list',//双机热备列表
  setManager:'/hotstandby/setManager',//添加

  resetPwd:'/resetPwd',//个人中心修改密码
  resetUserPwd:'/resetUserPwd',//用户管理修改密码

  //回放
  rePlayFn:'/localMaintenance/rePlay',//还原回放
}
