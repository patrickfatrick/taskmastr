/* global it describe assert */
import chai from 'chai'
import Vue from 'vue'
import Tasks from '../../../public/components/tasks/Tasks.vue'
import store from '../../../public/store'

chai.should()
describe('Tasks.vue', function () {
  it('should inherit the user property from the state', () => {
    Tasks.vuex.getters.user({ user: {} }).should.be.an.instanceof(Object)
  })

  it('should render with initial state and component tree', () => {
    const vm = new Vue({
      store,
      template: '<div><test></test></div>',
      components: {
        'test': Tasks
      }
    }).$mount()

    assert.isNotNull(vm.$el.querySelector('#content'))
    assert.isNotNull(vm.$el.querySelector('#icon-menu'))
    assert.isNotNull(vm.$el.querySelector('#todo-line'))
    assert.isNotNull(vm.$el.querySelector('#task-list'))
  })
})
