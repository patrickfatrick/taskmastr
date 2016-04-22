/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import LoginForm from '../../../public/components/forms/LoginForm.vue'
import state from '../../../public/store/state'
import mutations from '../../../public/store/mutations'

describe('LoginForm.vue', function () {
  let clock
  let promise

  // mock vue-router
  LoginForm.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      },
      path: '/login',
      name: 'Login'
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
        'test': LoginForm
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
    assert.isFalse(LoginForm.vuex.getters.auth({ auth: false }))
  })

  it('should inherit the user property from the state', () => {
    assert.isObject(LoginForm.vuex.getters.user({ user: {} }))
  })

  it('should inherit the current property from the state', () => {
    assert.isObject(LoginForm.vuex.getters.current({ current: {} }))
  })

  it('should inherit the reset property from the state', () => {
    assert.isFalse(LoginForm.vuex.getters.reset({ reset: false }))
  })

  it('should inherit the forgot property from the state', () => {
    assert.isFalse(LoginForm.vuex.getters.forgot({ forgot: false }))
  })

  it('should inherit the create property from the state', () => {
    assert.isFalse(LoginForm.vuex.getters.create({ create: false }))
  })

  it('should inherit the rememberMe property from the state', () => {
    assert.isFalse(LoginForm.vuex.getters.rememberMe({ rememberMe: false }))
  })

  it('should have a validate property', () => {
    assert.isFunction(LoginForm.computed.validate)
  })

  it('should have an isValid property', () => {
    assert.isFunction(LoginForm.computed.isValid)
  })

  it('should have a loginUser method', () => {
    assert.isFunction(LoginForm.vuex.actions.loginUser)
  })

  it('should inherit the setLoginAttempt method from the store', () => {
    assert.isFunction(LoginForm.vuex.actions.setLoginAttempt)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm()

    assert.isNotNull(vm.$el.querySelector('#user-form'))
    assert.isNotNull(vm.$el.querySelector('#user-line'))
    assert.isNotNull(vm.$el.querySelector('#key-line'))
    assert.isNotNull(vm.$el.querySelector('#remember-me'))
    assert.isNotNull(vm.$el.querySelector('#forgot-password'))
    assert.isNotNull(vm.$el.querySelector('#key-button'))
    assert.isNotNull(vm.$el.querySelector('#try-it-button'))
  })

  it('should log in to app if isValid', () => {
    sinon.stub(LoginForm.computed, 'validate').returns({
      usernameEmail: true,
      usernameRequired: true,
      passwordRequired: true
    })
    sinon.stub(LoginForm.computed, 'isValid').returns(true)

    const vm = mountVm({
      auth: 'username@domain.com',
      current: {
        id: 'listid'
      }
    })

    promise = sinon.stub(vm.$children[0], 'loginUser').returnsPromise()

    promise.resolves('username@domain.com')
    sinon.stub(vm.$children[0].$route.router, 'go')

    vm.$children[0].login('username@domain.com', 'password', false)

    clock.tick(250)

    assert.isTrue(vm.$children[0].loginUser.calledWith('username@domain.com', 'password', false))
    assert.isTrue(vm.$children[0].$route.router.go.calledWithMatch(/\/app\/list\/listid/))

    LoginForm.computed.validate.restore()
    LoginForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].loginUser.restore()
  })

  it('should redirect to /create on !auth and create', () => {
    sinon.stub(LoginForm.computed, 'validate').returns({
      usernameEmail: true,
      usernameRequired: true,
      passwordRequired: true
    })
    sinon.stub(LoginForm.computed, 'isValid').returns(true)

    const vm = mountVm({
      auth: false,
      create: true
    })

    promise = sinon.stub(vm.$children[0], 'loginUser').returnsPromise()

    promise.resolves('username@domain.com')
    sinon.stub(vm.$children[0].$route.router, 'go')

    vm.$children[0].login('username@domain.com', 'password', false)

    clock.tick(250)

    assert.isTrue(vm.$children[0].loginUser.calledWith('username@domain.com', 'password', false))
    assert.isTrue(vm.$children[0].$route.router.go.calledWith('/create'))

    LoginForm.computed.validate.restore()
    LoginForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].loginUser.restore()
  })

  it('should not log in to app on !isValid', () => {
    sinon.stub(LoginForm.computed, 'validate').returns({
      usernameEmail: false,
      usernameRequired: true,
      passwordRequired: true
    })
    sinon.stub(LoginForm.computed, 'isValid').returns(false)

    const vm = mountVm({ auth: '' })
    promise = sinon.stub(vm.$children[0], 'loginUser').returnsPromise()

    promise.resolves('username@domain.com')
    sinon.stub(vm.$children[0].$route.router, 'go')

    vm.$children[0].login('username@domain.com', 'password', false)
    clock.tick(250)
    assert.isFalse(vm.$children[0].loginUser.calledOnce)
    assert.isFalse(vm.$children[0].$route.router.go.calledOnce)

    LoginForm.computed.validate.restore()
    LoginForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].loginUser.restore()
  })

  it('should validate user.username as required', () => {
    const vm = mountVm({ user: {
      username: '',
      key: 'password'
    }})

    assert.isFalse(vm.$children[0].validate.usernameRequired)
    assert.isFalse(vm.$children[0].validate.usernameEmail)
    assert.isTrue(vm.$children[0].validate.passwordRequired)
    assert.isFalse(vm.$children[0].isValid)
  })

  it('should validate user.username as an email address', () => {
    const vm = mountVm({ user: {
      username: 'username',
      key: 'password'
    } })

    assert.isTrue(vm.$children[0].validate.usernameRequired)
    assert.isFalse(vm.$children[0].validate.usernameEmail)
    assert.isTrue(vm.$children[0].validate.passwordRequired)
    assert.isFalse(vm.$children[0].isValid)
  })

  it('should validate user.key as required', () => {
    const vm = mountVm({ user: {
      username: 'username@domain.com',
      key: ''
    } })

    assert.isTrue(vm.$children[0].validate.usernameRequired)
    assert.isTrue(vm.$children[0].validate.usernameEmail)
    assert.isFalse(vm.$children[0].validate.passwordRequired)
    assert.isFalse(vm.$children[0].isValid)
  })

  it('isValid should return true if validate is all true', () => {
    const vm = mountVm({ user: {
      username: 'username@domain.com',
      key: 'password'
    } })

    assert.isTrue(vm.$children[0].validate.usernameRequired)
    assert.isTrue(vm.$children[0].validate.usernameEmail)
    assert.isTrue(vm.$children[0].validate.passwordRequired)
    assert.isTrue(vm.$children[0].isValid)
  })

  it('should call setLoginAttempt on button push', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'setLoginAttempt')

    vm.$el.querySelector('#key-button').click()

    assert.isTrue(vm.$children[0].setLoginAttempt.calledWith(true))

    vm.$children[0].setLoginAttempt.restore()
  })
})
