/* global it describe */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import Menu from '../../../public/components/menu/Menu.vue'
import state from '../../../public/store/state'
import mutations from '../../../public/store/mutations'

describe('Menu.vue', function () {
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
        'test': Menu
      }
    }).$mount()
  }

  it('should inherit the menuToggled property from the state', () => {
    assert.isFalse(Menu.vuex.getters.menuToggled({ menuToggled: false }))
  })

  it('should inherit the wiki property from the state', () => {
    assert.deepEqual(Menu.vuex.getters.wiki({ wiki: '//patrickfatrick.gitbooks.io/taskmastr/content/' }), '//patrickfatrick.gitbooks.io/taskmastr/content/')
  })

  it('should inherit the repo property from the state', () => {
    assert.deepEqual(Menu.vuex.getters.repo({ repo: '//github.com/patrickfatrick/taskmastr' }), '//github.com/patrickfatrick/taskmastr')
  })

  it('should render with initial state and component tree', () => {
    const vm = mountVm()

    assert.isNotNull(vm.$el.querySelector('#menu'))
    assert.isNotNull(vm.$el.querySelector('#menu-tools'))
    assert.isNotNull(vm.$el.querySelector('#wiki-container'))
    assert.isNotNull(vm.$el.querySelector('#repo-container'))
    assert.isNotNull(vm.$el.querySelector('#darkmode-container'))
    assert.isNotNull(vm.$el.querySelector('#dark-mode'))
    assert.isNotNull(vm.$el.querySelector('#lists-list'))
    assert.isNotNull(vm.$el.querySelector('#logout-container'))
    assert.isFalse(vm.$el.querySelector('#menu').classList.contains('toggled'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm({ menuToggled: true })

    assert.isTrue(vm.$el.querySelector('#menu').classList.contains('toggled'))
  })
})
