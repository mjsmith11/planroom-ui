import { mount, createLocalVue } from '@vue/test-utils'
import ShowJob from '@/views/jobs/ShowJob'
import mockAxios from 'jest-mock-axios'
import { EventBus } from '@/event-bus.js'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Show Job', () => {
  let cmp
  let getters = {
    token: () => 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3ODc3fQ.6xV-z88Nvmag8i4jVwmOZjX3MhCYAgb3rqttN4ROix3EbtHLwYIG3utNVaCpCN2cS7QFAJM3CPnfiS5_s9luiA'
  }
  let store = new Vuex.Store({
    getters
  })
  const $route = {
    params: {
      id: 12
    }
  }

  beforeEach(() => {
    cmp = mount(ShowJob, {
      mocks: {
        $route
      },
      store,
      localVue
    })
  })

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset()
  })
  describe('Bool filter', () => {
    it('detects invalid input', () => {
      expect(cmp.vm.$options.filters.TFtoYN(2)).toBe('')
    })

    it('returns Yes', () => {
      expect(cmp.vm.$options.filters.TFtoYN(1)).toBe('Yes')
    })

    it('returns No', () => {
      expect(cmp.vm.$options.filters.TFtoYN(0)).toBe('No')
    })
  })

  it('has expected html structure', () => {
    const response = {
      data: {
        'bidDate': '2017-03-23',
        'bidEmail': 'abc@xyz.com',
        'bonding': 0,
        'name': 'abc',
        'prebidAddress': '123 Main St.',
        'prebidDateTime': '2018-07-01 18:30:00',
        'subcontractorBidsDue': '2017-06-01 08:30:00',
        'taxible': 1,
        'id': 25
      }
    }
    mockAxios.mockResponse(response)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('processes api response', () => {
    let evtHandler = jest.fn()
    EventBus.$on('job-read', evtHandler)
    expect(mockAxios.get).toHaveBeenCalledWith('/jobs/12')
    expect(mockAxios.get).toHaveBeenCalledTimes(1)

    const response = {
      data: {
        'bidDate': '2017-12-23',
        'bidEmail': 'abcdef@xyz.com',
        'bonding': false,
        'name': 'My Second Test Job',
        'prebidAddress': '234 Main St.',
        'prebidDateTime': '2018-07-01 18:30:00',
        'subcontractorBidsDue': '2017-06-01 08:30:00',
        'taxible': true,
        'id': 20
      }
    }
    mockAxios.mockResponse(response)
    expect(cmp.vm.job).toBe(response.data)
    expect(evtHandler).toHaveBeenCalledTimes(1)
  })

  // TODO add tests for error handling when it's implemented
})
