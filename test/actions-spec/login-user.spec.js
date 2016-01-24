/* global describe it */
import chai from 'chai'
import {testAction} from './test-action'
import {mockUser} from '../user-mocks'
const actionsInjector = require('inject!../../public/store/actions')

chai.should()

describe('loginUser', () => {
  it('logs in on success', done => {
    const actions = actionsInjector({
      '../services/user-services': {
        login (username, key, rememberMe, cb) {
          cb(mockUser)
        }
      }
    })

    testAction(actions.default.loginUser, ['username', 'password', false, true], {}, [
      {name: 'SET_USERNAME', payload: 'username'},
      {name: 'SET_KEY', payload: ''},
      {name: 'SET_DARKMODE', payload: true},
      {name: 'SET_TASKS', payload: mockUser.tasks},
      {name: 'SET_CURRENT_LIST', payload: 0},
      {name: 'SET_AUTH', payload: 'username'}
    ], done)
  })

  it('dispatches SET_CREATE when no user found', done => {
    const actions = actionsInjector({
      '../services/user-services': {
        login (username, key, rememberMe, cb) {
          cb({error: 204})
        }
      }
    })

    testAction(actions.default.loginUser, ['username', 'password', false, true], {}, [
      {name: 'SET_CREATE'}
    ], done)
  })

  it('dispatches SET_INVALID_KEY on invalid password', done => {
    const actions = actionsInjector({
      '../services/user-services': {
        login (username, key, rememberMe, cb) {
          cb({error: 401, msg: 'Invalid key'})
        }
      }
    })

    testAction(actions.default.loginUser, ['username', 'password', false, true], {}, [
      {name: 'SET_INVALID_KEY', payload: 'Invalid key'}
    ], done)
  })

  it('does nothing if form is invalid', done => {
    const actions = actionsInjector({
      '../services/user-services': {
        login (username, key, rememberMe, cb) {
          cb({})
        }
      }
    })

    testAction(actions.default.loginUser, ['username', 'password', false, false], {}, [], done)
  })
})
