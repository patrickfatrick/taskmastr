/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import ResetForm from '../../../src/components/forms/ResetForm.vue'
import mountVm from '../../mount-vm'

describe('ResetForm.vue', function () {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should inherit the authenticated property from the state', () => {
    const vm = mountVm(ResetForm)
    assert.isFalse(vm.authenticated)
  })

  it('should inherit the user property from the state', () => {
    const vm = mountVm(ResetForm)
    assert.isObject(vm.user)
  })

  it('should inherit the currentList property from the state', () => {
    const vm = mountVm(ResetForm)
    assert.strictEqual(vm.currentList, '')
  })

  it('should inherit the resetToken property from the state', () => {
    const vm = mountVm(ResetForm)
    assert.isNull(vm.resetToken)
  })

  it('should have a validate property', () => {
    const vm = mountVm(ResetForm)
    assert.deepEqual(vm.validate, { passwordRequired: false, confirmMatch: true, tokenRequired: false })
  })

  it('should have an isValid property', () => {
    const vm = mountVm(ResetForm)
    assert.isFalse(vm.isValid)
  })

  it('should inherit the resetPassword method from the store', () => {
    const vm = mountVm(ResetForm)
    assert.isFunction(vm.resetPassword)
  })

  it('should inherit the resetPassword method from the store', () => {
    const vm = mountVm(ResetForm)
    assert.isFunction(vm.loginUser)
  })

  it('should inherit the setResetAttempt method from the store', () => {
    const vm = mountVm(ResetForm)
    assert.isFunction(vm.setResetAttempt)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm(ResetForm)

    assert.isTrue(vm.$el.classList.contains('reset-form'))
    assert.isNotNull(vm.$el.querySelector('.prompt-line--reset-key-line'))
    assert.isNotNull(vm.$el.querySelector('.prompt-line--reset-confirm-line'))
    assert.isNotNull(vm.$el.querySelector('.try-it__button'))
  })

  it('should reset password and log in to app if isValid', (done) => {
    const vm = mountVm(ResetForm, {
      authenticated: true,
      user: {
        username: 'username@domain.com',
        resetKey: 'password',
        resetConfirmKey: 'password'
      },
      currentList: 'listid',
      resetToken: 'token'
    })
    const promise = sinon.stub(vm, 'resetPassword').resolves()
    const loginPromise = sinon.stub(vm, 'loginUser').resolves()
    sinon.stub(vm.$router, 'push')

    vm.reset('token', 'password')

    promise()
      .then(() => loginPromise())
      .then(() => {
        clock.tick(250)
        assert.isTrue(vm.resetPassword.calledWith({ token: 'token', key: 'password' }))
        assert.isTrue(vm.loginUser.calledWith({ username: 'username@domain.com', key: 'password', rememberMe: false }))
        // assert.isTrue(vm.$router.push.calledWithMatch(/\/app\/list\/listid/))

        vm.$router.push.restore()
        vm.resetPassword.restore()
        vm.loginUser.restore()
        done()
      })
  })

  it('should not reset password or log in to app if !isValid', () => {
    const vm = mountVm(ResetForm, {
      authenticated: true,
      user: {
        resetKey: 'password',
        resetConfirmKey: 'password'
      },
      current: {
        _id: 'listid'
      },
      resetToken: ''
    })
    sinon.stub(vm, 'resetPassword')
    sinon.stub(vm, 'loginUser')
    sinon.stub(vm.$router, 'push')

    vm.reset('token', 'password')

    clock.tick(250)
    assert.isFalse(vm.resetPassword.calledOnce)
    assert.isFalse(vm.loginUser.calledOnce)
    assert.isFalse(vm.$router.push.calledOnce)

    vm.$router.push.restore()
    vm.resetPassword.restore()
    vm.loginUser.restore()
  })

  it('should not reset password or log in to app if invalid token', (done) => {
    const vm = mountVm(ResetForm, {
      user: {
        resetKey: 'password',
        resetConfirmKey: 'password'
      },
      resetToken: 'token'
    })
    const promise = sinon.stub(vm, 'resetPassword').resolves()
    sinon.stub(vm, 'loginUser')
    sinon.stub(vm.$router, 'push')

    vm.reset('token', 'password')

    promise()
      .then(() => {
        clock.tick(250)
        assert.isTrue(vm.resetPassword.calledWith({ token: 'token', key: 'password' }))
        assert.isFalse(vm.loginUser.calledOnce)
        assert.isFalse(vm.$router.push.calledOnce)

        vm.$router.push.restore()
        vm.resetPassword.restore()
        vm.loginUser.restore()
        done()
      })
  })

  it('should validate user.resetKey as required', () => {
    const vm = mountVm(ResetForm, {
      user: {
        resetKey: '',
        resetConfirmKey: ''
      },
      resetToken: 'token'
    })

    assert.isFalse(vm.validate.passwordRequired)
    assert.isTrue(vm.validate.confirmMatch)
    assert.isTrue(vm.validate.tokenRequired)
    assert.isFalse(vm.isValid)
  })

  it('should validate user.resetConfirmKey as matching user.resetKey', () => {
    const vm = mountVm(ResetForm, {
      user: {
        resetKey: 'newKey',
        resetConfirmKey: 'keyNew'
      },
      resetToken: 'token'
    })

    assert.isTrue(vm.validate.passwordRequired)
    assert.isFalse(vm.validate.confirmMatch)
    assert.isTrue(vm.validate.tokenRequired)
    assert.isFalse(vm.isValid)
  })

  it('should validate resetToken as required', () => {
    const vm = mountVm(ResetForm, {
      user: {
        resetKey: 'newKey',
        resetConfirmKey: 'newKey'
      },
      resetToken: ''
    })

    assert.isTrue(vm.validate.passwordRequired)
    assert.isTrue(vm.validate.confirmMatch)
    assert.isFalse(vm.validate.tokenRequired)
    assert.isFalse(vm.isValid)
  })

  it('isValid if validate is all true', () => {
    const vm = mountVm(ResetForm, {
      user: {
        resetKey: 'newKey',
        resetConfirmKey: 'newKey'
      },
      resetToken: 'token'
    })

    assert.isTrue(vm.validate.passwordRequired)
    assert.isTrue(vm.validate.confirmMatch)
    assert.isTrue(vm.validate.tokenRequired)
    assert.isTrue(vm.isValid)
  })

  it('should call setResetAttempt on button push', () => {
    const vm = mountVm(ResetForm)
    sinon.stub(vm, 'setResetAttempt')

    vm.$el.querySelector('.reset-form__button-container__submit').click()

    assert.isTrue(vm.setResetAttempt.calledWith(true))
    vm.setResetAttempt.restore()
  })
})
