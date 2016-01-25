/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
const actionsInjector = require('inject!../../../public/store/actions')

chai.should()

describe('resetPassword', () => {
  it('dispatches SET_USERNAME on success', done => {
    const actions = actionsInjector({
      '../services/user-services': {
        reset (token, newKey, cb) {
          cb({username: 'username'})
        }
      }
    })

    testAction(actions.default.resetPassword, ['token', 'newKey', true], {}, [
      {name: 'SET_USERNAME', payload: ['username']}
    ], done)
  })

  it('dispatches RESET_FAIL on failure', done => {
    const actions = actionsInjector({
      '../services/user-services': {
        reset (token, newKey, cb) {
          cb({error: 401, msg: 'Invalid link'})
        }
      }
    })

    testAction(actions.default.resetPassword, ['token', 'newKey', true], {}, [
      {name: 'SET_RESET_FAIL', payload: ['Invalid link']}
    ], done)
  })

  it('does nothing if form is invalid', done => {
    const actions = actionsInjector({
      '../services/user-services': {
        reset (token, newKey, cb) {
          cb({})
        }
      }
    })

    testAction(actions.default.resetPassword, ['token', '', false], {}, [], done)
  })
})
