<template>
	<div id="logout-container">
		<div id="logout" v-on:click="logout">
			<i id="power-off" class="fa fa-power-off"></i>
			<label for="power-off">Log out</label>
		</div>
	</div>
</template>

<script>

import store from '../../store/store';

export default {
	methods: {
		logout: store.actions.logout
	}
}
;	
</script>