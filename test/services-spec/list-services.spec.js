/* global describe it */
import { assert } from 'chai'
import 'isomorphic-fetch'
import fetchMock from 'fetch-mock'
import { createList, getList, removeList, updateList } from '../../public/services/list-services'

describe('list-services', () => {
  it('createList invokes a callback on success', (done) => {
    fetchMock.mock('/lists/create', {
      status: 200,
      body: {
        success: true
      }
    })

    createList({ list: 'List' }, { username: 'username' }, (err, response) => {
      assert.isTrue(fetchMock.called('/lists/create'))
      assert.isNull(err)
      assert.isTrue(response.success)
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('createList throws on error', (done) => {
    fetchMock.mock('/lists/create', 500)

    createList({ list: 'List' }, { username: 'username' }, (err, response) => {
      assert.isTrue(fetchMock.called('/lists/create'))
      assert.isNotNull(err)
      assert.isNotOk(response.ok)
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('createList does nothing if test user', (done) => {
    fetchMock.mock('/lists/create', 200)

    createList({ list: 'List' }, { username: 'mrormrstestperson@taskmastr.co' }, (err, response) => {
      assert.isFalse(fetchMock.called('/lists/create'))
      assert.isTrue(response.success)
      assert.isNull(err)
      fetchMock.restore()
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
    fetchMock.mock('/lists/listid/delete', {
      status: 200,
      body: {
        success: true
      }
    })

    removeList('listid', { username: 'username' }, (err, response) => {
      assert.isTrue(fetchMock.called('/lists/listid/delete'))
      assert.isNull(err)
      assert.isTrue(response.success)
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('removeList throws on error', (done) => {
    fetchMock.mock('/lists/listid/delete', 500)

    removeList('listid', { username: 'username' }, (err, response) => {
      assert.isTrue(fetchMock.called('/lists/listid/delete'))
      assert.isNotNull(err)
      assert.isNotOk(response.ok)
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('removeList does nothing if test user', (done) => {
    fetchMock.mock('/lists/listid/delete', 200)

    removeList('listid', { username: 'mrormrstestperson@taskmastr.co' }, (err, response) => {
      assert.isFalse(fetchMock.called('/lists/listid/delete'))
      assert.isTrue(response.success)
      assert.isNull(err)
      fetchMock.restore()
      done()
    })
  })

  it('updateList invokes a callback on success', (done) => {
    fetchMock.mock('/lists/listid/update', {
      status: 200,
      body: {
        success: true
      }
    })

    updateList({ username: 'username' }, 'listid', { current: true }, (err, response) => {
      assert.isTrue(fetchMock.called('/lists/listid/update'))
      assert.isNull(err)
      assert.isTrue(response.success)
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('updateList throws on error', (done) => {
    fetchMock.mock('/lists/listid/update', 500)

    updateList({ username: 'username' }, 'listid', { current: true }, (err, response) => {
      assert.isTrue(fetchMock.called('/lists/listid/update'))
      assert.isNotNull(err)
      assert.isNotOk(response.ok)
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })

  it('updateList does nothing if test user', (done) => {
    fetchMock.mock('/lists/listid/update', 200)

    updateList({ username: 'mrormrstestperson@taskmastr.co' }, 'listid', { current: true }, (err, response) => {
      assert.isFalse(fetchMock.called('/lists/listid/update'))
      assert.isNull(err)
      assert.isTrue(response.success)
      fetchMock.restore()
      done()
    })
  })
})
