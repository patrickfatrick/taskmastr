/* global describe it */
import { assert } from 'chai'
import 'isomorphic-fetch'
import fetchMock from 'fetch-mock'
import { getSession } from '../../public/services/user-services'

describe('user-services', () => {
  it('getSession invokes a callback', (done) => {
    fetchMock.mock('/sessions/get', {
      status: 200,
      body: {
        username: 'username'
      }
    })

    getSession((err, response) => {
      assert.isNull(err)
      assert.isTrue(fetchMock.called('/sessions/get'))
      assert.deepEqual(response.username, 'username')
    })
    .then(() => {
      fetchMock.restore()
      done()
    })
  })
})
