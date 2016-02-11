/* global it describe assert sinon beforeEach afterEach */
import chai from 'chai'
import Vue from 'vue'
import ResetVue from '../../public/components/ResetVue.vue'

chai.should()
describe('ResetVue.vue', function () {
  // mock vue-router
  ResetVue.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      },
      path: '/reset',
      query: {
        token: 'token'
      }
    }
  }

  beforeEach(() => {
    sinon.stub(ResetVue.methods, 'setReset')
    sinon.stub(ResetVue.methods, 'setResetToken')
  })

  afterEach(() => {
    ResetVue.methods.setReset.restore()
    ResetVue.methods.setResetToken.restore()
  })

  it('should inherit the auth property from the state', () => {
    ResetVue.computed.auth().should.be.false
  })

  it('should inherit the user property from the state', () => {
    ResetVue.computed.user().should.be.an.instanceof(Object)
  })

  it('should inherit the init property from the state', () => {
    ResetVue.computed.init().should.be.false
  })

  it('should inherit the setReset method from the store', () => {
    ResetVue.methods.setReset.should.be.an.instanceof(Function)
  })

  it('should inherit the setResetToken method from the store', () => {
    ResetVue.methods.setResetToken.should.be.an.instanceof(Function)
  })

  it('should render with initial state and component tree', () => {
    sinon.stub(ResetVue.computed, 'init').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetVue
      }
    }).$mount()

    assert.isNotNull(vm.$el.querySelector('.mask'))
    assert.isNotNull(vm.$el.querySelector('#key-modal'))
    assert.isNotNull(vm.$el.querySelector('#reset-form'))
    assert.isNotNull(vm.$el.querySelector('#try-it-button'))

    ResetVue.computed.init.restore()
  })

  it('should respond to changes in the state (init)', () => {
    sinon.stub(ResetVue.computed, 'init').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetVue
      }
    }).$mount()

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))

    ResetVue.computed.init.restore()
  })

  it('should respond to changes in the state (auth and user.tasks)', () => {
    sinon.stub(ResetVue.computed, 'init').returns(true)
    sinon.stub(ResetVue.computed, 'auth').returns('username@domain.com')
    sinon.stub(ResetVue.computed, 'user').returns({
      tasks: [
        {
          list: 'List 1'
        }
      ]
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetVue
      }
    }).$mount()

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))

    ResetVue.computed.init.restore()
    ResetVue.computed.auth.restore()
    ResetVue.computed.user.restore()
  })

  it('should call setReset if path === "/reset"', (done) => {
    new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetVue
      }
    }).$mount()

    ResetVue.methods.setReset.calledWith(true).should.be.true

    done()
  })

  it('should not call setReset if path !== "/reset"', (done) => {
    sinon.stub(ResetVue.computed, '$route').returns({
      router: {
        go (location) {
          return location
        }
      },
      path: '/login',
      query: {
        token: 'token'
      }
    })
    new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetVue
      }
    }).$mount()

    ResetVue.methods.setReset.calledOnce.should.be.false

    ResetVue.computed.$route.restore()
    done()
  })

  it('should call setResetToken if token', (done) => {
    new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetVue
      }
    }).$mount()

    ResetVue.methods.setResetToken.calledWith('token').should.be.true

    done()
  })

  it('should not call setResetToken if !token', (done) => {
    sinon.stub(ResetVue.computed, '$route').returns({
      router: {
        go (location) {
          return location
        }
      },
      path: '/reset',
      query: {
        token: ''
      }
    })
    new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetVue
      }
    }).$mount()

    ResetVue.methods.setResetToken.calledOnce.should.be.false

    ResetVue.computed.$route.restore()
    done()
  })
})
