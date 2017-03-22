<template>
  <span>
    <input
      class="datepicker-input"
      type="text"
      name="datepicker"
      :value="task.dueDate"
      readonly="true"
      ref="pikaday"
    />
    <button
      class="datepicker-toggle"
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
      class="remove-due-date"
      v-if="task.dueDate"
    >
      <button
        class="remove-due-date-button"
        title="Remove due date"
        @click.prevent="setDueDate(index, '')"
      >
        <span class="task-label">Remove</span>
        <i class="fa fa-calendar-times-o" />
      </button>
    </div>
  </span>
</template>

<style lang="scss" scoped>
  @import "bourbon";
  @import "neat";
  @import "../../../stylesheets/variables";
  @import "../../../stylesheets/mixins";

  .pika-single:not(.is-hidden) {
    z-index: 5 !important;
    background: $white;
    font-family: $raleway;
    font-size: 1rem;
    margin-top: 1rem;
    text-transform: lowercase;
    border-radius: 15px;
    padding: 0.2em 0.2em 0;
    @include center;
    animation: bounceInDown 300ms;
    box-shadow: rgba(0, 0, 0, 0.3) 0 19px 60px, rgba(0, 0, 0, 0.22) 0 15px 20px;
    @media screen and (max-width: $small) {
      width: 100%;
      left: 0 !important;
    }
    @media screen and (min-width: $medium) {
      width: 400px;
      left: 0 !important;
      right: 0;
    }
    .pika-title {
      color: $white;
      background: $orchid;
      font-weight: normal;
      border: none;
      @include border-top-radius(15px);
      .pika-label {
        display: inline-block;
        position: relative;
        z-index: 9999;
        overflow: hidden;
        margin: 0;
        padding: 5px 3px;
        font-size: 14px;
        line-height: 20px;
        font-weight: bold;
      }
      .pika-select {
        cursor: pointer;
        position: absolute;
        z-index: 9998;
        margin: 0;
        left: 0;
        top: 5px;
        filter: alpha(opacity=0);
        opacity: 0;
      }
    }
    .pika-prev,
    .pika-next {
      display: block;
      cursor: pointer;
      position: relative;
      outline: none;
      border: 0;
      padding: 0;
      width: 25px;
      height: 32px;
      text-indent: 25px;
      white-space: nowrap;
      overflow: hidden;
      background-color: transparent;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100%;
      margin: 0 0.5rem;
      &:hover {
        background-color: transparent;
        color: $deepBlue;
        border: none;
      }
      i {
        font-size: 1.4rem;
        padding-top: 0.3rem;
      }
    }
    .pika-prev {
      float: left;
      background-image: url('../fonts/arrow-circle-left.svg');
    }
    .pika-next {
      float: right;
      background-image: url('../fonts/arrow-circle-right.svg');
    }
    .ui-datepicker-buttonpane {
      border-bottom: 1px solid #E5E9EA !important;
    }
    table {
      margin: 1rem 2rem;
      th {
        width: 1rem;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      td {
        padding: 0;
        button {
          width: 3rem;
          height: 1.5rem;
          background: $white;
          border: none;
          outline: none;
          text-transform: lowercase;
          font-weight: normal;
          color: $oceanBlue;
          font-size: 1rem;
          padding: 0;
          padding-top: 5px;
          padding-bottom: 5px;
          border: none;
          &:hover {
            background: $deepBlue !important;
            color: $white !important;
          }
          &:focus {
            background: $grassStain;
            color: $white;
          }
        }
        &.is-empty {
          background: $white;
        }
      }
      .ui-datepicker-unselectable a {
        color: $oceanBlue;
        background: $white;
      }
      .is-today button {
        background: $astroTurf;
        color: $black;
      }
      .is-selected button{
        color: $white;
        background: $deepBlue;
      }
    }
  }
  .pika-single.is-hidden {
    display: none;
  }
</style>

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