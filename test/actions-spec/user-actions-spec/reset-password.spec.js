/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
const userActionsInjector = require('inject!../../../public/store/user-store/user-actions')

chai.should()

describe('resetPassword', () => {
  it('dispatches SET_USERNAME on success', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        reset (token, newKey, cb) {
          cb(null, {username: 'username'})
        }
      }
    })

    testAction(userActions.resetPassword, ['token', 'newKey'], {}, [
      {name: 'SET_USERNAME', payload: ['username']}
    ], done)
  })

  it('dispatches RESET_FAIL on failure', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        reset (token, newKey, cb) {
          cb('Invalid link', {status: 401})
        }
      }
    })

    testAction(userActions.resetPassword, ['token', 'newKey'], {}, [
      {name: 'SET_RESET_FAIL', payload: ['Invalid link']}
    ], done)
  })
})
