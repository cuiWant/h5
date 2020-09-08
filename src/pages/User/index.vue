<template>
	<div class="">
		user
		<button @touchstart.prevent="test">123</button>
	</div>
</template>

<script>
import { Toast } from 'vant';
export default {
	data() {
		return {};
	},
	mounted() {},

	methods: {
		test() {
			// this.$loading.show();
			// // this.$loading.show();
			// setTimeout(() => {
			// 	this.$loading.close(true);
			// }, 2000);
		},
	},
};
</script>

<style scoped lang="stylus"></style>
