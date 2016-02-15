/* global describe it */
import chai from 'chai'
import {testAction} from '../test-action'
const actionsInjector = require('inject!../../../public/store/actions')

chai.should()

describe('forgotPassword', () => {
  it('dispatches FORGOT_EMAIL on success', (done) => {
    const actions = actionsInjector({
      '../services/user-services': {
        forgot (username, cb) {
          cb(null, {emailSent: true})
        }
      }
    })

    testAction(actions.default.forgotPassword, ['username'], {}, [
      {name: 'SET_FORGOT_EMAIL', payload: [true]}
    ], done)
  })
})
