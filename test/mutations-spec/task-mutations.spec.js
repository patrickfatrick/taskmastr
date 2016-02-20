/* global describe it */
import chai from 'chai'
import {taskMutations} from '../../public/store/mutations/task-mutations'

chai.should()
describe('task mutations', () => {
  it('SET_CURRENT_TASK', () => {
    let state = {
      user: {
        current: {
          list: 'Current list',
          current: true,
          items: [
            {
              item: 'Current task',
              current: true
            },
            {
              item: 'Not current task',
              current: false
            }
          ]
        }
      }
    }

    taskMutations.SET_CURRENT_TASK(state, 1)

    state.user.current.items[0].current.should.be.false
    state.user.current.items[1].current.should.be.true
  })

  it('ADD_TASK', () => {
    let state = {
      user: {
        current: {
          list: 'Current list',
          current: true,
          items: [
            {
              item: 'Current task',
              current: true
            },
            {
              item: 'Not current task',
              current: false
            }
          ]
        }
      }
    }
    let newTask = {
      item: 'New task',
      current: false
    }

    taskMutations.ADD_TASK(state, newTask)

    state.user.current.items[0].item.should.equal('New task')
    state.user.current.items[1].item.should.equal('Current task')
    state.user.current.items[2].item.should.equal('Not current task')
  })

  it('REMOVE_TASK', () => {
    let state = {
      user: {
        current: {
          list: 'Current list',
          current: true,
          items: [
            {
              item: 'Current task',
              current: true
            },
            {
              item: 'Not current task',
              current: false
            }
          ]
        }
      }
    }

    taskMutations.REMOVE_TASK(state, 1)

    state.user.current.items.length.should.equal(1)
    state.user.current.items[0].item.should.equal('Current task')
  })

  it('SET_NEW_TASK', () => {
    let state = {
      newTask: 'New task'
    }

    taskMutations.SET_NEW_TASK(state, '')

    state.newTask.should.equal('')
  })

  it('SET_PLACEHOLDER', () => {
    let state = {
      placeholder: ''
    }

    taskMutations.SET_PLACEHOLDER(state, 'placeholder')

    state.placeholder.should.equal('placeholder')
  })

  it('SET_TASK_COMPLETE', () => {
    let state = {
      user: {
        current: {
          list: 'Current list',
          current: true,
          items: [
            {
              item: 'Current task',
              current: true,
              complete: false
            },
            {
              item: 'Not current task',
              current: false,
              complete: false
            }
          ]
        }
      }
    }

    taskMutations.SET_TASK_COMPLETE(state, 1, true)

    state.user.current.items[1].complete.should.be.true

    taskMutations.SET_TASK_COMPLETE(state, 1, false)

    state.user.current.items[1].complete.should.be.false
  })

  it('SET_DATE_COMPLETED', () => {
    let state = {
      user: {
        current: {
          list: 'Current list',
          current: true,
          items: [
            {
              item: 'Current task',
              current: true,
              complete: false,
              dateCompleted: ''
            },
            {
              item: 'Not current task',
              current: false,
              complete: false,
              dateCompleted: ''
            }
          ]
        }
      }
    }

    taskMutations.SET_DATE_COMPLETED(state, 1, 'date')

    state.user.current.items[1].dateCompleted.should.equal('date')

    taskMutations.SET_DATE_COMPLETED(state, 1, '')

    state.user.current.items[1].dateCompleted.should.equal('')
  })

  it('SET_TASK_DELETE', () => {
    let state = {
      user: {
        current: {
          list: 'Current list',
          current: true,
          items: [
            {
              item: 'Current task',
              current: true
            },
            {
              item: 'Not current task',
              current: false
            }
          ]
        }
      }
    }

    taskMutations.SET_TASK_DELETE(state, 0, true)

    state.user.current.items[0]._delete.should.be.true

    taskMutations.SET_TASK_DELETE(state, 0, false)

    state.user.current.items[0]._delete.should.be.false
  })

  it('RENAME_TASK', () => {
    let state = {
      user: {
        current: {
          list: 'Current list',
          current: true,
          items: [
            {
              item: 'Current task',
              current: true
            },
            {
              item: 'Not current task',
              current: false
            }
          ]
        }
      }
    }

    taskMutations.RENAME_TASK(state, 0, 'New current task')

    state.user.current.items[0].item.should.equal('New current task')
  })

  it('SET_TASK_DUE_DATE', () => {
    const today = new Date()
    let state = {
      user: {
        current: {
          list: 'Current list',
          current: true,
          items: [
            {
              item: 'Current task',
              current: true,
              dueDate: null
            },
            {
              item: 'Not current task',
              current: false,
              dueDate: null
            }
          ]
        }
      }
    }

    taskMutations.SET_TASK_DUE_DATE(state, 0, today)

    state.user.current.items[0].dueDate.should.equal(today)

    taskMutations.SET_TASK_DUE_DATE(state, 1, today)

    state.user.current.items[0].dueDate.should.equal(today)
  })

  it('DELETE_AGENDA', () => {
    let state = {
      user: {
        current: {
          list: 'Current list',
          current: true,
          items: [
            {
              id: 'id1',
              item: 'Current task',
              current: true
            },
            {
              id: 'id2',
              item: 'Not current task',
              current: false
            }
          ]
        }
      },
      deleteAgendas: []
    }

    taskMutations.DELETE_AGENDA(state, 'id1')
    taskMutations.DELETE_AGENDA(state, 'id2')

    state.deleteAgendas.should.contain.members(['id1', 'id2'])
  })

  it('UPDATE_DELETE_QUEUE', () => {
    let state = {
      user: {
        current: {
          list: 'Current list',
          current: true,
          items: [
            {
              id: 'id1',
              item: 'Current task',
              current: true
            },
            {
              id: 'id2',
              item: 'Not current task',
              current: false
            }
          ]
        }
      },
      deleteQueue: {}
    }

    taskMutations.UPDATE_DELETE_QUEUE(state, 'id1', 1)
    taskMutations.UPDATE_DELETE_QUEUE(state, 'id2', 2)

    state.deleteQueue['id1'].should.equal(1)
    state.deleteQueue['id2'].should.equal(2)
  })

  it('SORT_TASKS', () => {
    let state = {
      user: {
        current: {
          list: 'Current list',
          current: true,
          items: [
            {
              item: 'Current task',
              current: true
            },
            {
              item: 'Not current task',
              current: false
            },
            {
              item: 'New task',
              current: false
            }
          ]
        }
      }
    }

    taskMutations.SORT_TASKS(state, 2, 0)

    state.user.current.items[0].item.should.equal('New task')
    state.user.current.items[1].item.should.equal('Current task')
    state.user.current.items[2].item.should.equal('Not current task')

    taskMutations.SORT_TASKS(state, 1, 2)

    state.user.current.items[0].item.should.equal('New task')
    state.user.current.items[1].item.should.equal('Not current task')
    state.user.current.items[2].item.should.equal('Current task')
  })

  it('TOGGLE_DETAILS', () => {
    let state = {
      user: {
        current: {
          list: 'Current list',
          current: true,
          items: [
            {
              item: 'Current task',
              current: true,
              _detailsToggled: false
            },
            {
              item: 'Not current task',
              current: false,
              _detailsToggled: false
            }
          ]
        }
      }
    }

    taskMutations.TOGGLE_DETAILS(state, 0, true)

    state.user.current.items[0]._detailsToggled.should.be.true

    taskMutations.TOGGLE_DETAILS(state, 1, true)

    state.user.current.items[0]._detailsToggled.should.be.true
  })

  it('SET_TASK_NOTES', () => {
    let state = {
      user: {
        current: {
          list: 'Current list',
          current: true,
          items: [
            {
              item: 'Current task',
              current: true,
              notes: ''
            },
            {
              item: 'Not current task',
              current: false,
              notes: ''
            }
          ]
        }
      }
    }

    taskMutations.SET_TASK_NOTES(state, 0, 'Some notes')

    state.user.current.items[0].notes.should.equal('Some notes')
  })

  it('SET_DUE_DATE_DIFFERENCE', () => {
    let state = {
      user: {
        current: {
          list: 'Current list',
          current: true,
          items: [
            {
              item: 'Current task',
              current: true,
              dueDate: new Date() + (1000 * 60 * 60 * 24),
              _dueDateDifference: null
            },
            {
              item: 'Not current task',
              current: false,
              dueDate: new Date() - (1000 / 60 / 60 / 24),
              _dueDateDifference: null
            }
          ]
        }
      }
    }

    taskMutations.SET_DUE_DATE_DIFFERENCE(state, 0, 1)

    state.user.current.items[0]._dueDateDifference.should.equal(1)

    taskMutations.SET_DUE_DATE_DIFFERENCE(state, 1, -1)

    state.user.current.items[1]._dueDateDifference.should.equal(-1)
  })
})
