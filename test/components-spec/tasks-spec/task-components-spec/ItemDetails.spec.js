/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import Mousetrap from 'mousetrap'
import ItemDetailsInjector from 'inject?../../../store/item-store/item-actions!../../../../public/components/tasks/task-components/ItemDetails.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

const ItemDetails = ItemDetailsInjector({
  '../../../store/item-store/item-actions': {
    setTaskNotes (index, str) {
      return str
    },
    toggleDetails (index) {
      return index
    },
    setDueDateDifference (index, n) {
      return n
    },
    renameTask (index, str) {
      return str
    }
  }
})

describe('ItemDetails.vue', function () {
  let clock
  let items
  let task
  let index

  function mountVm (changes) {
    return new Vue({
      store: new Vuex.Store({
        state: {
          ...state,
          ...changes,
          current: {
            ...state.current,
            items: items
          }
        },
        mutations
      }),
      template: '<div><test :task="task" :index="index"></test></div>',
      data: {
        task,
        index
      },
      components: {
        test: ItemDetails
      }
    }).$mount()
  }

  beforeEach(() => {
    const start = 'Jan 1, 2016 00:00:000 UTC'
    clock = sinon.useFakeTimers(Date.parse(start))

    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: null,
        _delete: true,
        _dueDateDifference: 1
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: false,
        complete: false,
        dueDate: null,
        _delete: false,
        _dueDateDifference: -1
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: null,
      _delete: true,
      _dueDateDifference: 1
    }

    index = 0
  })

  afterEach(() => {
    clock.restore()
    items = []
    task = null
    index = null
  })

  it('should inherit the tasks property from the state', () => {
    assert.isArray(ItemDetails.vuex.getters.tasks({ current: { items: [] } }))
  })

  it('should inherit the detailsToggled property from the state', () => {
    assert.isFalse(ItemDetails.vuex.getters.detailsToggled({ detailsToggled: false }))
  })

  it('should inherit a setTaskNotes action from the store', () => {
    assert.isFunction(ItemDetails.vuex.actions.setTaskNotes)
  })

  it('should inherit a toggleDetails action from the store', () => {
    assert.isFunction(ItemDetails.vuex.actions.toggleDetails)
  })

  it('should inherit a setDueDateDifference action from the store', () => {
    assert.isFunction(ItemDetails.vuex.actions.setDueDateDifference)
  })

  it('should inherit a renameTask action from the store', () => {
    assert.isFunction(ItemDetails.vuex.actions.renameTask)
  })

  it('should have a rename method', () => {
    assert.isFunction(ItemDetails.methods.rename)
  })

  it('should have a reformatDate method', () => {
    assert.isFunction(ItemDetails.methods.reformatDate)
  })

  it('should render with initial state', () => {
    const vm = mountVm()

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('.task-details'))
  })

  it('should reformat date on reformatDate', () => {
    const vm = mountVm({ detailsToggled: 0 })

    assert.deepEqual(vm.$children[0].reformatDate('2016-01-01T00:00:00.000Z'), 'Dec 31, 2015')
  })

  it('should call renameTask on .task-name change', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: null,
        _delete: true,
        _dueDateDifference: 1
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: false,
        complete: false,
        dueDate: null,
        _delete: false,
        _dueDateDifference: -1
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: null,
      _delete: true,
      _dueDateDifference: 1
    }

    const vm = mountVm({ detailsToggled: 0 })

    sinon.stub(vm.$children[0], 'renameTask')

    let change
    change = document.createEvent('HTMLEvents')
    change.initEvent('change', true, true, window)
    vm.$el.querySelectorAll('.task-name')[0].value = 'Task 11'
    vm.$el.querySelectorAll('.task-name')[0].dispatchEvent(change)

    assert.isTrue(vm.$children[0].renameTask.calledWith(0, 'Task 11'))

    vm.$children[0].renameTask.restore()
  })

  it('should not call renameTask if null', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: null,
        _delete: true,
        _dueDateDifference: 1
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: false,
        complete: false,
        dueDate: null,
        _delete: false,
        _dueDateDifference: -1
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: null,
      _delete: true,
      _dueDateDifference: 1
    }

    const vm = mountVm({ detailsToggled: 0 })

    sinon.stub(vm.$children[0], 'renameTask')

    let change
    change = document.createEvent('HTMLEvents')
    change.initEvent('change', true, true, window)
    vm.$el.querySelectorAll('.task-name')[0].value = ''
    vm.$el.querySelectorAll('.task-name')[0].dispatchEvent(change)

    assert.isFalse(vm.$children[0].renameTask.calledOnce)

    vm.$children[0].renameTask.restore()
  })

  it('should not display dates or due date differences if !task.dueDate', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: null,
        _delete: false,
        _dueDateDifference: null
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: null,
      _delete: true,
      _dueDateDifference: null
    }

    const vm = mountVm({ detailsToggled: 0 })

    assert.isTrue(vm.$el.querySelector('.task-due').children[0].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.task-due').children[1].classList.contains('hidden'))
  })

  it('should not display dates or due date differences if task.dateCompleted', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: true,
        dueDate: null,
        dateCompleted: 'date',
        _delete: false,
        _dueDateDifference: null
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: true,
      dueDate: null,
      dateCompleted: 'date',
      _delete: true,
      _dueDateDifference: null
    }
    const vm = mountVm({ detailsToggled: 0 })

    assert.isFalse(vm.$el.querySelector('.task-details-container').children[0].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.task-details-container').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.task-details-container').children[2].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.task-details-container').children[3].classList.contains('hidden'))
  })

  it('should display dates and due date differences if !task.dateCompleted', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2016-01-02T13:00:00.000Z',
        dateCompleted: null,
        _delete: false,
        _dueDateDifference: null
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: '2016-01-02T13:00:00.000Z',
      dateCompleted: null,
      _delete: true,
      _dueDateDifference: null
    }

    const vm = mountVm({ detailsToggled: 0 })

    assert.isFalse(vm.$el.querySelector('.task-details-container').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.task-details-container').children[1].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.task-details-container').children[2].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.task-details-container').children[3].classList.contains('hidden'))
  })

  it('should display dates if due date is tomorrow', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2016-01-02T13:00:00.000Z',
        _delete: false,
        _dueDateDifference: 1
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: '2016-01-02T13:00:00.000Z',
      _delete: true,
      _dueDateDifference: 1
    }

    const vm = mountVm({ detailsToggled: 0 })

    assert.isFalse(vm.$el.querySelector('.task-due').children[0].classList.contains('hidden'))
    assert.include(vm.$el.querySelector('.task-due').textContent, 'Jan 2, 2016')
    assert.isTrue(vm.$el.querySelector('.task-due').children[1].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.due-in').classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.due-in').children[0].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.due-in').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.overdue').classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.due-today').classList.contains('hidden'))
  })

  it('should display dates if due date is more than one day in the future', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2016-01-03T13:00:00.000Z',
        _delete: false,
        _dueDateDifference: 2
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: '2016-01-03T13:00:00.000Z',
      _delete: true,
      _dueDateDifference: 2
    }

    const vm = mountVm({ detailsToggled: 0 })

    assert.isFalse(vm.$el.querySelector('.task-due').children[0].classList.contains('hidden'))
    assert.include(vm.$el.querySelector('.task-due').textContent, 'Jan 3, 2016')
    assert.isTrue(vm.$el.querySelector('.task-due').children[1].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.due-in').classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.due-in').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.due-in').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.overdue').classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.due-today').classList.contains('hidden'))
  })

  it('should display dates if due date was yesterday', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2015-12-31T13:00:00.000Z',
        _delete: false,
        _dueDateDifference: -1
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: '2015-12-31T13:00:00.000Z',
      _delete: true,
      _dueDateDifference: -1
    }

    const vm = mountVm({ detailsToggled: 0 })

    assert.isFalse(vm.$el.querySelector('.task-due').children[0].classList.contains('hidden'))
    assert.include(vm.$el.querySelector('.task-due').textContent, 'Dec 31, 2015')
    assert.isTrue(vm.$el.querySelector('.task-due').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.due-in').classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.overdue').classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.overdue').children[0].classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.overdue').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.due-today').classList.contains('hidden'))
  })

  it('should display dates if due date was more than one day in the past', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2015-12-30T13:00:00.000Z',
        _delete: false,
        _dueDateDifference: -2
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: '2015-12-30T13:00:00.000Z',
      _delete: true,
      _dueDateDifference: -2
    }

    const vm = mountVm({ detailsToggled: 0 })

    assert.isFalse(vm.$el.querySelector('.task-due').children[0].classList.contains('hidden'))
    assert.include(vm.$el.querySelector('.task-due').textContent, 'Dec 30, 2015')
    assert.isTrue(vm.$el.querySelector('.task-due').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.due-in').classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.overdue').classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.overdue').children[0].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.overdue').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.due-today').classList.contains('hidden'))
  })

  it('should display dates if due date is today', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2016-01-01T13:00:00.000Z',
        _delete: false,
        _dueDateDifference: 0
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: '2016-01-01T13:00:00.000Z',
      _delete: true,
      _dueDateDifference: 0
    }

    const vm = mountVm({ detailsToggled: 0 })

    assert.isFalse(vm.$el.querySelector('.task-due').children[0].classList.contains('hidden'))
    assert.include(vm.$el.querySelector('.task-due').textContent, 'Jan 1, 2016')
    assert.isTrue(vm.$el.querySelector('.task-due').children[1].classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.due-in').classList.contains('hidden'))
    assert.isTrue(vm.$el.querySelector('.overdue').classList.contains('hidden'))
    assert.isFalse(vm.$el.querySelector('.due-today').classList.contains('hidden'))
  })

  it('should not call renameTask if null', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: null,
        _delete: true,
        _dueDateDifference: 1
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: false,
        complete: false,
        dueDate: null,
        _delete: false,
        _dueDateDifference: -1
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: null,
      _delete: true,
      _dueDateDifference: 1
    }

    const vm = mountVm({ detailsToggled: 0 })

    sinon.stub(vm.$children[0], 'renameTask')

    let change
    change = document.createEvent('HTMLEvents')
    change.initEvent('change', true, true, window)
    vm.$el.querySelectorAll('.task-name')[0].value = ''
    vm.$el.querySelectorAll('.task-name')[0].dispatchEvent(change)

    assert.isFalse(vm.$children[0].renameTask.calledOnce)

    vm.$children[0].renameTask.restore()
  })

  it('should call toggleDetails on ctrl+d', () => {
    const vm = mountVm({ detailsToggled: 0 })

    sinon.stub(vm.$children[0], 'toggleDetails')

    Mousetrap.trigger('ctrl+d')
    assert.isTrue(vm.$children[0].toggleDetails.calledWith(0))

    vm.$children[0].toggleDetails.restore()
  })
})
