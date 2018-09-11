import { shallowMount } from '@vue/test-utils'
import NewJob from '@/views/jobs/NewJob'
import Vue from 'vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

describe('Add Job Form', () => {
  let cmp

  beforeEach(() => {
    cmp = shallowMount(NewJob)
  })

  it('has expected html structure', () => {
    expect(cmp.html()).toMatchSnapshot()
  })

  it('renders without failed validation', () => {
    // submit is disabled
    expect(cmp.find('button[type="submit"]').attributes()['disabled']).toBe('disabled')

    // no form groups have invalid class
    const groups = cmp.findAll('.form-group')
    groups.wrappers.forEach(group => expect(group.classes()).not.toContain('invalid'))
  })

  it('highlights invalid fields', () => {
    const nameField = cmp.find('#jobName')
    nameField.setValue('')
    nameField.trigger('blur')
    cmp.vm.$forceUpdate()
    expect(cmp.find('#jobNameGroup').classes()).toContain('invalid')

    const bidDateField = cmp.find('#bidDate')
    bidDateField.setValue('')
    bidDateField.trigger('blur')
    cmp.vm.$forceUpdate()
    expect(cmp.find('#bidDateGroup').classes()).toContain('invalid')

    const subcontractorBidsDueField = cmp.find('#subcontractorBidsDue')
    subcontractorBidsDueField.setValue('')
    subcontractorBidsDueField.trigger('blur')
    cmp.vm.$forceUpdate()
    expect(cmp.find('#subcontractorBidsDueGroup').classes()).toContain('invalid')

    const prebidField = cmp.find('#prebid')
    prebidField.setValue('')
    prebidField.trigger('blur')
    cmp.vm.$forceUpdate()
    expect(cmp.find('#prebidGroup').classes()).toContain('invalid')

    cmp.vm.addressStr = ''
    cmp.vm.$v.addressStr.$touch()
    cmp.vm.$forceUpdate()
    expect(cmp.find('#prebidAddressGroup').classes()).toContain('invalid')

    const bidEmailField = cmp.find('#bidEmail')
    bidEmailField.setValue('')
    bidEmailField.trigger('blur')
    cmp.vm.$forceUpdate()
    expect(cmp.find('#bidEmailGroup').classes()).toContain('invalid')
  })
  it('clears fields and validation highlighting', () => {

  })

  it('enables submit button with valid input', () => {

  })
  // uses axios and shows alerts
})
