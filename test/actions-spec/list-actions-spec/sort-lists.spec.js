/* global describe it */
import chai from 'chai'
import { testAction } from '../test-action'
import listActionsInjector from 'inject!../../../public/store/list-store/list-actions'

chai.should()

describe('sortLists', () => {
  it('dispatches SORT_LISTSS when moving down', (done) => {
    const listActions = listActionsInjector({
      '../../services/user-services': {
        updateUser (username, body, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      }
    }

    testAction(listActions.sortLists, [0, 1], state, [
      { name: 'SORT_LISTS', payload: [0, 1] }
    ], done)
  })

  it('dispatches SORT_LISTS when moving up', (done) => {
    const listActions = listActionsInjector({
      '../../services/user-services': {
        updateUser (username, body, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      }
    }

    testAction(listActions.sortLists, [1, 0], state, [
      { name: 'SORT_LISTS', payload: [1, 0] }
    ], done)
  })

  it('dispatches SORT_LISTS twice on error', (done) => {
    const listActions = listActionsInjector({
      '../../services/user-services': {
        updateUser (username, body, cb) {
          cb('Error!', { status: 500 })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      }
    }

    testAction(listActions.sortLists, [0, 1], state, [
      { name: 'SORT_LISTS', payload: [0, 1] },
      { name: 'SORT_LISTS', payload: [1, 0] }
    ], done)
  })
})
