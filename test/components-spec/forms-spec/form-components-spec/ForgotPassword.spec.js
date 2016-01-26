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

  it('should have a toggleCheckbox method', () => {
    ForgotPassword.methods.toggleCheckbox.should.be.an.instanceof(Function)
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
})
