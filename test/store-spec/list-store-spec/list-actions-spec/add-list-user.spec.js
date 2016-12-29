/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
import listActionsInjector from 'inject!../../../../src/store/list-store/list-actions'

chai.should()

describe('addListUser', () => {
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

  it('dispatches ADD_LIST_USER', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        inviteUser (user, listid, username, body, cb) {
          cb(null, { success: true })
        }
      }
    })

    testAction(listActions.addListUser, { index: 0, user: { username: 'username' } }, state, [
      { name: 'ADD_LIST_USER', payload: { index: 0, user: { username: 'username' } } }
    ], done)
  })

  it('dispatches REMOVE_LIST_USER on error', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        inviteUser (user, listid, username, users, cb) {
          cb('Error!', { status: 500 })
        }
      }
    })

    testAction(listActions.addListUser, { index: 0, user: { username: 'username' } }, state, [
      { name: 'ADD_LIST_USER', payload: { index: 0, user: { username: 'username' } } },
      { name: 'REMOVE_LIST_USER', payload: { index: 0, user: { username: 'username' } } }
    ], done)
  })
})
