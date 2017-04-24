/* global it describe sinon beforeEach afterEach */

import { assert } from 'chai'
import Notes from '../../../../src/components/tasks/task-components/Notes.vue'
import mountVm from '../../../mount-vm'
import { click } from '../../../browser-events'

describe('NotesVue', function () {
  let task
  let index
  let detailsToggled

  beforeEach(() => {
    task = {
      id: 'itemid',
      item: 'Item 1',
      current: true,
      complete: false,
      dueDate: null,
      notes: 'test',
      _delete: true,
      _dueDateDifference: 1
    }

    index = 0
    detailsToggled = 0
  })

  afterEach(() => {
    task = null
    index = null
    detailsToggled = null
  })

  it('should inherit a setTaskNotes action from the store', () => {
    const vm = mountVm(Notes, null, { task, index, detailsToggled })
    assert.isFunction(vm.setTaskNotes)
  })

  it('should render with initial state', () => {
    const vm = mountVm(Notes, null, { task, index, detailsToggled })

    assert.isNotNull(vm.$el.classList.contains('task-details__task-info-container--task-notes'))
    assert.isFalse(vm.$el.querySelector('.task-notes-container__task-notes').style.display === 'none')
    assert.strictEqual(vm.$el.querySelector('.task-notes-container__task-notes--placeholder').style.display, 'none')

    vm.$nextTick(() => {
      assert.isNotNull(vm.markyEditor)
      assert.isNotNull(vm.$el.querySelector('.marky-editor'))
      assert.isNotNull(vm.$el.querySelector('.marky-toolbar'))
    })
  })

  it('should respond to changes in the state (editorToggled)', () => {
    const vm = mountVm(Notes, null, { task, index, detailsToggled })
    vm.editorToggled = true

    vm.$nextTick(() => {
      assert.isNotNull(vm.$el.classList.contains('task-details__task-info-container--task-notes'))
      assert.strictEqual(vm.$el.querySelector('.task-notes-container__task-notes').style.display, 'none')
      assert.isFalse(vm.$refs.markymark.style.display === 'none')
    })
  })

  it('should display a placeholder if no notes', () => {
    task.notes = ''
    const vm = mountVm(Notes, null, { task, index, detailsToggled })

    assert.isFalse(vm.$el.querySelector('.task-notes-container__task-notes--placeholder').style.display === 'none')
  })

  it('should preload task notes into the marky editor', () => {
    const vm = mountVm(Notes, null, { task, index, detailsToggled })
    vm.editorToggled = true

    vm.$nextTick(() => {
      assert.strictEqual(vm.markyEditor.value, 'test')
    })
  })

  it('setEditorToggled should set editorToggled', () => {
    const vm = mountVm(Notes, null, { task, index, detailsToggled })
    sinon.stub(vm, 'setTaskNotes')

    vm.setEditorToggled()

    assert.isTrue(vm.editorToggled)
    vm.setTaskNotes.restore()
  })

  it('setEditorToggled should call setTaskNotes', (done) => {
    const vm = mountVm(Notes, null, { task, index, detailsToggled })
    sinon.stub(vm, 'setTaskNotes')
    vm.editorToggled = true

    vm.$nextTick(() => {
      vm.markyEditor.value = 'test'
      vm.setEditorToggled()

      assert.isFalse(vm.editorToggled)
      assert.isTrue(vm.setTaskNotes.calledWith({ index: 0, notes: 'test' }))

      vm.setTaskNotes.restore()
      done()
    })
  })

  it('edit button should call setEditorToggled', (done) => {
    const vm = mountVm(Notes, null, { task, index, detailsToggled })
    sinon.stub(vm, 'setEditorToggled')
    vm.editorToggled = true

    vm.$nextTick(() => {
      vm.$el.querySelector('.task-notes-container__button-container__edit-button').dispatchEvent(click())

      assert.isTrue(vm.setEditorToggled.calledOnce)

      vm.setEditorToggled.restore()
      done()
    })
  })

  it('markychange should insert HTML into task notes', (done) => {
    const vm = mountVm(Notes, null, { task, index, detailsToggled })
    vm.editorToggled = true

    vm.$nextTick(() => {
      vm.marky.html = '<p>test</p>'
      vm.marky.emit('markychange')

      assert.strictEqual(vm.$refs.markyhtml.innerHTML, '<p>test</p>\n')

      done()
    })
  })
})
