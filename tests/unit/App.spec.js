import { mount, createLocalVue } from '@vue/test-utils'
import App from '@/App'
import Vuex from 'vuex'
import axios from 'axios'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('App', () => {
  it('has correct html structure logged in', () => {
    // This is a workaround because axios is still the mocked axios
    axios.interceptors = {}
    axios.interceptors.response = {}
    axios.interceptors.response.use = jest.fn()

    let getters = {
      isLoggedIn: () => true
    }
    let store = new Vuex.Store({
      getters
    })
    const $route = {
      name: 'test'
    }
    let cmp = mount(App, {
      stubs: [
        'router-view',
        'router-link'
      ],
      store,
      localVue,
      mocks: {
        $route
      }

    })
    expect(cmp.html()).toMatchSnapshot()
  })
  it('has correct html structure logged out', () => {
    // This is a workaround because axios is still the mocked axios
    axios.interceptors = {}
    axios.interceptors.response = {}
    axios.interceptors.response.use = jest.fn()

    let getters = {
      isLoggedIn: () => false
    }
    let store = new Vuex.Store({
      getters
    })
    let cmp = mount(App, {
      stubs: [
        'router-view',
        'router-link'
      ],
      store,
      localVue
    })
    expect(cmp.html()).toMatchSnapshot()
  })

  it('has correct html structure on jobs index route', () => {
    // This is a workaround because axios is still the mocked axios
    axios.interceptors = {}
    axios.interceptors.response = {}
    axios.interceptors.response.use = jest.fn()

    let getters = {
      isLoggedIn: () => true
    }
    let store = new Vuex.Store({
      getters
    })
    const $route = {
      name: 'jobs index'
    }
    let cmp = mount(App, {
      stubs: [
        'router-view',
        'router-link'
      ],
      store,
      localVue,
      mocks: {
        $route
      }
    })
    expect(cmp.html()).toMatchSnapshot()
  })

  it('has correct html structure on jobs new job', () => {
    // This is a workaround because axios is still the mocked axios
    axios.interceptors = {}
    axios.interceptors.response = {}
    axios.interceptors.response.use = jest.fn()

    let getters = {
      isLoggedIn: () => true
    }
    let store = new Vuex.Store({
      getters
    })
    const $route = {
      name: 'new job'
    }
    let cmp = mount(App, {
      stubs: [
        'router-view',
        'router-link'
      ],
      store,
      localVue,
      mocks: {
        $route
      }
    })
    expect(cmp.html()).toMatchSnapshot()
  })

  it('logs out', () => {
    // This is a workaround because axios is still the mocked axios
    axios.interceptors = {}
    axios.interceptors.response = {}
    axios.interceptors.response.use = jest.fn()

    let getters = {
      isLoggedIn: () => true
    }
    let actions = {
      logout: jest.fn()
    }
    let store = new Vuex.Store({
      state: {},
      actions,
      getters
    })
    const $route = {
      name: 'jobs index'
    }
    const $router = {
      push: jest.fn()
    }
    let cmp = mount(App, {
      stubs: [
        'router-view',
        'router-link'
      ],
      store,
      localVue,
      mocks: {
        $route,
        $router
      }
    })
    cmp.find('#logout-link').trigger('click')
    expect(actions.logout).toHaveBeenCalled()
    expect($router.push).toHaveBeenCalledWith('/login')
  })
})
