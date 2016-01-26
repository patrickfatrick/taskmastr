/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
import actions from '../../../public/store/actions'

chai.should()

describe('removeList', () => {
  it('dispatches REMOVE_LIST and SET_SAVE_BUTTON', done => {
    let state = {
      user: {
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            items: [
              {
                id: 'itemid',
                item: 'Item 1'
              }
            ]
          },
          {
            id: 'listid2',
            list: 'List 2',
            items: [
              {
                id: 'itemid2',
                item: 'Item 2'
              }
            ]
          }
        ]
      }
    }
    testAction(actions.removeList, [0], state, [
      {name: 'REMOVE_LIST', payload: [0]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })
})
