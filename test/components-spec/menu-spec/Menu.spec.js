/* global it describe */
import { assert } from 'chai'
import Menu from '../../../src/components/menu/Menu.vue'
import mountVm from '../../mount-vm'

describe('MenuVue', function () {
  it('should inherit the menuToggled property from the state', () => {
    const vm = mountVm(Menu)
    assert.isFalse(vm.menuToggled)
  })

  it('should inherit the wiki property from the state', () => {
    const vm = mountVm(Menu)
    assert.strictEqual(vm.wiki, '//patrickfatrick.gitbooks.io/taskmastr/content/')
  })

  it('should inherit the repo property from the state', () => {
    const vm = mountVm(Menu)
    assert.strictEqual(vm.repo, '//github.com/patrickfatrick/taskmastr')
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm(Menu)

    assert.strictEqual(vm.$el.getAttribute('id'), 'menu')
    assert.isNotNull(vm.$el.querySelector('#menu-tools'))
    assert.isNotNull(vm.$el.querySelector('#wiki-container'))
    assert.isNotNull(vm.$el.querySelector('#repo-container'))
    assert.isNotNull(vm.$el.querySelector('#darkmode-container'))
    assert.isNotNull(vm.$el.querySelector('#dark-mode'))
    assert.isNotNull(vm.$el.querySelector('#lists-list'))
    assert.isNotNull(vm.$el.querySelector('#logout-container'))
    assert.isFalse(vm.$el.classList.contains('toggled'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm(Menu, { menuToggled: true })

    assert.isTrue(vm.$el.classList.contains('toggled'))
  })
})
