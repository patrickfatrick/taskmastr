/* global it sinon describe beforeEach afterEach */
import { assert } from 'chai'
import TaskInput from '../../../../src/components/tasks/task-components/TaskInput.vue'
import mountVm from '../../../mount-vm'
import { click } from '../../../browser-events'

describe('TaskInputVue', function () {
  let clock

  beforeEach(() => {
    const start = 'Jan 1, 2016 00:00:000 UTC'
    clock = sinon.useFakeTimers(Date.parse(start))
  })

  afterEach(() => {
    clock.restore()
  })

  it('should inherit the newTask property from the state', () => {
    const vm = mountVm(TaskInput)
    assert.strictEqual(vm.newTask, '')
  })

  it('should inherit the taskAttempt property from the state', () => {
    const vm = mountVm(TaskInput)
    assert.isFalse(vm.taskAttempt)
  })

  it('should inherit the user property from the state', () => {
    const vm = mountVm(TaskInput)
    assert.isObject(vm.user)
  })

  it('should have a validate property', () => {
    const vm = mountVm(TaskInput)
    assert.deepEqual(vm.validate, { newTaskRequired: false })
  })

  it('should have an isValid property', () => {
    const vm = mountVm(TaskInput)
    assert.isFalse(vm.isValid)
  })

  it('should inherit a setNewTask action from the store', () => {
    const vm = mountVm(TaskInput)
    assert.isFunction(vm.setNewTask)
  })

  it('should inherit a setPlaceholder action from the store', () => {
    const vm = mountVm(TaskInput)
    assert.isFunction(vm.setPlaceholder)
  })

  it('should inherit a setTaskAttempt action from the store', () => {
    const vm = mountVm(TaskInput)
    assert.isFunction(vm.setTaskAttempt)
  })

  it('should have an addTask method', () => {
    const vm = mountVm(TaskInput)
    assert.isFunction(vm.addTask)
  })

  it('should render with initial state', () => {
    const vm = mountVm(TaskInput)

    assert.isFalse(vm.$el.querySelector('#create-todo').classList.contains('invalid'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm(TaskInput, { taskAttempt: true })
    vm.isValid = false

    assert.isTrue(vm.$el.querySelector('#create-todo').classList.contains('invalid'))
  })

  it('should call addTask and setPlaceholder and setCurrentTask on form submit', () => {
    const vm = mountVm(TaskInput, { taskAttempt: true, newTask: 'New task' })
    vm.isValid = true
    sinon.stub(vm, 'addTask')
    sinon.stub(vm, 'setPlaceholder')
    sinon.stub(vm, 'setCurrentTask')
    sinon.stub(vm, 'setNewTask')

    vm.$el.querySelector('#task-button').dispatchEvent(click())
    assert.isTrue(vm.addTask.calledOnce)
    assert.isTrue(vm.setPlaceholder.calledOnce)
    assert.isTrue(vm.setCurrentTask.calledOnce)
    assert.isTrue(vm.setNewTask.calledOnce)

    vm.addTask.restore()
    vm.setPlaceholder.restore()
    vm.setCurrentTask.restore()
    vm.setNewTask.restore()
  })

  it('should not call setCurrentTask on form submit if currentItem exists', () => {
    const vm = mountVm(TaskInput, { taskAttempt: true, newTask: 'New task', current: { currentItem: 'itemid' } })
    vm.isValid = true
    sinon.stub(vm, 'addTask')
    sinon.stub(vm, 'setPlaceholder')
    sinon.stub(vm, 'setCurrentTask')
    sinon.stub(vm, 'setNewTask')

    vm.$el.querySelector('#task-button').dispatchEvent(click())
    assert.isTrue(vm.addTask.calledOnce)
    assert.isTrue(vm.setPlaceholder.calledOnce)
    assert.isFalse(vm.setCurrentTask.calledOnce)
    assert.isTrue(vm.setNewTask.calledOnce)

    vm.addTask.restore()
    vm.setPlaceholder.restore()
    vm.setCurrentTask.restore()
    vm.setNewTask.restore()
  })

  it('should call addTask with a dueDate shortcut on form submit', () => {
    const vm = mountVm(TaskInput, { taskAttempt: true, newTask: 'Remind me to new task tomorrow' })
    vm.isValid = true
    sinon.stub(vm, 'addTask')
    sinon.stub(vm, 'setPlaceholder')
    sinon.stub(vm, 'setCurrentTask')
    sinon.stub(vm, 'setNewTask')

    vm.$el.querySelector('#task-button').dispatchEvent(click())
    assert.strictEqual(vm.addTask.args[0][0].item, 'New task')
    assert.strictEqual(vm.addTask.args[0][0].dueDate, '2016-01-01T13:00:00.000Z')

    vm.addTask.restore()
    vm.setPlaceholder.restore()
    vm.setCurrentTask.restore()
    vm.setNewTask.restore()
  })

  it('should call addTask with a shorter dueDate shortcut on form submit', () => {
    const vm = mountVm(TaskInput, { taskAttempt: true, newTask: '/r new task tomorrow' })
    vm.isValid = true
    sinon.stub(vm, 'addTask')
    sinon.stub(vm, 'setPlaceholder')
    sinon.stub(vm, 'setCurrentTask')
    sinon.stub(vm, 'setNewTask')

    vm.$el.querySelector('#task-button').dispatchEvent(click())
    assert.strictEqual(vm.addTask.args[0][0].item, 'New task')
    assert.strictEqual(vm.addTask.args[0][0].dueDate, '2016-01-01T13:00:00.000Z')

    vm.addTask.restore()
    vm.setPlaceholder.restore()
    vm.setCurrentTask.restore()
    vm.setNewTask.restore()
  })

  it('should call addTask with a dueDate shortcut for tomorrow on form submit', () => {
    const vm = mountVm(TaskInput, { taskAttempt: true, newTask: '/t new task' })
    vm.isValid = true
    sinon.stub(vm, 'addTask')
    sinon.stub(vm, 'setPlaceholder')
    sinon.stub(vm, 'setCurrentTask')
    sinon.stub(vm, 'setNewTask')

    vm.$el.querySelector('#task-button').dispatchEvent(click())
    assert.strictEqual(vm.addTask.args[0][0].item, 'New task')
    assert.strictEqual(vm.addTask.args[0][0].dueDate, '2016-01-01T13:00:00.000Z')

    vm.addTask.restore()
    vm.setPlaceholder.restore()
    vm.setCurrentTask.restore()
    vm.setNewTask.restore()
  })

  it('should call addTask with a dueDate shortcut for next week on form submit', () => {
    const vm = mountVm(TaskInput, { taskAttempt: true, newTask: '/w new task' })
    vm.isValid = true
    vm.taskAttempt = true
    vm.newTask = '/w new task'
    sinon.stub(vm, 'addTask')
    sinon.stub(vm, 'setPlaceholder')
    sinon.stub(vm, 'setCurrentTask')
    sinon.stub(vm, 'setNewTask')

    vm.$el.querySelector('#task-button').dispatchEvent(click())
    assert.strictEqual(vm.addTask.args[0][0].item, 'New task')
    assert.strictEqual(vm.addTask.args[0][0].dueDate, '2016-01-04T13:00:00.000Z')

    vm.addTask.restore()
    vm.setPlaceholder.restore()
    vm.setCurrentTask.restore()
    vm.setNewTask.restore()
  })

  it('should call addTask with a dueDate shortcut for next month on form submit', () => {
    const vm = mountVm(TaskInput, { taskAttempt: true, newTask: '/m new task' })
    vm.isValid = true
    sinon.stub(vm, 'addTask')
    sinon.stub(vm, 'setPlaceholder')
    sinon.stub(vm, 'setCurrentTask')
    sinon.stub(vm, 'setNewTask')
    clock.tick(86400000)

    vm.$el.querySelector('#task-button').dispatchEvent(click())
    assert.strictEqual(vm.addTask.args[0][0].item, 'New task')
    assert.strictEqual(vm.addTask.args[0][0].dueDate, '2016-02-01T13:00:00.000Z')

    vm.addTask.restore()
    vm.setPlaceholder.restore()
    vm.setCurrentTask.restore()
    vm.setNewTask.restore()
  })

  it('should call addTask with a dueDate shortcut for next year on form submit', () => {
    const vm = mountVm(TaskInput, { taskAttempt: true, newTask: '/y new task' })
    vm.isValid = true
    sinon.stub(vm, 'addTask')
    sinon.stub(vm, 'setPlaceholder')
    sinon.stub(vm, 'setCurrentTask')
    sinon.stub(vm, 'setNewTask')
    clock.tick(86400000)

    vm.$el.querySelector('#task-button').dispatchEvent(click())
    assert.strictEqual(vm.addTask.args[0][0].item, 'New task')
    assert.strictEqual(vm.addTask.args[0][0].dueDate, '2017-01-01T13:00:00.000Z')

    vm.addTask.restore()
    vm.setPlaceholder.restore()
    vm.setCurrentTask.restore()
    vm.setNewTask.restore()
  })

  it('should do nothing if !isValid', () => {
    const vm = mountVm(TaskInput, { taskAttempt: true, newTask: '' })
    vm.isValid = false
    sinon.stub(vm, 'addTask')
    sinon.stub(vm, 'setPlaceholder')
    sinon.stub(vm, 'setCurrentTask')
    sinon.stub(vm, 'setNewTask')

    vm.$el.querySelector('#task-button').dispatchEvent(click())
    assert.isFalse(vm.addTask.calledOnce)

    vm.addTask.restore()
    vm.setPlaceholder.restore()
    vm.setCurrentTask.restore()
    vm.setNewTask.restore()
  })
})
