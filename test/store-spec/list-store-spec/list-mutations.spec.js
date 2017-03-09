/* global describe it */
import chai, { assert } from 'chai'
import listMutations from '../../../src/store/list-store/list-mutations'

chai.should()
describe('list mutations', () => {
  it('SET_CURRENT_LIST', () => {
    let state = {
      currentList: 'list1',
      user: {
        tasks: [
          {
            _id: 'list1',
            list: 'Current list'
          },
          {
            _id: 'list2',
            list: 'Not current list'
          }
        ]
      }
    }

    listMutations.SET_CURRENT_LIST(state, state.user.tasks[1])

    assert.deepEqual(state.currentList, state.user.tasks[1]._id)

    listMutations.SET_CURRENT_LIST(state, null)

    assert.deepEqual(state.currentList, '')
    assert.deepEqual(state.current, {})
  })

  it('SET_MENU_TOGGLED', () => {
    let state = {
      menuToggled: false
    }

    listMutations.SET_MENU_TOGGLED(state, true)

    state.menuToggled.should.be.true
  })

  it('ADD_LIST', () => {
    let state = {
      currentList: 'list1',
      user: {
        tasks: [
          {
            _id: 'list1',
            list: 'Current list'
          },
          {
            _id: 'list2',
            list: 'Not current list'
          }
        ]
      }
    }
    let newList = {
      _id: 'list3',
      list: 'New list'
    }

    listMutations.ADD_LIST(state, newList)

    state.user.tasks[0].list.should.equal('New list')
    state.user.tasks[1].list.should.equal('Current list')
    state.user.tasks[2].list.should.equal('Not current list')
  })

  it('REMOVE_LIST', () => {
    let state = {
      currentList: 'list1',
      user: {
        tasks: [
          {
            _id: 'list1',
            list: 'Current list'
          },
          {
            _id: 'list2',
            list: 'Not current list'
          }
        ]
      }
    }

    listMutations.REMOVE_LIST(state, 1)

    state.user.tasks.length.should.equal(1)
    state.user.tasks[0].list.should.equal('Current list')
  })

  it('SET_NEW_LIST', () => {
    let state = {
      newList: 'New list'
    }

    listMutations.SET_NEW_LIST(state, '')

    state.newList.should.equal('')
  })

  it('SET_LIST_DELETE', () => {
    let state = {
      currentList: 'list1',
      user: {
        tasks: [
          {
            _id: 'list1',
            list: 'Current list',
            _deleting: false
          },
          {
            _id: 'list2',
            list: 'Not current list',
            _deleting: false
          }
        ]
      }
    }

    listMutations.SET_LIST_DELETE(state, { index: 0, bool: true })

    state.user.tasks[0]._deleting.should.be.true

    listMutations.SET_LIST_DELETE(state, { index: 0, bool: false })

    state.user.tasks[0]._deleting.should.be.false
  })

  it('SORT_LISTS', () => {
    let state = {
      currentList: 'list1',
      user: {
        tasks: [
          {
            _id: 'list1',
            list: 'Current list',
            _deleting: false
          },
          {
            _id: 'list2',
            list: 'Not current list',
            _deleting: false
          },
          {
            _id: 'list3',
            list: 'New list',
            _deleting: false
          }
        ]
      }
    }

    listMutations.SORT_LISTS(state, { oldIndex: 2, newIndex: 0 })

    state.user.tasks[0].list.should.equal('New list')
    state.user.tasks[1].list.should.equal('Current list')
    state.user.tasks[2].list.should.equal('Not current list')

    listMutations.SORT_LISTS(state, { oldIndex: 1, newIndex: 2 })

    state.user.tasks[0].list.should.equal('New list')
    state.user.tasks[1].list.should.equal('Not current list')
    state.user.tasks[2].list.should.equal('Current list')
  })

  it('SET_INVALID_LIST', () => {
    const state = {
      invalidList: false
    }

    listMutations.SET_INVALID_LIST(state, 'Error!')

    state.invalidList.should.equal('Error!')
  })
})
