<template>
  <div>
    <transition name="mask">
      <div class="mask" v-if="detailsToggled === index" @click="toggleDetails(index)"></div>
    </transition>
    <transition name="details">
      <div class="task-details" v-if="detailsToggled === index" :class="{'toggled': detailsToggled === index}">
        <button class="task-details-close" @click.prevent="toggleDetails(index)">
          <i class="fa fa-times"></i>
        </button>
        <div class="task-name-container">
          <input class="task-name mousetrap" type="text" :value="task.item" @change="rename($event, index)"></input>
        </div>
        <div class="task-details-container">
          <div class="task-create task-details-panel">
            <span class="task-label">Created on</span>{{reformatDate(task.dateCreated)}}<br>
            <span class="task-label">by {{(task.createdBy === username) ? 'You' : task.createdBy}}</span>
          </div>
          <div class="task-complete task-details-panel" :class="{'hidden': !task.dateCompleted}">
            <span class="task-label">Completed on</span>{{reformatDate(task.dateCompleted)}}<br>
            <span class="task-label">by {{(task.completedBy === username) ? 'You' : task.completedBy}}</span>
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
            <textarea class="task-notes mousetrap" :value="task.notes" @change="setTaskNotes({ index, notes: $event.target.value })"></textarea>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import _ from 'lodash'
import Mousetrap from 'mousetrap'
import gregorian from 'gregorian'
import { mapState, mapActions } from 'vuex'
import Datepicker from './Datepicker.vue'

export default {
  computed: mapState({
    username: (state) => state.user.username,
    tasks: (state) => state.current.items,
    detailsToggled: (state) => state.detailsToggled
  }),
  components: {
    Datepicker
  },
  props: {
    index: Number,
    task: Object
  },
  methods: {
    ...mapActions([
      'setTaskNotes',
      'toggleDetails',
      'setDueDateDifference',
      'renameTask'
    ]),
    rename (e, index) {
      if (!e.target.value) {
        e.target.value = this.task.item
        return
      }
      this.renameTask({ index, name: e.target.value.trim() })
    },
    reformatDate (date) {
      return gregorian.reform(date).to('M d, yyyy')
    }
  },
  mounted () {
    this.setDueDateDifference({ index: this.index, dueDate: this.task.dueDate })

    // Keyboard bindings
    Mousetrap.bind('ctrl+d', () => {
      this.toggleDetails(_.findIndex(this.tasks, {current: true}))
    })
  }
}
</script>