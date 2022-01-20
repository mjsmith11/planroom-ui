import store from '@/store'
import mockAxios from 'jest-mock-axios'
import axios from 'axios'
// import flushPromises from 'flush-promises'

// tokens can be decoded with https://jwt.io

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
  it('gets token', () => {
    store.state.token = 'test token'
    expect(store.getters.token).toBe('test token')
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
  it('gets job', () => {
    store.state.token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3LCJyb2xlIjoic3ViY29udHJhY3RvciIsImpvYiI6IjciLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.UibZSs0Bc0HMaacj7EnGR95X38DH5cTw5Hf90aiUq-y-38xjMIgJYiowa_IM8BujLvB1fHj6ucVniv7yx22uFw'
    expect(store.getters.job).toBe('7')
  })
  it('assumes contractor role with no token', () => {
    store.state.token = ''
    expect(store.getters.isContractorUser).toBe(true)
    store.state.token = undefined
    expect(store.getters.isContractorUser).toBe(true)
  })
  it('recognizes contractor token', () => {
    store.state.token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3LCJyb2xlIjoiY29udHJhY3RvciIsImpvYiI6IjciLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.cJSBk6Sxiwf194U0sa6XfWfGcpi6G_GNr-AXjl0CQQOZlCfwH254zo7fLTt80tQQgoC5O9JR2K1Hv3et1zzomA'
    expect(store.getters.isContractorUser).toBe(true)
  })
  it('recognizes subcontractor token', () => {
    store.state.token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3LCJyb2xlIjoic3ViY29udHJhY3RvciIsImpvYiI6IjciLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.UibZSs0Bc0HMaacj7EnGR95X38DH5cTw5Hf90aiUq-y-38xjMIgJYiowa_IM8BujLvB1fHj6ucVniv7yx22uFw'
    expect(store.getters.isContractorUser).toBe(false)
  })
  it('gets exp', () => {
    store.state.token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3LCJyb2xlIjoic3ViY29udHJhY3RvciIsImpvYiI6IjciLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.UibZSs0Bc0HMaacj7EnGR95X38DH5cTw5Hf90aiUq-y-38xjMIgJYiowa_IM8BujLvB1fHj6ucVniv7yx22uFw'
    expect(store.getters.exp).toBe(12345677)
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
    store.dispatch('login', { email: 'joe@joe.com', password: 'password' })
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
  it('stores subcontractor token', () => {
    store.replaceState({
      status: 'abc',
      token: 'abc',
      user: 'abc',
      refresher: 'fakeFunction'
    })

    axios.defaults = {}
    axios.defaults.headers = {}
    axios.defaults.headers.common = []

    const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3LCJyb2xlIjoiY29udHJhY3RvciIsImpvYiI6IjciLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.cJSBk6Sxiwf194U0sa6XfWfGcpi6G_GNr-AXjl0CQQOZlCfwH254zo7fLTt80tQQgoC5O9JR2K1Hv3et1zzomA'
    store.dispatch('subcontractorToken', token)

    expect(store.state.status).toBe('manual')
    expect(store.state.token).toBe(token)
    expect(store.state.user).toBe('test@test.com') // caps because that's how the token has it
    expect(store.state.refresher).toBe('')
    expect(axios.defaults.headers.common['Planroom-Authorization']).toBe('Bearer ' + token)
  })
})
