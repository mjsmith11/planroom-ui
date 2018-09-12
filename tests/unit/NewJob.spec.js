import { shallowMount } from '@vue/test-utils'
import NewJob from '@/views/jobs/NewJob'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import mockAxios from 'jest-mock-axios'

Vue.use(Vuelidate)

describe('Add Job Form', () => {
  let cmp

  beforeEach(() => {
    cmp = shallowMount(NewJob)
  })

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
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
    bidEmailField.setValue('xyz')
    bidEmailField.trigger('blur')
    cmp.vm.$forceUpdate()
    expect(cmp.find('#bidEmailGroup').classes()).toContain('invalid')
  })

  it('clears fields and validation highlighting', () => {
    cmp.vm.$refs.addressControl.update = jest.fn()

    const nameField = cmp.find('#jobName')
    nameField.setValue('abc')
    nameField.trigger('blur')

    const bidDateField = cmp.find('#bidDate')
    bidDateField.setValue('02/23/2018')
    bidDateField.trigger('blur')

    const subcontractorBidsDueField = cmp.find('#subcontractorBidsDue')
    subcontractorBidsDueField.setValue('01/05/2018 01:55 AM')
    subcontractorBidsDueField.trigger('blur')

    const prebidField = cmp.find('#prebid')
    prebidField.setValue('01/05/2018 01:55 AM')
    prebidField.trigger('blur')

    cmp.vm.addressStr = '123 Main St.'
    cmp.vm.$v.addressStr.$touch()

    const bidEmailField = cmp.find('#bidEmail')
    bidEmailField.setValue('abc')
    bidEmailField.trigger('blur')

    const bondingField = cmp.find('#bonding')
    bondingField.setChecked(true)

    const taxibleField = cmp.find('#taxible')
    taxibleField.setChecked(true)

    cmp.vm.$forceUpdate()

    cmp.vm.clearForm()
    cmp.vm.$forceUpdate()

    // no form groups have invalid class
    const groups = cmp.findAll('.form-group')
    groups.wrappers.forEach(group => expect(group.classes()).not.toContain('invalid'))

    expect(nameField.element.value).toBe('')
    expect(bidDateField.element.value).toBe('')
    expect(subcontractorBidsDueField.element.value).toBe('')
    expect(prebidField.element.value).toBe('')
    expect(cmp.vm.$refs.addressControl.update).toBeCalledWith('')
    expect(bidEmailField.element.value).toBe('')
    expect(bondingField.element.checked).toBe(false)
    expect(taxibleField.element.checked).toBe(false)
  })

  it('enables submit button with valid input', () => {
      const nameField = cmp.find('#jobName')
      nameField.setValue('abc')
      nameField.trigger('blur')

      const bidDateField = cmp.find('#bidDate')
      bidDateField.setValue('2018-03-23')
      bidDateField.trigger('blur')

      const subcontractorBidsDueField = cmp.find('#subcontractorBidsDue')
      subcontractorBidsDueField.setValue('2017-06-01T08:30')
      subcontractorBidsDueField.trigger('blur')

      const prebidField = cmp.find('#prebid')
      prebidField.setValue('2018-07-01T18:30')
      prebidField.trigger('blur')

      cmp.vm.addressStr = '123 Main St.'
      cmp.vm.$v.addressStr.$touch()

      const bidEmailField = cmp.find('#bidEmail')
      bidEmailField.setValue('abc@xyz.com')
      bidEmailField.trigger('blur')

      const bondingField = cmp.find('#bonding')
      bondingField.setChecked(true)

      const taxibleField = cmp.find('#taxible')
      taxibleField.setChecked(true)

      cmp.vm.$forceUpdate()

      const groups = cmp.findAll('.form-group')
      groups.wrappers.forEach(group => expect(group.classes()).not.toContain('invalid'))

      expect(cmp.find('button[type="submit"]').attributes()['disabled']).toBe(undefined)

  })
  it('uses api to save job', () => {
    cmp.vm.clearForm = jest.fn()
    const nameField = cmp.find('#jobName')
    nameField.setValue('abc')
    nameField.trigger('blur')

    const bidDateField = cmp.find('#bidDate')
    bidDateField.setValue('2018-03-23')
    bidDateField.trigger('blur')

    const subcontractorBidsDueField = cmp.find('#subcontractorBidsDue')
    subcontractorBidsDueField.setValue('2017-06-01T08:30')
    subcontractorBidsDueField.trigger('blur')

    const prebidField = cmp.find('#prebid')
    prebidField.setValue('2018-07-01T18:30')
    prebidField.trigger('blur')

    cmp.vm.addressStr = '123 Main St.'
    cmp.vm.$v.addressStr.$touch()

    const bidEmailField = cmp.find('#bidEmail')
    bidEmailField.setValue('abc@xyz.com')
    bidEmailField.trigger('blur')

    const bondingField = cmp.find('#bonding')
    bondingField.setChecked(true)

    const taxibleField = cmp.find('#taxible')
    taxibleField.setChecked(true)

    cmp.vm.$forceUpdate()
    const groups = cmp.findAll('.form-group')
    groups.wrappers.forEach(group => expect(group.classes()).not.toContain('invalid'))
    expect(cmp.find('button[type="submit"]').attributes()['disabled']).toBe(undefined)
    
    cmp.find('form').trigger('submit')
    
    expect(mockAxios.post).toHaveBeenCalledWith('/jobs', { 
      "bidDate": "2018-03-23", 
      "bidEmail": "abc@xyz.com", 
      "bonding": true, 
      "name": "abc", 
      "prebidAddress": 
      "123 Main St.", 
      "prebidDateTime": 
      "2018-07-01T18:30", 
      "subcontractorBidsDue": "2017-06-01T08:30", 
      "taxible": true 
    })

    expect(mockAxios.post).toHaveBeenCalledTimes(1)

    const responseObj = { 
      "bidDate": "2018-03-23", 
      "bidEmail": "abc@xyz.com", 
      "bonding": true, 
      "name": "abc", 
      "prebidAddress": 
      "123 Main St.", 
      "prebidDateTime": 
      "2018-07-01T18:30", 
      "subcontractorBidsDue": "2017-06-01T08:30", 
      "taxible": true,
      "id": 25
    }

    mockAxios.mockResponse(responseObj)
    
    expect(cmp.vm.axiosSuccess).toBe(true)
    expect(cmp.vm.axiosFailure).toBe(false)
    const alerts = cmp.findAll('div.alert')
    expect(alerts.length).toBe(1)
    expect(alerts.at(0).classes()).toContain('alert-success')
    expect(alerts.at(0).html()).toContain('Job Added Successfully')
    expect(cmp.vm.clearForm).toHaveBeenCalledTimes(1)
  })

  it('enables submit button with valid input', () => {
    const nameField = cmp.find('#jobName')
    nameField.setValue('abc')
    nameField.trigger('blur')

    const bidDateField = cmp.find('#bidDate')
    bidDateField.setValue('2018-03-23')
    bidDateField.trigger('blur')

    const subcontractorBidsDueField = cmp.find('#subcontractorBidsDue')
    subcontractorBidsDueField.setValue('2017-06-01T08:30')
    subcontractorBidsDueField.trigger('blur')

    const prebidField = cmp.find('#prebid')
    prebidField.setValue('2018-07-01T18:30')
    prebidField.trigger('blur')

    cmp.vm.addressStr = '123 Main St.'
    cmp.vm.$v.addressStr.$touch()

    const bidEmailField = cmp.find('#bidEmail')
    bidEmailField.setValue('abc@xyz.com')
    bidEmailField.trigger('blur')

    const bondingField = cmp.find('#bonding')
    bondingField.setChecked(true)

    const taxibleField = cmp.find('#taxible')
    taxibleField.setChecked(true)

    cmp.vm.$forceUpdate()

    const groups = cmp.findAll('.form-group')
    groups.wrappers.forEach(group => expect(group.classes()).not.toContain('invalid'))

    expect(cmp.find('button[type="submit"]').attributes()['disabled']).toBe(undefined)

  })
  it('reports errors in saving', () => {
    cmp.vm.clearForm = jest.fn()
    const nameField = cmp.find('#jobName')
    nameField.setValue('abc')
    nameField.trigger('blur')

    const bidDateField = cmp.find('#bidDate')
    bidDateField.setValue('2018-03-23')
    bidDateField.trigger('blur')

    const subcontractorBidsDueField = cmp.find('#subcontractorBidsDue')
    subcontractorBidsDueField.setValue('2017-06-01T08:30')
    subcontractorBidsDueField.trigger('blur')

    const prebidField = cmp.find('#prebid')
    prebidField.setValue('2018-07-01T18:30')
    prebidField.trigger('blur')

    cmp.vm.addressStr = '123 Main St.'
    cmp.vm.$v.addressStr.$touch()

    const bidEmailField = cmp.find('#bidEmail')
    bidEmailField.setValue('abc@xyz.com')
    bidEmailField.trigger('blur')

    const bondingField = cmp.find('#bonding')
    bondingField.setChecked(true)

    const taxibleField = cmp.find('#taxible')
    taxibleField.setChecked(true)

    cmp.vm.$forceUpdate()
    const groups = cmp.findAll('.form-group')
    groups.wrappers.forEach(group => expect(group.classes()).not.toContain('invalid'))
    expect(cmp.find('button[type="submit"]').attributes()['disabled']).toBe(undefined)

    cmp.find('form').trigger('submit')

    expect(mockAxios.post).toHaveBeenCalledWith('/jobs', {
      "bidDate": "2018-03-23",
      "bidEmail": "abc@xyz.com",
      "bonding": true,
      "name": "abc",
      "prebidAddress":
        "123 Main St.",
      "prebidDateTime":
        "2018-07-01T18:30",
      "subcontractorBidsDue": "2017-06-01T08:30",
      "taxible": true
    })

    expect(mockAxios.post).toHaveBeenCalledTimes(1)

    mockAxios.mockError()

    expect(cmp.vm.axiosSuccess).toBe(false)
    expect(cmp.vm.axiosFailure).toBe(true)
    const alerts = cmp.findAll('div.alert')
    expect(alerts.length).toBe(1)
    expect(alerts.at(0).classes()).toContain('alert-danger')
    expect(alerts.at(0).html()).toContain('Failed to add Job')
    expect(cmp.vm.clearForm).not.toHaveBeenCalled()
  })
})
