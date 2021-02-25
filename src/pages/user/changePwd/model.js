import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import store from 'store'
import { message } from 'antd'
import { router } from 'utils'

const {
  getUserByName,
  resetPwd
} = api

const user = store.get('user') || {}

export default modelExtend(pageModel, {
  namespace: 'pwdCenter',

  state: {
    listUser:{}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/user/pwdCenter', location.pathname)) {
          // const payload ={ username: user.username }
          // dispatch({
          //   type: 'query',
          //   payload
          // })
        }
      })
    },
  },

  effects: {
    // 个人中心
    *query({ payload }, { call, put}){
      const data = yield call(getUserByName, payload)
      if (data.code==0) {
        yield put({
          type: 'sysInfo',
          payload: {
            listUser: data.data,
          },
        })
      }
    },
    *update({ payload }, { call, put }) {
      const data = yield call(resetPwd, payload)
      if (data.code==0) {
        message.success('修改成功！')
        yield put({ type: 'query' })
        router.push({
          pathname: '/dashboard',
        })
      } else {
        message.error(data.msg)
        throw data
      }
    },

  },

  reducers: {
    sysInfo(state,{ payload }){
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
