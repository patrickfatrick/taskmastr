/* global it describe */
import { assert } from 'chai'
import Tasks from '../../../src/components/tasks/Tasks.vue'
import mountVm from '../../mount-vm'

describe('TasksVue', function () {
  it('should inherit the user property from the state', () => {
    const vm = mountVm(Tasks)
    assert.isObject(vm.user)
  })

  it('should inherit the current property from the state', () => {
    const vm = mountVm(Tasks)
    assert.isObject(vm.current)
  })

  it('should inherit the invalidList property from the state', () => {
    const vm = mountVm(Tasks)
    assert.isFalse(vm.invalidList)
  })

  it('should inherit a mountList method from the state', () => {
    const vm = mountVm(Tasks)
    assert.isFunction(vm.mountList)
  })

  it('should have a refresh method', () => {
    const vm = mountVm(Tasks)
    assert.isFunction(vm.refresh)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm(Tasks)

    assert.strictEqual(vm.$el.getAttribute('id'), 'content')
    assert.isNull(vm.$el.querySelector('#warning-banner'))
    assert.isNotNull(vm.$el.querySelector('#icon-menu'))
    assert.isNotNull(vm.$el.querySelector('#todo-line'))
    assert.isNotNull(vm.$el.querySelector('#task-list'))
    assert.isNull(vm.$el.querySelector('#no-list'))
    assert.isNull(vm.$el.querySelector('#invalid-list'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm(Tasks, { user: { key: 'password' }, invalidList: 'Error!' })

    assert.strictEqual(vm.$el.getAttribute('id'), 'content')
    assert.isNull(vm.$el.querySelector('#warning-banner'))
    assert.isNotNull(vm.$el.querySelector('#icon-menu'))
    assert.isNotNull(vm.$el.querySelector('#todo-line'))
    assert.isNotNull(vm.$el.querySelector('#task-list'))
    assert.isNotNull(vm.$el.querySelector('#no-list'))
    assert.isNotNull(vm.$el.querySelector('#invalid-list'))
  })

  it('should respond to changes in the state (try-it account)', () => {
    const vm = mountVm(Tasks, { user: { username: 'mrormrstestperson@taskmastr.co' } })

    assert.strictEqual(vm.$el.getAttribute('id'), 'content')
    assert.isNotNull(vm.$el.querySelector('#warning-banner'))
    assert.isNotNull(vm.$el.querySelector('#icon-menu'))
    assert.isNotNull(vm.$el.querySelector('#todo-line'))
    assert.isNotNull(vm.$el.querySelector('#task-list'))
    assert.isNull(vm.$el.querySelector('#no-list'))
    assert.isNull(vm.$el.querySelector('#invalid-list'))
  })

  it('should respond to changes in the state (socket disconnect)', () => {
    const vm = mountVm(Tasks, { disconnect: true })

    assert.strictEqual(vm.$el.getAttribute('id'), 'content')
    assert.isNotNull(vm.$el.querySelector('#warning-banner'))
    assert.isNotNull(vm.$el.querySelector('#icon-menu'))
    assert.isNotNull(vm.$el.querySelector('#todo-line'))
    assert.isNotNull(vm.$el.querySelector('#task-list'))
    assert.isNull(vm.$el.querySelector('#no-list'))
    assert.isNull(vm.$el.querySelector('#invalid-list'))
  })
})
