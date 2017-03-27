/* global it describe beforeEach afterEach */
import { assert } from 'chai'
import Lists from '../../../../src/components/menu/menu-components/Lists.vue'
import mountVm from '../../../mount-vm'

describe('ListsVue', function () {
  let lists

  beforeEach(() => {
    lists = [
      {
        id: 'listid',
        list: 'List 1',
        current: false,
        _deleting: true,
        items: [
          {
            id: 'itemid',
            item: 'Item 1'
          }
        ],
        owner: 'username',
        users: []
      },
      {
        id: 'listid2',
        list: 'List 2',
        current: true,
        _deleting: false,
        items: [
          {
            id: 'itemid2',
            item: 'Item 2'
          }
        ],
        owner: 'username',
        users: []
      }
    ]
  })

  afterEach(() => {
    lists = []
  })

  it('should inherit the lists property from the state', () => {
    const vm = mountVm(Lists, { user: { tasks: lists } })
    assert.isArray(vm.lists)
  })

  it('should have a dragStart property', () => {
    const vm = mountVm(Lists, { user: { tasks: lists } })
    assert.isNull(vm.dragStart)
  })

  it('should inherit a sortLists action from the store', () => {
    const vm = mountVm(Lists, { user: { tasks: lists } })
    assert.isFunction(vm.sortLists)
  })

  it('should have a sortFunction method', () => {
    const vm = mountVm(Lists, { user: { tasks: lists } })
    assert.isFunction(vm.sortFunction)
  })

  it('should have a _drag method', () => {
    const vm = mountVm(Lists, { user: { tasks: lists } })
    assert.isFunction(vm._drag)
  })

  it('should have a _drop method', () => {
    const vm = mountVm(Lists, { user: { tasks: lists } })
    assert.isFunction(vm._drop)
  })

  it('should have a _index method', () => {
    const vm = mountVm(Lists, { user: { tasks: lists } })
    assert.isFunction(vm._index)
  })

  it('should have a _restrict method', () => {
    const vm = mountVm(Lists, { user: { tasks: lists } })
    assert.isFunction(vm._restrict)
  })

  it('should render with initial state', () => {
    lists = []
    const vm = mountVm(Lists, { user: { tasks: lists } })

    assert.lengthOf(vm.$el.querySelector('.table__table-body').children, 0)
  })

  it('should render rows with lists', () => {
    const vm = mountVm(Lists, { user: { tasks: lists } })

    assert.lengthOf(vm.$el.querySelector('.table__table-body').children, 2)
  })
})
