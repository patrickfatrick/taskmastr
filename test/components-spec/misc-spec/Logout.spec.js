/* global it describe sinon */
import { assert } from 'chai'
import Mousetrap from 'mousetrap'
import Logout from '../../../src/components/misc/Logout.vue'
import mountVm from '../../mount-vm'

describe('LogoutVue', function () {
  it('should inherit the logout method from the store', () => {
    const vm = mountVm(Logout)

    assert.isFunction(vm.logoutUser)
  })

  it('should have a logout method', () => {
    const vm = mountVm(Logout)

    assert.isFunction(vm.logout)
  })

  it('should render with initial state', () => {
    const vm = mountVm(Logout)

    assert.strictEqual(vm.$el.querySelector('label').textContent, 'Log out')
  })

  it('should call logout on button click', () => {
    const vm = mountVm(Logout)
    sinon.stub(vm, 'logoutUser')

    vm.$el.querySelector('#logout').click()

    assert.isTrue(vm.logoutUser.calledOnce)
    vm.logoutUser.restore()
  })

  it('should call logout on command+esc', () => {
    const vm = mountVm(Logout)
    sinon.stub(vm, 'logoutUser')

    Mousetrap.trigger('command+esc')

    assert.isTrue(vm.logoutUser.calledOnce)
    vm.logoutUser.restore()
  })
})
