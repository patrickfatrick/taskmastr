/* global it describe sinon */
import chai from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import Mousetrap from 'mousetrap'
import MenuToggle from '../../../public/components/misc/MenuToggle.vue'
import state from '../../../public/store/state'
import mutations from '../../../public/store/mutations'

chai.should()
describe('MenuToggle.vue', function () {
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
        'test': MenuToggle
      }
    }).$mount()
  }

  it('should inherit the menuToggled property from the store', () => {
    MenuToggle.vuex.getters.menuToggled({ menuToggled: false }).should.be.false
  })

  it('should inherit the setMenuToggled method from the store', () => {
    MenuToggle.vuex.actions.setMenuToggled.should.be.an.instanceof(Function)
  })

  it('should render with initial state', () => {
    const vm = mountVm({})

    vm.$el.querySelector('.fa').classList.contains('fa-bars').should.be.true
  })

  it('should respond to changes in state', () => {
    const vm = mountVm({ menuToggled: true })

    vm.$el.querySelector('.fa').classList.contains('fa-times').should.be.true
  })

  it('should call setMenuToggled on button click', () => {
    const vm = mountVm({})

    sinon.stub(vm.$children[0], 'setMenuToggled')

    vm.$el.querySelector('button').click()
    vm.$children[0].setMenuToggled.calledWith(true).should.be.true

    vm.$children[0].setMenuToggled.restore()
  })

  it('should call setMenuToggled with true on alt+right', () => {
    const vm = mountVm({})

    sinon.stub(vm.$children[0], 'setMenuToggled')

    Mousetrap.trigger('alt+right')
    vm.$children[0].setMenuToggled.calledWith(true).should.be.true

    vm.$children[0].setMenuToggled.restore()
  })

  it('should call setMenuToggled with true on alt+right (start on true)', () => {
    const vm = mountVm({ menuToggled: true })

    sinon.stub(vm.$children[0], 'setMenuToggled')

    Mousetrap.trigger('alt+right')
    vm.$children[0].setMenuToggled.calledWith(true).should.be.true

    vm.$children[0].setMenuToggled.restore()
  })

  it('should call setMenuToggled with false on alt+left', () => {
    const vm = mountVm({ menuToggled: true })

    sinon.stub(vm.$children[0], 'setMenuToggled')

    Mousetrap.trigger('alt+left')
    vm.$children[0].setMenuToggled.calledWith(false).should.be.true

    vm.$children[0].setMenuToggled.restore()
  })

  it('should call setMenuToggled with false on alt+left (start on false)', () => {
    const vm = mountVm({})

    sinon.stub(vm.$children[0], 'setMenuToggled')

    Mousetrap.trigger('alt+left')
    vm.$children[0].setMenuToggled.calledWith(false).should.be.true

    vm.$children[0].setMenuToggled.restore()
  })
})
