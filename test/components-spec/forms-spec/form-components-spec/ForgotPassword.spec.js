/* global it describe sinon */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import ForgotPassword from '../../../../public/components/forms/form-components/ForgotPassword.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

describe('ForgotPassword.vue', function () {
  // mock vue-router
  ForgotPassword.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
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
        'test': ForgotPassword
      }
    }).$mount()
  }

  it('should inherit the forgot property from the state', () => {
    assert.isFalse(ForgotPassword.vuex.getters.forgot({ forgot: false }))
  })

  it('should inherit the create property from the state', () => {
    assert.isFalse(ForgotPassword.vuex.getters.create({ create: false }))
  })

  it('should have a setForgot method', () => {
    assert.isFunction(ForgotPassword.vuex.actions.setForgot)
  })

  it('should render with initial state', () => {
    const vm = mountVm()
    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-square-o'))
    assert.isFalse(vm.$el.querySelector('.fa').classList.contains('fa-check-square-o'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm({ forgot: true })

    assert.isTrue(vm.$children[0].forgot)
    assert.isFalse(vm.$el.querySelector('.fa').classList.contains('fa-square-o'))
    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-check-square-o'))
  })

  it('should route to /forgot on forgot', () => {
    const vm = mountVm({ forgot: true })

    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.stub(vm.$children[0], 'setForgot')

    vm.$children[0].toggleForgot(true)
    assert.isTrue(vm.$children[0].setForgot.calledWith(true))
    assert.isTrue(vm.$children[0].$route.router.go.calledWith('/forgot'))

    vm.$children[0].$route.router.go.restore()
    vm.$children[0].setForgot.restore()
  })

  it('should route to /create on !forgot and create', () => {
    const vm = mountVm({
      forgot: false,
      create: true
    })

    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.stub(vm.$children[0], 'setForgot')

    vm.$children[0].toggleForgot(false)
    assert.isTrue(vm.$children[0].setForgot.calledWith(false))
    assert.isTrue(vm.$children[0].$route.router.go.calledWith('/create'))

    vm.$children[0].$route.router.go.restore()
    vm.$children[0].setForgot.restore()
  })

  it('should route to /login on !forgot and !create', () => {
    const vm = mountVm({
      forgot: false,
      create: false
    })

    sinon.stub(vm.$children[0].$route.router, 'go')
    sinon.stub(vm.$children[0], 'setForgot')

    vm.$children[0].toggleForgot(false)
    assert.isTrue(vm.$children[0].setForgot.calledWith(false))
    assert.isTrue(vm.$children[0].$route.router.go.calledWith('/login'))

    vm.$children[0].$route.router.go.restore()
    vm.$children[0].setForgot.restore()
  })
})
