/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
import actions from '../../../public/store/actions'

chai.should()

describe('addList', () => {
  it('dispatches ADD_LIST and SET_SAVE_BUTTON', (done) => {
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
          }
        ]
      }
    }
    let newList = {
      id: 'listid2',
      list: 'List 2',
      items: [
        {
          id: 'itemid2',
          item: 'Item 2'
        }
      ]
    }

    testAction(actions.addList, [newList], state, [
      {name: 'ADD_LIST', payload: [newList]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })
})
