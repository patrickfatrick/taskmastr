/* global it describe sinon */
import chai from 'chai'
import Vue from 'vue'
import RememberMe from '../../../../public/components/forms/form-components/RememberMe.vue'

chai.should()
describe('RememberMe.vue', function () {
  it('should inherit the rememberMe property from the state', () => {
    RememberMe.computed.rememberMe().should.be.false
  })

  it('should have a setRememberMe method', () => {
    RememberMe.methods.setRememberMe.should.be.an.instanceof(Function)
  })

  it('should render with initial state', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': RememberMe
      }
    }).$mount()

    vm.$el.querySelector('.fa').classList.contains('fa-square-o').should.be.true
    vm.$el.querySelector('.fa').classList.contains('fa-check-square-o').should.be.false
  })

  it('should respond to changes in the state', (done) => {
    sinon.stub(RememberMe.computed, 'rememberMe').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': RememberMe
      }
    }).$mount()

    vm.$children[0].rememberMe.should.be.true
    vm.$el.querySelector('.fa').classList.contains('fa-square-o').should.be.false
    vm.$el.querySelector('.fa').classList.contains('fa-check-square-o').should.be.true

    RememberMe.computed.rememberMe.restore()
    done()
  })
})
