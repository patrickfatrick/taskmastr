<template>
  <div id="lists-list" class="table" v-show="lists">
    <div class="table-body" v-el:dragula>
      <div class="table-row" v-for="list in lists" :class="{'deleting': list._deleting, 'current': list.current}" name="list{{$index + 1}}" transition="item">
        <div class="initial-view">
          <div class="task-cell table-data">
            <input class="rename" type="text" :value="list.list" @change="rename($event, $index)" :class="{'hidden': !(listDetailsToggled === list.id && list.owner === username)}"></input>
            <button href="#{{list.list}}" class="name" title="{{list.list}}" :class="{'hidden': !(listDetailsToggled !== list.id || list.owner !== username)}" @click.prevent="navigateToList(list.id)" @dblclick="toggleDetails(list.id)">{{list.list}}</button>
          </div>
          <div class="utils table-data">
            <button class="rename-button" title="Rename list" @click.prevent="toggleDetails(list.id)">
              <i class="fa fa-pencil-square"></i>
            </button>
            <button class="sort-button sort-handle" title="Sort list">
              <i class="sort-handle fa fa-arrows-v sort"></i>
            </button>
            <button class="delete-button" title="Delete list" v-if="list.owner === username" @click.prevent="removeList($index)">
              <i class="fa" :class="{'fa-trash-o': !list._deleting, 'fa-undo': list._deleting}"></i>
            </button>
            <i class="fa fa-lock" v-if="list.owner !== username"></i>
          </div>
        </div>
        <list-details :index="$index" :list="list"></list-details>
      </div>
    </div>
  </div>
</template>

<script>

import _ from 'lodash'
import dragula from 'dragula'
import Mousetrap from 'mousetrap'
import { deleteList, setCurrentList, sortLists, renameList, unmountList, toggleListDetails } from '../../../store/list-store/list-actions'
import ListDetails from './ListDetails.vue'

export default {
  vuex: {
    getters: {
      username: (state) => state.user.username,
      current: (state) => state.current,
      lists: (state) => state.user.tasks,
      listDetailsToggled: (state) => state.listDetailsToggled
    },
    actions: {
      deleteList,
      setCurrentList,
      sortLists,
      renameList,
      unmountList,
      toggleListDetails
    }
  },
  components: {
    ListDetails
  },
  data () {
    return {
      renameToggled: null,
      drake: null,
      dragStart: null
    }
  },
  computed: {},
  methods: {
    removeList (index) {
      this.deleteList(index, (id) => {
        this.navigateToList(id)
      })
    },
    navigateToList (id) {
      if (this.current.id !== id) this.unmountList(this.current.id)
      this.$route.router.go('/app/list/' + id)
    },
    rename (e, index) {
      if (!e.target.value) {
        e.target.value = this.lists[index].list
        return
      }
      this.renameList(index, e.target.value.trim())
    },
    toggleDetails (id) {
      if (this.listDetailsToggled === id) {
        return this.toggleListDetails(null)
      }
      this.toggleListDetails(id)
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
      this.removeList(_.findIndex(this.lists, {current: true}))
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