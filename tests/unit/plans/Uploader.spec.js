import { mount } from '@vue/test-utils'
import Uploader from '@/components/plans/Uploader'
// import mockAxios from 'jest-mock-axios'
import { EventBus } from '@/event-bus.js'

describe('Job Index', () => {
  let cmp

  beforeEach(() => {
    cmp = mount((Uploader), {
      propsData: {
        jobId: 1
      }
    })
  })

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    // mockAxios.reset()
  })

  it('has expected html structure', () => {
    expect(cmp.html()).toMatchSnapshot()
  })

  it('alerts on failed upload', () => {
    cmp.vm.s3UploadError('')
    expect(cmp.vm.uploadProblem).toBeTruthy()
    const alerts = cmp.findAll('div.alert')
    expect(alerts.length).toBe(1)
    expect(alerts.at(0).classes()).toContain('alert-danger')
    expect(alerts.at(0).html()).toContain('<strong>Warning!</strong> One or more plans failed to upload')
  })

  it('emits file-uploaded event', () => {
    let spy = jest.spyOn(EventBus, '$emit')
    cmp.vm.s3UploadSuccess('')
    expect(spy).toBeCalledWith('file-uploaded')
  })

  it('builds signing URL', () => {
    let file = {
      name: 'myfile.pdf'
    }
    let result = cmp.vm.getUrl(file)
    expect(result).toBe('http://test-api.com/jobs/1/plans?filename=myfile.pdf')
  })
})
