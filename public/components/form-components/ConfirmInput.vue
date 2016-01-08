<template>
	<div class="error-text">
		<label for="confirm" v-show="loginAttempt && !user.confirm && !confirmAttempt">No user found. Please confirm your password.</label>
		<label for="confirm" v-show="confirmAttempt && !user.confirm">Password confirmation required.</label>
		<label for="confirm" v-show="!match && loginAttempt && user.confirm">Passwords don't match.</label>
	</div>
	<div id="confirm-line" class="prompt-line">
		<input id="confirm" class="prompt" type="password" name="password" placeholder="Password" v-model="user.confirm" v-bind:class="{'invalid': confirmAttempt && !match}"></input>
		<button id="confirm-button" class="fa fa-arrow-right submit" type="submit" v-on:click="setConfirmAttempt(true)"></button>
	</div>
</template>

<script>

import store from '../../store/store';

export default {
	computed: {
		user () {
			return store.state.user;
		},
		loginAttempt () {
			return store.state.loginAttempt;
		},
		confirmAttempt () {
			return store.state.confirmAttempt;
		}
	},
	props: {
		match: Boolean
	},
	methods: {
		setConfirmAttempt: store.actions.setConfirmAttempt
	}
};

</script>