/* global it describe sinon */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import KeyInput from '../../../../public/components/forms/form-components/KeyInput.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

describe('KeyInput.vue', function () {
  // mock vue-router
  KeyInput.computed.$route = () => {
    return {
      path: '/login'
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
        'test': KeyInput
      }
    }).$mount()
  }

  it('should inherit the keyInput property from the state', () => {
    assert.isObject(KeyInput.vuex.getters.user({ user: {} }))
  })

  it('should inherit the create property from the state', () => {
    assert.isFalse(KeyInput.vuex.getters.create({ create: false }))
  })

  it('should inherit the invalidKey property from the state', () => {
    assert.isFalse(KeyInput.vuex.getters.invalidKey({ invalidKey: false }))
  })

  it('should inherit the loginAttempt property from the state', () => {
    assert.isFalse(KeyInput.vuex.getters.loginAttempt({ loginAttempt: false }))
  })

  it('should inherit the setLoginAttempt action from the store', () => {
    assert.isFunction(KeyInput.vuex.actions.setLoginAttempt)
  })

  it('should render with initial state', () => {
    const vm = mountVm()

    assert.isFalse(vm.$el.querySelector('#key').classList.contains('invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))
  })

  it('should respond to changes in the state (loginAttempt, invalidKey)', () => {
    KeyInput.computed.require = () => {
      return true
    }
    const vm = mountVm({
      loginAttempt: true,
      invalidKey: 'Invalid password'
    })

    assert.isTrue(vm.$el.querySelector('#key').classList.contains('invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))

    delete KeyInput.computed.require
  })

  it('should respond to changes in the state (loginAttempt, require)', () => {
    KeyInput.computed.require = () => {
      return false
    }
    const vm = mountVm({
      loginAttempt: true
    })

    assert.isTrue(vm.$el.querySelector('#key').classList.contains('invalid'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))

    delete KeyInput.computed.require
  })

  it('should call setLoginAttempt on button push', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'setLoginAttempt')

    vm.$el.querySelector('#key-button').click()

    assert.isTrue(vm.$children[0].setLoginAttempt.calledWith(true))

    vm.$children[0].setLoginAttempt.restore()
  })

  it('key-button should not render on /create', () => {
    KeyInput.computed.$route = () => {
      return {
        path: '/create'
      }
    }

    const vm = mountVm()

    assert.isNull(vm.$el.querySelector('#key-button'))
  })
})
