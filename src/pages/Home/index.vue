<template>
	<div class="container">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'预约会议'" rightText="完成"></Header>
		<div ref="wrapper" id="wrapper">
			<div class="content-wrapper">
				<div class="home space-bottom">
					<div class="text-area">
						<van-field v-model="theme" rows="1" autosize type="textarea" placeholder="会议主题" />
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
						<div class="addContacts border-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_organizer  "></span>
						<div class="addContactsRight">
							<span class="addContactFont">林小园

								<van-tag class='tag' type="primary">组织人</van-tag>
							</span>
							<van-icon class="addContactsIcon" @click="touchAddContact" @touchstart.prevent="touchAddContact" name="arrow" />
						</div>
					</div>
					<div class="addContacts space-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_person  "></span>
						<div class="addContactsRight">
							<span class="addContactFont">添加参会人</span>
							<van-icon class="addContactsIcon" @click="touchAddContact" @touchstart.prevent="touchAddContact" name="arrow" />
						</div>
					</div>
					<div class="addContacts border-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_room  "></span>
						<div class="addContactsRight">
							<span class="addContactFont">会议室</span>
							<div>
							 <van-icon  v-if="false" class="addContactsIcon" name="arrow" @click="touchAddContact" @touchstart.prevent="touchAddContact" /><van-icon  v-else class="addContactsIcon" name="cross" />
							</div> 
							 
						</div>
					</div>
					<div class="addContacts space-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_type  "></span>
						<div class="addContactsRight">
							<span class="addContactFont">会议模式</span>
							<van-icon class="addContactsIcon" @click="touchAddContact" @touchstart.prevent="touchAddContact" name="arrow" />
						</div>
					</div>
					<div class="addContacts space-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-refresh  "></span>
						<div class="addContactsRight">
							<span class="addContactFont">每天重复</span>
							<div>
							 <van-icon  v-if="false" class="addContactsIcon" name="arrow" @click="touchAddContact" @touchstart.prevent="touchAddContact" /><van-icon  v-else class="addContactsIcon" name="cross" />
							</div> 
							 
						</div>
					</div>

				<div class="addContacts space-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_remind  "></span>
						<div class="addContactsRight">
							<span class="addContactFont">{{remindersText}}</span>
							<div>
							 <van-icon  v-if="false" class="addContactsIcon" @click="touchInfoRemind" @touchstart.prevent="touchInfoRemind" name="arrow" /><van-icon  v-else class="addContactsIcon" name="cross" />
							</div> 
							 
						</div>
					</div>
				<div class="addContacts space-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_description  "></span>
						<div class="addContactsRight">
							<span class="addContactFont">{{detail}}</span>
							<div>
							 <van-icon  v-if="false" class="addContactsIcon" @click="touchAddContact" @touchstart.prevent="touchAddContact" name="arrow" /><van-icon  v-else class="addContactsIcon" name="cross" />
							</div> 
							 
						</div>
					</div>
				</div>


				<!-- <div class="test">
					<img class="test" src="../../assets/logo.png" alt="" />
				</div> -->
			</div>
		</div>
		<Nav v-if="(navData.some(e=>e.status))" :config="navData" :click="handleNavClick"></Nav>
		<van-popup :overlay="false" v-model="footerRouterShow" position="right" :style="{ width: '100%',height:'100%' }" >
			<router-view :handleSubmit="handleChidlren" :leftClick="routerLeftClick" ></router-view>
		</van-popup>
		<van-action-sheet v-model="show">
			
			<div class="content">
				<van-datetime-picker v-model="currentDate" @confirm="dateHandle" @cancel="dateHandle" type="datetime" :formatter="formatter" />
			</div>
		</van-action-sheet>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
const showRouter = ['detail','replace','room']
let { pathname }   =window.location
let bool  = !!showRouter.find((e)=>{
	return pathname.indexOf(e) !== -1
})
export default {
	data() {
		return {
			theme: '',
			show:false,
			footerRouterShow:bool,
			remindersText:'123',
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
			allData:{
				
			},
			navData:[{
				status:true,
				name:'room'
			}
			,{
				status:true,
				name:'replace'
			},{
				status:true,
				name:'detail'

			}],
			detail:'',

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
	activated(){
		let { query} =this.$route;
		let oldData = this.allData;
		let { key,text } = query;
		this.allData={
			...oldData,
			...query
		}
		this[key] = text;

		
		
	},
	methods: {
		// handle nav 子路由处理
		handleChidlren(data){
			let oldData = this.allData;
			let { key,text } = data
			this.allData={
				...oldData,
				...data
			}
			this[key] = text;
				//处理底部导航
			let navItem = this.navData.find((e)=>{
				return e.name === key
			})
			if(navItem){
				navItem.status = false;
				this.navData =[...this.navData]
			}
		},
		
		touchAddContact() {
			this.$router.push({ path: '/addContact' });
		},
		touchInfoRemind() {
			this.$router.push({ path: '/infoRemind' });
		},
		//表单提交
		onSubmit() {},
		headerLeft() {
			this.$router.push('/entry')
		},
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
		handleNavClick(){
			this.footerRouterShow=true;
		},
		routerLeftClick(){
			this.footerRouterShow=false;
		}
		
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
		background #f7f7f7
	.test
		img
			height 300px;
			width 300px


		/* height 10000px */
		/* background pink */
	.space-bottom
		margin-bottom 20px
	.border-bottom
		bottom-border-1px(#f7f7f7)
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
			padding 0 25px
			line-height 110px
			background-color #fff
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
					position relative

				.tag	
					position absolute
					width: 81px;
					height: 31px;
					background-color: rgba(24, 144, 255, 0.2);
					border-radius: 4px;
					font-size: 22px;
					line-height: 22px;
					letter-spacing: 0px;
					color: #1890ff;
					text-align center
					top 41px
					left 119px
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


<style lang="stylus">


</style>