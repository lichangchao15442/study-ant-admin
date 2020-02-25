import store from 'store'
import { pathMatchRegexp, router, queryLayout } from 'utils'
import api from 'api'
import { stringify } from 'qs'
import config from 'config'
import { ROLE_TYPE } from 'utils/constant'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'

const { queryUserInfo, queryRouteList, logoutUser } = api

const goDashboard = () => {
  if (pathMatchRegexp(['/', '/login'], window.location.pathname)) {
    router.push({ pathname: '/dashboard' })
  }
}

export default {
  namespace: 'app',
  state: {
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    locationPathname: '',
    locationQuery: {},
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
  },
  subscriptions: {
    // 项目入口：进入登录
    setup({ dispatch }) {
      dispatch({ type: 'query' })
    },
    // 监听路由
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        console.log('setupHistory', location)
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },
    // 取消非当前页面发起的请求
    setupRequestCancel({ history }) {
      history.listen(() => {
        // 每发送一个axios请求都会创建一个取消令牌
        const { cancelRequest = new Map() } = window
        cancelRequest.forEach((value, key) => {
          // 只会保留在当前页面发出的请求
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
      // isInit用于阻止刷新后触发query(可理解为登录flag)
      const isInit = store.get('isInit')
      if (isInit) {
        goDashboard()
        return
      }

      const { locationPathname } = yield select(_ => _.app)
      const { success, user } = yield call(queryUserInfo, payload)
      if (success && user) {
        const { list } = yield call(queryRouteList)
        const { permissions } = user
        let routeList = list
        if (
          permissions.role === ROLE_TYPE.ADMIN ||
          permissions.role === ROLE_TYPE.DEVELOPER
        ) {
          permissions.visit = list.map(item => item.id)
        } else {
          routeList = list.filter(item => {
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid
                ? permissions.visit.includes(item.mpid) || item.mpid === '-1'
                : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true,
            ]
            return cases.every(_ => _)
          })
        }
        store.set('routeList', routeList)
        store.set('permissions', permissions)
        store.set('user', user)
        store.set('isInit', true)
        goDashboard()
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
      const data = yield call(logoutUser)
      if (data.success) {
        store.set('routeList', [])
        store.set('permissions', { visit: [] })
        store.set('user', {})
        store.set('isInit', false)
        yield put({ type: 'query' })
      } else {
        throw data
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
    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },
    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },
    allNotificationsRead(state) {
      state.notifications = []
    },
  },
}
