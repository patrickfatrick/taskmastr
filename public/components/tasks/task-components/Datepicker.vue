<template>
  <span>
    <input class="datepicker-input" type="text" name="datepicker" :value="task.dueDate" readonly="true" v-el:pikaday></input>
    <button class="datepicker-toggle" title="Toggle datepicker" v-el:pikatrigger :class="{'active': task.dueDate}">
      <i class="fa" :class="{'fa-calendar-check-o': task.dueDate, 'fa-calendar-plus-o': !task.dueDate}"></i>
    </button>
    <div class="remove-due-date" v-if="task.dueDate">
      <button class="remove-due-date-button" title="Remove due date" @click.prevent="setDueDate(index, '')">
        <span class="task-label">Remove</span>
        <i class="fa fa-calendar-times-o"></i>
      </button>
    </div>
  </span>
</template>

<script>

import Pikaday from 'pikaday'
import gregorian from 'gregorian'
import { setTaskDueDate, setDueDateDifference } from '../../../store/item-store/item-actions'

export default {
  vuex: {
    getters: {
      tasks: (state) => state.current.items
    },
    actions: {
      setTaskDueDate,
      setDueDateDifference
    }
  },
  data () {
    return {
      picker: null
    }
  },
  props: {
    index: Number,
    task: Object
  },
  methods: {
    reformatDate (date) {
      this.setDueDate(this.index, gregorian.reform(date).to('iso'))
    },
    setDueDate (index, date) {
      this.setTaskDueDate(index, date)
      if (!this.tasks[index].dueDate) {
        this.picker.setDate('')
        this.setDueDateDifference(this.index, null)
      }
    }
  },
  compiled () {
    this.picker = new Pikaday({
      field: this.$els.pikaday,
      trigger: this.$els.pikatrigger,
      yearRange: 1,
      onSelect: function () {
        this.setDueDate(this.index, gregorian.reform(this.picker._d).set(6, 'h').to('iso'))
        this.setDueDateDifference(this.index, this.task.dueDate)
      }.bind(this)
    })
  }
}

</script>