/* global it describe */
import { assert } from 'chai'
import CreateVue from '../../src/components/CreateVue.vue'
import mountVm from '../mount-vm'

describe('CreateVue', function () {
  it('should inherit the authenticated property from the state', () => {
    const vm = mountVm(CreateVue)
    assert.isFalse(vm.authenticated)
  })

  it('should inherit the user property from the state', () => {
    const vm = mountVm(CreateVue)
    assert.isObject(vm.user)
  })

  it('should inherit the initialized property from the state', () => {
    const vm = mountVm(CreateVue)
    assert.isFalse(vm.initialized)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm(CreateVue, { initialized: true })

    assert.isNotNull(vm.$el.querySelector('.mask'))
    assert.isNotNull(vm.$el.querySelector('.modal'))
  })

  it('should respond to changes in the state (initialized)', () => {
    const vm = mountVm(CreateVue)

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('.modal'))
  })

  it('should respond to changes in the state (authenticated and user.tasks)', () => {
    const vm = mountVm(CreateVue, {
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
