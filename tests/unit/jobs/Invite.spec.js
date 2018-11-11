import { mount } from '@vue/test-utils'
import Invite from '@/views/jobs/Invite'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import mockAxios from 'jest-mock-axios'

Vue.use(Vuelidate)

describe('Add Job Form', () => {
  let cmp

  const $route = {
    params: {
      id: 12
    }
  }

  beforeEach(() => {
    cmp = mount(Invite, {
      mocks: {
        $route
      },
      stubs: [
        'font-awesome-icon'
      ]
    })
  })

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset()
  })

  it('has expected html structure', () => {
    cmp.vm.formEmail = 'test1@email.com'
    cmp.vm.$v.formEmail.$touch()
    cmp.vm.addEmail()

    cmp.vm.formEmail = 'test2@email.com'
    cmp.vm.$v.formEmail.$touch()
    cmp.vm.addEmail()

    expect(cmp.html()).toMatchSnapshot()
  })

  it("doesn't add invalid email", () => {
    cmp.vm.formEmail = 'notAnEmail'
    cmp.vm.$v.formEmail.$touch()
    cmp.vm.addEmail()

    expect(cmp.vm.addresses.length).toBe(0)
  })

  it('reads the job', () => {
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
  })
})
