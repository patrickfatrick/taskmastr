/* global describe it */
import chai from 'chai'
import {userMutations} from '../public/store/mutations/user-mutations'

chai.should()
describe('user mutations', () => {
  it('SET_CURRENT_TASK', () => {
    let state = {
      init: false
    }

    userMutations.SET_INIT(state, true)

    state.init.should.be.true
  })

  it('SET_AUTH', () => {
    let state = {
      auth: false
    }

    userMutations.SET_AUTH(state, 'patrick.fricano@icloud.com')

    state.auth.should.equal('patrick.fricano@icloud.com')
  })

  it('TOGGLE_CHECKBOX', () => {
    let state = {
      rememberMe: false,
      forgot: false
    }

    userMutations.TOGGLE_CHECKBOX(state, 'rememberMe', true)
    userMutations.TOGGLE_CHECKBOX(state, 'forgot', true)

    state.rememberMe.should.be.true
    state.forgot.should.be.true

    userMutations.TOGGLE_CHECKBOX(state, 'rememberMe', false)
    userMutations.TOGGLE_CHECKBOX(state, 'forgot', false)

    state.rememberMe.should.be.false
    state.forgot.should.be.false
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

    state.user.should.have.property('username', 'username')
    state.user.should.have.property('key', '')
    state.user.should.have.property('confirm', '')
    state.user.should.have.property('darkmode', false)
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

    state.user.should.have.property('username', 'username')
    state.user.should.have.property('key', 'password')
    state.user.should.have.property('confirm', '')
    state.user.should.have.property('darkmode', false)
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

    state.user.should.have.property('username', 'username')
    state.user.should.have.property('key', 'password')
    state.user.should.have.property('confirm', 'password')
    state.user.should.have.property('darkmode', false)
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

    state.user.should.have.property('username', 'username')
    state.user.should.have.property('key', 'password')
    state.user.should.have.property('confirm', 'password')
    state.user.should.have.property('darkmode', true)
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

    state.user.should.have.property('username', 'username')
    state.user.should.have.property('key', 'password')
    state.user.should.have.property('confirm', 'password')
    state.user.should.have.property('darkmode', true)
    state.user.tasks.length.should.equal(2)
    state.user.tasks[0].list.should.equal('Current list')
    state.user.tasks[1].list.should.equal('Not current list')
  })

  it('SET_FORGOT', () => {
    let state = {
      user: {
        username: 'username',
        key: 'password',
        confirm: 'password',
        darkmode: true,
        tasks: []
      },
      forgot: false
    }

    userMutations.SET_FORGOT(state)

    state.user.should.have.property('username', 'username')
    state.user.should.have.property('key', 'password')
    state.user.should.have.property('confirm', 'password')
    state.user.should.have.property('darkmode', true)
    state.forgot.should.be.true
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

    userMutations.SET_CREATE(state)

    state.user.should.have.property('username', 'username')
    state.user.should.have.property('key', 'password')
    state.user.should.have.property('confirm', 'password')
    state.user.should.have.property('darkmode', true)
    state.forgot.should.be.true
    state.create.should.be.true
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

    state.user.should.have.property('username', 'username')
    state.user.should.have.property('key', 'password')
    state.user.should.have.property('confirm', 'password')
    state.user.should.have.property('darkmode', true)
    state.forgot.should.be.true
    state.create.should.be.true
    state.invalidKey.should.equal('Invalid key')
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

    state.user.should.have.property('username', 'username')
    state.user.should.have.property('key', 'password')
    state.user.should.have.property('confirm', 'password')
    state.user.should.have.property('darkmode', true)
    state.forgot.should.be.true
    state.create.should.be.true
    state.invalidKey.should.equal('Invalid key')
    state.loginAttempt.should.be.true
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

    state.user.should.have.property('username', 'username')
    state.user.should.have.property('key', 'password')
    state.user.should.have.property('confirm', 'password')
    state.user.should.have.property('darkmode', true)
    state.forgot.should.be.true
    state.create.should.be.true
    state.invalidKey.should.equal('Invalid key')
    state.loginAttempt.should.be.true
    state.forgotAttempt.should.be.true
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

    state.user.should.have.property('username', 'username')
    state.user.should.have.property('key', 'password')
    state.user.should.have.property('confirm', 'password')
    state.user.should.have.property('darkmode', true)
    state.forgot.should.be.true
    state.create.should.be.true
    state.invalidKey.should.equal('Invalid key')
    state.loginAttempt.should.be.true
    state.forgotAttempt.should.be.true
    state.forgotEmail.should.be.true
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

    state.user.should.have.property('username', 'username')
    state.user.should.have.property('key', 'password')
    state.user.should.have.property('confirm', 'password')
    state.user.should.have.property('darkmode', true)
    state.forgot.should.be.true
    state.create.should.be.true
    state.invalidKey.should.equal('Invalid key')
    state.loginAttempt.should.be.true
    state.forgotAttempt.should.be.true
    state.forgotEmail.should.be.true
    state.confirmAttempt.should.be.true
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

    state.user.should.have.property('username', 'username')
    state.user.should.have.property('key', 'password')
    state.user.should.have.property('confirm', 'password')
    state.user.should.have.property('darkmode', true)
    state.forgot.should.be.true
    state.create.should.be.true
    state.invalidKey.should.equal('Invalid key')
    state.loginAttempt.should.be.true
    state.forgotAttempt.should.be.true
    state.forgotEmail.should.be.true
    state.confirmAttempt.should.be.true
    state.reset.should.be.true
  })
})
