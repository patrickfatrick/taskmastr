/* global it describe */
import { assert } from 'chai'
import KeyInput from '../../../../src/components/forms/form-components/KeyInput.vue'
import mountVm from '../../../mount-vm'

describe('KeyInputVue', function () {
  it('should inherit the keyInput property from the state', () => {
    const vm = mountVm(KeyInput)
    assert.isObject(vm.user)
  })

  it('should inherit the create property from the state', () => {
    const vm = mountVm(KeyInput)
    assert.isFalse(vm.create)
  })

  it('should inherit the invalidKey property from the state', () => {
    const vm = mountVm(KeyInput)
    assert.isFalse(vm.invalidKey)
  })

  it('should inherit the loginAttempt property from the state', () => {
    const vm = mountVm(KeyInput)
    assert.isFalse(vm.loginAttempt)
  })

  it('should render with initial state', () => {
    const vm = mountVm(KeyInput)

    assert.isFalse(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
  })

  it('should respond to changes in the state (loginAttempt, invalidKey)', () => {
    const vm = mountVm(KeyInput, {
      loginAttempt: true,
      invalidKey: 'Invalid password'
    }, { required: true })

    assert.isTrue(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isFalse(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
  })

  it('should respond to changes in the state (loginAttempt, require)', () => {
    const vm = mountVm(KeyInput, { loginAttempt: true }, { required: false })

    assert.isTrue(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
  })
})
