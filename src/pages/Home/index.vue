<template>
	<div class="container">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'预约会议'" rightText="完成"></Header>
		<div ref="wrapper" id="wrapper">
			<div class="content-wrapper">
				<div class="home space-bottom">
					<div class="text-area">
						<van-field v-model="theme" rows="1" autosize type="textarea" placeholder="会议主题" />
					</div>
					<div class="date-select">
						<div class="time"  @click="dateShow(true)" @touchstart.prevent="dateShow(true)">
							<div class="time-top">{{ timeConfig.start.date }} {{ timeConfig.start.time }}</div>
							<div class="time-bottom">{{ timeConfig.start.week }}</div>
						</div>
						<div class="middle-line">/</div>
						<div class="time" @click="dateShow(false)" @touchstart.prevent="dateShow(false)">
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
						</div>
							<van-icon class="addContactsIcon" @click="touchAddContact" @touchstart.prevent="touchAddContact" name="arrow" />
					</div>
					<div class="addContacts space-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_person  "></span>
						<div class="addContactsRight">
							<span class="addContactFont">添加参会人</span>
						</div>
							<van-icon class="addContactsIcon" @click="touchAddContact" @touchstart.prevent="touchAddContact" name="arrow" />
					</div>
					<div class="addContacts border-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_room  "></span>
						<div class="addContactsRight">
							<span class="addContactFont">会议室</span>
							 
						</div>
							<div>
							 <van-icon  v-if="false" class="addContactsIcon" name="arrow" @click="touchAddContact" @touchstart.prevent="touchAddContact" /><van-icon  v-else class="addContactsIcon" name="cross" />
							</div> 
					</div>
					<div class="addContacts space-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_type  "></span>
						<div class="addContactsRight" @click="goPattern(true)" @touchstart.prevent="goPattern(true)">
							<span v-if="pattern" class="addContactFont">{{pattern}}</span>
							<span v-else class="addContactFont">请选择会议模式</span>

								<!-- <span v-if="replace" class="addContactFont">{{replace}}</span>
							<span v-else class="addContactFont">请选择重复次数</span> -->
						</div>
							<van-icon v-if="!pattern" class="addContactsIcon" @click="goPattern(true)" @touchstart.prevent="goPattern(true)" name="arrow" />
							<van-icon v-else class="addContactsIcon" @click="goPattern(false)" @touchstart.prevent="goPattern(false)" name="cross" />
					</div>
					<div class="addContacts space-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-refresh  "></span>
						<div class="addContactsRight"  >
							<span v-if="replace" class="addContactFont">{{replace}}</span>
							<span v-else class="addContactFont">请选择重复次数</span>
							 
						</div>
							<div>
							 <van-icon  v-if="false" class="addContactsIcon" name="arrow" @click="touchAddContact" @touchstart.prevent="touchAddContact" /><van-icon  v-else class="addContactsIcon" name="cross" />
							</div> 
					</div>

				<div class="addContacts space-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_remind  "></span>
						<div class="addContactsRight" @click="touchInfoRemind(true)" @touchstart.prevent="touchInfoRemind(true)" >
							<span v-if="remindersText" class="addContactFont">{{remindersText}}</span>
							<span v-else class="addContactFont">请选择通知方式</span>
							 
						</div>
							<div>
							 <van-icon  v-if="!remindersText" class="addContactsIcon" @click="touchInfoRemind(true)" @touchstart.prevent="touchInfoRemind(true)" name="arrow" /><van-icon  v-else @click="touchInfoRemind(false)" @touchstart.prevent="touchInfoRemind(false)"  class="addContactsIcon" name="cross" />
							</div> 
					</div>
				<div class="addContacts space-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_description  "></span>
						<div class="addContactsRight" @click="goDetail(true)" @touchstart.prevent="goDetail(true)">
							<span v-if="detail" class="addContactFont">{{detail}}</span>
							<span v-else class="addContactFont">请添加描述</span>
							 
						</div>
							<div>
							 <van-icon  v-if="!detail" class="addContactsIcon" @click="goDetail(true)" @touchstart.prevent="goDetail(true)" name="arrow" /><van-icon @click="goDetail(false)" @touchstart.prevent="goDetail(false)"  v-else class="addContactsIcon" name="cross" />
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
		<van-popup  v-model="show"
         class="time-popup"
         position="bottom"
         closeable
         :style="{ height: '34%' }">
			
			<div class="content">
				<van-datetime-picker v-if="isTimeStart" :filter="filter" :minDate="minDate" visible-item-count="5" item-height ="0.8rem" v-model="currentDate" @confirm="dateHandle" @cancel="dateHandle" type="datetime" :formatter="formatter" />
				<van-datetime-picker v-else @confirm="dateHandle_end" v-model="endTime" type="time" :min-date="minDate_end" visible-item-count="5" item-height ="0.8rem" :filter="filter" :formatter="formatter" @cancel="dateHandle" />
			</div>
		</van-popup>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
const showRouter = ['detail','replace','room']
let { pathname }   =window.location
let bool  = !!showRouter.find((e)=>{
	return pathname.indexOf(e) !== -1
})

const currentDate = new Date(Date.now());
export default {
	data() {
		return {
			isTimeStart:true,
			minDate:currentDate,
			endTime:'',
			currentToday:'',
			minDate_end:currentDate,
			firstFlag:false,
			theme: '',
			show:false,
			footerRouterShow:bool,
			replace:'重复选择',
			remindersText:'',
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
			pattern:''
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
		// if( !this.firstFlag ){
		// 	this.firstFlag = true;
		// 	return
		// }
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
		goDetail(bool){
			if(bool){
				this.footerRouterShow =true
				this.$router.push({ path: '/home/detail' });
			}else{
				this.handleClose({
					allData:['meeting_introductio'],
					detail:''
				})
			}
		},
		goPattern(bool){
			if(bool){
				this.footerRouterShow =true
				this.$router.push({ path: '/home/pattern' });
			}else{
				this.handleClose({
					allData:['meeting_introductio'],
					detail:''
				})
			}
		},
		touchAddContact() {
			this.$router.push({ path: '/addContact' });
		},
		touchInfoRemind(bool) {
			if(bool){
				this.$router.push({ path: '/infoRemind' });
			}else{
				this.handleClose({
					allData:['reminders','reminders_time'],
					remindersText:''
				})
			}
		},
		
		//表单提交
		onSubmit() {
			console.log(this.allData,'alldata')
		},
		headerLeft() {
			this.$router.push('/entry')
		},
		headerRight() {},
		dateShow(bool) {
			this.isTimeStart = bool;
			this.show = true;
		},
		dateHandle_end(value){
				if (value) {
				console.log(value,'xx')
				this.currentDate = value;
			}
			this.show = false;
		},
		dateHandle(value) {
			if (value) {
				// console.log(,'xx')
				this.currentDate = value;
				console.dir(Date,'new Date(value)')
				console.log(new Date(value).valueOf())
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
		  filter(type, options) {
			if (type === 'minute') {
				return options.filter((option) => option % 15 === 0);
			}
			return options;
			},
		handleNavClick(){
			this.footerRouterShow=true;
		},
		routerLeftClick(){
			this.footerRouterShow=false;
		}
		
		,handleClose(config){
			for( let _key in config){
				let bool = Array.isArray(config[_key])
				if(bool){
					config[_key].forEach((e)=>{
						delete this[_key][e]
					});
					this[_key] = {
						...this[_key]
					}
				}else{
					this[_key] = ''
				}

			}
				
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
	.addContactsIcon
		font-size 31px
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
  @import "../../common/stylus/mixins.styl";

.time-popup
	.van-popup__close-icon
		display none
	.van-picker__toolbar
		height 90px
		bottom-border-1px(#eaeaea)
		>button
			font-size 30px
			color  rgba(24, 144, 255, 1)
	.van-picker-column
		font-size 30px
</style>