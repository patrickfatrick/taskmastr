/* global it describe */
import chai from 'chai'
import Vue from 'vue'
import ForgotPassword from '../../../../public/components/forms/form-components/ForgotPassword.vue'

chai.should()

describe('ForgotPassword.vue', function () {
  it('should inherit the forgot property from the state', () => {
    ForgotPassword.computed.forgot().should.be.false
  })

  it('should inherit the create property from the state', () => {
    ForgotPassword.computed.create().should.be.false
  })

  it('should have a setForgot method', () => {
    ForgotPassword.methods.setForgot.should.be.an.instanceof(Function)
  })

  it('should have a setForgot method', () => {
    ForgotPassword.methods.toggleForgot.should.be.an.instanceof(Function)
  })

  it('should render with initial state', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotPassword
      }
    }).$mount()
    vm.$el.querySelector('.fa').classList.contains('fa-square-o').should.be.true
    vm.$el.querySelector('.fa').classList.contains('fa-check-square-o').should.be.false
  })

  it('should respond to changes in the state', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotPassword
      }
    }).$mount()
    vm.$children[0].setForgot(true)
    Vue.nextTick(() => {
      vm.$children[0].forgot.should.be.true
      vm.$el.querySelector('.fa').classList.contains('fa-square-o').should.be.false
      vm.$el.querySelector('.fa').classList.contains('fa-check-square-o').should.be.true
    })
  })
})
