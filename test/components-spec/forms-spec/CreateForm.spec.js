/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import CreateForm from '../../../src/components/forms/CreateForm.vue'
import mountVm from '../../mount-vm'

describe('CreateForm.vue', function () {
  let clock
  let promise

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should inherit the authenticated property from the state', () => {
    const vm = mountVm(CreateForm)
    assert.isFalse(vm.authenticated)
  })

  it('should inherit the user property from the state', () => {
    const vm = mountVm(CreateForm)
    assert.isObject(vm.user)
  })

  it('should inherit the forgot property from the state', () => {
    const vm = mountVm(CreateForm)
    assert.isFalse(vm.forgot)
  })

  it('should inherit the rememberMe property from the state', () => {
    const vm = mountVm(CreateForm)
    assert.isFalse(vm.rememberMe)
  })

  it('should have a validate property', () => {
    const vm = mountVm(CreateForm)
    assert.deepEqual(vm.validate, { usernameEmail: false, usernameRequired: false, passwordRequired: false, confirmMatch: true })
  })

  it('should have an isValid property', () => {
    const vm = mountVm(CreateForm)
    assert.isFalse(vm.isValid)
  })

  it('should inherit an addList action', () => {
    const vm = mountVm(CreateForm)
    assert.isFunction(vm.addList)
  })

  it('should inherit an setCurrentList action', () => {
    const vm = mountVm(CreateForm)
    assert.isFunction(vm.setCurrentList)
  })

  it('should inherit a createUser action', () => {
    const vm = mountVm(CreateForm)
    assert.isFunction(vm.createUser)
  })

  it('should inherit the setConfirmAttempt method from the store', () => {
    const vm = mountVm(CreateForm)
    assert.isFunction(vm.setConfirmAttempt)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm(CreateForm)

    assert.isTrue(vm.$el.classList.contains('create-form'))
    assert.isNotNull(vm.$el.querySelector('.prompt-line--user-line'))
    assert.isNotNull(vm.$el.querySelector('.prompt-line--key-line'))
    assert.isNotNull(vm.$el.querySelector('.prompt-line--confirm-line'))
    assert.isNotNull(vm.$el.querySelector('.remember-me'))
    assert.isNotNull(vm.$el.querySelector('.forgot-password'))
    assert.isNotNull(vm.$el.querySelector('.create-form__button-container__submit'))
    assert.isNotNull(vm.$el.querySelector('.try-it__button'))
  })

  it('should create user and log in to app if isValid', () => {
    const vm = mountVm(CreateForm, {
      authenticated: 'username@domain.com',
      user: {
        username: 'username@domain.com',
        key: 'password',
        confirm: 'password'
      }
    })
    promise = sinon.stub(vm, 'createUser').returnsPromise()
    promise.resolves('username@domain.com')
    sinon.stub(vm, 'addList')
    sinon.stub(vm, 'setCurrentList')
    sinon.stub(vm.$router, 'push')

    vm.create('username@domain.com', 'password', false)
    clock.tick(250)

    assert.isTrue(vm.createUser.calledWith({ username: 'username@domain.com', key: 'password', rememberMe: false }))
    assert.isTrue(vm.addList.calledWithMatch({ list: 'Your first list' }))
    assert.isTrue(vm.setCurrentList.calledOnce)
    assert.isTrue(vm.$router.push.calledWithMatch(/\/app\/list\/[a-z0-9]+/))

    vm.$router.push.restore()
    vm.addList.restore()
    vm.setCurrentList.restore()
  })

  it('should not create user or log in to app if !isValid', () => {
    const vm = mountVm(CreateForm)
    promise = sinon.stub(vm, 'createUser').returnsPromise()
    promise.resolves('username@domain.com')
    sinon.stub(vm.$router, 'push')

    vm.create('username@domain.com', 'password', false)

    clock.tick(250)

    assert.isFalse(vm.createUser.calledOnce)
    assert.isFalse(vm.$router.push.calledOnce)
    vm.$router.push.restore()
  })

  it('should validate user.username as required', () => {
    const vm = mountVm(CreateForm, { user: {
      username: '',
      key: 'password',
      confirm: 'password'
    } })

    assert.isFalse(vm.validate.usernameRequired)
    assert.isFalse(vm.validate.usernameEmail)
    assert.isTrue(vm.validate.passwordRequired)
    assert.isTrue(vm.validate.confirmMatch)
    assert.isFalse(vm.isValid)
  })

  it('should validate user.username as an email address', () => {
    const vm = mountVm(CreateForm, { user: {
      username: 'username',
      key: 'password',
      confirm: 'password'
    } })

    assert.isTrue(vm.validate.usernameRequired)
    assert.isFalse(vm.validate.usernameEmail)
    assert.isTrue(vm.validate.passwordRequired)
    assert.isTrue(vm.validate.confirmMatch)
    assert.isFalse(vm.isValid)
  })

  it('should validate user.key as required', () => {
    const vm = mountVm(CreateForm, { user: {
      username: 'username@domain.com',
      key: '',
      confirm: ''
    } })

    assert.isTrue(vm.validate.usernameRequired)
    assert.isTrue(vm.validate.usernameEmail)
    assert.isFalse(vm.validate.passwordRequired)
    assert.isTrue(vm.validate.confirmMatch)
    assert.isFalse(vm.isValid)
  })

  it('should validate user.confirm as matching user.key', () => {
    const vm = mountVm(CreateForm, { user: {
      username: 'username@domain.com',
      key: 'password',
      confirm: ''
    } })

    assert.isTrue(vm.validate.usernameRequired)
    assert.isTrue(vm.validate.usernameEmail)
    assert.isTrue(vm.validate.passwordRequired)
    assert.isFalse(vm.validate.confirmMatch)
    assert.isFalse(vm.isValid)
  })

  it('isValid should return true if validate is all true', () => {
    const vm = mountVm(CreateForm, { user: {
      username: 'username@domain.com',
      key: 'password',
      confirm: 'password'
    } })

    assert.isTrue(vm.validate.usernameRequired)
    assert.isTrue(vm.validate.usernameEmail)
    assert.isTrue(vm.validate.passwordRequired)
    assert.isTrue(vm.validate.confirmMatch)
    assert.isTrue(vm.isValid)
  })

  it('should call setConfirmAttempt on button push', () => {
    const vm = mountVm(CreateForm)
    sinon.stub(vm, 'setConfirmAttempt')

    vm.$el.querySelector('.create-form__button-container__submit').click()

    assert.isTrue(vm.setConfirmAttempt.calledWith(true))
    vm.setConfirmAttempt.restore()
  })
})
