import { mount, RouterLinkStub } from '@vue/test-utils'
import JobsIndex from '@/views/jobs/JobsIndex'
import mockAxios from 'jest-mock-axios'

describe('Job Index', () => {
  let cmp

  beforeEach(() => {
    cmp = mount(JobsIndex, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
  })

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset()
  })

  it('has expected html structure', () => {
    const response = {
      data: [
        {
          'bidDate': '2017-03-23',
          'bidEmail': 'abc@xyz.com',
          'bonding': true,
          'name': 'abc',
          'prebidAddress': '123 Main St.',
          'prebidDateTime': '2018-07-01T18:30',
          'subcontractorBidsDue': '2017-06-01T08:30',
          'taxible': true,
          'id': 25
        },
        {
          'bidDate': '2017-12-23',
          'bidEmail': 'abcdef@xyz.com',
          'bonding': false,
          'name': 'def',
          'prebidAddress': '234 Main St.',
          'prebidDateTime': '2018-07-01T18:30',
          'subcontractorBidsDue': '2017-06-01T08:30',
          'taxible': true,
          'id': 20
        }
      ]
    }
    mockAxios.mockResponse(response)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('processes api response', () => {
    expect(mockAxios.get).toHaveBeenCalledWith('/jobs')
    expect(mockAxios.get).toHaveBeenCalledTimes(1)

    const response = {
      data: [
        {
          'bidDate': '2017-03-23',
          'bidEmail': 'abc@xyz.com',
          'bonding': true,
          'name': 'My Test Job',
          'prebidAddress': '123 Main St.',
          'prebidDateTime': '2018-07-01T18:30',
          'subcontractorBidsDue': '2017-06-01T08:30',
          'taxible': true,
          'id': 25
        },
        {
          'bidDate': '2017-12-23',
          'bidEmail': 'abcdef@xyz.com',
          'bonding': false,
          'name': 'My Second Test Job',
          'prebidAddress': '234 Main St.',
          'prebidDateTime': '2018-07-01T18:30',
          'subcontractorBidsDue': '2017-06-01T08:30',
          'taxible': true,
          'id': 20
        }
      ]
    }
    mockAxios.mockResponse(response)
    expect(cmp.vm.jobs).toBe(response.data)
  })

  // TODO add tests for error handling when it's implemented
})
