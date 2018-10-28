import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: '',
    user: '',
    refresher: ''
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, data) {
      state.status = 'success'
      state.token = data.token
      state.user = data.user
      state.refresher = data.refresher
    },
    auth_error (state) {
      state.status = 'error'
      state.token = ''
      state.user = ''
      clearInterval(state.refresher)
      state.refresher = ''
    },
    auth_refresh (state, token) {
      state.status = 'success'
      state.token = token
    },
    logout (state) {
      state.status = ''
      state.token = ''
      state.user = ''
      clearInterval(state.refresher)
      state.refresher = ''
    }
  },
  actions: {
    login ({ commit, dispatch }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post('/login', user)
          .then(resp => {
            const token = resp.data.token
            const decoded = parseJwt(token)
            const user = decoded.email
            const refresher = setInterval(dispatch.bind(this, 'refresh'), 14 * 60 * 1000) // every 14 minutes
            axios.defaults.headers.common['Planroom-Authorization'] = 'Bearer ' + token
            commit('auth_success', { token, user, refresher })
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        delete axios.defaults.headers.common['Planroom-Authorization']
        resolve()
      })
    },
    refresh ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.get('/token-refresh')
          .then(resp => {
            const token = resp.data.token
            axios.defaults.headers.common['Planroom-Authorization'] = 'Bearer ' + token
            commit('auth_refresh', token)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            reject(err)
          })
      })
    }
  },
  getters: {
    isLoggedIn: state => {
      if (!state.token) {
        // if no token, we aren't logged in
        return false
      } else {
        // see if the token is expired
        let decoded = parseJwt(state.token)
        let now = Math.round((new Date()).getTime() / 1000)
        // using a 5 second threshold to give caller time to do something if this is true
        return (decoded.exp - now >= 5)
      }
    },
    authStatus: state => state.status
  }
})

function parseJwt (token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(window.atob(base64))
};
