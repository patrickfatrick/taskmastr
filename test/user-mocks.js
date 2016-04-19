import defaultList from '../public/helper-utilities/default-list'

export const mockUser = {
  username: 'username',
  darkmode: true,
  tasks: [
    {
      id: 'list1',
      list: 'Current list',
      current: true,
      _deleting: false,
      items: [
        {
          id: 'item1',
          item: 'Item 1',
          complete: false,
          current: true,
          dateCreated: 'a date',
          dateCompleted: null,
          dueDate: 'a date',
          notes: '',
          _dueDateDifference: null,
          _deleting: false,
          _detailsToggled: false
        },
        {
          id: 'item2',
          item: 'Item 2',
          complete: true,
          current: false,
          dateCreated: 'a date',
          dateCompleted: null,
          dueDate: 'a date',
          notes: '',
          _dueDateDifference: null,
          _deleting: false,
          _detailsToggled: false
        }
      ]
    },
    {
      id: 'list2',
      list: 'Not current list',
      current: false,
      _deleting: false,
      items: []
    }
  ]
}

export const newUser = {
  username: 'username',
  darkmode: true,
  tasks: [defaultList]
}
