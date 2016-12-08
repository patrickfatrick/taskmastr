/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
import listActionsInjector from 'inject!../../../../public/store/list-store/list-actions'

chai.should()

describe('mountList', () => {
  it('dispatches SET_CURRENT_LIST', (done) => {
    const state = {
      user: {
        username: 'username',
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: true,
            _delete: false
          },
          {
            id: 'listid2',
            list: 'List 2',
            current: false,
            _delete: false
          }
        ]
      }
    }

    const listActions = listActionsInjector({
      '../../services/user-services': {
        updateUser (username, body, cb) {
          cb(null, { success: true })
        }
      },
      '../../services/list-services': {
        getList (id, cb) {
          cb(null, state.user.tasks[1])
        }
      }
    })

    testAction(listActions.mountList, 0, state, [
      { name: 'SET_CURRENT_LIST', payload: state.user.tasks[1] },
      { name: 'SET_INVALID_LIST', payload: false }
    ], done)
  })

  it('dispatches SET_INVALID_LIST on error', (done) => {
    const state = {
      user: {
        username: 'username',
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: true,
            _delete: false
          },
          {
            id: 'listid2',
            list: 'List 2',
            current: false,
            _delete: false
          }
        ]
      }
    }

    const listActions = listActionsInjector({
      '../../services/user-services': {
        updateUser (username, body, cb) {
          cb('Error!', { status: 500 })
        }
      },
      '../../services/list-services': {
        getList (id, cb) {
          cb('Error!', { status: 404 })
        }
      }
    })

    testAction(listActions.mountList, 0, state, [
      { name: 'SET_INVALID_LIST', payload: 'Error!' }
    ], done)
  })

  it('dispatches SET_CURRENT_LIST twice on error', (done) => {
    const state = {
      user: {
        username: 'username',
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: true,
            _delete: false
          },
          {
            id: 'listid2',
            list: 'List 2',
            current: false,
            _delete: false
          }
        ]
      }
    }

    const listActions = listActionsInjector({
      '../../services/user-services': {
        updateUser (username, body, cb) {
          cb('Error!', { status: 500 })
        }
      },
      '../../services/list-services': {
        getList (id, cb) {
          cb(null, state.user.tasks[1])
        }
      }
    })

    testAction(listActions.mountList, 0, state, [
      { name: 'SET_CURRENT_LIST', payload: state.user.tasks[1] },
      { name: 'SET_INVALID_LIST', payload: false },
      { name: 'SET_CURRENT_LIST', payload: state.user.tasks[0] }
    ], done)
  })
})
