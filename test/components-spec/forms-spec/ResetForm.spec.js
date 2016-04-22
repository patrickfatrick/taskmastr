/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import ResetForm from '../../../public/components/forms/ResetForm.vue'
import state from '../../../public/store/state'
import mutations from '../../../public/store/mutations'

describe('ResetForm.vue', function () {
  let clock
  let promise
  let promiseLogin

  // mock vue-router
  ResetForm.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      },
      path: '/reset',
      name: 'Reset'
    }
  }

  function mountVm (changes) {
    return new Vue({
      store: new Vuex.Store({
        state: {
          ...state,
          ...changes
        },
        mutations
      }),
      template: '<div><test></test></div>',
      components: {
        'test': ResetForm
      }
    }).$mount()
  }

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should inherit the auth property from the state', () => {
    assert.isFalse(ResetForm.vuex.getters.auth({ auth: false }))
  })

  it('should inherit the user property from the state', () => {
    assert.isObject(ResetForm.vuex.getters.user({ user: {} }))
  })

  it('should inherit the current property from the state', () => {
    assert.isObject(ResetForm.vuex.getters.current({ current: {} }))
  })

  it('should inherit the resetToken property from the state', () => {
    assert.isString(ResetForm.vuex.getters.resetToken({ resetToken: '' }))
  })

  it('should have a validate property', () => {
    assert.isFunction(ResetForm.computed.validate)
  })

  it('should have an isValid property', () => {
    assert.isFunction(ResetForm.computed.isValid)
  })

  it('should inherit the resetPassword method from the store', () => {
    assert.isFunction(ResetForm.vuex.actions.resetPassword)
  })

  it('should inherit the resetPassword method from the store', () => {
    assert.isFunction(ResetForm.vuex.actions.loginUser)
  })

  it('should inherit the setResetAttempt method from the store', () => {
    assert.isFunction(ResetForm.vuex.actions.setResetAttempt)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm()

    assert.isNotNull(vm.$el.querySelector('#reset-form'))
    assert.isNotNull(vm.$el.querySelector('#reset-key-line'))
    assert.isNotNull(vm.$el.querySelector('#reset-confirm-line'))
    assert.isNotNull(vm.$el.querySelector('#try-it-button'))
  })

  it('should reset password and log in to app if isValid', () => {
    sinon.stub(ResetForm.computed, 'validate').returns({
      passwordRequired: true,
      confirmMatch: true,
      tokenRequired: true
    })
    sinon.stub(ResetForm.computed, 'isValid').returns(true)

    const vm = mountVm({
      auth: 'username@domain.com',
      user: {
        username: 'username@domain.com'
      },
      current: {
        id: 'listid'
      }
    })

    promise = sinon.stub(vm.$children[0], 'resetPassword').returnsPromise()
    promiseLogin = sinon.stub(vm.$children[0], 'loginUser').returnsPromise()

    promise.resolves('username@domain.com')
    promiseLogin.resolves('username@domain.com')
    sinon.stub(vm.$children[0].$route.router, 'go')

    vm.$children[0].reset('token', 'password')

    clock.tick(250)

    assert.isTrue(vm.$children[0].resetPassword.calledWith('token', 'password'))
    assert.isTrue(vm.$children[0].loginUser.calledWith('username@domain.com', 'password', false))
    assert.isTrue(vm.$children[0].$route.router.go.calledWithMatch(/\/app\/list\/listid/))

    ResetForm.computed.validate.restore()
    ResetForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].resetPassword.restore()
    vm.$children[0].loginUser.restore()
  })

  it('should not reset password or log in to app if !isValid', () => {
    sinon.stub(ResetForm.computed, 'validate').returns({
      passwordRequired: true,
      confirmMatch: true,
      tokenRequired: false
    })
    sinon.stub(ResetForm.computed, 'isValid').returns(false)

    const vm = mountVm({
      auth: 'username@domain.com',
      user: {
        username: 'username@domain.com'
      }
    })

    promise = sinon.stub(vm.$children[0], 'resetPassword').returnsPromise()
    promiseLogin = sinon.stub(vm.$children[0], 'loginUser').returnsPromise()

    promise.resolves('username@domain.com')
    promiseLogin.resolves('username@domain.com')
    sinon.stub(vm.$children[0].$route.router, 'go')

    vm.$children[0].reset('token', 'password')

    clock.tick(250)

    assert.isFalse(vm.$children[0].resetPassword.calledOnce)
    assert.isFalse(vm.$children[0].loginUser.calledOnce)
    assert.isFalse(vm.$children[0].$route.router.go.calledOnce)

    ResetForm.computed.validate.restore()
    ResetForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].resetPassword.restore()
    vm.$children[0].loginUser.restore()
  })

  it('should not reset password or log in to app if invalid token', () => {
    sinon.stub(ResetForm.computed, 'validate').returns({
      passwordRequired: true,
      confirmMatch: true,
      tokenRequired: true
    })
    sinon.stub(ResetForm.computed, 'isValid').returns(true)

    const vm = mountVm({
      auth: false,
      user: {
        username: ''
      }
    })

    promise = sinon.stub(vm.$children[0], 'resetPassword').returnsPromise()
    promiseLogin = sinon.stub(vm.$children[0], 'loginUser').returnsPromise()

    promise.resolves('')
    promiseLogin.resolves('')
    sinon.stub(vm.$children[0].$route.router, 'go')

    vm.$children[0].reset('token', 'password')

    clock.tick(250)

    assert.isTrue(vm.$children[0].resetPassword.calledWith('token', 'password'))
    assert.isFalse(vm.$children[0].loginUser.calledOnce)
    assert.isFalse(vm.$children[0].$route.router.go.calledOnce)

    ResetForm.computed.validate.restore()
    ResetForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].resetPassword.restore()
    vm.$children[0].loginUser.restore()
  })

  it('should validate user.resetKey as required', () => {
    const vm = mountVm({
      user: {
        resetKey: '',
        resetConfirmKey: ''
      },
      resetToken: 'token'
    })

    assert.isFalse(vm.$children[0].validate.passwordRequired)
    assert.isTrue(vm.$children[0].validate.confirmMatch)
    assert.isTrue(vm.$children[0].validate.tokenRequired)
    assert.isFalse(vm.$children[0].isValid)
  })

  it('should validate user.resetConfirmKey as matching user.resetKey', () => {
    const vm = mountVm({
      user: {
        resetKey: 'newKey',
        resetConfirmKey: 'keyNew'
      },
      resetToken: 'token'
    })

    assert.isTrue(vm.$children[0].validate.passwordRequired)
    assert.isFalse(vm.$children[0].validate.confirmMatch)
    assert.isTrue(vm.$children[0].validate.tokenRequired)
    assert.isFalse(vm.$children[0].isValid)
  })

  it('should validate resetToken as required', () => {
    const vm = mountVm({
      user: {
        resetKey: 'newKey',
        resetConfirmKey: 'newKey'
      },
      resetToken: ''
    })

    assert.isTrue(vm.$children[0].validate.passwordRequired)
    assert.isTrue(vm.$children[0].validate.confirmMatch)
    assert.isFalse(vm.$children[0].validate.tokenRequired)
    assert.isFalse(vm.$children[0].isValid)
  })

  it('isValid if validate is all true', () => {
    const vm = mountVm({
      user: {
        resetKey: 'newKey',
        resetConfirmKey: 'newKey'
      },
      resetToken: 'token'
    })

    assert.isTrue(vm.$children[0].validate.passwordRequired)
    assert.isTrue(vm.$children[0].validate.confirmMatch)
    assert.isTrue(vm.$children[0].validate.tokenRequired)
    assert.isTrue(vm.$children[0].isValid)
  })

  it('should call setResetAttempt on button push', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'setResetAttempt')

    vm.$el.querySelector('#reset-button').click()

    assert.isTrue(vm.$children[0].setResetAttempt.calledWith(true))

    vm.$children[0].setResetAttempt.restore()
  })
})
