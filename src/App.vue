<template>
	<div id="app">
		<Header ref="header" :title="'预约会议'"></Header>
		<router-view></router-view>
		<!-- <Form ref= "header"> </Form>	 -->
	</div>
</template>

<script>
import Header from '@/components/Header';
import Form from '@/components/Form';

export default {
	name: 'App',
	components: {
		Header,
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
