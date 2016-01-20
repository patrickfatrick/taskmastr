<template>
  <div class="mask" v-if="task._detailsToggled" transition="mask" v-on:click="toggleDetails(index, false)"></div>
  <div class="task-details" v-bind:class="{'toggled': task._detailsToggled}" transition="details" v-show="task._detailsToggled">
    <button class="task-details-close" v-on:click.prevent="toggleDetails(index, false)">
      <i class="fa fa-times"></i>
    </button>
    <div class="task-name-container">
      <input class="task-name mousetrap" type="text" v-model="task.item" v-on:change="setSaveButton(true)"></input>
    </div>
    <div class="task-details-container">
      <div class="task-create task-details-panel"><span class="task-label">Created on</span>{{reformatDate(task.dateCreated)}}</div>
      <div class="task-due task-details-panel">
        <span class="task-label" v-show="task.dueDate">Due on</span>{{(task.dueDate) ? reformatDate(task.dueDate) + '&nbsp;' : ''}}
        <span class="task-label" v-show="!task.dueDate">Set a due date&nbsp;</span>
        <datepicker :task="task" :index="index"></datepicker>
      </div>
      <div class="task-details-panel">
        <div class="due-in" v-show="task._dueDateDifference > 0">
          <span v-show="task._dueDateDifference > 1"><span class="task-label">which is</span>{{task._dueDateDifference}} days <span class="task-label">from now</span></span>
          <span v-show="task._dueDateDifference === 1"><span class="task-label">which is</span>tomorrow</span>
        </div>
        <div class="overdue" v-show="task._dueDateDifference < 0">
          <span v-show="task._dueDateDifference < -1"><span class="task-label">which was</span>{{-task._dueDateDifference}} days <span class="task-label">ago</span></span>
          <span v-show="task._dueDateDifference === -1"><span class="task-label">which was</span>yesterday</span>
        </div>
        <div class="due-today" v-show="task._dueDateDifference === 0"><span class="task-label">which is</span>today</div>
      </div>
    </div>
    <div class="task-details-container">
      <h2>Notes</h2>
      <div class="task-notes-container">
        <textarea class="task-notes mousetrap" v-model="task.notes" v-on:change="setSaveButton(true)"></textarea>
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
      return store.state.user.current.items
    }
  },
  props: [
    'task',
    'index'
  ],
  methods: {
    setSaveButton: store.actions.setSaveButton,
    toggleDetails: store.actions.toggleDetails,
    setDueDateDifference: store.actions.setDueDateDifference,
    reformatDate (date) {
      return gregorian.reform(date).to('M d, yyyy')
    }
  },
  ready () {
    this.setDueDateDifference(this.index, this.task.dueDate)

    // Keyboard bindings
    Mousetrap.bind('ctrl+d', () => {
      if (_.findIndex(this.tasks, {current: true}) !== _.findIndex(this.tasks, {_detailsToggled: true})) {
        this.toggleDetails(_.findIndex(this.tasks, {_detailsToggled: true}), false)
      }
      let index = _.findIndex(this.tasks, {current: true})
      this.toggleDetails(index, !(this.tasks[index]._detailsToggled))
    })
  }
}

</script>