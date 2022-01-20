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

    const getters = {
      isLoggedIn: () => true,
      isContractorUser: () => true
    }
    const store = new Vuex.Store({
      getters
    })
    const $route = {
      name: 'test'
    }
    const cmp = mount(App, {
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

    const getters = {
      isLoggedIn: () => false,
      isContractorUser: () => true
    }
    const store = new Vuex.Store({
      getters
    })
    const cmp = mount(App, {
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

    const getters = {
      isLoggedIn: () => true,
      isContractorUser: () => true
    }
    const store = new Vuex.Store({
      getters
    })
    const $route = {
      name: 'jobs index'
    }
    const cmp = mount(App, {
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

    const getters = {
      isLoggedIn: () => true,
      isContractorUser: () => true
    }
    const store = new Vuex.Store({
      getters
    })
    const $route = {
      name: 'new job'
    }
    const cmp = mount(App, {
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

    const getters = {
      isLoggedIn: () => true,
      isContractorUser: () => true
    }
    const actions = {
      logout: jest.fn()
    }
    const store = new Vuex.Store({
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
    const cmp = mount(App, {
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
  it('renders for subcontractor', () => {
    // This is a workaround because axios is still the mocked axios
    axios.interceptors = {}
    axios.interceptors.response = {}
    axios.interceptors.response.use = jest.fn()

    const getters = {
      isLoggedIn: () => true,
      isContractorUser: () => false
    }
    const store = new Vuex.Store({
      getters
    })
    const $route = {
      name: 'test'
    }
    const cmp = mount(App, {
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
})
