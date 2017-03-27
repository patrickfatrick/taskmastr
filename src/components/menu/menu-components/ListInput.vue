<template>
  <form
    class="prompt-line prompt-line--list-line"
    name="listForm"
    novalidate
    v-on:submit.prevent="addNewList(newList.trim())"
  >
    <input
      class="prompt-line__prompt mousetrap"
      type="text"
      title="List Input"
      :value="newList"
      v-on:change="setNewList($event.target.value)"
      :class="{'prompt-line__prompt--invalid': !isValid && listAttempt}"
      placeholder="New List" ref="listinput"
    />
    <button
      class="prompt-line__submit"
      title="Create task"
      type="submit"
    >
      <i class="fa fa-arrow-down" />
    </button>
  </form>
</template>

<style lang="postcss" scoped>
@import "../../../stylesheets/variables";

.prompt-line--list-line {
  @apply --promptLine;

  margin-bottom: 1.5rem;
  lost-column: 12/14;
  lost-offset: 1/14;
  lost-utility: clearfix;

  & .prompt-line__prompt {
    width: 80%;
    line-height: 2rem;
    font-size: 1.4rem;
    border-color: color(var(--dimGray) lightness(80%));

    &::placeholder {
      color: color(var(--dimGray) lightness(80%));
    }

    &:focus {
      border-color: var(--deepBlue);
    }
  }

  & .prompt-line__submit {
    @apply --buttonEffectDeepBlue;

    font-size: 1.8rem;
    width: 2.4rem;
    position: relative;
    margin-left: 0.5rem;
    cursor: pointer;
    color: var(--white);
    background: var(--deepBlue);
    border-radius: 50%;
    padding: 1px 3px 3px 4px;
  }
}
</style>

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
        currentItem: '',
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