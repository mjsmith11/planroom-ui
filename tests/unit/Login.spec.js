import { mount } from '@vue/test-utils'
import Login from '@/views/Login'
import flushPromises from 'flush-promises'

describe('App', () => {
  it('has expected html', () => {
    const cmp = mount(Login, {

    })
    expect(cmp.html()).toMatchSnapshot()
  })

  it('handles successful login', async () => {
    const $router = {
      push: jest.fn()
    }
    const $store = {
      dispatch: jest.fn().mockReturnValue(new Promise((resolve, reject) => {
        resolve()
      }))
    }
    const cmp = mount(Login, {
      mocks: {
        $router,
        $store
      }
    })
    const emailField = cmp.find('#email')
    emailField.setValue('test@test.com')
    const passwordField = cmp.find('#password')
    passwordField.setValue('myPassword')

    cmp.find('form').trigger('submit')
    expect($store.dispatch).toBeCalledWith('login', { email: 'test@test.com', password: 'myPassword' })

    await flushPromises()

    expect($router.push).toHaveBeenCalledWith('/jobs')
  })

  it('handles failed login', async () => {
    const $router = {
      push: jest.fn()
    }
    const $store = {
      dispatch: jest.fn().mockReturnValue(new Promise((resolve, reject) => {
        reject(new Error('Login Failed'))
      }))
    }
    const cmp = mount(Login, {
      mocks: {
        $router,
        $store
      }
    })
    const emailField = cmp.find('#email')
    emailField.setValue('test@test.com')
    const passwordField = cmp.find('#password')
    passwordField.setValue('wrongPassword')

    cmp.find('form').trigger('submit')
    expect($store.dispatch).toBeCalledWith('login', { email: 'test@test.com', password: 'wrongPassword' })

    await flushPromises()

    expect($router.push).not.toHaveBeenCalled()
    const alert = cmp.find('div.alert')
    expect(alert.classes()).toContain('alert-danger')
    expect(alert.html()).toContain('Login Failed')
  })
})
