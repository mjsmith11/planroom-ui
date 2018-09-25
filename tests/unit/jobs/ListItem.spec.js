import { mount } from '@vue/test-utils'
import ListItem from '@/components/jobs/ListItem'
import moment from moment

describe('Job List Item', () => {
  const yesterday = {
    id: 1,
    name: "Job Bidding Yesterday",
    bidDate: moment(new Date()).add(-1, 'days').format('yyyy-mm-dd')
  }

  const today = {
    id: 2,
    name: "Job Bidding Today",
    bidDate: moment(new Date()).format('yyyy-mm-dd')
  } 

  const tomorrow = {
    id: 3,
    name: "Job Bidding Tomorrow",
    bidDate: moment(new Date()).add(1, 'days').format('yyyy-mm-dd')
  }
  //it('creates link address')
})

//id, name, bidDate