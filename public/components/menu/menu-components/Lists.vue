<template>
  <div id="lists-list" class="table" v-show="lists">
    <div class="table-body" v-el:dragula>
      <div class="table-row" v-for="list in lists" :class="{'deleting': list._delete, 'current': list.current}" name="list{{$index + 1}}" transition="item">
        <div class="task-cell table-data">
          <input class="rename" type="text" :value="list.list" @change="rename($event, $index)" :class="{'hidden': !(renameToggled === $index)}" @keyup.enter="renameToggle(null)" @blur="renameToggle(null)"></input>
          <button href="#{{list.list}}" class="name" title="{{list.list}}" :class="{'hidden': !(renameToggled !== $index)}" @click.prevent="navigateToList(list.id)" @dblclick="renameToggle($index)">{{list.list}}</button>
        </div>
        <div class="utils table-data">
          <button class="sort-button sort-handle" title="Sort list">
            <i class="sort-handle fa fa-arrows-v sort"></i>
          </button>
          <button class="rename-button" title="Rename list" @click.prevent="renameToggle($index)">
            <i class="fa fa-pencil"></i>
          </button>
          <button class="delete-button" title="Delete list" @click.prevent="deleteList($index)">
            <i class="fa" :class="{'fa-trash-o': !list._delete, 'fa-undo': list._delete}"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import _ from 'lodash'
import dragula from 'dragula'
import Mousetrap from 'mousetrap'
import store from '../../../store/store'

export default {
  data () {
    return {
      renameToggled: null,
      drake: null,
      dragStart: null
    }
  },
  computed: {
    current () {
      return store.state.user.current
    },
    lists () {
      return store.state.user.tasks
    }
  },
  methods: {
    deleteList: store.actions.deleteList,
    setCurrentList: store.actions.setCurrentList,
    sortLists: store.actions.sortLists,
    setSaveButton: store.actions.setSaveButton,
    renameList: store.actions.renameList,
    navigateToList (id) {
      this.$route.router.go('/app/list/' + id)
    },
    rename (e, index) {
      if (!e.target.value) {
        e.target.value = this.lists[index].list
        return
      }
      this.renameList(index, e.target.value.trim())
    },
    renameToggle (index, e) {
      if (this.renameToggled === index) {
        this.renameToggled = null
        return
      }
      this.renameToggled = index
    },
    _drag (drake) {
      drake.on('drag', (el) => {
        this.dragStart = this._index(el)
      })
    },
    _drop (drake) {
      drake.on('drop', (el) => {
        let oldIndex = this.dragStart
        let newIndex = this._index(el)
        this.sortLists(oldIndex, newIndex)
      })
    },
    _index (el) {
      var index = 0
      if (!el || !el.parentNode) return -1
      while (el && (el = el.previousElementSibling)) index++
      return index
    }
  },
  compiled () {
    // Keyboard bindings
    Mousetrap.bind('alt+,', (e) => {
      if (e.preventDefault) e.preventDefault()
      let index = (_.findIndex(this.lists, {current: true}) === 0)
        ? this.lists.length - 1
        : _.findIndex(this.lists, 'current', true) - 1
      this.navigateToList(this.lists[index].id)
    })
    Mousetrap.bind('alt+.', (e) => {
      if (e.preventDefault) e.preventDefault()
      let index = (_.findIndex(this.lists, {current: true}) === this.lists.length - 1)
        ? 0
        : _.findIndex(this.lists, 'current', true) + 1
      this.navigateToList(this.lists[index].id)
    })
    Mousetrap.bind('alt+backspace', () => {
      this.deleteList(_.findIndex(this.lists, {current: true}))
    })
    Mousetrap.bind('alt+/', () => {
      this.renameToggle(_.findIndex(this.lists, {current: true}))
    })
    Mousetrap.bind('alt+command+down', () => {
      const currentIndex = _.findIndex(this.lists, {current: true})
      if (currentIndex === this.lists.length - 1) return
      this.sortLists(currentIndex, currentIndex + 1)
    })
    Mousetrap.bind('alt+command+up', () => {
      const currentIndex = _.findIndex(this.lists, {current: true})
      if (currentIndex === 0) return
      this.sortLists(currentIndex, currentIndex - 1)
    })
  },
  ready () {
    this.drake = dragula({
      containers: [this.$els.dragula],
      revertOnSpill: true,
      mirrorContainer: this.$els.dragula,
      moves: (el, source, handle) => {
        if (handle.classList.contains('sort-handle')) return true
        return false
      }
    })
    this._drag(this.drake)
    this._drop(this.drake)
  }
}

</script>