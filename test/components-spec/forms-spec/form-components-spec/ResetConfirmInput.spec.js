/* global it describe */
import { assert } from 'chai'
import ResetConfirmInput from '../../../../src/components/forms/form-components/ResetConfirmInput.vue'
import mountVm from '../../../mount-vm'

describe('ResetConfirmInputVue', function () {
  it('should inherit the user property from the state', () => {
    const vm = mountVm(ResetConfirmInput)
    assert.isObject(vm.user)
  })

  it('should inherit the resetAttempt property from the state', () => {
    const vm = mountVm(ResetConfirmInput)
    assert.isFalse(vm.resetAttempt)
  })

  it('should inherit the resetFail property from the state', () => {
    const vm = mountVm(ResetConfirmInput)
    assert.strictEqual(vm.resetFail, '')
  })

  it('should render with initial state', () => {
    const vm = mountVm(ResetConfirmInput)
    assert.isFalse(vm.$el.querySelector('#reset-confirm').classList.contains('invalid'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm(ResetConfirmInput, { resetAttempt: true }, { match: false })
    assert.isTrue(vm.$el.querySelector('#reset-confirm').classList.contains('invalid'))
  })
})
