/* global it describe sinon beforeEach afterEach*/
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import Mousetrap from 'mousetrap'
import Items from '../../../../public/components/tasks/task-components/Items.vue'
import store from '../../../../public/store'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

describe('Items.vue', function () {
  let items

  function mountVm () {
    return new Vue({
      store: new Vuex.Store({
        state: {
          ...state,
          current: {
            ...state.current,
            items: items
          }
        },
        mutations
      }),
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
  }

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
    assert.isNull(Items.data().dragStart)
  })

  it('should inherit the tasks property from the state', () => {
    assert.isArray(Items.vuex.getters.tasks({ current: { items: [] } }))
  })

  it('should inherit a deleteTask action from the store', () => {
    assert.isFunction(Items.vuex.actions.deleteTask)
  })

  it('should inherit a setCurrentTask action from the store', () => {
    assert.isFunction(Items.vuex.actions.setCurrentTask)
  })

  it('should inherit a sortTasks action from the store', () => {
    assert.isFunction(Items.vuex.actions.sortTasks)
  })

  it('should inherit a toggleDetails action from the store', () => {
    assert.isFunction(Items.vuex.actions.toggleDetails)
  })

  it('should have a _drag method', () => {
    assert.isFunction(Items.methods._drag)
  })

  it('should have a _drop method', () => {
    assert.isFunction(Items.methods._drop)
  })

  it('should have a _index method', () => {
    assert.isFunction(Items.methods._index)
  })

  it('should render with initial state', () => {
    const vm = new Vue({
      store,
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()

    vm.$el.querySelector('.table-body').children.should.have.length(0)
  })

  it('should render rows with tasks', () => {
    const vm = mountVm()

    assert.lengthOf(vm.$el.querySelector('.table-body').children, 2)
    assert.deepEqual(vm.$el.querySelector('.table-body').children[0].getAttribute('name'), 'task1')
    assert.deepEqual(vm.$el.querySelector('.table-body').children[1].getAttribute('name'), 'task2')
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

    const vm = mountVm()

    assert.isTrue(vm.$el.querySelector('.table-body').children[0].classList.contains('deleting'))
    assert.isTrue(vm.$el.querySelector('.table-body').children[1].classList.contains('active'))
    assert.isTrue(vm.$el.querySelectorAll('.details-button > i')[0].classList.contains('fa-pencil-square-o'))
    assert.isTrue(vm.$el.querySelectorAll('.details-button > i')[1].classList.contains('fa-exclamation-triangle'))
    assert.isTrue(vm.$el.querySelectorAll('.details-button > i')[2].classList.contains('fa-pencil-square-o'))
  })

  it('should call setCurrentTask method on click', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'setCurrentTask')

    vm.$el.querySelectorAll('.name')[0].click()
    assert.isTrue(vm.$children[0].setCurrentTask.calledWith(0))

    vm.$children[0].setCurrentTask.restore()
  })

  it('should call toggleDetails on dblclick', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'toggleDetails')

    let dblclick
    dblclick = document.createEvent('HTMLEvents')
    dblclick.initEvent('dblclick', true, true, window)
    vm.$el.querySelectorAll('.name')[0].dispatchEvent(dblclick)

    assert.isTrue(vm.$children[0].toggleDetails.calledWith(0))

    vm.$children[0].toggleDetails.restore()
  })

  it('should call toggleDetails method on click', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'toggleDetails')

    vm.$el.querySelectorAll('.details-button')[0].click()
    assert.isTrue(vm.$children[0].toggleDetails.calledWith(0, true))

    vm.$children[0].toggleDetails.restore()
  })

  it('should call completeTask on click', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'completeTask')

    vm.$el.querySelectorAll('.complete')[0].click()
    assert.isTrue(vm.$children[0].completeTask.calledWith(0, true))

    vm.$children[0].completeTask.restore()
  })

  it('should call setCurrentTask on ctrl+,', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'setCurrentTask')

    Mousetrap.trigger('ctrl+,')
    assert.isTrue(vm.$children[0].setCurrentTask.calledWith(0))

    vm.$children[0].setCurrentTask.restore()
  })

  it('should call setCurrentTask on ctrl+.', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'setCurrentTask')

    Mousetrap.trigger('ctrl+.')
    assert.isTrue(vm.$children[0].setCurrentTask.calledWith(0))

    vm.$children[0].setCurrentTask.restore()
  })

  it('should call deleteTask on ctrl+backspace', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'deleteTask')

    Mousetrap.trigger('ctrl+backspace')
    assert.isTrue(vm.$children[0].deleteTask.calledWith(1))

    vm.$children[0].deleteTask.restore()
  })

  it('should call sortTasks on ctrl+command+up', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+up')
    assert.isTrue(vm.$children[0].sortTasks.calledWith(1, 0))

    vm.$children[0].sortTasks.restore()
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

    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+up')
    assert.isFalse(vm.$children[0].sortTasks.calledOnce)

    vm.$children[0].sortTasks.restore()
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

    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+down')
    assert.isTrue(vm.$children[0].sortTasks.calledWith(0, 1))

    vm.$children[0].sortTasks.restore()
  })

  it('should not call sortTasks on ctrl+command+down if last task', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+down')
    assert.isFalse(vm.$children[0].sortTasks.calledOnce)

    vm.$children[0].sortTasks.restore()
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

    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+down')
    assert.isFalse(vm.$children[0].sortTasks.calledOnce)

    vm.$children[0].sortTasks.restore()
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

    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+up')
    assert.isFalse(vm.$children[0].sortTasks.calledOnce)

    vm.$children[0].sortTasks.restore()
  })
})
