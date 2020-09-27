<template>
 <div class="room-wrapper">
		<Header :leftClick="headerLeft" :rightClick="headerRight" :title="'会议室'" rightText="完成"></Header>
      <div class="room-header">
         <div class="room-search">
               <van-search
               @search="onSearch"
               v-model="value"
               shape="round"
               placeholder="请输入搜索关键词"
               
               />

         </div>
         <div class="room-time">
            <div class="time-message"  @click.prevent="show=true">
                  <van-icon name="underway-o" />
                  <span v-if="!currentDate" class="day"> 选择时间 </span>
                  <span  v-else class="day" > {{$moment(currentDate).format('MM')}}月{{$moment(currentDate).format('DD')}}日</span>
                  <!-- <span  v-else class="day" > {{Date(currentDate).format('HH:mm')}} </span> -->
                  <span  v-if="currentDate" class="week" >{{$moment(currentDate).format('dddd')}}</span>
                  <span class="iconfont ticobackicon-unfold_alarm"></span>
            </div>
            <div class="room-check-all"> 
		      	<van-checkbox  v-model="checkAll"  @click.prevent="checkAllItems(checkAll)">全选</van-checkbox>
            </div>
         </div>
      </div>
      <div  ref="wrapper" class="room-list">
         <div v-if="!value">

         <van-checkbox-group ref="roomCheck" v-model="result">
            <div v-for="(item) in apiData" :key="item.id">
               <div class="line"></div>
               <div class="room-container"  >
                  <van-checkbox :name="item.id">
                     <RoomItem :item="item"></RoomItem>
                  </van-checkbox>
                  </div>
            </div>
         </van-checkbox-group>
         </div>
      <div v-else>
         <van-checkbox-group ref="roomCheck" v-model="result">
            <div v-for="(item) in searchData" :key="item.id">
               <div class="line"></div>
               <div class="room-container"  >
                  <van-checkbox :name="item.id">
                     <RoomItem :item="item"></RoomItem>
                  </van-checkbox>
                  </div>
            </div>
         </van-checkbox-group>
         </div>

      </div>
      <div class="footer">
         <div class="text-container">
            <span class="text" @click="selectRoom=true">
               以选择: {{result.length}}个
            </span> 
            <van-icon name="arrow-up" />
            </div>
            
         <div class="btn" @click="headerRight">
            确定({{result.length}}/{{apiData.length}})
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
			<van-popup v-model="selectRoom"  :lock-scroll="false" :overlay="false"  position="bottom" :style="{ width: '100%',height:'100%' }" >
             <div class="select-room-wrapper">
                  <Header :leftClick="closeFn"  :title="'已选会议室'" :rightClick="function(){}" rightText=""></Header>
                  <div class="room-container">
                     <div class="select-room-list" ref="selectRef">
                         <van-checkbox-group v-model="result" v-if="selectData">
                           <div v-for="(item) in selectData" :key="item.id">
                              <div class="room-container"  >
                                 <van-checkbox :name="item.id">
                                    <RoomItem :item="item"></RoomItem>
                                 </van-checkbox>
                                 </div>
                           </div>
                        </van-checkbox-group>
                     </div>
                  </div>
            </div>
         </van-popup>
     
 </div>
</template>
 
<script>
import BScroll from 'better-scroll';
import RoomItem from'@/components/RoomItem';
export default {
   name:"Home",
      props:{
         leftClick:Function,
         handleSubmit:Function

      },
      components:{
         RoomItem,
      },
      data () {
      return {
         checkAll:false,
         selectRoom:false,
         minDate:new Date(),
         currentDate:new Date(),
         name:'room',
         result:[],
         show:false,
         value:'',
         apiData:[]
      }
      },
      mounted(){
        const { wrapper } = this.$refs;
         this.$nextTick(()=>{
            this._BScroll = new BScroll(wrapper,{
               click: true,
               preventDefault: false,
         })
         })
         this.init()
      },
      activated(){
      },
      methods:{
         checkAllItems(bool){
            this.$refs.roomCheck.toggleAll(bool)
         },
         onSearch(value){
         },
         closeFn(){
            this.selectRoom = false;
         },
         init(){
         this.$loading.show()
         const { wrapper } = this.$refs;
         let date = {
            start_time:this.$moment(this.currentDate.valueOf()).format('YYYY-MM-D 00:00:00'),
            end_time:this.$moment(this.currentDate.valueOf() + 1000*60*60*24).format('YYYY-MM-D 00:00:00')
         };
       
         this.$request.confirmMeeting(date).then((res)=>{
            this.$loading.close()
            if(res.success){
            this.$loading.show()

               this.$request.findMeeting(date).then((res)=>{
                  this.$loading.close()
                  if(res.success){
                     let { data=[] } = res;
                     this.apiData = data;
                     this.result = []
                     this.$nextTick(()=>{
                        this._BScroll.refresh()
                     })
                  }
               })
            }
         })  
         },
         headerLeft(){
               this.$router.push({path:'/home',
            })
            this.leftClick()
         },
         headerRight(){
            let config = {};
            let text= '';
            let idArr =[];
            let typeArr = [];
            let _data = this.result;
            if(_data.length){
               text = `会议室: ${this.mapData[_data[0]].room_cn_name}${_data.length === 1 ? '':'等'+_data.length+'个'}`
            }
            idArr = _data.map((id)=>{
               let current = this.mapData[id];
               typeArr.push(current.room_type)
               return current.id
            })
            config.key = "room",
            config.text = text,
            config.meeting_room_type = typeArr;
            config.meeting_room_id = idArr;
            this.handleSubmit(config)
            this.leftClick()
            // this.$router.push({path:'/home',
            //    query:{
            //    }
            // })
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
               this.currentDate = value;
               this.init()
         }
      }
      },
      computed:{
         mapData(){
            return this.apiData.reduce((pre,e)=>{
               pre[e.id] = e;
               return pre
            },{})
         },
         selectData(){
            return this.result.reduce((pre,id)=>{
               pre.push(this.mapData[id])
               return pre
            },[])
         },
         searchData(){
            return this.apiData.filter((e)=>{
               return e.room_cn_name.indexOf(this.value) != -1
            })
         }
      },
      watch:{
         selectRoom(){
            if(!this.selectRoom){
               return
            }
            setTimeout(()=>{
               if(this._selectBscroll){
                  this._selectBscroll.refresh()
                  return
               }
               this._selectBscroll = new BScroll(this.$refs.selectRef,{
                  click:true
               })
            },500)  // 页面过渡所需时间
         },
      }

}
</script>
 
<style  lang = "stylus">
@import "../../../common/stylus/mixins.styl";
.room-wrapper
   height  100%
   .room-header
      height 183px
      .room-time
         height 65px
         background #fff
         padding 0 32px
         display flex
         align-items center
         justify-content space-between
         .room-check-all
            height 100%
            .van-checkbox
               height 100%
               font-size 32px
               display flex 
               justify-content space-between
               align-items center
               .van-checkbox__icon
                  height 100%
                  display flex
                  align-items center
                  .van-icon
                     font-size 26px
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
            background #f7f7f7
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
         font-size: 28px


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
</style>

<style lang="stylus">
   .select-room-wrapper
      height 100%
      width 100%
      .room-container   
         height calc(100% - 88px)
         overflow hidden
         display flex
         .select-room-list
            .room-container
               padding 20px 28px  0px 31px
               background #fff
            .line
                  height 21px
                  background #f7f7f7
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
</style>