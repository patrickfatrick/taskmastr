/* global describe it */
import { assert } from 'chai'
import 'isomorphic-fetch'
import fetchMock from 'fetch-mock'
import { createItem, updateItem, deleteItem } from '../../public/services/item-services'

describe('item-services', () => {
  it('createItem invokes a callback on success', (done) => {
    fetchMock.mock('/lists/listid/items/create', {
      status: 200,
      body: {
        success: true
      }
    })

    createItem('listid', { item: 'Item' }, 'username', (err, response) => {
      assert.isTrue(fetchMock.called('/lists/listid/items/create'))
      assert.isNull(err)
      assert.isTrue(response.success)
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('createItem throws on error', (done) => {
    fetchMock.mock('/lists/listid/items/create', 500)

    createItem('listid', { item: 'Item' }, 'username', (err, response) => {
      assert.isTrue(fetchMock.called('/lists/listid/items/create'))
      assert.isNotNull(err)
      assert.isNotOk(response.ok)
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('createItem does nothing if test user', (done) => {
    fetchMock.mock('/lists/listid/items/create', 200)

    createItem('listid', { item: 'Item' }, 'mrormrstestperson@taskmastr.co', (err, response) => {
      assert.isFalse(fetchMock.called('/lists/listid/items/create'))
      assert.isNull(err)
      assert.isTrue(response.success)
      fetchMock.restore()
      done()
    })
  })

  it('updateItem invokes a callback on success', (done) => {
    fetchMock.mock('/lists/listid/items/itemid/update', {
      status: 200,
      body: {
        success: true
      }
    })

    updateItem('listid', 'itemid', 0, { item: 'Item' }, 'username', (err, response) => {
      assert.isTrue(fetchMock.called('/lists/listid/items/itemid/update'))
      assert.isNull(err)
      assert.isTrue(response.success)
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('updateItem throws on error', (done) => {
    fetchMock.mock('/lists/listid/items/itemid/update', 500)

    updateItem('listid', 'itemid', 0, { item: 'Item' }, 'username', (err, response) => {
      assert.isTrue(fetchMock.called('/lists/listid/items/itemid/update'))
      assert.isNotNull(err)
      assert.isNotOk(response.ok)
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('updateItem does nothing if test user', (done) => {
    fetchMock.mock('/lists/listid/items/itemid/update', 200)

    updateItem('listid', 'itemid', 0, { item: 'Item' }, 'mrormrstestperson@taskmastr.co', (err, response) => {
      assert.isFalse(fetchMock.called('/lists/listid/items/itemid/update'))
      assert.isNull(err)
      assert.isTrue(response.success)
      fetchMock.restore()
      done()
    })
  })

  it('deleteItem invokes a callback on success', (done) => {
    fetchMock.mock('/lists/listid/items/itemid/delete', {
      status: 200,
      body: {
        success: true
      }
    })

    deleteItem('listid', 'itemid', 0, 'username', (err, response) => {
      assert.isTrue(fetchMock.called('/lists/listid/items/itemid/delete'))
      assert.isNull(err)
      assert.isTrue(response.success)
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('deleteItem throws on error', (done) => {
    fetchMock.mock('/lists/listid/items/itemid/delete', 500)

    deleteItem('listid', 'itemid', 0, 'username', (err, response) => {
      assert.isTrue(fetchMock.called('/lists/listid/items/itemid/delete'))
      assert.isNotNull(err)
      assert.isNotOk(response.ok)
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('deleteItem does nothing if test user', (done) => {
    fetchMock.mock('/lists/listid/items/itemid/delete', 200)

    deleteItem('listid', 'itemid', 0, 'mrormrstestperson@taskmastr.co', (err, response) => {
      assert.isFalse(fetchMock.called('/lists/listid/items/itemid/delete'))
      assert.isNull(err)
      assert.isTrue(response.success)
      fetchMock.restore()
      done()
    })
  })
})
