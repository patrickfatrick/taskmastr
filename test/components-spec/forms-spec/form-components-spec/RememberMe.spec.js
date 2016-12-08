/* global it describe */
import { assert } from 'chai'
import RememberMe from '../../../../public/components/forms/form-components/RememberMe.vue'
import mountVm from '../../../mount-vm'

describe('RememberMeVue', function () {
  it('should inherit the rememberMe property from the state', () => {
    const vm = mountVm(RememberMe)
    assert.isFalse(vm.rememberMe)
  })

  it('should have a setRememberMe method', () => {
    const vm = mountVm(RememberMe)
    assert.isFunction(vm.setRememberMe)
  })

  it('should render with initial state', () => {
    const vm = mountVm(RememberMe)

    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-square-o'))
    assert.isFalse(vm.$el.querySelector('.fa').classList.contains('fa-check-square-o'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm(RememberMe, { rememberMe: true })

    assert.isTrue(vm.rememberMe)
    assert.isFalse(vm.$el.querySelector('.fa').classList.contains('fa-square-o'))
    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-check-square-o'))
  })
})
