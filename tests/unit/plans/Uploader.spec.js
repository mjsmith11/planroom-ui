import { mount, createLocalVue } from '@vue/test-utils'
import Uploader from '@/components/plans/Uploader'
// import mockAxios from 'jest-mock-axios'
import { EventBus } from '@/event-bus.js'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Uploader', () => {
  let cmp
  let getters = {
    token: () => 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEyMzQ1Njc3ODc3fQ.6xV-z88Nvmag8i4jVwmOZjX3MhCYAgb3rqttN4ROix3EbtHLwYIG3utNVaCpCN2cS7QFAJM3CPnfiS5_s9luiA'
  }
  let store = new Vuex.Store({
    getters
  })

  beforeEach(() => {
    cmp = mount((Uploader), {
      propsData: {
        jobId: 1
      },
      store,
      localVue
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
    expect(alerts.at(0).html()).toContain('<strong>Warning!</strong> One or more documents failed to upload')
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
