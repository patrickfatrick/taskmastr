/* global it describe */
import { assert } from 'chai'
import LoginVue from '../../public/components/LoginVue.vue'
import mountVm from '../mount-vm'

describe('LoginVue', function () {
  it('should inherit the auth property from the state', () => {
    const vm = mountVm(LoginVue)
    assert.isFalse(vm.auth)
  })

  it('should inherit the user property from the state', () => {
    const vm = mountVm(LoginVue)
    assert.isObject(vm.user)
  })

  it('should inherit the init property from the state', () => {
    const vm = mountVm(LoginVue)
    assert.isFalse(vm.init)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm(LoginVue, { init: true })

    assert.isNotNull(vm.$el.querySelector('.mask'))
    assert.isNotNull(vm.$el.querySelector('#key-modal'))
    assert.isNotNull(vm.$el.querySelector('#user-form'))
  })

  it('should respond to changes in the state (init)', () => {
    const vm = mountVm(LoginVue)

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))
  })

  it('should respond to changes in the state (auth and user.tasks)', () => {
    const vm = mountVm(LoginVue, {
      init: true,
      auth: 'username@domain.com',
      user: {
        tasks: [
          {
            list: 'List 1'
          }
        ]
      }
    })

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))
  })
})
