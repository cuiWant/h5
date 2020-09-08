<template>
	<div id="wrapper" ref="wrapper">
		<Header ref="header" :title="'预约会议'"></Header>
		<div class="home">
			<div class="text-area">
				<van-field v-model="message" rows="1" autosize type="textarea" placeholder="会议标题" />
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
			<div class="userAndContacts">
				<div class="onlyUser">
					<van-icon class="onlyUserIcon" name="user-o" />
					<span class="onlyUserName">{{userName}}</span>
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
			<div class="footerNav">
				<ul class="footerItems">
					<li>
						<van-icon class="footerIcon" name="wap-home" />
						<p class="footerText">会议室</p>
					</li>
					<li>
						<van-icon class="footerIcon" name="replay" />
						<p class="footerText">重复</p>
					</li>
					<li>
						<van-icon class="footerIcon" name="label-o" />
						<p class="footerText">简介</p>
					</li>
				</ul>
			</div>
			<!-- <van-form @submit="onSubmit">
				<van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
				<van-field v-model="password" type="password" name="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
				<div style="margin: 16px;"></div>
			</van-form> -->
			<van-action-sheet v-model="show">
				<div class="content">
					<van-datetime-picker v-model="currentDate" @confirm="dateHandle" @cancel="dateHandle" type="datetime" :formatter="formatter" />
				</div>
			</van-action-sheet>
			<div class="test"></div>
		</div>
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
					week: '周八'
				}
			},
			userName:'林小园'
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
		touchAddContact(){
			this.$router.push({path:'/addContact'})
		},
		touchInfoRemind(){
			this.$router.push({path:'/infoRemind'})
		},
		//表单提交
		onSubmit(){
		},
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

#wrapper
	height 100%

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
	.footerNav
		position fixed
		width 100%
		bottom 0
		font-size 26px
		padding-top 10px
		background-color #fff
		.footerItems
			display flex
			justify-content space-around
			.footerIcon
				font-size 40px
			.footerText
				margin 5px 0
</style>
