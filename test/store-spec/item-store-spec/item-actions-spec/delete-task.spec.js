/* global describe it sinon beforeEach afterEach */
import chai from 'chai'
import { testAction } from '../../test-action'
import itemActionsInjector from 'inject!../../../../public/store/item-store/item-actions'

chai.should()

describe('deleteTask', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('dispatches task deletion mutations when not current nor _deleting', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        deleteItem (listid, taskid, deleteTask, username, cb) {
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
            _deleting: false
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            _deleting: false
          }
        ]
      }
    }

    testAction(itemActions.deleteTask, 0, state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'itemid', val: 6 } },
      { name: 'SET_TASK_DELETE', payload: { index: 0, bool: true } },
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'itemid', val: null } },
      { name: 'SET_TASK_DELETE', payload: { index: 0, bool: false } },
      { name: 'REMOVE_TASK', payload: 0 }
    ], done)

    clock.tick(5000)
  })

  it('dispatches task deletion mutations when index is 0 and current', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        deleteItem (listid, taskid, deleteTask, username, cb) {
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
            current: true,
            _deleting: false
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            current: false,
            _deleting: false
          }
        ]
      }
    }
    testAction(itemActions.deleteTask, 0, state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'itemid', val: 7 } },
      { name: 'SET_TASK_DELETE', payload: { index: 0, bool: true } },
      { name: 'SET_CURRENT_TASK', payload: 1 },
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'itemid', val: null } },
      { name: 'SET_TASK_DELETE', payload: { index: 0, bool: false } },
      { name: 'REMOVE_TASK', payload: 0 }
    ], done)

    clock.tick(5000)
  })

  it('dispatches task deletion mutations when index is last and current', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        deleteItem (listid, taskid, deleteTask, username, cb) {
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
            current: false,
            _deleting: false
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            current: true,
            _deleting: false
          }
        ]
      }
    }

    testAction(itemActions.deleteTask, 1, state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'itemid2', val: 8 } },
      { name: 'SET_TASK_DELETE', payload: { index: 1, bool: true } },
      { name: 'SET_CURRENT_TASK', payload: { index: 0 } },
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'itemid2', val: null } },
      { name: 'SET_TASK_DELETE', payload: { index: 1, bool: false } },
      { name: 'REMOVE_TASK', payload: 1 }
    ], done)

    clock.tick(5000)
  })

  it('undoes task deletion mutations when _delete', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        deleteItem (listid, taskid, deleteTask, username, cb) {
          cb(null, { success: true })
        }
      }
    })

    let state = {
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
            current: true,
            _deleting: true
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            current: false,
            _deleting: false
          }
        ]
      },
      deleteQueue: {
        itemid: 4
      }
    }

    testAction(itemActions.deleteTask, 0, state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'itemid', val: null } },
      { name: 'SET_TASK_DELETE', payload: { index: 0, bool: false } }
    ], done)
  })

  it('dispatches ADD_TASK on error', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        deleteItem (listid, taskid, deleteTask, username, cb) {
          cb('Error!', { status: false })
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
            _deleting: false
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            _deleting: false
          }
        ]
      }
    }

    testAction(itemActions.deleteTask, 0, state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'itemid', val: 9 } },
      { name: 'SET_TASK_DELETE', payload: { index: 0, bool: true } },
      { name: 'UPDATE_DELETE_QUEUE', payload: { id: 'itemid', val: null } },
      { name: 'SET_TASK_DELETE', payload: { index: 0, bool: false } },
      { name: 'REMOVE_TASK', payload: 0 },
      { name: 'ADD_TASK', payload: state.current.items[0] }
    ], done)

    clock.tick(5000)
  })
})
