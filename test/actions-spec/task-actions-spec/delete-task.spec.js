/* global describe it sinon beforeEach afterEach */
import chai from 'chai'
import { testAction } from '../test-action'
import itemActionsInjector from 'inject!../../../public/store/item-store/item-actions'

chai.should()

describe('deleteTask', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('dispatches task deletion mutations when not current nor _delete', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        deleteItem (listid, taskid, deleteTask, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: false,
            _delete: false
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            _delete: false
          }
        ]
      }
    }

    testAction(itemActions.deleteTask, [0], state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: ['itemid', 7] },
      { name: 'SET_TASK_DELETE', payload: [0, true] },
      { name: 'DELETE_AGENDA', payload: ['itemid'] },
      { name: 'UPDATE_DELETE_QUEUE', payload: ['itemid', null] },
      { name: 'SET_TASK_DELETE', payload: [0, false] },
      { name: 'REMOVE_TASK', payload: [0] }
    ], done)

    clock.tick(5000)
  })

  it('dispatches task deletion mutations when index is 0 and current', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        deleteItem (listid, taskid, deleteTask, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: false,
            current: true,
            _delete: false
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            current: false,
            _delete: false
          }
        ]
      }
    }
    testAction(itemActions.deleteTask, [0], state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: ['itemid', 8] },
      { name: 'SET_TASK_DELETE', payload: [0, true] },
      { name: 'SET_CURRENT_TASK', payload: [1] },
      { name: 'DELETE_AGENDA', payload: ['itemid'] },
      { name: 'UPDATE_DELETE_QUEUE', payload: ['itemid', null] },
      { name: 'SET_TASK_DELETE', payload: [0, false] },
      { name: 'REMOVE_TASK', payload: [0] }
    ], done)

    clock.tick(5000)
  })

  it('dispatches task deletion mutations when index is last and current', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        deleteItem (listid, taskid, deleteTask, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: false,
            current: false,
            _delete: false
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            current: true,
            _delete: false
          }
        ]
      }
    }

    testAction(itemActions.deleteTask, [1], state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: ['itemid2', 9] },
      { name: 'SET_TASK_DELETE', payload: [1, true] },
      { name: 'SET_CURRENT_TASK', payload: [0] },
      { name: 'DELETE_AGENDA', payload: ['itemid2'] },
      { name: 'UPDATE_DELETE_QUEUE', payload: ['itemid2', null] },
      { name: 'SET_TASK_DELETE', payload: [1, false] },
      { name: 'REMOVE_TASK', payload: [1] }
    ], done)

    clock.tick(5000)
  })

  it('undoes task deletion mutations when _delete', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        deleteItem (listid, taskid, deleteTask, cb) {
          cb(null, { success: true })
        }
      }
    })

    let state = {
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: false,
            current: true,
            _delete: true
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            current: false,
            _delete: false
          }
        ]
      },
      deleteQueue: {
        itemid: 4
      }
    }

    testAction(itemActions.deleteTask, [0], state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: ['itemid', null] },
      { name: 'SET_TASK_DELETE', payload: [0, false] }
    ], done)
  })

  it('dispatches ADD_TASK on error', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        deleteItem (listid, taskid, deleteTask, cb) {
          cb('Error!', { status: false })
        }
      }
    })

    const state = {
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: false,
            _delete: false
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            _delete: false
          }
        ]
      }
    }

    testAction(itemActions.deleteTask, [0], state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: ['itemid', 10] },
      { name: 'SET_TASK_DELETE', payload: [0, true] },
      { name: 'DELETE_AGENDA', payload: ['itemid'] },
      { name: 'UPDATE_DELETE_QUEUE', payload: ['itemid', null] },
      { name: 'SET_TASK_DELETE', payload: [0, false] },
      { name: 'REMOVE_TASK', payload: [0] },
      { name: 'ADD_TASK', payload: [state.current.items[0]] }
    ], done)

    clock.tick(5000)
  })
})
