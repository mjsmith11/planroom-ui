import { mount, RouterLinkStub } from '@vue/test-utils'
import ListItem from '@/components/jobs/ListItem'
import moment from 'moment-timezone'

describe('Job List Item', () => {
  const yesterday = {
    id: 1,
    name: "Job Bidding Yesterday",
    bidDate: moment(new Date()).add(-1, 'days').format('YYYY-MM-DD')
  }

  const today = {
    id: 2,
    name: "Job Bidding Today",
    bidDate: moment(new Date()).format('YYYY-MM-DD')
  } 

  const tomorrow = {
    id: 3,
    name: "Job Bidding Tomorrow",
    bidDate: moment(new Date()).add(1, 'days').format('YYYY-MM-DD')
  }

  it('creates link address', () => {
    let cmp = mount(ListItem, {
      propsData: {
        job: yesterday
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    expect(cmp.vm.link).toBe('jobs/1')
  })

  it('displays yesterday dark', () => {
    let cmp = mount(ListItem, {
      propsData: {
        job: yesterday
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    expect(cmp.find('a').classes()).toContain('list-group-item-dark')
    expect(cmp.find('a').classes()).not.toContain('list-group-item-light')
  })

  it('displays today light', () => {
    let cmp = mount(ListItem, {
      propsData: {
        job: today
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    expect(cmp.find('a').classes()).toContain('list-group-item-light')
    expect(cmp.find('a').classes()).not.toContain('list-group-item-dark')
  })

  it('displays tommorow light', () => {
    let cmp = mount(ListItem, {
      propsData: {
        job: tomorrow
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    expect(cmp.find('a').classes()).toContain('list-group-item-light')
    expect(cmp.find('a').classes()).not.toContain('list-group-item-dark')
  })

  it('has expected html structure', () => {
    let cmp = mount(ListItem, {
      propsData: {
        job: today
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    expect(cmp.html()).toMatchSnapshot()
  })
})
