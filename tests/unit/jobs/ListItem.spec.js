import { mount, RouterLinkStub } from '@vue/test-utils'
import ListItem from '@/components/jobs/ListItem'
import moment from 'moment'

describe('Job List Item', () => {
  const yesterday = {
    id: 1,
    name: 'Job Bidding Yesterday',
    bidDate: moment(new Date()).add(-1, 'days').format('YYYY-MM-DD')
  }

  const today = {
    id: 2,
    name: 'Job Bidding Today',
    bidDate: moment(new Date()).format('YYYY-MM-DD')
  }

  const tomorrow = {
    id: 3,
    name: 'Job Bidding Tomorrow',
    bidDate: moment(new Date()).add(1, 'days').format('YYYY-MM-DD')
  }

  const staticDate = {
    id: 4,
    name: 'Job With Static Date',
    bidDate: '2010-09-25' // it's important that this date is always in the past
  }

  it('creates link address', () => {
    const cmp = mount(ListItem, {
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
    const cmp = mount(ListItem, {
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
    const cmp = mount(ListItem, {
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
    const cmp = mount(ListItem, {
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
    const cmp = mount(ListItem, {
      propsData: {
        job: staticDate
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    expect(cmp.html()).toMatchSnapshot()
  })
})
