/* global it describe sinon assert beforeEach afterEach*/
import chai from 'chai'
import Vue from 'vue'
import Mousetrap from 'mousetrap'
import Items from '../../../../public/components/tasks/task-components/Items.vue'

chai.should()
describe('Items.vue', function () {
  beforeEach(() => {
    sinon.stub(Items.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: false,
        complete: false,
        _delete: true,
        _dueDateDifference: 1,
        _detailsToggled: false
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: true,
        complete: false,
        _delete: false,
        _dueDateDifference: -1,
        _detailsToggled: false
      }
    ])
  })

  afterEach(() => {
    Items.computed.tasks.restore()
  })

  it('should have a dragStart property', () => {
    assert.isNull(Items.data().dragStart)
  })

  it('should inherit the tasks property from the state', () => {
    Items.computed.tasks().should.be.an.instanceof(Array)
  })

  it('should inherit the deleteAgendas property from the state', () => {
    Items.computed.deleteAgendas().should.be.an.instanceof(Array)
  })

  it('should inherit a deleteTask action from the store', () => {
    Items.methods.deleteTask.should.be.an.instanceof(Function)
  })

  it('should inherit a setCurrentTask action from the store', () => {
    Items.methods.setCurrentTask.should.be.an.instanceof(Function)
  })

  it('should inherit a sortTasks action from the store', () => {
    Items.methods.sortTasks.should.be.an.instanceof(Function)
  })

  it('should inherit a setSaveButton action from the store', () => {
    Items.methods.setSaveButton.should.be.an.instanceof(Function)
  })

  it('should inherit a toggleDetails action from the store', () => {
    Items.methods.toggleDetails.should.be.an.instanceof(Function)
  })

  it('should have a _drag method', () => {
    Items.methods._drag.should.be.an.instanceof(Function)
  })

  it('should have a _drop method', () => {
    Items.methods._drop.should.be.an.instanceof(Function)
  })

  it('should have a _index method', () => {
    Items.methods._index.should.be.an.instanceof(Function)
  })

  it('should render with initial state', (done) => {
    Items.computed.tasks.restore()
    sinon.stub(Items.computed, 'tasks').returns([])
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()

    vm.$el.querySelector('.table-body').children.should.have.length(0)

    done()
  })

  it('should render rows with tasks', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()

    vm.$el.querySelector('.table-body').children.should.have.length(2)
    vm.$el.querySelector('.table-body').children[0].getAttribute('name').should.equal('task1')
    vm.$el.querySelector('.table-body').children[1].getAttribute('name').should.equal('task2')

    done()
  })

  it('should respond to complete _delete and current and _dueDateDifference properties', (done) => {
    Items.computed.tasks.restore()
    sinon.stub(Items.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: false,
        complete: false,
        _delete: true,
        _dueDateDifference: 1,
        _detailsToggled: false
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: true,
        complete: false,
        _delete: false,
        _dueDateDifference: -1,
        _detailsToggled: false
      },
      {
        id: 'itemid3',
        item: 'Item 3',
        current: true,
        complete: true,
        _delete: false,
        _dueDateDifference: null,
        _detailsToggled: false
      }
    ])
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
    vm.$el.querySelector('.table-body').children[0].classList.contains('deleting').should.be.true
    vm.$el.querySelector('.table-body').children[1].classList.contains('active').should.be.true
    vm.$el.querySelectorAll('.details-button > i')[0].classList.contains('fa-pencil-square-o').should.be.true
    vm.$el.querySelectorAll('.details-button > i')[1].classList.contains('fa-exclamation-triangle').should.be.true
    vm.$el.querySelectorAll('.details-button > i')[2].classList.contains('fa-pencil-square-o').should.be.true

    done()
  })

  it('should call setCurrentTask method on click', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'setCurrentTask')

    vm.$el.querySelectorAll('.name')[0].click()
    vm.$children[0].setCurrentTask.calledWith(0).should.be.true

    vm.$children[0].setCurrentTask.restore()
    done()
  })

  it('should call toggleDetails on dblclick', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'toggleDetails')

    let dblclick
    dblclick = document.createEvent('HTMLEvents')
    dblclick.initEvent('dblclick', true, true, window)
    vm.$el.querySelectorAll('.name')[0].dispatchEvent(dblclick)

    vm.$children[0].toggleDetails.calledWith(0, true).should.be.true

    vm.$children[0].toggleDetails.restore()
    done()
  })

  it('should call toggleDetails method on click', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'toggleDetails')

    vm.$el.querySelectorAll('.details-button')[0].click()
    vm.$children[0].toggleDetails.calledWith(0, true).should.be.true

    vm.$children[0].toggleDetails.restore()
    done()
  })

  it('should call completeTask on click', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'completeTask')

    vm.$el.querySelectorAll('.complete')[0].click()
    vm.$children[0].completeTask.calledWith(0, true).should.be.true

    vm.$children[0].completeTask.restore()
    done()
  })

  it('should call setCurrentTask on ctrl+,', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'setCurrentTask')

    Mousetrap.trigger('ctrl+,')
    vm.$children[0].setCurrentTask.calledWith(0).should.be.true

    vm.$children[0].setCurrentTask.restore()
    done()
  })

  it('should call setCurrentTask on ctrl+.', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'setCurrentTask')

    Mousetrap.trigger('ctrl+.')
    vm.$children[0].setCurrentTask.calledWith(0).should.be.true

    vm.$children[0].setCurrentTask.restore()
    done()
  })

  it('should call deleteTask on ctrl+backspace', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'deleteTask')

    Mousetrap.trigger('ctrl+backspace')
    vm.$children[0].deleteTask.calledWith(1).should.be.true

    vm.$children[0].deleteTask.restore()
    done()
  })

  it('should call sortTasks on ctrl+command+up', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+up')
    vm.$children[0].sortTasks.calledWith(1, 0).should.be.true

    vm.$children[0].sortTasks.restore()
    done()
  })

  it('should not call sortTasks on ctrl+command+up if first task', (done) => {
    Items.computed.tasks.restore()
    sinon.stub(Items.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        _delete: true
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: false,
        _delete: false
      }
    ])
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+up')
    vm.$children[0].sortTasks.calledOnce.should.be.false

    vm.$children[0].sortTasks.restore()
    done()
  })

  it('should call sortTasks on ctrl+command+down', (done) => {
    Items.computed.tasks.restore()
    sinon.stub(Items.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        _delete: true
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: false,
        _delete: false
      }
    ])
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+down')
    vm.$children[0].sortTasks.calledWith(0, 1).should.be.true

    vm.$children[0].sortTasks.restore()
    done()
  })

  it('should not call sortTasks on ctrl+command+down if last task', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+down')
    vm.$children[0].sortTasks.calledOnce.should.be.false

    vm.$children[0].sortTasks.restore()
    done()
  })

  it('should handle moving non-complete to complete on sortTasks', (done) => {
    Items.computed.tasks.restore()
    sinon.stub(Items.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: true,
        complete: false,
        _delete: true,
        _dueDateDifference: 1
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: false,
        complete: true,
        _delete: false,
        _dueDateDifference: -1
      }
    ])
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+down')
    vm.$children[0].sortTasks.calledOnce.should.be.false

    vm.$children[0].sortTasks.restore()
    done()
  })

  it('should handle moving complete to non-complete on sortTasks', (done) => {
    Items.computed.tasks.restore()
    sinon.stub(Items.computed, 'tasks').returns([
      {
        id: 'itemid',
        item: 'Item 1',
        current: false,
        complete: false,
        _delete: true,
        _dueDateDifference: 1
      },
      {
        id: 'itemid2',
        item: 'Item 2',
        current: true,
        complete: true,
        _delete: false,
        _dueDateDifference: -1
      }
    ])
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+up')
    vm.$children[0].sortTasks.calledOnce.should.be.false

    vm.$children[0].sortTasks.restore()
    done()
  })
})
