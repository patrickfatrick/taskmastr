export function getAllTasks (state) {
  return state.current.items
}

export function getActiveTasks (state) {
  return state.current.items ? state.current.items.filter((task) => !task.complete) : []
}

export function getCompleteTasks (state) {
  return state.current.items ? state.current.items.filter((task) => task.complete) : []
}
