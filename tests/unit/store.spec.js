import store from '@/store'
import mockAxios from 'jest-mock-axios'
import axios from 'axios'
// import flushPromises from 'flush-promises'

describe('Vuex store', () => {
  beforeEach(() => {
    store.replaceState({
      status: '',
      token: '',
      user: '',
      refresher: ''
    })
  })
  it('gets status', () => {
    store.state.status = 'test status'
    expect(store.getters.authStatus).toBe('test status')
  })
  it('reports not logged in without a token', () => {
    expect(store.getters.isLoggedIn).toBe(false)
  })
  it('reports not logged in with expired token', () => {
    store.state.token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1fQ.2QdEUMj0lBSB1276xa3yW6MNM5PdzKrUFYNSDKkD_NuB0kHnVV_4R8Rt1dISQ99f-Res-YSqnsCApbNudr1p3g'
    expect(store.getters.isLoggedIn).toBe(false)
  })
  it('reports logged in with valid token', () => {
    // make vuex think we are logged in.  Expires in 2361
    store.state.token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3ODc3fQ.6xV-z88Nvmag8i4jVwmOZjX3MhCYAgb3rqttN4ROix3EbtHLwYIG3utNVaCpCN2cS7QFAJM3CPnfiS5_s9luiA'
    expect(store.getters.isLoggedIn).toBe(true)
  })
  it('handles failed refresh', () => {
    const pause = function () {
      // nothing
    }
    store.replaceState({
      status: 'abc',
      token: 'abc',
      user: 'abc',
      refresher: setInterval(pause, 500)
    })
    store.dispatch('refresh')
      .then(() => {
        expect(1).toBe(0) // promise should be rejected
      })
      .catch(() => {
        // ignore the error and do the asserts
      })
    mockAxios.mockError()
    expect(mockAxios.get).toBeCalledWith('/token-refresh')
    expect(store.state.status).toBe('error')
    expect(store.state.token).toBe('')
    expect(store.state.user).toBe('')
    expect(store.state.refresher).toBe('')
  })
  it('handles successful refresh', () => {
    axios.defaults = {}
    axios.defaults.headers = {}
    axios.defaults.headers.common = []
    const pause = function () {
      // nothing
    }
    store.replaceState({
      status: 'abc',
      token: 'abc',
      user: 'abc',
      refresher: setInterval(pause, 500)
    })
    const refresherVal = store.state.refresher
    store.dispatch('refresh')
      .then(() => {
        // nothing
      })
      .catch(() => {
        expect(1).toBe(0) // promise should be resolved
      })
    mockAxios.mockResponse({
      data: {
        token: 'test token'
      }
    })
    expect(mockAxios.get).toBeCalledWith('/token-refresh')
    expect(store.state.status).toBe('success')
    expect(store.state.token).toBe('test token')
    expect(store.state.user).toBe('abc')
    expect(store.state.refresher).toBe(refresherVal)
    expect(axios.defaults.headers.common['Planroom-Authorization']).toBe('Bearer test token')
  })
  it('logs out', () => {
    axios.defaults = {}
    axios.defaults.headers = {}
    axios.defaults.headers.common = []
    axios.defaults.headers.common['Planroom-Authorization'] = 'some token'
    const pause = function () {
      // nothing
    }
    store.replaceState({
      status: 'abc',
      token: 'abc',
      user: 'abc',
      refresher: setInterval(pause, 500)
    })
    store.dispatch('logout')
      .then(() => {
        // nothing
      })
      .catch(() => {
        expect(1).toBe(0) // promise should be resolved
      })

    expect(store.state.status).toBe('')
    expect(store.state.token).toBe('')
    expect(store.state.user).toBe('')
    expect(store.state.refresher).toBe('')
    expect(axios.defaults.headers.common['Planroom-Authorization']).toBe(undefined)
  })
  it('handles failed logins', () => {
    const pause = function () {
      // nothing
    }
    store.replaceState({
      status: 'abc',
      token: 'abc',
      user: 'abc',
      refresher: setInterval(pause, 500)
    })
    store.dispatch('login', {email: 'joe@joe.com', password: 'password'})
      .then(() => {
        expect(1).toBe(0) // promise should be rejected
      })
      .catch(() => {
        // ignore the error and do the asserts
      })
    mockAxios.mockError()
    expect(mockAxios.post).toBeCalledWith('/login', { email: 'joe@joe.com', password: 'password' })
    expect(store.state.status).toBe('error')
    expect(store.state.token).toBe('')
    expect(store.state.user).toBe('')
    expect(store.state.refresher).toBe('')
  })
  it('handles successful logins', () => {
    const pause = function () {
      // nothing
    }
    axios.defaults = {}
    axios.defaults.headers = {}
    axios.defaults.headers.common = []
    store.replaceState({
      status: 'abc',
      token: 'abc',
      user: 'abc',
      refresher: setInterval(pause, 500)
    })
    store.dispatch('login', { email: 'joe@joe.com', password: 'password' })
      .then(() => {
        // ignoring this
      })
      .catch(() => {
        expect(1).toBe(0) // promise should be resolved
      })
    const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjk5OTk5OTk5OTksImVtYWlsIjoiSk9FQGpvZS5jb20ifQ.5LAFiI3QdcttM-Eck2sa-7wN2KubmVGhsFOUitG5yg3bUWXNqLfpbX1Tq7Bj9h9efrYJJhCbpjPMowJdM-lHNQ'
    mockAxios.mockResponse({
      data: {
        token
      }
    })
    expect(mockAxios.post).toBeCalledWith('/login', { email: 'joe@joe.com', password: 'password' })
    expect(store.state.status).toBe('success')
    expect(store.state.token).toBe(token)
    expect(store.state.user).toBe('JOE@joe.com') // caps because that's how the token has it
    expect(store.state.refresher).toBeTruthy()
    expect(axios.defaults.headers.common['Planroom-Authorization']).toBe('Bearer ' + token)
  })
})
