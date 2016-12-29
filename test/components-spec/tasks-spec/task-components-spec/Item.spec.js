/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import Mousetrap from 'mousetrap'
import Item from '../../../../src/components/tasks/task-components/Item.vue'
import mountVm from '../../../mount-vm'
import { dblclick } from '../../../browser-events'

describe('ItemVue', function () {
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

  it('should inherit a deleteTask action from the store', () => {
    const vm = mountVm(Item, {}, { task: items[0] })
    assert.isFunction(vm.deleteTask)
  })

  it('should inherit a setCurrentTask action from the store', () => {
    const vm = mountVm(Item, {}, { task: items[0] })
    assert.isFunction(vm.setCurrentTask)
  })

  it('should inherit a sortTasks action from the store', () => {
    const vm = mountVm(Item, {}, { task: items[0] })
    assert.isFunction(vm.sortTasks)
  })

  it('should inherit a toggleDetails action from the store', () => {
    const vm = mountVm(Item, {}, { task: items[0] })
    assert.isFunction(vm.toggleDetails)
  })

  it('should respond to complete _deleting and current and _dueDateDifference properties', () => {
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
      },
      {
        id: 'itemid3',
        item: 'Item 3',
        current: true,
        complete: true,
        _deleting: false,
        _dueDateDifference: null,
        _detailsToggled: false
      }
    ]

    const vm1 = mountVm(Item, { current: { items } }, { task: items[0] })
    const vm2 = mountVm(Item, { current: { items } }, { task: items[1] })
    const vm3 = mountVm(Item, { current: { items } }, { task: items[2] })
    assert.isTrue(vm1.$el.classList.contains('deleting'))
    assert.isTrue(vm1.$el.querySelector('.details-button > i').classList.contains('fa-pencil-square'))
    assert.isTrue(vm2.$el.classList.contains('active'))
    assert.isTrue(vm2.$el.querySelector('.details-button > i').classList.contains('fa-exclamation-triangle'))
    assert.isTrue(vm3.$el.querySelector('.details-button > i').classList.contains('fa-pencil-square'))
  })

  it('should call setCurrentTask method on click', () => {
    const vm = mountVm(Item, { current: { items } }, { task: items[0] })
    sinon.stub(vm, 'setCurrentTask')

    vm.$el.querySelectorAll('.name')[0].click()
    assert.isTrue(vm.setCurrentTask.calledWith(0))

    vm.setCurrentTask.restore()
  })

  it('should call toggleDetails on dblclick', () => {
    const vm = mountVm(Item, { current: { items } }, { task: items[0] })
    sinon.stub(vm, 'toggleDetails')
    vm.$el.querySelector('.name').dispatchEvent(dblclick())

    assert.isTrue(vm.toggleDetails.calledWith(0))
    vm.toggleDetails.restore()
  })

  it('should call toggleDetails method on click', () => {
    const vm = mountVm(Item, { current: { items } }, { task: items[0] })
    sinon.stub(vm, 'toggleDetails')

    vm.$el.querySelectorAll('.details-button')[0].click()
    assert.isTrue(vm.toggleDetails.calledWith(0, true))

    vm.toggleDetails.restore()
  })

  it('should call completeTask on click', () => {
    const vm = mountVm(Item, { current: { items } }, { task: items[0] })
    sinon.stub(vm, 'completeTask')

    vm.$el.querySelector('.complete').click()
    assert.isTrue(vm.completeTask.calledWith({ index: 0, bool: true }))

    vm.completeTask.restore()
  })

  it('should call setCurrentTask on ctrl+,', () => {
    const vm = mountVm(Item, { current: { items } }, { task: items[0] })
    sinon.stub(vm, 'setCurrentTask')

    Mousetrap.trigger('ctrl+,')
    assert.isTrue(vm.setCurrentTask.calledWith(0))

    vm.setCurrentTask.restore()
  })

  it('should call setCurrentTask on ctrl+.', () => {
    const vm = mountVm(Item, { current: { items } }, { task: items[0] })
    sinon.stub(vm, 'setCurrentTask')

    Mousetrap.trigger('ctrl+.')
    assert.isTrue(vm.setCurrentTask.calledWith(0))

    vm.setCurrentTask.restore()
  })

  it('should call deleteTask on ctrl+backspace', () => {
    const vm = mountVm(Item, { current: { items } }, { task: items[0] })
    sinon.stub(vm, 'deleteTask')

    Mousetrap.trigger('ctrl+backspace')
    assert.isTrue(vm.deleteTask.calledWith(1))

    vm.deleteTask.restore()
  })

  it('should call sortTasks on ctrl+command+up', () => {
    const vm = mountVm(Item, { current: { items } }, { task: items[0] })
    sinon.stub(vm, 'sortTasks')

    Mousetrap.trigger('ctrl+command+up')
    assert.isTrue(vm.sortTasks.calledWith({ oldIndex: 1, newIndex: 0 }))

    vm.sortTasks.restore()
  })

  it('should not call sortTasks on ctrl+command+up if first task', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        _deleting: true
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: false,
        _deleting: false
      }
    ]

    const vm = mountVm(Item, { current: { items } }, { task: items[0] })
    sinon.stub(vm, 'sortTasks')

    Mousetrap.trigger('ctrl+command+up')
    assert.isFalse(vm.sortTasks.calledOnce)

    vm.sortTasks.restore()
  })

  it('should call sortTasks on ctrl+command+down', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        _deleting: true
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: false,
        _deleting: false
      }
    ]

    const vm = mountVm(Item, { current: { items } }, { task: items[0] })
    sinon.stub(vm, 'sortTasks')

    Mousetrap.trigger('ctrl+command+down')
    assert.isTrue(vm.sortTasks.calledWith({ oldIndex: 0, newIndex: 1 }))

    vm.sortTasks.restore()
  })

  it('should not call sortTasks on ctrl+command+down if last task', () => {
    const vm = mountVm(Item, { current: { items } }, { task: items[0] })
    sinon.stub(vm, 'sortTasks')

    Mousetrap.trigger('ctrl+command+down')
    assert.isFalse(vm.sortTasks.calledOnce)

    vm.sortTasks.restore()
  })

  it('should handle moving non-complete to complete on sortTasks', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        _deleting: true,
        _dueDateDifference: 1
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: false,
        complete: true,
        _deleting: false,
        _dueDateDifference: -1
      }
    ]

    const vm = mountVm(Item, { current: { items } }, { task: items[0] })
    sinon.stub(vm, 'sortTasks')

    Mousetrap.trigger('ctrl+command+down')
    assert.isFalse(vm.sortTasks.calledOnce)

    vm.sortTasks.restore()
  })

  it('should handle moving complete to non-complete on sortTasks', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: false,
        complete: false,
        _deleting: true,
        _dueDateDifference: 1
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: true,
        complete: true,
        _deleting: false,
        _dueDateDifference: -1
      }
    ]

    const vm = mountVm(Item, { current: { items } }, { task: items[0] })
    sinon.stub(vm, 'sortTasks')

    Mousetrap.trigger('ctrl+command+up')
    assert.isFalse(vm.sortTasks.calledOnce)

    vm.sortTasks.restore()
  })
})
