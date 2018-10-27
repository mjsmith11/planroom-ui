import { beforeEach, beforeLoginEnter } from '@/router.js'
import store from '@/store'

describe('Router', () => {
  afterEach(() => {
    store.state.token = undefined
  })
  it('redirects to login when not logged in', () => {
    const to = {
      matched: [{ meta: { requiresAuth: true } }]
    }
    const next = jest.fn()

    beforeEach(to, undefined, next)

    expect(next).toBeCalledWith('/login')
  })

  it('allows the request when authenticated', () => {
    const to = {
      matched: [{ meta: { requiresAuth: true } }]
    }
    const next = jest.fn()
    // make vuex think we are logged in.  Expires in 2361
    store.state.token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3ODc3fQ.6xV-z88Nvmag8i4jVwmOZjX3MhCYAgb3rqttN4ROix3EbtHLwYIG3utNVaCpCN2cS7QFAJM3CPnfiS5_s9luiA'

    beforeEach(to, undefined, next)

    expect(next).toBeCalledWith()
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
    store.state.token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3ODc3fQ.6xV-z88Nvmag8i4jVwmOZjX3MhCYAgb3rqttN4ROix3EbtHLwYIG3utNVaCpCN2cS7QFAJM3CPnfiS5_s9luiA'

    beforeLoginEnter(undefined, undefined, next)

    expect(next).toBeCalledWith('/jobs')
  })
})
