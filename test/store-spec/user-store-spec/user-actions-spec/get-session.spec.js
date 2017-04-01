/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
import { mockUser } from '../../../user-mocks'
const userActionsInjector = require('inject-loader!../../../../src/store/user-store/user-actions')

chai.should()

describe('getSession', () => {
  it('logs in on success', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        getSession (cb) {
          cb(null, mockUser)
        }
      }
    })

    testAction(userActions.getUserSession, null, {}, [
      { name: 'SET_INITIALIZED', payload: true },
      { name: 'SET_USERNAME', payload: 'username' },
      { name: 'SET_KEY', payload: '' },
      { name: 'SET_DARKMODE', payload: true },
      { name: 'SET_TASKS', payload: mockUser.tasks },
      { name: 'SET_CURRENT_LIST', payload: mockUser.tasks[0] },
      { name: 'SET_AUTHENTICATED', payload: true }
    ], done)
  })

  it('dispatches SET_INITIALIZED on no user session', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        getSession (cb) {
          cb('Error', {status: 204})
        }
      }
    })

    testAction(userActions.getUserSession, null, {}, [
      { name: 'SET_INITIALIZED', payload: true }
    ], done)
  })
})
