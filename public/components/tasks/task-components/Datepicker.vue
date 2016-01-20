<template>
  <span>
    <input class="datepicker-input" type="text" name="datepicker" v-model="task.dueDate" v-bind:disabled="task.complete" readonly="true" v-el:pikaday></input>
    <button class="datepicker-toggle" title="Toggle datepicker" v-el:pikatrigger v-bind:class="{'active': task.dueDate}">
      <i class="fa" v-bind:class="{'fa-calendar-check-o': task.dueDate, 'fa-calendar-plus-o': !task.dueDate}"></i>
    </button>
    <div class="remove-due-date" v-show="task.dueDate">
      <button class="remove-due-date-button" title="Remove due date" v-on:click.prevent="setTaskDueDate(index, '')">
        <span class="task-label">Remove</span>
        <i class="fa fa-calendar-times-o"></i>
      </button>
    </div>
  </span>
</template>

<script>

import Pikaday from 'pikaday'
import gregorian from 'gregorian'
import store from '../../../store/store'

export default {
  data () {
    return {
      picker: null
    }
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
    setDueDateDifference: store.actions.setDueDateDifference,
    setTaskDueDate (index, date) {
      store.actions.setTaskDueDate(index, date)
      if (!this.tasks[index].dueDate) {
        this.picker.setDate('')
        this.setDueDateDifference(this.index, null)
      }
    }
  },
  ready () {
    this.picker = new Pikaday({
      field: this.$els.pikaday,
      trigger: this.$els.pikatrigger,
      yearRange: 1,
      onSelect: function () {
        this.setTaskDueDate(this.index, gregorian.reform(this.picker._d).set(6, 'h').to('iso'))
        this.setDueDateDifference(this.index, this.task.dueDate)
      }.bind(this)
    })
  }
}

</script>