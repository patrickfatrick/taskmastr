<template>
  <div>
    <div class="table-header">
      <input class="check" type="checkbox" :value="task.complete"></input>
      <button class="complete" title="Complete task" @click.prevent="completeTask({ index, bool: !task.complete })">
        <i class="fa" :class="{'fa-check-circle': task.complete, 'fa-circle-o': !task.complete}"></i>
      </button>
    </div>
    <div class="task-cell table-data">
      <button class="name" :title="task.item" @click="setCurrentTask(index)" @dblclick.prevent="toggleDetails(index)">{{task.item}}</button>
    </div>
    <div class="utils table-data">
      <button class="details-button" title="Toggle details pane" @click.prevent="toggleDetails(index, true)" v-bind:class="{'active': task.dueDate || task.notes, 'overdue': task._dueDateDifference < 0, 'due': task._dueDateDifference === 0}">
        <i class="fa" :class="{'fa-pencil-square': !task.dueDate && (!task._dueDateDifference || task._dueDateDifference > 0 || task.complete), 'fa-exclamation-triangle': task._dueDateDifference < 0 && !task.complete, 'fa-calendar': task.dueDate && task._dueDateDifference >= 0 && !task.complete}"></i>
      </button>
      <button class="delete-button" title="Delete task" @click.prevent="deleteTask(index)">
        <i class="fa" :class="{'fa-trash-o': !task._deleting, 'fa-undo': task._deleting}"></i>
      </button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Mousetrap from 'mousetrap'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      activeTasks: 'getActiveTasks',
      completeTasks: 'getCompleteTasks',
      allTasks: 'getAllTasks'
    }),
    index () {
      return _.findIndex(this.allTasks, { id: this.task.id })
    }
  },
  props: {
    task: Object
  },
  methods: mapActions([
    'setCurrentTask',
    'deleteTask',
    'completeTask',
    'sortTasks',
    'toggleDetails'
  ]),
  mounted () {
    // Keyboard bindings
    Mousetrap.bind('ctrl+,', (e) => {
      if (e.preventDefault) e.preventDefault()
      let index = _.findIndex(this.allTasks, { current: true })
      index = (index === 0)
        ? this.allTasks.length - 1
        : index - 1
      this.setCurrentTask(index)
    })
    Mousetrap.bind('ctrl+.', (e) => {
      if (e.preventDefault) e.preventDefault()
      let index = _.findIndex(this.allTasks, { current: true })
      index = (index === this.allTasks.length - 1)
        ? 0
        : index + 1
      this.setCurrentTask(index)
    })
    Mousetrap.bind('ctrl+backspace', () => {
      this.deleteTask(_.findIndex(this.allTasks, { current: true }))
    })
    Mousetrap.bind('ctrl+c', () => {
      const task = _.find(this.allTasks, { current: true })
      const index = _.findIndex(this.allTasks, { id: task.id })
      this.completeTask({ index, bool: !task.complete })
    })
    Mousetrap.bind('ctrl+command+down', () => {
      const completeIndex = _.findIndex(this.allTasks, { complete: true })
      const currentIndex = _.findIndex(this.allTasks, { current: true })

      if (completeIndex !== -1) {
        if (!this.allTasks[currentIndex].complete && currentIndex === completeIndex - 1) return
      }
      if (currentIndex === this.allTasks.length - 1) return

      this.sortTasks({ oldIndex: currentIndex, newIndex: currentIndex + 1 })
    })
    Mousetrap.bind('ctrl+command+up', () => {
      const completeIndex = _.findIndex(this.allTasks, { complete: true })
      const currentIndex = _.findIndex(this.allTasks, { current: true })

      if (completeIndex !== -1) {
        if (this.allTasks[currentIndex].complete && currentIndex === completeIndex) return
      }
      if (currentIndex === 0) return

      this.sortTasks({ oldIndex: currentIndex, newIndex: currentIndex - 1 })
    })
  }
}
</script>