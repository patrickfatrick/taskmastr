<template>
	<form id="list-line" class="prompt-line" name="listForm" novalidate v-on:submit.prevent="addList(newList.trim())">
		<input id="create-list" class="prompt" type="text" name="todoInput" v-model="newList" v-bind:class="{'invalid': !isValid && ListAttempt}" placeholder="New List"></input>
		<button id="list-button" class="fa fa-arrow-down submit" type="submit"></button>
	</form>
</template>

<script>

import hat from 'hat';
import store from '../../store/store';

export default {
	data () {
		return {
			newList: '',
			listAttempt: false
		};
	},
	computed: {
		user () {
			return store.state.user;
		},
		validate () {
			return {
				newListRequired: !!this.newList.trim()
			};
		},
		isValid () {
			var validation = this.validate;
			return Object.keys(validation).every(function (key) {
				return validation[key];
			});
		}
	},
	methods: {
		addList (list) {
			store.actions.addList({
				list: list,
				items: [],
				current: true,
				delete: false,
				id: hat()
			});
			this.newList = '';
			return store.actions.setSaveButton(true);
		}
	}
};

</script>