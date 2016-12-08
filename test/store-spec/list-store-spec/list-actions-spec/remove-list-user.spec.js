/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
import listActionsInjector from 'inject!../../../../public/store/list-store/list-actions'

chai.should()

describe('removeListUser', () => {
  const state = {
    user: {
      username: 'username',
      tasks: [
        {
          id: 'listid',
          list: 'List 1'
        }
      ]
    }
  }

  it('dispatches REMOVE_LIST_USER', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeUser (user, listid, body, cb) {
          cb(null, { success: true })
        }
      }
    })

    testAction(listActions.removeListUser, { index: 0, user: { username: 'username' } }, state, [
      { name: 'REMOVE_LIST_USER', payload: { index: 0, user: { username: 'username' } } }
    ], done)
  })

  it('dispatches REMOVE_LIST_USER on error', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeUser (user, listid, body, cb) {
          cb('Error!', { status: 500 })
        }
      }
    })

    testAction(listActions.removeListUser, { index: 0, user: { username: 'username' } }, state, [
      { name: 'REMOVE_LIST_USER', payload: { index: 0, user: { username: 'username' } } },
      { name: 'ADD_LIST_USER', payload: { index: 0, user: { username: 'username' } } }
    ], done)
  })
})
