/* global it describe */
import { assert } from 'chai'
import ConfirmInput from '../../../../src/components/forms/form-components/ConfirmInput.vue'
import mountVm from '../../../mount-vm'

describe('ConfirmInputVue', function () {
  it('should inherit the user property from the state', () => {
    const vm = mountVm(ConfirmInput)
    assert.isObject(vm.user)
  })

  it('should inherit the loginAttempt property from the state', () => {
    const vm = mountVm(ConfirmInput)
    assert.isFalse(vm.loginAttempt)
  })

  it('should inherit the confirmAttempt property from the state', () => {
    const vm = mountVm(ConfirmInput)
    assert.isFalse(vm.confirmAttempt)
  })

  it('should render with initial state', () => {
    const vm = mountVm(ConfirmInput)
    assert.isFalse(vm.$el.querySelector('#confirm').classList.contains('invalid'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm(ConfirmInput, { confirmAttempt: true }, { match: false })
    assert.isTrue(vm.$el.querySelector('#confirm').classList.contains('invalid'))
  })
})
