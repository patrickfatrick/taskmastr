/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import TryIt from '../../../../src/components/forms/form-components/TryIt.vue'
import mountVm from '../../../mount-vm'

describe('TryItVue', function () {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should inherit the testUser property from the state', () => {
    const vm = mountVm(TryIt)
    assert.strictEqual(vm.testUser, 'taskmastr-testr@mailinator.com')
  })

  it('should inherit the testKey property from the state', () => {
    const vm = mountVm(TryIt)
    assert.strictEqual(vm.testKey, 'S41iVAtINGREsIdUE-278')
  })

  it('should inherit the wiki property from the state', () => {
    const vm = mountVm(TryIt)
    assert.strictEqual(vm.wiki, '//patrickfatrick.gitbooks.io/taskmastr/content/')
  })

  it('should inherit the authenticated property from the state', () => {
    const vm = mountVm(TryIt)
    assert.isFalse(vm.authenticated)
  })

  it('should inherit the current property from the state', () => {
    const vm = mountVm(TryIt)
    assert.isObject(vm.current)
  })

  it('should have a loginUser method', () => {
    const vm = mountVm(TryIt)
    assert.isFunction(vm.loginUser)
  })

  it('should render with initial state', () => {
    const vm = mountVm(TryIt)

    assert.strictEqual(vm.$el.querySelector('.try-it__button').textContent.trim(), 'Try it out')
  })

  it('should log in to the test account on loginTestUser', (done) => {
    const vm = mountVm(TryIt, { authenticated: 'taskmastr-testr@mailinator.com' })
    const promise = sinon.stub(vm, 'loginUser').resolves()
    sinon.stub(vm.$router, 'push')

    vm.loginTestUser('taskmastr-testr@mailinator.com', 'S41iVAtINGREsIdUE-278', false)

    promise()
      .then(() => {
        clock.tick(250)

        // assert.isTrue(vm.$router.push.calledWithMatch(/\/app\/list\/[a-z0-9]+/))
        vm.$router.push.restore()
        done()
      })
  })

  it('should call loginTestUser on button push', () => {
    const vm = mountVm(TryIt)
    sinon.stub(vm, 'loginUser').resolves('taskmastr-testr@mailinator.com')
    sinon.stub(vm, 'loginTestUser')

    vm.$el.querySelector('.try-it__button').click()
    clock.tick(250)

    assert.isTrue(vm.loginTestUser.calledWith('taskmastr-testr@mailinator.com', 'S41iVAtINGREsIdUE-278', false))
    vm.loginTestUser.restore()
  })
})
