import appMutations from './app-store/app-mutations'
import userMutations from './user-store/user-mutations'
import taskMutations from './item-store/item-mutations'
import listMutations from './list-store/list-mutations'

export default {
  ...appMutations,
  ...userMutations,
  ...taskMutations,
  ...listMutations
}
