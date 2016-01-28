/* global it describe sinon */
import chai from 'chai'
import Vue from 'vue'
import ResetKeyInput from '../../../../public/components/forms/form-components/ResetKeyInput.vue'

chai.should()
describe('ResetKeyInput.vue', function () {
  it('should inherit the user property from the state', () => {
    ResetKeyInput.computed.user().should.be.an.instanceof(Object)
  })

  it('should inherit the resetAttempt property from the state', () => {
    ResetKeyInput.computed.resetAttempt().should.be.false
  })

  it('should inherit the resetFail property from the state', () => {
    ResetKeyInput.computed.resetFail().should.be.false
  })

  it('should render with initial state', () => {
    ResetKeyInput.computed.token = () => {
      return 'token'
    }
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetKeyInput
      }
    }).$mount()

    vm.$el.querySelector('#reset-key').classList.contains('invalid').should.be.false
    vm.$el.querySelector('.error-text').children[0].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[2].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[3].classList.contains('hidden').should.be.true

    delete ResetKeyInput.computed.token
  })

  it('should respond to changes in the state (resetAttempt, resetFail)', (done) => {
    ResetKeyInput.computed.require = () => {
      return true
    }
    ResetKeyInput.computed.match = () => {
      return true
    }
    ResetKeyInput.computed.token = () => {
      return 'token'
    }
    sinon.stub(ResetKeyInput.computed, 'resetAttempt').returns(true)
    sinon.stub(ResetKeyInput.computed, 'resetFail').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetKeyInput
      }
    }).$mount()

    vm.$el.querySelector('#reset-key').classList.contains('invalid').should.be.true
    vm.$el.querySelector('.error-text').children[0].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[2].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.error-text').children[3].classList.contains('hidden').should.be.true

    delete ResetKeyInput.computed.require
    delete ResetKeyInput.computed.match
    delete ResetKeyInput.computed.token
    ResetKeyInput.computed.resetAttempt.restore()
    ResetKeyInput.computed.resetFail.restore()
    done()
  })

  it('should respond to changes in the state (resetAttempt, !require)', (done) => {
    ResetKeyInput.computed.require = () => {
      return false
    }
    ResetKeyInput.computed.match = () => {
      return true
    }
    ResetKeyInput.computed.token = () => {
      return 'token'
    }
    sinon.stub(ResetKeyInput.computed, 'resetAttempt').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetKeyInput
      }
    }).$mount()

    vm.$el.querySelector('#reset-key').classList.contains('invalid').should.be.true
    vm.$el.querySelector('.error-text').children[0].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.error-text').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[2].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[3].classList.contains('hidden').should.be.true

    delete ResetKeyInput.computed.require
    delete ResetKeyInput.computed.match
    delete ResetKeyInput.computed.token
    ResetKeyInput.computed.resetAttempt.restore()
    done()
  })

  it('should respond to changes in the state (resetAttempt, !match)', (done) => {
    ResetKeyInput.computed.require = () => {
      return true
    }
    ResetKeyInput.computed.match = () => {
      return false
    }
    ResetKeyInput.computed.token = () => {
      return 'token'
    }
    sinon.stub(ResetKeyInput.computed, 'resetAttempt').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetKeyInput
      }
    }).$mount()

    vm.$el.querySelector('#reset-key').classList.contains('invalid').should.be.false
    vm.$el.querySelector('.error-text').children[0].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[1].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.error-text').children[2].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[3].classList.contains('hidden').should.be.true

    delete ResetKeyInput.computed.require
    delete ResetKeyInput.computed.match
    delete ResetKeyInput.computed.token
    ResetKeyInput.computed.resetAttempt.restore()
    done()
  })

  it('should respond to changes in the state (resetAttempt, token)', (done) => {
    ResetKeyInput.computed.require = () => {
      return true
    }
    ResetKeyInput.computed.match = () => {
      return true
    }
    ResetKeyInput.computed.token = () => {
      return false
    }
    sinon.stub(ResetKeyInput.computed, 'resetAttempt').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetKeyInput
      }
    }).$mount()

    vm.$el.querySelector('#reset-key').classList.contains('invalid').should.be.false
    vm.$el.querySelector('.error-text').children[0].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[2].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[3].classList.contains('hidden').should.be.false

    delete ResetKeyInput.computed.require
    delete ResetKeyInput.computed.match
    delete ResetKeyInput.computed.token
    ResetKeyInput.computed.resetAttempt.restore()
    done()
  })
})
