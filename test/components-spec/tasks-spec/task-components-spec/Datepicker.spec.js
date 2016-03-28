/* global it describe sinon assert beforeEach afterEach */
import chai from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import Datepicker from '../../../../public/components/tasks/task-components/Datepicker.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

chai.should()
describe('Datepicker.vue', function () {
  let clock
  let items

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
    Datepicker.computed.task = () => {
      return {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: null,
        _delete: true,
        _dueDateDifference: 1,
        _detailsToggled: false
      }
    }
    Datepicker.computed.index = () => {
      return 0
    }
  })

  afterEach(() => {
    clock.restore()
    items = []
    delete Datepicker.computed.task
    delete Datepicker.computed.index
  })

  it('should inherit the tasks property from the state', () => {
    Datepicker.vuex.getters.tasks({ current: { items: [] } }).should.be.an.instanceof(Array)
  })

  it('should inherit a setDueDateDifference action from the store', () => {
    Datepicker.vuex.actions.setDueDateDifference.should.be.an.instanceof(Function)
  })

  it('should inherit a setSaveButton action from the store', () => {
    Datepicker.vuex.actions.setSaveButton.should.be.an.instanceof(Function)
  })

  it('should inherit a setTaskDueDate action from the store', () => {
    Datepicker.vuex.actions.setTaskDueDate.should.be.an.instanceof(Function)
  })

  it('should have a reformatDate method', () => {
    Datepicker.methods.reformatDate.should.be.an.instanceof(Function)
  })

  it('should have a setDueDate method', () => {
    Datepicker.methods.setDueDate.should.be.an.instanceof(Function)
  })

  it('should render with initial state', (done) => {
    const vm = new Vue({
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
        'test': Datepicker
      }
    }).$mount()

    vm.$el.querySelector('.datepicker-toggle').classList.contains('active').should.be.false
    vm.$el.querySelector('.fa').classList.contains('fa-calendar-plus-o').should.be.true
    vm.$el.querySelector('.fa').classList.contains('fa-calendar-check-o').should.be.false
    assert.isNull(vm.$el.querySelector('.remove-due-date'))

    done()
  })

  it('should respond to changes in state', (done) => {
    Datepicker.computed.task.restore()

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

    sinon.stub(Datepicker.computed, 'task').returns({
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: '2016-01-02T13:00:00.000Z',
      _delete: true,
      _dueDateDifference: 1,
      _detailsToggled: false
    })

    const vm = new Vue({
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
        'test': Datepicker
      }
    }).$mount()

    vm.$el.querySelector('.datepicker-toggle').classList.contains('active').should.be.true
    vm.$el.querySelector('.fa').classList.contains('fa-calendar-plus-o').should.be.false
    vm.$el.querySelector('.fa').classList.contains('fa-calendar-check-o').should.be.true
    assert.isNotNull(vm.$el.querySelector('.remove-due-date'))

    done()
  })

  it('should call setDueDate on reformatDate', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Datepicker
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'setDueDate')

    vm.$children[0].reformatDate(0, new Date())
    vm.$children[0].setDueDate.calledWith(0, '2016-01-01T00:00:00.000Z').should.be.true

    vm.$children[0].setDueDate.restore()
    done()
  })

  it('should call setTaskDueDate and not setSaveButton on setDueDate', (done) => {
    Datepicker.computed.task.restore()

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

    sinon.stub(Datepicker.computed, 'task').returns({
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: '2016-01-02T13:00:00.000Z',
      _delete: true,
      _dueDateDifference: 1,
      _detailsToggled: false
    })
    const vm = new Vue({
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
        'test': Datepicker
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'setTaskDueDate')
    sinon.stub(vm.$children[0], 'setSaveButton')

    vm.$children[0].setDueDate(0, '2016-01-01T00:00:00.000Z')
    vm.$children[0].setTaskDueDate.calledWith(0, '2016-01-01T00:00:00.000Z').should.be.true
    vm.$children[0].setSaveButton.calledWith(true).should.be.false

    vm.$children[0].setSaveButton.restore()
    vm.$children[0].setTaskDueDate.restore()
    done()
  })

  it('should handle setting a null date', (done) => {
    Datepicker.computed.picker = () => {
      return {
        setDate (date) {
          return date
        }
      }
    }

    const vm = new Vue({
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
        'test': Datepicker
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'setTaskDueDate')
    sinon.stub(vm.$children[0], 'setSaveButton')
    sinon.stub(vm.$children[0].picker, 'setDate')
    sinon.stub(vm.$children[0], 'setDueDateDifference')

    vm.$children[0].setDueDate(0, null)
    vm.$children[0].setTaskDueDate.calledWith(0, null).should.be.true
    vm.$children[0].setSaveButton.calledWith(true).should.be.true
    vm.$children[0].picker.setDate.calledWith('').should.be.true
    vm.$children[0].setDueDateDifference.calledWith(0, null).should.be.true

    vm.$children[0].setSaveButton.restore()
    vm.$children[0].setTaskDueDate.restore()
    vm.$children[0].picker.setDate.restore()
    vm.$children[0].setDueDateDifference.restore()
    delete Datepicker.computed.picker
    done()
  })

  it('should call setDueDate on .remove-due-date click', (done) => {
    Datepicker.computed.task.restore()

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

    sinon.stub(Datepicker.computed, 'task').returns({
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: '2016-01-02T13:00:00.000Z',
      _delete: true,
      _dueDateDifference: 1,
      _detailsToggled: false
    })
    const vm = new Vue({
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
        'test': Datepicker
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'setDueDate')

    vm.$el.querySelector('.remove-due-date-button').click()
    vm.$children[0].setDueDate.calledWith(0, '').should.be.true

    vm.$children[0].setDueDate.restore()
    done()
  })
})
