/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
const actionsInjector = require('inject!../../../public/store/actions')

chai.should()

describe('sortTasks', () => {
  it('dispatches SORT_TASKS and SET_SAVE_BUTTON when moving down', done => {
    const actions = actionsInjector({})

    testAction(actions.default.sortTasks, [0, 1], {}, [
      {name: 'SORT_TASKS', payload: [0, 1]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })

  it('dispatches SORT_TASKS and SET_SAVE_BUTTON when moving up', done => {
    const actions = actionsInjector({})

    testAction(actions.default.sortTasks, [1, 0], {}, [
      {name: 'SORT_TASKS', payload: [1, 0]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })
})
