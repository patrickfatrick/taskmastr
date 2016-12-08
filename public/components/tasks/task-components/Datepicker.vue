<template>
  <span>
    <input class="datepicker-input" type="text" name="datepicker" :value="task.dueDate" readonly="true" ref="pikaday"></input>
    <button class="datepicker-toggle" title="Toggle datepicker" ref="pikatrigger" :class="{'active': task.dueDate}">
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
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      picker: null
    }
  },
  computed: mapState({
    tasks: (state) => state.current.items
  }),
  props: {
    index: Number,
    task: Object
  },
  methods: {
    ...mapActions([
      'setTaskDueDate',
      'setDueDateDifference'
    ]),
    reformatDate (date) {
      this.setDueDate(this.index, gregorian.reform(date).to('iso'))
    },
    setDueDate (index, date) {
      this.setTaskDueDate({ index, date })
      if (!this.tasks[index].dueDate) {
        this.picker.setDate('')
        this.setDueDateDifference({ index: this.index, dueDate: null })
      }
    }
  },
  mounted () {
    this.picker = new Pikaday({
      field: this.$refs.pikaday,
      trigger: this.$refs.pikatrigger,
      yearRange: 1,
      onSelect: function () {
        this.setDueDate(this.index, gregorian.reform(this.picker._d).set(6, 'h').to('iso'))
        this.setDueDateDifference({ index: this.index, dueDate: this.task.dueDate })
      }.bind(this)
    })
  }
}
</script>