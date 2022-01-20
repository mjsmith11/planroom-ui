import { mount } from '@vue/test-utils'
import ContactInfo from '@/components/ContactInfo'

describe('Contact Info', () => {
  it('has correct html structure', () => {
    const cmp = mount(ContactInfo, {
      stubs: [
        'font-awesome-icon'
      ]
    })
    expect(cmp.html()).toMatchSnapshot()
  })
})
