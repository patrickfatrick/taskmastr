/* global it describe sinon */
import chai from 'chai'
import Vue from 'vue'
import Mousetrap from 'mousetrap'
import MenuToggle from '../../../public/components/misc/MenuToggle.vue'

chai.should()
describe('MenuToggle.vue', function () {
  it('should inherit the menuToggled property from the store', () => {
    MenuToggle.computed.menuToggled().should.be.false
  })

  it('should inherit the setMenuToggled method from the store', () => {
    MenuToggle.methods.setMenuToggled.should.be.an.instanceof(Function)
  })

  it('should render with initial state', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': MenuToggle
      }
    }).$mount()

    vm.$el.querySelector('.fa').classList.contains('fa-bars').should.be.true
  })

  it('should respond to changes in state', () => {
    sinon.stub(MenuToggle.computed, 'menuToggled').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': MenuToggle
      }
    }).$mount()

    vm.$el.querySelector('.fa').classList.contains('fa-times').should.be.true
    MenuToggle.computed.menuToggled.restore()
  })

  it('should call setMenuToggled on button click', (done) => {
    sinon.stub(MenuToggle.computed, 'menuToggled').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': MenuToggle
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'setMenuToggled')

    vm.$el.querySelector('button').click()
    vm.$children[0].setMenuToggled.calledWith(true).should.be.true

    vm.$children[0].setMenuToggled.restore()
    MenuToggle.computed.menuToggled.restore()
    done()
  })

  it('should call setMenuToggled with true on alt+right', (done) => {
    sinon.stub(MenuToggle.computed, 'menuToggled').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': MenuToggle
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'setMenuToggled')

    Mousetrap.trigger('alt+right')
    vm.$children[0].setMenuToggled.calledWith(true).should.be.true

    vm.$children[0].setMenuToggled.restore()
    MenuToggle.computed.menuToggled.restore()
    done()
  })

  it('should call setMenuToggled with true on alt+right (start on true)', (done) => {
    sinon.stub(MenuToggle.computed, 'menuToggled').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': MenuToggle
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'setMenuToggled')

    Mousetrap.trigger('alt+right')
    vm.$children[0].setMenuToggled.calledWith(true).should.be.true

    vm.$children[0].setMenuToggled.restore()
    MenuToggle.computed.menuToggled.restore()
    done()
  })

  it('should call setMenuToggled with false on alt+left', (done) => {
    sinon.stub(MenuToggle.computed, 'menuToggled').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': MenuToggle
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'setMenuToggled')

    Mousetrap.trigger('alt+left')
    vm.$children[0].setMenuToggled.calledWith(false).should.be.true

    vm.$children[0].setMenuToggled.restore()
    MenuToggle.computed.menuToggled.restore()
    done()
  })

  it('should call setMenuToggled with false on alt+left (start on false)', (done) => {
    sinon.stub(MenuToggle.computed, 'menuToggled').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': MenuToggle
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'setMenuToggled')

    Mousetrap.trigger('alt+left')
    vm.$children[0].setMenuToggled.calledWith(false).should.be.true

    vm.$children[0].setMenuToggled.restore()
    MenuToggle.computed.menuToggled.restore()
    done()
  })
})
