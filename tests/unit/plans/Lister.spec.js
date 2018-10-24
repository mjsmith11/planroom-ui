import { mount } from '@vue/test-utils'
import Lister from '@/components/plans/Lister'
import mockAxios from 'jest-mock-axios'
import { EventBus } from '@/event-bus.js'

describe('Lister', () => {
  let cmp
  let eventAttachSpy

  beforeEach(() => {
    cmp = mount((Lister), {
      propsData: {
        jobId: 1
      }
    })
    eventAttachSpy = jest.spyOn(EventBus, '$on')
  })

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset()
    EventBus.$off('job-read')
    EventBus.$off('file-uploaded')
    jest.clearAllMocks()
  })

  it('filters object keys', () => {
    expect(cmp.vm.$options.filters.removeDir('1/myFile.txt')).toBe('myFile.txt')
  })

  it('has expected html structure', () => {
    const response = {
      data: [
        {
          key: '1/a blueprint.pdf',
          url: 'http://test.com/1/aBlueprint.com'
        },
        {
          key: '1/another blueprint.pdf',
          url: 'http://test.com/1/anotherBlueprint.com'
        }
      ]
    }
    cmp.vm.loadList()
    mockAxios.mockResponse(response)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('loads the list', () => {
    const response = {
      data: [
        {
          key: '1/a blueprint.pdf',
          url: 'http://test.com/1/aBlueprint.com'
        },
        {
          key: '1/another blueprint.pdf',
          url: 'http://test.com/1/anotherBlueprint.com'
        }
      ]
    }
    cmp.vm.loadList()
    mockAxios.mockResponse(response)
    expect(cmp.vm.plans).toBe(response.data)
  })

  it('attaches events', () => {
    // two events should get attached in the create hook
    expect(eventAttachSpy).toHaveBeenCalledTimes(2)
  })
})
