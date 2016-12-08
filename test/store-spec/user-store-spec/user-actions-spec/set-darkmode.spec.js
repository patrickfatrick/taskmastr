/* global describe it */
import chai from 'chai'
import { testAction } from '../../test-action'
const userActionsInjector = require('inject!../../../../public/store/user-store/user-actions')

chai.should()

describe('setDarkmode', () => {
  it('dispatches SET_DARKMODE on true', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        updateUser (username, body, cb) {
          cb(null, { success: true })
        }
      }
    })

    testAction(userActions.setDarkmode, true, {}, [
      { name: 'SET_DARKMODE', payload: true }
    ], done)
  })

  it('dispatches SET_DARKMODE on false', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        updateUser (username, body, cb) {
          cb(null, { success: true })
        }
      }
    })

    testAction(userActions.setDarkmode, false, {}, [
      { name: 'SET_DARKMODE', payload: false }
    ], done)
  })

  it('dispatches SET_DARKMODE twice on error', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        updateUser (username, body, cb) {
          cb('Error!', { status: 500 })
        }
      }
    })

    const state = {
      user: {
        username: 'username'
      }
    }

    testAction(userActions.setDarkmode, true, state, [
      { name: 'SET_DARKMODE', payload: true },
      { name: 'SET_DARKMODE', payload: false }
    ], done)
  })
})
