/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
import listActionsInjector from 'inject!../../../../public/store/list-store/list-actions'

chai.should()

describe('confirmListUser', () => {
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

  it('dispatches CONFIRM_LIST_USER', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        confirmUser (user, listid, body, cb) {
          cb(null, {
            id: 'listid',
            list: 'List 1',
            dateCreated: 'somedate',
            owner: 'username',
            users: []
          })
        }
      },
      '../../services/user-services': {
        updateUser (username, body, cb) {
          cb(null, { success: true })
        }
      }
    })

    const userList = {
      id: 'listid',
      list: 'List 1',
      dateCreated: 'somedate',
      owner: 'username',
      users: [],
      current: true,
      _deleting: false
    }

    testAction(listActions.confirmListUser, { id: 'listid', username: 'username' }, state, [
      { name: 'ADD_LIST', payload: userList }
    ], done)
  })

  it('dispatches SET_USER_STATUS on error', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        confirmUser (user, listid, body, cb) {
          cb('Error!', {
            id: 'listid',
            list: 'List 1',
            dateCreated: 'somedate',
            owner: 'username',
            users: []
          })
        }
      },
      '../../services/user-services': {
        updateUser (username, body, cb) {
          cb(null, { success: true })
        }
      }
    })

    testAction(listActions.confirmListUser, { listid: 'listid', username: 'username' }, state, [
      { name: 'SET_USER_STATUS', payload: { id: 'listid', username: 'username', status: 'pending' } }
    ], done)
  })

  it('dispatches REMOVE_LIST on error', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        confirmUser (user, listid, body, cb) {
          cb(null, {
            id: 'listid',
            list: 'List 1',
            dateCreated: 'somedate',
            owner: 'username',
            users: []
          })
        }
      },
      '../../services/user-services': {
        updateUser (username, body, cb) {
          cb('Error!', { status: 500 })
        }
      }
    })

    const userList = {
      id: 'listid',
      list: 'List 1',
      dateCreated: 'somedate',
      owner: 'username',
      users: [],
      current: true,
      _deleting: false
    }

    testAction(listActions.confirmListUser, { id: 'listid', username: 'username' }, state, [
      { name: 'ADD_LIST', payload: userList },
      { name: 'REMOVE_LIST', payload: -1 }
    ], done)
  })
})
