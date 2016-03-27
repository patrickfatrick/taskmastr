/* global describe it */
import chai from 'chai'
import { testAction } from '../test-action'
import listActionsInjector from 'inject!../../../public/store/list-store/list-actions'

chai.should()

describe('renameList', () => {
  it('dispatches RENAME_LIST', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        updateList (user, listid, body, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        username: 'username',
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: true,
            _delete: false
          }
        ]
      }
    }

    testAction(listActions.renameList, [0, 'List 0'], state, [
      { name: 'RENAME_LIST', payload: [0, 'List 0'] }
    ], done)
  })

  it('dispatches RENAME_LIST twice on error', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        updateList (user, listid, body, cb) {
          cb('Error!', { status: 500 })
        }
      }
    })

    const state = {
      user: {
        username: 'username',
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: true,
            _delete: false
          }
        ]
      }
    }

    testAction(listActions.renameList, [0, 'List 0'], state, [
      { name: 'RENAME_LIST', payload: [0, 'List 0'] },
      { name: 'RENAME_LIST', payload: [0, 'List 1'] }
    ], done)
  })
})
