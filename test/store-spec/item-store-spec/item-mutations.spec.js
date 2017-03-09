/* global describe it */
import chai, { assert } from 'chai'
import itemMutations from '../../../src/store/item-store/item-mutations'

chai.should()
describe('item mutations', () => {
  it('SET_CURRENT_TASK', () => {
    let state = {
      current: {
        list: 'Current list',
        currentItem: 'itemid',
        items: [
          {
            item: 'Current task',
            _id: 'itemid'
          },
          {
            item: 'Not current task',
            _id: 'itemid2'
          }
        ]
      }
    }

    itemMutations.SET_CURRENT_TASK(state, 'itemid2')

    assert.deepEqual(state.current.currentItem, state.current.items[1]._id)
  })

  it('ADD_TASK', () => {
    let state = {
      current: {
        list: 'Current list',
        currentItem: 'itemid',
        items: [
          {
            item: 'Current task',
            _id: 'itemid'
          },
          {
            item: 'Not current task',
            _id: 'itemid2'
          }
        ]
      }
    }
    let newTask = {
      item: 'New task',
      current: false
    }

    itemMutations.ADD_TASK(state, newTask)

    state.current.items[0].item.should.equal('New task')
    state.current.items[1].item.should.equal('Current task')
    state.current.items[2].item.should.equal('Not current task')
  })

  it('REMOVE_TASK', () => {
    let state = {
      current: {
        list: 'Current list',
        currentItem: 'itemid',
        items: [
          {
            item: 'Current task',
            _id: 'itemid'
          },
          {
            item: 'Not current task',
            _id: 'itemid2'
          }
        ]
      }
    }

    itemMutations.REMOVE_TASK(state, 1)

    state.current.items.length.should.equal(1)
    state.current.items[0].item.should.equal('Current task')
  })

  it('SET_NEW_TASK', () => {
    let state = {
      newTask: 'New task'
    }

    itemMutations.SET_NEW_TASK(state, '')

    state.newTask.should.equal('')
  })

  it('SET_PLACEHOLDER', () => {
    let state = {
      placeholder: ''
    }

    itemMutations.SET_PLACEHOLDER(state, 'placeholder')

    state.placeholder.should.equal('placeholder')
  })

  it('SET_TASK_COMPLETE', () => {
    let state = {
      current: {
        list: 'Current list',
        currentItem: 'itemid',
        items: [
          {
            item: 'Current task',
            _id: 'itemid',
            complete: false
          },
          {
            item: 'Not current task',
            _id: 'itemid2',
            complete: false
          }
        ]
      }
    }

    itemMutations.SET_TASK_COMPLETE(state, { index: 1, bool: true })

    state.current.items[1].complete.should.be.true

    itemMutations.SET_TASK_COMPLETE(state, { index: 1, bool: false })

    state.current.items[1].complete.should.be.false
  })

  it('SET_DATE_COMPLETED', () => {
    let state = {
      current: {
        list: 'Current list',
        currentItem: 'itemid',
        items: [
          {
            item: 'Current task',
            _id: 'itemid',
            complete: false,
            dateCompleted: ''
          },
          {
            item: 'Not current task',
            _id: 'itemid2',
            complete: false,
            dateCompleted: ''
          }
        ]
      }
    }

    itemMutations.SET_DATE_COMPLETED(state, { index: 1, date: 'date' })

    state.current.items[1].dateCompleted.should.equal('date')

    itemMutations.SET_DATE_COMPLETED(state, { index: 1, date: '' })

    state.current.items[1].dateCompleted.should.equal('')
  })

  it('SET_TASK_DELETE', () => {
    let state = {
      current: {
        list: 'Current list',
        currentItem: 'itemid',
        items: [
          {
            item: 'Current task',
            _id: 'itemid'
          },
          {
            item: 'Not current task',
            _id: 'itemid2'
          }
        ]
      }
    }

    itemMutations.SET_TASK_DELETE(state, { index: 0, bool: true })

    state.current.items[0]._deleting.should.be.true

    itemMutations.SET_TASK_DELETE(state, { index: 0, bool: false })

    state.current.items[0]._deleting.should.be.false
  })

  it('RENAME_TASK', () => {
    let state = {
      current: {
        list: 'Current list',
        currentItem: 'itemid',
        items: [
          {
            item: 'Current task',
            _id: 'itemid'
          },
          {
            item: 'Not current task',
            _id: 'itemid2'
          }
        ]
      }
    }

    itemMutations.RENAME_TASK(state, { index: 0, name: 'New current task' })

    state.current.items[0].item.should.equal('New current task')
  })

  it('SET_TASK_DUE_DATE', () => {
    const today = new Date()
    let state = {
      current: {
        list: 'Current list',
        currentItem: 'itemid',
        items: [
          {
            item: 'Current task',
            _id: 'itemid',
            dueDate: null
          },
          {
            item: 'Not current task',
            _id: 'itemid2',
            dueDate: null
          }
        ]
      }
    }

    itemMutations.SET_TASK_DUE_DATE(state, { index: 0, date: today })

    state.current.items[0].dueDate.should.equal(today)

    itemMutations.SET_TASK_DUE_DATE(state, { index: 1, date: today })

    state.current.items[0].dueDate.should.equal(today)
  })

  it('UPDATE_DELETE_QUEUE', () => {
    let state = {
      current: {
        list: 'Current list',
        current: 'id1',
        items: [
          {
            _id: 'id1',
            item: 'Current task'
          },
          {
            _id: 'id2',
            item: 'Not current task'
          }
        ]
      },
      deleteQueue: {}
    }

    itemMutations.UPDATE_DELETE_QUEUE(state, { id: 'id1', val: 1 })
    itemMutations.UPDATE_DELETE_QUEUE(state, { id: 'id2', val: 2 })

    state.deleteQueue['id1'].should.equal(1)
    state.deleteQueue['id2'].should.equal(2)
  })

  it('SORT_TASKS', () => {
    let state = {
      current: {
        list: 'Current list',
        currentItem: 'itemid',
        items: [
          {
            item: 'Current task',
            _id: 'itemid'
          },
          {
            item: 'Not current task',
            _id: 'itemid2'
          },
          {
            item: 'New task',
            _id: 'itemid3'
          }
        ]
      }
    }

    itemMutations.SORT_TASKS(state, { oldIndex: 2, newIndex: 0 })

    state.current.items[0].item.should.equal('New task')
    state.current.items[1].item.should.equal('Current task')
    state.current.items[2].item.should.equal('Not current task')

    itemMutations.SORT_TASKS(state, { oldIndex: 1, newIndex: 2 })

    state.current.items[0].item.should.equal('New task')
    state.current.items[1].item.should.equal('Not current task')
    state.current.items[2].item.should.equal('Current task')
  })

  it('TOGGLE_DETAILS', () => {
    let state = {
      detailsToggled: null
    }

    itemMutations.TOGGLE_DETAILS(state, 0)

    state.detailsToggled.should.equal(0)

    itemMutations.TOGGLE_DETAILS(state, 1)

    state.detailsToggled.should.equal(1)
  })

  it('SET_TASK_NOTES', () => {
    let state = {
      current: {
        list: 'Current list',
        currentItem: 'itemid',
        items: [
          {
            item: 'Current task',
            _id: 'itemid',
            notes: ''
          },
          {
            item: 'Not current task',
            _id: 'itemid2',
            notes: ''
          }
        ]
      }
    }

    itemMutations.SET_TASK_NOTES(state, { index: 0, notes: 'Some notes' })

    state.current.items[0].notes.should.equal('Some notes')
  })

  it('SET_DUE_DATE_DIFFERENCE', () => {
    let state = {
      current: {
        list: 'Current list',
        currentItem: 'itemid',
        items: [
          {
            item: 'Current task',
            _id: 'itemid',
            dueDate: new Date() + (1000 * 60 * 60 * 24),
            _dueDateDifference: null
          },
          {
            item: 'Not current task',
            _id: 'itemid2',
            dueDate: new Date() - (1000 / 60 / 60 / 24),
            _dueDateDifference: null
          }
        ]
      }
    }

    itemMutations.SET_DUE_DATE_DIFFERENCE(state, { index: 0, n: 1 })

    state.current.items[0]._dueDateDifference.should.equal(1)

    itemMutations.SET_DUE_DATE_DIFFERENCE(state, { index: 1, n: -1 })

    state.current.items[1]._dueDateDifference.should.equal(-1)
  })
})
