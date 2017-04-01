import * as appActions from './app-store/app-actions'
import * as userActions from './user-store/user-actions'
import * as listActions from './list-store/list-actions'
import * as itemActions from './item-store/item-actions'

export default {
  ...appActions,
  ...userActions,
  ...listActions,
  ...itemActions
}
