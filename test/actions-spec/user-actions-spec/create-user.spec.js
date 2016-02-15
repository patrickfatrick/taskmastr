/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
import {newUser} from '../../user-mocks'
const actionsInjector = require('inject!../../../public/store/actions')

chai.should()

describe('createUser', () => {
  it('logs in on success', (done) => {
    const actions = actionsInjector({
      '../services/user-services': {
        create (username, key, rememberMe, cb) {
          cb(null, newUser)
        }
      }
    })

    testAction(actions.default.createUser, ['username', 'password', false], {}, [
      {name: 'SET_USERNAME', payload: ['username']},
      {name: 'SET_KEY', payload: ['']},
      {name: 'SET_CONFIRM', payload: ['']},
      {name: 'SET_DARKMODE', payload: [true]},
      {name: 'SET_TASKS', payload: [newUser.tasks]},
      {name: 'SET_CURRENT_LIST', payload: [0]},
      {name: 'SET_AUTH', payload: ['username']}
    ], done)
  })

  it('does not log in on fail', (done) => {
    const actions = actionsInjector({
      '../services/user-services': {
        login (username, key, rememberMe, cb) {
          cb('Error', {status: 401})
        }
      }
    })

    testAction(actions.default.loginUser, ['username', 'password', false], {}, [], done)
  })
})
