/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
import listActionsInjector from 'inject!../../../../src/store/list-store/list-actions'

chai.should()

describe('confirmListUser', () => {
  const state = {
    user: {
      username: 'username',
      tasks: [
        {
          _id: 'listid',
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
            _id: 'listid',
            currentItem: 'itemid',
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
      _id: 'listid',
      currentItem: 'itemid',
      list: 'List 1',
      dateCreated: 'somedate',
      owner: 'username',
      users: [],
      _deleting: false
    }

    testAction(listActions.confirmListUser, { _id: 'listid', username: 'username' }, state, [
      { name: 'ADD_LIST', payload: userList }
    ], done)
  })

  it('dispatches SET_USER_STATUS on error', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        confirmUser (user, listid, body, cb) {
          cb('Error!', {
            _id: 'listid',
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
            _id: 'listid',
            currentItem: 'itemid',
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
      _id: 'listid',
      list: 'List 1',
      dateCreated: 'somedate',
      owner: 'username',
      users: [],
      currentItem: 'itemid',
      _deleting: false
    }

    testAction(listActions.confirmListUser, { _id: 'listid', username: 'username' }, state, [
      { name: 'ADD_LIST', payload: userList },
      { name: 'REMOVE_LIST', payload: -1 }
    ], done)
  })
})
