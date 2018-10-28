/* global describe it sinon */
import { assert } from 'chai'
import socket from '../../src/socket'
import { createItem, updateItem, deleteItem } from '../../src/services/item-services'

describe('item-services', () => {
  it('createItem invokes a callback on success', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    createItem('listid', { item: 'Item' }, 'username', (err, response) => {
      assert.isTrue(socket.emit.calledWith('create-item'))
      assert.isNull(err)
      assert.deepEqual(response, 'ok')
      socket.emit.restore()
      done()
    })
  })

  it('createItem throws on error', (done) => {
    sinon.stub(socket, 'emit').yields({ message: 'Error!' }, null)

    createItem('listid', { item: 'Item' }, 'username', (err, response) => {
      assert.isTrue(socket.emit.calledWith('create-item'))
      assert.deepEqual(err.message, 'Error!')
      assert.deepEqual(response, 'Error!')
      socket.emit.restore()
      done()
    })
  })

  it('createItem does nothing if test user', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    createItem('listid', { item: 'Item' }, 'do-not-reply@taskmastr.org', (err, response) => {
      assert.isFalse(socket.emit.called)
      assert.isNull(err)
      assert.isOk(response)
      socket.emit.restore()
      done()
    })
  })

  it('updateItem invokes a callback on success', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    updateItem('listid', { item: 'Item' }, 'username', (err, response) => {
      assert.isTrue(socket.emit.calledWith('update-item'))
      assert.isNull(err)
      assert.deepEqual(response, 'ok')
      socket.emit.restore()
      done()
    })
  })

  it('updateItem throws on error', (done) => {
    sinon.stub(socket, 'emit').yields({ message: 'Error!' }, null)

    updateItem('listid', { item: 'Item' }, 'username', (err, response) => {
      assert.isTrue(socket.emit.calledWith('update-item'))
      assert.deepEqual(err.message, 'Error!')
      assert.deepEqual(response, 'Error!')
      socket.emit.restore()
      done()
    })
  })

  it('updateItem does nothing if test user', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    updateItem('listid', { item: 'Item' }, 'do-not-reply@taskmastr.org', (err, response) => {
      assert.isFalse(socket.emit.called)
      assert.isNull(err)
      assert.isOk(response)
      socket.emit.restore()
      done()
    })
  })

  it('deleteItem invokes a callback on success', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    deleteItem('listid', 'itemid', 0, 'username', (err, response) => {
      assert.isTrue(socket.emit.calledWith('delete-item'))
      assert.isNull(err)
      assert.deepEqual(response, 'ok')
      socket.emit.restore()
      done()
    })
  })

  it('deleteItem throws on error', (done) => {
    sinon.stub(socket, 'emit').yields({ message: 'Error!' }, null)

    deleteItem('listid', 'itemid', 0, 'username', (err, response) => {
      assert.isTrue(socket.emit.calledWith('delete-item'))
      assert.deepEqual(err.message, 'Error!')
      assert.deepEqual(response, 'Error!')
      socket.emit.restore()
      done()
    })
  })

  it('deleteItem does nothing if test user', (done) => {
    sinon.stub(socket, 'emit').yields(null, 'ok')

    deleteItem('listid', 'itemid', 0, 'do-not-reply@taskmastr.org', (err, response) => {
      assert.isFalse(socket.emit.called)
      assert.isNull(err)
      assert.isOk(response)
      socket.emit.restore()
      done()
    })
  })
})
