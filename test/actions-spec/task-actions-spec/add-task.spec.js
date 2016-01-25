/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
const actionsInjector = require('inject!../../../public/store/actions')

chai.should()

describe('addTask', () => {
  it('dispatches ADD_TASK and SET_SAVE_BUTTON', done => {
    const actions = actionsInjector({})
    let task = {
      id: 'id',
      item: 'New task'
    }
    testAction(actions.default.addTask, [task], {}, [
      {name: 'ADD_TASK', payload: [task]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })
})
