/* global it describe sinon beforeEach afterEach */
import chai from 'chai'
import Vue from 'vue'
import TryIt from '../../../../public/components/forms/form-components/TryIt.vue'

chai.should()
describe('TryIt.vue', function () {
  // mock vue-router
  TryIt.computed.$route = () => {
    return {
      router: {
        go (location) {
          return location
        }
      }
    }
  }

  let clock

  beforeEach(() => {
    const start = 'Jan 1, 2016 00:00:000 UTC'
    clock = sinon.useFakeTimers(Date.parse(start))
  })

  afterEach(() => {
    clock.restore()
  })

  it('should have a testUser property', () => {
    TryIt.data().testUser.should.equal('mrormrstestperson@taskmastr.co')
  })

  it('should have a testKey property', () => {
    TryIt.data().testKey.should.equal('S41iVAtINGREsIdUE-278')
  })

  it('should inherit the wiki property from the state', () => {
    TryIt.computed.wiki().should.equal('//patrickfatrick.gitbooks.io/taskmastr/content/')
  })

  it('should inherit the auth property from the state', () => {
    TryIt.computed.auth().should.be.false
  })

  it('should have a loginUser method', () => {
    TryIt.methods.loginUser.should.be.an.instanceof(Function)
  })

  it('should render with initial state', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': TryIt
      }
    }).$mount()

    vm.$el.querySelector('#try-it-button').textContent.should.equal('Try it')
  })

  it('should log in to the test account on button push', (done) => {
    sinon.stub(TryIt.computed, 'auth').returns('true')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': TryIt
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'loginUser').returns('mrormrstestperson@taskmastr.co')
    sinon.spy(vm.$children[0].$route.router, 'go')

    vm.$children[0].loginTestUser('mrormrstestperson@taskmastr.co', 'S41iVAtINGREsIdUE-278', false, true)
    clock.tick(250)
    vm.$children[0].$route.router.go.calledWith('/app').should.be.true
    vm.$children[0].loginUser.calledWith('mrormrstestperson@taskmastr.co', 'S41iVAtINGREsIdUE-278', false, true).should.be.true

    vm.$children[0].$route.router.go.restore()
    vm.$children[0].loginUser.restore()
    done()
  })

  it('should call loginTestUser on button push', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': TryIt
      }
    }).$mount()
    sinon.spy(vm.$children[0], 'loginTestUser')

    vm.$el.querySelector('#try-it-button').click()
    vm.$children[0].loginTestUser.calledWith('mrormrstestperson@taskmastr.co', 'S41iVAtINGREsIdUE-278', false, true).should.be.true

    vm.$children[0].loginTestUser.restore()
    done()
  })
})
