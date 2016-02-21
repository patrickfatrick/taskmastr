<template>
  <form id="list-line" class="prompt-line" name="listForm" novalidate v-on:submit.prevent="addNewList(newList.trim())">
    <input id="create-list" class="prompt mousetrap" type="text" name="todoInput" :value="newList" v-on:change="setNewList($event.target.value)" v-bind:class="{'invalid': !isValid && listAttempt}" placeholder="New List" v-el:listinput></input>
    <button id="list-button" class="submit" title="Create task" type="submit">
      <i class="fa fa-arrow-down"></i>
    </button>
  </form>
</template>

<script>

import hat from 'hat'
import Mousetrap from 'mousetrap'
import store from '../../../store/store'

export default {
  computed: {
    newList () {
      return store.state.newList
    },
    listAttempt () {
      return store.state.listAttempt
    },
    user () {
      return store.state.user
    },
    validate () {
      return {
        newListRequired: !!this.newList.trim()
      }
    },
    isValid () {
      var validation = this.validate
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  methods: {
    addList: store.actions.addList,
    setNewList: store.actions.setNewList,
    setListAttempt: store.actions.setListAttempt,
    addNewList (list) {
      this.setListAttempt(true)
      if (!this.isValid) return
      this.addList({
        id: hat(),
        list: list.replace(/^\w/g, list.charAt(0).toUpperCase()),
        items: [],
        current: false,
        _delete: false
      })
      this.setListAttempt(false)
      this.setNewList('')
    }
  },
  compiled () {
    Mousetrap.bind('alt+f', (e) => {
      if (e.preventDefault) e.preventDefault()
      this.$els.listinput.focus()
    })
  }
}

</script>