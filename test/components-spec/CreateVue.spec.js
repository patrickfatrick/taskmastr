/* global it describe assert sinon */
import chai from 'chai'
import Vue from 'vue'
import CreateVue from '../../public/components/CreateVue.vue'

chai.should()
describe('CreateVue.vue', function () {
  // mock vue-router
  CreateVue.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      },
      path: '/create'
    }
  }

  it('should inherit the auth property from the state', () => {
    CreateVue.computed.auth().should.be.false
  })

  it('should inherit the user property from the state', () => {
    CreateVue.computed.user().should.be.an.instanceof(Object)
  })

  it('should inherit the init property from the state', () => {
    CreateVue.computed.init().should.be.false
  })

  it('should render with initial state and component tree', () => {
    sinon.stub(CreateVue.computed, 'init').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': CreateVue
      }
    }).$mount()

    assert.isNotNull(vm.$el.querySelector('.mask'))
    assert.isNotNull(vm.$el.querySelector('#key-modal'))
    assert.isNotNull(vm.$el.querySelector('#create-form'))
    assert.isNotNull(vm.$el.querySelector('#try-it-button'))

    CreateVue.computed.init.restore()
  })

  it('should respond to changes in the state (init)', () => {
    sinon.stub(CreateVue.computed, 'init').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': CreateVue
      }
    }).$mount()

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))

    CreateVue.computed.init.restore()
  })

  it('should respond to changes in the state (auth and user.tasks)', () => {
    sinon.stub(CreateVue.computed, 'init').returns(true)
    sinon.stub(CreateVue.computed, 'auth').returns('username@domain.com')
    sinon.stub(CreateVue.computed, 'user').returns({
      tasks: [
        {
          list: 'List 1'
        }
      ]
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': CreateVue
      }
    }).$mount()

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))

    CreateVue.computed.init.restore()
    CreateVue.computed.auth.restore()
    CreateVue.computed.user.restore()
  })
})
