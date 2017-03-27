/* global it describe sinon */
import { assert } from 'chai'
import ForgotForm from '../../../src/components/forms/ForgotForm.vue'
import mountVm from '../../mount-vm'

describe('ForgotForm.vue', function () {
  it('should inherit the user property from the state', () => {
    const vm = mountVm(ForgotForm)
    assert.isObject(vm.user)
  })

  it('should have a validate property', () => {
    const vm = mountVm(ForgotForm)
    assert.deepEqual(vm.validate, { usernameEmail: false, usernameRequired: false })
  })

  it('should have an isValid property', () => {
    const vm = mountVm(ForgotForm)
    assert.isFalse(vm.isValid)
  })

  it('should inherit the forgotPassword action from the store', () => {
    const vm = mountVm(ForgotForm)
    assert.isFunction(vm.forgotPassword)
  })

  it('should inherit the setForgotAttempt method from the store', () => {
    const vm = mountVm(ForgotForm)
    assert.isFunction(vm.setForgotAttempt)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm(ForgotForm)

    assert.isTrue(vm.$el.classList.contains('forgot-form'))
    assert.isNotNull(vm.$el.querySelector('.prompt-line--user-line'))
    assert.isNotNull(vm.$el.querySelector('.forgot-password'))
    assert.isNotNull(vm.$el.querySelector('.forgot-form__button-container__submit'))
    assert.isNotNull(vm.$el.querySelector('.try-it__button'))
  })

  it('should call forgotPassword if isValid', () => {
    const vm = mountVm(ForgotForm, { user: { username: 'username@domain.com' } })
    sinon.stub(vm, 'forgotPassword')

    vm.forgot('username@domain.com')

    assert.isTrue(vm.forgotPassword.calledWith('username@domain.com'))
    vm.forgotPassword.restore()
  })

  it('should not call forgotPassword if !isValid', () => {
    const vm = mountVm(ForgotForm, { user: { username: 'username' } })
    sinon.stub(vm, 'forgotPassword')

    vm.forgot('username')

    assert.isFalse(vm.forgotPassword.calledOnce)
    vm.forgotPassword.restore()
  })

  it('should validate user.username as required', () => {
    const vm = mountVm(ForgotForm, { user: { username: '' } })

    assert.isFalse(vm.validate.usernameRequired)
    assert.isFalse(vm.validate.usernameEmail)
    assert.isFalse(vm.isValid)
  })

  it('should validate user.username as an email address', () => {
    const vm = mountVm(ForgotForm, { user: { username: 'username' } })

    assert.isTrue(vm.validate.usernameRequired)
    assert.isFalse(vm.validate.usernameEmail)
  })

  it('isValid should return true if validate is all true', () => {
    const vm = mountVm(ForgotForm, { user: { username: 'username@domain.com' } })

    assert.isTrue(vm.validate.usernameRequired)
    assert.isTrue(vm.validate.usernameEmail)
    assert.isTrue(vm.isValid)
  })

  it('should call setForgotAttempt on button push', () => {
    const vm = mountVm(ForgotForm)
    sinon.stub(vm, 'setForgotAttempt')

    vm.$el.querySelector('.forgot-form__button-container__submit').click()

    assert.isTrue(vm.setForgotAttempt.calledWith(true))
    vm.setForgotAttempt.restore()
  })
})
