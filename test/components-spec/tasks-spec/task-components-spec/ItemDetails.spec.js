/* global it describe sinon assert beforeEach afterEach */
import chai from 'chai'
import Vue from 'vue'
import Mousetrap from 'mousetrap'
import ItemDetails from '../../../../public/components/tasks/task-components/ItemDetails.vue'

chai.should()
describe('ItemDetails.vue', function () {
  let clock

  beforeEach(() => {
    const start = 'Jan 1, 2016 00:00:000 UTC'
    clock = sinon.useFakeTimers(Date.parse(start))
    sinon.stub(ItemDetails.computed, 'tasks').returns([
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
    ])
    ItemDetails.computed.task = () => {
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
    ItemDetails.computed.index = () => {
      return 0
    }
  })

  afterEach(() => {
    clock.restore()
    ItemDetails.computed.tasks.restore()
    delete ItemDetails.computed.task
    delete ItemDetails.computed.index
  })

  it('should inherit the tasks property from the state', () => {
    ItemDetails.computed.tasks().should.be.an.instanceof(Array)
  })

  it('should inherit a setTaskNotes action from the store', () => {
    ItemDetails.methods.setTaskNotes.should.be.an.instanceof(Function)
  })

  it('should inherit a setSaveButton action from the store', () => {
    ItemDetails.methods.setSaveButton.should.be.an.instanceof(Function)
  })

  it('should inherit a toggleDetails action from the store', () => {
    ItemDetails.methods.toggleDetails.should.be.an.instanceof(Function)
  })

  it('should inherit a setDueDateDifference action from the store', () => {
    ItemDetails.methods.setDueDateDifference.should.be.an.instanceof(Function)
  })

  it('should inherit a renameTask action from the store', () => {
    ItemDetails.methods.renameTask.should.be.an.instanceof(Function)
  })

  it('should have a rename method', () => {
    ItemDetails.methods.rename.should.be.an.instanceof(Function)
  })

  it('should have a reformatDate method', () => {
    ItemDetails.methods.reformatDate.should.be.an.instanceof(Function)
  })

  it('should render with initial state', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ItemDetails
      }
    }).$mount()

    assert.isNull(vm.$el.querySelector('.mask'))
    assert.isNull(vm.$el.querySelector('.task-details'))

    done()
  })

  it('should reformat date on reformatDate', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ItemDetails
      }
    }).$mount()

    vm.$children[0].reformatDate('2016-01-01T00:00:00.000Z').should.equal('Dec 31, 2015')

    done()
  })

  it('should call renameTask on .task-name change', (done) => {
    ItemDetails.computed.tasks.restore()
    delete ItemDetails.computed.task
    sinon.stub(ItemDetails.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: null,
        _delete: true,
        _dueDateDifference: 1,
        _detailsToggled: true
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
    ])
    ItemDetails.computed.task = () => {
      return {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: null,
        _delete: true,
        _dueDateDifference: 1,
        _detailsToggled: true
      }
    }
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ItemDetails
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'renameTask')
    sinon.stub(vm.$children[0], 'setSaveButton')

    let change
    change = document.createEvent('HTMLEvents')
    change.initEvent('change', true, true, window)
    vm.$el.querySelectorAll('.task-name')[0].value = 'Task 11'
    vm.$el.querySelectorAll('.task-name')[0].dispatchEvent(change)

    vm.$children[0].renameTask.calledWith(0, 'Task 11').should.be.true
    vm.$children[0].setSaveButton.calledWith(true).should.be.true

    vm.$children[0].renameTask.restore()
    done()
  })

  it('should not call renameTask if null', (done) => {
    ItemDetails.computed.tasks.restore()
    delete ItemDetails.computed.task
    sinon.stub(ItemDetails.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: null,
        _delete: true,
        _dueDateDifference: 1,
        _detailsToggled: true
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
    ])
    ItemDetails.computed.task = () => {
      return {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: null,
        _delete: true,
        _dueDateDifference: 1,
        _detailsToggled: true
      }
    }
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ItemDetails
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'renameTask')
    sinon.stub(vm.$children[0], 'setSaveButton')

    let change
    change = document.createEvent('HTMLEvents')
    change.initEvent('change', true, true, window)
    vm.$el.querySelectorAll('.task-name')[0].value = ''
    vm.$el.querySelectorAll('.task-name')[0].dispatchEvent(change)

    vm.$children[0].renameTask.calledOnce.should.be.false
    vm.$children[0].setSaveButton.calledOnce.should.be.false

    vm.$children[0].renameTask.restore()
    done()
  })

  it('should not display dates or due date differences if !task.dueDate', (done) => {
    ItemDetails.computed.tasks.restore()
    delete ItemDetails.computed.task
    sinon.stub(ItemDetails.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: null,
        _delete: false,
        _dueDateDifference: null,
        _detailsToggled: true
      }
    ])
    ItemDetails.computed.task = () => {
      return {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: null,
        _delete: true,
        _dueDateDifference: null,
        _detailsToggled: true
      }
    }
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ItemDetails
      }
    }).$mount()

    vm.$el.querySelector('.task-due').children[0].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.task-due').children[1].classList.contains('hidden').should.be.false

    done()
  })

  it('should display dates if due date is tomorrow', (done) => {
    ItemDetails.computed.tasks.restore()
    delete ItemDetails.computed.task
    sinon.stub(ItemDetails.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2016-01-02T13:00:00.000Z',
        _delete: false,
        _dueDateDifference: 1,
        _detailsToggled: true
      }
    ])
    ItemDetails.computed.task = () => {
      return {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2016-01-02T13:00:00.000Z',
        _delete: true,
        _dueDateDifference: 1,
        _detailsToggled: true
      }
    }
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ItemDetails
      }
    }).$mount()

    vm.$el.querySelector('.task-due').children[0].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.task-due').textContent.should.include('Jan 2, 2016')
    vm.$el.querySelector('.task-due').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.due-in').classList.contains('hidden').should.be.false
    vm.$el.querySelector('.due-in').children[0].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.due-in').children[1].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.overdue').classList.contains('hidden').should.be.true
    vm.$el.querySelector('.due-today').classList.contains('hidden').should.be.true

    done()
  })

  it('should display dates if due date is more than one day in the future', (done) => {
    ItemDetails.computed.tasks.restore()
    delete ItemDetails.computed.task
    sinon.stub(ItemDetails.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2016-01-03T13:00:00.000Z',
        _delete: false,
        _dueDateDifference: 2,
        _detailsToggled: true
      }
    ])
    ItemDetails.computed.task = () => {
      return {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2016-01-03T13:00:00.000Z',
        _delete: true,
        _dueDateDifference: 2,
        _detailsToggled: true
      }
    }
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ItemDetails
      }
    }).$mount()

    vm.$el.querySelector('.task-due').children[0].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.task-due').textContent.should.include('Jan 3, 2016')
    vm.$el.querySelector('.task-due').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.due-in').classList.contains('hidden').should.be.false
    vm.$el.querySelector('.due-in').children[0].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.due-in').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.overdue').classList.contains('hidden').should.be.true
    vm.$el.querySelector('.due-today').classList.contains('hidden').should.be.true

    done()
  })

  it('should display dates if due date was yesterday', (done) => {
    ItemDetails.computed.tasks.restore()
    delete ItemDetails.computed.task
    sinon.stub(ItemDetails.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2015-12-31T13:00:00.000Z',
        _delete: false,
        _dueDateDifference: -1,
        _detailsToggled: true
      }
    ])
    ItemDetails.computed.task = () => {
      return {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2015-12-31T13:00:00.000Z',
        _delete: true,
        _dueDateDifference: -1,
        _detailsToggled: true
      }
    }
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ItemDetails
      }
    }).$mount()

    vm.$el.querySelector('.task-due').children[0].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.task-due').textContent.should.include('Dec 31, 2015')
    vm.$el.querySelector('.task-due').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.due-in').classList.contains('hidden').should.be.true
    vm.$el.querySelector('.overdue').classList.contains('hidden').should.be.false
    vm.$el.querySelector('.overdue').children[0].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.overdue').children[1].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.due-today').classList.contains('hidden').should.be.true

    done()
  })

  it('should display dates if due date was more than one day in the past', (done) => {
    ItemDetails.computed.tasks.restore()
    delete ItemDetails.computed.task
    sinon.stub(ItemDetails.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2015-12-30T13:00:00.000Z',
        _delete: false,
        _dueDateDifference: -2,
        _detailsToggled: true
      }
    ])
    ItemDetails.computed.task = () => {
      return {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2015-12-30T13:00:00.000Z',
        _delete: true,
        _dueDateDifference: -2,
        _detailsToggled: true
      }
    }
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ItemDetails
      }
    }).$mount()

    vm.$el.querySelector('.task-due').children[0].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.task-due').textContent.should.include('Dec 30, 2015')
    vm.$el.querySelector('.task-due').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.due-in').classList.contains('hidden').should.be.true
    vm.$el.querySelector('.overdue').classList.contains('hidden').should.be.false
    vm.$el.querySelector('.overdue').children[0].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.overdue').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.due-today').classList.contains('hidden').should.be.true

    done()
  })

  it('should display dates if due date is today', (done) => {
    ItemDetails.computed.tasks.restore()
    delete ItemDetails.computed.task
    sinon.stub(ItemDetails.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2016-01-01T13:00:00.000Z',
        _delete: false,
        _dueDateDifference: 0,
        _detailsToggled: true
      }
    ])
    ItemDetails.computed.task = () => {
      return {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: '2016-01-01T13:00:00.000Z',
        _delete: true,
        _dueDateDifference: 0,
        _detailsToggled: true
      }
    }
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ItemDetails
      }
    }).$mount()

    vm.$el.querySelector('.task-due').children[0].classList.contains('hidden').should.be.false
    vm.$el.querySelector('.task-due').textContent.should.include('Jan 1, 2016')
    vm.$el.querySelector('.task-due').children[1].classList.contains('hidden').should.be.true
    vm.$el.querySelector('.due-in').classList.contains('hidden').should.be.true
    vm.$el.querySelector('.overdue').classList.contains('hidden').should.be.true
    vm.$el.querySelector('.due-today').classList.contains('hidden').should.be.false

    done()
  })

  it('should not call renameTask if null', (done) => {
    ItemDetails.computed.tasks.restore()
    delete ItemDetails.computed.task
    sinon.stub(ItemDetails.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: null,
        _delete: true,
        _dueDateDifference: 1,
        _detailsToggled: true
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
    ])
    ItemDetails.computed.task = () => {
      return {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        dueDate: null,
        _delete: true,
        _dueDateDifference: 1,
        _detailsToggled: true
      }
    }
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ItemDetails
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'renameTask')
    sinon.stub(vm.$children[0], 'setSaveButton')

    let change
    change = document.createEvent('HTMLEvents')
    change.initEvent('change', true, true, window)
    vm.$el.querySelectorAll('.task-name')[0].value = ''
    vm.$el.querySelectorAll('.task-name')[0].dispatchEvent(change)

    vm.$children[0].renameTask.calledOnce.should.be.false
    vm.$children[0].setSaveButton.calledOnce.should.be.false

    vm.$children[0].renameTask.restore()
    done()
  })

  it('should call toggleDetails on ctrl+d', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ItemDetails
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'toggleDetails')

    Mousetrap.trigger('ctrl+d')
    vm.$children[0].toggleDetails.calledWith(0, true).should.be.true

    vm.$children[0].toggleDetails.restore()
    done()
  })
})
