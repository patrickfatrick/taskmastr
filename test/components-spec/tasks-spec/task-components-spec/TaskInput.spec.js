/* global it describe sinon beforeEach afterEach */
import chai from 'chai'
import Vue from 'vue'
import TaskInput from '../../../../public/components/tasks/task-components/TaskInput.vue'

chai.should()
describe('TaskInput.vue', function () {
  let clock

  beforeEach(() => {
    const start = 'Jan 1, 2016 00:00:000 UTC'
    clock = sinon.useFakeTimers(Date.parse(start))
  })

  afterEach(() => {
    clock.restore()
  })

  it('should inherit the newTask property from the state', () => {
    TaskInput.computed.newTask().should.equal('')
  })

  it('should inherit the taskAttempt property from the state', () => {
    TaskInput.computed.taskAttempt().should.equal(false)
  })

  it('should inherit the user property from the state', () => {
    TaskInput.computed.user().should.be.an.instanceof(Object)
  })

  it('should have a validate property', () => {
    TaskInput.computed.validate.should.be.an.instanceof(Function)
  })

  it('should have an isValid property', () => {
    TaskInput.computed.isValid.should.be.an.instanceof(Function)
  })

  it('should inherit a setNewTask action from the store', () => {
    TaskInput.methods.setNewTask.should.be.an.instanceof(Function)
  })

  it('should inherit a setPlaceholder action from the store', () => {
    TaskInput.methods.setPlaceholder.should.be.an.instanceof(Function)
  })

  it('should inherit a setTaskAttempt action from the store', () => {
    TaskInput.methods.setTaskAttempt.should.be.an.instanceof(Function)
  })

  it('should have an addTask method', () => {
    TaskInput.methods.addTask.should.be.an.instanceof(Function)
  })

  it('should render with initial state', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': TaskInput
      }
    }).$mount()

    vm.$el.querySelector('#create-todo').classList.contains('invalid').should.be.false
    done()
  })

  it('should respond to changes in the state', (done) => {
    sinon.stub(TaskInput.computed, 'isValid').returns(false)
    sinon.stub(TaskInput.computed, 'taskAttempt').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': TaskInput
      }
    }).$mount()

    vm.$el.querySelector('#create-todo').classList.contains('invalid').should.be.true

    TaskInput.computed.isValid.restore()
    TaskInput.computed.taskAttempt.restore()
    done()
  })

  it('should call addTask and setPlaceholder on form submit', (done) => {
    sinon.stub(TaskInput.computed, 'isValid').returns(true)
    sinon.stub(TaskInput.computed, 'taskAttempt').returns(true)
    sinon.stub(TaskInput.computed, 'newTask').returns('New task')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': TaskInput
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'addTask')
    sinon.stub(vm.$children[0], 'setPlaceholder')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.calledOnce.should.be.true
    vm.$children[0].setPlaceholder.calledOnce.should.be.true

    vm.$children[0].addTask.restore()
    vm.$children[0].setPlaceholder.restore()
    TaskInput.computed.isValid.restore()
    TaskInput.computed.taskAttempt.restore()
    TaskInput.computed.newTask.restore()
    done()
  })

  it('should call addTask with a dueDate shortcut on form submit', (done) => {
    sinon.stub(TaskInput.computed, 'isValid').returns(true)
    sinon.stub(TaskInput.computed, 'taskAttempt').returns(true)
    sinon.stub(TaskInput.computed, 'newTask').returns('Remind me to new task tomorrow')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': TaskInput
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.args[0][0].item.should.equal('New task')
    vm.$children[0].addTask.args[0][0].dueDate.should.equal('2016-01-01T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
    TaskInput.computed.taskAttempt.restore()
    TaskInput.computed.newTask.restore()
    done()
  })

  it('should call addTask with a shorter dueDate shortcut on form submit', (done) => {
    sinon.stub(TaskInput.computed, 'isValid').returns(true)
    sinon.stub(TaskInput.computed, 'taskAttempt').returns(true)
    sinon.stub(TaskInput.computed, 'newTask').returns('/r new task tomorrow')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': TaskInput
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.args[0][0].item.should.equal('New task')
    vm.$children[0].addTask.args[0][0].dueDate.should.equal('2016-01-01T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
    TaskInput.computed.taskAttempt.restore()
    TaskInput.computed.newTask.restore()
    done()
  })

  it('should call addTask with a dueDate shortcut for tomorrow on form submit', (done) => {
    sinon.stub(TaskInput.computed, 'isValid').returns(true)
    sinon.stub(TaskInput.computed, 'taskAttempt').returns(true)
    sinon.stub(TaskInput.computed, 'newTask').returns('/t new task')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': TaskInput
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.args[0][0].item.should.equal('New task')
    vm.$children[0].addTask.args[0][0].dueDate.should.equal('2016-01-01T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
    TaskInput.computed.taskAttempt.restore()
    TaskInput.computed.newTask.restore()
    done()
  })

  it('should call addTask with a dueDate shortcut for next week on form submit', (done) => {
    sinon.stub(TaskInput.computed, 'isValid').returns(true)
    sinon.stub(TaskInput.computed, 'taskAttempt').returns(true)
    sinon.stub(TaskInput.computed, 'newTask').returns('/w new task')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': TaskInput
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.args[0][0].item.should.equal('New task')
    vm.$children[0].addTask.args[0][0].dueDate.should.equal('2016-01-04T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
    TaskInput.computed.taskAttempt.restore()
    TaskInput.computed.newTask.restore()
    done()
  })

  it('should call addTask with a dueDate shortcut for next month on form submit', (done) => {
    clock.tick(86400000)
    sinon.stub(TaskInput.computed, 'isValid').returns(true)
    sinon.stub(TaskInput.computed, 'taskAttempt').returns(true)
    sinon.stub(TaskInput.computed, 'newTask').returns('/m new task')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': TaskInput
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.args[0][0].item.should.equal('New task')
    vm.$children[0].addTask.args[0][0].dueDate.should.equal('2016-02-01T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
    TaskInput.computed.taskAttempt.restore()
    TaskInput.computed.newTask.restore()
    done()
  })

  it('should call addTask with a dueDate shortcut for next year on form submit', (done) => {
    clock.tick(86400000)
    sinon.stub(TaskInput.computed, 'isValid').returns(true)
    sinon.stub(TaskInput.computed, 'taskAttempt').returns(true)
    sinon.stub(TaskInput.computed, 'newTask').returns('/y new task')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': TaskInput
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.args[0][0].item.should.equal('New task')
    vm.$children[0].addTask.args[0][0].dueDate.should.equal('2017-01-01T13:00:00.000Z')

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
    TaskInput.computed.taskAttempt.restore()
    TaskInput.computed.newTask.restore()
    done()
  })

  it('should do nothing if !isValid', (done) => {
    sinon.stub(TaskInput.computed, 'isValid').returns(false)
    sinon.stub(TaskInput.computed, 'taskAttempt').returns(true)
    sinon.stub(TaskInput.computed, 'newTask').returns('')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': TaskInput
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'addTask')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.calledOnce.should.be.false

    vm.$children[0].addTask.restore()
    TaskInput.computed.isValid.restore()
    TaskInput.computed.taskAttempt.restore()
    TaskInput.computed.newTask.restore()
    done()
  })
})
