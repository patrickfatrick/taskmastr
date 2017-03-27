/* global it describe sinon */

import { assert } from 'chai'
import Mousetrap from 'mousetrap'
import MenuToggle from '../../../src/components/misc/MenuToggle.vue'
import mountVm from '../../mount-vm'

describe('MenuToggleVue', function () {
  it('should inherit the menuToggled property from the store', () => {
    const vm = mountVm(MenuToggle)
    assert.isFalse(vm.menuToggled)
  })

  it('should inherit the setMenuToggled method from the store', () => {
    const vm = mountVm(MenuToggle)
    assert.isFunction(vm.setMenuToggled)
  })

  it('should render with initial state', () => {
    const vm = mountVm(MenuToggle)

    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-bars'))
  })

  it('should respond to changes in state', () => {
    const vm = mountVm(MenuToggle, { menuToggled: true })

    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-times'))
  })

  it('should call setMenuToggled on button click', () => {
    const vm = mountVm(MenuToggle)
    sinon.stub(vm, 'setMenuToggled')

    vm.$el.querySelector('button').click()

    assert.isTrue(vm.setMenuToggled.calledWith(true))
    vm.setMenuToggled.restore()
  })

  it('should call setMenuToggled with true on alt+right', () => {
    const vm = mountVm(MenuToggle, {})
    sinon.stub(vm, 'setMenuToggled')

    Mousetrap.trigger('alt+right')

    assert.isTrue(vm.setMenuToggled.calledWith(true))
    vm.setMenuToggled.restore()
  })

  it('should call setMenuToggled with true on alt+right (start on true)', () => {
    const vm = mountVm(MenuToggle, { menuToggled: true })
    sinon.stub(vm, 'setMenuToggled')

    Mousetrap.trigger('alt+right')

    assert.isTrue(vm.setMenuToggled.calledWith(true))
    vm.setMenuToggled.restore()
  })

  it('should call setMenuToggled with false on alt+left', () => {
    const vm = mountVm(MenuToggle, { menuToggled: true })
    sinon.stub(vm, 'setMenuToggled')

    Mousetrap.trigger('alt+left')

    assert.isTrue(vm.setMenuToggled.calledWith(false))
    vm.setMenuToggled.restore()
  })

  it('should call setMenuToggled with false on alt+left (start on false)', () => {
    const vm = mountVm(MenuToggle, {})
    sinon.stub(vm, 'setMenuToggled')

    Mousetrap.trigger('alt+left')

    assert.isTrue(vm.setMenuToggled.calledWith(false))
    vm.setMenuToggled.restore()
  })
})
