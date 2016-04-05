/* global it describe */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import RememberMe from '../../../../public/components/forms/form-components/RememberMe.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

describe('RememberMe.vue', function () {
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
        'test': RememberMe
      }
    }).$mount()
  }

  it('should inherit the rememberMe property from the state', () => {
    assert.isFalse(RememberMe.vuex.getters.rememberMe({ rememberMe: false }))
  })

  it('should have a setRememberMe method', () => {
    assert.isFunction(RememberMe.vuex.actions.setRememberMe)
  })

  it('should render with initial state', () => {
    const vm = mountVm()

    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-square-o'))
    assert.isFalse(vm.$el.querySelector('.fa').classList.contains('fa-check-square-o'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm({ rememberMe: true })

    assert.isTrue(vm.$children[0].rememberMe)
    assert.isFalse(vm.$el.querySelector('.fa').classList.contains('fa-square-o'))
    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-check-square-o'))
  })
})
