/* global describe it */
import { assert } from 'chai'
import itemMutations from '../../../src/store/item-store/item-mutations'

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

    assert.strictEqual(state.current.currentItem, state.current.items[1]._id)
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
      _id: 'itemid3',
      item: 'New task'
    }

    itemMutations.ADD_TASK(state, newTask)

    assert.lengthOf(state.current.items, 3)
    assert.strictEqual(state.current.items[0].item, 'New task')
    assert.strictEqual(state.current.items[1].item, 'Current task')
    assert.strictEqual(state.current.items[2].item, 'Not current task')
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

    assert.lengthOf(state.current.items, 1)
    assert.strictEqual(state.current.items[0].item, 'Current task')
  })

  it('SET_NEW_TASK', () => {
    let state = {
      newTask: ''
    }

    itemMutations.SET_NEW_TASK(state, 'New task')

    assert.strictEqual(state.newTask, 'New task')
  })

  it('SET_PLACEHOLDER', () => {
    let state = {
      placeholder: ''
    }

    itemMutations.SET_PLACEHOLDER(state, 'placeholder')

    assert.strictEqual(state.placeholder, 'placeholder')
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

    assert.isTrue(state.current.items[1].complete)

    itemMutations.SET_TASK_COMPLETE(state, { index: 1, bool: false })

    assert.isFalse(state.current.items[1].complete)
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

    assert.strictEqual(state.current.items[1].dateCompleted, 'date')

    itemMutations.SET_DATE_COMPLETED(state, { index: 1, date: '' })

    assert.strictEqual(state.current.items[1].dateCompleted, '')
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

    assert.isTrue(state.current.items[0]._deleting)

    itemMutations.SET_TASK_DELETE(state, { index: 0, bool: false })

    assert.isFalse(state.current.items[0]._deleting)
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

    assert.strictEqual(state.current.items[0].item, 'New current task')
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

    assert.strictEqual(state.current.items[0].dueDate, today)

    itemMutations.SET_TASK_DUE_DATE(state, { index: 1, date: today })

    assert.strictEqual(state.current.items[0].dueDate, today)
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

    assert.strictEqual(state.deleteQueue['id1'], 1)
    assert.strictEqual(state.deleteQueue['id2'], 2)
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

    assert.strictEqual(state.current.items[0].item, 'New task')
    assert.strictEqual(state.current.items[1].item, 'Current task')
    assert.strictEqual(state.current.items[2].item, 'Not current task')

    itemMutations.SORT_TASKS(state, { oldIndex: 1, newIndex: 2 })

    assert.strictEqual(state.current.items[0].item, 'New task')
    assert.strictEqual(state.current.items[1].item, 'Not current task')
    assert.strictEqual(state.current.items[2].item, 'Current task')
  })

  it('TOGGLE_DETAILS', () => {
    let state = {
      detailsToggled: null
    }

    itemMutations.TOGGLE_DETAILS(state, 0)

    assert.strictEqual(state.detailsToggled, 0)

    itemMutations.TOGGLE_DETAILS(state, 1)

    assert.strictEqual(state.detailsToggled, 1)
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

    assert.strictEqual(state.current.items[0].notes, 'Some notes')
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

    assert.strictEqual(state.current.items[0]._dueDateDifference, 1)

    itemMutations.SET_DUE_DATE_DIFFERENCE(state, { index: 1, n: -1 })

    assert.strictEqual(state.current.items[1]._dueDateDifference, -1)
  })
})
