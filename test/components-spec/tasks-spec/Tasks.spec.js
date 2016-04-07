/* global it describe */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import Tasks from '../../../public/components/tasks/Tasks.vue'
import state from '../../../public/store/state'
import mutations from '../../../public/store/mutations'

describe('Tasks.vue', function () {
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
        'test': Tasks
      }
    }).$mount()
  }

  it('should inherit the user property from the state', () => {
    assert.isObject(Tasks.vuex.getters.user({ user: {} }))
  })

  it('should inherit the current property from the state', () => {
    assert.isObject(Tasks.vuex.getters.current({ current: {} }))
  })

  it('should inherit the invalidList property from the state', () => {
    assert.isFalse(Tasks.vuex.getters.invalidList({ invalidList: false }))
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm()

    assert.isNull(vm.$el.querySelector('#test-user-banner'))
    assert.isNotNull(vm.$el.querySelector('#content'))
    assert.isNotNull(vm.$el.querySelector('#icon-menu'))
    assert.isNotNull(vm.$el.querySelector('#todo-line'))
    assert.isNotNull(vm.$el.querySelector('#task-list'))
    assert.isNull(vm.$el.querySelector('#no-list'))
    assert.isNull(vm.$el.querySelector('#invalid-list'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm({ user: { key: 'password' }, invalidList: 'Error!' })

    assert.isNull(vm.$el.querySelector('#test-user-banner'))
    assert.isNotNull(vm.$el.querySelector('#content'))
    assert.isNotNull(vm.$el.querySelector('#icon-menu'))
    assert.isNotNull(vm.$el.querySelector('#todo-line'))
    assert.isNotNull(vm.$el.querySelector('#task-list'))
    assert.isNotNull(vm.$el.querySelector('#no-list'))
    assert.isNotNull(vm.$el.querySelector('#invalid-list'))
  })

  it('should respond to changes in the state (try-it account)', () => {
    const vm = mountVm({ user: { username: 'mrormrstestperson@taskmastr.co' } })

    assert.isNotNull(vm.$el.querySelector('#test-user-banner'))
    assert.isNotNull(vm.$el.querySelector('#content'))
    assert.isNotNull(vm.$el.querySelector('#icon-menu'))
    assert.isNotNull(vm.$el.querySelector('#todo-line'))
    assert.isNotNull(vm.$el.querySelector('#task-list'))
    assert.isNull(vm.$el.querySelector('#no-list'))
    assert.isNull(vm.$el.querySelector('#invalid-list'))
  })
})
