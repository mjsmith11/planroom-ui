import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: '',
    user: {}
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post('/login', user)
          .then(resp => {
            const token = resp.data.token
            const decoded = parseJwt(token)
            const user = decoded.email
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            commit('auth_success', token, user)
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
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    refresh ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.get('/token-refresh')
          .then(resp => {
            const token = resp.data.token
            const decoded = parseJwt(token)
            const user = decoded.email
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            commit('auth_success', token, user)
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
