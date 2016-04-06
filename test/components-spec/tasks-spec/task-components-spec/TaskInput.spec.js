/* global it sinon describe beforeEach afterEach */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import TaskInput from '../../../../public/components/tasks/task-components/TaskInput.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

describe('TaskInput.vue', function () {
  let clock

  function mountVm (changes) {
    return new Vue({
      store: new Vuex.Store({
        state: {
          ...state,
          ...changes
        },
        mutations
      }),
      template: '<div><test></test></div>',
      components: {
        'test': TaskInput
      }
    }).$mount()
  }

  beforeEach(() => {
    const start = 'Jan 1, 2016 00:00:000 UTC'
    clock = sinon.useFakeTimers(Date.parse(start))
  })

  afterEach(() => {
    clock.restore()
  })

  it('should inherit the newTask property from the state', () => {
    assert.deepEqual(TaskInput.vuex.getters.newTask({ newTask: '' }), '')
  })

  it('should inherit the taskAttempt property from the state', () => {
    assert.isFalse(TaskInput.vuex.getters.taskAttempt({ taskAttempt: false }))
  })

  it('should inherit the user property from the state', () => {
    assert.isObject(TaskInput.vuex.getters.user({ user: {} }))
  })

  it('should have a validate property', () => {
    assert.isFunction(TaskInput.computed.validate)
  })

  it('should have an isValid property', () => {
    assert.isFunction(TaskInput.computed.isValid)
  })

  it('should inherit a setNewTask action from the store', () => {
    assert.isFunction(TaskInput.vuex.actions.setNewTask)
  })

  it('should inherit a setPlaceholder action from the store', () => {
    assert.isFunction(TaskInput.vuex.actions.setPlaceholder)
  })

  it('should inherit a setTaskAttempt action from the store', () => {
    assert.isFunction(TaskInput.vuex.actions.setTaskAttempt)
  })

  it('should have an addTask method', () => {
    assert.isFunction(TaskInput.methods.addTask)
  })

  it('should render with initial state', () => {
    const vm = mountVm({})

    assert.isFalse(vm.$el.querySelector('#create-todo').classList.contains('invalid'))
  })

  it('should respond to changes in the state', () => {
    sinon.stub(TaskInput.computed, 'isValid').returns(false)

    const vm = mountVm({ taskAttempt: true })

    assert.isTrue(vm.$el.querySelector('#create-todo').classList.contains('invalid'))

    TaskInput.computed.isValid.restore()
  })

  it('should call addTask and setPlaceholder on form submit', () => {
    sinon.stub(TaskInput.computed, 'isValid').returns(true)
    const vm = mountVm({ taskAttempt: true, newTask: 'New task' })

    sinon.stub(vm.$children[0], 'addTask')
    sinon.stub(vm.$children[0], 'setPlaceholder')

    vm.$el.querySelector('#task-button').click()
    assert.isTrue(vm.$children[0].addTask.calledOnce)
    assert.isTrue(vm.$children[0].setPlaceholder.calledOnce)

    vm.$children[0].addTask.restore()
    vm.$children[0].setPlaceholder.restore()
    TaskInput.computed.isValid.restore()
  })

  it('should call addTask with a dueDate shortcut on form submit', () => {
    sinon.stub(TaskInput.computed, 'isValid').returns(true)
    const vm = mountVm({ taskAttempt: true, newTask: 'Remind me to new task tomorrow' })

    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    assert.deepEqual(vm.$children[0].addTask.args[0][0].item, 'New task')
    assert.deepEqual(vm.$children[0].addTask.args[0][0].dueDate, '2016-01-01T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
  })

  it('should call addTask with a shorter dueDate shortcut on form submit', () => {
    sinon.stub(TaskInput.computed, 'isValid').returns(true)

    const vm = mountVm({ taskAttempt: true, newTask: '/r new task tomorrow' })

    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    assert.deepEqual(vm.$children[0].addTask.args[0][0].item, 'New task')
    assert.deepEqual(vm.$children[0].addTask.args[0][0].dueDate, '2016-01-01T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
  })

  it('should call addTask with a dueDate shortcut for tomorrow on form submit', () => {
    sinon.stub(TaskInput.computed, 'isValid').returns(true)

    const vm = mountVm({ taskAttempt: true, newTask: '/t new task' })

    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    assert.deepEqual(vm.$children[0].addTask.args[0][0].item, 'New task')
    assert.deepEqual(vm.$children[0].addTask.args[0][0].dueDate, '2016-01-01T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
  })

  it('should call addTask with a dueDate shortcut for next week on form submit', () => {
    sinon.stub(TaskInput.computed, 'isValid').returns(true)
    sinon.stub(TaskInput.vuex.getters, 'taskAttempt').returns(true)
    sinon.stub(TaskInput.vuex.getters, 'newTask').returns('/w new task')

    const vm = mountVm({ taskAttempt: true, newTask: '/w new task' })

    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    assert.deepEqual(vm.$children[0].addTask.args[0][0].item, 'New task')
    assert.deepEqual(vm.$children[0].addTask.args[0][0].dueDate, '2016-01-04T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
    TaskInput.vuex.getters.taskAttempt.restore()
    TaskInput.vuex.getters.newTask.restore()
  })

  it('should call addTask with a dueDate shortcut for next month on form submit', () => {
    clock.tick(86400000)
    sinon.stub(TaskInput.computed, 'isValid').returns(true)

    const vm = mountVm({ taskAttempt: true, newTask: '/m new task' })

    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    assert.deepEqual(vm.$children[0].addTask.args[0][0].item, 'New task')
    assert.deepEqual(vm.$children[0].addTask.args[0][0].dueDate, '2016-02-01T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
  })

  it('should call addTask with a dueDate shortcut for next year on form submit', () => {
    clock.tick(86400000)
    sinon.stub(TaskInput.computed, 'isValid').returns(true)

    const vm = mountVm({ taskAttempt: true, newTask: '/y new task' })

    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    assert.deepEqual(vm.$children[0].addTask.args[0][0].item, 'New task')
    assert.deepEqual(vm.$children[0].addTask.args[0][0].dueDate, '2017-01-01T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
  })

  it('should do nothing if !isValid', () => {
    sinon.stub(TaskInput.computed, 'isValid').returns(false)

    const vm = mountVm({ taskAttempt: true, newTask: '' })

    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    assert.isFalse(vm.$children[0].addTask.calledOnce)

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
  })
})
