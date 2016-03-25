<template>
  <div class="mask" v-if="detailsToggled === index" transition="mask" @click="toggleDetails(index)"></div>
  <div class="task-details" v-if="detailsToggled === index" :class="{'toggled': detailsToggled === index}" transition="details">
    <button class="task-details-close" @click.prevent="toggleDetails(index)">
      <i class="fa fa-times"></i>
    </button>
    <div class="task-name-container">
      <input class="task-name mousetrap" type="text" :value="task.item" @change="rename($event, index)"></input>
    </div>
    <div class="task-details-container">
      <div class="task-create task-details-panel">
        <span class="task-label">Created on</span>{{reformatDate(task.dateCreated)}}
      </div>
      <div class="task-complete task-details-panel" :class="{'hidden': !task.dateCompleted}">
        <span class="task-label">Completed on</span>{{reformatDate(task.dateCompleted)}}
      </div>
      <div class="task-due task-details-panel" :class="{'hidden': !!task.complete}">
        <span class="task-label" :class="{'hidden': !task.dueDate}">Due on</span>{{(task.dueDate) ? reformatDate(task.dueDate) + '&nbsp;' : ''}}
        <span class="task-label" :class="{'hidden': task.dueDate}">Set a due date&nbsp;</span>
        <datepicker :task="task" :index="index"></datepicker>
      </div>
      <div class="task-details-panel" :class="{'hidden': !!task.complete}">
        <div class="due-in" :class="{'hidden': !(task._dueDateDifference > 0)}">
          <span :class="{'hidden': !(task._dueDateDifference > 1)}"><span class="task-label">which is</span>{{task._dueDateDifference}} days <span class="task-label">from now</span></span>
          <span :class="{'hidden': !(task._dueDateDifference === 1)}"><span class="task-label">which is</span>tomorrow</span>
        </div>
        <div class="overdue" :class="{'hidden': !(task._dueDateDifference < 0)}">
          <span :class="{'hidden': !(task._dueDateDifference < -1)}"><span class="task-label">which was</span>{{-task._dueDateDifference}} days <span class="task-label">ago</span></span>
          <span :class="{'hidden': !(task._dueDateDifference === -1)}"><span class="task-label">which was</span>yesterday</span>
        </div>
        <div class="due-today" :class="{'hidden': !(task._dueDateDifference === 0)}"><span class="task-label">which is</span>today</div>
      </div>
    </div>
    <div class="task-details-container">
      <h2>Notes</h2>
      <div class="task-notes-container">
        <textarea class="task-notes mousetrap" :value="task.notes" @change="setTaskNotes(index, $event.target.value)"></textarea>
      </div>
    </div>
  </div>
</template>

<script>

import _ from 'lodash'
import Mousetrap from 'mousetrap'
import gregorian from 'gregorian'
import store from '../../../store/store'
import Datepicker from './Datepicker.vue'

export default {
  components: {
    Datepicker
  },
  computed: {
    tasks () {
      return store.state.current.items
    },
    detailsToggled () {
      return store.state.detailsToggled
    }
  },
  props: {
    'index': Number,
    'task': Object
  },
  methods: {
    setTaskNotes: store.actions.setTaskNotes,
    toggleDetails: store.actions.toggleDetails,
    setDueDateDifference: store.actions.setDueDateDifference,
    renameTask: store.actions.renameTask,
    rename (e, index) {
      if (!e.target.value) {
        e.target.value = this.task.item
        return
      }
      this.renameTask(index, e.target.value.trim())
    },
    reformatDate (date) {
      return gregorian.reform(date).to('M d, yyyy')
    }
  },
  compiled () {
    this.setDueDateDifference(this.index, this.task.dueDate)

    // Keyboard bindings
    Mousetrap.bind('ctrl+d', () => {
      this.toggleDetails(_.findIndex(this.tasks, {current: true}))
    })
  }
}

</script>