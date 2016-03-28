/* global describe it */
import chai from 'chai'
import { testAction } from '../test-action'
import itemActionsInjector from 'inject!../../../public/store/item-store/item-actions'

chai.should()

describe('setTaskNotes', () => {
  it('dispatches SET_TASK_NOTES', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        updateItem (listid, itemid, index, item, username, cb) {
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
            notes: ''
          }
        ]
      }
    }
    testAction(itemActions.setTaskNotes, [0, 'Notes'], state, [
      { name: 'SET_TASK_NOTES', payload: [0, 'Notes'] }
    ], done)
  })

  it('dispatches SET_TASK_NOTES twice on error', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        updateItem (listid, itemid, index, item, username, cb) {
          cb('Error!', { status: 500 })
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
            notes: ''
          }
        ]
      }
    }
    testAction(itemActions.setTaskNotes, [0, 'Notes'], state, [
      { name: 'SET_TASK_NOTES', payload: [0, 'Notes'] },
      { name: 'SET_TASK_NOTES', payload: [0, ''] }
    ], done)
  })
})
