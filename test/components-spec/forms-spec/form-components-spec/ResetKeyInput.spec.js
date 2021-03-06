/* global it describe */
import { assert } from 'chai'
import ResetKeyInput from '../../../../src/components/forms/form-components/ResetKeyInput.vue'
import mountVm from '../../../mount-vm'

describe('ResetKeyInput.vue', function () {
  it('should inherit the user property from the state', () => {
    const vm = mountVm(ResetKeyInput)
    assert.isObject(vm.user)
  })

  it('should inherit the resetAttempt property from the state', () => {
    const vm = mountVm(ResetKeyInput)
    assert.isFalse(vm.resetAttempt)
  })

  it('should inherit the resetFail property from the state', () => {
    const vm = mountVm(ResetKeyInput)
    assert.strictEqual(vm.resetFail, '')
  })

  it('should render with initial state', () => {
    const vm = mountVm(ResetKeyInput, {}, { token: 'token' })

    assert.isFalse(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].style.display === 'none')
  })

  it('should respond to changes in the state (resetAttempt, resetFail)', () => {
    const vm = mountVm(ResetKeyInput, {
      resetAttempt: true,
      resetFail: true
    }, {
      required: true,
      match: true,
      token: 'token'
    })

    assert.isTrue(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
    assert.isFalse(vm.$el.querySelector('.error-text').children[2].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].style.display === 'none')
  })

  it('should respond to changes in the state (resetAttempt, !require)', () => {
    const vm = mountVm(ResetKeyInput, { resetAttempt: true }, {
      required: false,
      match: true,
      token: 'token'
    })

    assert.isTrue(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].style.display === 'none')
  })

  it('should respond to changes in the state (resetAttempt, !match)', () => {
    const vm = mountVm(ResetKeyInput, { resetAttempt: true }, {
      required: true,
      match: false,
      token: 'token'
    })

    assert.isFalse(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isFalse(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].style.display === 'none')
  })

  it('should respond to changes in the state (resetAttempt, token)', () => {
    const vm = mountVm(ResetKeyInput, { resetAttempt: false }, {
      required: true,
      match: false,
      token: false
    })

    assert.isFalse(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].style.display === 'none')
    assert.isFalse(vm.$el.querySelector('.error-text').children[3].style.display === 'none')
  })
})
