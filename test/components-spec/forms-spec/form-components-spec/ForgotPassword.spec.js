/* global it describe sinon */
import { assert } from 'chai'
import ForgotPassword from '../../../../src/components/forms/form-components/ForgotPassword.vue'
import mountVm from '../../../mount-vm'

describe('ForgotPasswordVue', function () {
  it('should inherit the forgot property from the state', () => {
    const vm = mountVm(ForgotPassword)
    assert.isFalse(vm.forgot)
  })

  it('should inherit the create property from the state', () => {
    const vm = mountVm(ForgotPassword)
    assert.isFalse(vm.create)
  })

  it('should have a setForgot method', () => {
    const vm = mountVm(ForgotPassword)
    assert.isFunction(vm.setForgot)
  })

  it('should render with initial state', () => {
    const vm = mountVm(ForgotPassword)
    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-square-o'))
    assert.isFalse(vm.$el.querySelector('.fa').classList.contains('fa-check-square-o'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm(ForgotPassword, { forgot: true })

    assert.isTrue(vm.forgot)
    assert.isFalse(vm.$el.querySelector('.fa').classList.contains('fa-square-o'))
    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-check-square-o'))
  })

  it('should route to /forgot on forgot', () => {
    const vm = mountVm(ForgotPassword, { forgot: true })
    sinon.stub(vm.$router, 'push')
    sinon.stub(vm, 'setForgot')

    vm.toggleForgot(true)

    assert.isTrue(vm.setForgot.calledWith(true))
    assert.isTrue(vm.$router.push.calledWith('/forgot'))
    vm.$router.push.restore()
    vm.setForgot.restore()
  })

  it('should route to /create on !forgot and create', () => {
    const vm = mountVm(ForgotPassword, {
      forgot: false,
      create: true
    })
    sinon.stub(vm.$router, 'push')
    sinon.stub(vm, 'setForgot')

    vm.toggleForgot(false)

    assert.isTrue(vm.setForgot.calledWith(false))
    assert.isTrue(vm.$router.push.calledWith('/create'))
    vm.$router.push.restore()
    vm.setForgot.restore()
  })

  it('should route to /login on !forgot and !create', () => {
    const vm = mountVm(ForgotPassword, {
      forgot: false,
      create: false
    })
    sinon.stub(vm.$router, 'push')
    sinon.stub(vm, 'setForgot')

    vm.toggleForgot(false)

    assert.isTrue(vm.setForgot.calledWith(false))
    assert.isTrue(vm.$router.push.calledWith('/login'))
    vm.$router.push.restore()
    vm.setForgot.restore()
  })
})
