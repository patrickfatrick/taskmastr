import hat from 'hat'
import gregorian from 'gregorian'

export default {
  list: 'Your first list',
  current: true,
  items: [
    {
      id: hat(),
      item: 'Complete your first task. (It\'ll jump to the bottom).',
      current: true,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _delete: false,
      _detailsToggled: false
    },
    {
      id: hat(),
      item: 'Now delete this task. You have 5 seconds to undo it.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _delete: false,
      _detailsToggled: false
    },
    {
      id: hat(),
      item: 'Access the detailed view for any task by hitting the pencil icon.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _delete: false,
      _detailsToggled: false
    },
    {
      id: hat(),
      item: 'Throw a due date onto a task from the detailed view. We\'ll send you an email that day reminding you.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _delete: false,
      _detailsToggled: false
    },
    {
      id: hat(),
      item: 'Create a new task with a due date attached, such as "Remind me to go to the store tomorrow."',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _delete: false,
      _detailsToggled: false
    },
    {
      id: hat(),
      item: 'Now try creating a new list by hitting the menu button on the left.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _delete: false,
      _detailsToggled: false
    },
    {
      id: hat(),
      item: 'Toggle Night Mode/Bright Mode from the sun/moon icon in the menu.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _delete: false,
      _detailsToggled: false
    },
    {
      id: hat(),
      item: 'Access the wiki from the map icon in the menu.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _delete: false,
      _detailsToggled: false
    },
    {
      id: hat(),
      item: 'Keyboard shortcuts are an integral part of taskmastr! Check them out in the wiki.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _delete: false,
      _detailsToggled: false
    },
    {
      id: hat(),
      item: 'Don\'t forget to save your work.',
      current: false,
      complete: false,
      dateCreated: gregorian.reform(new Date()).to('iso'),
      dueDate: null,
      notes: '',
      _dueDateDifference: null,
      _delete: false,
      _detailsToggled: false
    }
  ]
}
