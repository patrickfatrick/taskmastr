/* global describe it beforeEach */
import { assert } from 'chai'
import { getActiveTasks, getCompleteTasks, getAllTasks } from '../../../public/store/item-store/item-getters'

describe('item getters', () => {
  let state
  beforeEach(() => {
    state = {
      current: {
        id: 'listid',
        list: 'List 1',
        items: [
          {
            id: 'itemid',
            item: 'Item 1',
            complete: false,
            _deleting: false
          },
          {
            id: 'itemid2',
            item: 'Item 2',
            complete: true,
            _deleting: false
          }
        ]
      }
    }
  })

  it('getActiveTasks', () => {
    assert.deepEqual(getActiveTasks(state), [state.current.items[0]])
  })

  it('getCompleteTasks', () => {
    assert.deepEqual(getCompleteTasks(state), [state.current.items[1]])
  })

  it('getAllTasks', () => {
    assert.deepEqual(getAllTasks(state), state.current.items)
  })
})
