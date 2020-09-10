<template>
	<div class=""></div>
</template>

<script>
import { Toast } from 'vant';
export default {
	data() {
		return {
			show: false,
		};
	},
	mounted() {},

	methods: {
		test() {
			this.show = !this.show;
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
