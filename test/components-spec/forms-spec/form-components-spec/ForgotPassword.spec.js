/* global it describe sinon */
import chai from 'chai'
import Vue from 'vue'
import ForgotPassword from '../../../../public/components/forms/form-components/ForgotPassword.vue'

chai.should()
describe('ForgotPassword.vue', function () {
  // mock vue-router
  ForgotPassword.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      }
    }
  }

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

  it('should respond to changes in the state', (done) => {
    sinon.stub(ForgotPassword.computed, 'forgot').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotPassword
      }
    }).$mount()

    vm.$children[0].forgot.should.be.true
    vm.$el.querySelector('.fa').classList.contains('fa-square-o').should.be.false
    vm.$el.querySelector('.fa').classList.contains('fa-check-square-o').should.be.true

    ForgotPassword.computed.forgot.restore()
    done()
  })

  it('should route to /forgot on forgot', (done) => {
    sinon.stub(ForgotPassword.computed, 'forgot').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotPassword
      }
    }).$mount()

    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.stub(vm.$children[0], 'setForgot')

    vm.$children[0].toggleForgot(true)
    vm.$children[0].setForgot.calledWith(true).should.be.true
    vm.$children[0].$route.router.go.calledWith('/forgot').should.be.true

    vm.$children[0].$route.router.go.restore()
    vm.$children[0].setForgot.restore()
    ForgotPassword.computed.forgot.restore()
    done()
  })

  it('should route to /create on !forgot and create', (done) => {
    sinon.stub(ForgotPassword.computed, 'forgot').returns(false)
    sinon.stub(ForgotPassword.computed, 'create').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotPassword
      }
    }).$mount()

    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.stub(vm.$children[0], 'setForgot')

    vm.$children[0].toggleForgot(false)
    vm.$children[0].setForgot.calledWith(false).should.be.true
    vm.$children[0].$route.router.go.calledWith('/create').should.be.true

    vm.$children[0].$route.router.go.restore()
    vm.$children[0].setForgot.restore()
    ForgotPassword.computed.create.restore()
    ForgotPassword.computed.forgot.restore()
    done()
  })

  it('should route to /login on !forgot and !create', (done) => {
    sinon.stub(ForgotPassword.computed, 'forgot').returns(false)
    sinon.stub(ForgotPassword.computed, 'create').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotPassword
      }
    }).$mount()

    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.stub(vm.$children[0], 'setForgot')

    vm.$children[0].toggleForgot(false)
    vm.$children[0].setForgot.calledWith(false).should.be.true
    vm.$children[0].$route.router.go.calledWith('/login').should.be.true

    vm.$children[0].$route.router.go.restore()
    vm.$children[0].setForgot.restore()
    ForgotPassword.computed.create.restore()
    ForgotPassword.computed.forgot.restore()
    done()
  })
})
