import { mount } from '@vue/test-utils'
import Lister from '@/components/plans/Lister'
import mockAxios from 'jest-mock-axios'
import { EventBus } from '@/event-bus.js'

describe('Job Index', () => {
  let cmp

  beforeEach(() => {
    cmp = mount((Lister), {
      propsData: {
        jobId: 1
      }
    })
  })

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset()
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
})
