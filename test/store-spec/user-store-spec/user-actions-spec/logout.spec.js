/* global describe it sinon beforeEach afterEach */
import { assert } from 'chai'
import userActionsInjector from 'inject-loader!../../../../src/store/user-store/user-actions' // eslint-disable-line import/no-webpack-loader-syntax

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
