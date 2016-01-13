<template>
	<div id="content">
		<div class="container">
		<div id="todo-prompt">What needs doing?</div>
		<menu-toggle></menu-toggle>
		<task-input></task-input>
		<items></items>
		<i id="loading" class="fa fa-cog fa-spin" v-if="user.key || !user.tasks"></i>
		</div>
		<save></save>
	</div>
</template>

<script>

import store from '../../store/store';
import MenuToggle from '../misc/MenuToggle.vue';
import TaskInput from './task-components/TaskInput.vue';
import Items from './task-components/Items.vue';
import Save from '../misc/Save.vue';

export default {
	computed: {
		user () {
			return store.state.user;
		}
	},
	components: {
		MenuToggle,
		TaskInput,
		Items,
		Save
	}
};

</script>