/* global it describe assert sinon beforeEach afterEach */
import chai from 'chai'
import Vue from 'vue'
import LoginForm from '../../../public/components/forms/LoginForm.vue'

chai.should()
describe('LoginForm.vue', function () {
  // mock vue-router
  LoginForm.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      },
      path: '/login'
    }
  }

  let clock
  let promise

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    promise = sinon.stub(LoginForm.methods, 'loginUser').returnsPromise()
  })

  afterEach(() => {
    clock.restore()
    LoginForm.methods.loginUser.restore()
  })

  it('should inherit the auth property from the state', () => {
    LoginForm.computed.auth().should.be.false
  })

  it('should inherit the user property from the state', () => {
    LoginForm.computed.user().should.be.an.instanceof(Object)
  })

  it('should inherit the reset property from the state', () => {
    LoginForm.computed.reset().should.be.false
  })

  it('should inherit the forgot property from the state', () => {
    LoginForm.computed.forgot().should.be.false
  })

  it('should inherit the create property from the state', () => {
    LoginForm.computed.create().should.be.false
  })

  it('should inherit the rememberMe property from the state', () => {
    LoginForm.computed.rememberMe().should.be.false
  })

  it('should have a validate property', () => {
    LoginForm.computed.validate.should.be.an.instanceof(Function)
  })

  it('should have an isValid property', () => {
    LoginForm.computed.isValid.should.be.an.instanceof(Function)
  })

  it('should have a loginUser method', () => {
    LoginForm.methods.loginUser.should.be.an.instanceof(Function)
  })

  it('should render with initial state and component tree', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': LoginForm
      }
    }).$mount()

    assert.isNotNull(vm.$el.querySelector('#user-form'))
    assert.isNotNull(vm.$el.querySelector('#user-line'))
    assert.isNotNull(vm.$el.querySelector('#key-line'))
    assert.isNotNull(vm.$el.querySelector('#remember-me'))
    assert.isNotNull(vm.$el.querySelector('#forgot-password'))
  })

  it('should log in to app if isValid', (done) => {
    sinon.stub(LoginForm.computed, 'auth').returns('username@domain.com')
    sinon.stub(LoginForm.computed, 'validate').returns({
      usernameEmail: true,
      usernameRequired: true,
      passwordRequired: true
    })
    sinon.stub(LoginForm.computed, 'isValid').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': LoginForm
      }
    }).$mount()
    promise.resolves('username@domain.com')
    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.spy(vm.$children[0], 'loginUser')

    vm.$children[0].login('username@domain.com', 'password', false)
    clock.tick(250)
    vm.$children[0].loginUser.calledWith('username@domain.com', 'password', false).should.be.true
    vm.$children[0].$route.router.go.calledWith('/app').should.be.true

    LoginForm.computed.auth.restore()
    LoginForm.computed.validate.restore()
    LoginForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].loginUser.restore()
    done()
  })

  it('should redirect to /create on !auth and create', (done) => {
    sinon.stub(LoginForm.computed, 'auth').returns(false)
    sinon.stub(LoginForm.computed, 'create').returns(true)
    sinon.stub(LoginForm.computed, 'validate').returns({
      usernameEmail: true,
      usernameRequired: true,
      passwordRequired: true
    })
    sinon.stub(LoginForm.computed, 'isValid').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': LoginForm
      }
    }).$mount()
    promise.resolves('username@domain.com')
    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.spy(vm.$children[0], 'loginUser')

    vm.$children[0].login('username@domain.com', 'password', false)
    clock.tick(250)
    vm.$children[0].loginUser.calledWith('username@domain.com', 'password', false).should.be.true
    vm.$children[0].$route.router.go.calledWith('/create').should.be.true

    LoginForm.computed.auth.restore()
    LoginForm.computed.validate.restore()
    LoginForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].loginUser.restore()
    done()
  })

  it('should not log in to app on !isValid', (done) => {
    sinon.stub(LoginForm.computed, 'auth').returns('')
    sinon.stub(LoginForm.computed, 'validate').returns({
      usernameEmail: false,
      usernameRequired: true,
      passwordRequired: true
    })
    sinon.stub(LoginForm.computed, 'isValid').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': LoginForm
      }
    }).$mount()
    promise.resolves('username@domain.com')
    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.spy(vm.$children[0], 'loginUser')

    vm.$children[0].login('username@domain.com', 'password', false)
    clock.tick(250)
    vm.$children[0].loginUser.calledOnce.should.be.false
    vm.$children[0].$route.router.go.calledOnce.should.be.false

    LoginForm.computed.auth.restore()
    LoginForm.computed.validate.restore()
    LoginForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].loginUser.restore()
    done()
  })

  it('should validate user.username as required', (done) => {
    sinon.stub(LoginForm.computed, 'user').returns({
      username: '',
      key: 'password'
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': LoginForm
      }
    }).$mount()

    vm.$children[0].validate.usernameRequired.should.be.false
    vm.$children[0].validate.usernameEmail.should.be.false
    vm.$children[0].validate.passwordRequired.should.be.true
    vm.$children[0].isValid.should.be.false

    LoginForm.computed.user.restore()
    done()
  })

  it('should validate user.username as an email address', (done) => {
    sinon.stub(LoginForm.computed, 'user').returns({
      username: 'username',
      key: 'password'
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': LoginForm
      }
    }).$mount()

    vm.$children[0].validate.usernameRequired.should.be.true
    vm.$children[0].validate.usernameEmail.should.be.false
    vm.$children[0].validate.passwordRequired.should.be.true
    vm.$children[0].isValid.should.be.false

    LoginForm.computed.user.restore()
    done()
  })

  it('should validate user.key as required', (done) => {
    sinon.stub(LoginForm.computed, 'user').returns({
      username: 'username@domain.com',
      key: ''
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': LoginForm
      }
    }).$mount()

    vm.$children[0].validate.usernameRequired.should.be.true
    vm.$children[0].validate.usernameEmail.should.be.true
    vm.$children[0].validate.passwordRequired.should.be.false
    vm.$children[0].isValid.should.be.false

    LoginForm.computed.user.restore()
    done()
  })

  it('isValid should return true if validate is all true', (done) => {
    sinon.stub(LoginForm.computed, 'user').returns({
      username: 'username@domain.com',
      key: 'password'
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': LoginForm
      }
    }).$mount()

    vm.$children[0].validate.usernameRequired.should.be.true
    vm.$children[0].validate.usernameEmail.should.be.true
    vm.$children[0].validate.passwordRequired.should.be.true
    vm.$children[0].isValid.should.be.true

    LoginForm.computed.user.restore()
    done()
  })
})
