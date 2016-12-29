/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
import itemActionsInjector from 'inject!../../../../src/store/item-store/item-actions'

chai.should()

describe('sortTasks', () => {
  it('dispatches SORT_TASKS when moving down', (done) => {
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

    testAction(itemActions.sortTasks, { oldIndex: 0, newIndex: 1 }, state, [
      { name: 'SORT_TASKS', payload: { oldIndex: 0, newIndex: 1 } }
    ], done)
  })

  it('dispatches SORT_TASKS when moving up', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/list-services': {
        updateList (username, listid, tasks, cb) {
          cb(null, { sucess: true })
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

    testAction(itemActions.sortTasks, { oldIndex: 1, newIndex: 0 }, state, [
      { name: 'SORT_TASKS', payload: { oldIndex: 1, newIndex: 0 } }
    ], done)
  })

  it('dispatches SORT_TASKS twice on error', (done) => {
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

    testAction(itemActions.sortTasks, { oldIndex: 0, newIndex: 1 }, state, [
      { name: 'SORT_TASKS', payload: { oldIndex: 0, newIndex: 1 } },
      { name: 'SORT_TASKS', payload: { oldIndex: 1, newIndex: 0 } }
    ], done)
  })
})
