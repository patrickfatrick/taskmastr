/* global it describe */
import { assert } from 'chai'
import UsernameInput from '../../../../src/components/forms/form-components/UsernameInput.vue'
import mountVm from '../../../mount-vm'

describe('UsernameInputVue', function () {
  it('should inherit the user property from the state', () => {
    const vm = mountVm(UsernameInput)
    assert.isObject(vm.user)
  })

  it('should inherit the forgot property from the state', () => {
    const vm = mountVm(UsernameInput)
    assert.isFalse(vm.forgot)
  })

  it('should inherit the forgotEmail property from the state', () => {
    const vm = mountVm(UsernameInput)
    assert.isFalse(vm.forgotEmail)
  })

  it('should inherit the forgotFail property from the state', () => {
    const vm = mountVm(UsernameInput)
    assert.strictEqual(vm.forgotFail, '')
  })

  it('should inherit the confirmAttempt property from the state', () => {
    const vm = mountVm(UsernameInput)
    assert.isFalse(vm.confirmAttempt)
  })

  it('should inherit the createFail property from the state', () => {
    const vm = mountVm(UsernameInput)
    assert.strictEqual(vm.createFail, '')
  })

  it('should inherit the loginAttempt property from the state', () => {
    const vm = mountVm(UsernameInput)
    assert.isFalse(vm.loginAttempt)
  })

  it('should render with initial state', () => {
    const vm = mountVm(UsernameInput)

    assert.isFalse(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[4].style.display === 'none')
  })

  it('should respond to changes in the state (loginAttempt, !require)', () => {
    const vm = mountVm(UsernameInput, {
      loginAttempt: true,
      forgotAttempt: false
    }, {
      required: false,
      validate: false
    })

    assert.isTrue(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[4].style.display === 'none')

    delete UsernameInput.computed.require
    delete UsernameInput.computed.validate
  })

  it('should respond to changes in the state (forgotAttempt, !require)', () => {
    const vm = mountVm(UsernameInput, {
      loginAttempt: false,
      forgotAttempt: true
    }, {
      required: false,
      validate: false
    })

    assert.isTrue(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[4].style.display === 'none')

    delete UsernameInput.computed.require
    delete UsernameInput.computed.validate
  })

  it('should respond to changes in the state (loginAttempt, !validate)', () => {
    const vm = mountVm(UsernameInput, {
      loginAttempt: true,
      forgotAttempt: false
    }, {
      required: true,
      validate: false
    })

    assert.isTrue(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isFalse(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[4].style.display === 'none')

    delete UsernameInput.computed.require
    delete UsernameInput.computed.validate
  })

  it('should respond to changes in the state (confirmAttempt, createFail)', () => {
    const vm = mountVm(UsernameInput, {
      confirmAttempt: true,
      createFail: 'Create fail'
    }, {
      required: true,
      validate: true
    })
    // Set the path and re-mount
    vm.$router.push('/create')
    vm.$mount()

    assert.isFalse(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
    assert.isFalse(vm.$el.querySelector('.error-text').children[2].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[4].style.display === 'none')
  })

  it('should respond to changes in the state (forgotAttempt, forgotFail)', () => {
    const vm = mountVm(UsernameInput, {
      forgotAttempt: true,
      forgotFail: 'Forgot fail',
      forgotEmail: false
    }, {
      required: true,
      validate: true
    })
    // Set the path and re-mount
    vm.$router.push('/forgot')
    vm.$mount()

    assert.isTrue(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].style.display === 'none')
    assert.isFalse(vm.$el.querySelector('.error-text').children[3].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[4].style.display === 'none')
  })

  it('should respond to changes in the state (forgotAttempt, forgotEmail)', () => {
    const vm = mountVm(UsernameInput, {
      forgotAttempt: true,
      forgotFail: false,
      forgotEmail: true
    }, {
      required: true,
      validate: true
    })
    // Set the path and re-mount
    vm.$router.push('/forgot')
    vm.$mount()

    assert.isFalse(vm.$el.querySelector('.prompt-line__prompt').classList.contains('prompt-line__prompt--invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].style.display === 'none')
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].style.display === 'none')
    assert.isFalse(vm.$el.querySelector('.error-text').children[4].style.display === 'none')
  })
})
