/* global describe it sinon beforeEach afterEach*/
import chai from 'chai'
import {testAction} from '../test-action'
import actions from '../../../public/store/actions'

chai.should()

describe('completeTask', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers(Date.parse(2016, 1, 1, 6, 0, 0))
  })

  afterEach(() => {
    clock.restore()
  })

  it('dispatches SET_TASK_COMPLETE, SORT_TASKS, SET_SAVE_BUTTON with another complete', (done) => {
    let state = {
      user: {
        current: {
          id: 'listid',
          list: 'List 1',
          items: [
            {
              id: 'itemid',
              item: 'Item 1',
              complete: false,
              dateCompleted: '',
              dueDate: '',
              _dueDateDifference: null
            },
            {
              id: 'itemid2',
              item: 'Item 2',
              complete: true,
              dateCompleted: '',
              dueDate: '',
              _dueDateDifference: null
            }
          ]
        }
      }
    }
    testAction(actions.completeTask, [0, true], state, [
      {name: 'SET_TASK_COMPLETE', payload: [0, true]},
      {name: 'SET_DATE_COMPLETED', payload: [0, '2016-01-01T00:00:00.000Z']},
      {name: 'SET_TASK_DUE_DATE', payload: [0, null]},
      {name: 'SET_DUE_DATE_DIFFERENCE', payload: [0, null]},
      {name: 'SORT_TASKS', payload: [0, 0]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })

  it('dispatches SET_TASK_COMPLETE, SORT_TASKS, SET_SAVE_BUTTON on true without another complete', (done) => {
    let state = {
      user: {
        current: {
          id: 'listid',
          list: 'List 1',
          items: [
            {
              id: 'itemid',
              item: 'Item 1',
              complete: false
            },
            {
              id: 'itemid2',
              item: 'Item 2',
              complete: false
            }
          ]
        }
      }
    }
    testAction(actions.completeTask, [0, true], state, [
      {name: 'SET_TASK_COMPLETE', payload: [0, true]},
      {name: 'SET_DATE_COMPLETED', payload: [0, '2016-01-01T00:00:00.000Z']},
      {name: 'SET_TASK_DUE_DATE', payload: [0, null]},
      {name: 'SET_DUE_DATE_DIFFERENCE', payload: [0, null]},
      {name: 'SORT_TASKS', payload: [0, 2]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })

  it('dispatches SET_TASK_COMPLETE, SORT_TASKS, SET_SAVE_BUTTON on false', (done) => {
    let state = {
      user: {
        current: {
          id: 'listid',
          list: 'List 1',
          items: [
            {
              id: 'itemid',
              item: 'Item 1',
              complete: true
            },
            {
              id: 'itemid2',
              item: 'Item 2',
              complete: true
            }
          ]
        }
      }
    }
    testAction(actions.completeTask, [0, false], state, [
      {name: 'SET_TASK_COMPLETE', payload: [0, false]},
      {name: 'SET_DATE_COMPLETED', payload: [0, null]},
      {name: 'SORT_TASKS', payload: [0, 0]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })

  it('dispatches SET_TASK_COMPLETE, SORT_TASKS, SET_SAVE_BUTTON when after another complete', (done) => {
    let state = {
      user: {
        current: {
          id: 'listid',
          list: 'List 1',
          items: [
            {
              id: 'itemid',
              item: 'Item 1',
              complete: true
            },
            {
              id: 'itemid2',
              item: 'Item 2',
              complete: true
            }
          ]
        }
      }
    }
    testAction(actions.completeTask, [1, true], state, [
      {name: 'SET_TASK_COMPLETE', payload: [1, true]},
      {name: 'SET_DATE_COMPLETED', payload: [1, '2016-01-01T00:00:00.000Z']},
      {name: 'SET_TASK_DUE_DATE', payload: [1, null]},
      {name: 'SET_DUE_DATE_DIFFERENCE', payload: [1, null]},
      {name: 'SORT_TASKS', payload: [1, 0]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })
})
