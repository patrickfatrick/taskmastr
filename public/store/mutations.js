import userMutations from './user-store/user-mutations'
import taskMutations from './task-store/task-mutations'
import listMutations from './list-store/list-mutations'

export default {
  ...userMutations,
  ...taskMutations,
  ...listMutations
}
