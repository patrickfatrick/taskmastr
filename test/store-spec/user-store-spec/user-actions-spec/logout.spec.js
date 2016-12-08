/* global describe it sinon beforeEach afterEach */
import { assert } from 'chai'
const userActionsInjector = require('inject!../../../../public/store/user-store/user-actions')

describe('loginUser', () => {
  beforeEach(() => {
    sinon.stub(window.location, 'assign').returns('success')
  })

  afterEach(() => {
    window.location.assign.restore()
  })

  it('logs out on success', () => {
    const userActions = userActionsInjector({
      '../../services/user-services': {
        logout (cb) {
          cb()
        }
      }
    })

    userActions.logoutUser()
    assert.isTrue(window.location.assign.calledWith('/'))
  })
})
