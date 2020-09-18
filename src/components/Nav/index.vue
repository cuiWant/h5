<template>
	<div class="footerNav">
		<ul class="footerItems" v-if="config ? config.some((e) => e.status === true) : !config">
			<li v-for="(item, index) in data || navList" :style="config[index] && config[index].status ? '' : { display: 'none' }" :class="path.indexOf(item.name) !== -1 ? 'active' : ''" @click.prevent.stop="item.click(item)" @touchstart.prevent.stop="item.click(item)" :key="index">
				<van-icon v-if="!item.custom"  class="footerIcon" :name="item.iconName" />
					<div v-else-if="item.custom" class="footerIcon" >
						<span :class="`iconfont ${item.iconName}`"></span>
					</div>
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
		click:Function
	},
	data() {
		return {
			path: 'room',
			navList: [
				{
					that:this,
					name: 'room',
					custom:true,
					iconName:"ticobackicon-meeting_room",
					text: '会议室',
					click:this.iconClick
				},
				{
					that:this,
					custom:true,
					name: 'replace',
					iconName: 'ticobackicon-refresh',
					text: '重复',
					click:this.iconClick
				},
				{
					that:this,
					custom:true,
					name: 'detail',
					iconName: 'ticobackicon-meeting_description',
					text: '简介',
					click:this.iconClick
				},
			],
		};
	},
	methods:{
		checkNavBar(item){
			// this.navList.forEach((item,i) => {
			// 	item.name = 'home' + i
			// });
			this.path =item.name;
			// this.navList[index].name = 'homeW'
		},
		iconClick(item){
			this.checkNavBar(item);
			this.$router.push(`/home/${item.name}`);
			this.click()
		}
	},
	mounted() {
		// this.path = this.$router.currentRoute.path;
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
		li
			display flex
			flex-direction column
		.active
			color #1989fa
		.footerIcon
			display flex
			justify-content center
			font-size 40px
		.iconfont 
			font-size 40px
		.footerText
			margin 5px 0
</style>
