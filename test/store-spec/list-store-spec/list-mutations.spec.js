/* global describe it */
import chai from 'chai'
import listMutations from '../../../src/store/list-store/list-mutations'

chai.should()
describe('list mutations', () => {
  it('SET_CURRENT_LIST', () => {
    let state = {
      user: {
        tasks: [
          {
            id: 'list1',
            list: 'Current list',
            current: true
          },
          {
            id: 'list2',
            list: 'Not current list',
            current: false
          }
        ]
      }
    }
    const list = {
      id: 'list2',
      list: 'Not current list',
      current: false
    }

    listMutations.SET_CURRENT_LIST(state, list)

    state.user.tasks[0].current.should.be.false
    state.user.tasks[1].current.should.be.true

    listMutations.SET_CURRENT_LIST(state, null)

    state.user.tasks[0].current.should.be.false
    state.user.tasks[1].current.should.be.false
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
      user: {
        tasks: [
          {
            list: 'Current list',
            current: true
          },
          {
            list: 'Not current list',
            current: false
          }
        ]
      }
    }
    let newList = {
      list: 'New list',
      current: false
    }

    listMutations.ADD_LIST(state, newList)

    state.user.tasks[0].list.should.equal('New list')
    state.user.tasks[1].list.should.equal('Current list')
    state.user.tasks[2].list.should.equal('Not current list')
  })

  it('REMOVE_LIST', () => {
    let state = {
      user: {
        tasks: [
          {
            list: 'Current list',
            current: true
          },
          {
            list: 'Not current list',
            current: false
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
      user: {
        tasks: [
          {
            list: 'Current list',
            current: true,
            _deleting: false
          },
          {
            list: 'Not current list',
            current: false,
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
      user: {
        tasks: [
          {
            list: 'Current list',
            current: true,
            _deleting: false
          },
          {
            list: 'Not current list',
            current: false,
            _deleting: false
          },
          {
            list: 'New list',
            current: false,
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
