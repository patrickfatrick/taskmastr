/* global describe it */
import chai from 'chai'
import {testAction} from './test-action'
const actionsInjector = require('inject!../../public/store/actions')

chai.should()

describe('save', () => {
  it('saves', done => {
    const actions = actionsInjector({
      '../services/user-services': {
        save (user, deleteAgendas, cb) {
          cb({status: 200})
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
    testAction(actions.default.save, [], state, [
      {name: 'SET_SAVE_BUTTON', payload: false}
    ], done)
  })

  it('does not dispatch save on failure', done => {
    const actions = actionsInjector({
      '../services/user-services': {
        save (user, deleteAgendas, cb) {
          cb({status: 500})
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
    testAction(actions.default.save, [], state, [
      {name: 'SET_SAVE_BUTTON', payload: true}
    ], done)
  })
})
