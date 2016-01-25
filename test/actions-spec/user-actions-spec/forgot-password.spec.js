/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
const actionsInjector = require('inject!../../../public/store/actions')

chai.should()

describe('forgotPassword', () => {
  it('dispatches FORGOT_EMAIL on success', done => {
    const actions = actionsInjector({
      '../services/user-services': {
        forgot (username, cb) {
          cb({emailSent: true})
        }
      }
    })

    testAction(actions.default.forgotPassword, ['username', true], {}, [
      {name: 'SET_FORGOT_EMAIL', payload: [true]}
    ], done)
  })

  it('does nothing if form is invalid', done => {
    const actions = actionsInjector({
      '../services/user-services': {
        forgot (user, deleteAgendas, cb) {
          cb({})
        }
      }
    })

    testAction(actions.default.forgotPassword, ['', false], {}, [], done)
  })
})
