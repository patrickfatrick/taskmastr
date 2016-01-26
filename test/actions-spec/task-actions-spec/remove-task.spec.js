/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
import actions from '../../../public/store/actions'

chai.should()

describe('removeTask', () => {
  it('dispatches REMOVE_TASK and SET_SAVE_BUTTON', done => {
    let state = {
      user: {
        current: [
          {
            id: 'listid',
            list: 'List 1',
            items: [
              {
                id: 'itemid',
                item: 'Item 1'
              }
            ]
          }
        ]
      }
    }
    testAction(actions.removeTask, [0], state, [
      {name: 'REMOVE_TASK', payload: [0]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })
})
