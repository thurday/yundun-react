import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { Result, message } from 'antd'

const {
  queryUserList,
  createUser,
  getSysInfo,
  pageOperLog,
  pageSysLog,
  safeSysLog,
  updateConfigSafe,
  configShow,
  updateConfigShow,
  syncTime,
  reboot,
  nowTime,
  aotuUpgradeStop,
  aotuUpgradeStart,
  upgradeNow,
  getVersion,
  configQueryList,
  configQueryInfo,
  configSaveGlobal,
  testing,
  upgradeAll,
  aotuUpgradeStatus,
  getRunTime,
  getTimeLimit,
  isRegist,
  activation,
  setName,
  getIdentifyMode,
  setIdentifyMode,
  getMachineCode
} = api

export default modelExtend(pageModel, {
  namespace: 'systemStatus',

  state: {
    list:[],
    displayData:'',
    logList:[],
    safeData:{},
    storage:{},
    modalVisible:false,
    modalType:'hide',
    time:'',
    version:{
      app: "",
      engine: "",
      rule: ""
    },
    test:{},
    pingFlag:false,
    limitTime:'',
    modalInfoType: 'update',
    modalInfoVisible:false,
    identify:{
      value:''
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/system/status', location.pathname)) {
          // const payload = location.query.pageSize?location.query:{ current: 1, pageSize: 10 }
          // dispatch({
          //   type: 'query',
          //   payload,
          // })
          dispatch({ type: 'getSysInfo' })
          dispatch({ type: 'getRunTime' })
          dispatch({ type: 'getTimeLimit' })
          dispatch({ type: 'isRegist' })
          dispatch({ type: 'getMachineCode' })
        }{
          // dispatch({ type: 'getEventConfig' })
        }
      })
    },
  },

  effects: {
    *isRegist({ payload = {} }, { call, put }) {
      const data = yield call(isRegist, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            limitTime: data.data.limitTime,
          },
        })
      }
    },
    *activation({ payload = {} }, { call, put }) {
      const data = yield call(activation, payload)
      if (data.code==0) {
        message.success('激活成功');
        yield put({
          type: 'hideModal',
        })
      }else{
        message.error(data.msg);
        throw data
      }
    },
    *query({ payload = {} }, { call, put }) {
      const data = yield call(pageOperLog, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.rows,
            pagination: {
              current: Number(payload.current) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }
    },

    *pageSysLog({ payload }, { call, put }) {
      const data = yield call(pageSysLog, payload)
      if (data.code==0) {
        yield put({
          type: 'sysLog',
          payload: {
            logList: data.data.rows,
            logPagination: {
              current: Number(payload.current) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }
    },

    *getSysInfo({ payload }, { call, put }){
      const data = yield call(getSysInfo, payload)
      if(data.code==0){
        yield put({
          type:'sysInfo',
          payload:{
            devData:data.data,
          }
        })
      }
    },

    *getRunTime({ payload }, { call, put }){
      const data = yield call(getRunTime, payload)
      if(data.code==0){
        yield put({
          type:'sysInfo',
          payload:{
            timeData:data.msg,
          }
        })
      }
    },

    *getTimeLimit({ payload }, { call, put }){
      const data = yield call(getTimeLimit, payload)
      if(data.code==0){
        yield put({
          type:'sysInfo',
          payload:{
            timeLimitData:data.data,
          }
        })
      }
    },

    *configShow({ payload }, { call, put }){
      const data = yield call(configShow, payload)
      if(data.code==0){
        yield put({
          type:'eventTotal',
          payload:{
            displayData:data.data
          }
        })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *updateConfigShow({ payload }, { call, put }){
      const data = yield call(updateConfigShow, payload)
      if(data.code==0){
        message.success('设置成功');
        return data.data
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *save({ payload }, { call, put }) {
      const data = yield call(createUser, payload)
      if (data.success) {
        message.success('保存成功');
        return data.data
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *safeSysLog({ payload }, { call, put }){
      const data = yield call(safeSysLog, payload)
      if(data.code==0){
        yield put({
          type:'safeLog',
          payload:{
            safeData:data.data
          }
        })
      }else{
        message.error(data.msg)
        throw data
      }
    },

    *updateConfigSafe({ payload }, { call, put }){
      const data = yield call(updateConfigSafe, payload)
      if(data.code==0){
        message.success('设置成功');
        return data.data
      }else{
        message.error(data.msg)
        throw data
      }
    },

    *configQueryInfo({ payload }, { call, put }){
      const data = yield call(configQueryInfo, payload)
      if(data.code==0){
        yield put({
          type:'safeLog',
          payload:{
            storage:data.data
          }
        })
      }else{
        message.error(data.msg)
        throw data
      }
    },

    *configSaveGlobal({ payload }, { call, put }){
      const data = yield call(configSaveGlobal, payload)
      if(data.code==0){
        message.success('设置成功');
        return data.data
      }else{
        message.error(data.msg)
        throw data
      }
    },

    *nowTime({ payload }, { call, put }){
      const data = yield call(nowTime, payload)
      if(data.code==0){
        yield put({
          type:'sysTime',
          payload:{
            time:data.msg
          }
        })
      }else{
        // message.error(data.msg)
        // throw data
      }
    },

    *syncTime({ payload }, { call, put }){
      const data = yield call(syncTime, payload)
      if(data.code==0){
        message.success('设置成功');
        return data.data
      }else{
        message.error(data.msg)
        throw data
      }
    },

    *reboot({ payload }, { call, put }){
      const data = yield call(reboot, payload)
      if(data.code==0){
        message.success('重启成功');
        return data.data
      }else{
        message.error(data.msg)
        throw data
      }
    },

    *aotuUpgradeStop({ payload }, { call, put }){
      const data = yield call(aotuUpgradeStop, payload)
      if(data.code==0){
        message.success('关闭自动升级成功');
        yield put({ type: 'aotuUpgradeStatus' })
        return data.data
      }else{
        message.error(data.msg)
        throw data
      }
    },

    *aotuUpgradeStart({ payload }, { call, put }){
      const data = yield call(aotuUpgradeStart, payload)
      if(data.code==0){
        message.success('开启自动升级成功');
        yield put({ type: 'aotuUpgradeStatus' })
        return data.data
      }else{
        message.error(data.msg)
        throw data
      }
    },

    *upgradeNow({ payload }, { call, put }){
      const data = yield call(upgradeNow, payload)
      if(data.code==0){
        setTimeout(()=>{
          message.success('升级成功');
        },10000)
        return data.data
      }else{
        message.error(data.msg)
        throw data
      }
    },

    *getVersion({ payload }, { call, put }){
      const data = yield call(getVersion, payload)
      if(data.code==0){
        yield put({
          type:'sysVersion',
          payload:{
            version:data.data
          }
        })
      }else{
        // message.error(data.msg)
        // throw data
      }
    },

    *testing({ payload }, { call, put }){
      const data = yield call(testing, payload)
      if(data.code==0){
        setTimeout(()=>{
          message.success('检测完成');
        },11000)
        yield put({
          type:'sysTest',
          payload:{
            test:data.data
          }
        })
      }else{
        setTimeout(()=>{
          message.error(data.msg)
        },11000)
        throw data
      }
    },

    *upgradeAll({ payload }, { call, put }){
      const data = yield call(upgradeAll, payload)
      if(data.code==0){
        message.success(data.msg);
        return data.data
      }else{
        message.error(data.msg)
        throw data
      }
    },

    *aotuUpgradeStatus({ payload }, { call, put }){
      const data = yield call(aotuUpgradeStatus, payload)
      if(data.code==0){
        yield put({
          type:'sysTime',
          payload:{
            dataStatus:data.data
          }
        })
      }else{
        // message.error(data.msg)
        // throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(setName, payload)
      if (data.code==0) {
        message.success('修改成功！')
        yield put({ type: 'hideModalInfo' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *getIdentifyMode({ payload }, { select, call, put }) {
      const data = yield call(getIdentifyMode, payload)
      if (data.code==0) {
        yield put({ 
          type: 'safeLog', 
          payload: {
            identify:{
              value: data.data
            }
          }
        })
      } else {
        throw data
      }
    },

    *setIdentifyMode({ payload }, { select, call, put }) {
      const data = yield call(setIdentifyMode, payload)
      if (data.code==0) {
        message.success(data.msg);
        yield put({ type: 'safeLog' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *getMachineCode({ payload }, { select, call, put }) {
      const data = yield call(getMachineCode, payload)
      if (data.code==0) {
        yield put({ 
          type: 'sysInfo',
          payload: {
            machineCode:data.data
          }
        })
      } else {
        throw data
      }
    },
  },

  reducers: {
    sysTest(state,{payload}){
      return { ...state, ...payload }
    },
    sysInfo(state,{payload}){
      return { ...state, ...payload }
    },
    eventTotal(state,{payload}){
      return { ...state, ...payload }
    },
    sysLog(state,{payload}){
      return { ...state, ...payload }
    },
    safeLog(state,{payload}){
      return { ...state, ...payload }
    },
    sysTime(state,{payload}){
      return { ...state, ...payload }
    },
    sysVersion(state,{payload}){
      return { ...state, ...payload }
    },
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideModal(state) {
      return { ...state, modalVisible: false }
    },
    showModalInfo(state, { payload }) {
      return { ...state, ...payload, modalInfoVisible: true }
    },
    hideModalInfo(state) {
      return { ...state, modalInfoVisible: false }
    },
  },
})
