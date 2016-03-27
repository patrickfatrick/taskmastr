/* global describe it */
import chai from 'chai'
import { testAction } from '../test-action'
import listActionsInjector from 'inject!../../../public/store/list-store/list-actions'

chai.should()

describe('addList', () => {
  it('dispatches ADD_LIST', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        createList (list, user, cb) {
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

    const newList = {
      id: 'listid2',
      list: 'List 2',
      items: [
        {
          id: 'itemid2',
          item: 'Item 2'
        }
      ]
    }

    const userNewList = {
      id: 'listid2',
      list: 'List 2',
      current: false,
      _delete: false
    }

    testAction(listActions.addList, [newList], state, [
      { name: 'ADD_LIST', payload: [userNewList] }
    ], done)
  })

  it('dispatches ADD_LIST and REMOVE_LIST on error', (done) => {
    const listActions = listActionsInjector({
      '../../services/list-services': {
        createList (list, user, cb) {
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

    const newList = {
      id: 'listid2',
      list: 'List 2',
      items: [
        {
          id: 'itemid2',
          item: 'Item 2'
        }
      ]
    }

    const userNewList = {
      id: 'listid2',
      list: 'List 2',
      current: false,
      _delete: false
    }

    testAction(listActions.addList, [newList], state, [
      { name: 'ADD_LIST', payload: [userNewList] },
      { name: 'REMOVE_LIST', payload: [0] }
    ], done)
  })
})
