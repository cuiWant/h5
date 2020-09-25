<template>
	<div class="container">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'预约会议'" rightText="完成"></Header>
		<div ref="wrapper" id="wrapper" >
			<div class="content-wrapper">
				<div class="home space-bottom">
					<div class="text-area">
						<van-field v-model="theme" rows="1" autosize type="textarea" placeholder="会议主题" />
					</div>
					<div class="date-select">
						<div class="time"  @click="dateShow(true)" >
							<div class="time-top">{{ timeConfig.start.date }} {{ timeConfig.start.time }}</div>
							<div class="time-bottom">{{ timeConfig.start.week }}</div>
						</div>
						<div class="middle-line">/</div>
						<div class="time" @click="()=>{
								if(this.timeConfig.start.start_time){
									dateShow(false)
								}else{
									dateShow(true)
								}
							}" >
							<div class="time-top">{{ timeConfig.start.date }} {{ timeConfig.end.time }}</div>
							<div class="time-bottom">{{ timeConfig.start.week }}</div>
						</div>
					</div>
				</div>
				<div class="userAndContacts">
						<div class="addContacts border-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_organizer  "></span>
						<div class="addContactsRight">
							<span class="addContactFont">我
								<van-tag class='tag' type="primary">组织人</van-tag>
							</span>
						</div>
					</div>
					<div class="addContacts space-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_person  "></span>
						<div class="addContactsRight" @click="touchAddContact(true)">
							<span v-if="contact" class="addContactFont">{{contact}}</span>
							<span v-else class="addContactFont">选择参会人</span>
						</div>
							<van-icon class="addContactsIcon" @click="touchAddContact(true)" name="arrow" />
					</div>
					<div class="addContacts border-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_room  "></span>
						<div class="addContactsRight" @click="goRoom(true)"  >
								<span v-if="room" class="addContactFont">{{room}}</span>
							<span v-else class="addContactFont">请选择会议室</span>
							 
						</div>
							<div>
								<van-icon  v-if="true" class="addContactsIcon" name="arrow" @click="goRoom(true)"  /><van-icon  v-else class="addContactsIcon" name="cross" @click="goRoom(false)"  />
							</div> 
					</div>
					<div class="addContacts space-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_type  "></span>
						<div class="addContactsRight" @click="goPattern(true)" >
							<span v-if="pattern" class="addContactFont">{{ pattern}}</span>
							<span v-else class="addContactFont">请选择会议模式</span>

								<!-- <span v-if="replace" class="addContactFont">{{replace}}</span>
							<span v-else class="addContactFont">请选择重复次数</span> -->
						</div>
							<!-- <van-icon v-if="!pattern" class="addContactsIcon" @click="goPattern(true)"  name="arrow" /> -->
							<van-icon  class="addContactsIcon" @click="goPattern(true)"  name="arrow" />
							<!-- <van-icon v-else class="addContactsIcon" @click="goPattern(false)"  name="cross" /> -->
					</div>
					<div class="addContacts space-bottom"  >
						<span class="iconfont  addContactsLeft ticobackicon-refresh  "></span>
						<div class="addContactsRight" @click="goReplace(true)"  >
							<span v-if="replace" class="addContactFont">{{replace}}</span>
							<span v-else class="addContactFont">请选择重复次数</span>
							 
						</div>
							<div>
							 <!-- <van-icon  v-if="!replace" class="addContactsIcon" name="arrow" @click="goReplace(true)"  /> -->
							 <van-icon   class="addContactsIcon" name="arrow" @click="goReplace(true)"  />
							 <!-- <van-icon  @click="goRoom(false)"  v-else class="addContactsIcon" name="cross" /> -->
							</div> 
					</div>

				<div class="addContacts space-bottom" >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_remind  "></span>
						<div class="addContactsRight" @click="touchInfoRemind(true)"  >
							<span v-if="remindersText" class="addContactFont">{{remindersText}}</span>
							<span v-else class="addContactFont">请选择通知方式</span>
							 
						</div>
							<div>
							 <!-- <van-icon  v-if="!remindersText" class="addContactsIcon" @click="touchInfoRemind(true)"  name="arrow" /> -->
							 <van-icon   class="addContactsIcon" @click="touchInfoRemind(true)"  name="arrow" />
							 <!-- <van-icon  v-else @click="touchInfoRemind(false)"   class="addContactsIcon" name="cross" /> -->
							</div> 
					</div>
				<div class="addContacts space-bottom"  >
						<span class="iconfont  addContactsLeft ticobackicon-meeting_description  "></span>
						<div class="addContactsRight" @click="goDetail(true)" >
							<span v-if="detail" class="addContactFont">{{detail}}</span>
							<span v-else class="addContactFont">请添加简介</span>
							 
						</div>
							<div>
							 <!-- <van-icon  v-if="!detail" class="addContactsIcon" @click="goDetail(true)"  name="arrow" /> -->
							 <van-icon   class="addContactsIcon" @click="goDetail(true)"  name="arrow" />
							 <!-- <van-icon @click="goDetail(false)"   v-else class="addContactsIcon" name="cross" /> -->
							</div> 
					</div>
				</div>


				<!-- <div class="test">
					<img class="test" src="../../assets/logo.png" alt="" />
				</div> -->
			</div>
		</div>
		<Nav v-if="(navData.some(e=>e.status))" :config="navData" :click="handleNavClick"></Nav>
		<van-popup  :lock-scroll="false" :overlay="false" v-model="footerRouterShow" position="right" :style="{ width: '100%',height:'100%' }" >
		<keep-alive >  
			<router-view  :pattern="handlePattern" :handleSubmit="handleChidlren" :leftClick="routerLeftClick" ></router-view>
		</keep-alive >  

		</van-popup>
		<van-popup  v-model="show"
         class="time-popup"
         position="bottom"
         closeable
		 :style="{ height: '34%' }">
			
			<div class="content">
				<van-datetime-picker v-if="isTimeStart" :filter="filter" :minDate="minDate" visible-item-count="5" item-height ="0.8rem" v-model="currentDate" @confirm="dateHandle" @cancel="dateHandle" type="datetime" :formatter="formatter" />
				<van-datetime-picker v-else :filter="filter"  @confirm="dateHandle_end" v-model="endTime" type="datetime" :min-date="minEnd" :max-date="maxEnd" visible-item-count="5" item-height ="0.8rem"  :formatter="formatter" @cancel="dateHandle_end" />
			</div>
		</van-popup>
		<Alert ref="alert" :hintText="hintText"></Alert>
	</div>
</template>

<script>
import Alert from '@/components/Alert'
import BScroll from 'better-scroll';
import {Toast,Notify} from 'vant';
const showRouter = ['detail','replace','room','addContact']
const requireArr= [
	{
		text:'请输入主题',
		data:'theme'
	},{
		text:'请选择会议室',
		data:'room'
	},{
		text:'请选择会议模式',
		data:'pattern'
	},{
		text:'请选择通知方式',
		data:'remindersText'
	},
	{
		text:'请选择参会人',
		data:'contact'
	}
	
	]
let { pathname }   = window.location;
let bool  = !!showRouter.find((e)=>{
	return pathname.indexOf(e) !== -1
})

const currentDate = new Date(Date.now() + 1000 * 15 * 60);

export default {
	// name:'Home',
	components:{
		Alert
	},
	data() {
		return {
			isTimeStart:true,
			minDate:currentDate,
			currentToday:'',
			minDate_end:{},
			endTime:'',
			currentDate: new Date(),
			firstFlag:false,
			theme: '',
			contact:'',
			show:false,
			hintText:[1,2],
			footerRouterShow:bool,
			replace:'',
			room:'',
			remindersText:'',
			timeConfig: {
				start: {
					time: '选择开始时间段',
					date: '-',
					week: '-',
				},
				end: {
					time: '选择结束时间段',
					minHour:''
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
			pattern:'',
			handlePattern:[true,true,true]
		};
	},
	mounted() {
		// console.log(this.Toast,'this')
		const { wrapper } = this.$refs;
		this._BScroll = new BScroll(wrapper,{
			click: true,
		});
		this.show =false;
		this.footerRouterShow =false;
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

	
		// let { query} =this.$route;
		// let oldData = this.allData;
		// let { key,text } = query;
		// this.allData={
		// 	...oldData,
		// 	...query
		// }
		// this.remindersText =1
		// this[key] = text;
	},
	watch:{
		room(value,oldvalue){
			if(this.pattern){
				this.goPattern(false);
				Toast.fail('请重新选择会议模式');
			}

			//处理radio
			let arr = [true,true,true];
			let _typeArr =this.allData.meeting_room_type;
			if(_typeArr){
				let bool = _typeArr.some((e)=>{
					return e.indexOf('room')  === -1
				})
				if(!bool){
					arr[0] = true;
					arr[1] = false;  
					arr[2] = false;
				}else{
					arr[0] = false;
					arr[1] = true;
					arr[2] = true;
				}
			}
			this.handlePattern = arr;
		},
		allData(){
			this.$nextTick(()=>{
				this._BScroll && this._BScroll.refresh()
			})
		},
		endTime(value){
			console.log(value)
		},
		minEnd(value){
			console.log(value)
		},
		maxEnd(value){
			console.log(value)
		}
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
				if(text) {
					let navItem = this.navData.find((e)=>{
						return e.name === key
					})
					if(navItem){
						// navItem.status = false;
						this.navData =[...this.navData]
					}
				}
		},
		goReplace(bool){
			if(bool){
				this.footerRouterShow =true
				this.$router.push({ path: '/home/replace' });
			}else{
				this.handleClose({
					allData:['interval_flag','replaceCount'],
					replace:''
				})
			}
		},
		goRoom(bool){
			if(bool){
				this.footerRouterShow =true
				this.$router.push({ path: '/home/room' });
			}else{
				this.handleClose({
					allData:['interval_flag','replaceCount'],
					room:''
				})
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
					allData:['meeting_patten'],
					pattern:''
				})
			}
		},
		touchAddContact(bool) {
			if(bool){
				this.footerRouterShow =true
				this.$router.push({ path: '/home/addContact' });

			}
		},
		touchInfoRemind(bool) {
			if(bool){
				this.footerRouterShow =true
				this.$router.push({ path: '/home/infoRemind' });
			}else{
				this.handleClose({
					allData:['reminders','reminders_time'],
					remindersText:''
				})
			}
		},
		
		headerLeft() {
			this.$router.push('/entry')
		},
		//表单提交
		headerRight() {
			// {
			// 	text:'请输入主题',
			// 	data:'theme'
			// },{
			// 	text:'请选择会议模式',
			// 	data:'pattern'
			// },{
			// 	text:'请选择会议室',
			// 	data:'room'
			// },
			// {
			// 	text:'请选择时间',
			// 	data:'theme'
			// }
			let _allData = this.allData;
			for (let i = 0; i < requireArr.length; i++) {
				let e =  requireArr[i];
				if(!this[e.data]){
					this.hintText = [e.text,''];
					this.$refs.alert.showFn() 
					return
					continue
				}
			}
			if(!this.timeConfig.end.end_time){
					this.hintText = ['请选择时间',''];
					this.$refs.alert.showFn() 
					return 
			}
			if(!this.replace){
				_allData = {
					..._allData,
					repeat_type: 'day',
					repeat_flag: false ,
					replaceCount:0,
					frequency:'',
					interval_flag:false
				}
			}
			// 主题
			let { replaceCount } = _allData;
			//获取 主持人id
			let { user:userMessage } = this.$store.state;
			let meeting_host_id = userMessage.user.user_id;

			//处理时间
			let start_time_list = [];
			let end_time_list = [];
			function workday_count(start, end) {
				let count = 0;
				let current = start;
				let arr = [];
				while (start < end) {
					const day = current.day();
					if (day > 0 && day < 6) {
						arr.push(current.format('YYYY-MM-D HH:mm:ss'))
					}
					current = current.add(1, 'd');
				}
				return arr;
			}
			let replaceConfig = [{
					value:0,
					_value:false,
					},
					{
					value:5,
					_value:"Mon,Tue,Wed,Thu,Fri",
					},
					{
					value:1,
					_value:'1'
					},
					{
					value:7,
					text:'每周',
					_value:'Sun,Sat,Thu,Tue,Mon,Wed,Fri'
					}
				];
			let obj = replaceConfig.find((e)=>{
				return e._value === _allData.interval_flag
			})
			let startTime =this.timeConfig.start.start_time; // hhmmss
			let endTime =this.timeConfig.end.end_time;
			let startNow =  this.$moment(startTime).valueOf();
			let endNow =  this.$moment(endTime).valueOf();
			let dayNow = 1000 * 60 * 60 * 24;
			switch (obj.value) {
				case 0:
					start_time_list.push(startTime)
					end_time_list.push(endTime)
					break;
				case 5:
					let startEnd = (replaceCount) *  dayNow  * 7 + startNow  + (7 - this.$moment(startTime).day()) *  startNow;
					let endEnd = (replaceCount )*  dayNow  * 7 +  endNow + (7 - this.$moment(startTime).day()) *  startNow ;
					start_time_list.push(...workday_count(this.$moment(startTime),this.$moment(startEnd)))
					end_time_list.push(...workday_count(this.$moment(endTime),this.$moment(endEnd)))
					break;
				case 1:
					for (let i = 0; i < replaceCount;i++){
						start_time_list.push(this.$moment(startNow + dayNow * i ).format('YYYY-MM-D HH:mm:ss'))
						end_time_list.push(this.$moment(endNow + dayNow * i ).format('YYYY-MM-D HH:mm:ss'))
					}
					break
				case 7:
					for (let i = 0; i < replaceCount;i++){
						start_time_list.push(this.$moment(startNow + dayNow * i * 7 ).format('YYYY-MM-D HH:mm:ss'))
						end_time_list.push(this.$moment(endNow + dayNow * i * 7 ).format('YYYY-MM-D HH:mm:ss'))
					}
					break
				};
			let meetingConfig  = {
				..._allData,
				start_time_list,
				end_time_list,
				theme:this.theme,
				meeting_host_id
			} 
		this.$loading.show();
		this.$request.makeMeeting(meetingConfig).then((res)=>{
			this.$loading.close();
			if(res.success){
				// Notify({type: 'success', message: (res.data.msg ||'预约成功'),duration:1000});
				this.$router.push('/allmeeting');
			}else{
				Notify({type: 'danger', message: (res.data.msg ||'预约异常'),duration:2500});
			}
		})
		},
		dateShow(bool) {
			this.isTimeStart = bool;
			this.show = true;
		},
		dateHandle_end(value){
			if (value) {
				let m = this.$moment(value)
				this.timeConfig.end ={
					time : m.format('HH:mm'),
					end_time :m.format('YYYY-MM-D HH:mm:ss')
				};
			}
			this.show = false;
		},
		dateHandle(value) {
			if (value) {
				let _value = new Date(value).valueOf();
				let m = this.$moment(value)
				this.currentDate = value;
				this.minDate_end = this.$moment(value).format('YYYY-MM-D HH:mm:ss');
				this.timeConfig.start = {
					time: m.format('HH:mm'),
					date:m.format('MM/D'),
					week:m.format('dddd'),
					start_time:m.format('YYYY-MM-D HH:mm:ss')
				}
				let end =this.$moment(_value + 1000 * 60 * 15) ;
				this.minDate_end = {
					hour : end.format('HH'),
					minute : end.format('mm')
				}
				this.timeConfig.end ={
					time:'请选择结束时间段'
				}
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
				return  options.filter((option) => {
				return option % 15 === 0});
			}
			return options;
			},
		handleNavClick(){
			this.footerRouterShow=true;
		},
		routerLeftClick(){
			this.footerRouterShow=false;
		},handleClose(config){
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
	computed:{
		minEnd(){
			return new Date(this.currentDate.valueOf() + 1000 * 60  * 15)
		},
		maxEnd(){
			return new Date(this.$moment(this.currentDate.valueOf()).format(`YYYY/MM/D 23:59:59`))
		}
	}
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

body
	.van-toast--fail
		justify-content: space-evenly
		.van-icon
			font-size 60px
		.van-toast__text
			font-size 27px
			width 6em
</style>