/* global it describe sinon */
import { assert } from 'chai'
import ResetVue from '../../src/components/ResetVue.vue'
import mountVm from '../mount-vm'

describe('ResetVue', function () {
  it('should inherit the auth property from the state', () => {
    const vm = mountVm(ResetVue)
    assert.isFalse(vm.auth)
  })

  it('should inherit the user property from the state', () => {
    const vm = mountVm(ResetVue)
    assert.isObject(vm.user)
  })

  it('should inherit the init property from the state', () => {
    const vm = mountVm(ResetVue)
    assert.isFalse(vm.init)
  })

  it('should inherit the setReset method from the store', () => {
    const vm = mountVm(ResetVue)
    assert.isFunction(vm.setReset)
  })

  it('should inherit the setResetToken method from the store', () => {
    const vm = mountVm(ResetVue)
    assert.isFunction(vm.setResetToken)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm(ResetVue, { init: true })

    assert.isNotNull(vm.$el.querySelector('.mask'))
    assert.isNotNull(vm.$el.querySelector('#key-modal'))
    assert.isNotNull(vm.$el.querySelector('#reset-form'))
  })

  it('should respond to changes in the state (init)', () => {
    const vm = mountVm(ResetVue)

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))
  })

  it('should respond to changes in the state (auth and user.tasks)', () => {
    const vm = mountVm(ResetVue, {
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

  it('should call setReset if path === "/reset"', () => {
    const vm = mountVm(ResetVue)
    sinon.stub(vm, 'setReset')
    // Set the path and re-mount
    vm.$router.push('/reset')
    vm.$mount()

    assert.isTrue(vm.setReset.calledWith(true))
    vm.setReset.restore()
  })

  it('should not call setReset if path !== "/reset"', () => {
    const vm = mountVm(ResetVue)
    sinon.stub(vm, 'setReset')
    // Set the path and re-mount
    vm.$router.push('/login')
    vm.$mount()

    assert.isFalse(vm.setReset.calledOnce)
    vm.setReset.restore()
  })

  it('should call setResetToken if token', () => {
    const vm = mountVm(ResetVue)
    sinon.stub(vm, 'setResetToken')
    // Set the path with query and re-mount
    vm.$router.push('/reset?token=token')
    vm.$mount()

    assert.isTrue(vm.setResetToken.calledWith('token'))
    vm.setResetToken.restore()
  })

  it('should not call setResetToken if !token', () => {
    const vm = mountVm(ResetVue)
    sinon.stub(vm, 'setResetToken')
    // Set the path without query and re-mount
    vm.$router.push('/reset')
    mountVm(ResetVue)

    assert.isFalse(vm.setResetToken.calledOnce)
    vm.setResetToken.restore()
  })
})
