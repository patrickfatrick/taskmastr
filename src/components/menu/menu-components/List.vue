<template>
  <div
    class="list table-row"
    :class="{'deleting': list._deleting, 'current': list.current}">
    <div class="initial-view">
      <div
        class="task-cell table-data"
        @dblclick="toggleDetails(list.id)">
        <input
          class="rename"
          type="text"
          :value="list.list"
          @change="rename($event, index)"
          :class="{'hidden': !(listDetailsToggled === list.id && list.owner === username)}">
        </input>
        <button 
          :href="'#' + list.id" 
          class="name" 
          :title="list.list"
          :class="{'hidden': !(listDetailsToggled !== list.id || list.owner !== username)}"
          @click.prevent="navigateToList(list.id)">{{list.list}}
        </button>
      </div>
      <div class="utils table-data">
        <button 
          class="rename-button"
          title="Rename list"
          @click.prevent="toggleDetails(list.id)">
          <i class="fa fa-pencil-square"></i>
        </button>
        <button
          class="delete-button"
          title="Delete list"
          v-if="list.owner === username"
          @click.prevent="removeList(index)">
          <i 
            class="fa"
            :class="{'fa-trash-o': !list._deleting, 'fa-undo': list._deleting}">
          </i>
        </button>
        <i 
          class="fa fa-lock" 
          v-if="list.owner !== username">
        </i>
      </div>
    </div>
    <list-details
      :index="index"
      :list="list">
    </list-details>
  </div>
</template>

<script>
import _ from 'lodash'
import Mousetrap from 'mousetrap'
import { mapState, mapActions } from 'vuex'
import ListDetails from './ListDetails.vue'

export default {
  computed: mapState({
    username: (state) => state.user.username,
    current: (state) => state.current,
    lists: (state) => state.user.tasks,
    listDetailsToggled: (state) => state.listDetailsToggled
  }),
  data () {
    return {
      renameToggled: null
    }
  },
  props: {
    index: Number,
    list: Object
  },
  components: {
    ListDetails
  },
  methods: {
    ...mapActions([
      'deleteList',
      'setCurrentList',
      'sortLists',
      'renameList',
      'unmountList',
      'toggleListDetails'
    ]),
    sortFunction (oldIndex, newIndex) {
      return this.sortLists({ oldIndex, newIndex })
    },
    removeList (index) {
      this.deleteList({ index, delay: 5000, perm: true, cb: (id) => this.navigateToList(id) })
    },
    navigateToList (id) {
      if (this.current.id !== id) this.unmountList(this.current.id)
      this.$router.push('/app/list/' + id)
    },
    rename (e, index) {
      if (!e.target.value) {
        e.target.value = this.lists[index].list
        return
      }
      this.renameList({ index, name: e.target.value.trim() })
    },
    toggleDetails (id) {
      if (this.listDetailsToggled === id) {
        return this.toggleListDetails(null)
      }
      this.toggleListDetails(id)
    }
  },
  mounted () {
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
    Mousetrap.bind('alt+command+down', () => {
      const currentIndex = _.findIndex(this.lists, {current: true})
      if (currentIndex === this.lists.length - 1) return
      this.sortLists({ oldIndex: currentIndex, newIndex: currentIndex + 1 })
    })
    Mousetrap.bind('alt+command+up', () => {
      const currentIndex = _.findIndex(this.lists, {current: true})
      if (currentIndex === 0) return
      this.sortLists({ oldIndex: currentIndex, newIndex: currentIndex - 1 })
    })
    Mousetrap.bind('alt+d', () => {
      this.toggleDetails(_.find(this.lists, {current: true}).id)
    })
  }
}

</script>