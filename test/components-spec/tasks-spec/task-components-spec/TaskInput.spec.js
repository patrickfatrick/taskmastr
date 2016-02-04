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

  it('should inherit a setSaveButton action from the store', () => {
    TaskInput.methods.setSaveButton.should.be.an.instanceof(Function)
  })

  it('should inherit a setNewTask action from the store', () => {
    TaskInput.methods.setNewTask.should.be.an.instanceof(Function)
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

  it('should call addTask on form submit', (done) => {
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
    sinon.spy(vm.$children[0], 'setSaveButton')

    vm.$el.querySelector('#task-button').click()
    console.log(vm.$children[0].addTask.args[0])
    vm.$children[0].addTask.calledOnce.should.be.true
    vm.$children[0].setSaveButton.calledWith(true).should.be.true

    vm.$children[0].addTask.restore()
    vm.$children[0].setSaveButton.restore()
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
    sinon.spy(vm.$children[0], 'setSaveButton')

    vm.$el.querySelector('#task-button').click()
    vm.$children[0].addTask.calledOnce.should.be.false
    vm.$children[0].setSaveButton.calledWith(true).should.be.false

    vm.$children[0].addTask.restore()
    vm.$children[0].setSaveButton.restore()
    TaskInput.computed.isValid.restore()
    TaskInput.computed.taskAttempt.restore()
    TaskInput.computed.newTask.restore()
    done()
  })
})
