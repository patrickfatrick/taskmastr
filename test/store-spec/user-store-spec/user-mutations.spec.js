/* global describe it */
import { assert } from 'chai'
import userMutations from '../../../src/store/user-store/user-mutations'

describe('user mutations', () => {
  it('SET_CURRENT_TASK', () => {
    let state = {
      init: false
    }

    userMutations.SET_INIT(state, true)

    assert.deepEqual(state, { init: true })
  })

  it('SET_AUTH', () => {
    let state = {
      auth: false
    }

    userMutations.SET_AUTH(state, 'username@email.com')

    assert.deepEqual(state, { auth: 'username@email.com' })
  })

  it('SET_FORGOT', () => {
    let state = {
      forgot: false
    }

    userMutations.SET_FORGOT(state, true)

    assert.deepEqual(state, { forgot: true })
  })

  it('SET_REMEMBER_ME', () => {
    let state = {
      rememberMe: false
    }

    userMutations.SET_REMEMBER_ME(state, true)

    assert.deepEqual(state, { rememberMe: true })
  })

  it('SET_USERNAME', () => {
    let state = {
      user: {
        username: ''
      }
    }

    userMutations.SET_USERNAME(state, 'username')

    assert.deepEqual(state, { user: { username: 'username' } })
  })

  it('SET_KEY', () => {
    let state = {
      user: {
        key: ''
      }
    }

    userMutations.SET_KEY(state, 'password')

    assert.deepEqual(state, { user: { key: 'password' } })
  })

  it('SET_CONFIRM', () => {
    let state = {
      user: {
        confirm: ''
      }
    }

    userMutations.SET_CONFIRM(state, 'password')

    assert.deepEqual(state, { user: { confirm: 'password' } })
  })

  it('SET_DARKMODE', () => {
    let state = {
      user: {
        darkmode: false
      }
    }

    userMutations.SET_DARKMODE(state, true)

    assert.deepEqual(state, { user: { darkmode: true } })
  })

  it('SET_TASKS', () => {
    let state = {
      user: {
        tasks: []
      }
    }
    let newTasks = [
      {
        list: 'Current list',
        current: true
      },
      {
        list: 'Not current list',
        current: false
      }
    ]

    userMutations.SET_TASKS(state, newTasks)

    assert.strictEqual(state.user.tasks.length, 2)
    assert.strictEqual(state.user.tasks[0].list, 'Current list')
    assert.strictEqual(state.user.tasks[1].list, 'Not current list')
  })

  it('SET_CREATE', () => {
    let state = {
      user: {},
      create: false
    }

    userMutations.SET_CREATE(state, true)

    assert.isTrue(state.create)
  })

  it('SET_INVALID_KEY', () => {
    let state = {
      user: {},
      invalidKey: ''
    }

    userMutations.SET_INVALID_KEY(state, 'Invalid key')

    assert.strictEqual(state.invalidKey, 'Invalid key')
  })

  it('SET_LOGIN_ATTEMPT', () => {
    let state = {
      user: {},
      loginAttempt: false
    }

    userMutations.SET_LOGIN_ATTEMPT(state, true)

    assert.isTrue(state.loginAttempt)
  })

  it('SET_FORGOT_ATTEMPT', () => {
    let state = {
      user: {},
      forgotAttempt: false
    }

    userMutations.SET_FORGOT_ATTEMPT(state, true)

    assert.isTrue(state.forgotAttempt)
  })

  it('SET_FORGOT_EMAIL', () => {
    let state = {
      user: {},
      forgotEmail: false
    }

    userMutations.SET_FORGOT_EMAIL(state, true)

    assert.isTrue(state.forgotEmail)
  })

  it('SET_FORGOT_FAIL', () => {
    let state = {
      forgotFail: false
    }

    userMutations.SET_FORGOT_FAIL(state, true)

    assert.deepEqual(state, { forgotFail: true })
  })

  it('SET_CONFIRM_ATTEMPT', () => {
    let state = {
      confirmAttempt: false
    }

    userMutations.SET_CONFIRM_ATTEMPT(state, true)

    assert.deepEqual(state, { confirmAttempt: true })
  })

  it('SET_RESET', () => {
    let state = {
      reset: false
    }

    userMutations.SET_RESET(state, true)

    assert.deepEqual(state, { reset: true })
  })

  it('SET_RESET_KEY', () => {
    let state = {
      user: {
        resetKey: ''
      }
    }

    userMutations.SET_RESET_KEY(state, 'reset-key')

    assert.deepEqual(state, { user: { resetKey: 'reset-key' } })
  })

  it('SET_RESET_CONFIRM_KEY', () => {
    let state = {
      user: {
        resetConfirmKey: ''
      }
    }

    userMutations.SET_RESET_CONFIRM_KEY(state, 'reset-key')

    assert.deepEqual(state, { user: { resetConfirmKey: 'reset-key' } })
  })

  it('SET_RESET_ATTEMPT', () => {
    let state = {
      resetAttempt: false
    }

    userMutations.SET_RESET_ATTEMPT(state, true)

    assert.deepEqual(state, { resetAttempt: true })
  })

  it('SET_RESET_TOKEN', () => {
    let state = {
      resetToken: ''
    }

    userMutations.SET_RESET_TOKEN(state, 'token')

    assert.deepEqual(state, { resetToken: 'token' })
  })

  it('SET_RESET_FAIL', () => {
    let state = {
      resetFail: false
    }

    userMutations.SET_RESET_FAIL(state, true)

    assert.deepEqual(state, { resetFail: true })
  })

  it('SET_CREATE_FAIL', () => {
    let state = {
      createFail: false
    }

    userMutations.SET_CREATE_FAIL(state, true)

    assert.deepEqual(state, { createFail: true })
  })
})
