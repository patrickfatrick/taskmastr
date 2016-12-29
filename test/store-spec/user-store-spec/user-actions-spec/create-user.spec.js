/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
import { newUser } from '../../../user-mocks'
const userActionsInjector = require('inject!../../../../src/store/user-store/user-actions')

chai.should()

describe('createUser', () => {
  it('logs in on success', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        create (username, key, rememberMe, cb) {
          cb(null, newUser)
        }
      }
    })

    testAction(userActions.createUser, { username: 'username', key: 'password', rememberMe: false }, {}, [
      { name: 'SET_USERNAME', payload: 'username' },
      { name: 'SET_KEY', payload: '' },
      { name: 'SET_CONFIRM', payload: '' },
      { name: 'SET_DARKMODE', payload: true },
      { name: 'SET_AUTH', payload: 'username' }
    ], done)
  })

  it('does not log in on fail', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        create (username, key, rememberMe, cb) {
          cb('Error', { status: 400 })
        }
      }
    })

    testAction(userActions.createUser, { username: 'username', key: 'password', rememberMe: false }, {}, [
      { name: 'SET_CREATE_FAIL', payload: 'Error' },
      { name: 'SET_CONFIRM_ATTEMPT', payload: true }
    ], done)
  })
})
