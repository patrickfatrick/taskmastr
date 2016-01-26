/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
import actions from '../../../public/store/actions'

chai.should()

describe('sortLists', () => {
  it('dispatches SORT_TASKS and SET_SAVE_BUTTON when moving down', done => {
    testAction(actions.sortLists, [0, 1], {}, [
      {name: 'SORT_LISTS', payload: [0, 1]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })

  it('dispatches SORT_LISTS and SET_SAVE_BUTTON when moving up', done => {
    testAction(actions.sortLists, [1, 0], {}, [
      {name: 'SORT_LISTS', payload: [1, 0]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })
})
