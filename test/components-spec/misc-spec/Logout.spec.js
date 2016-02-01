/* global it describe sinon */
import chai from 'chai'
import Vue from 'vue'
import Mousetrap from 'mousetrap'
import Logout from '../../../public/components/misc/Logout.vue'

chai.should()
describe('Logout.vue', function () {
  it('should inherit the logout method from the store', () => {
    Logout.methods.logout.should.be.an.instanceof(Function)
  })

  it('should render with initial state', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Logout
      }
    }).$mount()

    vm.$el.querySelector('label').textContent.should.equal('Log out')
  })

  it('should call logout on button click', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Logout
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'logoutUser')

    vm.$el.querySelector('#logout').click()
    vm.$children[0].logoutUser.calledOnce.should.be.true

    vm.$children[0].logoutUser.restore()
    done()
  })

  it('should call logout on command+esc', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Logout
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'logoutUser')

    Mousetrap.trigger('command+esc')
    vm.$children[0].logoutUser.calledOnce.should.be.true

    vm.$children[0].logoutUser.restore()
    done()
  })
})
