/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import TryIt from '../../../../public/components/forms/form-components/TryIt.vue'
import mountVm from '../../../mount-vm'

describe('TryItVue', function () {
  let clock
  let promise

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should inherit the testUser property from the state', () => {
    const vm = mountVm(TryIt)
    assert.strictEqual(vm.testUser, 'mrormrstestperson@taskmastr.co')
  })

  it('should inherit the testKey property from the state', () => {
    const vm = mountVm(TryIt)
    assert.strictEqual(vm.testKey, 'S41iVAtINGREsIdUE-278')
  })

  it('should inherit the wiki property from the state', () => {
    const vm = mountVm(TryIt)
    assert.strictEqual(vm.wiki, '//patrickfatrick.gitbooks.io/taskmastr/content/')
  })

  it('should inherit the auth property from the state', () => {
    const vm = mountVm(TryIt)
    assert.isFalse(vm.auth)
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

    assert.strictEqual(vm.$el.querySelector('#try-it-button').textContent, 'Try it out')
  })

  it('should log in to the test account on loginTestUser', () => {
    const vm = mountVm(TryIt, { auth: 'mrormrstestperson@taskmastr.co' })
    promise = sinon.stub(vm, 'loginUser').returnsPromise()
    promise.resolves('mrormrstestperson@taskmastr.co')
    sinon.stub(vm.$router, 'push')

    vm.loginTestUser('mrormrstestperson@taskmastr.co', 'S41iVAtINGREsIdUE-278', false)
    clock.tick(250)

    assert.isTrue(vm.$router.push.calledWithMatch(/\/app\/list\/[a-z0-9]+/))
    vm.$router.push.restore()
  })

  it('should call loginTestUser on button push', () => {
    const vm = mountVm(TryIt)
    promise = sinon.stub(vm, 'loginUser').returnsPromise()
    promise.resolves('mrormrstestperson@taskmastr.co')
    sinon.stub(vm, 'loginTestUser')

    vm.$el.querySelector('#try-it-button').click()
    clock.tick(250)

    assert.isTrue(vm.loginTestUser.calledWith('mrormrstestperson@taskmastr.co', 'S41iVAtINGREsIdUE-278', false))
    vm.loginTestUser.restore()
  })
})
