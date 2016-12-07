/* global describe it */
import chai from 'chai'
import { testAction } from '../test-action'
const userActionsInjector = require('inject!../../../public/store/user-store/user-actions')

chai.should()

describe('forgotPassword', () => {
  it('dispatches FORGOT_EMAIL on success', (done) => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        forgot (username, cb) {
          cb(null, {emailSent: true})
        }
      }
    })

    testAction(userActions.forgotPassword, 'username', {}, [
      {name: 'SET_FORGOT_EMAIL', payload: true}
    ], done)
  })
})
