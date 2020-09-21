<template>
 <div class="room-wrapper">
		<Header :leftClick="headerLeft" :rightClick="headerRight" :title="'会议室'" rightText="完成"></Header>
      <div class="room-header">
         <div class="room-search">
               <van-search
               v-model="value"
               shape="round"
               placeholder="请输入搜索关键词"
               />

         </div>
         <div class="room-time">
            <div class="time-message" @touchstart.prevent="show=true" @click.prevent="show=true">
                  <van-icon name="underway-o" />
                  <span v-if="!currentDate" class="day"> 选择时间 </span>
                  <span  v-else class="day" > {{$moment(currentDate).format('MM')}}月{{$moment(currentDate).format('DD')}}日</span>
                  <!-- <span  v-else class="day" > {{Date(currentDate).format('HH:mm')}} </span> -->
                  <span  v-if="currentDate" class="week" >{{$moment(currentDate).format('dddd')}}</span>
                  <span class="iconfont ticobackicon-unfold_alarm"></span>
            </div>
         </div>
      </div>
      <div  ref="wrapper" class="room-list">
         <div>

         <van-checkbox-group v-model="result">
            <div class="line"></div>
            <div class="room-container" @touchstart ="console.log(1)" @click="console.log(2)">
               <van-checkbox name="a">
                  <RoomItem></RoomItem>
               </van-checkbox>
               <!-- <van-checkbox name="a">
                  <RoomItem></RoomItem>
               </van-checkbox> -->
               </div>
                 <div class="line"></div>
            <div class="room-container">
               <van-checkbox name="a">
                  <RoomItem></RoomItem>
               </van-checkbox>
               <!-- <van-checkbox name="a">
                  <RoomItem></RoomItem>
               </van-checkbox> -->
               </div>
                 <div class="line"></div>
            <div class="room-container">
               <van-checkbox name="a">
                  <RoomItem></RoomItem>
               </van-checkbox>
               <!-- <van-checkbox name="a">
                  <RoomItem></RoomItem>
               </van-checkbox> -->
               </div>
                 <div class="line"></div>
            <div class="room-container">
               <van-checkbox name="a">
                  <RoomItem></RoomItem>
               </van-checkbox>
               <!-- <van-checkbox name="a">
                  <RoomItem></RoomItem>
               </van-checkbox> -->
               </div>

         </van-checkbox-group>
         </div>

      </div>
      <div class="footer">
         <div class="text-container">
            <span class="text">
               以选择: 0个
            </span> 
            <van-icon name="arrow-up" />
            </div>
            
         <div class="btn">
            确定(0/120)
         </div>
      </div>
      	<van-popup  v-model="show"
         class="time-popup"
         position="bottom"
         closeable
         :style="{ height: '34%' }">
			
			<div class="content">
             <van-datetime-picker
                  v-model="currentDate"
                  type="date"
                  :min-date="minDate"
                  visible-item-count="5" item-height ="0.8rem" 
                  :formatter="formatter"
                  @confirm="dateHandle"
                  @cancel="dateHandle"
                  />
			</div>
		</van-popup>
     
 </div>
</template>
 
<script>
import BScroll from 'better-scroll';
import RoomItem from'@/components/RoomItem';
export default {
      props:{
         leftClick:Function,
      },
      components:{
         RoomItem,
      },
      data () {
      return {
         minDate:new Date(),
         currentDate:new Date(),
         name:'room',
         result:[],
         show:false,
         value:''
      }
      },
      mounted(){
		const { wrapper } = this.$refs;
      new BScroll(wrapper,{
            click: true,
            preventDefault: false,
      })      
      },
      methods:{
         headerLeft(){
               this.$router.push({path:'/home',
            })
            this.leftClick()
         },
         headerRight(){
            this.leftClick()
            this.$router.push({path:'/home',
               query:{
                 key:this.name,
               }
            })
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
      dateHandle(value){
         this.show = false
         if(value){
               this.currentDate = value
         }
      }
      }

}
</script>
 
<style scoped lang = "stylus">
@import "../../../common/stylus/mixins.styl";
.room-wrapper
   height  100%
   .room-header
      height 183px
      .room-time
         height 65px
         background yellow
         padding 0 32px
         display flex
         align-items center
         .time-message 
            font-size 30px
            color #333333
            text-align center
            display flex
            align-items center
            .iconfont  
               font-size 10px
            .day
               margin-left 20px
               margin-right 0.3em
            .week
               margin-right 25px
            
      .room-search
         height 118px
         display flex
         align-items center
         justify-content center
   .room-list
   
      /* position relative */
      height calc(100% - 88px - 98px - 183px )
      overflow hidden
      /* display flex
      justify-content center */
      .room-list-wrapper
      .room-container
         padding 0px 28px  0px 31px
         background #fff
      .line
            height 21px
            background pink
   .footer
      height 98px      
      display flex
      justify-content space-between
      align-items center
      padding 0 31px
      top-border-1px(#f7f7f7)
      .text-container 
         color #1890ff
         align-items center
         justify-content center
         font-size 28px
         /* .text  */
         .van-icon 
            padding-top 10px
            font-weight bold 
      .btn
         width 204px
         height 61px
         background #1890ff
         border-radius 4px
         display flex
         align-items center
         justify-content center
         color #fff


</style>
<style lang="stylus">
.room-list
   .van-checkbox
      height 284px
      padding-top 30px 
      align-items flex-start
      overflow hidden
      .van-checkbox__icon
         font-size 32px 
      .van-checkbox__label
         height 100%
         width 100%
.room-header
   .van-search
         width 100%
         height 78px
         padding  0 32px
         /* .van-field__body */
         .van-cell
            height 78px 
            font-size 34px  
            line-height 78px
            .van-icon
               font-size 32px
         .van-search__content
            padding-left 30px
.content 
   .van-picker
      height 100%
      .van-picker
         .van-picker-column__wrapper
            font-size 30px
         /* height 80 */
      .van-picker__columns
         transform: translateY(10%)
.van-checkbox-group
   position relative
   z-index 10000
</style>