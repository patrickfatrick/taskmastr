/* global describe it sinon beforeEach afterEach */
import chai from 'chai'
import { testAction } from '../test-action'
import listActionsInjector from 'inject!../../../public/store/list-store/list-actions'

chai.should()

describe('deleteList', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('dispatches list deletion mutations when not current nor _deleting', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeList (id, user, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        username: 'username',
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            _deleting: false,
            items: [
              {
                id: 'itemid',
                item: 'Item 1'
              }
            ]
          },
          {
            id: 'listid2',
            list: 'List 2',
            _deleting: false,
            items: [
              {
                id: 'itemid2',
                item: 'Item 2'
              }
            ]
          }
        ]
      }
    }

    testAction(listActions.deleteList, [0], state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: ['listid', 1] },
      { name: 'SET_LIST_DELETE', payload: [0, true] },
      { name: 'UPDATE_DELETE_QUEUE', payload: ['listid', null] },
      { name: 'SET_LIST_DELETE', payload: [0, false] },
      { name: 'REMOVE_LIST', payload: [0] }
    ], done)

    clock.tick(5000)
  })

  it('dispatches list deletion mutations when index is 0 and current', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeList (id, user, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: true,
            _deleting: false,
            items: [
              {
                id: 'itemid',
                item: 'Item 1'
              }
            ]
          },
          {
            id: 'listid2',
            list: 'List 2',
            current: false,
            _deleting: false,
            items: [
              {
                id: 'itemid2',
                item: 'Item 2'
              }
            ]
          }
        ]
      }
    }
    testAction(listActions.deleteList, [0], state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: ['listid', 2] },
      { name: 'SET_LIST_DELETE', payload: [0, true] },
      { name: 'SET_CURRENT_LIST', payload: [state.user.tasks[1]] },
      { name: 'UPDATE_DELETE_QUEUE', payload: ['listid', null] },
      { name: 'SET_LIST_DELETE', payload: [0, false] },
      { name: 'REMOVE_LIST', payload: [0] }
    ], done)

    clock.tick(5000)
  })

  it('dispatches list deletion mutations when index is last and current', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeList (id, user, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: false,
            _deleting: false,
            items: [
              {
                id: 'itemid',
                item: 'Item 1'
              }
            ]
          },
          {
            id: 'listid2',
            list: 'List 2',
            current: true,
            _deleting: false,
            items: [
              {
                id: 'itemid2',
                item: 'Item 2'
              }
            ]
          }
        ]
      }
    }
    testAction(listActions.deleteList, [1], state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: ['listid2', 3] },
      { name: 'SET_LIST_DELETE', payload: [1, true] },
      { name: 'SET_CURRENT_LIST', payload: [state.user.tasks[0]] },
      { name: 'UPDATE_DELETE_QUEUE', payload: ['listid2', null] },
      { name: 'SET_LIST_DELETE', payload: [1, false] },
      { name: 'REMOVE_LIST', payload: [1] }
    ], done)

    clock.tick(5000)
  })

  it('does nothing when only list', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeList (id, user, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: true,
            _deleting: false,
            items: [
              {
                id: 'itemid',
                item: 'Item 1'
              }
            ]
          }
        ]
      }
    }
    testAction(listActions.deleteList, [0], state, [], done)

    clock.tick(5000)
  })

  it('undoes deletion methods when only list (multiple deletions)', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeList (id, user, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: true,
            _deleting: false,
            items: [
              {
                id: 'itemid',
                item: 'Item 1'
              }
            ]
          },
          {
            id: 'listid2',
            list: 'List 2',
            current: false,
            _deleting: false,
            items: [
              {
                id: 'itemid2',
                item: 'Item 2'
              }
            ]
          }
        ]
      }
    }

    testAction(listActions.deleteList, [0], state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: ['listid', 4] },
      { name: 'SET_LIST_DELETE', payload: [0, true] },
      { name: 'SET_CURRENT_LIST', payload: [state.user.tasks[1]] },
      { name: 'UPDATE_DELETE_QUEUE', payload: ['listid', null] },
      { name: 'SET_LIST_DELETE', payload: [0, false] },
      { name: 'REMOVE_LIST', payload: [0] }
    ], done)

    clock.tick(1000)

    testAction(listActions.deleteList, [1], state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: ['listid2', 5] },
      { name: 'SET_LIST_DELETE', payload: [1, true] },
      { name: 'UPDATE_DELETE_QUEUE', payload: ['listid2', null] },
      { name: 'SET_LIST_DELETE', payload: [1, false] }
    ], done)

    clock.tick(5000)
  })

  it('undoes list deletion mutations when _delete', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeList (id, user, cb) {
          cb(null, { success: true })
        }
      }
    })

    const state = {
      user: {
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: false,
            _deleting: true,
            items: [
              {
                id: 'itemid',
                item: 'Item 1'
              }
            ]
          },
          {
            id: 'listid2',
            list: 'List 2',
            current: true,
            _deleting: false,
            items: [
              {
                id: 'itemid2',
                item: 'Item 2'
              }
            ]
          }
        ]
      },
      deleteQueue: {
        listid: 5
      }
    }
    testAction(listActions.deleteList, [0], state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: ['listid', null] },
      { name: 'SET_LIST_DELETE', payload: [0, false] }
    ], done)
  })

  it('dispatches ADD_LIST on error', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        removeList (id, user, cb) {
          cb('Error!', { status: 500 })
        }
      }
    })

    const state = {
      user: {
        username: 'username',
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            _deleting: false,
            items: [
              {
                id: 'itemid',
                item: 'Item 1'
              }
            ]
          },
          {
            id: 'listid2',
            list: 'List 2',
            _deleting: false,
            items: [
              {
                id: 'itemid2',
                item: 'Item 2'
              }
            ]
          }
        ]
      }
    }

    testAction(listActions.deleteList, [0], state, [
      { name: 'UPDATE_DELETE_QUEUE', payload: ['listid', 6] },
      { name: 'SET_LIST_DELETE', payload: [0, true] },
      { name: 'UPDATE_DELETE_QUEUE', payload: ['listid', null] },
      { name: 'SET_LIST_DELETE', payload: [0, false] },
      { name: 'REMOVE_LIST', payload: [0] },
      { name: 'ADD_LIST', payload: [state.user.tasks[0]] }
    ], done)

    clock.tick(5000)
  })
})
