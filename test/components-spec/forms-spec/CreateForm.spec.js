/* global it describe assert sinon beforeEach afterEach */
import chai from 'chai'
import Vue from 'vue'
import CreateForm from '../../../public/components/forms/CreateForm.vue'

chai.should()
describe('CreateForm.vue', function () {
  // mock vue-router
  CreateForm.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      },
      path: '/create'
    }
  }

  let clock
  let promise

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    promise = sinon.stub(CreateForm.methods, 'createUser').returnsPromise()
  })

  afterEach(() => {
    clock.restore()
    CreateForm.methods.createUser.restore()
  })

  it('should inherit the auth property from the state', () => {
    CreateForm.computed.auth().should.be.false
  })

  it('should inherit the user property from the state', () => {
    CreateForm.computed.user().should.be.an.instanceof(Object)
  })

  it('should inherit the forgot property from the state', () => {
    CreateForm.computed.forgot().should.be.false
  })

  it('should inherit the rememberMe property from the state', () => {
    CreateForm.computed.rememberMe().should.be.false
  })

  it('should have a validate property', () => {
    CreateForm.computed.validate.should.be.an.instanceof(Function)
  })

  it('should have an isValid property', () => {
    CreateForm.computed.isValid.should.be.an.instanceof(Function)
  })

  it('should have a saveUser method', () => {
    CreateForm.methods.saveUser.should.be.an.instanceof(Function)
  })

  it('should have a loginUser method', () => {
    CreateForm.methods.loginUser.should.be.an.instanceof(Function)
  })

  it('should have a createUser method', () => {
    CreateForm.methods.createUser.should.be.an.instanceof(Function)
  })

  it('should render with initial state and component tree', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': CreateForm
      }
    }).$mount()

    assert.isNotNull(vm.$el.querySelector('#create-form'))
    assert.isNotNull(vm.$el.querySelector('#user-line'))
    assert.isNotNull(vm.$el.querySelector('#key-line'))
    assert.isNotNull(vm.$el.querySelector('#confirm-line'))
    assert.isNotNull(vm.$el.querySelector('#remember-me'))
    assert.isNotNull(vm.$el.querySelector('#forgot-password'))
  })

  it('should create user and log in to app if isValid', (done) => {
    sinon.stub(CreateForm.computed, 'auth').returns('username@domain.com')
    sinon.stub(CreateForm.computed, 'validate').returns({
      usernameEmail: true,
      usernameRequired: true,
      passwordRequired: true,
      confirmMatch: true
    })
    sinon.stub(CreateForm.computed, 'isValid').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': CreateForm
      }
    }).$mount()
    promise.resolves('username@domain.com')
    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.spy(vm.$children[0], 'createUser')
    sinon.stub(vm.$children[0], 'saveUser')

    vm.$children[0].create('username@domain.com', 'password', false)
    clock.tick(250)
    vm.$children[0].saveUser.calledOnce.should.be.true
    vm.$children[0].createUser.calledWith('username@domain.com', 'password', false).should.be.true
    vm.$children[0].$route.router.go.calledWith('/app').should.be.true

    CreateForm.computed.auth.restore()
    CreateForm.computed.validate.restore()
    CreateForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].createUser.restore()
    vm.$children[0].saveUser.restore()
    done()
  })

  it('should not create user or log in to app if !isValid', (done) => {
    sinon.stub(CreateForm.computed, 'auth').returns('username@domain.com')
    sinon.stub(CreateForm.computed, 'validate').returns({
      usernameEmail: true,
      usernameRequired: true,
      passwordRequired: true,
      confirmMatch: false
    })
    sinon.stub(CreateForm.computed, 'isValid').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': CreateForm
      }
    }).$mount()
    promise.resolves('username@domain.com')
    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.spy(vm.$children[0], 'createUser')
    sinon.stub(vm.$children[0], 'saveUser')

    vm.$children[0].create('username@domain.com', 'password', false)
    clock.tick(250)
    vm.$children[0].saveUser.calledOnce.should.be.false
    vm.$children[0].createUser.calledOnce.should.be.false
    vm.$children[0].$route.router.go.calledOnce.should.be.false

    CreateForm.computed.auth.restore()
    CreateForm.computed.validate.restore()
    CreateForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].createUser.restore()
    vm.$children[0].saveUser.restore()
    done()
  })

  it('should validate user.username as required', (done) => {
    sinon.stub(CreateForm.computed, 'user').returns({
      username: '',
      key: 'password',
      confirm: 'password'
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': CreateForm
      }
    }).$mount()

    vm.$children[0].validate.usernameRequired.should.be.false
    vm.$children[0].validate.usernameEmail.should.be.false
    vm.$children[0].validate.passwordRequired.should.be.true
    vm.$children[0].validate.confirmMatch.should.be.true
    vm.$children[0].isValid.should.be.false

    CreateForm.computed.user.restore()
    done()
  })

  it('should validate user.username as an email address', (done) => {
    sinon.stub(CreateForm.computed, 'user').returns({
      username: 'username',
      key: 'password',
      confirm: 'password'
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': CreateForm
      }
    }).$mount()

    vm.$children[0].validate.usernameRequired.should.be.true
    vm.$children[0].validate.usernameEmail.should.be.false
    vm.$children[0].validate.passwordRequired.should.be.true
    vm.$children[0].validate.confirmMatch.should.be.true
    vm.$children[0].isValid.should.be.false

    CreateForm.computed.user.restore()
    done()
  })

  it('should validate user.key as required', (done) => {
    sinon.stub(CreateForm.computed, 'user').returns({
      username: 'username@domain.com',
      key: '',
      confirm: ''
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': CreateForm
      }
    }).$mount()

    vm.$children[0].validate.usernameRequired.should.be.true
    vm.$children[0].validate.usernameEmail.should.be.true
    vm.$children[0].validate.passwordRequired.should.be.false
    vm.$children[0].validate.confirmMatch.should.be.true
    vm.$children[0].isValid.should.be.false

    CreateForm.computed.user.restore()
    done()
  })

  it('should validate user.confirm as matching user.key', (done) => {
    sinon.stub(CreateForm.computed, 'user').returns({
      username: 'username@domain.com',
      key: 'password',
      confirm: ''
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': CreateForm
      }
    }).$mount()

    vm.$children[0].validate.usernameRequired.should.be.true
    vm.$children[0].validate.usernameEmail.should.be.true
    vm.$children[0].validate.passwordRequired.should.be.true
    vm.$children[0].validate.confirmMatch.should.be.false
    vm.$children[0].isValid.should.be.false

    CreateForm.computed.user.restore()
    done()
  })

  it('isValid should return true if validate is all true', (done) => {
    sinon.stub(CreateForm.computed, 'user').returns({
      username: 'username@domain.com',
      key: 'password',
      confirm: 'password'
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': CreateForm
      }
    }).$mount()

    vm.$children[0].validate.usernameRequired.should.be.true
    vm.$children[0].validate.usernameEmail.should.be.true
    vm.$children[0].validate.passwordRequired.should.be.true
    vm.$children[0].validate.confirmMatch.should.be.true
    vm.$children[0].isValid.should.be.true

    CreateForm.computed.user.restore()
    done()
  })
})
