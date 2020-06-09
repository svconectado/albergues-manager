import {
  POST_USER_LOGIN_PENDING,
  POST_USER_LOGIN_FULFILLED,
  POST_USER_LOGIN_REJECTED,
  GET_USER_LOGOUT_PENDING,
  GET_USER_LOGOUT_FULFILLED,
  GET_USER_LOGOUT_REJECTED
} from '../actions/user-mutation-types'

// https://dev.to/localeai/architecting-vuex-store-for-large-scale-vue-js-applications-4f1f
// 4. Resseting module state
const initialState = () => ({
  user: {
    logged: false
  },
  status: {
    get: {
      isPending: true,
      isFulfilled: false,
      isRejected: false
    },
    post: {
      isPending: true,
      isFulfilled: false,
      isRejected: false
    }
  }
})

export const state = () => initialState()

export const mutations = {
  [POST_USER_LOGIN_PENDING](state) {
    state.status.post = {
      isPending: true,
      isFulfilled: false,
      isRejected: false
    }
  },
  [POST_USER_LOGIN_FULFILLED](state, payload) {
    state.user = {
      ...payload,
      logged: true
    }
    state.status.post = {
      isPending: false,
      isFulfilled: true,
      isRejected: false
    }
  },
  [POST_USER_LOGIN_REJECTED](state) {
    state.status.post = {
      isPending: false,
      isFulfilled: false,
      isRejected: true
    }
  },
  [GET_USER_LOGOUT_PENDING](state) {
    state.status.get = {
      isPending: true,
      isFulfilled: false,
      isRejected: false
    }
  },
  [GET_USER_LOGOUT_FULFILLED](state) {
    const newState = initialState()
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key]
    })
    state.status.get = {
      isPending: false,
      isFulfilled: true,
      isRejected: false
    }
  },
  [GET_USER_LOGOUT_REJECTED](state) {
    state.status.get = {
      isPending: false,
      isFulfilled: false,
      isRejected: true
    }
  }
}

export const actions = {
  postUserLoginPending({ commit }) {
    commit(POST_USER_LOGIN_PENDING)
    return Promise.resolve()
  },
  postUserLoginFulfilled({ commit }, user) {
    commit(POST_USER_LOGIN_FULFILLED, user)
    return Promise.resolve()
  },
  postUserLoginRejected({ commit }) {
    commit(POST_USER_LOGIN_REJECTED)
    return Promise.resolve()
  },
  getUserLogoutPending({ commit }) {
    commit(GET_USER_LOGOUT_PENDING)
    return Promise.resolve()
  },
  getUserLogoutFulfilled({ commit }, user) {
    commit(GET_USER_LOGOUT_FULFILLED, user)
    return Promise.resolve()
  },
  getUserLogoutRejected({ commit }) {
    commit(GET_USER_LOGOUT_FULFILLED)
    return Promise.resolve()
  },
  async loginUser({ dispatch }, data) {
    try {
      await dispatch('postUserLoginPending')
      const user = await this.$axios.$post('auth/local', data)
      await dispatch('postUserLoginFulfilled', user)
      return Promise.resolve()
    } catch (error) {
      await dispatch('postUserLoginRejected', error)
      return Promise.reject(error)
    }
  },
  async logoutUser({ dispatch }) {
    try {
      await dispatch('getUserLogoutPending')
      this.$axios.setToken(false)
      await dispatch('getUserLogoutFulfilled')
      return Promise.resolve()
    } catch (error) {
      await dispatch('getUserLogoutRejected', error)
      return Promise.reject(error)
    }
  }
}
