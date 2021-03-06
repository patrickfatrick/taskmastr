/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
import itemActionsInjector from 'inject-loader!../../../../src/store/item-store/item-actions' // eslint-disable-line import/no-webpack-loader-syntax

chai.should()

describe('setTaskDueDate', () => {
  it('dispatches SET_TASK_DUE_DATE', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        updateItem (listid, item, username, cb) {
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
            dueDate: '',
            _dueDateDifference: null
          }
        ]
      }
    }
    testAction(itemActions.setTaskDueDate, { index: 0, date: '2016-01-01T00:00:00.000Z' }, state, [
      { name: 'SET_TASK_DUE_DATE', payload: { index: 0, date: '2016-01-01T00:00:00.000Z' } }
    ], done)
  })

  it('dispatches SET_TASK_DUE_DATE twice on error, as well as SET_DUE_DATE_DIFFERENCE', (done) => {
    const itemActions = itemActionsInjector({
      '../../services/item-services': {
        updateItem (listid, item, username, cb) {
          cb(new Error('Error!'), { status: 500 })
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
            dueDate: '',
            _dueDateDifference: null
          }
        ]
      }
    }
    testAction(itemActions.setTaskDueDate, { index: 0, date: '2016-01-01T00:00:00.000Z' }, state, [
      { name: 'SET_TASK_DUE_DATE', payload: { index: 0, date: '2016-01-01T00:00:00.000Z' } },
      { name: 'SET_TASK_DUE_DATE', payload: { index: 0, date: '' } },
      { name: 'SET_DUE_DATE_DIFFERENCE', payload: { index: 0, n: null } }
    ], done)
  })
})
