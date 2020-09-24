<template>
	<div id="app">
		<keep-alive include="Home" >  
			<router-view></router-view>
		</keep-alive >  
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
		// console.log(this.$refs.header, 'sss');
	},
};
</script>

<style lang="stylus">
#app {
	/* font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale; */
	/* text-align: center; */
	color:#333333;
	height: 100%;
}


</style>
<style lang="stylus">
body .van-toast
	width: 200px;
	height: 200px;
	.van-loading__spinner
		width 50px
		height 50px
	.van-toast__text
		font-size 25px
.van-popup
	height 60px
	font-size 28px 
.van-notify 
		font-size 28px !important

</style>