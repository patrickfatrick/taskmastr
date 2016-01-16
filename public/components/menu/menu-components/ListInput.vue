<template>
  <form id="list-line" class="prompt-line" name="listForm" novalidate v-on:submit.prevent="addList(newList.trim())">
    <input id="create-list" class="prompt mousetrap" type="text" name="todoInput" v-model="newList" v-bind:class="{'invalid': !isValid && ListAttempt}" placeholder="New List" v-el:listinput></input>
    <button id="list-button" class="fa fa-arrow-down submit" type="submit"></button>
  </form>
</template>

<script>

import hat from 'hat'
import Mousetrap from 'mousetrap'
import store from '../../../store/store'

export default {
  data () {
    return {
      newList: '',
      listAttempt: false
    }
  },
  computed: {
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
    addList (list) {
      store.actions.addList({
        list: list,
        items: [],
        current: false,
        delete: false,
        id: hat()
      })
      this.newList = ''
      return store.actions.setSaveButton(true)
    }
  },
  ready () {
    Mousetrap.bind('alt+f', (e) => {
      e.preventDefault()
      this.$els.listinput.focus()
    })
  }
}

</script>