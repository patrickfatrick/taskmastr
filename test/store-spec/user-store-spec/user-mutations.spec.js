/* global describe it */
import { assert } from 'chai'
import userMutations from '../../../src/store/user-store/user-mutations'

describe('user mutations', () => {
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

  it('SET_CONFIRM_KEY', () => {
    let state = {
      user: {
        confirmKey: ''
      }
    }

    userMutations.SET_CONFIRM_KEY(state, 'password')

    assert.deepEqual(state, { user: { confirmKey: 'password' } })
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

  it('SET_RESET_TOKEN', () => {
    let state = {
      resetToken: ''
    }

    userMutations.SET_RESET_TOKEN(state, 'token')

    assert.deepEqual(state, { resetToken: 'token' })
  })
})
