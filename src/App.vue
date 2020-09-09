<template>
	<div id="app">
		<router-view></router-view>
		<!-- <Form ref= "header"> </Form>	 -->
	</div>
</template>

<script>
import Form from '@/components/Form';
export default {
	name: 'App',
	components: {
		Form,
	},
	mounted() {
		//测试账号注销  注销状态
		console.log(this.$refs.header, 'sss');
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
}
</style>
