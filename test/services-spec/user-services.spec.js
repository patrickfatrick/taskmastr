/* global describe it beforeEach afterEach sinon*/
import chai from 'chai'
import {getSession, login, create, reset, forgot, logout, save} from '../../public/services/user-services'

chai.should()
describe('user-services', () => {
  let promise

  beforeEach(() => {
    promise = sinon.stub(window, 'fetch').returnsPromise()
  })

  afterEach(() => {
    window.fetch.restore()
  })

  it('getSession should make a fetch call', (done) => {
    getSession()
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('getSession should return a response', (done) => {
    let response = {response: 'response'}
    promise.resolves(response)
    getSession((response) => {
      response.should.have.property('response', 'response')
    })
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('getSession should return an error on 204', (done) => {
    let response = {status: 204}
    promise.resolves(response)
    getSession((response) => {
      response.should.have.property('error', 204)
      response.should.have.property('msg', 'No session data found')
    })
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('login should make a fetch call', (done) => {
    login()
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('login should return a response', (done) => {
    let response = {response: 'response'}
    promise.resolves(response)
    login('username', 'password', false, (response) => {
      response.should.have.property('response', 'response')
    })
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('login should return an error on 204', (done) => {
    let response = {status: 204}
    promise.resolves(response)
    login('username', 'password', false, (response) => {
      response.should.have.property('error', 204)
      response.should.have.property('msg', 'No user found. Please confirm your password.')
    })
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('login should return an error on 401', (done) => {
    let response = {status: 401}
    promise.resolves(response)
    login('username', 'password', false, (response) => {
      response.should.have.property('error', 401)
      response.should.have.property('msg', 'Invalid password.')
    })
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('create should make a fetch call', (done) => {
    create()
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('create should return a response', (done) => {
    let response = {response: 'response'}
    promise.resolves(response)
    create('username', 'password', false, (response) => {
      response.should.have.property('response', 'response')
    })
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('forgot should make a fetch call', (done) => {
    forgot()
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('forgot should return a response', (done) => {
    let response = {response: 'response'}
    promise.resolves(response)
    forgot('username', (response) => {
      response.should.have.property('response', 'response')
    })
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('reset should make a fetch call', (done) => {
    reset()
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('reset should return a response', (done) => {
    let response = {response: 'response'}
    promise.resolves(response)
    reset('token', 'password', (response) => {
      response.should.have.property('response', 'response')
    })
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('reset should return an error on 401', (done) => {
    let response = {status: 401}
    promise.resolves(response)
    reset((response) => {
      response.should.have.property('error', 401)
      response.should.have.property('msg', 'This reset link is no longer or never was valid. Please close this window and try again.')
    })
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('logout should make a fetch call', (done) => {
    logout()
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('logout should return a response', (done) => {
    let response = {response: 'response'}
    promise.resolves(response)
    logout((response) => {
      response.should.have.property('response', 'response')
    })
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('save should make a fetch call', (done) => {
    save()
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('save should return a response', (done) => {
    let response = {response: 'response'}
    promise.resolves(response)
    save((response) => {
      response.should.have.property('response', 'response')
    })
    window.fetch.calledOnce.should.be.true
    done()
  })
})
