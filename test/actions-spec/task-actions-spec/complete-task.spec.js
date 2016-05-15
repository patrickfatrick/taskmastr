/* global describe it sinon beforeEach afterEach*/
import chai from 'chai'
import { testAction } from '../test-action'
import itemActionsInjector from 'inject!../../../public/store/item-store/item-actions'

chai.should()

describe('completeTask', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers(Date.parse(2016, 1, 1, 6, 0, 0))
  })

  afterEach(() => {
    clock.restore()
  })

  it('dispatches SET_TASK_COMPLETE and SORT_TASKS with another complete', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/list-services': {
        updateList (username, listid, tasks, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      },
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: false,
            dateCompleted: '',
            dueDate: '',
            _dueDateDifference: null
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            dateCompleted: '',
            dueDate: '',
            _dueDateDifference: null
          }
        ]
      }
    }
    testAction(itemActions.completeTask, [0, true], state, [
      {name: 'SET_TASK_COMPLETE', payload: [0, true]},
      {name: 'SET_DATE_COMPLETED', payload: [0, '2016-01-01T00:00:00.000Z']},
      {name: 'SET_COMPLETED_BY', payload: [0, 'username']},
      {name: 'SET_TASK_DUE_DATE', payload: [0, null]},
      {name: 'SET_DUE_DATE_DIFFERENCE', payload: [0, null]},
      {name: 'SORT_TASKS', payload: [0, 0]}
    ], done)
  })

  it('dispatches SET_TASK_COMPLETE, SORT_TASKS, SET_SAVE_BUTTON on true without another complete', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/list-services': {
        updateList (username, listid, tasks, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      },
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: false
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: false
          }
        ]
      }
    }

    testAction(itemActions.completeTask, [0, true], state, [
      {name: 'SET_TASK_COMPLETE', payload: [0, true]},
      {name: 'SET_DATE_COMPLETED', payload: [0, '2016-01-01T00:00:00.000Z']},
      {name: 'SET_COMPLETED_BY', payload: [0, 'username']},
      {name: 'SET_TASK_DUE_DATE', payload: [0, null]},
      {name: 'SET_DUE_DATE_DIFFERENCE', payload: [0, null]},
      {name: 'SORT_TASKS', payload: [0, 1]}
    ], done)
  })

  it('dispatches SET_TASK_COMPLETE, SORT_TASKS, SET_SAVE_BUTTON on false', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/list-services': {
        updateList (username, listid, tasks, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      },
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: true,
            completedBy: 'username'
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true
          }
        ]
      }
    }

    testAction(itemActions.completeTask, [0, false], state, [
      {name: 'SET_TASK_COMPLETE', payload: [0, false]},
      {name: 'SET_DATE_COMPLETED', payload: [0, null]},
      {name: 'SET_COMPLETED_BY', payload: [0, null]},
      {name: 'SORT_TASKS', payload: [0, 0]}
    ], done)
  })

  it('dispatches SET_TASK_COMPLETE, SORT_TASKS, SET_SAVE_BUTTON when after another complete', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/list-services': {
        updateList (username, listid, tasks, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      },
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: true
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true
          }
        ]
      }
    }
    testAction(itemActions.completeTask, [1, true], state, [
      {name: 'SET_TASK_COMPLETE', payload: [1, true]},
      {name: 'SET_DATE_COMPLETED', payload: [1, '2016-01-01T00:00:00.000Z']},
      {name: 'SET_COMPLETED_BY', payload: [1, 'username']},
      {name: 'SET_TASK_DUE_DATE', payload: [1, null]},
      {name: 'SET_DUE_DATE_DIFFERENCE', payload: [1, null]},
      {name: 'SORT_TASKS', payload: [1, 0]}
    ], done)
  })

  it('dispatches SET_TASK_COMPLETE, SORT_TASKS, etc., and undoes, on error', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/list-services': {
        updateList (username, listid, tasks, cb) {
          cb('Error!', { status: 500 })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      },
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: false,
            dateCompleted: '',
            dueDate: '',
            _dueDateDifference: null
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            dateCompleted: '',
            dueDate: '',
            _dueDateDifference: null
          }
        ]
      }
    }
    testAction(itemActions.completeTask, [0, true], state, [
      { name: 'SET_TASK_COMPLETE', payload: [0, true] },
      { name: 'SET_DATE_COMPLETED', payload: [0, '2016-01-01T00:00:00.000Z'] },
      { name: 'SET_COMPLETED_BY', payload: [0, 'username'] },
      { name: 'SET_TASK_DUE_DATE', payload: [0, null] },
      { name: 'SET_DUE_DATE_DIFFERENCE', payload: [0, null] },
      { name: 'SORT_TASKS', payload: [0, 0] },
      { name: 'SET_TASK_COMPLETE', payload: [0, false] },
      { name: 'SET_DATE_COMPLETED', payload: [0, null] },
      { name: 'SET_COMPLETED_BY', payload: [0, null] },
      { name: 'SORT_TASKS', payload: [0, 0] }
    ], done)
  })

  it('dispatches SET_TASK_COMPLETE, SORT_TASKS, etc., and undoes, on error (previously complete)', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/list-services': {
        updateList (username, listid, tasks, cb) {
          cb('Error!', { status: 500 })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      },
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: true,
            completedBy: 'username',
            dateCompleted: '',
            dueDate: '',
            _dueDateDifference: null
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            dateCompleted: '',
            dueDate: '',
            _dueDateDifference: null
          }
        ]
      }
    }
    testAction(itemActions.completeTask, [0, false], state, [
      { name: 'SET_TASK_COMPLETE', payload: [0, false] },
      { name: 'SET_DATE_COMPLETED', payload: [0, null] },
      { name: 'SET_COMPLETED_BY', payload: [0, null] },
      { name: 'SORT_TASKS', payload: [0, 0] },
      { name: 'SET_TASK_COMPLETE', payload: [0, true] },
      { name: 'SET_DATE_COMPLETED', payload: [0, '2016-01-01T00:00:00.000Z'] },
      { name: 'SET_COMPLETED_BY', payload: [0, 'username'] },
      { name: 'SORT_TASKS', payload: [0, 0] }
    ], done)
  })
})
