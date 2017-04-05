/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
import listActionsInjector from 'inject-loader!../../../../src/store/list-store/list-actions' // eslint-disable-line import/no-webpack-loader-syntax

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

    testAction(listActions.renameList, { index: 0, name: 'List 0' }, state, [
      { name: 'RENAME_LIST', payload: { index: 0, name: 'List 0' } }
    ], done)
  })

  it('dispatches RENAME_LIST twice on error', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        updateList (user, listid, body, cb) {
          cb(new Error('Error!'), { status: 500 })
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

    testAction(listActions.renameList, { index: 0, name: 'List 0' }, state, [
      { name: 'RENAME_LIST', payload: { index: 0, name: 'List 0' } },
      { name: 'RENAME_LIST', payload: { index: 0, name: 'List 1' } }
    ], done)
  })
})
