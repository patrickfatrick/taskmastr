/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
import {mockUser} from '../../user-mocks'
const userActionsInjector = require('inject!../../../public/store/user-store/user-actions')

chai.should()

describe('loginUser', () => {
  it('logs in on success', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        login (username, key, rememberMe, cb) {
          cb(null, mockUser)
        }
      }
    })

    testAction(userActions.loginUser, { username: 'username', key: 'password', rememberMe: false }, {}, [
      {name: 'SET_USERNAME', payload: 'username'},
      {name: 'SET_KEY', payload: ''},
      {name: 'SET_DARKMODE', payload: true},
      {name: 'SET_TASKS', payload: mockUser.tasks},
      {name: 'SET_CURRENT_LIST', payload: mockUser.tasks[0]},
      {name: 'SET_AUTH', payload: 'username'}
    ], done)
  })

  it('dispatches SET_CREATE when no user found', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        login (username, key, rememberMe, cb) {
          cb('Error', {status: 204})
        }
      }
    })

    testAction(userActions.loginUser, { username: 'username', key: 'password', rememberMe: false }, {}, [
      {name: 'SET_CREATE', payload: true}
    ], done)
  })

  it('dispatches SET_INVALID_KEY on invalid password', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        login (username, key, rememberMe, cb) {
          cb('Invalid key', {status: 401})
        }
      }
    })

    testAction(userActions.loginUser, { username: 'username', key: 'password', rememberMe: false }, {}, [
      {name: 'SET_INVALID_KEY', payload: 'Invalid key'}
    ], done)
  })
})
