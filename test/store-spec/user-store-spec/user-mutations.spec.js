/* global describe it */
import { assert } from 'chai'
import userMutations from '../../../src/store/user-store/user-mutations'

describe('user mutations', () => {
  it('SET_CURRENT_TASK', () => {
    let state = {
      init: false
    }

    userMutations.SET_INIT(state, true)

    assert.isTrue(state.init)
  })

  it('SET_AUTH', () => {
    let state = {
      auth: false
    }

    userMutations.SET_AUTH(state, 'patrick.fricano@icloud.com')

    assert.strictEqual(state.auth, 'patrick.fricano@icloud.com')
  })

  it('SET_FORGOT', () => {
    let state = {
      forgot: false
    }

    userMutations.SET_FORGOT(state, true)

    assert.isTrue(state.forgot)

    userMutations.SET_FORGOT(state, false)

    assert.isFalse(state.forgot)
  })

  it('SET_REMEMBER_ME', () => {
    let state = {
      rememberMe: false
    }

    userMutations.SET_REMEMBER_ME(state, true)

    assert.isTrue(state.rememberMe)

    userMutations.SET_REMEMBER_ME(state, false)

    assert.isFalse(state.rememberMe)
  })

  it('SET_USERNAME', () => {
    let state = {
      user: {
        username: '',
        key: '',
        confirm: '',
        darkmode: false
      }
    }

    userMutations.SET_USERNAME(state, 'username')

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', '')
    assert.propertyVal(state.user, 'confirm', '')
    assert.propertyVal(state.user, 'darkmode', false)
  })

  it('SET_KEY', () => {
    let state = {
      user: {
        username: 'username',
        key: '',
        confirm: '',
        darkmode: false
      }
    }

    userMutations.SET_KEY(state, 'password')

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', '')
    assert.propertyVal(state.user, 'darkmode', false)
  })

  it('SET_CONFIRM', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: '',
        darkmode: false
      }
    }

    userMutations.SET_CONFIRM(state, 'password')

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', false)
  })

  it('SET_DARKMODE', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: false
      }
    }

    userMutations.SET_DARKMODE(state, true)

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
  })

  it('SET_TASKS', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
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

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.strictEqual(state.user.tasks.length, 2)
    assert.strictEqual(state.user.tasks[0].list, 'Current list')
    assert.strictEqual(state.user.tasks[1].list, 'Not current list')
  })

  it('SET_CREATE', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: false
    }

    userMutations.SET_CREATE(state, true)

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
  })

  it('SET_INVALID_KEY', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: true,
      invalidKey: ''
    }

    userMutations.SET_INVALID_KEY(state, 'Invalid key')

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
    assert.strictEqual(state.invalidKey, 'Invalid key')
  })

  it('SET_LOGIN_ATTEMPT', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: true,
      invalidKey: 'Invalid key',
      loginAttempt: false
    }

    userMutations.SET_LOGIN_ATTEMPT(state, true)

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
    assert.strictEqual(state.invalidKey, 'Invalid key')
    assert.isTrue(state.loginAttempt)
  })

  it('SET_FORGOT_ATTEMPT', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: true,
      invalidKey: 'Invalid key',
      loginAttempt: true,
      forgotAttempt: false
    }

    userMutations.SET_FORGOT_ATTEMPT(state, true)

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
    assert.strictEqual(state.invalidKey, 'Invalid key')
    assert.isTrue(state.loginAttempt)
    assert.isTrue(state.forgotAttempt)
  })

  it('SET_FORGOT_EMAIL', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: true,
      invalidKey: 'Invalid key',
      loginAttempt: true,
      forgotAttempt: true
    }

    userMutations.SET_FORGOT_EMAIL(state, true)

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
    assert.strictEqual(state.invalidKey, 'Invalid key')
    assert.isTrue(state.loginAttempt)
    assert.isTrue(state.forgotAttempt)
    assert.isTrue(state.forgotEmail)
  })

  it('SET_FORGOT_FAIL', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: true,
      invalidKey: 'Invalid key',
      loginAttempt: true,
      forgotAttempt: true,
      forgotEmail: true,
      forgotFail: false
    }

    userMutations.SET_FORGOT_FAIL(state, true)

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
    assert.strictEqual(state.invalidKey, 'Invalid key')
    assert.isTrue(state.loginAttempt)
    assert.isTrue(state.forgotAttempt)
    assert.isTrue(state.forgotEmail)
    assert.isTrue(state.forgotFail)
  })

  it('SET_CONFIRM_ATTEMPT', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: true,
      invalidKey: 'Invalid key',
      loginAttempt: true,
      forgotAttempt: true,
      forgotEmail: true,
      confirmAttempt: false
    }

    userMutations.SET_CONFIRM_ATTEMPT(state, true)

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
    assert.strictEqual(state.invalidKey, 'Invalid key')
    assert.isTrue(state.loginAttempt)
    assert.isTrue(state.forgotAttempt)
    assert.isTrue(state.forgotEmail)
    assert.isTrue(state.confirmAttempt)
  })

  it('SET_RESET', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: true,
      invalidKey: 'Invalid key',
      loginAttempt: true,
      forgotAttempt: true,
      forgotEmail: true,
      confirmAttempt: true,
      reset: false
    }

    userMutations.SET_RESET(state, true)

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
    assert.strictEqual(state.invalidKey, 'Invalid key')
    assert.isTrue(state.loginAttempt)
    assert.isTrue(state.forgotAttempt)
    assert.isTrue(state.forgotEmail)
    assert.isTrue(state.confirmAttempt)
    assert.isTrue(state.reset)
  })

  it('SET_RESET_KEY', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        resetKey: '',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: true,
      invalidKey: 'Invalid key',
      loginAttempt: true,
      forgotAttempt: true,
      forgotEmail: true,
      confirmAttempt: true,
      reset: true
    }

    userMutations.SET_RESET_KEY(state, 'reset-key')

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
    assert.strictEqual(state.invalidKey, 'Invalid key')
    assert.isTrue(state.loginAttempt)
    assert.isTrue(state.forgotAttempt)
    assert.isTrue(state.forgotEmail)
    assert.isTrue(state.confirmAttempt)
    assert.isTrue(state.reset)
    assert.propertyVal(state.user, 'resetKey', 'reset-key')
  })

  it('SET_RESET_CONFIRM_KEY', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        resetKey: 'reset-key',
        resetConfirmKey: '',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: true,
      invalidKey: 'Invalid key',
      loginAttempt: true,
      forgotAttempt: true,
      forgotEmail: true,
      confirmAttempt: true,
      reset: true
    }

    userMutations.SET_RESET_CONFIRM_KEY(state, 'reset-key')

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
    assert.strictEqual(state.invalidKey, 'Invalid key')
    assert.isTrue(state.loginAttempt)
    assert.isTrue(state.forgotAttempt)
    assert.isTrue(state.forgotEmail)
    assert.isTrue(state.confirmAttempt)
    assert.isTrue(state.reset)
    assert.propertyVal(state.user, 'resetKey', 'reset-key')
    assert.propertyVal(state.user, 'resetConfirmKey', 'reset-key')
  })

  it('SET_RESET', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: true,
      invalidKey: 'Invalid key',
      loginAttempt: true,
      forgotAttempt: true,
      forgotEmail: true,
      confirmAttempt: true,
      reset: false
    }

    userMutations.SET_RESET(state, true)

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
    assert.strictEqual(state.invalidKey, 'Invalid key')
    assert.isTrue(state.loginAttempt)
    assert.isTrue(state.forgotAttempt)
    assert.isTrue(state.forgotEmail)
    assert.isTrue(state.confirmAttempt)
    assert.isTrue(state.reset)
  })

  it('SET_RESET_ATTEMPT', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: true,
      invalidKey: 'Invalid key',
      loginAttempt: true,
      forgotAttempt: true,
      forgotEmail: true,
      confirmAttempt: true,
      reset: true,
      resetAttempt: false
    }

    userMutations.SET_RESET_ATTEMPT(state, true)

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
    assert.strictEqual(state.invalidKey, 'Invalid key')
    assert.isTrue(state.loginAttempt)
    assert.isTrue(state.forgotAttempt)
    assert.isTrue(state.forgotEmail)
    assert.isTrue(state.confirmAttempt)
    assert.isTrue(state.reset)
    assert.isTrue(state.resetAttempt)
  })

  it('SET_RESET_TOKEN', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: true,
      invalidKey: 'Invalid key',
      loginAttempt: true,
      forgotAttempt: true,
      forgotEmail: true,
      confirmAttempt: true,
      reset: true,
      resetAttempt: true,
      resetToken: ''
    }

    userMutations.SET_RESET_TOKEN(state, 'token')

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
    state.invalidKey.should.equal('Invalid key')
    assert.isTrue(state.loginAttempt)
    assert.isTrue(state.forgotAttempt)
    assert.isTrue(state.forgotEmail)
    assert.isTrue(state.confirmAttempt)
    assert.isTrue(state.reset)
    assert.isTrue(state.resetAttempt)
    assert.strictEqual(state.resetToken, 'token')
  })

  it('SET_RESET_FAIL', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: true,
      invalidKey: 'Invalid key',
      loginAttempt: true,
      forgotAttempt: true,
      forgotEmail: true,
      confirmAttempt: true,
      reset: true,
      resetAttempt: true,
      resetToken: 'token',
      resetFail: false
    }

    userMutations.SET_RESET_FAIL(state, true)

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
    assert.strictEqual(state.invalidKey, 'Invalid key')
    assert.isTrue(state.loginAttempt)
    assert.isTrue(state.forgotAttempt)
    assert.isTrue(state.forgotEmail)
    assert.isTrue(state.confirmAttempt)
    assert.isTrue(state.reset)
    assert.isTrue(state.resetAttempt)
    assert.strictEqual(state.resetToken, 'token')
    assert.strictEqual(state.resetFail, true)
  })

  it('SET_RESET_FAIL', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
        tasks: []
      },
      forgot: true,
      create: true,
      invalidKey: 'Invalid key',
      loginAttempt: true,
      forgotAttempt: true,
      forgotEmail: true,
      confirmAttempt: true,
      reset: true,
      resetAttempt: true,
      resetToken: 'token',
      resetFail: true,
      createFail: false
    }

    userMutations.SET_CREATE_FAIL(state, true)

    assert.propertyVal(state.user, 'username', 'username')
    assert.propertyVal(state.user, 'key', 'password')
    assert.propertyVal(state.user, 'confirm', 'password')
    assert.propertyVal(state.user, 'darkmode', true)
    assert.isTrue(state.forgot)
    assert.isTrue(state.create)
    assert.strictEqual(state.invalidKey, 'Invalid key')
    assert.isTrue(state.loginAttempt)
    assert.isTrue(state.forgotAttempt)
    assert.isTrue(state.forgotEmail)
    assert.isTrue(state.confirmAttempt)
    assert.isTrue(state.reset)
    assert.isTrue(state.resetAttempt)
    assert.strictEqual(state.resetToken, 'token')
    assert.strictEqual(state.resetFail, true)
    assert.strictEqual(state.createFail, true)
  })
})
