/* global describe it */
import chai from 'chai'
import { testAction } from '../test-action'
import { unmountList } from '../../../public/store/list-store/list-actions'

chai.should()

describe('unmountList', () => {
  it('dispatches SET_CURRENT_LIST', (done) => {
    testAction(unmountList, 0, {}, [
      { name: 'SET_CURRENT_LIST', payload: null }
    ], done)
  })
})
