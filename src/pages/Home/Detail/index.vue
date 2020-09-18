<template>
 <div class="room-wrapper">
		<Header :leftClick="headerLeft" :rightClick="headerRight" :title="'简介'" rightText="完成"></Header>
      <div ref="wrapper" class="room-list">
         <van-field
            class="vant-textarea"
            v-model="message"
            autosize
            type="textarea"
            placeholder="请输入会议简介"
            show-word-limit
            />
      </div>
 </div>
</template>
 
<script>
import BScroll from 'better-scroll';

export default {
      props:{
         leftClick:Function,
         handleSubmit:Function
      },
      data () {
      return {
         name:'detail',
         message:''
      }
      },
      mounted(){
        console.log(1)
        new BScroll(this.$refs.wrapper);
      },
      methods:{
         headerLeft(){
            this.leftClick()
               this.$router.push({path:'/home',
            })
         },
         headerRight(){
            this.leftClick()
            this.handleSubmit({
                 key:this.name,
                 text:this.message,
                 meeting_introductio:this.message
               })
            this.$router.push({path:'/home'});
         }
      }

}
</script>
 
<style  lang = "stylus">
@import "../../../common/stylus/mixins.styl";
   .room-wrapper
      height 100%   
      .room-list
         height calc(100% - 88px)
         .vant-textarea
            height 100%
            .van-cell__value
               height 100%
               .van-field__body
                  height 100%
                  display flex
                  textarea
                     padding 25px 25px 0px
                     height 100% !important
                     font-size 34px
                     line-height 34px


</style>