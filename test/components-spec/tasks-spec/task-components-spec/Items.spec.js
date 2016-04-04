/* global it describe sinon assert beforeEach afterEach*/
import chai from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import Mousetrap from 'mousetrap'
import Items from '../../../../public/components/tasks/task-components/Items.vue'
import store from '../../../../public/store'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

chai.should()
describe('Items.vue', function () {
  let items

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
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()
  }

  beforeEach(() => {
    items = [
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
    ]
  })

  afterEach(() => {
    items = []
  })

  it('should have a dragStart property', () => {
    assert.isNull(Items.data().dragStart)
  })

  it('should inherit the tasks property from the state', () => {
    Items.vuex.getters.tasks({ current: { items: [] } }).should.be.an.instanceof(Array)
  })

  it('should inherit a deleteTask action from the store', () => {
    Items.vuex.actions.deleteTask.should.be.an.instanceof(Function)
  })

  it('should inherit a setCurrentTask action from the store', () => {
    Items.vuex.actions.setCurrentTask.should.be.an.instanceof(Function)
  })

  it('should inherit a sortTasks action from the store', () => {
    Items.vuex.actions.sortTasks.should.be.an.instanceof(Function)
  })

  it('should inherit a toggleDetails action from the store', () => {
    Items.vuex.actions.toggleDetails.should.be.an.instanceof(Function)
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

  it('should render with initial state', () => {
    const vm = new Vue({
      store,
      template: '<div><test></test></div>',
      components: {
        'test': Items
      }
    }).$mount()

    vm.$el.querySelector('.table-body').children.should.have.length(0)
  })

  it('should render rows with tasks', () => {
    const vm = mountVm()

    vm.$el.querySelector('.table-body').children.should.have.length(2)
    vm.$el.querySelector('.table-body').children[0].getAttribute('name').should.equal('task1')
    vm.$el.querySelector('.table-body').children[1].getAttribute('name').should.equal('task2')
  })

  it('should respond to complete _delete and current and _dueDateDifference properties', () => {
    items = [
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
    ]

    const vm = mountVm()

    vm.$el.querySelector('.table-body').children[0].classList.contains('deleting').should.be.true
    vm.$el.querySelector('.table-body').children[1].classList.contains('active').should.be.true
    vm.$el.querySelectorAll('.details-button > i')[0].classList.contains('fa-pencil-square-o').should.be.true
    vm.$el.querySelectorAll('.details-button > i')[1].classList.contains('fa-exclamation-triangle').should.be.true
    vm.$el.querySelectorAll('.details-button > i')[2].classList.contains('fa-pencil-square-o').should.be.true
  })

  it('should call setCurrentTask method on click', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'setCurrentTask')

    vm.$el.querySelectorAll('.name')[0].click()
    vm.$children[0].setCurrentTask.calledWith(0).should.be.true

    vm.$children[0].setCurrentTask.restore()
  })

  it('should call toggleDetails on dblclick', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'toggleDetails')

    let dblclick
    dblclick = document.createEvent('HTMLEvents')
    dblclick.initEvent('dblclick', true, true, window)
    vm.$el.querySelectorAll('.name')[0].dispatchEvent(dblclick)

    vm.$children[0].toggleDetails.calledWith(0).should.be.true

    vm.$children[0].toggleDetails.restore()
  })

  it('should call toggleDetails method on click', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'toggleDetails')

    vm.$el.querySelectorAll('.details-button')[0].click()
    vm.$children[0].toggleDetails.calledWith(0, true).should.be.true

    vm.$children[0].toggleDetails.restore()
  })

  it('should call completeTask on click', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'completeTask')

    vm.$el.querySelectorAll('.complete')[0].click()
    vm.$children[0].completeTask.calledWith(0, true).should.be.true

    vm.$children[0].completeTask.restore()
  })

  it('should call setCurrentTask on ctrl+,', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'setCurrentTask')

    Mousetrap.trigger('ctrl+,')
    vm.$children[0].setCurrentTask.calledWith(0).should.be.true

    vm.$children[0].setCurrentTask.restore()
  })

  it('should call setCurrentTask on ctrl+.', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'setCurrentTask')

    Mousetrap.trigger('ctrl+.')
    vm.$children[0].setCurrentTask.calledWith(0).should.be.true

    vm.$children[0].setCurrentTask.restore()
  })

  it('should call deleteTask on ctrl+backspace', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'deleteTask')

    Mousetrap.trigger('ctrl+backspace')
    vm.$children[0].deleteTask.calledWith(1).should.be.true

    vm.$children[0].deleteTask.restore()
  })

  it('should call sortTasks on ctrl+command+up', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+up')
    vm.$children[0].sortTasks.calledWith(1, 0).should.be.true

    vm.$children[0].sortTasks.restore()
  })

  it('should not call sortTasks on ctrl+command+up if first task', () => {
    items = [
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
    ]

    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+up')
    vm.$children[0].sortTasks.calledOnce.should.be.false

    vm.$children[0].sortTasks.restore()
  })

  it('should call sortTasks on ctrl+command+down', () => {
    items = [
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
    ]

    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+down')
    vm.$children[0].sortTasks.calledWith(0, 1).should.be.true

    vm.$children[0].sortTasks.restore()
  })

  it('should not call sortTasks on ctrl+command+down if last task', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+down')
    vm.$children[0].sortTasks.calledOnce.should.be.false

    vm.$children[0].sortTasks.restore()
  })

  it('should handle moving non-complete to complete on sortTasks', () => {
    items = [
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
    ]

    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+down')
    vm.$children[0].sortTasks.calledOnce.should.be.false

    vm.$children[0].sortTasks.restore()
  })

  it('should handle moving complete to non-complete on sortTasks', () => {
    items = [
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
    ]

    const vm = mountVm()

    sinon.stub(vm.$children[0], 'sortTasks')

    Mousetrap.trigger('ctrl+command+up')
    vm.$children[0].sortTasks.calledOnce.should.be.false

    vm.$children[0].sortTasks.restore()
  })
})
