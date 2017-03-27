/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import Datepicker from '../../../../src/components/tasks/task-components/Datepicker.vue'
import mountVm from '../../../mount-vm'

describe('DatepickerVue', function () {
  let clock
  let items
  let task
  let index

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
    const vm = mountVm(Datepicker, { current: { items } }, { task, index })
    assert.isArray(vm.tasks)
  })

  it('should inherit a setDueDateDifference action from the store', () => {
    const vm = mountVm(Datepicker, { current: { items } }, { task, index })
    assert.isFunction(vm.setDueDateDifference)
  })

  it('should inherit a setTaskDueDate action from the store', () => {
    const vm = mountVm(Datepicker, { current: { items } }, { task, index })
    assert.isFunction(vm.setTaskDueDate)
  })

  it('should have a reformatDate method', () => {
    const vm = mountVm(Datepicker, { current: { items } }, { task, index })
    assert.isFunction(vm.reformatDate)
  })

  it('should have a setDueDate method', () => {
    const vm = mountVm(Datepicker, { current: { items } }, { task, index })
    assert.isFunction(vm.setDueDate)
  })

  it('should render with initial state', () => {
    const vm = mountVm(Datepicker, { current: { items } }, { task, index })

    assert.isFalse(vm.$el.querySelector('.datepicker__toggle').classList.contains('active'))
    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-calendar-plus-o'))
    assert.isFalse(vm.$el.querySelector('.fa').classList.contains('fa-calendar-check-o'))
    assert.isNull(vm.$el.querySelector('.datepicker__remove-due-date'))
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

    const vm = mountVm(Datepicker, { current: { items } }, { task, index })

    assert.isTrue(vm.$el.querySelector('.datepicker__toggle').classList.contains('active'))
    assert.isFalse(vm.$el.querySelector('.fa').classList.contains('fa-calendar-plus-o'))
    assert.isTrue(vm.$el.querySelector('.fa').classList.contains('fa-calendar-check-o'))
    assert.isNotNull(vm.$el.querySelector('.datepicker__remove-due-date'))
  })

  it('should call setDueDate on reformatDate', () => {
    const vm = mountVm(Datepicker, { current: { items } }, { task, index })
    sinon.stub(vm, 'setDueDate')

    vm.reformatDate(new Date())

    assert.isTrue(vm.setDueDate.calledWith(0, '2016-01-01T00:00:00.000Z'))
    vm.setDueDate.restore()
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

    const vm = mountVm(Datepicker, { current: { items } }, { task, index })
    sinon.stub(vm, 'setTaskDueDate')

    vm.setDueDate(0, '2016-01-01T00:00:00.000Z')

    assert.isTrue(vm.setTaskDueDate.calledWith({ index: 0, date: '2016-01-01T00:00:00.000Z' }))
    vm.setTaskDueDate.restore()
  })

  it('should handle setting a null date', () => {
    const vm = mountVm(Datepicker, { current: { items } }, { task, index })
    sinon.stub(vm, 'setTaskDueDate')
    sinon.stub(vm.picker, 'setDate')
    sinon.stub(vm, 'setDueDateDifference')

    vm.setDueDate(0, null)

    assert.isTrue(vm.setTaskDueDate.calledWith({ index: 0, date: null }))
    assert.isTrue(vm.picker.setDate.calledWith(''))
    assert.isTrue(vm.setDueDateDifference.calledWith({ index: 0, dueDate: null }))
    vm.setTaskDueDate.restore()
    vm.picker.setDate.restore()
    vm.setDueDateDifference.restore()
  })

  it('should call setDueDate on .datepicker__remove-due-date click', () => {
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

    const vm = mountVm(Datepicker, { current: { items } }, { task, index })
    sinon.stub(vm, 'setDueDate')

    vm.$el.querySelector('.datepicker__remove-due-date__button').click()

    assert.isTrue(vm.setDueDate.calledWith(0, ''))
    vm.setDueDate.restore()
  })
})
