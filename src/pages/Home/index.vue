<template>
	<div class="container">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'预约会议'" rightText="完成"></Header>
		<div ref="wrapper" id="wrapper">
			<div class="content-wrapper">
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
				</div>
				<div class="userAndContacts">
					<div class="onlyUser">
						<van-icon class="onlyUserIcon" name="user-o" />
						<span class="onlyUserName">{{ userName }}</span>
						<span class="onlyUserPerson">组织人</span>
					</div>
					<span class="publicLine"></span>
					<div class="addContacts" @click="touchAddContact" @touchstart.prevent="touchAddContact">
						<van-icon class="addContactsLeft" name="friends-o" />
						<div class="addContactsRight">
							<span class="addContactFont">添加参会人</span>
							<van-icon class="addContactsIcon" name="arrow" />
						</div>
					</div>
				</div>
				<div class="addWarnings" @click="touchInfoRemind" @touchstart.prevent="touchInfoRemind">
					<van-icon class="addWarningsLeft" name="bulb-o" />
					<div class="addWarningsRight">
						<span class="addWarningsFont">15分钟前，站内信提醒</span>
						<van-icon class="addWarningsIcon" name="arrow" />
					</div>
				</div>

				<van-action-sheet v-model="show">
					<div class="content">
						<van-datetime-picker v-model="currentDate" @confirm="dateHandle" @cancel="dateHandle" type="datetime" :formatter="formatter" />
					</div>
				</van-action-sheet>
				<div class="test"></div>
			</div>
		</div>
		<Nav :config="[true, true, true]"></Nav>
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
			userName: '林小园',
		};
	},
	mounted() {
		const { wrapper } = this.$refs;
		new BScroll(wrapper);
		// let timer = setInterval(() => {
		// 	console.log(1);
		// }, 1000);
		// this.$on('hook:beforeDestory', function() {
		// 	clearInterval(timer);
		// });
	},

	methods: {
		touchAddContact() {
			this.$router.push({ path: '/addContact' });
		},
		touchInfoRemind() {
			this.$router.push({ path: '/infoRemind' });
		},
		//表单提交
		onSubmit() {},
		headerLeft() {},
		headerRight() {},
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
	},
};
</script>

<style lang="stylus">
  @import "../../common/stylus/mixins.styl";
.container
	height 100%
	#wrapper
		height calc(100% - 88px - 98px);
		overflow: hidden;

	.test
		height 10000px
		background pink
.home
	font-family PingFangSC-Medium
	background #f7f7f7
	min-height 100%
	position relative
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
			font-size 34px
			display: flex
			flex-direction column
			align-items: flex-start
			.time-top
				font-weight 700
	.content
		.van-picker__toolbar
			height 90px
			bottom-border-1px(#eaeaea)
		.van-picker__cancel
			font-size 34px
		.van-picker__title
			font-size 34px
			line-height 34px
		.van-picker__confirm
			font-size 34px
		.van-picker-column__wrapper
			>li
				font-size 34px !important
.userAndContacts
		width 100%
		margin-top 22px
		padding 0 25px
		background-color #fff
		text-align left
		.onlyUser
			line-height 110px
			height 110px
			.onlyUserIcon
				font-size 34px
			.onlyUserName
				display: inline-block
				padding: 0 30px
				font-size 34px
			.onlyUserPerson
				background-color #D1E9FF
				color #389EFF
    		display: inline-block
				height: 20px
				line-height: 19px
				padding: 1px 6px
		.publicLine
			display inline-block
			width 100%
			margin-left 33px
			height 2px
			background-color #E7E7E7
		.addContacts
			line-height 110px
			height 110px
			display flex
			align-items: center
			.addContactsLeft
				font-size 34px
				line-height 55px
			.addContactsRight
				width: 100%
				font-size 34px
				display: flex
				align-items: center
				justify-content: space-between
				padding 0 0 0 15px
				.addContactFont
					color #B8B8B8
	.addWarnings
		line-height 110px
		height 110px
		padding 0 30px
		display flex
		align-items center
		margin-top 22px
		background-color #fff
		.addWarningsLeft
			font-size 34px
			line-height 55px
		.addWarningsRight
			width 100%
			font-size 34px
			display flex
			align-items center
			justify-content space-between
			padding 0 0 0 15px
</style>
