/* global it describe sinon */
import chai from 'chai'
import Vue from 'vue'
import UsernameInput from '../../../../public/components/forms/form-components/UsernameInput.vue'

chai.should()
describe('UsernameInput.vue', function () {
  // mock vue-router
  UsernameInput.computed.$route = () => {
    return {
      path: '/login'
    }
  }

  it('should inherit the user property from the state', () => {
    UsernameInput.computed.user().should.be.an.instanceof(Object)
  })

  it('should inherit the forgot property from the state', () => {
    UsernameInput.computed.forgot().should.be.false
  })

  it('should inherit the forgotEmail property from the state', () => {
    UsernameInput.computed.forgotEmail().should.be.false
  })

  it('should inherit the forgotFail property from the state', () => {
    UsernameInput.computed.forgotFail().should.be.false
  })

  it('should inherit the loginAttempt property from the state', () => {
    UsernameInput.computed.loginAttempt().should.be.false
  })

  it('should have a setForgotAttempt method', () => {
    UsernameInput.methods.setForgotAttempt.should.be.an.instanceof(Function)
  })

  it('should render with initial state', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': UsernameInput
      }
    }).$mount()

    vm.$el.querySelector('#user').classList.contains('invalid').should.be.false
    vm.$el.querySelector('.error-text').children[0].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[2].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[3].classList.contains('hidden').should.be.true
  })

  it('should respond to changes in the state (loginAttempt, !require)', (done) => {
    UsernameInput.computed.require = () => {
      return false
    }
    UsernameInput.computed.validate = () => {
      return false
    }
    sinon.stub(UsernameInput.computed, 'loginAttempt').returns(true)
    sinon.stub(UsernameInput.computed, 'forgotAttempt').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': UsernameInput
      }
    }).$mount()

    vm.$el.querySelector('#user').classList.contains('invalid').should.be.true
    vm.$el.querySelector('.error-text').children[0].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.error-text').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[2].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[3].classList.contains('hidden').should.be.true

    delete UsernameInput.computed.require
    delete UsernameInput.computed.validate
    UsernameInput.computed.loginAttempt.restore()
    UsernameInput.computed.forgotAttempt.restore()
    done()
  })

  it('should respond to changes in the state (forgotAttempt, !require)', (done) => {
    UsernameInput.computed.require = () => {
      return false
    }
    UsernameInput.computed.validate = () => {
      return false
    }
    sinon.stub(UsernameInput.computed, 'loginAttempt').returns(false)
    sinon.stub(UsernameInput.computed, 'forgotAttempt').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': UsernameInput
      }
    }).$mount()

    vm.$el.querySelector('#user').classList.contains('invalid').should.be.true
    vm.$el.querySelector('.error-text').children[0].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.error-text').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[2].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[3].classList.contains('hidden').should.be.true

    delete UsernameInput.computed.require
    delete UsernameInput.computed.validate
    UsernameInput.computed.loginAttempt.restore()
    UsernameInput.computed.forgotAttempt.restore()
    done()
  })

  it('should respond to changes in the state (loginAttempt, !validate)', (done) => {
    UsernameInput.computed.require = () => {
      return true
    }
    UsernameInput.computed.validate = () => {
      return false
    }
    sinon.stub(UsernameInput.computed, 'loginAttempt').returns(true)
    sinon.stub(UsernameInput.computed, 'forgotAttempt').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': UsernameInput
      }
    }).$mount()

    vm.$el.querySelector('#user').classList.contains('invalid').should.be.true
    vm.$el.querySelector('.error-text').children[0].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[1].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.error-text').children[2].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[3].classList.contains('hidden').should.be.true

    delete UsernameInput.computed.require
    delete UsernameInput.computed.validate
    UsernameInput.computed.loginAttempt.restore()
    UsernameInput.computed.forgotAttempt.restore()
    done()
  })

  it('should respond to changes in the state (forgotAttempt, forgotFail)', (done) => {
    // mock vue-router
    UsernameInput.computed.$route = () => {
      return {
        path: '/forgot'
      }
    }
    UsernameInput.computed.require = () => {
      return true
    }
    UsernameInput.computed.validate = () => {
      return true
    }
    sinon.stub(UsernameInput.computed, 'forgotAttempt').returns(true)
    sinon.stub(UsernameInput.computed, 'forgotFail').returns('Forgot fail')
    sinon.stub(UsernameInput.computed, 'forgotEmail').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': UsernameInput
      }
    }).$mount()

    vm.$el.querySelector('#user').classList.contains('invalid').should.be.true
    vm.$el.querySelector('.error-text').children[0].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[2].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.error-text').children[3].classList.contains('hidden').should.be.true

    delete UsernameInput.computed.require
    delete UsernameInput.computed.validatematch
    UsernameInput.computed.forgotAttempt.restore()
    UsernameInput.computed.forgotFail.restore()
    UsernameInput.computed.forgotEmail.restore()
    done()
  })

  it('should respond to changes in the state (forgotAttempt, forgotEmail)', (done) => {
    // mock vue-router
    UsernameInput.computed.$route = () => {
      return {
        path: '/forgot'
      }
    }
    UsernameInput.computed.require = () => {
      return true
    }
    UsernameInput.computed.validate = () => {
      return true
    }
    sinon.stub(UsernameInput.computed, 'forgotAttempt').returns(true)
    sinon.stub(UsernameInput.computed, 'forgotFail').returns(false)
    sinon.stub(UsernameInput.computed, 'forgotEmail').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': UsernameInput
      }
    }).$mount()

    vm.$el.querySelector('#user').classList.contains('invalid').should.be.false
    vm.$el.querySelector('.error-text').children[0].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[2].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[3].classList.contains('hidden').should.be.false

    delete UsernameInput.computed.require
    delete UsernameInput.computed.validate
    UsernameInput.computed.forgotAttempt.restore()
    UsernameInput.computed.forgotFail.restore()
    UsernameInput.computed.forgotEmail.restore()
    done()
  })
})
