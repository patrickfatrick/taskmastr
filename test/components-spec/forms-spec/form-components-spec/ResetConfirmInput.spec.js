/* global it describe */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import ResetConfirmInput from '../../../../public/components/forms/form-components/ResetConfirmInput.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

describe('ResetConfirmInput.vue', function () {
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
        'test': ResetConfirmInput
      }
    }).$mount()
  }

  it('should inherit the user property from the state', () => {
    assert.isObject(ResetConfirmInput.vuex.getters.user({ user: {} }))
  })

  it('should inherit the resetAttempt property from the state', () => {
    assert.isFalse(ResetConfirmInput.vuex.getters.resetAttempt({ resetAttempt: false }))
  })

  it('should inherit the resetFail property from the state', () => {
    assert.isFalse(ResetConfirmInput.vuex.getters.resetFail({ resetFail: false }))
  })

  it('should render with initial state', () => {
    const vm = mountVm()

    assert.isFalse(vm.$el.querySelector('#reset-confirm').classList.contains('invalid'))
  })

  it('should respond to changes in the state', () => {
    ResetConfirmInput.computed.match = () => {
      return false
    }
    const vm = mountVm({ resetAttempt: true })

    assert.isTrue(vm.$el.querySelector('#reset-confirm').classList.contains('invalid'))

    delete ResetConfirmInput.computed.match
  })
})
