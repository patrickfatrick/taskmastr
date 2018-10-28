/* global describe it sinon */
import { assert } from 'chai'
import 'isomorphic-fetch'
import fetchMock from 'fetch-mock'
import socket from '../../src/socket'
import { login, create, forgot, reset, logout, getSession, updateUser } from '../../src/services/user-services'

describe('user-services', () => {
  it('login invokes a callback on success', (done) => {
    fetchMock.mock('/users/login', {
      status: 200,
      body: {
        username: 'username',
        tasks: [],
        current: ''
      }
    })

    login('username', 'password', false, (err, response) => {
      assert.isTrue(fetchMock.called('/users/login'))
      assert.isNull(err)
      assert.deepEqual(response.username, 'username')
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('login throws an error on 403', (done) => {
    fetchMock.mock('/users/login', 403)

    login('username', 'password', false, (err, response) => {
      assert.isTrue(fetchMock.called('/users/login'))
      assert.notOk(response.ok)
      assert.strictEqual(err.message, 'No user found. Please confirm your password.')
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('login throws an error on 401', (done) => {
    fetchMock.mock('/users/login', 401)

    login('username', 'password', false, (err, response) => {
      assert.isTrue(fetchMock.called('/users/login'))
      assert.notOk(response.ok)
      assert.strictEqual(err.message, 'Invalid password.')
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('login throws on error', (done) => {
    fetchMock.mock('/users/login', 500)

    login('username', 'password', false, (err, response) => {
      assert.isTrue(fetchMock.called('/users/login'))
      assert.notOk(response.ok)
      assert.isNotNull(err)
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('create invokes a callback on success', (done) => {
    fetchMock.mock('/users/create', {
      status: 200,
      body: {
        username: 'username'
      }
    })

    create('username', 'password', false, (err, response) => {
      assert.isTrue(fetchMock.called('/users/create'))
      assert.isNull(err)
      assert.deepEqual(response.username, 'username')
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('create throws an error on 400', (done) => {
    fetchMock.mock('/users/create', 400)

    create('username', 'password', false, (err, response) => {
      assert.isTrue(fetchMock.called('/users/create'))
      assert.notOk(response.ok)
      assert.strictEqual(err.message, 'User already exists')
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('create throws on error', (done) => {
    fetchMock.mock('/users/create', 500)

    create('username', 'password', false, (err, response) => {
      assert.isTrue(fetchMock.called('/users/create'))
      assert.notOk(response.ok)
      assert.isNotNull(err)
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('forgot invokes a callback on success', (done) => {
    fetchMock.mock('/users/username/forgot', {
      status: 200,
      body: {
        emailSent: true
      }
    })

    forgot('username', (err, response) => {
      assert.isTrue(fetchMock.called('/users/username/forgot'))
      assert.isNull(err)
      assert.deepEqual(response.emailSent, true)
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('forgot throws an error on 401', (done) => {
    fetchMock.mock('/users/username/forgot', 401)

    forgot('username', (err, response) => {
      assert.isTrue(fetchMock.called('/users/username/forgot'))
      assert.notOk(response.ok)
      assert.strictEqual(err.message, 'That username doesn\'t exist.')
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('forgot throws on error', (done) => {
    fetchMock.mock('/users/username/forgot', 500)

    forgot('username', (err, response) => {
      assert.isTrue(fetchMock.called('/users/username/forgot'))
      assert.notOk(response.ok)
      assert.isNotNull(err)
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('reset invokes a callback on success', (done) => {
    fetchMock.mock('/users/reset', {
      status: 200,
      body: {
        username: 'username'
      }
    })

    reset('token', 'password', (err, response) => {
      assert.isTrue(fetchMock.called('/users/reset'))
      assert.isNull(err)
      assert.deepEqual(response.username, 'username')
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('reset throws an error on 401', (done) => {
    fetchMock.mock('/users/reset', 401)

    reset('token', 'password', (err, response) => {
      assert.isTrue(fetchMock.called('/users/reset'))
      assert.notOk(response.ok)
      assert.strictEqual(err.message, 'This reset link is no longer or never was valid. Please close this window and try again.')
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('reset throws on error', (done) => {
    fetchMock.mock('/users/reset', 500)

    reset('token', 'password', (err, response) => {
      assert.isTrue(fetchMock.called('/users/reset'))
      assert.notOk(response.ok)
      assert.isNotNull(err)
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('logout invokes a callback on success', (done) => {
    fetchMock.mock('/users/logout', 200)

    logout((response) => {
      assert.isTrue(fetchMock.called('/users/logout'))
      assert.isOk(response.ok)
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('getSession invokes a callback on success', (done) => {
    fetchMock.mock('/sessions', {
      status: 200,
      body: {
        username: 'username',
        tasks: [],
        current: ''
      }
    })

    getSession((err, response) => {
      assert.isTrue(fetchMock.called('/sessions'))
      assert.isNull(err)
      assert.deepEqual(response.username, 'username')
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('getSession throws an error on 204', (done) => {
    fetchMock.mock('/sessions', 204)

    getSession((err, response) => {
      assert.isTrue(fetchMock.called('/sessions'))
      assert.isOk(response.ok)
      assert.strictEqual(err.message, 'No session data found.')
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('getSession throws on error', (done) => {
    fetchMock.mock('/sessions', 500)

    getSession((err, response) => {
      assert.isTrue(fetchMock.called('/sessions'))
      assert.isNotOk(response.ok)
      assert.isNotNull(err)
    })
      .then(() => {
        fetchMock.restore()
        done()
      })
  })

  it('updateUser invokes a callback on success', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    updateUser('username', { darkmode: true }, (err, response) => {
      assert.isTrue(socket.emit.calledWith('update-user'))
      assert.deepEqual(response, 'ok')
      assert.isNull(err)
      socket.emit.restore()
      done()
    })
  })

  it('updateUser throws an error on error', (done) => {
    sinon.stub(socket, 'emit').yields({ message: 'Error!' }, null)

    updateUser('username', { darkmode: true }, (err, response) => {
      assert.isTrue(socket.emit.calledWith('update-user'))
      assert.isNotNull(err)
      assert.strictEqual(err.message, 'Error!')
      assert.deepEqual(response, 'Error!')
      socket.emit.restore()
      done()
    })
  })

  it('updateUser does nothing if test user', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    updateUser('taskmastr-testr@mailinator.com', { darkmode: true }, (err, response) => {
      assert.isFalse(socket.emit.called)
      assert.isOk(response)
      assert.isNull(err)
      socket.emit.restore()
      done()
    })
  })
})
