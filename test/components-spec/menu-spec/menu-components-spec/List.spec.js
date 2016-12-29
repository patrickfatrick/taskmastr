/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import Mousetrap from 'mousetrap'
import List from '../../../../src/components/menu/menu-components/List.vue'
import mountVm from '../../../mount-vm'
import { dblclick, change } from '../../../browser-events'

describe('ListVue', function () {
  let lists
  let index

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
    index = 0
  })

  afterEach(() => {
    lists = []
  })

  it('should inherit a listDetailsToggled property from the state', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    assert.isNull(vm.listDetailsToggled)
  })

  it('should inherit the current property from the state', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    assert.isObject(vm.current)
  })

  it('should inherit the lists property from the state', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    assert.isArray(vm.lists)
  })

  it('should inherit a deleteList action from the store', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    assert.isFunction(vm.deleteList)
  })

  it('should inherit a setCurrentList action from the store', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    assert.isFunction(vm.setCurrentList)
  })

  it('should inherit a sortLists action from the store', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    assert.isFunction(vm.sortLists)
  })

  it('should inherit a renameList action from the store', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    assert.isFunction(vm.renameList)
  })

  it('should inherit a unmountList action from the store', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    assert.isFunction(vm.unmountList)
  })

  it('should inherit a toggleListDetails action from the store', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    assert.isFunction(vm.toggleListDetails)
  })

  it('should have a removeList method', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    assert.isFunction(vm.removeList)
  })

  it('should have a rename method', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    assert.isFunction(vm.rename)
  })

  it('should have a toggleDetails method', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    assert.isFunction(vm.toggleDetails)
  })

  it('should have a navigateToList method', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    assert.isFunction(vm.navigateToList)
  })

  it('should respond to _deleting and current properties', () => {
    const vm1 = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    const vm2 = mountVm(List, { user: { tasks: lists }, current: lists[1] }, { list: lists[1], index: 1 })

    assert.isTrue(vm1.$el.classList.contains('deleting'))
    assert.isTrue(vm2.$el.classList.contains('current'))
  })

  it('should call navigateToList method on click', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    sinon.stub(vm, 'navigateToList')

    vm.$el.querySelector('.name').click()

    assert.isTrue(vm.navigateToList.calledWith('listid'))
    vm.navigateToList.restore()
  })

  it('should call toggleListDetails method on dblclick', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    sinon.stub(vm, 'toggleListDetails')

    vm.$el.querySelector('.task-cell').dispatchEvent(dblclick())

    assert.isTrue(vm.toggleListDetails.calledWith('listid'))
    vm.$nextTick(() => {
      assert.strictEqual(vm.listDetailsToggled, 'listid')
      assert.isTrue(vm.$el.querySelector('.name').classList.contains('hidden'))
    })

    vm.toggleListDetails.restore()
  })

  it('should reset toggleListDetails when called on current toggleListDetails index', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    sinon.stub(vm, 'toggleListDetails')

    vm.$el.querySelector('.task-cell').dispatchEvent(dblclick())

    assert.isTrue(vm.toggleListDetails.calledWith('listid'))

    vm.$el.querySelector('.name').dispatchEvent(dblclick())

    assert.isTrue(vm.toggleListDetails.calledWith('listid'))

    vm.$nextTick(() => {
      assert.isNull(vm.listDetailsToggled)
      assert.isFalse(vm.$el.querySelector('.name').classList.contains('hidden'))
    })

    vm.toggleListDetails.restore()
  })

  it('should call renameList on .rename change', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    sinon.stub(vm, 'renameList')

    vm.$el.querySelector('.rename').value = 'List 11'
    vm.$el.querySelector('.rename').dispatchEvent(change())

    assert.isTrue(vm.renameList.calledWith({ index: 0, name: 'List 11' }))
    vm.renameList.restore()
  })

  it('should not call renameList if null', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    sinon.stub(vm, 'renameList')

    vm.$el.querySelector('.rename').value = ''
    vm.$el.querySelector('.rename').dispatchEvent(change())

    assert.isFalse(vm.renameList.calledOnce)
    vm.renameList.restore()
  })

  it('should call removeList on trash can click', () => {
    const vm = mountVm(List, { placeholder: 'dont mind me none', user: { username: 'username' } }, { list: lists[1], index: 1 })
    sinon.stub(vm, 'removeList')

    vm.$el.querySelector('.delete-button').click()

    assert.isTrue(vm.removeList.calledWith(1))
    vm.removeList.restore()
  })

  it('should call deleteList and navigateToList on removeList', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    sinon.stub(vm, 'deleteList').yieldsTo('cb', 'listid')
    sinon.stub(vm, 'navigateToList')

    vm.removeList(1)

    assert.strictEqual(vm.deleteList.args[0][0].index, 1)
    assert.strictEqual(vm.deleteList.args[0][0].delay, 5000)
    assert.isTrue(vm.deleteList.args[0][0].perm)
    assert.isTrue(vm.navigateToList.calledWith('listid'))
    vm.deleteList.restore()
    vm.navigateToList.restore()
  })

  it('should call unmountList on navigateToList', () => {
    const vm = mountVm(List, { current: lists[1] }, { list: lists[1], index: 1 })
    sinon.stub(vm, 'unmountList')
    sinon.stub(vm.$router, 'push')

    vm.navigateToList('listid')

    assert.isTrue(vm.unmountList.calledOnce)
    assert.isTrue(vm.$router.push.calledWith('/app/list/listid'))
    vm.unmountList.restore()
    vm.$router.push.restore()
  })

  it('should not call unmountList on navigateToList if id === current.id', () => {
    const vm = mountVm(List, { current: lists[1] }, { list: lists[1], index: 1 })
    sinon.stub(vm, 'unmountList')
    sinon.stub(vm.$router, 'push')

    vm.navigateToList('listid2')

    assert.isFalse(vm.unmountList.calledOnce)
    assert.isTrue(vm.$router.push.calledWith('/app/list/listid2'))
    vm.unmountList.restore()
    vm.$router.push.restore()
  })

  it('should call navigateToList on alt+,', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    sinon.stub(vm, 'navigateToList')

    Mousetrap.trigger('alt+,')

    assert.isTrue(vm.navigateToList.calledWith('listid'))
    vm.navigateToList.restore()
  })

  it('should call navigateToList on alt+.', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    sinon.stub(vm, 'navigateToList')

    Mousetrap.trigger('alt+.')

    assert.isTrue(vm.navigateToList.calledWith('listid'))
    vm.navigateToList.restore()
  })

  it('should call removeList on alt+backspace', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    sinon.stub(vm, 'removeList')

    Mousetrap.trigger('alt+backspace')

    assert.isTrue(vm.removeList.calledWith(1))
    vm.removeList.restore()
  })

  it('should call sortLists on alt+command+up', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[1] }, { list: lists[1], index: 1 })
    sinon.stub(vm, 'sortLists')

    Mousetrap.trigger('alt+command+up')

    assert.isTrue(vm.sortLists.calledWith({ oldIndex: 1, newIndex: 0 }))
    vm.sortLists.restore()
  })

  it('should not call sortLists on alt+command+up if first list', () => {
    lists = [
      {
        id: 'listid',
        list: 'List 1',
        current: true,
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
        current: false,
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

    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    sinon.stub(vm, 'sortLists')

    Mousetrap.trigger('alt+command+up')

    assert.isFalse(vm.sortLists.calledOnce)
    vm.sortLists.restore()
  })

  it('should call sortLists on alt+command+down', () => {
    lists = [
      {
        id: 'listid',
        list: 'List 1',
        current: true,
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
        current: false,
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

    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    sinon.stub(vm, 'sortLists')

    Mousetrap.trigger('alt+command+down')

    assert.isTrue(vm.sortLists.calledWith({ oldIndex: 0, newIndex: 1 }))
    vm.sortLists.restore()
  })

  it('should not call sortLists on alt+command+down if last list', () => {
    const vm = mountVm(List, { user: { tasks: lists }, current: lists[0] }, { list: lists[0], index })
    sinon.stub(vm, 'sortLists')

    Mousetrap.trigger('alt+command+down')

    assert.isFalse(vm.sortLists.calledOnce)
    vm.sortLists.restore()
  })
})
