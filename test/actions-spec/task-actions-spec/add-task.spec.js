/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
import actions from '../../../public/store/actions'

chai.should()

describe('addTask', () => {
  it('dispatches ADD_TASK and SET_SAVE_BUTTON', (done) => {
    let task = {
      id: 'id',
      item: 'New task'
    }
    testAction(actions.addTask, [task], {}, [
      {name: 'ADD_TASK', payload: [task]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })
})
