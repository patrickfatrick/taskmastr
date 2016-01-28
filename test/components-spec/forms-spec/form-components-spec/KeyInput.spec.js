/* global it describe assert sinon */
import chai from 'chai'
import Vue from 'vue'
import KeyInput from '../../../../public/components/forms/form-components/KeyInput.vue'

chai.should()
describe('KeyInput.vue', function () {
  // mock vue-router
  KeyInput.computed.$route = () => {
    return {
      path: '/login'
    }
  }

  it('should inherit the keyInput property from the state', () => {
    KeyInput.computed.user().should.be.an.instanceof(Object)
  })

  it('should inherit the create property from the state', () => {
    KeyInput.computed.create().should.be.false
  })

  it('should inherit the invalidKey property from the state', () => {
    KeyInput.computed.invalidKey().should.be.false
  })

  it('should inherit the loginAttempt property from the state', () => {
    KeyInput.computed.loginAttempt().should.be.false
  })

  it('should have a setLoginAttempt method', () => {
    KeyInput.methods.setLoginAttempt.should.be.an.instanceof(Function)
  })

  it('should render with initial state', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': KeyInput
      }
    }).$mount()

    vm.$el.querySelector('#key').classList.contains('invalid').should.be.false
    vm.$el.querySelector('.error-text').children[0].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[1].classList.contains('hidden').should.be.true
  })

  it('should respond to changes in the state (loginAttempt, invalidKey)', (done) => {
    KeyInput.computed.require = () => {
      return true
    }
    sinon.stub(KeyInput.computed, 'loginAttempt').returns(true)
    sinon.stub(KeyInput.computed, 'invalidKey').returns('Invalid password')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': KeyInput
      }
    }).$mount()

    vm.$el.querySelector('#key').classList.contains('invalid').should.be.true
    vm.$el.querySelector('.error-text').children[0].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.error-text').children[1].classList.contains('hidden').should.be.false

    delete KeyInput.computed.require
    KeyInput.computed.loginAttempt.restore()
    KeyInput.computed.invalidKey.restore()
    done()
  })

  it('should respond to changes in the state (loginAttempt, require)', (done) => {
    KeyInput.computed.require = () => {
      return false
    }
    sinon.stub(KeyInput.computed, 'loginAttempt').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': KeyInput
      }
    }).$mount()

    vm.$el.querySelector('#key').classList.contains('invalid').should.be.true
    vm.$el.querySelector('.error-text').children[0].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.error-text').children[1].classList.contains('hidden').should.be.true

    delete KeyInput.computed.require
    KeyInput.computed.loginAttempt.restore()
    done()
  })

  it('should call setLoginAttempt on button push', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': KeyInput
      }
    }).$mount()

    vm.$el.querySelector('#key-button').click()
    Vue.nextTick(() => {
      vm.$children[0].loginAttempt.should.be.true
    })

    vm.$children[0].setLoginAttempt(false)
    done()
  })

  it('key-button should not render on /create', () => {
    KeyInput.computed.$route = () => {
      return {
        path: '/create'
      }
    }
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': KeyInput
      }
    }).$mount()

    assert.isNull(vm.$el.querySelector('#key-button'))
  })
})
