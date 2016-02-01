/* global it describe sinon */
import chai from 'chai'
import Vue from 'vue'
import Mousetrap from 'mousetrap'
import Save from '../../../public/components/misc/Save.vue'

chai.should()
describe('Save.vue', function () {
  it('should inherit the saveButton property from the store', () => {
    Save.computed.saveButton().should.be.true
  })

  it('should inherit the saveUser method from the store', () => {
    Save.methods.saveUser.should.be.an.instanceof(Function)
  })

  it('should have a save method', () => {
    Save.methods.save.should.be.an.instanceof(Function)
  })

  it('should render with initial state', () => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Save
      }
    }).$mount()

    vm.$el.querySelector('#save-button').textContent.should.equal('Save')
  })

  it('should call saveUser on button click', (done) => {
    sinon.stub(Save.computed, 'saveButton').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Save
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'saveUser')

    vm.$el.querySelector('#save-button').click()
    vm.$children[0].saveUser.calledOnce.should.be.true

    vm.$children[0].saveUser.restore()
    Save.computed.saveButton.restore()
    done()
  })

  it('should call saveUser on command+s', (done) => {
    sinon.stub(Save.computed, 'saveButton').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Save
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'saveUser')

    Mousetrap.trigger('command+s')
    vm.$children[0].saveUser.calledOnce.should.be.true

    vm.$children[0].saveUser.restore()
    Save.computed.saveButton.restore()
    done()
  })

  it('should not call saveUser if !saveButton on command+s', (done) => {
    sinon.stub(Save.computed, 'saveButton').returns(false)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': Save
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'saveUser')

    Mousetrap.trigger('command+s')
    vm.$children[0].saveUser.calledOnce.should.be.false

    vm.$children[0].saveUser.restore()
    Save.computed.saveButton.restore()
    done()
  })
})
