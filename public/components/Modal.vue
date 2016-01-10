<template>
	<div id="mask" v-if="!user.tasks.length && init" transition="mask"></div>
	<div id="key-modal" class="modal" v-if="!user.tasks.length && init" transition="modal">
		<div class="modal-header">
			<h1 id="headline">Taskmastr</h1>
		</div>
		<div id="key-ask" class="modal-body">
			<div class="greeting" v-if="!reset">
				<p>Do you have an account?</p>
				<p>If so, log in now, or create one below!</p>
			</div>
			<div class="reset-greeting" v-if="reset">
				<p>Go ahead and create your new password below</p>
			</div>
			<login-form></login-form>
			<create-form></create-form>
			<forgot-form></forgot-form>
			<reset-form></reset-form>
			<tips></tips>
		</div>
	</div>
</template>

<script>

import store from '../store/store';
import LoginForm from './LoginForm.vue';
import CreateForm from './CreateForm.vue';
import ForgotForm from './ForgotForm.vue';
import ResetForm from './ResetForm.vue';
import Tips from './Tips.vue';
import {getUrlVar} from '../store/prototypes';

getUrlVar();

export default {
	computed: {
		datepickerShown() {
			return store.state.datepickerShown;
		},
		user () {
			return store.state.user;
		},
		reset () {
			return store.state.reset;
		},
		init () {
			return store.state.init;
		}
	},
	components: {
		LoginForm,
		CreateForm,
		ForgotForm,
		ResetForm,
		Tips
	},
	methods: {
		setReset: store.actions.setReset,
		setResetToken: store.actions.setResetToken
	},
	ready () {
		if (window.location.search.substring(1)) this.setResetToken(window.location.search.substring(1).getUrlVar('token'));
		if (window.location.hash.indexOf('#reset') === 0) return this.setReset(true);
	}
};

</script>