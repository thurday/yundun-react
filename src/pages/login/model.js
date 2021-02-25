import modelExtend from 'dva-model-extend'
import { router, pathMatchRegexp } from 'utils'
import api from 'api'
import store from 'store'
import moment from 'moment'
import { pageModel } from 'utils/model'
import { Result, message } from 'antd'

const { login,menuEvent,getVerify } = api

export default modelExtend(pageModel, {
  namespace: 'login',

  state: {
    
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if(
          pathMatchRegexp('/dashboard', pathname) ||
          pathMatchRegexp('/', pathname)
        ){
          
        }
      })
    },
  },

  effects: {
    *login({ payload }, { put, call, select }) {
       const data = yield call(login, payload)
      // const data = {success: true, data: { username: 'Eva' } }
      // const { locationQuery } = yield select(_ => _.app)
      if (data.code==0) {
        yield put({
          type: 'menuEvent',
          payload: {
            username: payload.username
          }
        })

        // const { from } = locationQuery
        yield put({ type: 'app/query', payload: data.data })
        store.set('user', data.data)
        store.set('token', data.token)
        store.set('login_time', moment().format('YYYY-MM-DD HH:mm:ss'))

        // if (!pathMatchRegexp('/login', from)) {
        //   if (!from || from === '/') router.push('/dashboard')
        //   else router.push(from)
        // } else {
        //   router.push('/dashboard')
        // }
        
        
      } else {
        message.error(data.msg);
        // throw data
      }
      return data
    },

    *menuEvent({ payload }, { call, put,select }) {
      const data = yield call(menuEvent, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.code==0) {
        store.set('routeList', data.data);
        const routes = data.data;
        let permissions = {
          visit: routes.map(item => item.menuId),
        }
        store.set('permissions', permissions)
        store.set('isInit', true)
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'menuEvent',
            list: data
          },
        });
        const { from } = locationQuery
        if (!pathMatchRegexp('/login', from)) {
          if (!from || from === '/' || !store.get('signFlag')) {
            router.push('/dashboard')
            store.set('signFlag', true)
          }else {router.push(from)}
        } else {
          router.push('/dashboard')
        }
      }else{
        message.error(data.msg);
      }
    },
  },
})
