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

import store from '../store/store';
import MenuToggle from './content-components/MenuToggle.vue';
import TaskInput from './content-components/TaskInput.vue';
import Items from './content-components/Items.vue';
import Save from './content-components/Save.vue';

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