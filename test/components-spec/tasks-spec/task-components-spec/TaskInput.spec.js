/* global it describe sinon beforeEach afterEach */
import chai from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import TaskInput from '../../../../public/components/tasks/task-components/TaskInput.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

chai.should()
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
    TaskInput.vuex.getters.newTask({ newTask: '' }).should.equal('')
  })

  it('should inherit the taskAttempt property from the state', () => {
    TaskInput.vuex.getters.taskAttempt({ taskAttempt: false }).should.equal(false)
  })

  it('should inherit the user property from the state', () => {
    TaskInput.vuex.getters.user({ user: {} }).should.be.an.instanceof(Object)
  })

  it('should have a validate property', () => {
    TaskInput.computed.validate.should.be.an.instanceof(Function)
  })

  it('should have an isValid property', () => {
    TaskInput.computed.isValid.should.be.an.instanceof(Function)
  })

  it('should inherit a setNewTask action from the store', () => {
    TaskInput.vuex.actions.setNewTask.should.be.an.instanceof(Function)
  })

  it('should inherit a setPlaceholder action from the store', () => {
    TaskInput.vuex.actions.setPlaceholder.should.be.an.instanceof(Function)
  })

  it('should inherit a setTaskAttempt action from the store', () => {
    TaskInput.vuex.actions.setTaskAttempt.should.be.an.instanceof(Function)
  })

  it('should have an addTask method', () => {
    TaskInput.methods.addTask.should.be.an.instanceof(Function)
  })

  it('should render with initial state', () => {
    const vm = mountVm({})

    vm.$el.querySelector('#create-todo').classList.contains('invalid').should.be.false
  })

  it('should respond to changes in the state', () => {
    sinon.stub(TaskInput.computed, 'isValid').returns(false)

    const vm = mountVm({ taskAttempt: true })

    vm.$el.querySelector('#create-todo').classList.contains('invalid').should.be.true

    TaskInput.computed.isValid.restore()
  })

  it('should call addTask and setPlaceholder on form submit', () => {
    sinon.stub(TaskInput.computed, 'isValid').returns(true)
    const vm = mountVm({ taskAttempt: true, newTask: 'New task' })

    sinon.stub(vm.$children[0], 'addTask')
    sinon.stub(vm.$children[0], 'setPlaceholder')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.calledOnce.should.be.true
    vm.$children[0].setPlaceholder.calledOnce.should.be.true

    vm.$children[0].addTask.restore()
    vm.$children[0].setPlaceholder.restore()
    TaskInput.computed.isValid.restore()
  })

  it('should call addTask with a dueDate shortcut on form submit', () => {
    sinon.stub(TaskInput.computed, 'isValid').returns(true)
    const vm = mountVm({ taskAttempt: true, newTask: 'Remind me to new task tomorrow' })

    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.args[0][0].item.should.equal('New task')
    vm.$children[0].addTask.args[0][0].dueDate.should.equal('2016-01-01T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
  })

  it('should call addTask with a shorter dueDate shortcut on form submit', () => {
    sinon.stub(TaskInput.computed, 'isValid').returns(true)

    const vm = mountVm({ taskAttempt: true, newTask: '/r new task tomorrow' })

    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.args[0][0].item.should.equal('New task')
    vm.$children[0].addTask.args[0][0].dueDate.should.equal('2016-01-01T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
  })

  it('should call addTask with a dueDate shortcut for tomorrow on form submit', () => {
    sinon.stub(TaskInput.computed, 'isValid').returns(true)

    const vm = mountVm({ taskAttempt: true, newTask: '/t new task' })

    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.args[0][0].item.should.equal('New task')
    vm.$children[0].addTask.args[0][0].dueDate.should.equal('2016-01-01T13:00:00.000Z')

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
    vm.$children[0].addTask.args[0][0].item.should.equal('New task')
    vm.$children[0].addTask.args[0][0].dueDate.should.equal('2016-01-04T13:00:00.000Z')

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
    vm.$children[0].addTask.args[0][0].item.should.equal('New task')
    vm.$children[0].addTask.args[0][0].dueDate.should.equal('2016-02-01T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
  })

  it('should call addTask with a dueDate shortcut for next year on form submit', () => {
    clock.tick(86400000)
    sinon.stub(TaskInput.computed, 'isValid').returns(true)

    const vm = mountVm({ taskAttempt: true, newTask: '/y new task' })

    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.args[0][0].item.should.equal('New task')
    vm.$children[0].addTask.args[0][0].dueDate.should.equal('2017-01-01T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
  })

  it('should do nothing if !isValid', () => {
    sinon.stub(TaskInput.computed, 'isValid').returns(false)

    const vm = mountVm({ taskAttempt: true, newTask: '' })

    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.calledOnce.should.be.false

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
  })
})
