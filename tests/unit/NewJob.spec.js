import { mount } from '@vue/test-utils'
import NewJob from '@/views/jobs/NewJob'

describe('NewJob.test.js', () => {
    describe('Structure', () => {
        let cmp
        beforeEach(() => {
            cmp = mount(NewJob)
        })

        it('has the expected html structure', () => {
            expect(cmp.element).toMatchSnapshot()
        })
    })
})