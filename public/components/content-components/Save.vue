<template>
	<div id="save-button" class="button" v-if="saveButton" transition="save" v-on:click="save">Save</div>
</template>

<script>

import store from '../../store/store';

export default {
	computed: {
		saveButton () {
			return store.state.saveButton;
		}
	},
	methods: {
		save: store.actions.save
	}
};
	
</script>