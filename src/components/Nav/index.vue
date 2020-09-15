<template>
	<div class="footerNav">
		<ul class="footerItems" v-if="config ? config.some((e) => e === true) : !config">
			<li v-for="(item, index) in data || navList" :style="config[index] ? '' : { display: 'none' }" :class="path.indexOf(item.name) !== -1 ? 'active' : ''" @click="item.click(index)" :key="index">
				<van-icon class="footerIcon" :name="item.iconName" />
				<p class="footerText">{{ item.text }}</p>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		config: Array,
		data:Array,
	},
	data() {
		return {
			path: 'home',
			navList: [
				{
					that:this,
					name: 'home',
					iconName: 'wap-home',
					text: '会议室',
					click:function(index){
						this.that.checkNavBar(index)
					}
				},
				{
					that:this,
					name: 'replace',
					iconName: 'replay',
					text: '重复',
					click:function(index){
						this.that.checkNavBar(index)
					}
				},
				{
					that:this,
					name: 'detail',
					iconName: 'label-o',
					text: '简介',
					click:function(index){
						this.that.checkNavBar(index)
					}
				},
			],
		};
	},
	methods:{
		checkNavBar(index){
			this.navList.forEach((item,i) => {
				item.name = 'home' + i
			});
			this.navList[index].name = 'home'
		}
	},
	mounted() {
		this.path = this.$router.currentRoute.path;
	},
};
</script>

<style scoped lang="stylus">
.footerNav
	position fixed
	height 98px
	width 100%
	bottom 0
	font-size 26px
	padding-top 10px
	background-color #fff
	.footerItems
		height 100%
		display flex
		justify-content space-around
		.active
			color #1989fa
		.footerIcon
			font-size 40px
		.footerText
			margin 5px 0
</style>
