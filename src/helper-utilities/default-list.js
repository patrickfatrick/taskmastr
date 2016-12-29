import { bunch } from 'harsh'
import gregorian from 'gregorian'

const hashes = bunch(11)

export default {
  id: hashes.hashes[0],
  list: 'Your first list',
  current: true,
  _deleting: false,
  items: [
    {
      id: hashes.hashes[1],
      item: 'Complete your first task. (It\'ll jump to the bottom).',
      current: true,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dateCompleted: null,
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _deleting: false,
      _detailsToggled: false
    },
    {
      id: hashes.hashes[2],
      item: 'Now delete this task. You have 5 seconds to undo it.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dateCompleted: null,
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _deleting: false,
      _detailsToggled: false
    },
    {
      id: hashes.hashes[3],
      item: 'Access the detailed view for any task by hitting the pencil icon.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dateCompleted: null,
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _deleting: false,
      _detailsToggled: false
    },
    {
      id: hashes.hashes[4],
      item: 'Throw a due date onto a task from the detailed view. We\'ll send you an email that day reminding you.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dateCompleted: null,
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _deleting: false,
      _detailsToggled: false
    },
    {
      id: hashes.hashes[5],
      item: 'Create a new task with a due date attached, such as "Remind me to go to the store tomorrow."',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dateCompleted: null,
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _deleting: false,
      _detailsToggled: false
    },
    {
      id: hashes.hashes[6],
      item: 'Now try creating a new list by hitting the menu button on the left.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dateCompleted: null,
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _deleting: false,
      _detailsToggled: false
    },
    {
      id: hashes.hashes[7],
      item: 'Toggle Night Mode/Bright Mode from the sun/moon icon in the menu.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dateCompleted: null,
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _deleting: false,
      _detailsToggled: false
    },
    {
      id: hashes.hashes[8],
      item: 'Access the wiki from the map icon in the menu.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dateCompleted: null,
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _deleting: false,
      _detailsToggled: false
    },
    {
      id: hashes.hashes[9],
      item: 'Keyboard shortcuts are an integral part of taskmastr! Check them out in the wiki.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dateCompleted: null,
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _deleting: false,
      _detailsToggled: false
    },
    {
      id: hashes.hashes[10],
      item: 'Don\'t forget to save your work.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dateCompleted: null,
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _deleting: false,
      _detailsToggled: false
    }
  ]
}