/* global describe it beforeEach afterEach sinon */
import chai from 'chai'
import {login} from '../../public/services/user-services'

chai.should()
describe('user-services', () => {
  beforeEach(() => {
    sinon.spy(window, 'fetch')
  })

  afterEach(() => {
    window.fetch.restore()
  })

  it('should make a fetch call', (done) => {
    login()
    window.fetch.calledOnce.should.be.true
    done()
  })
})
