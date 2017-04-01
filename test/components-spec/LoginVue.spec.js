/* global it describe */
import { assert } from 'chai'
import LoginVue from '../../src/components/LoginVue.vue'
import mountVm from '../mount-vm'

describe('LoginVue', function () {
  it('should inherit the authenticated property from the state', () => {
    const vm = mountVm(LoginVue)
    assert.isFalse(vm.authenticated)
  })

  it('should inherit the user property from the state', () => {
    const vm = mountVm(LoginVue)
    assert.isObject(vm.user)
  })

  it('should inherit the initialized property from the state', () => {
    const vm = mountVm(LoginVue)
    assert.isFalse(vm.initialized)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm(LoginVue, { initialized: true })

    assert.isNotNull(vm.$el.querySelector('.mask'))
    assert.isNotNull(vm.$el.querySelector('.modal'))
    assert.isNotNull(vm.$el.querySelector('.login-form'))
  })

  it('should respond to changes in the state (initialized)', () => {
    const vm = mountVm(LoginVue)

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('.modal'))
  })

  it('should respond to changes in the state (authenticated and user.tasks)', () => {
    const vm = mountVm(LoginVue, {
      initialized: true,
      authenticated: true,
      user: {
        tasks: [
          {
            list: 'List 1'
          }
        ]
      }
    })

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('.modal'))
  })
})
