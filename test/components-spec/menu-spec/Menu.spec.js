/* global it describe assert sinon */
import chai from 'chai'
import Vue from 'vue'
import Menu from '../../../public/components/menu/Menu.vue'

chai.should()
describe('Menu.vue', function () {
  it('should inherit the menuToggled property from the state', () => {
    Menu.computed.menuToggled().should.be.false
  })

  it('should inherit the wiki property from the state', () => {
    Menu.computed.wiki().should.equal('//patrickfatrick.gitbooks.io/taskmastr/content/')
  })

  it('should inherit the repo property from the state', () => {
    Menu.computed.repo().should.equal('//github.com/patrickfatrick/taskmastr')
  })

  it('should render with initial state and component tree', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Menu
      }
    }).$mount()

    assert.isNotNull(vm.$el.querySelector('#menu'))
    assert.isNotNull(vm.$el.querySelector('#menu-tools'))
    assert.isNotNull(vm.$el.querySelector('#wiki-container'))
    assert.isNotNull(vm.$el.querySelector('#repo-container'))
    assert.isNotNull(vm.$el.querySelector('#darkmode-container'))
    assert.isNotNull(vm.$el.querySelector('#dark-mode'))
    assert.isNotNull(vm.$el.querySelector('#lists-list'))
    assert.isNotNull(vm.$el.querySelector('#logout-container'))
    vm.$el.querySelector('#menu').classList.contains('toggled').should.be.false
  })

  it('should respond to changes in the state', () => {
    sinon.stub(Menu.computed, 'menuToggled').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Menu
      }
    }).$mount()

    vm.$el.querySelector('#menu').classList.contains('toggled').should.be.true

    Menu.computed.menuToggled.restore()
  })
})
