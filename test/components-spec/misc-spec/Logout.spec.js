/* global it describe sinon */
import chai from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import Mousetrap from 'mousetrap'
import Logout from '../../../public/components/misc/Logout.vue'
import state from '../../../public/store/state'
import mutations from '../../../public/store/mutations'

chai.should()
describe('Logout.vue', function () {
  function mountVm () {
    return new Vue({
      store: new Vuex.Store({
        state,
        mutations
      }),
      template: '<div><test></test></div>',
      components: {
        'test': Logout
      }
    }).$mount()
  }

  it('should inherit the logout method from the store', () => {
    Logout.vuex.actions.logoutUser.should.be.an.instanceof(Function)
  })

  it('should have a logout method', () => {
    Logout.methods.logout.should.be.an.instanceof(Function)
  })

  it('should render with initial state', () => {
    const vm = mountVm()

    vm.$el.querySelector('label').textContent.should.equal('Log out')
  })

  it('should call logout on button click', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'logoutUser')

    vm.$el.querySelector('#logout').click()
    vm.$children[0].logoutUser.calledOnce.should.be.true

    vm.$children[0].logoutUser.restore()
  })

  it('should call logout on command+esc', () => {
    const vm = mountVm()

    sinon.stub(vm.$children[0], 'logoutUser')

    Mousetrap.trigger('command+esc')
    vm.$children[0].logoutUser.calledOnce.should.be.true

    vm.$children[0].logoutUser.restore()
  })
})
