/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import DatepickerInjector from 'inject?../../../store/item-store/item-actions!../../../../public/components/tasks/task-components/Datepicker.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

const Datepicker = DatepickerInjector({
  '../../../store/item-store/item-actions': {
    setTaskDueDate (index, date) {
      return date
    },
    setDueDateDifference (index, n) {
      return n
    }
  }
})

describe('Datepicker.vue', function () {
  let clock
  let items
  let task
  let index

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
      template: '<div><test :task="task" :index="index"></test></div>',
      data: {
        task,
        index
      },
      components: {
        'test': Datepicker
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
        _dueDateDifference: 1,
        _detailsToggled: false
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: false,
        complete: false,
        dueDate: null,
        _delete: false,
        _dueDateDifference: -1,
        _detailsToggled: false
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: null,
      _delete: true,
      _dueDateDifference: 1,
      _detailsToggled: false
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
    assert.isArray(Datepicker.vuex.getters.tasks({ current: { items: [] } }))
  })

  it('should inherit a setDueDateDifference action from the store', () => {
    assert.isFunction(Datepicker.vuex.actions.setDueDateDifference)
  })

  it('should inherit a setTaskDueDate action from the store', () => {
    assert.isFunction(Datepicker.vuex.actions.setTaskDueDate)
  })

  it('should have a reformatDate method', () => {
    assert.isFunction(Datepicker.methods.reformatDate)
  })

  it('should have a setDueDate method', () => {
    assert.isFunction(Datepicker.methods.setDueDate)
  })

  it('should render with initial state', () => {
    const vm = mountVm()

    assert.isFalse(vm.$el.querySelector('.datepicker-toggle').classList.contains('active'))
    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-calendar-plus-o'))
    assert.isFalse(vm.$el.querySelector('.fa').classList.contains('fa-calendar-check-o'))
    assert.isNull(vm.$el.querySelector('.remove-due-date'))
  })

  it('should respond to changes in state', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2016-01-02T13:00:00.000Z',
        _delete: true,
        _dueDateDifference: 1,
        _detailsToggled: false
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: '2016-01-02T13:00:00.000Z',
      _delete: true,
      _dueDateDifference: 1,
      _detailsToggled: false
    }

    const vm = mountVm()

    assert.isTrue(vm.$el.querySelector('.datepicker-toggle').classList.contains('active'))
    assert.isFalse(vm.$el.querySelector('.fa').classList.contains('fa-calendar-plus-o'))
    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-calendar-check-o'))
    assert.isNotNull(vm.$el.querySelector('.remove-due-date'))
  })

  it('should call setDueDate on reformatDate', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'setDueDate')

    vm.$children[0].reformatDate(0, new Date())
    assert.isTrue(vm.$children[0].setDueDate.calledWith(0, '2016-01-01T00:00:00.000Z'))

    vm.$children[0].setDueDate.restore()
  })

  it('should call setTaskDueDate and on setDueDate', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2016-01-02T13:00:00.000Z',
        _delete: true,
        _dueDateDifference: 1,
        _detailsToggled: false
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: '2016-01-02T13:00:00.000Z',
      _delete: true,
      _dueDateDifference: 1,
      _detailsToggled: false
    }

    const vm = mountVm()

    sinon.stub(vm.$children[0], 'setTaskDueDate')

    vm.$children[0].setDueDate(0, '2016-01-01T00:00:00.000Z')
    assert.isTrue(vm.$children[0].setTaskDueDate.calledWith(0, '2016-01-01T00:00:00.000Z'))

    vm.$children[0].setTaskDueDate.restore()
  })

  it('should handle setting a null date', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'setTaskDueDate')
    sinon.stub(vm.$children[0].picker, 'setDate')
    sinon.stub(vm.$children[0], 'setDueDateDifference')

    vm.$children[0].setDueDate(0, null)
    assert.isTrue(vm.$children[0].setTaskDueDate.calledWith(0, null))
    assert.isTrue(vm.$children[0].picker.setDate.calledWith(''))
    assert.isTrue(vm.$children[0].setDueDateDifference.calledWith(0, null))

    vm.$children[0].setTaskDueDate.restore()
    vm.$children[0].picker.setDate.restore()
    vm.$children[0].setDueDateDifference.restore()
  })

  it('should call setDueDate on .remove-due-date click', () => {
    items = [
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2016-01-02T13:00:00.000Z',
        _delete: true,
        _dueDateDifference: 1,
        _detailsToggled: false
      }
    ]

    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: '2016-01-02T13:00:00.000Z',
      _delete: true,
      _dueDateDifference: 1,
      _detailsToggled: false
    }

    const vm = mountVm()

    sinon.stub(vm.$children[0], 'setDueDate')

    vm.$el.querySelector('.remove-due-date-button').click()
    assert.isTrue(vm.$children[0].setDueDate.calledWith(0, ''))

    vm.$children[0].setDueDate.restore()
  })
})
