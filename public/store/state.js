import user from './user-store'
import list from './list-store'
import item from './item-store'

export default {
  wiki: '//patrickfatrick.gitbooks.io/taskmastr/content/',
  repo: '//github.com/patrickfatrick/taskmastr',
  testUser: 'mrormrstestperson@taskmastr.co',
  testKey: 'S41iVAtINGREsIdUE-278',
  disconnect: false,
  deleteQueue: {},
  ...user,
  ...list,
  ...item
}
