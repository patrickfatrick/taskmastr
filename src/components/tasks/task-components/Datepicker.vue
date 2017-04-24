<template>
  <span class="datepicker">
    <input
      class="datepicker__input"
      type="text"
      name="datepicker"
      :value="task.dueDate"
      readonly="true"
      ref="pikaday"
    />
    <button
      class="datepicker__toggle"
      title="Toggle datepicker"
      ref="pikatrigger"
      :class="{'active': task.dueDate}"
    >
      <i
        class="fa"
        :class="{'fa-calendar-check-o': task.dueDate, 'fa-calendar-plus-o': !task.dueDate}"
      />
    </button>
    <div
      class="datepicker__remove-due-date"
      v-if="task.dueDate"
    >
      <button
        class="datepicker__remove-due-date__button"
        title="Remove due date"
        @click.prevent="setDueDate(index, '')"
      >
        <span class="task-details-panel__task-label">Remove</span>
        <i class="fa fa-calendar-times-o" />
      </button>
    </div>
  </span>
</template>

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.datepicker__input {
  background: transparent;
  color: transparent;
  border: none;
  box-shadow: none;
  position: absolute;
  top: -10000px;
  visibility: hidden;
}

.datepicker__toggle {
  font-size: 1.2rem;
  color: var(--grassStain);

  &.active {
    color: var(--orchid);
  }
}

.datepicker__remove-due-date {
  text-align: center;
  display: inline-block;

  @media (--medium) {
    display: block;
  }

  & .datepicker__remove-due-date__button {
    font-family: var(--cardo);
    font-size: 1.2rem;
    padding: 2px 4px 2px 8px;
    width: auto;
    cursor: pointer;
    text-transform: lowercase;
    color: var(--sunsetOrange);

    & i {
      margin-right: 0.5rem;
    }
  }
}
</style>

<script>
import Pikaday from 'pikaday'
import { reform, setLocal } from 'gregorian'
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
      this.setDueDate(this.index, reform('iso')(date))
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
        this.setDueDate(this.index, reform('iso')(setLocal('h')(6)(this.picker._d)))
        this.setDueDateDifference({ index: this.index, dueDate: this.task.dueDate })
      }.bind(this)
    })
  }
}
</script>