<template>
 <div class="room-wrapper">
		<Header :leftClick="headerLeft" :rightClick="headerRight" :title="'全部会议'" ></Header>
      <div class="meeting-wrapper" ref="wrapper">
         <div class="meeting-content">
            <div  class="meeting-list" v-for="(item,index) in meetingData" :key="index">
               <div class="time">{{index}}</div>
               <div class="item" @click="click(el)" v-for="(el,i) in item.data " :key="i">
                  <div class="item-title">{{el.theme}}</div>
                  <div class="item-time">{{ el.start_time.split(' ')[1]}}-{{el.end_time.split(' ')[1]}}</div>
                  <div class="item-user">
                     <div>发起人:{{el.meeting_host_name}}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
		<van-popup  :lock-scroll="false" :overlay="false" v-model="show" position="right" :style="{ width: '100%',height:'100%' }" >
         <router-view :leftCallback="leftCallback"></router-view>
   	</van-popup>
      
 </div>
</template>
 
<script>
import { Toast } from 'vant'
import BScroll from 'better-scroll';
export default {
      props:{
         leftClick:Function,
      },
     
      data () {
      return {
         page_num:1,
         page_size:10,
         meetingData:{},
         flag:true,
         endData:true,
         show:false
      }
      },
      mounted(){

         this.show = false;
         this.request().then(()=>{
            this._BScroll.on('scrollEnd',()=>{
               if(!this.endData){
                  return 
               }
               if(this.flag){
                  this.flag = false;
                  this.request().then(()=>{
                     this.flag =true;
                  })
               }
            });
         })
      },
      methods:{
         headerLeft(){
            this.$router.push('/entry')
         },
         headerRight(){

         },
         leftCallback(){
            this.show = false
         },
         click(e){
            this.$router.push({
               path:'/allmeeting/detail',
               query:e
            })
            this.show = true
         },
         request(){
            this.$loading.show()
            let {page_num,page_size}  = this
            return this.$request.meetingList({
               page_num,
               page_size,
               // order_by_clause
               // start_time:this.$moment(Date.now()).format('YYYY-MM-D 00:00:00'),
               // end_time:this.$moment(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10).format('YYYY-MM-D HH:mm:ss')
            }).then((res)=>{
               this.$loading.close()
               if(res.success){
                  if(res.data.result.length === 0){
                     this.endData = false;
                     Toast.success('全部会议展示完毕')
                  }
                  this.page_num +=1;
                  res.data.result.forEach((e)=>{
                     let key = e.start_time.split(' ')[0]
                     if(this.meetingData[key]){
                        this.meetingData[key].data.push(e)
                     }else{
                        this.meetingData[key] ={
                           data:[e]
                        }
                     }
                  })
                  this.meetingData = {...this.meetingData}
                     this.$nextTick(()=>{
                        if(this._BScroll){
                              this._BScroll.refresh();
                        }else{
                           this._BScroll = new BScroll(this.$refs.wrapper,{
                              click:true
                           })
                        }
                     })
               }
            })

         }
      }
}
</script>
 
<style  lang = "stylus">
   .room-wrapper
      height 100%
      .meeting-wrapper
         height calc(100% - 88px)
         display flex
         justify-content center
         background #f7f7f7
         .meeting-content
            display table
            background #f7f7f7
            .meeting-list
               
               display flex
               align-items center
               flex-direction column
               .time
                  height 80px
                  display flex
                  justify-content center
                  align-items center
                  font-size 28px
                  text-align center
                  color #666
               .item
                  height 259px
                  background #fff
                  width 686px
                  display flex
                  flex-direction column
                  justify-content space-around
                  padding-left 30px 
                  border-radius 20px
                  margin-bottom 30px
                  &:nth-last-child(1)
                     margin 0
                  .item-title
                     color: #333333
                     font-size: 34px
                  .item-time
                     color: #333333
                     font-size: 34px
                  .item-user
                     color: #666666
                     font-size 28px
      .footer
         height 110px
         width 100%
         display flex
         align-items center
         border-top 1px solid #f3f3f3
         /* flex-direction column */
         .line
            width 1px
            height 72px
            background rgba(236, 236, 236, 1)
         .edit
            color rgba(24, 144, 255, 1)
            fon-size 34px
            width 49%
            .content
               justify-content center
               display flex
               align-items center
               .iconfont   
                  margin-right 20px
         .opacity
            opacity .4

</style>