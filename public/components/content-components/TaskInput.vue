<template>
	<form id="todo-line" class="prompt-line" name="todoForm" novalidate v-on:submit.prevent="addTask(newTask.trim())">
		<input id="create-todo" class="prompt random-placeholder" type="text" name="todoInput" v-model="newTask" v-bind:class="{'invalid': !isValid && taskAttempt}" placeholder="{{placeholder}}" v-el:taskinput></input>
		<button class="fa fa-arrow-down submit" type="submit"></button>
	</form>
</template>

<script>

import _ from 'lodash';
import hat from 'hat';
import Mousetrap from 'mousetrap';
import gregorian from 'gregorian';
import date from 'date.js';
import store from '../../store/store';

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
		placeholder () {
			return store.state.placeholder;
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
			let dueDate;
			if (task.indexOf('Remind me to ') === 0 || task.indexOf('remind me to ') === 0 || task.indexOf('/') === 0) {
				const char = (task.indexOf('Remind me to ') !== -1 || task.indexOf('remind me to ') !== -1) ? 13 : 3;
				const shortcut = (task.substring(0, char - 1));
				task = task.substring(char, task.length);
				switch (shortcut) {
					case '/t':
						dueDate = gregorian.reform(date('tomorrow')).to('yyyy-mm-dd HH:tt:ss');
						task = task.extractDate().item;
						break;
					case '/w':
						dueDate = gregorian.reform(date('next Monday')).to('yyyy-mm-dd HH:tt:ss');
						task = task.extractDate().item;
						break;
					case '/m':
						dueDate = gregorian.reform().restart('m').add(1, 'm').to('yyyy-mm-dd HH:tt:ss');
						task = task.extractDate().item;
						break;
					case '/y':
						dueDate = gregorian.reform().restart('y').add(1, 'y').to('yyyy-mm-dd HH:tt:ss');
						task = task.extractDate().item;
						break;
					default:
						dueDate = task.extractDate().dueDate;
						task = task.extractDate().item;
						break;
				}
			} else {
				dueDate = '';
			}
			store.actions.addTask({
				item: task,
				complete: false,
				current: !(_.find(this.user.current.items, _.matchesProperty('current', true))),
				dueDate: dueDate,
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