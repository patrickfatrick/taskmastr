/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
const actionsInjector = require('inject!../../../public/store/actions')

chai.should()

describe('save', () => {
  it('saves', (done) => {
    const actions = actionsInjector({
      '../services/user-services': {
        save (user, deleteAgendas, cb) {
          cb(null, {status: 200})
        }
      }
    })
    let state = {
      user: {
        username: 'username',
        key: 'password',
        darkmode: true,
        tasks: []
      }
    }
    testAction(actions.default.saveUser, [], state, [
      {name: 'SET_SAVE_BUTTON', payload: [false]}
    ], done)
  })

  it('does not dispatch save on failure', (done) => {
    const actions = actionsInjector({
      '../services/user-services': {
        save (user, deleteAgendas, cb) {
          cb('Error', {status: 500})
        }
      }
    })
    let state = {
      user: {
        username: 'username',
        key: 'password',
        darkmode: true,
        tasks: []
      }
    }
    testAction(actions.default.saveUser, [], state, [
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
  })

  it('only dispatches SET_SAVE_BUTTON on test account', (done) => {
    const actions = actionsInjector({
      '../services/user-services': {
        save (user, deleteAgendas, cb) {
          cb(null, {})
        }
      }
    })
    let state = {
      user: {
        username: 'mrormrstestperson@taskmastr.co',
        key: 'password',
        darkmode: true,
        tasks: []
      }
    }
    testAction(actions.default.saveUser, [], state, [
      {name: 'SET_SAVE_BUTTON', payload: [false]}
    ], done)
  })
})
