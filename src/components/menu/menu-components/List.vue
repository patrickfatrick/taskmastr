<template>
  <div
    class="table-row table-row--list"
    :class="{
      'table-row--deleting': list._deleting,
      'table-row--current': list._id === currentList
    }">
    <div class="table-row__initial-view">
      <div
        class="table-row__table-data table-row__table-data--task-cell"
        @dblclick="toggleDetails(list._id)">
        <input
          class="rename"
          type="text"
          :value="list.list"
          @change="rename($event, index)"
          :class="{'hidden': !(listDetailsToggled === list._id && list.owner === username)}">
        </input>
        <button 
          :href="'#' + list._id" 
          class="name" 
          :title="list.list"
          :class="{'hidden': !(listDetailsToggled !== list._id || list.owner !== username)}"
          @click.prevent="navigateToList(list._id)">{{list.list}}
        </button>
      </div>
      <div class="table-row__table-data table-row__table-data--utils">
        <button 
          class="rename-button"
          title="Rename list"
          @click.prevent="toggleDetails(list._id)">
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
      :list="list"
    >
    </list-details>
  </div>
</template>

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.table-row--list {
  @apply --tableRow;

  &.table-row--current {
    background: var(--deepBlue);
  }

  &:hover:not(.current) {
    background: inherit;
  }

  & .table-row__table-header {
    display: none;
  }

  & .table-row__initial-view {
    display: block;
    lost-utility: clearfix;
  }

  & .table-row__table-data--task-cell {
    lost-column: 15/21;
  }

  & .table-row__table-data--utils {
    lost-column: 6/21;
    text-align: center;
  }

  & .rename {
    @apply --listDetailsInput;
  }
}
</style>

<script>
import _ from 'lodash'
import Mousetrap from 'mousetrap'
import { mapState, mapActions } from 'vuex'
import ListDetails from './ListDetails.vue'
import { findCurrentIndex } from '../../../helper-utilities/utils'

export default {
  computed: mapState({
    username: (state) => state.user.username,
    current: (state) => state.current,
    currentList: (state) => state.currentList,
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
      if (this.current._id !== id) this.unmountList(this.current._id)
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
      const currentIndex = findCurrentIndex(this.lists, this.currentList)
      const index = (currentIndex === 0)
        ? this.lists.length - 1
        : currentIndex - 1
      this.navigateToList(this.lists[index]._id)
    })
    Mousetrap.bind('alt+.', (e) => {
      if (e.preventDefault) e.preventDefault()
      const currentIndex = findCurrentIndex(this.lists, this.currentList)
      const index = (currentIndex === this.lists.length - 1)
        ? 0
        : currentIndex + 1
      this.navigateToList(this.lists[index]._id)
    })
    Mousetrap.bind('alt+backspace', () => {
      this.removeList(findCurrentIndex(this.lists, this.currentList))
    })
    Mousetrap.bind('alt+command+down', () => {
      const currentIndex = findCurrentIndex(this.lists, this.currentList)
      if (currentIndex === this.lists.length - 1) return
      this.sortLists({ oldIndex: currentIndex, newIndex: currentIndex + 1 })
    })
    Mousetrap.bind('alt+command+up', () => {
      const currentIndex = findCurrentIndex(this.lists, this.currentList)
      if (currentIndex === 0) return
      this.sortLists({ oldIndex: currentIndex, newIndex: currentIndex - 1 })
    })
    Mousetrap.bind('alt+d', () => {
      this.toggleDetails(_.find(this.lists, {current: true})._id)
    })
  }
}
</script>