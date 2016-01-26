/* global describe it sinon beforeEach afterEach*/
import chai from 'chai'
import {testAction} from '../test-action'
import actions from '../../../public/store/actions'

chai.should()

describe('setDueDateDifference', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers(Date.parse(2016, 1, 1, 6, 0, 0))
  })

  afterEach(() => {
    clock.restore()
  })

  it('dispatches SET_DUE_DATE_DIFFERENCE with dueDate', done => {
    const dueDate = Date.parse(new Date()) + (1000 * 60 * 60 * 24)
    const index = 0

    testAction(actions.setDueDateDifference, [index, dueDate], {}, [
      {name: 'SET_DUE_DATE_DIFFERENCE', payload: [0, 1]}
    ], done)
  })

  it('dispatches SET_DUE_DATE_DIFFERENCE with a past dueDate', done => {
    const dueDate = Date.parse(new Date()) - (1000 * 60 * 60 * 24)
    const index = 0

    testAction(actions.setDueDateDifference, [index, dueDate], {}, [
      {name: 'SET_DUE_DATE_DIFFERENCE', payload: [0, -1]}
    ], done)
  })

  it('dispatches SET_DUE_DATE_DIFFERENCE without a dueDate', done => {
    const dueDate = null
    const index = 0

    testAction(actions.setDueDateDifference, [index, dueDate], {}, [
      {name: 'SET_DUE_DATE_DIFFERENCE', payload: [0, null]}
    ], done)
  })
})
