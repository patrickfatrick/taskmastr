/* global it describe */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import ForgotVue from '../../public/components/ForgotVue.vue'
import state from '../../public/store/state'
import mutations from '../../public/store/mutations'

describe('ForgotVue.vue', function () {
  // mock vue-router
  ForgotVue.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      },
      path: '/forgot'
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
        test: ForgotVue
      }
    }).$mount()
  }

  it('should inherit the auth property from the state', () => {
    assert.isFalse(ForgotVue.vuex.getters.auth({ auth: false }))
  })

  it('should inherit the user property from the state', () => {
    assert.isObject(ForgotVue.vuex.getters.user({ user: {} }))
  })

  it('should inherit the init property from the state', () => {
    assert.isFalse(ForgotVue.vuex.getters.init({ init: false }))
  })

  it('should inherit the reset property from the state', () => {
    assert.isFalse(ForgotVue.vuex.getters.reset({ reset: false }))
  })

  it('should inherit the forgot property from the state', () => {
    assert.isFalse(ForgotVue.vuex.getters.forgot({ forgot: false }))
  })

  it('should inherit the setForgot method from the store', () => {
    assert.isFunction(ForgotVue.vuex.actions.setForgot)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm({ forgot: true, init: true })

    assert.isNotNull(vm.$el.querySelector('.mask'))
    assert.isNotNull(vm.$el.querySelector('#key-modal'))
    assert.isNotNull(vm.$el.querySelector('#forgot-form'))
    assert.isNotNull(vm.$el.querySelector('#try-it-button'))
  })

  it('should respond to changes in the state (init)', () => {
    const vm = mountVm({ forgot: true, init: false })

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('#key-modal'))
  })

  it('should respond to changes in the state (auth and user.tasks)', () => {
    const vm = mountVm({
      forgot: true,
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

  // it('should call setForgot if !forgot', () => {
  //   sinon.stub(ForgotVue.vuex.actions, 'setForgot')
  //   const vm = mountVm({ forgot: false })

  //   assert.isTrue(vm.$children[0].setForgot.calledWith(true))

  //   ForgotVue.vuex.actions.setForgot.restore()
  // })
})
