import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import { message } from 'antd'

const {
  queryUserList,
  totalEvent,
  typeEvent,
  srcipEvent,
  dstipEvent,
  listEvent,
  delEvent,
  safetyTrend,
  configFocusList,
  configSave,
  configQueryList,
  getListDetail,
  relationEvent,
  totalAsset,
  isRegist,
  activation,
  getIpList,
  getMachineCode
} = api

export default modelExtend(pageModel, {
  namespace: 'dashboard',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'activation',
    queryEvents: {},
    queryCardList: {},
    totalEvent: {
      list: [{ level: '3', num: 0 },{ level: '2', num: 0 },{ level: '1', num: 0 }],
    },
    typeEvent: {
      list: [],
    },
    srcipEvent: {
      list: [],
    },
    dstipEvent: {
      list: [],
    },
    listEvent: {
      list: [],
    },
    safetyTrend:{
      list:[],
    },
    configFocus:{
      list:[],
    },
    detail:{},
    detailLoding:true,
    detailEvent:{
      list:[]
    },
    totalAsset:0,
    ipListEvent:{
      ipList: []
    },
    chartType:'month'
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathMatchRegexp('/dashboard', pathname) ||
          pathMatchRegexp('/', pathname)
        ) {
          // dispatch({ type: 'queryEvents' })
          // dispatch({ type: 'queryCardList' })
          dispatch({ type: 'totalEvent' })
          dispatch({ type: 'typeEvent' })
          dispatch({ type: 'srcipEvent' })
          dispatch({ type: 'dstipEvent' })
          // dispatch({ type: 'listEvent' })
          dispatch({ type: 'safetyTrend', payload:{type:'month'} })
          dispatch({ type: 'totalAsset' })
          dispatch({ type: 'isRegist' })
          dispatch({ type: 'getMachineCode' })
          dispatch({ type: 'configFocusList',payload:{current: 1, pageSize: 10} })
        }
      })
    },
  },
  effects: {
    *isRegist({ payload = {} }, { call, put }) {
      const data = yield call(isRegist, payload)
      if (data.code!=0) {
        yield put({
          type: 'querySuccess',
          payload: {
            modalVisible: true,
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
        window.location.reload()
      }else{
        message.error(data.msg);
        throw data
      }
    },
    *totalAsset({ payload = {} }, { call, put }) {
      const data = yield call(totalAsset, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            // $$type: 'totalAsset',
            totalAsset: data.data,
          },
        })
      }
    },
    *configFocusList({ payload = {} }, { call, put }) {
      const data = yield call(configFocusList, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'configFocus',
            list: data.data.rows,
          },
        })
      }
    },
    *configQueryList({ payload = {} }, { call, put }) {
      const data = yield call(configQueryList, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'configQuery',
            list: data.data,
          },
        })
      }
    },
    *listEvent({ payload = {} }, { call, put }) {
      const data = yield call(listEvent, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'listEvent',
            list: data.data,
            level:payload
          },
        })
      }
    },
    *dstipEvent({ payload = {} }, { call, put }) {
      const data = yield call(dstipEvent, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'dstipEvent',
            list: data.data,
          },
        })
      }
    },
    *srcipEvent({ payload = {} }, { call, put }) {
      const data = yield call(srcipEvent, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'srcipEvent',
            list: data.data,
          },
        })
      }
    },
    *totalEvent({ payload = {} }, { call, put }) {
      const data = yield call(totalEvent, payload)
      if (data.code==0) {
        let list = data.data;
        let newArr = [];
        var result1 = list.some(item=>{
          if(item.level=='1'){
             return true 
          }
        })
        if(!result1) list.push({level:"1",num:0});

        var result2 = list.some(item=>{
          if(item.level=='2'){
             return true 
          }
        })
        if(!result2) list.push({level:"2",num:0});
        var result3 = list.some(item=>{
          if(item.level=='3'){
             return true 
          }
        })
        if(!result3) list.push({level:"3",num:0});
        function sortBy(props) {
          return function(a,b) {
              return b[props] - a[props];
          }
        }
        list.sort(sortBy("level"));
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'totalEvent',
            list: list,
          },
        })
      }
    },
    *typeEvent({ payload = {} }, { call, put }) {
      const data = yield call(typeEvent, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'typeEvent',
            list: data.data,
          },
        })
      }
    },
    *safetyTrend({ payload = {} }, { call, put }) {
      const data = yield call(safetyTrend, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'safetyTrend',
            list: data.data,
          },
        })
      }
    },

    *queryEvents({ payload = {} }, { call, put }) {
      const data = yield call(queryUserList, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'queryEvents',
            list: data.data,
          },
        })
      }
    },
    *queryCardList({ payload = {} }, { call, put }) {
      const data = yield call(queryUserList, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'queryCardList',
            source: data.data.slice(0, 5),
            target: data.data.slice(0, 5),
          },
        })
      }
    },
    
    *delete({ payload }, { call, put, select }) {
      const data = yield call(delEvent, { id: payload })
      // const { selectedRowKeys } = yield select(_ => _.dashboard)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            // selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        throw data
      }
    },

    *configSave({ payload = {} }, { call, put }) {
      const data = yield call(configSave, payload)
      if (data.code==0) {
        yield put({type: 'hideModal'})
        message.success('操作成功');
      }else{
        message.error(data.msg);
        throw data
      }
    },

    *getListDetail({ payload }, { call, put }){
      const data = yield call(getListDetail, payload)
      if(data.code==0){
        yield put({
          type:'sysDetail',
          payload:{
            detail:data.data,
            detailLoding:false
          }
        })
      }else{
        yield put({
          type:'sysDetail',
          payload:{
            detailLoding:false
          }
        })
        message.error(data.msg)
        throw data
      }
    },

    *relationEvent({ payload }, { call, put }){
      const data = yield call(relationEvent, payload)
      if(data.code==0){
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'detailEvent',
            list: data.data.rows,
            pagination: {
              current: Number(payload.current) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }else{
        message.error(data.msg)
        throw data
      }
    },

    *ipListEvent({ payload = {} }, { call, put }) {
      const data = yield call(getIpList, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'ipListEvent',
            ipList: data.data.rows,
            ipListpagination: {
              current: Number(payload.current) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }
    },

    *getMachineCode({ payload }, { select, call, put }) {
      const data = yield call(getMachineCode, payload)
      if (data.code==0) {
        yield put({ 
          type: 'sysDetail',
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
    sysDetail(state,{payload}){
      return { ...state, ...payload }
    },
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
