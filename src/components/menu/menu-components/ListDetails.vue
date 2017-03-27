<template>
  <div
    class="list-details"
    :class="{ 'list-details--toggled': listDetailsToggled === list._id }"
  >
    <div class="list-details__inner">
      <div class="list-details__inner__created">
        <span class="list-details__inner__label">Created on</span>
        {{ reformatDate(list.dateCreated) }}
      </div>
      <div class="list-details__inner__modified">
        <span class="list-details__inner__label">Last modified</span>
        {{ reformatDate(list.dateModified) }}
      </div>
      <div class="list-details__inner__user-list">
        <div class="user-list__owner">
          <div class="user-list__owner__heading">Owner</div>
          {{ (list.owner.trim() === username) ? 'You' : truncateUsername(list.owner, 25) }}
        </div>
        <div class="user-list__user__heading">
          Collaborators
        </div>
        <div class="user-list__inner">
          <div 
            class="user-list__row"
            v-for="user in list.users"
            v-if="list.users.length"
          >
            <div
              class="user-list__row__user-name"
              :class="{ 'user-list__row__user-name--pending': user.status === 'pending' }"
            >
              {{ (user.username.trim() === username) ? 'You' : truncateUsername(user.username, 20) }}
              <span
                class="list-details__inner__label list-details__inner__label--user-pending"
                v-if="user.status === 'pending'"
              >
                (pending)
              </span>
            </div>
            <div class="user-list__row__user-remove-button-container">
              <button 
                class="user-list__row__user-remove-button-container__button"
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
            class="user-list__row__no-users"
            v-if="!list.users.length"
          >
            It's just you in here!
          </div>
          <div
            class="user-list__row__new-user"
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
                class="user-list__row__new-user__input"
                :value="newUser"
                @input="changeNewUser($event.target.value)"
              >
              <div class="user-list__row__new-user__button-container">
                <button
                  type="submit"
                  title="Invite"
                  class="user-list__row__new-user__button-container__button">
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

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.list-details {
  max-height: 0;
  overflow: hidden;
  background-color: color(var(--orchid) shade(10%));
  transition: max-height 150ms ease-out;

  &.list-details--toggled {
    max-height: 1000px;
    transition: max-height 250ms ease-in;
  }
}

.list-details__inner {
  lost-utility: clearfix;
  padding: 2rem 1rem;
  font-size: 1rem;
  height: auto;
  color: color(var(--white) shade(10%));

  & .list-details__inner__label {
    font-size: 0.8rem;
  }
}

.list-details__inner__user-list {
  lost-utility: clearfix;
  margin-top: 2rem;

  & .user-list__row__user-name {
    lost-column: 17/21;
    max-width: 172px;
  }

  & .user-list__row__user-remove-button-container {
    lost-column: 4/21;
  }

  & .user-list__owner__heading,
  & .user-list__user__heading {
    font-family: var(--raleway);
    font-size: 1.2rem;
    color: var(--white);
  }

  & .user-list__owner__heading {
    margin-bottom: 0.3rem;
  }

  & .user-list__user__heading {
    margin-top: 1rem;
  }

  & .user-list__inner,
  & .user-list__row__no-users {
    margin-top: 0.3rem;
  }

  & .user-list__row {
    lost-column: 21/21;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
  }

  & .list-details__inner__label--user-pending {
    font-style: italic;
  }

  & .user-list__row__no-users {
    font-style: italic;
    color: color(var(--white) shade(20%));
  }

  & .user-list__row__user-remove-button-container {
    text-align: center;
  }

  & .user-list__row__user-remove-button-container__button {
    color: var(--white);
    background-color: var(--sunsetOrange);
    margin-left: 0.5rem;
    padding: 1px 2px 3px 1px;
    border-radius: 4px;
    width: 2rem;
    border: 1px solid #bdbdbd;

    &:hover {
      background: linear-gradient(color(var(--sunsetOrange) shade(10%)), var(--sunsetOrange));
    }

    &:active {
      background: color(var(--sunsetOrange) shade(10%));
    }
  }

  & .user-list__row__new-user {
    margin-top: 1rem;
    lost-column: 21/21;
  }

  & .user-list__row__new-user__input {
    @apply --listDetailsInput;

    lost-column: 17/21;
    border-bottom: 2px solid var(--oceanBlue);
    color: var(--white);

    &::placeholder {
      color: color(var(--dimGray) lightness(80%));
    }
  }

  & .user-list__row__new-user__button-container {
    lost-column: 4/21;
    text-align: center;
  }

  & .user-list__row__new-user__button-container__button {
    width: 2rem;
    padding: 0.2rem;
    color: var(--black);
    border-radius: 4px;
    background-color: var(--astroTurf);

    &:hover {
      background: linear-gradient(color(var(--astroTurf) shade(10%)), var(--astroTurf));
    }

    &:active {
      background: color(var(--astroTurf) shade(10%));
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