<template>
	<header class="header">
		<van-nav-bar :title="title" @click-left=" onClickLeft" @click-right="rightClick" left-arrow :right-text="rightText">
			<!-- <template #right> </template> -->
		</van-nav-bar>
		<!-- <slot name="left"></slot>
		<span class="header_title">
			<span class="header_title_text ellipsis">{{ title }}</span>
		</span>
		<slot name="right"></slot> -->
	</header>
</template>

<script>
export default {
	name: 'Header',
	// 声明接收属性
	props: {
		title: String,
		leftClick: Function,
		rightClick: Function | undefined,
		rightText: String,
	},
	data() {
		return {
			rightContent: '完成',
		};
	},
	methods: {
		onClickLeft() {
			if(this.leftClick){
				this.leftClick()
			}else{

				this.$router.go(-1);
			}
		},
	},
};
</script>

<style lang="stylus">

.header
	/* position: fixed */
	.van-nav-bar
			font-size 38px
			height 88px
			.van-nav-bar__left
				.van-nav-bar__arrow
					font-size 38px
			.van-nav-bar__title
				color: #333333
				font-family PingFangSC-Medium
				font-size 38px
			.van-nav-bar__right
				font-size: 28px
</style>
