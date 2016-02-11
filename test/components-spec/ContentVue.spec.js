/* global it describe assert */
import chai from 'chai'
import Vue from 'vue'
import ContentVue from '../../public/components/ContentVue.vue'

chai.should()
describe('ContentVue.vue', function () {
  it('should inherit the auth property from the state', () => {
    ContentVue.computed.auth().should.be.false
  })

  it('should render with initial state and component tree', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ContentVue
      }
    }).$mount()

    assert.isNotNull(vm.$el.querySelector('#menu'))
    assert.isNotNull(vm.$el.querySelector('#content'))
  })
})
