/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
import actions from '../../../public/store/actions'

chai.should()

describe('completeTask', () => {
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
              complete: false
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
    testAction(actions.completeTask, [0, true], state, [
      {name: 'SET_TASK_COMPLETE', payload: [0, true]},
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
      {name: 'SORT_TASKS', payload: [1, 0]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })
})
