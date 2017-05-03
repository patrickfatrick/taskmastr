/* global it describe sinon */
import { assert } from 'chai'
import Mousetrap from 'mousetrap'
import Darkmode from '../../../../src/components/menu/menu-components/Darkmode.vue'
import mountVm from '../../../mount-vm'

describe('DarkmodeVue', function () {
  it('should inherit the darkmode property from the state', () => {
    const vm = mountVm(Darkmode)
    assert.isTrue(vm.darkmode)
  })

  it('should have a setDarkmode method', () => {
    const vm = mountVm(Darkmode)
    assert.isFunction(vm.setDarkmode)
  })

  it('should render with initial state', () => {
    const vm = mountVm(Darkmode)
    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-sun-o'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm(Darkmode, { user: { darkmode: false } })
    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-moon-o'))
  })

  it('should call setDarkmode on button click', () => {
    const vm = mountVm(Darkmode)
    sinon.stub(vm, 'setDarkmode')

    vm.$el.querySelector('.dark-mode').click()

    assert.isTrue(vm.setDarkmode.calledWith(false))
    vm.setDarkmode.restore()
  })

  it('should call setDarkmode on ctrl+m', () => {
    const vm = mountVm(Darkmode)
    sinon.stub(vm, 'setDarkmode')

    Mousetrap.trigger('ctrl+m')

    assert.isTrue(vm.setDarkmode.calledWith(false))
    vm.setDarkmode.restore()
  })
})
