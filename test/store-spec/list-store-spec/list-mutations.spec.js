/* global describe it */
import { assert } from 'chai'
import listMutations from '../../../src/store/list-store/list-mutations'

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

    assert.strictEqual(state.currentList, state.user.tasks[1]._id)

    listMutations.SET_CURRENT_LIST(state, null)

    assert.strictEqual(state.currentList, '')
    assert.deepEqual(state.current, {})
  })

  it('SET_MENU_TOGGLED', () => {
    let state = {
      menuToggled: false
    }

    listMutations.SET_MENU_TOGGLED(state, true)

    assert.isTrue(state.menuToggled)
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

    assert.strictEqual(state.user.tasks[0].list, 'New list')
    assert.strictEqual(state.user.tasks[1].list, 'Current list')
    assert.strictEqual(state.user.tasks[2].list, 'Not current list')
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

    assert.strictEqual(state.user.tasks.length, 1)
    assert.strictEqual(state.user.tasks[0].list, 'Current list')
  })

  it('SET_NEW_LIST', () => {
    let state = {
      newList: 'New list'
    }

    listMutations.SET_NEW_LIST(state, '')

    assert.strictEqual(state.newList, '')
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

    assert.isTrue(state.user.tasks[0]._deleting)

    listMutations.SET_LIST_DELETE(state, { index: 0, bool: false })

    assert.isFalse(state.user.tasks[0]._deleting)
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

    assert.strictEqual(state.user.tasks[0].list, 'New list')
    assert.strictEqual(state.user.tasks[1].list, 'Current list')
    assert.strictEqual(state.user.tasks[2].list, 'Not current list')

    listMutations.SORT_LISTS(state, { oldIndex: 1, newIndex: 2 })

    assert.strictEqual(state.user.tasks[0].list, 'New list')
    assert.strictEqual(state.user.tasks[1].list, 'Not current list')
    assert.strictEqual(state.user.tasks[2].list, 'Current list')
  })

  it('SET_INVALID_LIST', () => {
    const state = {
      invalidList: false
    }

    listMutations.SET_INVALID_LIST(state, 'Error!')

    assert.strictEqual(state.invalidList, 'Error!')
  })
})
