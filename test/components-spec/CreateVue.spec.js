/* global it describe */
import { assert } from 'chai'
import CreateVue from '../../src/components/CreateVue.vue'
import mountVm from '../mount-vm'

describe('CreateVue', function () {
  it('should inherit the auth property from the state', () => {
    const vm = mountVm(CreateVue)
    assert.isFalse(vm.auth)
  })

  it('should inherit the user property from the state', () => {
    const vm = mountVm(CreateVue)
    assert.isObject(vm.user)
  })

  it('should inherit the init property from the state', () => {
    const vm = mountVm(CreateVue)
    assert.isFalse(vm.init)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm(CreateVue, { init: true })

    assert.isNotNull(vm.$el.querySelector('.mask'))
    assert.isNotNull(vm.$el.querySelector('#key-modal'))
  })

  it('should respond to changes in the state (init)', () => {
    const vm = mountVm(CreateVue)

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))
  })

  it('should respond to changes in the state (auth and user.tasks)', () => {
    const vm = mountVm(CreateVue, {
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
