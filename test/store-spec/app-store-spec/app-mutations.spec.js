/* global describe it */
import { assert } from 'chai'
import appMutations from '../../../src/store/app-store/app-mutations'

describe('app mutations', () => {
  it('SET_INITIALIZED', () => {
    let state = {
      initialized: false
    }

    appMutations.SET_INITIALIZED(state, true)

    assert.deepEqual(state, { initialized: true })
  })

  it('SET_AUTHENTICATED', () => {
    let state = {
      authenticated: false
    }

    appMutations.SET_AUTHENTICATED(state, true)

    assert.deepEqual(state, { authenticated: true })
  })

  it('SET_FORGOT', () => {
    let state = {
      forgot: false
    }

    appMutations.SET_FORGOT(state, true)

    assert.deepEqual(state, { forgot: true })
  })

  it('SET_REMEMBER_ME', () => {
    let state = {
      rememberMe: false
    }

    appMutations.SET_REMEMBER_ME(state, true)

    assert.deepEqual(state, { rememberMe: true })
  })

  it('SET_CREATE', () => {
    let state = {
      user: {},
      create: false
    }

    appMutations.SET_CREATE(state, true)

    assert.isTrue(state.create)
  })

  it('SET_INVALID_KEY', () => {
    let state = {
      user: {},
      invalidKey: ''
    }

    appMutations.SET_INVALID_KEY(state, 'Invalid key')

    assert.strictEqual(state.invalidKey, 'Invalid key')
  })

  it('SET_LOGIN_ATTEMPT', () => {
    let state = {
      user: {},
      loginAttempt: false
    }

    appMutations.SET_LOGIN_ATTEMPT(state, true)

    assert.isTrue(state.loginAttempt)
  })

  it('SET_FORGOT_ATTEMPT', () => {
    let state = {
      user: {},
      forgotAttempt: false
    }

    appMutations.SET_FORGOT_ATTEMPT(state, true)

    assert.isTrue(state.forgotAttempt)
  })

  it('SET_FORGOT_EMAIL', () => {
    let state = {
      user: {},
      forgotEmail: false
    }

    appMutations.SET_FORGOT_EMAIL(state, true)

    assert.isTrue(state.forgotEmail)
  })

  it('SET_FORGOT_FAIL', () => {
    let state = {
      forgotFail: false
    }

    appMutations.SET_FORGOT_FAIL(state, true)

    assert.deepEqual(state, { forgotFail: true })
  })

  it('SET_CONFIRM_ATTEMPT', () => {
    let state = {
      confirmAttempt: false
    }

    appMutations.SET_CONFIRM_ATTEMPT(state, true)

    assert.deepEqual(state, { confirmAttempt: true })
  })

  it('SET_RESET', () => {
    let state = {
      reset: false
    }

    appMutations.SET_RESET(state, true)

    assert.deepEqual(state, { reset: true })
  })

  it('SET_RESET_ATTEMPT', () => {
    let state = {
      resetAttempt: false
    }

    appMutations.SET_RESET_ATTEMPT(state, true)

    assert.deepEqual(state, { resetAttempt: true })
  })

  it('SET_RESET_FAIL', () => {
    let state = {
      resetFail: false
    }

    appMutations.SET_RESET_FAIL(state, true)

    assert.deepEqual(state, { resetFail: true })
  })

  it('SET_CREATE_FAIL', () => {
    let state = {
      createFail: false
    }

    appMutations.SET_CREATE_FAIL(state, true)

    assert.deepEqual(state, { createFail: true })
  })

  it('SET_DISCONNECT', () => {
    let state = {
      disconnect: false
    }

    appMutations.SET_DISCONNECT(state, true)

    assert.deepEqual(state, { disconnect: true })
  })

  it('SET_JUMPTO', () => {
    let state = {
      jumpto: ''
    }

    appMutations.SET_JUMPTO(state, 'link/to/something')

    assert.deepEqual(state, { jumpto: 'link/to/something' })
  })
})
