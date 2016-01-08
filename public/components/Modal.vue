<template>
	<div id="mask" v-if="!user.tasks.length" transition="mask"></div>
	<div id="key-modal" class="modal" v-if="!user.tasks.length" transition="modal">
		<div class="modal-header">
			<h1 id="headline">Taskmastr</h1>
		</div>
		<div id="key-ask" class="modal-body">
			<div class="greeting">
				<p>Do you have an account?</p>
				<p>If so, log in now, or create one below!</p>
			</div>
			<login-form></login-form>
			<create-form></create-form>
			<forgot-form></forgot-form>
			<tips></tips>
		</div>
	</div>
</template>

<script>

import store from '../store/store';
import LoginForm from './LoginForm.vue';
import CreateForm from './CreateForm.vue';
import ForgotForm from './ForgotForm.vue';
import Tips from './Tips.vue';

export default {
	computed: {
		user () {
			return store.state.user;
		}
	},
	components: {
		LoginForm,
		CreateForm,
		ForgotForm,
		Tips
	}
};

</script>