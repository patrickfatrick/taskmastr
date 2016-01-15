<template>
	<div>
		<div id="mask" v-if="!auth && init" transition="mask"></div>
		<div id="key-modal" class="modal" v-if="!user.tasks.length && init" transition="modal">
			<div class="modal-header">
				<h1 id="headline">Taskmastr</h1>
			</div>
			<div id="key-ask" class="modal-body">
				<div class="greeting">
					<p>Forgot your password?</p>
					<p>Fill in your email address and we'll send you a reset link.</p>
				</div>
				<forgot-form></forgot-form>
				<tips></tips>
			</div>
		</div>
	</div>
</template>

<script>

import store from '../store/store';
import ForgotForm from './forms/ForgotForm.vue';
import Tips from './forms/form-components/Tips.vue';

export default {
	computed: {
		user () {
			return store.state.user;
		},
		reset () {
			return store.state.reset;
		},
		init () {
			return store.state.init;
		},
		auth () {
			return store.state.auth;
		},
		forgot () {
			return store.state.forgot;
		}
	},
	components: {
		ForgotForm,
		Tips
	},
	methods: {
		toggleCheckbox: store.actions.toggleCheckbox
	},
	ready () {
		if (this.$route.path === '/forgot' && !this.forgot) return this.toggleCheckbox('forgot');
	}
};

</script>