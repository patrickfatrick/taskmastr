<template>
	<span>
		<input class="datepicker-input" type="text" name="datepicker" :value="task.dueDate" v-bind:disabled="task.complete" readonly="true" v-el:pikaday></input>
		<i class="fa datepicker-toggle" v-bind:class="{'active': task.dueDate, 'fa-calendar-check-o': task.dueDate, 'fa-calendar-plus-o': !task.dueDate}" v-el:pikatrigger v-on:dblclick="setTaskDueDate(index, undefined)"></i>
	</span>
</template>

<script>

import Mousetrap from 'mousetrap';
import Pikaday from 'pikaday';
import gregorian from 'gregorian';
import store from '../../store/store';

export default {
	data () {
		return {
			picker: null
		};
	},
	computed: {
		tasks () {
			return store.state.user.current.items;
		}
	},
	props: [
		'value',
		'task',
		'index'
	],
	methods: {
		setTaskDueDate (index, date) {
			store.actions.setTaskDueDate(index, date);
			if (!this.tasks[index].dueDate) return this.picker.setDate('');
			return;
		}
	},
	ready() {
		this.picker = new Pikaday({
			field: this.$els.pikaday,
			trigger: this.$els.pikatrigger,
			yearRange: 1,
			onSelect: function () {
				return this.setTaskDueDate(this.index, gregorian.reform(this.picker._d).to('yyyy-mm-dd HH:tt:ss'));
			}.bind(this)
		});
		Mousetrap.bind('ctrl+d', () => {
			return this.$els.pikatrigger.click();
		});
	}
};

</script>