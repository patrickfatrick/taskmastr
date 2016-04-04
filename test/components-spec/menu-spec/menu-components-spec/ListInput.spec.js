/* global it describe sinon */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import ListInput from '../../../../public/components/menu/menu-components/ListInput.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

describe('ListInput.vue', function () {
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
        'test': ListInput
      }
    }).$mount()
  }

  it('should inherit the newList property from the state', () => {
    assert.deepEqual(ListInput.vuex.getters.newList({ newList: '' }), '')
  })

  it('should inherit the listAttempt property from the state', () => {
    assert.isFalse(ListInput.vuex.getters.listAttempt({ listAttempt: false }))
  })

  it('should inherit the user property from the state', () => {
    assert.isObject(ListInput.vuex.getters.user({ user: {} }))
  })

  it('should have a validate property', () => {
    assert.isFunction(ListInput.computed.validate)
  })

  it('should have an isValid property', () => {
    assert.isFunction(ListInput.computed.isValid)
  })

  it('should inherit a setNewList action from the store', () => {
    assert.isFunction(ListInput.vuex.actions.setNewList)
  })

  it('should inherit a setListAttempt action from the store', () => {
    assert.isFunction(ListInput.vuex.actions.setListAttempt)
  })

  it('should have an addList method', () => {
    assert.isFunction(ListInput.methods.addList)
  })

  it('should render with initial state', () => {
    const vm = mountVm()

    assert.isFalse(vm.$el.querySelector('#create-list').classList.contains('invalid'))
  })

  it('should respond to changes in the state', () => {
    sinon.stub(ListInput.computed, 'isValid').returns(false)
    const vm = mountVm({ listAttempt: true })

    assert.isTrue(vm.$el.querySelector('#create-list').classList.contains('invalid'))

    ListInput.computed.isValid.restore()
  })

  it('should call addList on form submit', () => {
    sinon.stub(ListInput.computed, 'isValid').returns(true)
    const vm = mountVm({ listAttempt: true, newList: 'New list' })
    sinon.stub(vm.$children[0], 'addList')

    vm.$el.querySelector('#list-button').click()
    assert.isTrue(vm.$children[0].addList.calledOnce)

    vm.$children[0].addList.restore()
    ListInput.computed.isValid.restore()
  })

  it('should do nothing if !isValid', () => {
    sinon.stub(ListInput.computed, 'isValid').returns(false)
    const vm = mountVm({ listAttempt: true, newList: '' })
    sinon.stub(vm.$children[0], 'addList')

    vm.$el.querySelector('#list-button').click()
    assert.isFalse(vm.$children[0].addList.calledOnce)

    vm.$children[0].addList.restore()
    ListInput.computed.isValid.restore()
  })
})
