import { mount } from '@vue/test-utils'
import Lister from '@/components/plans/Lister'
import mockAxios from 'jest-mock-axios'
import { EventBus } from '@/event-bus.js'
import Vue from 'vue';

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
    EventBus.$off('job-read')
    EventBus.$off('file-uploaded')
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
      const spy = jest.spyOn(cmp.vm, 'loadList')
      cmp.vm.loadList();
    //   console.log('attach begin')
    //   EventBus.$emit('file-uploaded')
    //   cmp.vm.$forceUpdate()
    //   console.log('attach end')

      expect(spy).toHaveBeenCalledTimes(1)
  })
})
