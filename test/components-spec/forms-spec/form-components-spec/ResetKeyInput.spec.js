/* global it describe */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import ResetKeyInput from '../../../../public/components/forms/form-components/ResetKeyInput.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

describe('ResetKeyInput.vue', function () {
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
        'test': ResetKeyInput
      }
    }).$mount()
  }

  it('should inherit the user property from the state', () => {
    assert.isObject(ResetKeyInput.vuex.getters.user({ user: {} }))
  })

  it('should inherit the resetAttempt property from the state', () => {
    assert.isFalse(ResetKeyInput.vuex.getters.resetAttempt({ resetAttempt: false }))
  })

  it('should inherit the resetFail property from the state', () => {
    assert.isFalse(ResetKeyInput.vuex.getters.resetFail({ resetFail: false }))
  })

  it('should render with initial state', () => {
    ResetKeyInput.computed.token = () => {
      return 'token'
    }
    const vm = mountVm()

    assert.isFalse(vm.$el.querySelector('#reset-key').classList.contains('invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].classList.contains('hidden'))

    delete ResetKeyInput.computed.token
  })

  it('should respond to changes in the state (resetAttempt, resetFail)', () => {
    ResetKeyInput.computed.require = () => {
      return true
    }
    ResetKeyInput.computed.match = () => {
      return true
    }
    ResetKeyInput.computed.token = () => {
      return 'token'
    }
    const vm = mountVm({
      resetAttempt: true,
      resetFail: true
    })

    assert.isTrue(vm.$el.querySelector('#reset-key').classList.contains('invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[2].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].classList.contains('hidden'))

    delete ResetKeyInput.computed.require
    delete ResetKeyInput.computed.match
    delete ResetKeyInput.computed.token
  })

  it('should respond to changes in the state (resetAttempt, !require)', () => {
    ResetKeyInput.computed.require = () => {
      return false
    }
    ResetKeyInput.computed.match = () => {
      return true
    }
    ResetKeyInput.computed.token = () => {
      return 'token'
    }
    const vm = mountVm({ resetAttempt: true })

    assert.isTrue(vm.$el.querySelector('#reset-key').classList.contains('invalid'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].classList.contains('hidden'))

    delete ResetKeyInput.computed.require
    delete ResetKeyInput.computed.match
    delete ResetKeyInput.computed.token
  })

  it('should respond to changes in the state (resetAttempt, !match)', () => {
    ResetKeyInput.computed.require = () => {
      return true
    }
    ResetKeyInput.computed.match = () => {
      return false
    }
    ResetKeyInput.computed.token = () => {
      return 'token'
    }
    const vm = mountVm({ resetAttempt: true })

    assert.isFalse(vm.$el.querySelector('#reset-key').classList.contains('invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[3].classList.contains('hidden'))

    delete ResetKeyInput.computed.require
    delete ResetKeyInput.computed.match
    delete ResetKeyInput.computed.token
  })

  it('should respond to changes in the state (resetAttempt, token)', () => {
    ResetKeyInput.computed.require = () => {
      return true
    }
    ResetKeyInput.computed.match = () => {
      return true
    }
    ResetKeyInput.computed.token = () => {
      return false
    }
    const vm = mountVm({ resetAttempt: false })

    assert.isFalse(vm.$el.querySelector('#reset-key').classList.contains('invalid'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.error-text').children[2].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.error-text').children[3].classList.contains('hidden'))

    delete ResetKeyInput.computed.require
    delete ResetKeyInput.computed.match
    delete ResetKeyInput.computed.token
  })
})
