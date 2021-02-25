import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import store from 'store'

const {
  queryUserList,
  totalEvent,
  queryBytime,
  srcipEvent,
  dstipEvent,
  typeEvent,
  safetyTrend,
  trafficTrend,
  getScore
} = api

export default modelExtend(pageModel, {
  namespace: 'situation',

  state: {
    totalEvent: {
      list: [],
    },
    queryBytime: {
      list: [],
    },
    srcipEvent: {
      list: [],
    },
    dstipEvent: {
      list: [],
    },
    typeEvent: {
      list: [],
    },
    safetyTrend:{
      list:[],
    },
    trafficTrend:{
      list:[],
    },
    getScore:{
      list:'',
    },
    mapType: store.get('mapType') || 'world',
    chartType: 'week',
    chartSafeType: 'month',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/situation', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          // dispatch({
          //   type: 'query',
          //   payload,
          // })
          dispatch({ type: 'totalEvent' })
          dispatch({ type: 'queryBytime' })
          dispatch({ type: 'srcipEvent' })
          dispatch({ type: 'dstipEvent' })
          dispatch({ type: 'typeEvent' })
          dispatch({ type: 'safetyTrend' })
          dispatch({ type: 'trafficTrend', payload:{type:'week'} })
          dispatch({ type: 'getScore' })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(queryUserList, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },
    *totalEvent({ payload = {} }, { call, put }) {
      const data = yield call(totalEvent, payload)
      if (data.code == 0) {
        let list = data.data;
        let arr = [];
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
        arr.push(list[1]);
        arr.push(list[0]);
        arr.push(list[2]);
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'totalEvent',
            list: arr,
          },
        })
      }
    },
    *queryBytime({ payload = {} }, { call, put }) {
      const data = yield call(queryBytime, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'queryBytime',
            list: data.data,
          },
        })
      }
    },
    //目标ip
    *dstipEvent({ payload = {} }, { call, put }) {
      const data = yield call(dstipEvent, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'dstipEvent',
            list: data.data,
          },
        })
      }
    },
    //源ip
    *srcipEvent({ payload = {} }, { call, put }) {
      const data = yield call(srcipEvent, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'srcipEvent',
            list: data.data,
          },
        })
      }
    },
    //类型
    *typeEvent({ payload = {} }, { call, put }) {
      const data = yield call(typeEvent, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'typeEvent',
            list: data.data,
          },
        })
      }
    },
    //安全趋势
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
    //流量趋势
    *trafficTrend({ payload = {} }, { call, put }) {
      const data = yield call(trafficTrend, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'trafficTrend',
            list: data.data,
          },
        })
      }
    },

    //威胁评分
    *getScore({ payload = {} }, { call, put }) {
      const data = yield call(getScore, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'getScore',
            list: data.data,
          },
        })
      }
    },
  },

  reducers: {
    mapType(state, { payload }) {
      store.set('mapType', payload)
      state.mapType = payload
    },
  },
})
