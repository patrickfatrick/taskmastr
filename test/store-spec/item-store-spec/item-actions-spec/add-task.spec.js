/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
import itemActionsInjector from 'inject-loader!../../../../src/store/item-store/item-actions'

chai.should()

describe('addTask', () => {
  it('dispatches ADD_TASK', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        createItem (listid, task, username, cb) {
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
        current: true,
        _delete: false,
        items: []
      }
    }

    const task = {
      id: 'id',
      item: 'New task'
    }

    testAction(itemActions.addTask, task, state, [
      { name: 'ADD_TASK', payload: task }
    ], done)
  })

  it('dispatches ADD_TASK and REMOVE_TASK on error', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        createItem (listid, task, username, cb) {
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
        current: true,
        _delete: false,
        items: []
      }
    }

    const task = {
      id: 'id',
      item: 'New task'
    }

    testAction(itemActions.addTask, task, state, [
      { name: 'ADD_TASK', payload: task },
      { name: 'REMOVE_TASK', payload: 0 }
    ], done)
  })
})
