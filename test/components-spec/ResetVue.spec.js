/* global it describe */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import ResetVue from '../../public/components/ResetVue.vue'
import state from '../../public/store/state'
import mutations from '../../public/store/mutations'

describe('ResetVue.vue', function () {
  // mock vue-router
  ResetVue.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      },
      path: '/reset',
      name: 'Reset',
      query: {
        token: 'token'
      }
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
        'test': ResetVue
      }
    }).$mount()
  }

  // beforeEach(() => {
  //   sinon.stub(ResetVue.vuex.actions, 'setReset')
  //   sinon.stub(ResetVue.vuex.actions, 'setResetToken')
  // })

  // afterEach(() => {
  //   ResetVue.vuex.actions.setReset.restore()
  //   ResetVue.vuex.actions.setResetToken.restore()
  // })

  it('should inherit the auth property from the state', () => {
    assert.isFalse(ResetVue.vuex.getters.auth({ auth: false }))
  })

  it('should inherit the user property from the state', () => {
    assert.isObject(ResetVue.vuex.getters.user({ user: {} }))
  })

  it('should inherit the init property from the state', () => {
    assert.isFalse(ResetVue.vuex.getters.init({ init: false }))
  })

  it('should inherit the setReset method from the store', () => {
    assert.isFunction(ResetVue.vuex.actions.setReset)
  })

  it('should inherit the setResetToken method from the store', () => {
    assert.isFunction(ResetVue.vuex.actions.setResetToken)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm({ init: true })

    assert.isNotNull(vm.$el.querySelector('.mask'))
    assert.isNotNull(vm.$el.querySelector('#key-modal'))
    assert.isNotNull(vm.$el.querySelector('#reset-form'))
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

  // it('should call setReset if path === "/reset"', () => {
  //   sinon.stub(ResetVue.vuex.actions, 'setReset')

  //   mountVm()

  //   assert.isTrue(ResetVue.vuex.actions.setReset.calledWith(true))
  //   ResetVue.vuex.actions.setReset.restore()
  // })

  // it('should not call setReset if path !== "/reset"', () => {
  //   sinon.stub(ResetVue.vuex.actions, 'setReset')
  //   sinon.stub(ResetVue.computed, '$route').returns({
  //     router: {
  //       go (location) {
  //         return location
  //       }
  //     },
  //     path: '/login',
  //     name: 'Login',
  //     query: {
  //       token: 'token'
  //     }
  //   })

  //   mountVm()

  //   assert.isFalse(ResetVue.vuex.actions.setReset.calledOnce)

  //   ResetVue.vuex.actions.setReset.restore()
  //   ResetVue.computed.$route.restore()
  // })

  // it('should call setResetToken if token', () => {
  //   const vm = mountVm()
  //   sinon.stub(vm.$children[0], 'setResetToken')
  //   vm.$mount()
  //   assert.isTrue(vm.$children[0].setResetToken.calledWith('token'))

  //   vm.$children[0].setResetToken.restore()
  // })

  // it('should not call setResetToken if !token', () => {
  //   sinon.stub(ResetVue.vuex.actions, 'setResetToken')
  //   sinon.stub(ResetVue.computed, '$route').returns({
  //     router: {
  //       go (location) {
  //         return location
  //       }
  //     },
  //     path: '/reset',
  //     query: {
  //       token: ''
  //     }
  //   })

  //   mountVm()

  //   assert.isFalse(ResetVue.methods.setResetToken.calledOnce)

  //   ResetVue.vuex.actions.setResetToken.restore()
  //   ResetVue.computed.$route.restore()
  // })
})
