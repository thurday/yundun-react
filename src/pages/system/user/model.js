import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
const {
  queryUserList,
  createUser,
  removeUser,
  updateUser,
  removeUserList,
  userList,
  rolesList,
  resetUserPwd
} = api

export default modelExtend(pageModel, {
  namespace: 'systemUser',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    rolesItem:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/system/user', location.pathname)) {
          const payload = location.query
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(userList, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
          },
        })
      }
    },

    *roles({ payload }, { call, put}){
      const data = yield call(rolesList, payload)
      if(data.success){
        yield put({
          type: 'showModal',
          payload: {
            rolesItem: data.data,
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removeUser, { userId: payload })
      // const { selectedRowKeys } = yield select(_ => _.user)
      if (data.code==0) {
        message.success('删除成功！')
        yield put({
          type: 'updateState',
          // payload: {
          //   selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          // },
        })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeUserList, payload)
      if (data.code==0) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createUser, payload)
      if (data.code==0) {
        message.success('添加成功！')
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(updateUser, payload)
      if (data.code==0) {
        message.success('修改成功！')
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *resetUserPwd({ payload }, { select, call, put }) {
      const data = yield call(resetUserPwd, payload)
      if (data.code==0) {
        message.success('修改成功！')
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg)
        throw data
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
