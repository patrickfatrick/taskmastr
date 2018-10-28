/* global it describe */

import { assert } from 'chai'
import WarningBanner from '../../../src/components/misc/WarningBanner.vue'
import mountVm from '../../mount-vm'

describe('WarningBannerVue', function () {
  it('should inherit the username property from the store', () => {
    const vm = mountVm(WarningBanner)
    assert.strictEqual(vm.username, '')
  })

  it('should inherit the disconnect method from the store', () => {
    const vm = mountVm(WarningBanner)
    assert.isFalse(vm.disconnect)
  })

  it('should have a refresh method', () => {
    const vm = mountVm(WarningBanner)
    assert.isFunction(vm.refresh)
  })

  it('should render with initial state', () => {
    const vm = mountVm(WarningBanner)

    assert.isUndefined(vm.$el.querySelector)
  })

  it('should respond to changes in state (username)', () => {
    const vm = mountVm(WarningBanner, {
      user: { username: 'taskmastr-testr@mailinator.com' }
    })

    assert.isNotNull(vm.$el.querySelector('.warning-banner__message'))
    assert.isTrue(vm.$el.querySelector('.warning-banner__message').classList.contains('warning-banner__message--try-it'))
  })

  it('should respond to changes in state (disconnect)', () => {
    const vm = mountVm(WarningBanner, { disconnect: true })

    assert.isNotNull(vm.$el.querySelector('.warning-banner__message'))
    assert.isTrue(vm.$el.querySelector('.warning-banner__message').classList.contains('warning-banner__message--disconnect'))
  })
})
