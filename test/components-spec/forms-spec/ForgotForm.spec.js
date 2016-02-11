/* global it describe assert sinon */
import chai from 'chai'
import Vue from 'vue'
import ForgotForm from '../../../public/components/forms/ForgotForm.vue'

chai.should()
describe('ForgotForm.vue', function () {
  // mock vue-router
  ForgotForm.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      },
      path: '/forgot'
    }
  }

  it('should inherit the user property from the state', () => {
    ForgotForm.computed.user().should.be.an.instanceof(Object)
  })

  it('should have a validate property', () => {
    ForgotForm.computed.validate.should.be.an.instanceof(Function)
  })

  it('should have an isValid property', () => {
    ForgotForm.computed.isValid.should.be.an.instanceof(Function)
  })

  it('should inherit the forgotPassword method from the store', () => {
    ForgotForm.methods.forgotPassword.should.be.an.instanceof(Function)
  })

  it('should render with initial state and component tree', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotForm
      }
    }).$mount()

    assert.isNotNull(vm.$el.querySelector('#forgot-form'))
    assert.isNotNull(vm.$el.querySelector('#user-line'))
    assert.isNotNull(vm.$el.querySelector('#forgot-password'))
  })

  it('should call forgotPassword if isValid', (done) => {
    sinon.stub(ForgotForm.computed, 'validate').returns({
      usernameEmail: true,
      usernameRequired: true
    })
    sinon.stub(ForgotForm.computed, 'isValid').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotForm
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'forgotPassword')

    vm.$children[0].forgot('username@domain.com')
    vm.$children[0].forgotPassword.calledWith('username@domain.com').should.be.true

    ForgotForm.computed.validate.restore()
    ForgotForm.computed.isValid.restore()
    vm.$children[0].forgotPassword.restore()
    done()
  })

  it('should not call forgotPassword if !isValid', (done) => {
    sinon.stub(ForgotForm.computed, 'validate').returns({
      usernameEmail: false,
      usernameRequired: true
    })
    sinon.stub(ForgotForm.computed, 'isValid').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotForm
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'forgotPassword')

    vm.$children[0].forgot('username@domain.com')
    vm.$children[0].forgotPassword.calledOnce.should.be.false

    ForgotForm.computed.validate.restore()
    ForgotForm.computed.isValid.restore()
    vm.$children[0].forgotPassword.restore()
    done()
  })

  it('should validate user.username as required', (done) => {
    sinon.stub(ForgotForm.computed, 'user').returns({
      username: ''
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotForm
      }
    }).$mount()

    vm.$children[0].validate.usernameRequired.should.be.false
    vm.$children[0].validate.usernameEmail.should.be.false
    vm.$children[0].isValid.should.be.false

    ForgotForm.computed.user.restore()
    done()
  })

  it('should validate user.username as an email address', (done) => {
    sinon.stub(ForgotForm.computed, 'user').returns({
      username: 'username'
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotForm
      }
    }).$mount()

    vm.$children[0].validate.usernameRequired.should.be.true
    vm.$children[0].validate.usernameEmail.should.be.false

    ForgotForm.computed.user.restore()
    done()
  })

  it('isValid should return true if validate is all true', (done) => {
    sinon.stub(ForgotForm.computed, 'user').returns({
      username: 'username@domain.com'
    })
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ForgotForm
      }
    }).$mount()

    vm.$children[0].validate.usernameRequired.should.be.true
    vm.$children[0].validate.usernameEmail.should.be.true
    vm.$children[0].isValid.should.be.true

    ForgotForm.computed.user.restore()
    done()
  })
})
