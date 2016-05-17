<template>
  <div class="list-details" :class="{ 'toggled': listDetailsToggled === list.id }">
    <div class="list-details-inner">
      <div class="list-created">
        <span class="list-label">Created on</span>
        {{ reformatDate(list.dateCreated) }}
      </div>
      <div class="list-modified">
        <span class="list-label">Last modified</span>
        {{ reformatDate(list.dateModified) }}
      </div>
      <div class="user-list">
        <div class="list-owner">
          <div class="owner-heading">Owner</div>
          {{ (list.owner.trim() === username) ? 'You' : truncateUsername(list.owner, 25) }}
        </div>
        <div class="user-heading">
          Collaborators
        </div>
        <div class="user-list-inner">
          <div class="user-row" v-for="user in list.users" v-if="list.users.length">
            <div class="user-name" :class="{ pending: user.status === 'pending' }">
              {{ (user.username.trim() === username) ? 'You' : truncateUsername(user.username, 20) }} <span class="list-label user-pending" v-if="user.status === 'pending'">(pending)</span>
            </div>
            <div class="user-remove-button-container">
              <button class="user-remove-button" title="Remove user" v-if="username === list.owner || user.username.trim() === username.trim()" @click.prevent="removeListUser(index, user)"><i class="fa fa-times"></i></button>
              <i class="fa fa-lock" v-if="username !== list.owner && user.username.trim() !== username.trim()"></i>
            </div>
          </div>
          <div class="no-users" v-if="!list.users.length">It's just you in here!</div>
          <div class="new-user" v-if="list.owner === username">
            <form id="new-user-form-{{list.id}}" @submit.prevent="addNewListUser(index, newUser.trim())">
              <input type="text" title="Invite new user" placeholder="Invite someone" class="new-user-input" :value="newUser" @change="changeNewUser($event.target.value)">
              <div class="new-user-button-container">
                <button type="submit" title="Invite" class="new-user-button"><i class="fa fa-user-plus"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import gregorian from 'gregorian'
import { addListUser, removeListUser } from '../../../store/list-store/list-actions'

const emailRE = /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  vuex: {
    getters: {
      username: (state) => state.user.username,
      listDetailsToggled: (state) => state.listDetailsToggled
    },
    actions: {
      addListUser,
      removeListUser
    }
  },
  data () {
    return {
      newUser: null
    }
  },
  computed: {
    validate () {
      return {
        newUserEmail: emailRE.test(this.newUser.trim()),
        notYourEmail: !!(this.newUser.trim() !== this.username)
      }
    },
    isValid () {
      var validation = this.validate
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  props: {
    index: Number,
    list: Object
  },
  methods: {
    changeNewUser (val) {
      this.newUser = val
    },
    reformatDate (date) {
      return gregorian.reform(date).to('M d, yyyy')
    },
    truncateUsername (username, length) {
      if (username.length > length) return `${username.substring(0, length)} ...`
      return username
    },
    addNewListUser (index, user) {
      if (!this.isValid) return
      this.addListUser(index, { username: user, status: 'pending' })
      this.newUser = ''
    }
  }
}

</script>