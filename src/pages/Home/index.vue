<template>
	<div id="wrapper">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'预约会议'" rightText="完成"></Header>
		<div ref="wrapper" class="content-wrapper">
			<div class="home">
				<div class="text-area">
					<van-field v-model="message" rows="1" autosize type="textarea" placeholder="请输入留言" />
				</div>
				<div class="date-select" @click="dateShow" @touchstart.prevent="dateShow">
					<div class="time">
						<div class="time-top">{{ timeConfig.start.date }} {{ timeConfig.start.time }}</div>
						<div class="time-bottom">{{ timeConfig.start.week }}</div>
					</div>
					<div class="middle-line">/</div>
					<div class="time">
						<div class="time-top">{{ timeConfig.start.date }} {{ timeConfig.start.time }}</div>
						<div class="time-bottom">{{ timeConfig.start.week }}</div>
					</div>
				</div>

				<div class="test"></div>
			</div>
		</div>
		<van-action-sheet v-model="show">
			<div class="content">
				<van-datetime-picker v-model="currentDate" @confirm="dateHandle" @cancel="dateHandle" type="datetime" :formatter="formatter" />
			</div>
		</van-action-sheet>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
	data() {
		return {
			message: '',
			show: false,
			currentDate: new Date(),
			timeConfig: {
				start: {
					time: '10:10',
					date: '2月31号',
					week: '周八',
				},
				end: {
					time: '10:10',
					date: '2月31号',
					week: '周八',
				},
			},
		};
	},
	mounted() {
		const { wrapper } = this.$refs;
		new BScroll(wrapper);
	},

	methods: {
		dateShow() {
			this.show = true;
		},
		dateHandle(value) {
			if (value) {
				// console.log(,'xx')
				this.currentDate = value;
				console.log(Date.parse(this.currentDate));
			}
			this.show = false;
			// console.log(value);
		},
		formatter(type, val) {
			if (type === 'year') {
				return `${val}年`;
			} else if (type === 'month') {
				return `${val}月`;
			} else if (type === 'day') {
				return `${val}日`;
			} else if (type === 'hour') {
				return `${val}时`;
			} else if (type === 'minute') {
				return `${val}分`;
			}

			return val;
		},
		headerRight() {
			//发请求
		},
		headerLeft() {
			// console.log(this, 'this');
			//
			this.$router.push('/');
		},
	},
};
</script>

<style lang="stylus">
  @import "../../common/stylus/mixins.styl";

#wrapper
	height 100%

	.content-wrapper
		height calc(100% - 88px - 98px)
		overflow: hidden
	.test
		height 10000px
		background pink
	.home
		font-family PingFangSC-Medium
		background #f7f7f7
		min-height 100%
		.text-area
			font-size: 28px
			bottom-border-1px(#eee)
			.van-cell
				/* height 188px */
				padding 38px 32px
				.van-field__body
					textarea
						height 188px !important
				.van-field__control
					font-size: 38px
					line-height: initial

		.date-select
			height 154px
			cursor: pointer
			display: flex;
			justify-content space-around
			align-items center
			background: #fff
			marigin-bottom 22px
			.middle-line
				color  #e8e8e8
				transform: scale(3)
			.time
				/* width 359px */
				font-size 36px
				display: flex
				flex-direction column
				align-items: flex-start
				padding-left 30px
				.time-top
					font-weight 700
	.content
			.van-picker__toolbar
				height 90px
				bottom-border-1px(#eaeaea)
			.van-picker__cancel
				font-size 36px
			.van-picker__title
				font-size 36px
				line-height 36px
			.van-picker__confirm
				font-size 36px
			.van-picker-column__wrapper
				>li
					font-size 36px !important
</style>
