/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import CreateForm from '../../../public/components/forms/CreateForm.vue'
import state from '../../../public/store/state'
import mutations from '../../../public/store/mutations'

describe('CreateForm.vue', function () {
  let clock
  let promise

  // mock vue-router
  CreateForm.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      },
      path: '/create',
      name: 'Create'
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
        'test': CreateForm
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
    assert.isFalse(CreateForm.vuex.getters.auth({ auth: false }))
  })

  it('should inherit the user property from the state', () => {
    assert.isObject(CreateForm.vuex.getters.user({ user: {} }))
  })

  it('should inherit the forgot property from the state', () => {
    assert.isFalse(CreateForm.vuex.getters.forgot({ forgot: false }))
  })

  it('should inherit the rememberMe property from the state', () => {
    assert.isFalse(CreateForm.vuex.getters.rememberMe({ rememberMe: false }))
  })

  it('should have a validate property', () => {
    assert.isFunction(CreateForm.computed.validate)
  })

  it('should have an isValid property', () => {
    assert.isFunction(CreateForm.computed.isValid)
  })

  it('should inherit an addList action', () => {
    assert.isFunction(CreateForm.vuex.actions.addList)
  })

  it('should inherit an setCurrentList action', () => {
    assert.isFunction(CreateForm.vuex.actions.setCurrentList)
  })

  it('should inherit a loginUser action', () => {
    assert.isFunction(CreateForm.vuex.actions.loginUser)
  })

  it('should inherit a createUser action', () => {
    assert.isFunction(CreateForm.vuex.actions.createUser)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm()

    assert.isNotNull(vm.$el.querySelector('#create-form'))
    assert.isNotNull(vm.$el.querySelector('#user-line'))
    assert.isNotNull(vm.$el.querySelector('#key-line'))
    assert.isNotNull(vm.$el.querySelector('#confirm-line'))
    assert.isNotNull(vm.$el.querySelector('#remember-me'))
    assert.isNotNull(vm.$el.querySelector('#forgot-password'))
  })

  it('should create user and log in to app if isValid', () => {
    sinon.stub(CreateForm.computed, 'validate').returns({
      usernameEmail: true,
      usernameRequired: true,
      passwordRequired: true,
      confirmMatch: true
    })
    sinon.stub(CreateForm.computed, 'isValid').returns(true)

    const vm = mountVm({ auth: 'username@domain.com' })
    promise = sinon.stub(vm.$children[0], 'createUser').returnsPromise()

    promise.resolves('username@domain.com')
    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.stub(vm.$children[0], 'addList')
    sinon.stub(vm.$children[0], 'setCurrentList')

    vm.$children[0].create('username@domain.com', 'password', false)

    clock.tick(250)

    assert.isTrue(vm.$children[0].createUser.calledWith('username@domain.com', 'password', false))
    assert.isTrue(vm.$children[0].addList.calledWithMatch({ list: 'Your first list' }))
    assert.isTrue(vm.$children[0].setCurrentList.calledOnce)
    assert.isTrue(vm.$children[0].$route.router.go.calledWithMatch(/\/app\/list\/[a-z0-9]+/))

    CreateForm.computed.validate.restore()
    CreateForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].addList.restore()
    vm.$children[0].setCurrentList.restore()
  })

  it('should not create user or log in to app if !isValid', () => {
    sinon.stub(CreateForm.computed, 'validate').returns({
      usernameEmail: true,
      usernameRequired: true,
      passwordRequired: true,
      confirmMatch: false
    })
    sinon.stub(CreateForm.computed, 'isValid').returns(false)

    const vm = mountVm({ auth: 'username@domain.com' })
    promise = sinon.stub(vm.$children[0], 'createUser').returnsPromise()

    promise.resolves('username@domain.com')
    sinon.stub(vm.$children[0].$route.router, 'go')

    vm.$children[0].create('username@domain.com', 'password', false)

    clock.tick(250)

    assert.isFalse(vm.$children[0].createUser.calledOnce)
    assert.isFalse(vm.$children[0].$route.router.go.calledOnce)

    CreateForm.computed.validate.restore()
    CreateForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
  })

  it('should validate user.username as required', () => {
    const vm = mountVm({ user: {
      username: '',
      key: 'password',
      confirm: 'password'
    } })

    assert.isFalse(vm.$children[0].validate.usernameRequired)
    assert.isFalse(vm.$children[0].validate.usernameEmail)
    assert.isTrue(vm.$children[0].validate.passwordRequired)
    assert.isTrue(vm.$children[0].validate.confirmMatch)
    assert.isFalse(vm.$children[0].isValid)
  })

  it('should validate user.username as an email address', () => {
    const vm = mountVm({ user: {
      username: 'username',
      key: 'password',
      confirm: 'password'
    } })

    assert.isTrue(vm.$children[0].validate.usernameRequired)
    assert.isFalse(vm.$children[0].validate.usernameEmail)
    assert.isTrue(vm.$children[0].validate.passwordRequired)
    assert.isTrue(vm.$children[0].validate.confirmMatch)
    assert.isFalse(vm.$children[0].isValid)
  })

  it('should validate user.key as required', () => {
    const vm = mountVm({ user: {
      username: 'username@domain.com',
      key: '',
      confirm: ''
    } })

    assert.isTrue(vm.$children[0].validate.usernameRequired)
    assert.isTrue(vm.$children[0].validate.usernameEmail)
    assert.isFalse(vm.$children[0].validate.passwordRequired)
    assert.isTrue(vm.$children[0].validate.confirmMatch)
    assert.isFalse(vm.$children[0].isValid)
  })

  it('should validate user.confirm as matching user.key', () => {
    const vm = mountVm({ user: {
      username: 'username@domain.com',
      key: 'password',
      confirm: ''
    } })

    assert.isTrue(vm.$children[0].validate.usernameRequired)
    assert.isTrue(vm.$children[0].validate.usernameEmail)
    assert.isTrue(vm.$children[0].validate.passwordRequired)
    assert.isFalse(vm.$children[0].validate.confirmMatch)
    assert.isFalse(vm.$children[0].isValid)
  })

  it('isValid should return true if validate is all true', () => {
    const vm = mountVm({ user: {
      username: 'username@domain.com',
      key: 'password',
      confirm: 'password'
    } })

    assert.isTrue(vm.$children[0].validate.usernameRequired)
    assert.isTrue(vm.$children[0].validate.usernameEmail)
    assert.isTrue(vm.$children[0].validate.passwordRequired)
    assert.isTrue(vm.$children[0].validate.confirmMatch)
    assert.isTrue(vm.$children[0].isValid)
  })
})
