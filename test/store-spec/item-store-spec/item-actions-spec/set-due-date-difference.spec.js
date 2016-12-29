/* global describe it sinon beforeEach afterEach */
import chai from 'chai'
import { testAction } from '../../test-action'
import { setDueDateDifference } from '../../../../src/store/item-store/item-actions'

chai.should()

describe('setDueDateDifference', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers(Date.parse(2016, 1, 1, 6, 0, 0))
  })

  afterEach(() => {
    clock.restore()
  })

  it('dispatches SET_DUE_DATE_DIFFERENCE with dueDate', (done) => {
    const dueDate = Date.parse(new Date()) + (1000 * 60 * 60 * 24)
    const index = 0

    testAction(setDueDateDifference, { index, dueDate }, {}, [
      { name: 'SET_DUE_DATE_DIFFERENCE', payload: { index: 0, n: 1 } }
    ], done)
  })

  it('dispatches SET_DUE_DATE_DIFFERENCE with a past dueDate', (done) => {
    const dueDate = Date.parse(new Date()) - (1000 * 60 * 60 * 24)
    const index = 0

    testAction(setDueDateDifference, { index, dueDate }, {}, [
      { name: 'SET_DUE_DATE_DIFFERENCE', payload: { index: 0, n: -1 } }
    ], done)
  })

  it('dispatches SET_DUE_DATE_DIFFERENCE without a dueDate', (done) => {
    const dueDate = null
    const index = 0

    testAction(setDueDateDifference, { index, dueDate }, {}, [
      { name: 'SET_DUE_DATE_DIFFERENCE', payload: { index: 0, n: null } }
    ], done)
  })
})
