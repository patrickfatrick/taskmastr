/* global it describe assert sinon beforeEach afterEach */
import chai from 'chai'
import Vue from 'vue'
import ResetForm from '../../../public/components/forms/ResetForm.vue'

chai.should()
describe('ResetForm.vue', function () {
  // mock vue-router
  ResetForm.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      },
      path: '/reset',
      name: 'Reset'
    }
  }

  let clock
  let promise
  let promiseLogin

  beforeEach(() => {
    clock = sinon.useFakeTimers()
    promise = sinon.stub(ResetForm.methods, 'resetPassword').returnsPromise()
    promiseLogin = sinon.stub(ResetForm.methods, 'loginUser').returnsPromise()
  })

  afterEach(() => {
    clock.restore()
    ResetForm.methods.resetPassword.restore()
    ResetForm.methods.loginUser.restore()
  })

  it('should inherit the auth property from the state', () => {
    ResetForm.computed.auth().should.be.false
  })

  it('should inherit the user property from the state', () => {
    ResetForm.computed.user().should.be.an.instanceof(Object)
  })

  it('should inherit the resetToken property from the state', () => {
    assert.isNull(ResetForm.computed.resetToken())
  })

  it('should have a validate property', () => {
    ResetForm.computed.validate.should.be.an.instanceof(Function)
  })

  it('should have an isValid property', () => {
    ResetForm.computed.isValid.should.be.an.instanceof(Function)
  })

  it('should inherit the resetPassword method from the store', () => {
    ResetForm.methods.resetPassword.should.be.an.instanceof(Function)
  })

  it('should render with initial state and component tree', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetForm
      }
    }).$mount()

    assert.isNotNull(vm.$el.querySelector('#reset-form'))
    assert.isNotNull(vm.$el.querySelector('#reset-key-line'))
    assert.isNotNull(vm.$el.querySelector('#reset-confirm-line'))
  })

  it('should reset password and log in to app if isValid', (done) => {
    sinon.stub(ResetForm.computed, 'auth').returns('username@domain.com')
    sinon.stub(ResetForm.computed, 'user').returns({
      username: 'username@domain.com'
    })
    sinon.stub(ResetForm.computed, 'validate').returns({
      passwordRequired: true,
      confirmMatch: true,
      tokenRequired: true
    })
    sinon.stub(ResetForm.computed, 'isValid').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetForm
      }
    }).$mount()
    promise.resolves('username@domain.com')
    promiseLogin.resolves('username@domain.com')
    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.spy(vm.$children[0], 'resetPassword')
    sinon.spy(vm.$children[0], 'loginUser')

    vm.$children[0].reset('token', 'password')
    clock.tick(250)
    vm.$children[0].resetPassword.calledWith('token', 'password').should.be.true
    vm.$children[0].loginUser.calledWith('username@domain.com', 'password', false).should.be.true
    vm.$children[0].$route.router.go.calledWith('/app').should.be.true

    ResetForm.computed.auth.restore()
    ResetForm.computed.user.restore()
    ResetForm.computed.validate.restore()
    ResetForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].resetPassword.restore()
    vm.$children[0].loginUser.restore()
    done()
  })

  it('should not reset password or log in to app if !isValid', (done) => {
    sinon.stub(ResetForm.computed, 'auth').returns('username@domain.com')
    sinon.stub(ResetForm.computed, 'user').returns({
      username: 'username@domain.com'
    })
    sinon.stub(ResetForm.computed, 'validate').returns({
      passwordRequired: true,
      confirmMatch: true,
      tokenRequired: false
    })
    sinon.stub(ResetForm.computed, 'isValid').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetForm
      }
    }).$mount()
    promise.resolves('username@domain.com')
    promiseLogin.resolves('username@domain.com')
    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.spy(vm.$children[0], 'resetPassword')
    sinon.spy(vm.$children[0], 'loginUser')

    vm.$children[0].reset('token', 'password')
    clock.tick(250)
    vm.$children[0].resetPassword.calledOnce.should.be.false
    vm.$children[0].loginUser.calledOnce.should.be.false
    vm.$children[0].$route.router.go.calledOnce.should.be.false

    ResetForm.computed.auth.restore()
    ResetForm.computed.user.restore()
    ResetForm.computed.validate.restore()
    ResetForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].resetPassword.restore()
    vm.$children[0].loginUser.restore()
    done()
  })

  it('should not reset password or log in to app if invalid token', (done) => {
    sinon.stub(ResetForm.computed, 'auth').returns(false)
    sinon.stub(ResetForm.computed, 'user').returns({
      username: ''
    })
    sinon.stub(ResetForm.computed, 'validate').returns({
      passwordRequired: true,
      confirmMatch: true,
      tokenRequired: true
    })
    sinon.stub(ResetForm.computed, 'isValid').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetForm
      }
    }).$mount()
    promise.resolves('')
    promiseLogin.resolves('')
    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.spy(vm.$children[0], 'resetPassword')
    sinon.spy(vm.$children[0], 'loginUser')

    vm.$children[0].reset('token', 'password')
    clock.tick(250)
    vm.$children[0].resetPassword.calledWith('token', 'password').should.be.true
    vm.$children[0].loginUser.calledOnce.should.be.false
    vm.$children[0].$route.router.go.calledOnce.should.be.false

    ResetForm.computed.auth.restore()
    ResetForm.computed.user.restore()
    ResetForm.computed.validate.restore()
    ResetForm.computed.isValid.restore()
    vm.$children[0].$route.router.go.restore()
    vm.$children[0].resetPassword.restore()
    vm.$children[0].loginUser.restore()
    done()
  })

  it('should validate user.resetKey as required', (done) => {
    sinon.stub(ResetForm.computed, 'user').returns({
      resetKey: '',
      resetConfirmKey: ''
    })
    sinon.stub(ResetForm.computed, 'resetToken').returns('token')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetForm
      }
    }).$mount()

    vm.$children[0].validate.passwordRequired.should.be.false
    vm.$children[0].validate.confirmMatch.should.be.true
    vm.$children[0].validate.tokenRequired.should.be.true
    vm.$children[0].isValid.should.be.false

    ResetForm.computed.user.restore()
    ResetForm.computed.resetToken.restore()
    done()
  })

  it('should validate user.resetConfirmKey as matching user.resetKey', (done) => {
    sinon.stub(ResetForm.computed, 'user').returns({
      resetKey: 'newKey',
      resetConfirmKey: 'keyNew'
    })
    sinon.stub(ResetForm.computed, 'resetToken').returns('token')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetForm
      }
    }).$mount()

    vm.$children[0].validate.passwordRequired.should.be.true
    vm.$children[0].validate.confirmMatch.should.be.false
    vm.$children[0].validate.tokenRequired.should.be.true
    vm.$children[0].isValid.should.be.false

    ResetForm.computed.user.restore()
    ResetForm.computed.resetToken.restore()
    done()
  })

  it('should validate resetToken as required', (done) => {
    sinon.stub(ResetForm.computed, 'user').returns({
      resetKey: 'newKey',
      resetConfirmKey: 'newKey'
    })
    sinon.stub(ResetForm.computed, 'resetToken').returns('')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetForm
      }
    }).$mount()

    vm.$children[0].validate.passwordRequired.should.be.true
    vm.$children[0].validate.confirmMatch.should.be.true
    vm.$children[0].validate.tokenRequired.should.be.false
    vm.$children[0].isValid.should.be.false

    ResetForm.computed.user.restore()
    ResetForm.computed.resetToken.restore()
    done()
  })

  it('isValid if validate is all true', (done) => {
    sinon.stub(ResetForm.computed, 'user').returns({
      resetKey: 'newKey',
      resetConfirmKey: 'newKey'
    })
    sinon.stub(ResetForm.computed, 'resetToken').returns('token')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ResetForm
      }
    }).$mount()

    vm.$children[0].validate.passwordRequired.should.be.true
    vm.$children[0].validate.confirmMatch.should.be.true
    vm.$children[0].validate.tokenRequired.should.be.true
    vm.$children[0].isValid.should.be.true

    ResetForm.computed.user.restore()
    ResetForm.computed.resetToken.restore()
    done()
  })
})
