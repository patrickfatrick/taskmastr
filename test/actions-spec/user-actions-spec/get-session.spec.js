/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
import {mockUser} from '../../user-mocks'
const actionsInjector = require('inject!../../../public/store/actions')

chai.should()

describe('getSession', () => {
  it('logs in on success', (done) => {
    const actions = actionsInjector({
      '../services/user-services': {
        getSession (cb) {
          cb(null, mockUser)
        }
      }
    })

    testAction(actions.default.getSession, [], {}, [
      {name: 'SET_USERNAME', payload: ['username']},
      {name: 'SET_KEY', payload: ['']},
      {name: 'SET_DARKMODE', payload: [true]},
      {name: 'SET_TASKS', payload: [mockUser.tasks]},
      {name: 'SET_CURRENT_LIST', payload: [0]},
      {name: 'SET_AUTH', payload: ['username']}
    ], done)
  })

  it('dispatches SET_INIT on no user session', (done) => {
    const actions = actionsInjector({
      '../services/user-services': {
        getSession (cb) {
          cb('Error', {status: 204})
        }
      }
    })

    testAction(actions.default.getSession, [], {}, [
      {name: 'SET_INIT', payload: [true]}
    ], done)
  })
})
