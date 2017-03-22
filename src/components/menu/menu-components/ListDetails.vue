<template>
  <div
    class="list-details"
    :class="{ 'toggled': listDetailsToggled === list._id }"
  >
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
          <div 
            class="user-row"
            v-for="user in list.users"
            v-if="list.users.length"
          >
            <div
              class="user-name"
              :class="{ pending: user.status === 'pending' }"
            >
              {{ (user.username.trim() === username) ? 'You' : truncateUsername(user.username, 20) }} <span class="list-label user-pending" v-if="user.status === 'pending'">(pending)</span>
            </div>
            <div class="user-remove-button-container">
              <button 
                class="user-remove-button"
                title="Remove user"
                v-if="username === list.owner || user.username.trim() === username.trim()"
                @click.prevent="removeListUser({ index, user })"
              >
                <i class="fa fa-times" />
              </button>
              <i
                class="fa fa-lock"
                v-if="username !== list.owner && user.username.trim() !== username.trim()"
              />
            </div>
          </div>
          <div
            class="no-users"
            v-if="!list.users.length"
          >
            It's just you in here!
          </div>
          <div
            class="new-user"
            v-if="list.owner === username"
          >
            <form 
              :id="'new-user-form-' + list._id"
              @submit.prevent="addNewListUser(index)"
            >
              <input
                type="text"
                title="Invite new user"
                placeholder="Invite someone"
                class="new-user-input"
                :value="newUser"
                @input="changeNewUser($event.target.value)"
              >
              <div class="new-user-button-container">
                <button
                  type="submit"
                  title="Invite"
                  class="new-user-button">
                  <i class="fa fa-user-plus" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "bourbon";
  @import "neat";
  @import "../../../stylesheets/variables";

  .list-details {
    max-height: 0;
    overflow: hidden;
    background-color: $orchid * 0.9;
    transition: max-height 150ms ease-out;
    &.toggled {
      max-height: 1000px;
      transition: max-height 250ms ease-in;
    }
  }
  .list-details-inner {
    padding: 2rem 1rem;
    font-size: 1rem;
    height: auto;
    color: $white * 0.9;
    span.list-label {
      font-size: 0.8rem;
    }
  }
  input[type = text] {
    line-height: 1.4rem;
    font-size: inherit;
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 2px solid $oceanBlue;
    &::selection {
      background-color: $deepBlue;
      color: $white;
    }
  }
  .user-list {
    @include outer-container();
    margin-top: 2rem;
    .user-name {
      @include span-columns(17 of 21);
      max-width: 172px;
    }
    .user-remove-button-container {
      @include span-columns(4 of 21);
    }
    .owner-heading,
    .user-heading {
      font-family: $raleway;
      font-size: 1.2rem;
      color: $white;
    }
    .owner-heading {
      margin-bottom: 0.3rem;
    }
    .user-heading {
      margin-top: 1rem;
    }
    .user-list-inner,
    .no-users {
      margin-top: 0.3rem;
    }
    .user-row {
      @include span-columns(21 of 21);
      padding-top: 0.1rem;
      padding-bottom: 0.1rem;
    }
    .user-pending {
      font-style: italic;
    }
    .no-users {
      font-style: italic;
      color: $white * 0.8;
    }
    .user-remove-button-container {
      text-align: center;
    }
    .user-remove-button {
      color: $white;
      background-color: $sunsetOrange;
      margin-left: 0.5rem;
      margin-left: 0.5rem;
      padding: 1px 2px 3px 1px;
      border-radius: 4px;
      width: 2rem;
      border: 1px solid #bdbdbd;
      &:hover {
        background: linear-gradient(($sunsetOrange * 0.9), $sunsetOrange);
      }
      &:active {
        background: $sunsetOrange * 0.9;
      }
    }
    .new-user {
      margin-top: 1rem;
      @include span-columns(21 of 21)
    }
    .new-user-input {
      border-bottom: 2px solid $oceanBlue;
      color: $white;
      &::placeholder {
        color: $white * 0.9;
      }
      @include span-columns(17 of 21);
    }
    .new-user-button-container {
      @include omega();
      @include span-columns(4 of 21);
      text-align: center;
    }
    .new-user-button {
      width: 2rem;
      padding: 0.2rem;
      color: $black;
      border-radius: 4px;
      background-color: $astroTurf;
      &:hover {
        background: linear-gradient(($astroTurf * 0.9), $astroTurf);
      }
      &:active {
        background: $astroTurf * 0.9;
      }
    }
  }
</style>

<script>
import gregorian from 'gregorian'
import { mapState, mapActions } from 'vuex'

const emailRE = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  data () {
    return {
      newUser: null
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.user.username,
      listDetailsToggled: (state) => state.listDetailsToggled
    }),
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
    ...mapActions([
      'addListUser',
      'removeListUser'
    ]),
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
    addNewListUser (index) {
      if (!this.isValid) return
      this.addListUser({ index, user: { username: this.newUser.trim(), status: 'pending' } })
      this.newUser = ''
    }
  }
}
</script>