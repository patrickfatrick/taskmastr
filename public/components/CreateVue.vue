<template>
	<div>
		<div id="mask" v-if="!auth && init" transition="mask"></div>
		<div id="key-modal" class="modal" v-if="!user.tasks.length && init" transition="modal">
			<div class="modal-header">
				<h1 id="headline">Taskmastr</h1>
			</div>
			<div id="key-ask" class="modal-body">
				<div class="greeting" v-if="!reset">
					<p>Do you have an account?</p>
					<p>If so, log in now, or create one below!</p>
				</div>
				<create-form></create-form>
				<forgot-form></forgot-form>
				<tips></tips>
			</div>
		</div>
	</div>
</template>

<script>

import store from '../store/store';
import CreateForm from './forms/CreateForm.vue';
import ForgotForm from './forms/ForgotForm.vue';
import Tips from './forms/form-components/Tips.vue';

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
		},
		auth () {
			return store.state.auth;
		}
	},
	components: {
		CreateForm,
		ForgotForm,
		Tips
	}
};

</script>