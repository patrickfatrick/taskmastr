import app from './app-store'
import user from './user-store'
import list from './list-store'
import item from './item-store'

export default {
  ...app,
  ...user,
  ...list,
  ...item
}
