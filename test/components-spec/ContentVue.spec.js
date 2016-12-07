/* global it describe */
import { assert } from 'chai'
import ContentVue from '../../public/components/ContentVue.vue'
import mountVm from '../mount-vm'

describe('ContentVue', function () {
  it('should inherit the auth property from the state', () => {
    const vm = mountVm(ContentVue)
    assert.isFalse(vm.auth)
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm(ContentVue)
    assert.strictEqual(vm.$el.getAttribute('id'), 'content-vue')
    assert.isNotNull(vm.$el.querySelector('#menu'))
  })
})
