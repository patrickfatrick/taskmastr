<template>
  <div
    class="table-row table-row--item" 
    :class="{
      'table-row--deleting': task._deleting,
      'table-row--complete': task.complete,
      'table-row--active': isCurrent(task, currenttask),
      'table-row--darkmode': darkmode
    }"
  >
    <div class="table-row__table-header">
      <input 
        type="checkbox" 
        :value="task.complete"
      >
      </input>
      <button 
        class="complete" 
        title="Complete task" 
        @click.prevent="completeTask({ index, bool: !task.complete })">
        <i 
          class="fa" 
          :class="{'fa-check-circle': task.complete, 'fa-circle-o': !task.complete}"
        />
      </button>
    </div>
    <div class="table-row__table-data table-row__table-data--task-cell">
      <button 
        class="name" 
        :title="task.item" @click="setCurrentTask(index)" 
        @dblclick.prevent="toggleDetails(index)">{{task.item}}
      </button>
    </div>
    <div class="table-row__table-data table-row__table-data--utils">
      <button 
        class="details-button" 
        title="Toggle details pane" 
        @click.prevent="toggleDetails(index, true)" 
        :class="{'active': task.dueDate || task.notes, 'overdue': task._dueDateDifference < 0, 'due': task._dueDateDifference === 0}">
        <i 
          class="fa" 
          :class="{'fa-pencil-square': !task.dueDate && (!task._dueDateDifference || task._dueDateDifference > 0 || task.complete), 'fa-exclamation-triangle': task._dueDateDifference < 0 && !task.complete, 'fa-calendar': task.dueDate && task._dueDateDifference >= 0 && !task.complete}">  
        </i>
      </button>
      <button 
        class="delete-button" 
        title="Delete task" 
        @click.prevent="deleteTask(index)">
        <i 
          class="fa" 
          :class="{'fa-trash-o': !task._deleting, 'fa-undo': task._deleting}">
        </i>
      </button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.table-row--item {
  @apply --tableRow;

  &:not(.table-row--darkmode) {
    &.table-row--active {
      background-color: var(--sunray);
    }

    &.table-row--active.table-row--complete {
      background-color: var(--rust);
    }
  }

  &.table-row--darkmode {
    &.table-row--active {
      background-color: var(--astroTurf);
    }

    &.table-row--active.table-row--complete {
      background-color: var(--grassStain);
    }
  }
}
</style>

<script>
import _ from 'lodash'
import Mousetrap from 'mousetrap'
import { mapGetters, mapActions } from 'vuex'
import { isCurrent, findCurrentIndex, findIndexById } from '../../../helper-utilities/utils'

export default {
  computed: {
    ...mapGetters({
      activeTasks: 'getActiveTasks',
      completeTasks: 'getCompleteTasks',
      allTasks: 'getAllTasks'
    }),
    index () {
      return findIndexById(this.allTasks, this.task._id)
    }
  },
  props: {
    task: Object,
    currenttask: String,
    darkmode: Boolean
  },
  methods: {
    ...mapActions([
      'setCurrentTask',
      'deleteTask',
      'completeTask',
      'sortTasks',
      'toggleDetails'
    ]),
    isCurrent
  },
  mounted () {
    // Keyboard bindings
    Mousetrap.bind('ctrl+,', (e) => {
      if (e.preventDefault) e.preventDefault()
      let index = findCurrentIndex(this.allTasks, this.currenttask)
      index = (index === 0)
        ? this.allTasks.length - 1
        : index - 1
      this.setCurrentTask(index)
    })
    Mousetrap.bind('ctrl+.', (e) => {
      if (e.preventDefault) e.preventDefault()
      let index = findCurrentIndex(this.allTasks, this.currenttask)
      index = (index === this.allTasks.length - 1)
        ? 0
        : index + 1
      this.setCurrentTask(index)
    })
    Mousetrap.bind('ctrl+backspace', () => {
      this.deleteTask(findCurrentIndex(this.allTasks, this.currenttask))
    })
    Mousetrap.bind('ctrl+c', () => {
      const task = _.find(this.allTasks, { current: true })
      const index = _.findIndex(this.allTasks, { _id: task._id })
      this.completeTask({ index, bool: !task.complete })
    })
    Mousetrap.bind('ctrl+command+down', () => {
      const completeIndex = _.findIndex(this.allTasks, { complete: true })
      const currentIndex = findCurrentIndex(this.allTasks, this.currenttask)

      if (this.allTasks[currentIndex].complete) return
      if (completeIndex !== -1 && currentIndex === completeIndex - 1) return
      if (currentIndex === this.allTasks.length - 1) return

      this.sortTasks({ oldIndex: currentIndex, newIndex: currentIndex + 1 })
    })
    Mousetrap.bind('ctrl+command+up', () => {
      const completeIndex = _.findIndex(this.allTasks, { complete: true })
      const currentIndex = findCurrentIndex(this.allTasks, this.currenttask)

      if (this.allTasks[currentIndex].complete) return
      if (completeIndex !== -1 && currentIndex === completeIndex) return
      if (currentIndex === 0) return

      this.sortTasks({ oldIndex: currentIndex, newIndex: currentIndex - 1 })
    })
  }
}
</script>