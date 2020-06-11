import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export const state = () => ({})

export const mutations = {}

export const actions = {
  nuxtServerInit({ dispatch }, { app }) {
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt#api
    const cookies = app.$cookies.get('vuex')
    if (cookies) {
      const {
        users: { user }
      } = cookies
      if (user.logged) {
        dispatch('users/postUserLoginFulfilled', user)
      }
    }
  }
}

export const plugins = [
  // https://github.com/robinvdvleuten/vuex-persistedstate
  createPersistedState({
    paths: ['users.user'],
    storage: {
      getItem: (key) => Cookies.getJSON(key),
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 3, secure: false }),
      removeItem: (key) => Cookies.remove(key)
    }
  })
]
