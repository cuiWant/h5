<template>
 <div class="room-wrapper">
		<Header :leftClick="headerLeft" :rightClick="headerRight" :title="'会议室'" rightText="完成"></Header>
      <div ref="wrapper" class="room-list"></div>
 </div>
</template>
 
<script>
import BScroll from 'better-scroll';

export default {
      props:{
         leftClick:Function,
      },
      data () {
      return {
         name:'room'
      }
      },
      mounted(){
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
         }
      }

}
</script>
 
<style scoped lang = "stylus">
@import "../../../common/stylus/mixins.styl";
   
   .room-list
      height calc(100% - 88px)


</style>