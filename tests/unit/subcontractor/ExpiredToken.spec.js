import { mount } from '@vue/test-utils'
import ExpiredToken from '@/views/subcontractor/ExpiredToken'

describe('Expired Token', () => {
  it('has correct html structure', () => {
    const cmp = mount(ExpiredToken, {
      stubs: [
        'logo-header',
        'contact-info'
      ]
    })
    expect(cmp.html()).toMatchSnapshot()
  })
})
