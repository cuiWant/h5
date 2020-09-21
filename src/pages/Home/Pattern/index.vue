<template>
 <div class="patten-wrapper">
		<Header :leftClick="headerLeft" :rightClick="headerRight" :title="'重复'" rightText="完成"></Header>
      <div ref="wrapper" class="replace-list">

      <van-radio-group v-model="radio">
         <van-cell-group>
            <van-cell :class="`${index !=  (radioData.length-1) ? 'border-bottom' :''} cell`"  v-for="(item,index) in  radioData " :key="item.value" :title="item.text" clickable @click="radio = item.value" @touchstart="radio = item.value">
               <template #right-icon>
               <van-radio icon-size="25px" :name="item.value" />
               </template>
            </van-cell>
         </van-cell-group>
      </van-radio-group>
 </div>
 </div>
</template>
 
<script>
import BScroll from 'better-scroll';
const columns  = [];
for (let i = 0; i < 99; i++) {
   columns[i] = `${i+1}次`;
   }
export default {
      props:{
         leftClick:Function,
         handleSubmit:Function

      },
      data () {
      return {
         name:'pattern',
         repeat_flag:false,
         num:'1次',
         radio:'',
         defaultIndex:0,
         show:false,
         radioData:[{
            text:'视频会议',
            value:"VIDEO",
         },
         {
            text:'智能会议',
            value:"SMART",
         },
         {
            text:'节能会议',
            value:'ENERGY'
         }
         ],
       columns,

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
         
            let radioText = this.radioData.find((e)=>{
               return this.radio=== e.value;
            })
            this.leftClick()
            this.$router.push({path:'/home',
            })
              this.handleSubmit({
                 key:this.name,
                 text:`${radioText ? radioText.text:''}`,
                 [this.radio && "meeting_patten"]:console.log(this.radioData) || this.radioData,
               //   replaceCount:this.defaultIndex+1
                  //   text:`${}`,
               //   meeting_introductio:this.message
               })
         }
      ,
         onChange(that,value){
         },
         onCancel(){
            this.show = false;

         },onConfirm(value,index){
            this.num = value;
            this.show = false;
            this.defaultIndex = index;
         }

   }

}
</script>
 
<style scoped  lang = "stylus">
@import "../../../common/stylus/mixins.styl";
   
.patten-wrapper
      height calc(100% - 88px)
   .cell
         height: 101px
         display flex
         align-items center
         font-size 34px
         .van-icon
            font-size 34px
         /* &:nth-last-child()
            border none */
   .line
         height 21px
         background #f7f7f7         
   .right-container
      display flex
      align-items center
   .van-cell__value
      height 34px
      overflow initial

</style>

<style lang="stylus">
@import "../../../common/stylus/mixins.styl";
.replace-list
   .van-picker
      height 100%
      .van-picker__toolbar
         bottom-border-1px(#eaeaea)
      .van-picker__columns
      .van-picker__toolbar
         height 90px
         button
            font-size 30px
            color: rgba(24, 144, 255, 1)
      .van-picker-column__item
         font-size 30px
   .van-popup__close-icon
      display none
</style>