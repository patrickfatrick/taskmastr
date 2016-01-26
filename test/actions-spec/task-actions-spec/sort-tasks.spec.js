/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
import actions from '../../../public/store/actions'

chai.should()

describe('sortTasks', () => {
  it('dispatches SORT_TASKS and SET_SAVE_BUTTON when moving down', done => {
    testAction(actions.sortTasks, [0, 1], {}, [
      {name: 'SORT_TASKS', payload: [0, 1]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })

  it('dispatches SORT_TASKS and SET_SAVE_BUTTON when moving up', done => {
    testAction(actions.sortTasks, [1, 0], {}, [
      {name: 'SORT_TASKS', payload: [1, 0]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })
})
