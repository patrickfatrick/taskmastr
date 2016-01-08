<template>
	<form id="todo-line" class="prompt-line" name="todoForm" novalidate v-on:submit.prevent="addTask(newTask.trim())">
		<input id="create-todo" class="prompt random-placeholder" type="text" name="todoInput" v-model="newTask" v-bind:class="{'invalid': !isValid && taskAttempt}" v-el:taskinput></input>
		<button class="fa fa-arrow-down submit" type="submit"></button>
	</form>
</template>

<script>

import store from '../../store/store';
import _ from 'lodash';
import hat from 'hat';
import Mousetrap from 'mousetrap';

export default {
	data () {
		return {
			newTask: '',
			taskAttempt: false
		};
	},
	computed: {
		user () {
			return store.state.user;
		},
		validate () {
			return {
				newTaskRequired: !!this.newTask.trim()
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
		addTask (task) {
			if (!this.newTask) return;
			store.actions.addTask({
				item: task,
				complete: false,
				current: !(_.find(this.user.current.items, _.matchesProperty('current', true))),
				dueDate: undefined,
				delete: false,
				id: hat()
			});
			this.newTask = '';
			return store.actions.setSaveButton(true);
		}
	},
	ready () {
		Mousetrap.bind('ctrl+f', () => {
			this.$els.taskinput.focus();
		});
	}
};

</script>