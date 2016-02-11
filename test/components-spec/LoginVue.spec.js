/* global it describe assert sinon */
import chai from 'chai'
import Vue from 'vue'
import LoginVue from '../../public/components/LoginVue.vue'

chai.should()
describe('LoginVue.vue', function () {
  // mock vue-router
  LoginVue.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      },
      path: '/login'
    }
  }

  it('should inherit the auth property from the state', () => {
    LoginVue.computed.auth().should.be.false
  })

  it('should inherit the user property from the state', () => {
    LoginVue.computed.user().should.be.an.instanceof(Object)
  })

  it('should inherit the init property from the state', () => {
    LoginVue.computed.init().should.be.false
  })

  it('should render with initial state and component tree', () => {
    sinon.stub(LoginVue.computed, 'init').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': LoginVue
      }
    }).$mount()

    assert.isNotNull(vm.$el.querySelector('.mask'))
    assert.isNotNull(vm.$el.querySelector('#key-modal'))
    assert.isNotNull(vm.$el.querySelector('#user-form'))
    assert.isNotNull(vm.$el.querySelector('#try-it-button'))

    LoginVue.computed.init.restore()
  })

  it('should respond to changes in the state (init)', () => {
    sinon.stub(LoginVue.computed, 'init').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': LoginVue
      }
    }).$mount()

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))

    LoginVue.computed.init.restore()
  })

  it('should respond to changes in the state (auth and user.tasks)', () => {
    sinon.stub(LoginVue.computed, 'init').returns(true)
    sinon.stub(LoginVue.computed, 'auth').returns('username@domain.com')
    sinon.stub(LoginVue.computed, 'user').returns({
      tasks: [
        {
          list: 'List 1'
        }
      ]
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': LoginVue
      }
    }).$mount()

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))

    LoginVue.computed.init.restore()
    LoginVue.computed.auth.restore()
    LoginVue.computed.user.restore()
  })
})
