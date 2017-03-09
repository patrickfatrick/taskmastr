/* global it describe beforeEach afterEach */
import { assert } from 'chai'
import Items from '../../../../src/components/tasks/task-components/Items.vue'
import mountVm from '../../../mount-vm'

describe('ItemsVue', function () {
  let items

  beforeEach(() => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: false,
        complete: false,
        _deleting: true,
        _dueDateDifference: 1,
        _detailsToggled: false
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: true,
        complete: false,
        _deleting: false,
        _dueDateDifference: -1,
        _detailsToggled: false
      }
    ]
  })

  afterEach(() => {
    items = []
  })

  it('should have a dragStart property', () => {
    const vm = mountVm(Items)
    assert.isNull(vm.dragStart)
  })

  it('should inherit the allTasks property from the getters', () => {
    const vm = mountVm(Items)
    assert.isArray(vm.allTasks)
  })

  it('should inherit the activeTasks property from the getters', () => {
    const vm = mountVm(Items)
    assert.isArray(vm.activeTasks)
  })

  it('should inherit the completeTasks property from the getters', () => {
    const vm = mountVm(Items)
    assert.isArray(vm.completeTasks)
  })

  it('should inherit a deleteAllCompleteTasks method from the store', () => {
    const vm = mountVm(Items)
    assert.isFunction(vm.deleteAllCompleteTasks)
  })

  it('should have a sortFunction method', () => {
    const vm = mountVm(Items)
    assert.isFunction(vm._drag)
  })

  it('should have a setDeleteTimeout method', () => {
    const vm = mountVm(Items)
    assert.isFunction(vm._drag)
  })

  it('should have a _drag method', () => {
    const vm = mountVm(Items)
    assert.isFunction(vm._drag)
  })

  it('should have a _drop method', () => {
    const vm = mountVm(Items)
    assert.isFunction(vm._drop)
  })

  it('should have a _index method', () => {
    const vm = mountVm(Items)
    assert.isFunction(vm._index)
  })

  it('should have a _restrict method', () => {
    const vm = mountVm(Items)
    assert.isFunction(vm._restrict)
  })

  it('should render with initial state', () => {
    items = []
    const vm = mountVm(Items, { current: { items } })

    assert.lengthOf(vm.$el.querySelector('.table-body').children, 0)
  })

  it('should render rows with tasks', () => {
    const vm = mountVm(Items, { current: { items } })

    assert.lengthOf(vm.$el.querySelector('.table-body').children, 2)
  })
})
