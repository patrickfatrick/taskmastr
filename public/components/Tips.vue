<template>
	<div id="tips-button" class="button" v-on:click="toggleTips">Tips:</div>
	<ul class="fine-print" v-show="toggled" transition="fine-print">
		<li>&rarr; The tips have been replaced with a wiki!</li>
		<li>&rarr; Click the map <a href="https://bitbucket.org/patrickfatrick/taskmastr/wiki/Home" target="_blank"><i class="fa fa-map-o"></i></a> to view it</li>
		<li>&rarr; You can also access the wiki any time from the lists menu inside the app</li>
	</ul>
</template>

<script>

export default {
	data () {
		return {
			toggled: false
		};
	},
	methods: {
		toggleTips () {
			return this.toggled = !this.toggled;
		}
	}
};

</script>