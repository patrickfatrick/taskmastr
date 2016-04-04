/* global it describe */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import CreateVue from '../../public/components/CreateVue.vue'
import state from '../../public/store/state'
import mutations from '../../public/store/mutations'

describe('CreateVue.vue', function () {
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
        'test': CreateVue
      }
    }).$mount()
  }

  it('should inherit the auth property from the state', () => {
    assert.isFalse(CreateVue.vuex.getters.auth({ auth: false }))
  })

  it('should inherit the user property from the state', () => {
    assert.isObject(CreateVue.vuex.getters.user({ user: {} }))
  })

  it('should inherit the init property from the state', () => {
    assert.isFalse(CreateVue.vuex.getters.init({ init: false }))
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm({ init: true })

    assert.isNotNull(vm.$el.querySelector('.mask'))
    assert.isNotNull(vm.$el.querySelector('#key-modal'))
    assert.isNotNull(vm.$el.querySelector('#try-it-button'))
  })

  it('should respond to changes in the state (init)', () => {
    const vm = mountVm()

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))
  })

  it('should respond to changes in the state (auth and user.tasks)', () => {
    const vm = mountVm({
      init: true,
      auth: 'username@domain.com',
      user: {
        tasks: [
          {
            list: 'List 1'
          }
        ]
      }
    })

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))
  })
})
