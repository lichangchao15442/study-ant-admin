import api from 'api'
import { pathMatchRegexp, router } from 'utils'

const { loginUser } = api

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { put, call, select }) {
      const data = yield call(loginUser, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (!pathMatchRegexp('/login', from)) {
          if (['', '/'].includes(from)) {
            router.push('/dashboard')
          } else router.push(from)
        } else {
          router.push('/dashboard')
        }
      } else {
        console.log('login_false_throw')
        throw data
      }
    },
  },
}
