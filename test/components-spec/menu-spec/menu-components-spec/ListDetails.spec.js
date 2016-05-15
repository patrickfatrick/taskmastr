/* global it describe sinon beforeEach afterEach */
import { assert } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import ListDetailsInjector from 'inject?../../../store/list-store/list-actions!../../../../public/components/menu/menu-components/ListDetails.vue'
// import ListDetails from '../../../../public/components/menu/menu-components/ListDetails.vue'
import state from '../../../../public/store/state'
import mutations from '../../../../public/store/mutations'

const ListDetails = ListDetailsInjector({
  '../../../store/list-store/list-actions': {
    addListUser (index, user) {
      return user
    },
    removeListUser (index, user) {
      return user
    }
  }
})

describe('ListDetails.vue', function () {
  let list
  let index

  function mountVm (changes, newUser) {
    return new Vue({
      store: new Vuex.Store({
        state: {
          ...state,
          ...changes
        },
        mutations
      }),
      template: '<div><test :list="list" :index="index" :newUser="newUser"></test></div>',
      data: {
        list,
        index,
        newUser
      },
      components: {
        test: ListDetails
      }
    }).$mount()
  }

  beforeEach(() => {
    list = {
      id: 'listid'
    }
    index = 0
  })

  afterEach(() => {
    list = null
    index = null
  })

  it('should inherit the username property from the state', () => {
    assert.deepEqual(ListDetails.vuex.getters.username({ user: { username: 'username' } }), 'username')
  })

  it('should inherit the listDetailsToggled property from the state', () => {
    assert.isNull(ListDetails.vuex.getters.listDetailsToggled({ listDetailsToggled: null }))
  })

  it('should have a newUser property', () => {
    assert.isNull(ListDetails.computed.newUser())
  })

  it('should have a validate property', () => {
    assert.isFunction(ListDetails.computed.validate)
  })

  it('should have an isValid property', () => {
    assert.isFunction(ListDetails.computed.isValid)
  })

  it('should inherit a addListUser action from the store', () => {
    assert.isFunction(ListDetails.vuex.actions.addListUser)
  })

  it('should inherit a removeListUser action from the store', () => {
    assert.isFunction(ListDetails.vuex.actions.removeListUser)
  })

  it('should have a reformatDate method', () => {
    assert.isFunction(ListDetails.methods.reformatDate)
  })

  it('should have a truncateUsername method', () => {
    assert.isFunction(ListDetails.methods.truncateUsername)
  })

  it('should render with initial state', () => {
    const vm = mountVm()

    assert.isFalse(vm.$el.querySelector('.list-details').classList.contains('toggled'))
  })

  it('should respond to changes in the state (listDetailsToggled)', () => {
    const vm = mountVm({ listDetailsToggled: 'listid' })

    assert.isTrue(vm.$el.querySelector('.list-details').classList.contains('toggled'))
  })

  it('should respond to changes in the state (username === owner)', () => {
    list = {
      owner: 'username',
      users: [{ username: 'notusername', status: 'active' }]
    }

    const vm = mountVm({ user: { username: 'username' } })

    assert.isFalse(vm.$el.querySelector('.list-details').classList.contains('toggled'))
    assert.isAbove(vm.$el.querySelector('.list-owner').textContent.indexOf('You'), -1)
    assert.isNotNull(vm.$el.querySelector('.user-remove-button'))
    assert.isNotNull(vm.$el.querySelector('.new-user'))
  })

  it('should respond to changes in the state (username === user)', () => {
    list = {
      users: [{ username: 'username', status: 'active' }]
    }

    const vm = mountVm({ user: { username: 'username' } })

    assert.isFalse(vm.$el.querySelector('.list-details').classList.contains('toggled'))
    assert.deepEqual(vm.$el.querySelector('.list-owner').textContent.indexOf('You'), -1)
    assert.isAbove(vm.$el.querySelector('.user-name').textContent.indexOf('You'), -1)
    assert.isFalse(vm.$el.querySelector('.user-name').classList.contains('pending'))
    assert.isNotNull(vm.$el.querySelector('.user-remove-button'))
    assert.isNull(vm.$el.querySelector('.new-user'))
  })

  it('should respond to changes in the state (status === pending)', () => {
    list = {
      users: [{ username: 'notusername', status: 'pending' }]
    }

    const vm = mountVm({ user: { username: 'username' } })

    assert.isFalse(vm.$el.querySelector('.list-details').classList.contains('toggled'))
    assert.deepEqual(vm.$el.querySelector('.list-owner').textContent.indexOf('You'), -1)
    assert.isAbove(vm.$el.querySelector('.user-name').textContent.indexOf('username'), -1)
    assert.isTrue(vm.$el.querySelector('.user-name').classList.contains('pending'))
    assert.isNull(vm.$el.querySelector('.user-remove-button'))
    assert.isNull(vm.$el.querySelector('.new-user'))
  })

  it('should reformat date on reformatDate', () => {
    const vm = mountVm()

    assert.deepEqual(vm.$children[0].reformatDate('2016-01-01T00:00:00.000Z'), 'Dec 31, 2015')
  })

  it('should truncate username on truncateUsername', () => {
    const vm = mountVm()

    assert.deepEqual(vm.$children[0].truncateUsername('beepboopveepvoopdeepdoop', 20), 'beepboopveepvoopdeep ...')
  })

  it('should NOT truncate username on truncateUsername if length > username.length', () => {
    const vm = mountVm()

    assert.deepEqual(vm.$children[0].truncateUsername('beepboopveepvoopdeepdoop', 25), 'beepboopveepvoopdeepdoop')
  })

  it('should call addNewListUser on form submit', () => {
    list = {
      owner: 'username'
    }

    sinon.stub(ListDetails.computed, 'isValid').returns(true)
    sinon.stub(ListDetails.computed, 'newUser').returns('notusername@domain.com')
    const vm = mountVm({ user: { username: 'username' } })
    sinon.stub(vm.$children[0], 'addNewListUser')

    vm.$el.querySelector('.new-user-button').click()
    assert.isTrue(vm.$children[0].addNewListUser.calledWith(0, 'notusername@domain.com'))

    vm.$children[0].addNewListUser.restore()
    ListDetails.computed.isValid.restore()
    ListDetails.computed.newUser.restore()
  })

  it('should call removeListUser on button click', () => {
    list = {
      owner: 'username',
      users: [{ username: 'notusername@domain.com', status: 'active' }]
    }

    const vm = mountVm({ user: { username: 'username' } })
    sinon.stub(vm.$children[0], 'removeListUser')

    vm.$el.querySelector('.user-remove-button').click()
    assert.isTrue(vm.$children[0].removeListUser.calledWith(0, { username: 'notusername@domain.com', status: 'active' }))

    vm.$children[0].removeListUser.restore()
  })

  it('should call addListUser on addNewListUser', () => {
    list = {
      owner: 'username'
    }

    sinon.stub(ListDetails.computed, 'isValid').returns(true)
    const vm = mountVm({ user: { username: 'username' } })
    sinon.stub(vm.$children[0], 'addListUser')

    vm.$children[0].addNewListUser(0, 'notusername')
    assert.isTrue(vm.$children[0].addListUser.calledWith(0, { username: 'notusername', status: 'pending' }))

    vm.$children[0].addListUser.restore()
    ListDetails.computed.isValid.restore()
  })

  it('should not call addListUser on addNewListUser if !isValid', () => {
    list = {
      owner: 'username'
    }

    sinon.stub(ListDetails.computed, 'isValid').returns(false)
    const vm = mountVm({ user: { username: 'username' } })
    sinon.stub(vm.$children[0], 'addListUser')

    vm.$children[0].addNewListUser(0, 'notusername')
    assert.isFalse(vm.$children[0].addListUser.calledOnce)

    vm.$children[0].addListUser.restore()
    ListDetails.computed.isValid.restore()
  })

  it('should validate newUser as an email address', () => {
    sinon.stub(ListDetails.computed, 'newUser').returns('notusername')
    const vm = mountVm({ user: { username: 'username' } }, 'notusername')

    console.log(vm.$children[0].newUser)
    assert.isFalse(vm.$children[0].validate.newUserEmail)
    assert.isTrue(vm.$children[0].validate.notYourEmail)
    assert.isFalse(vm.$children[0].isValid)

    ListDetails.computed.newUser.restore()
  })

  it('should validate newUser as not your email address', () => {
    sinon.stub(ListDetails.computed, 'newUser').returns('username')
    const vm = mountVm({ user: { username: 'username' } })

    assert.isFalse(vm.$children[0].validate.newUserEmail)
    assert.isFalse(vm.$children[0].validate.notYourEmail)
    assert.isFalse(vm.$children[0].isValid)

    ListDetails.computed.newUser.restore()
  })

  it('isValid should return true if validate is all true', () => {
    sinon.stub(ListDetails.computed, 'newUser').returns('notusername@domain.com')
    const vm = mountVm({ user: { username: 'username' } })

    assert.isTrue(vm.$children[0].validate.newUserEmail)
    assert.isTrue(vm.$children[0].validate.notYourEmail)
    assert.isTrue(vm.$children[0].isValid)

    ListDetails.computed.newUser.restore()
  })
})
