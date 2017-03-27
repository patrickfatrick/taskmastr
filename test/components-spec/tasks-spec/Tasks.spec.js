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

  it('should render with initial state and component tree', () => {
    const vm = mountVm(Tasks)

    assert.isNotNull(vm.$el.querySelector('.icon-menu'))
    assert.isNotNull(vm.$el.querySelector('.prompt-line--item-line'))
    assert.isNotNull(vm.$el.querySelector('.table--item-list'))
    assert.isNull(vm.$el.querySelector('.no-list'))
    assert.isNull(vm.$el.querySelector('.no-list__invalid'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm(Tasks, { user: { key: 'password' }, invalidList: 'Error!' })

    assert.isNotNull(vm.$el.querySelector('.icon-menu'))
    assert.isNotNull(vm.$el.querySelector('.prompt-line--item-line'))
    assert.isNotNull(vm.$el.querySelector('.table--item-list'))
    assert.isNotNull(vm.$el.querySelector('.no-list'))
    assert.isNotNull(vm.$el.querySelector('.no-list__invalid'))
  })
})
