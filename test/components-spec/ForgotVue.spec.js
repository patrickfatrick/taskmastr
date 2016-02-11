/* global it describe assert sinon */
import chai from 'chai'
import Vue from 'vue'
import ForgotVue from '../../public/components/ForgotVue.vue'

chai.should()
describe('ForgotVue.vue', function () {
  // mock vue-router
  ForgotVue.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      },
      path: '/forgot'
    }
  }

  it('should inherit the auth property from the state', () => {
    ForgotVue.computed.auth().should.be.false
  })

  it('should inherit the user property from the state', () => {
    ForgotVue.computed.user().should.be.an.instanceof(Object)
  })

  it('should inherit the init property from the state', () => {
    ForgotVue.computed.init().should.be.false
  })

  it('should inherit the reset property from the state', () => {
    ForgotVue.computed.reset().should.be.false
  })

  it('should inherit the forgot property from the state', () => {
    ForgotVue.computed.forgot().should.be.false
  })

  it('should inherit the setForgot method from the store', () => {
    ForgotVue.methods.setForgot.should.be.an.instanceof(Function)
  })

  it('should render with initial state and component tree', () => {
    sinon.stub(ForgotVue.computed, 'forgot').returns(true)
    sinon.stub(ForgotVue.computed, 'init').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotVue
      }
    }).$mount()

    assert.isNotNull(vm.$el.querySelector('.mask'))
    assert.isNotNull(vm.$el.querySelector('#key-modal'))
    assert.isNotNull(vm.$el.querySelector('#forgot-form'))
    assert.isNotNull(vm.$el.querySelector('#try-it-button'))

    ForgotVue.computed.forgot.restore()
    ForgotVue.computed.init.restore()
  })

  it('should respond to changes in the state (init)', () => {
    sinon.stub(ForgotVue.computed, 'forgot').returns(true)
    sinon.stub(ForgotVue.computed, 'init').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotVue
      }
    }).$mount()

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))

    ForgotVue.computed.forgot.restore()
    ForgotVue.computed.init.restore()
  })

  it('should respond to changes in the state (auth and user.tasks)', () => {
    sinon.stub(ForgotVue.computed, 'forgot').returns(true)
    sinon.stub(ForgotVue.computed, 'init').returns(true)
    sinon.stub(ForgotVue.computed, 'auth').returns('username@domain.com')
    sinon.stub(ForgotVue.computed, 'user').returns({
      tasks: [
        {
          list: 'List 1'
        }
      ]
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotVue
      }
    }).$mount()

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))

    ForgotVue.computed.forgot.restore()
    ForgotVue.computed.init.restore()
    ForgotVue.computed.auth.restore()
    ForgotVue.computed.user.restore()
  })

  it('should call setForgot if !forgot', () => {
    sinon.stub(ForgotVue.computed, 'forgot').returns(false)
    sinon.stub(ForgotVue.methods, 'setForgot')
    new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotVue
      }
    }).$mount()

    ForgotVue.methods.setForgot.calledWith(true).should.be.true

    ForgotVue.computed.forgot.restore()
    ForgotVue.methods.setForgot.restore()
  })
})
