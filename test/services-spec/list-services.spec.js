/* global describe it sinon */
import { assert } from 'chai'
import 'isomorphic-fetch'
import fetchMock from 'fetch-mock'
import socket from '../../src/socket'
import { createList, getList, removeList, updateList, inviteUser, removeUser, confirmUser } from '../../src/services/list-services'

describe('list-services', () => {
  it('createList invokes a callback on success', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    createList({ list: 'List' }, { username: 'username' }, (err, response) => {
      assert.isTrue(socket.emit.calledWith('create-list'))
      assert.deepEqual(response, 'ok')
      assert.isNull(err)
      socket.emit.restore()
      done()
    })
  })

  it('createList throws on error', (done) => {
    sinon.stub(socket, 'emit').yields({ message: 'Error!' }, null)

    createList({ list: 'List' }, { username: 'username' }, (err, response) => {
      assert.isTrue(socket.emit.calledWith('create-list'))
      assert.isNotNull(err)
      assert.deepEqual(err.message, 'Error!')
      assert.deepEqual(response, 'Error!')
      socket.emit.restore()
      done()
    })
  })

  it('createList does nothing if test user', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    createList({ list: 'List' }, { username: 'mrormrstestperson@taskmastr.co' }, (err, response) => {
      assert.isFalse(socket.emit.called)
      assert.isOk(response)
      assert.isNull(err)
      socket.emit.restore()
      done()
    })
  })

  it('getList invokes a callback on success', (done) => {
    fetchMock.mock('/lists/listid', {
      status: 200,
      body: {
        list: 'List'
      }
    })

    getList('listid', (err, response) => {
      assert.isTrue(fetchMock.called('/lists/listid'))
      assert.isNull(err)
      assert.deepEqual(response.list, 'List')
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('getList throws on 404', (done) => {
    fetchMock.mock('/lists/listid', 404)

    getList('listid', (err, response) => {
      assert.isTrue(fetchMock.called('/lists/listid'))
      assert.deepEqual(err, 'You\'re not viewing a list. Please click on one in the menu to the left.')
      assert.isNotOk(response.ok)
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('getList throws on error', (done) => {
    fetchMock.mock('/lists/listid', 500)

    getList('listid', (err, response) => {
      assert.isTrue(fetchMock.called('/lists/listid'))
      assert.isNotNull(err)
      assert.isNotOk(response.ok)
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('removeList invokes a callback on success', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    removeList('listid', { username: 'username' }, false, (err, response) => {
      assert.isTrue(socket.emit.calledWith('delete-list'))
      assert.isNull(err)
      assert.deepEqual(response, 'ok')
      socket.emit.restore()
      done()
    })
  })

  it('removeList throws on error', (done) => {
    sinon.stub(socket, 'emit').yields({ message: 'Error!' }, null)

    removeList('listid', { username: 'username' }, false, (err, response) => {
      assert.isTrue(socket.emit.calledWith('delete-list'))
      assert.deepEqual(err.message, 'Error!')
      assert.deepEqual(response, 'Error!')
      socket.emit.restore()
      done()
    })
  })

  it('removeList does nothing if test user', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    removeList('listid', { username: 'mrormrstestperson@taskmastr.co' }, false, (err, response) => {
      assert.isFalse(socket.emit.called)
      assert.isOk(response)
      assert.isNull(err)
      socket.emit.restore()
      done()
    })
  })

  it('updateList invokes a callback on success', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    updateList({ username: 'username' }, 'listid', { current: true }, (err, response) => {
      assert.isTrue(socket.emit.calledWith('update-list'))
      assert.isNull(err)
      assert.deepEqual(response, 'ok')
      socket.emit.restore()
      done()
    })
  })

  it('updateList throws on error', (done) => {
    sinon.stub(socket, 'emit').yields({ message: 'Error!' }, null)

    updateList({ username: 'username' }, 'listid', { current: true }, (err, response) => {
      assert.isTrue(socket.emit.calledWith('update-list'))
      assert.deepEqual(err.message, 'Error!')
      assert.deepEqual(response, 'Error!')
      socket.emit.restore()
      done()
    })
  })

  it('updateList does nothing if test user', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    updateList({ username: 'mrormrstestperson@taskmastr.co' }, 'listid', { current: true }, (err, response) => {
      assert.isFalse(socket.emit.called)
      assert.isOk(response)
      assert.isNull(err)
      socket.emit.restore()
      done()
    })
  })

  it('inviteUser invokes a callback on success', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    inviteUser({ username: 'username' }, 'listid', 'username', [{ user: 'username' }], (err, response) => {
      assert.isTrue(socket.emit.calledWith('invite-user'))
      assert.isNull(err)
      assert.deepEqual(response, 'ok')
      socket.emit.restore()
      done()
    })
  })

  it('inviteUser throws on error', (done) => {
    sinon.stub(socket, 'emit').yields({ message: 'Error!' }, null)

    inviteUser({ username: 'username' }, 'listid', 'username', [{ user: 'username ' }], (err, response) => {
      assert.isTrue(socket.emit.calledWith('invite-user'))
      assert.deepEqual(err.message, 'Error!')
      assert.deepEqual(response, 'Error!')
      socket.emit.restore()
      done()
    })
  })

  it('inviteUser does nothing if test user', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    inviteUser({ username: 'mrormrstestperson@taskmastr.co' }, 'listid', 'mrormrstestperson@taskmastr.co', [{ username: 'username' }], (err, response) => {
      assert.isFalse(socket.emit.called)
      assert.isOk(response)
      assert.isNull(err)
      socket.emit.restore()
      done()
    })
  })

  it('removeUser invokes a callback on success', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    removeUser({ username: 'username' }, 'listid', [{ user: 'username' }], (err, response) => {
      assert.isTrue(socket.emit.calledWith('remove-user'))
      assert.isNull(err)
      assert.deepEqual(response, 'ok')
      socket.emit.restore()
      done()
    })
  })

  it('removeUser throws on error', (done) => {
    sinon.stub(socket, 'emit').yields({ message: 'Error!' }, null)

    removeUser({ username: 'username' }, 'listid', [{ user: 'username ' }], (err, response) => {
      assert.isTrue(socket.emit.calledWith('remove-user'))
      assert.deepEqual(err.message, 'Error!')
      assert.deepEqual(response, 'Error!')
      socket.emit.restore()
      done()
    })
  })

  it('removeUser does nothing if test user', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    removeUser({ username: 'mrormrstestperson@taskmastr.co' }, 'listid', [{ username: 'username' }], (err, response) => {
      assert.isFalse(socket.emit.called)
      assert.isOk(response)
      assert.isNull(err)
      socket.emit.restore()
      done()
    })
  })

  it('confirmUser invokes a callback on success', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    confirmUser({ username: 'username' }, 'listid', { user: 'username' }, (err, response) => {
      assert.isTrue(socket.emit.calledWith('confirm-user'))
      assert.isNull(err)
      assert.deepEqual(response, 'ok')
      socket.emit.restore()
      done()
    })
  })

  it('confirmUser throws on error', (done) => {
    sinon.stub(socket, 'emit').yields({ message: 'Error!' }, null)

    confirmUser({ username: 'username' }, 'listid', { user: 'username ' }, (err, response) => {
      assert.isTrue(socket.emit.calledWith('confirm-user'))
      assert.deepEqual(err.message, 'Error!')
      assert.deepEqual(response, 'Error!')
      socket.emit.restore()
      done()
    })
  })

  it('confirmUser does nothing if test user', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    confirmUser({ username: 'mrormrstestperson@taskmastr.co' }, 'listid', { username: 'username' }, (err, response) => {
      assert.isFalse(socket.emit.called)
      assert.isOk(response)
      assert.isNull(err)
      socket.emit.restore()
      done()
    })
  })
})
