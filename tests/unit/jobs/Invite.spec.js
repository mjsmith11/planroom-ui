import { mount } from '@vue/test-utils'
import Invite from '@/views/jobs/Invite'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import mockAxios from 'jest-mock-axios'

Vue.use(Vuelidate)

describe('Add Job Form', () => {
    let cmp

    const $route = {
        params: {
            id: 12
        }
    }

    beforeEach(() => {
        cmp = mount(Invite, {
            mocks: {
                $route
            },
            stubs: [
                'font-awesome-icon'
            ]
        })
    })

    afterEach(() => {
        // cleaning up the mess left behind the previous test
        mockAxios.reset()
    })

    it('has expected html structure', () => {
        cmp.vm.formEmail = 'test1@email.com'
        cmp.vm.$v.formEmail.$touch()
        cmp.vm.addEmail()

        cmp.vm.formEmail = 'test2@email.com'
        cmp.vm.$v.formEmail.$touch()
        cmp.vm.addEmail()

        expect(cmp.html()).toMatchSnapshot()
    })
})