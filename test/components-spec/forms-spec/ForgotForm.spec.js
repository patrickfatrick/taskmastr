/* global it describe sinon */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import ForgotForm from '../../../public/components/forms/ForgotForm.vue'
import state from '../../../public/store/state'
import mutations from '../../../public/store/mutations'

describe('ForgotForm.vue', function () {
  // mock vue-router
  ForgotForm.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      },
      path: '/forgot',
      name: 'Forgot'
    }
  }

  function mountVm (changes) {
    return new Vue({
      store: new Vuex.Store({
        state: {
          ...state,
          ...changes
        },
        mutations
      }),
      template: '<div><test></test></div>',
      components: {
        'test': ForgotForm
      }
    }).$mount()
  }

  it('should inherit the user property from the state', () => {
    assert.isObject(ForgotForm.vuex.getters.user({ user: {} }))
  })

  it('should have a validate property', () => {
    assert.isFunction(ForgotForm.computed.validate)
  })

  it('should have an isValid property', () => {
    assert.isFunction(ForgotForm.computed.isValid)
  })

  it('should inherit the forgotPassword action from the store', () => {
    assert.isFunction(ForgotForm.vuex.actions.forgotPassword)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm()

    assert.isNotNull(vm.$el.querySelector('#forgot-form'))
    assert.isNotNull(vm.$el.querySelector('#user-line'))
    assert.isNotNull(vm.$el.querySelector('#forgot-password'))
  })

  it('should call forgotPassword if isValid', () => {
    sinon.stub(ForgotForm.computed, 'validate').returns({
      usernameEmail: true,
      usernameRequired: true
    })
    sinon.stub(ForgotForm.computed, 'isValid').returns(true)

    const vm = mountVm()

    sinon.stub(vm.$children[0], 'forgotPassword')

    vm.$children[0].forgot('username@domain.com')
    assert.isTrue(vm.$children[0].forgotPassword.calledWith('username@domain.com'))

    ForgotForm.computed.validate.restore()
    ForgotForm.computed.isValid.restore()
    vm.$children[0].forgotPassword.restore()
  })

  it('should not call forgotPassword if !isValid', () => {
    sinon.stub(ForgotForm.computed, 'validate').returns({
      usernameEmail: false,
      usernameRequired: true
    })
    sinon.stub(ForgotForm.computed, 'isValid').returns(false)

    const vm = mountVm()

    sinon.stub(vm.$children[0], 'forgotPassword')

    vm.$children[0].forgot('username@domain.com')
    assert.isFalse(vm.$children[0].forgotPassword.calledOnce)

    ForgotForm.computed.validate.restore()
    ForgotForm.computed.isValid.restore()
    vm.$children[0].forgotPassword.restore()
  })

  it('should validate user.username as required', () => {
    const vm = mountVm({ user: { username: '' } })

    assert.isFalse(vm.$children[0].validate.usernameRequired)
    assert.isFalse(vm.$children[0].validate.usernameEmail)
    assert.isFalse(vm.$children[0].isValid)
  })

  it('should validate user.username as an email address', () => {
    const vm = mountVm({ user: { username: 'username' } })

    assert.isTrue(vm.$children[0].validate.usernameRequired)
    assert.isFalse(vm.$children[0].validate.usernameEmail)
  })

  it('isValid should return true if validate is all true', () => {
    const vm = mountVm({ user: { username: 'username@domain.com' } })

    assert.isTrue(vm.$children[0].validate.usernameRequired)
    assert.isTrue(vm.$children[0].validate.usernameEmail)
    assert.isTrue(vm.$children[0].isValid)
  })
})
