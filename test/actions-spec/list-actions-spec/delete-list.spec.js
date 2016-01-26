/* global describe it sinon beforeEach afterEach */
import chai from 'chai'
import {testAction} from '../test-action'
import actions from '../../../public/store/actions'

chai.should()

describe('deleteList', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('dispatches list deletion mutations when not current nor _delete', done => {
    let state = {
      user: {
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            _delete: false,
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
            _delete: false,
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
    testAction(actions.deleteList, [0], state, [
      {name: 'UPDATE_DELETE_QUEUE', payload: ['listid', 1]},
      {name: 'SET_LIST_DELETE', payload: [0, true]},
      {name: 'DELETE_AGENDA', payload: ['itemid']},
      {name: 'UPDATE_DELETE_QUEUE', payload: ['listid', null]},
      {name: 'SET_LIST_DELETE', payload: [0, false]},
      {name: 'REMOVE_LIST', payload: [0]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
    clock.tick(5000)
  })

  it('dispatches list deletion mutations when index is 0 and current', done => {
    let state = {
      user: {
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: true,
            _delete: false,
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
            _delete: false,
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
    testAction(actions.deleteList, [0], state, [
      {name: 'UPDATE_DELETE_QUEUE', payload: ['listid', 2]},
      {name: 'SET_LIST_DELETE', payload: [0, true]},
      {name: 'SET_CURRENT_LIST', payload: [1]},
      {name: 'DELETE_AGENDA', payload: ['itemid']},
      {name: 'UPDATE_DELETE_QUEUE', payload: ['listid', null]},
      {name: 'SET_LIST_DELETE', payload: [0, false]},
      {name: 'REMOVE_LIST', payload: [0]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
    clock.tick(5000)
  })

  it('dispatches list deletion mutations when index is last and current', done => {
    let state = {
      user: {
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: false,
            _delete: false,
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
            _delete: false,
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
    testAction(actions.deleteList, [1], state, [
      {name: 'UPDATE_DELETE_QUEUE', payload: ['listid2', 3]},
      {name: 'SET_LIST_DELETE', payload: [1, true]},
      {name: 'SET_CURRENT_LIST', payload: [0]},
      {name: 'DELETE_AGENDA', payload: ['itemid2']},
      {name: 'UPDATE_DELETE_QUEUE', payload: ['listid2', null]},
      {name: 'SET_LIST_DELETE', payload: [1, false]},
      {name: 'REMOVE_LIST', payload: [1]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
    clock.tick(5000)
  })

  it('does nothing when only list', done => {
    let state = {
      user: {
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: true,
            _delete: false,
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
    testAction(actions.deleteList, [0], state, [], done)
    clock.tick(5000)
  })

  it('undoes deletion methods when only list (multiple deletions)', done => {
    let state = {
      user: {
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: true,
            _delete: false,
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
            _delete: false,
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
    testAction(actions.deleteList, [0], state, [
      {name: 'UPDATE_DELETE_QUEUE', payload: ['listid', 4]},
      {name: 'SET_LIST_DELETE', payload: [0, true]},
      {name: 'SET_CURRENT_LIST', payload: [1]},
      {name: 'DELETE_AGENDA', payload: ['itemid']},
      {name: 'UPDATE_DELETE_QUEUE', payload: ['listid', null]},
      {name: 'SET_LIST_DELETE', payload: [0, false]},
      {name: 'REMOVE_LIST', payload: [0]},
      {name: 'SET_SAVE_BUTTON', payload: [true]}
    ], done)
    clock.tick(1000)
    testAction(actions.deleteList, [1], state, [
      {name: 'UPDATE_DELETE_QUEUE', payload: ['listid2', 5]},
      {name: 'SET_LIST_DELETE', payload: [1, true]},
      {name: 'UPDATE_DELETE_QUEUE', payload: ['listid2', null]},
      {name: 'SET_LIST_DELETE', payload: [1, false]}
    ], done)
    clock.tick(5000)
  })

  it('undoes list deletion mutations when _delete', done => {
    let state = {
      user: {
        tasks: [
          {
            id: 'listid',
            list: 'List 1',
            current: false,
            _delete: true,
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
            _delete: false,
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
    testAction(actions.deleteList, [0], state, [
      {name: 'UPDATE_DELETE_QUEUE', payload: ['listid', null]},
      {name: 'SET_LIST_DELETE', payload: [0, false]}
    ], done)
  })
})
