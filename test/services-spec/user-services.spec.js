/* global describe it beforeEach afterEach sinon */
import chai from 'chai'
import {getSession, login, create, reset, forgot, logout, save} from '../../public/services/user-services'

chai.should()
describe('user-services', () => {
  beforeEach(() => {
    sinon.spy(window, 'fetch')
  })

  afterEach(() => {
    window.fetch.restore()
  })

  it('getSession should make a fetch call', (done) => {
    getSession()
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('login should make a fetch call', (done) => {
    login()
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('create should make a fetch call', (done) => {
    create()
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('forgot should make a fetch call', (done) => {
    forgot()
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('reset should make a fetch call', (done) => {
    reset()
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('logout should make a fetch call', (done) => {
    logout()
    window.fetch.calledOnce.should.be.true
    done()
  })

  it('save should make a fetch call', (done) => {
    save()
    window.fetch.calledOnce.should.be.true
    done()
  })

  // it('should return a user', (done) => {
  //   let state = {
  //     user: {
  //       username: 'username',
  //       key: 'password',
  //       darkmode: false,
  //       tasks: []
  //     }
  //   }
  //   let fakeUser = {
  //     username: 'username',
  //     key: 'password',
  //     darkmode: true,
  //     tasks: [
  //       {
  //         list: 'Current list',
  //         current: true
  //       },
  //       {
  //         list: 'Not current list',
  //         current: false
  //       }
  //     ]
  //   }
  //   promise.resolves(fakeUser)
  //   state.user = login('username', 'password', false).resolveValue
  //   window.fetch.calledOnce.should.be.true
  //   state.user.username.should.equal('username')
  //   state.user.key.should.equal('password')
  //   state.user.darkmode.should.be.true
  //   state.user.tasks[0].list.should.equal('Current list')
  //   state.user.tasks[1].list.should.equal('Not current list')
  //   done()
  // })
})
