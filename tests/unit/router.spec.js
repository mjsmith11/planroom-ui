import { beforeEach, beforeLoginEnter } from '@/router.js'
import store from '@/store'
import axios from 'axios'

/// Tokens in this file can be decoded at jwt.io with secret 'your-256-bit-secret'

describe('Router', () => {
  afterEach(() => {
    store.state.token = undefined
    jest.clearAllMocks()
  })
  it('redirects to login when not logged in', () => {
    const to = {
      matched: [{ meta: { requiresAuth: true } }]
    }
    const next = jest.fn()

    beforeEach(to, undefined, next)

    expect(next).toBeCalledWith('/login')
  })

  it('redirects to expired with expired subcontractor token', () => {
    axios.defaults = {}
    axios.defaults.headers = {}
    axios.defaults.headers.common = []
    const to = {
      matched: [{ meta: { requiresAuth: true } }],
      query: {
        token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3LCJyb2xlIjoic3ViY29udHJhY3RvciIsImpvYiI6IjciLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.UibZSs0Bc0HMaacj7EnGR95X38DH5cTw5Hf90aiUq-y-38xjMIgJYiowa_IM8BujLvB1fHj6ucVniv7yx22uFw'
      },
      path: '/jobs/7'
    }
    const next = jest.fn()
    beforeEach(to, undefined, next)

    expect(next).toBeCalledWith('/expired')
  })

  it('allows contractor request when authenticated', () => {
    const to = {
      matched: [{ meta: { requiresAuth: true } }]
    }
    const next = jest.fn()
    // make vuex think we are logged in.  Expires in 2361
    store.state.token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3ODc3LCJyb2xlIjoiY29udHJhY3RvciIsImpvYiI6IioiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.Ag4_7ra6_LKtw2ZdguCeVE0Xoq16HvNXPaGvlqYysR_xKX7GArJ9FiA8MkFDhfiXCOEY6S-REhqMg4caLRpuFw'

    beforeEach(to, undefined, next)

    expect(next).toBeCalledWith()
  })

  it('allows subcontractor with valid path', () => {
    axios.defaults = {}
    axios.defaults.headers = {}
    axios.defaults.headers.common = []
    const to = {
      matched: [{ meta: { requiresAuth: true } }],
      query: {
        token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3ODc3LCJyb2xlIjoic3ViY29udHJhY3RvciIsImpvYiI6IjciLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.XSgVi9BvS1-5-wkC2YMMSuxym7TQdmA_btdxL4-PsAxSEQyW-QPN2kdEOEEftQiSzRjtS4O99Ra5SEGM5g0cXw'
      },
      path: '/jobs/7'
    }
    const next = jest.fn()
    beforeEach(to, undefined, next)

    expect(next).toBeCalledWith()
  })

  it('redirects subcontractor with invalid path', () => {
    axios.defaults = {}
    axios.defaults.headers = {}
    axios.defaults.headers.common = []
    const to = {
      matched: [{ meta: { requiresAuth: true } }],
      query: {
        token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3ODc3LCJyb2xlIjoic3ViY29udHJhY3RvciIsImpvYiI6IjciLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.XSgVi9BvS1-5-wkC2YMMSuxym7TQdmA_btdxL4-PsAxSEQyW-QPN2kdEOEEftQiSzRjtS4O99Ra5SEGM5g0cXw'
      },
      path: '/jobs/new'
    }
    const next = jest.fn()
    beforeEach(to, undefined, next)

    expect(next).toBeCalledWith('/jobs/7')
  })

  it('allows request to unauthenticated route', () => {
    const to = {
      matched: [{ meta: { requiresAuth: false } }]
    }
    const next = jest.fn()

    beforeEach(to, undefined, next)

    expect(next).toBeCalledWith()
  })

  it('allows unauthenticated user to access login', () => {
    const next = jest.fn()

    beforeLoginEnter(undefined, undefined, next)

    expect(next).toBeCalledWith()
  })

  it('redirects authenticated user from login to jobs', () => {
    const next = jest.fn()

    // make vuex think we are logged in.  Expires in 2361
    store.state.token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3ODc3LCJyb2xlIjoiY29udHJhY3RvciIsImpvYiI6IioiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.Ag4_7ra6_LKtw2ZdguCeVE0Xoq16HvNXPaGvlqYysR_xKX7GArJ9FiA8MkFDhfiXCOEY6S-REhqMg4caLRpuFw'

    beforeLoginEnter(undefined, undefined, next)

    expect(next).toBeCalledWith('/jobs')
  })
  it('handles requests without query params', () => {
    const next = jest.fn()

    const to = {
      matched: [{ meta: { requiresAuth: false } }]
    }

    store.dispatch = jest.fn()
    beforeEach(to, undefined, next)
    expect(store.dispatch).not.toBeCalled()
  })
  it('handles query params without token', () => {
    const next = jest.fn()

    const to = {
      matched: [{ meta: { requiresAuth: false } }],
      query: {
        someField: 'someValue'
      }
    }

    store.dispatch = jest.fn()
    beforeEach(to, undefined, next)
    expect(store.dispatch).not.toBeCalled()
  })
  it('stores query param token in vuex', () => {
    const next = jest.fn()

    const to = {
      matched: [{ meta: { requiresAuth: false } }],
      query: {
        token: 'myToken'
      }
    }

    store.dispatch = jest.fn()
    beforeEach(to, undefined, next)
    expect(store.dispatch).toBeCalledWith('subcontractorToken', 'myToken')
  })
})
