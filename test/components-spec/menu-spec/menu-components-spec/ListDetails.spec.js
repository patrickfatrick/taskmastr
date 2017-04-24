/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import ListDetails from '../../../../src/components/menu/menu-components/ListDetails.vue'
import mountVm from '../../../mount-vm'

describe('ListDetailsVue', function () {
  let list
  let index

  beforeEach(() => {
    list = {
      _id: 'listid',
      owner: 'username',
      users: []
    }
    index = 0
  })

  afterEach(() => {
    list = null
    index = null
  })

  it('should inherit the username property from the state', () => {
    const vm = mountVm(ListDetails, {}, { list, index })
    assert.strictEqual(vm.username, '')
  })

  it('should inherit the listDetailsToggled property from the state', () => {
    const vm = mountVm(ListDetails, {}, { list, index })
    assert.isNull(vm.listDetailsToggled)
  })

  it('should have a newUser property', () => {
    const vm = mountVm(ListDetails, {}, { list, index })
    assert.isNull(vm.newUser)
  })

  it('should have a validate property', () => {
    const vm = mountVm(ListDetails, {}, { list, index })
    vm.newUser = 'notusername'
    assert.deepEqual(vm.validate, { newUserEmail: false, notYourEmail: true })
  })

  it('should have an isValid property', () => {
    const vm = mountVm(ListDetails, {}, { list, index })
    vm.newUser = 'notusername'
    assert.isFalse(vm.isValid)
  })

  it('should inherit a addListUser action from the store', () => {
    const vm = mountVm(ListDetails, {}, { list, index })
    assert.isFunction(vm.addListUser)
  })

  it('should inherit a removeListUser action from the store', () => {
    const vm = mountVm(ListDetails, {}, { list, index })
    assert.isFunction(vm.removeListUser)
  })

  it('should have a reformDate method', () => {
    const vm = mountVm(ListDetails, {}, { list, index })
    assert.isFunction(vm.reformDate)
  })

  it('should have a truncateUsername method', () => {
    const vm = mountVm(ListDetails, {}, { list, index })
    assert.isFunction(vm.truncateUsername)
  })

  it('should render with initial state', () => {
    const vm = mountVm(ListDetails, {}, { list, index })
    assert.isFalse(vm.$el.classList.contains('list-details--toggled'))
  })

  it('should respond to changes in the state (listDetailsToggled)', () => {
    const vm = mountVm(ListDetails, { listDetailsToggled: 'listid' }, { list, index })
    assert.isTrue(vm.$el.classList.contains('list-details--toggled'))
  })

  it('should respond to changes in the state (username === owner)', () => {
    list = {
      owner: 'username',
      users: [{ username: 'notusername', status: 'active' }]
    }

    const vm = mountVm(ListDetails, { user: { username: 'username' } }, { list, index })

    assert.isFalse(vm.$el.classList.contains('list-details--toggled'))
    assert.isAbove(vm.$el.querySelector('.user-list__owner').textContent.indexOf('You'), -1)
    assert.isNotNull(vm.$el.querySelector('.user-list__row__user-remove-button-container__button'))
    assert.isNotNull(vm.$el.querySelector('.user-list__row__new-user'))
  })

  it('should respond to changes in the state (username === user)', () => {
    list = {
      owner: 'notusername',
      users: [{ username: 'username', status: 'active' }]
    }

    const vm = mountVm(ListDetails, { user: { username: 'username' } }, { list, index })

    assert.isFalse(vm.$el.classList.contains('list-details--toggled'))
    assert.notInclude(vm.$el.querySelector('.user-list__owner').textContent, 'You')
    assert.include(vm.$el.querySelector('.user-list__row__user-name').textContent, 'You')
    assert.isFalse(vm.$el.querySelector('.user-list__row__user-name').classList.contains('pending'))
    assert.isNotNull(vm.$el.querySelector('.user-list__row__user-remove-button-container__button'))
    assert.isNull(vm.$el.querySelector('.user-list__row__new-user'))
  })

  it('should respond to changes in the state (status === pending)', () => {
    list = {
      owner: 'owner',
      users: [{ username: 'username', status: 'pending' }]
    }

    const vm = mountVm(ListDetails, { user: { username: 'notusername' } }, { list, index })

    assert.isFalse(vm.$el.classList.contains('list-details--toggled'))
    assert.notInclude(vm.$el.querySelector('.user-list__owner').textContent, 'You')
    assert.include(vm.$el.querySelector('.user-list__row__user-name').textContent, 'username')
    assert.isTrue(vm.$el.querySelector('.user-list__row__user-name').classList.contains('user-list__row__user-name--pending'))
    assert.isNull(vm.$el.querySelector('.user-list__row__user-remove-button-container__button'))
    assert.isNull(vm.$el.querySelector('.user-list__row__new-user'))
  })

  it('should reformat date on reformDate', () => {
    const vm = mountVm(ListDetails, {}, { list, index })
    assert.strictEqual(vm.reformDate('2016-01-01T00:00:00.000Z'), 'Dec 31, 2015')
  })

  it('should truncate username on truncateUsername', () => {
    const vm = mountVm(ListDetails, {}, { list, index })
    assert.strictEqual(vm.truncateUsername('beepboopveepvoopdeepdoop', 20), 'beepboopveepvoopdeep ...')
  })

  it('should NOT truncate username on truncateUsername if length > username.length', () => {
    const vm = mountVm(ListDetails, {}, { list, index })
    assert.deepEqual(vm.truncateUsername('beepboopveepvoopdeepdoop', 25), 'beepboopveepvoopdeepdoop')
  })

  it('should call addNewListUser on form submit', () => {
    list = {
      owner: 'username',
      users: []
    }
    const vm = mountVm(ListDetails, { user: { username: 'username' } }, { list, index })
    vm.isValid = true
    sinon.stub(vm, 'addNewListUser')

    vm.changeNewUser('notusername@domain.com')
    vm.$el.querySelector('.user-list__row__new-user__button-container__button').click()
    assert.isTrue(vm.addNewListUser.calledWith(0))

    vm.addNewListUser.restore()
  })

  it('should call removeListUser on button click', () => {
    list = {
      owner: 'username',
      users: [{ username: 'notusername@domain.com', status: 'active' }]
    }

    const vm = mountVm(ListDetails, { user: { username: 'username' } }, { list, index })
    sinon.stub(vm, 'removeListUser')

    vm.$el.querySelector('.user-list__row__user-remove-button-container__button').click()
    assert.isTrue(vm.removeListUser.calledWith({ index: 0, user: { username: 'notusername@domain.com', status: 'active' } }))

    vm.removeListUser.restore()
  })

  it('should call addListUser on addNewListUser', () => {
    list = {
      owner: 'username',
      users: []
    }

    const vm = mountVm(ListDetails, { user: { username: 'username' } }, { list, index })
    sinon.stub(vm, 'addListUser')
    vm.changeNewUser('notusername@domain.com')

    vm.addNewListUser(0, 'notusername@domain.com')
    assert.isTrue(vm.addListUser.calledWith({ index: 0, user: { username: 'notusername@domain.com', status: 'pending' } }))

    vm.addListUser.restore()
  })

  it('should not call addListUser on addNewListUser if !isValid', () => {
    list = {
      owner: 'username',
      users: []
    }

    const vm = mountVm(ListDetails, { user: { username: 'username' } }, { list, index })
    sinon.stub(vm, 'addListUser')
    vm.changeNewUser('notusername')

    vm.addNewListUser(0, 'notusername')
    assert.isFalse(vm.addListUser.calledOnce)

    vm.addListUser.restore()
  })

  it('should validate newUser as an email address', () => {
    const vm = mountVm(ListDetails, { user: { username: 'username' } }, { list, index })

    vm.changeNewUser('notusername')
    assert.strictEqual(vm.newUser, 'notusername')
    assert.isFalse(vm.validate.newUserEmail)
    assert.isTrue(vm.validate.notYourEmail)
    assert.isFalse(vm.isValid)
  })

  it('should validate newUser as not your email address', () => {
    const vm = mountVm(ListDetails, { user: { username: 'username' } }, { list, index })

    vm.changeNewUser('username')
    assert.isFalse(vm.validate.newUserEmail)
    assert.isFalse(vm.validate.notYourEmail)
    assert.isFalse(vm.isValid)
  })

  it('isValid should return true if validate is all true', () => {
    const vm = mountVm(ListDetails, { user: { username: 'username' } }, { list, index })

    vm.changeNewUser('notusername@domain.com')
    assert.isTrue(vm.validate.newUserEmail)
    assert.isTrue(vm.validate.notYourEmail)
    assert.isTrue(vm.isValid)
  })
})
