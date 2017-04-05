/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
import listActionsInjector from 'inject-loader!../../../../src/store/list-store/list-actions' // eslint-disable-line import/no-webpack-loader-syntax

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

    testAction(listActions.sortLists, { oldIndex: 0, newIndex: 1 }, state, [
      { name: 'SORT_LISTS', payload: { oldIndex: 0, newIndex: 1 } }
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

    testAction(listActions.sortLists, { oldIndex: 1, newIndex: 0 }, state, [
      { name: 'SORT_LISTS', payload: { oldIndex: 1, newIndex: 0 } }
    ], done)
  })

  it('dispatches SORT_LISTS twice on error', (done) => {
    const listActions = listActionsInjector({
      '../../services/user-services': {
        updateUser (username, body, cb) {
          cb(new Error('Error!'), { status: 500 })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      }
    }

    testAction(listActions.sortLists, { oldIndex: 0, newIndex: 1 }, state, [
      { name: 'SORT_LISTS', payload: { oldIndex: 0, newIndex: 1 } },
      { name: 'SORT_LISTS', payload: { oldIndex: 1, newIndex: 0 } }
    ], done)
  })
})
