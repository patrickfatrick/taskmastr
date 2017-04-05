/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
import { newUser } from '../../../user-mocks'
import userActionsInjector from 'inject-loader!../../../../src/store/user-store/user-actions' // eslint-disable-line import/no-webpack-loader-syntax

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
      { name: 'SET_CONFIRM_KEY', payload: '' },
      { name: 'SET_DARKMODE', payload: true },
      { name: 'SET_AUTHENTICATED', payload: true }
    ], done)
  })

  it('does not log in on fail', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        create (username, key, rememberMe, cb) {
          cb(new Error('Error!'), { status: 400 })
        }
      }
    })

    testAction(userActions.createUser, { username: 'username', key: 'password', rememberMe: false }, {}, [
      { name: 'SET_CREATE_FAIL', payload: 'Error!' },
      { name: 'SET_CONFIRM_ATTEMPT', payload: true }
    ], done)
  })
})
