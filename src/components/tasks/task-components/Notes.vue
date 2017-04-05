<template>
  <div class="task-details__task-info-container task-details__task-info-container--task-notes">
    <h2 class="task-notes-container__task-notes__heading">Notes</h2>
    <div>
      <div class="task-notes-container__button-container">
        <button
          class="task-notes-container__button-container__edit-button"
          @click="setEditorToggled"
        >
          {{(editorToggled) ? 'Done' : 'Edit'}}
        </button>
      </div>
      <div
        ref="markymark"
        v-show="editorToggled"
      />
      <div
        class="task-notes-container__task-notes"
        ref="markyhtml"
        v-show="!editorToggled && task.notes"
      >
      </div>
      <div
        class="task-notes-container__task-notes--placeholder"
        v-show="!editorToggled && !task.notes"
      >
        No notes in this task. Hit the EDIT button above to add some!
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.task-notes-container__task-notes__heading {
  margin-bottom: 1rem;
}

.task-notes-container__button-container {
  position: relative;
  font-size: 1rem;

  & .task-notes-container__button-container__edit-button {
    position: absolute;
    right: 0;
    top: -2.5rem;
  }
}

.task-notes-container__task-notes {
  width: 100%;
  min-height: 300px;
  height: auto;
  resize: none;
  font-size: 1rem;
  font-family: var(--raleway);

  @media (height >= 700px) {
    min-height: 375px;
  }
}

.task-notes-container__task-notes--placeholder {
  font-size: 1rem;
  font-style: italic;
  padding-top: 3rem;
  text-align: center;
}
</style>

<script>
/* global CustomEvent */
import { mapActions } from 'vuex'
import marky from 'marky-marked'

export default {
  data () {
    return {
      marky: null,
      markyEditor: null,
      editorToggled: false
    }
  },
  props: {
    task: Object,
    index: Number,
    detailsToggled: Number
  },
  methods: {
    ...mapActions([
      'setTaskNotes'
    ]),
    setEditorToggled () {
      this.editorToggled = !this.editorToggled
      if (this.editorToggled) {
        this.$nextTick(() => {
          this.markyEditor.focus()
        })
      } else {
        this.setTaskNotes({ index: this.index, notes: this.markyEditor.value })
      }
    }
  },
  mounted () {
    // Initialize Marky Marked
    const markyupdate = new CustomEvent('markyupdate')

    this.$nextTick(() => {
      this.marky = marky.mark([ this.$refs.markymark ])[0]
      this.markyEditor = this.$refs.markymark.querySelector('.marky-editor')
      this.markyEditor.addEventListener('markychange', (e) => {
        this.$refs.markyhtml.innerHTML = ''
        this.$refs.markyhtml.insertAdjacentHTML('afterbegin', this.marky.html)
      })
      this.markyEditor.value = this.task.notes
      this.markyEditor.dispatchEvent(markyupdate)
    })
  },
  beforeDestroy () {
    this.marky.destroy()
    this.marky = null
    this.markyEditor = null
  }
}
</script>