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
    mockAxios.reset()
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
        bidDate: '2017-12-23',
        bidEmail: 'abcdef@xyz.com',
        bonding: false,
        name: 'My Second Test Job',
        prebidAddress: '234 Main St.',
        prebidDateTime: '2018-07-01 18:30:00',
        subcontractorBidsDue: '2017-06-01 08:30:00',
        taxible: true,
        id: 20
      }
    }
    mockAxios.mockResponse(response)
    expect(cmp.vm.job).toBe(response.data)
  })

  it('deletes an email address', () => {
    cmp.vm.formEmail = 'test1@email.com'
    cmp.vm.$v.formEmail.$touch()
    cmp.vm.addEmail()

    cmp.vm.formEmail = 'test2@email.com'
    cmp.vm.$v.formEmail.$touch()
    cmp.vm.addEmail()

    // delete the first and check for only the second
    const spans = cmp.findAll('span.delete')
    spans.wrappers[0].trigger('click')

    expect(cmp.vm.addresses.length).toBe(1)
    expect(cmp.vm.addresses[0]).toBe('test2@email.com')
  })

  it('validates the email', () => {
    cmp.vm.formEmail = ''
    cmp.vm.$v.formEmail.$touch()
    expect(cmp.find('#formEmailGroup').classes()).not.toContain('invalid')

    cmp.vm.formEmail = 'not an email'
    cmp.vm.$v.formEmail.$touch()
    expect(cmp.find('#formEmailGroup').classes()).toContain('invalid')

    cmp.vm.formEmail = 'toolongtoolongtoolongtoolongtoolongtoolongtoolong@toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong.com'
    cmp.vm.$v.formEmail.$touch()
    expect(cmp.find('#formEmailGroup').classes()).toContain('invalid')

    cmp.vm.formEmail = 'email@somewhere.com'
    cmp.vm.$v.formEmail.$touch()
    expect(cmp.find('#formEmailGroup').classes()).not.toContain('invalid')
  })

  it('disables add email button', () => {
    // the form should be invalid thus disabled
    expect(cmp.find('#addButton').attributes().disabled).toBe('disabled')

    cmp.vm.formEmail = 'email@somewhere.com'
    cmp.vm.$v.formEmail.$touch()
    cmp.vm.sending = true

    expect(cmp.find('#addButton').attributes().disabled).toBe('disabled')

    cmp.vm.sending = false

    expect(cmp.find('#addButton').attributes().disabled).toBe(undefined)
  })

  it('disables send button', () => {
    // there should be no addresses
    expect(cmp.find('#sendButton').attributes().disabled).toBe('disabled')

    cmp.vm.addresses.push('email@aol.com')
    cmp.vm.sending = true

    expect(cmp.find('#sendButton').attributes().disabled).toBe('disabled')

    cmp.vm.sending = false
    cmp.vm.formEmail = 'something'

    expect(cmp.find('#sendButton').attributes().disabled).toBe('disabled')

    cmp.vm.formEmail = ''

    expect(cmp.find('#sendButton').attributes().disabled).toBe(undefined)
  })

  it('Adds an address', () => {
    cmp.vm.formEmail = 'email@somewhere.com'
    cmp.vm.$v.formEmail.$touch()
    cmp.vm.addEmail()
    expect(cmp.vm.addresses.length).toBe(1)
    expect(cmp.vm.addresses[0]).toBe('email@somewhere.com')
  })

  it('sends emails', () => {
    // resolve axios on created hook
    const response = {
      data: {
        bidDate: '2017-12-23',
        bidEmail: 'abcdef@xyz.com',
        bonding: false,
        name: 'My Second Test Job',
        prebidAddress: '234 Main St.',
        prebidDateTime: '2018-07-01 18:30:00',
        subcontractorBidsDue: '2017-06-01 08:30:00',
        taxible: true,
        id: 20
      }
    }
    mockAxios.mockResponse(response)

    cmp.vm.formEmail = 'test1@email.com'
    cmp.vm.$v.formEmail.$touch()
    cmp.vm.addEmail()

    cmp.vm.formEmail = 'test2@email.com'
    cmp.vm.$v.formEmail.$touch()
    cmp.vm.addEmail()

    cmp.vm.validDays = 4

    cmp.vm.sendEmails()

    let sendingDiv = cmp.find('.working')

    expect(sendingDiv.html()).toContain('Sending... Please do not navigate away from this page')
    expect(mockAxios.post).toHaveBeenCalledWith('/jobs/12/invite', { emails: cmp.vm.addresses, validDays: 4 })
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    mockAxios.mockResponse({})

    const alerts = cmp.findAll('div.alert')
    expect(alerts.length).toBe(1)
    expect(alerts.at(0).classes()).toContain('alert-success')
    expect(alerts.at(0).html()).toContain('Emails Sent')

    sendingDiv = cmp.findAll('.working')
    expect(sendingDiv.length).toBe(0)

    expect(cmp.vm.addresses.length).toBe(0)
    expect(cmp.vm.validDays).toBe(3)
  })

  it('handles failure to send emails', () => {
    // resolve axios on created hook
    const response = {
      data: {
        bidDate: '2017-12-23',
        bidEmail: 'abcdef@xyz.com',
        bonding: false,
        name: 'My Second Test Job',
        prebidAddress: '234 Main St.',
        prebidDateTime: '2018-07-01 18:30:00',
        subcontractorBidsDue: '2017-06-01 08:30:00',
        taxible: true,
        id: 20
      }
    }
    mockAxios.mockResponse(response)

    cmp.vm.formEmail = 'test1@email.com'
    cmp.vm.$v.formEmail.$touch()
    cmp.vm.addEmail()

    cmp.vm.formEmail = 'test2@email.com'
    cmp.vm.$v.formEmail.$touch()
    cmp.vm.addEmail()

    cmp.vm.validDays = 4

    cmp.vm.sendEmails()

    let sendingDiv = cmp.find('.working')

    expect(sendingDiv.html()).toContain('Sending... Please do not navigate away from this page')
    expect(mockAxios.post).toHaveBeenCalledWith('/jobs/12/invite', { emails: cmp.vm.addresses, validDays: 4 })
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    mockAxios.mockError()

    const alerts = cmp.findAll('div.alert')
    expect(alerts.length).toBe(1)
    expect(alerts.at(0).classes()).toContain('alert-danger')
    expect(alerts.at(0).html()).toContain('Something went wrong. Emails may not have sent.')

    sendingDiv = cmp.findAll('.working')
    expect(sendingDiv.length).toBe(0)

    expect(cmp.vm.addresses.length).toBe(2)
    expect(cmp.vm.validDays).toBe(4)
  })
})
