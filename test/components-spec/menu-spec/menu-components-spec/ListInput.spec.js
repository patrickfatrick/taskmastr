/* global it describe sinon */
import { assert } from 'chai'
import ListInput from '../../../../public/components/menu/menu-components/ListInput.vue'
import mountVm from '../../../mount-vm'

describe('ListInputVue', function () {
  it('should inherit the newList property from the state', () => {
    const vm = mountVm(ListInput)
    assert.strictEqual(vm.newList, '')
  })

  it('should inherit the listAttempt property from the state', () => {
    const vm = mountVm(ListInput)
    assert.isFalse(vm.listAttempt)
  })

  it('should inherit the user property from the state', () => {
    const vm = mountVm(ListInput)
    assert.isObject(vm.user)
  })

  it('should have a validate property', () => {
    const vm = mountVm(ListInput)
    assert.deepEqual(vm.validate, { newListRequired: false })
  })

  it('should have an isValid property', () => {
    const vm = mountVm(ListInput)
    assert.isFalse(vm.isValid)
  })

  it('should inherit a setNewList action from the store', () => {
    const vm = mountVm(ListInput)
    assert.isFunction(vm.setNewList)
  })

  it('should inherit a setListAttempt action from the store', () => {
    const vm = mountVm(ListInput)
    assert.isFunction(vm.setListAttempt)
  })

  it('should have an addList method', () => {
    const vm = mountVm(ListInput)
    assert.isFunction(vm.addList)
  })

  it('should render with initial state', () => {
    const vm = mountVm(ListInput)
    assert.isFalse(vm.$el.querySelector('#create-list').classList.contains('invalid'))
  })

  it('should respond to changes in the state', () => {
    const vm = mountVm(ListInput, { listAttempt: true })
    vm.isValid = false

    assert.isTrue(vm.$el.querySelector('#create-list').classList.contains('invalid'))
  })

  it('should call addList on form submit', () => {
    const vm = mountVm(ListInput, { listAttempt: true, newList: 'New list' })
    sinon.stub(vm, 'addList')
    vm.isValid = true

    vm.$el.querySelector('#list-button').click()
    assert.isTrue(vm.addList.calledOnce)

    vm.addList.restore()
  })

  it('should do nothing if !isValid', () => {
    const vm = mountVm(ListInput, { listAttempt: true, newList: '' })
    sinon.stub(vm, 'addList')
    vm.isValid = false

    vm.$el.querySelector('#list-button').click()
    assert.isFalse(vm.addList.calledOnce)

    vm.addList.restore()
  })
})
