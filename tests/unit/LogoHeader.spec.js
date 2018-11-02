import { mount } from '@vue/test-utils'
import LogoHeader from '@/components/LogoHeader'

describe('LogoHeader', () => {
  it('has correct html structure', () => {
    let cmp = mount(LogoHeader, {})
    expect(cmp.html()).toMatchSnapshot()
  })
})
