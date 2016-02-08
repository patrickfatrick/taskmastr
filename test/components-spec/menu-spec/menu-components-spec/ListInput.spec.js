/* global it describe sinon */
import chai from 'chai'
import Vue from 'vue'
import ListInput from '../../../../public/components/menu/menu-components/ListInput.vue'

chai.should()
describe('ListInput.vue', function () {
  it('should inherit the newList property from the state', () => {
    ListInput.computed.newList().should.equal('')
  })

  it('should inherit the listAttempt property from the state', () => {
    ListInput.computed.listAttempt().should.equal(false)
  })

  it('should inherit the user property from the state', () => {
    ListInput.computed.user().should.be.an.instanceof(Object)
  })

  it('should have a validate property', () => {
    ListInput.computed.validate.should.be.an.instanceof(Function)
  })

  it('should have an isValid property', () => {
    ListInput.computed.isValid.should.be.an.instanceof(Function)
  })

  it('should inherit a setNewList action from the store', () => {
    ListInput.methods.setNewList.should.be.an.instanceof(Function)
  })

  it('should inherit a setListAttempt action from the store', () => {
    ListInput.methods.setListAttempt.should.be.an.instanceof(Function)
  })

  it('should have an addList method', () => {
    ListInput.methods.addList.should.be.an.instanceof(Function)
  })

  it('should render with initial state', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ListInput
      }
    }).$mount()

    vm.$el.querySelector('#create-list').classList.contains('invalid').should.be.false
    done()
  })

  it('should respond to changes in the state', (done) => {
    sinon.stub(ListInput.computed, 'isValid').returns(false)
    sinon.stub(ListInput.computed, 'listAttempt').returns(true)
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ListInput
      }
    }).$mount()

    vm.$el.querySelector('#create-list').classList.contains('invalid').should.be.true

    ListInput.computed.isValid.restore()
    ListInput.computed.listAttempt.restore()
    done()
  })

  it('should call addList on form submit', (done) => {
    sinon.stub(ListInput.computed, 'isValid').returns(true)
    sinon.stub(ListInput.computed, 'listAttempt').returns(true)
    sinon.stub(ListInput.computed, 'newList').returns('New list')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ListInput
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'addList')

    vm.$el.querySelector('#list-button').click()
    vm.$children[0].addList.calledOnce.should.be.true

    vm.$children[0].addList.restore()
    ListInput.computed.isValid.restore()
    ListInput.computed.listAttempt.restore()
    ListInput.computed.newList.restore()
    done()
  })

  it('should do nothing if !isValid', (done) => {
    sinon.stub(ListInput.computed, 'isValid').returns(false)
    sinon.stub(ListInput.computed, 'listAttempt').returns(true)
    sinon.stub(ListInput.computed, 'newList').returns('')
    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': ListInput
      }
    }).$mount()
    sinon.stub(vm.$children[0], 'addList')

    vm.$el.querySelector('#list-button').click()
    vm.$children[0].addList.calledOnce.should.be.false

    vm.$children[0].addList.restore()
    ListInput.computed.isValid.restore()
    ListInput.computed.listAttempt.restore()
    ListInput.computed.newList.restore()
    done()
  })
})
