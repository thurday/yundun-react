/* global window */

import { router } from 'utils'
import { stringify } from 'qs'
import store from 'store'
import { ROLE_TYPE } from 'utils/constant'
import { queryLayout, pathMatchRegexp } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
// import routes from 'utils/routes'
import api from 'api'
import config from 'config'
import { message } from 'antd'

const { queryRouteList, logoutUser, queryUserInfo,messageCount, batchRead, messageList } = api

export default {
  namespace: 'app',
  state: {
    // routeList: routes.slice(0, 1),
    routeList: [],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [
      {
        title: '登录成功',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: '网络安全威胁智能检测平台',
        date: new Date(Date.now() - 50000000),
      },
    ],
    messageList:[],
    messageCount:0,
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' })
    },
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
        dispatch({ type: 'messageCount' })
        dispatch({ type: 'getMessageList' })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      // store isInit to prevent query trigger by refresh
      // const isInit = store.get('isInit')
      // if (isInit) return
      const user = payload || store.get('user')
      const { locationPathname } = yield select(_ => _.app)
      const routes = store.get('routeList') || [];
      if (user) {
        let routeList = routes
        let permissions = {
          visit: routes.map(item => item.menuId),
        }

        // store.set('routeList', routeList)
        store.set('permissions', permissions)
        store.set('user', user)
        store.set('isInit', true)
        if (pathMatchRegexp(['#/'], window.location.hash)) {
          router.push({
            pathname: '/dashboard',
          })
        }
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        router.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname,
          }),
        })
      }
    },

    *signOut({ payload }, { call, put }) {
      // const data = yield call(logoutUser)
      // console.log(data);
        store.set('routeList', [])
        store.set('permissions', { visit: [] })
        store.set('user', '')
        store.set('token', '')
        store.set('openKeys', [])
        store.set('signFlag', false)
        yield put({ type: 'query' })
    },

    *locking({ payload }, { call, put }) {
      // const data = yield call(logoutUser)
      // if (data.success) {
        store.set('routeList', [])
        store.set('permissions', { visit: [] })
        store.set('user', '')
        store.set('token', '')
        yield put({ type: 'query' })
      // } else {
        // throw data
      // }
    },

    *UserCenter({ payload }, { call, put }) {
      router.push({
        pathname: '/user/userCenter',
      })
    },

    
    *ChangePwd({ payload }, { call, put }) {
      router.push({
        pathname: '/user/changePwd',
      })
    },

    *getMessageList({ payload = {} }, { call, put }) {
      const data = yield call(messageList, payload)
      if (data.code==0) {
        yield put({
          type: 'updateState',
          payload: {
            messageList: data.data,
          },
        })
      }
    },

    *messageCount({ payload = {} }, { call, put }) {
      const data = yield call(messageCount, payload)
      if (data.code==0) {
        yield put({
          type: 'updateState',
          payload: {
            messageCount: data.data,
          },
        })
      }
    },

    *read({ payload = {} }, { call, put }) {
      const data = yield call(batchRead, { 'ids[]': payload })
      if (data.code==0) {
        message.success(data.msg);
        yield put({type: 'getMessageList'})
        yield put({type: 'messageCount'})
      }else{
        message.error(data.msg)
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    },
  },
}
