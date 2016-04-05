/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import TryIt from '../../../../public/components/forms/form-components/TryIt.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

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

  function mountVm (changes) {
    return new Vue({
      store: new Vuex.Store({
        state: {
          ...state,
          ...changes
        },
        mutations
      }),
      template: '<div><test></test></div>',
      components: {
        'test': TryIt
      }
    }).$mount()
  }

  let clock
  let promise

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should inherit the testUser property from the state', () => {
    assert.deepEqual(TryIt.vuex.getters.testUser({ testUser: 'mrormrstestperson@taskmastr.co' }), 'mrormrstestperson@taskmastr.co')
  })

  it('should inherit the testKey property from the state', () => {
    assert.deepEqual(TryIt.vuex.getters.testKey({ testKey: 'S41iVAtINGREsIdUE-278' }), 'S41iVAtINGREsIdUE-278')
  })

  it('should inherit the wiki property from the state', () => {
    assert.deepEqual(TryIt.vuex.getters.wiki({ wiki: '//patrickfatrick.gitbooks.io/taskmastr/content/' }), '//patrickfatrick.gitbooks.io/taskmastr/content/')
  })

  it('should inherit the auth property from the state', () => {
    assert.isFalse(TryIt.vuex.getters.auth({ auth: false }))
  })

  it('should inherit the current property from the state', () => {
    assert.isObject(TryIt.vuex.getters.current({ current: {} }))
  })

  it('should have a loginUser method', () => {
    assert.isFunction(TryIt.vuex.actions.loginUser)
  })

  it('should render with initial state', () => {
    const vm = mountVm()

    assert.deepEqual(vm.$el.querySelector('#try-it-button').textContent, 'Try it')
  })

  it('should log in to the test account on loginTestUser', () => {
    const vm = mountVm({ auth: 'mrormrstestperson@taskmastr.co' })
    promise = sinon.stub(vm.$children[0], 'loginUser').returnsPromise()

    promise.resolves('mrormrstestperson@taskmastr.co')
    sinon.stub(vm.$children[0].$route.router, 'go')

    vm.$children[0].loginTestUser('mrormrstestperson@taskmastr.co', 'S41iVAtINGREsIdUE-278', false)

    clock.tick(250)

    assert.isTrue(vm.$children[0].$route.router.go.calledWithMatch(/\/app\/list\/[a-z0-9]+/))

    vm.$children[0].$route.router.go.restore()
  })

  it('should call loginTestUser on button push', () => {
    const vm = mountVm()
    promise = sinon.stub(vm.$children[0], 'loginUser').returnsPromise()

    promise.resolves('mrormrstestperson@taskmastr.co')
    sinon.stub(vm.$children[0], 'loginTestUser')

    vm.$el.querySelector('#try-it-button').click()

    clock.tick(250)

    assert.isTrue(vm.$children[0].loginTestUser.calledWith('mrormrstestperson@taskmastr.co', 'S41iVAtINGREsIdUE-278', false))

    vm.$children[0].loginTestUser.restore()
  })
})
