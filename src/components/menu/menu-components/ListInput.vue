<template>
  <form id="list-line" class="prompt-line" name="listForm" novalidate v-on:submit.prevent="addNewList(newList.trim())">
    <input id="create-list" class="prompt mousetrap" type="text" title="List Input" :value="newList" v-on:change="setNewList($event.target.value)" :class="{'invalid': !isValid && listAttempt}" placeholder="New List" ref="listinput"></input>
    <button id="list-button" class="submit" title="Create task" type="submit">
      <i class="fa fa-arrow-down"></i>
    </button>
  </form>
</template>

<script>
import { hashish } from 'harsh'
import gregorian from 'gregorian'
import Mousetrap from 'mousetrap'
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
      newList: (state) => state.newList,
      listAttempt: (state) => state.listAttempt
    }),
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
    ...mapActions([
      'addList',
      'setNewList',
      'setListAttempt'
    ]),
    addNewList (list) {
      this.setListAttempt(true)
      if (!this.isValid) return
      this.addList({
        _id: hashish(),
        list: list.replace(/^\w/g, list.charAt(0).toUpperCase()),
        items: [],
        current: false,
        owner: this.user.username,
        dateCreated: gregorian.reform(new Date()).to('iso'),
        users: [],
        _deleting: false
      })
      this.setListAttempt(false)
      this.setNewList('')
    }
  },
  mounted () {
    Mousetrap.bind('alt+f', (e) => {
      if (e.preventDefault) e.preventDefault()
      this.$refs.listinput.focus()
    })
  }
}
</script>