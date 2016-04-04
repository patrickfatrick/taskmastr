/* global it describe sinon */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import Mousetrap from 'mousetrap'
import Darkmode from '../../../../public/components/menu/menu-components/Darkmode.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

describe('Darkmode.vue', function () {
  function mountVm (changes) {
    return new Vue({
      store: new Vuex.Store({
        state: {
          ...state,
          user: {
            ...state.user,
            ...changes
          }
        },
        mutations
      }),
      template: '<div><test></test></div>',
      components: {
        'test': Darkmode
      }
    }).$mount()
  }

  it('should inherit the darkmode property from the state', () => {
    assert.isFalse(Darkmode.vuex.getters.darkmode({ user: { darkmode: false } }))
  })

  it('should have a setDarkmode method', () => {
    assert.isFunction(Darkmode.vuex.actions.setDarkmode)
  })

  it('should render with initial state', () => {
    const vm = mountVm()

    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-moon-o'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm({ darkmode: true })

    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-sun-o'))
  })

  it('should call setDarkmode on button click', () => {
    const vm = mountVm()
    sinon.stub(vm.$children[0], 'setDarkmode')

    vm.$el.querySelector('#dark-mode').click()
    assert.isTrue(vm.$children[0].setDarkmode.calledWith(true))

    vm.$children[0].setDarkmode.restore()
  })

  it('should call setDarkmode on command+m', () => {
    const vm = mountVm()
    sinon.stub(vm.$children[0], 'setDarkmode')

    Mousetrap.trigger('command+m')
    assert.isTrue(vm.$children[0].setDarkmode.calledWith(true))

    vm.$children[0].setDarkmode.restore()
  })
})
