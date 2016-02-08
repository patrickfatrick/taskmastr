/* global it describe sinon */
import chai from 'chai'
import Vue from 'vue'
import Mousetrap from 'mousetrap'
import Darkmode from '../../../../public/components/menu/menu-components/Darkmode.vue'

chai.should()
describe('Darkmode.vue', function () {
  it('should inherit the darkmode property from the state', () => {
    Darkmode.computed.darkmode().should.equal(false)
  })

  it('should have a setDarkmode method', () => {
    Darkmode.methods.setDarkmode.should.be.an.instanceof(Function)
  })

  it('should render with initial state', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Darkmode
      }
    }).$mount()

    vm.$el.querySelector('.fa').classList.contains('fa-moon-o').should.be.true
  })

  it('should respond to changes in the state', (done) => {
    sinon.stub(Darkmode.computed, 'darkmode').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Darkmode
      }
    }).$mount()

    vm.$el.querySelector('.fa').classList.contains('fa-sun-o').should.be.true

    Darkmode.computed.darkmode.restore()
    done()
  })

  it('should call setDarkmode on button click', (done) => {
    sinon.stub(Darkmode.computed, 'darkmode').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Darkmode
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'setDarkmode')

    vm.$el.querySelector('#dark-mode').click()
    vm.$children[0].setDarkmode.calledWith(true).should.be.true

    Darkmode.computed.darkmode.restore()
    vm.$children[0].setDarkmode.restore()
    done()
  })

  it('should call setDarkmode on command+m', (done) => {
    sinon.stub(Darkmode.computed, 'darkmode').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Darkmode
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'setDarkmode')

    Mousetrap.trigger('command+m')
    vm.$children[0].setDarkmode.calledWith(true).should.be.true

    Darkmode.computed.darkmode.restore()
    vm.$children[0].setDarkmode.restore()
    done()
  })
})
