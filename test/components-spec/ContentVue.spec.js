/* global it describe */
import { assert } from 'chai'
import Vue from 'vue'
import ContentVue from '../../public/components/ContentVue.vue'
import store from '../../public/store'

describe('ContentVue.vue', function () {
  it('should inherit the auth property from the state', () => {
    ContentVue.vuex.getters.auth({ auth: false }).should.be.false
  })

  it('should render with initial state and component tree', () => {
    const vm = new Vue({
      store,
      template: '<div><test></test></div>',
      components: {
        'test': ContentVue
      }
    }).$mount()

    assert.isNotNull(vm.$el.querySelector('#menu'))
    assert.isNotNull(vm.$el.querySelector('router-view'))
  })
})
