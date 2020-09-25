<template>
 <div class="replace-wrapper">
		<Header :leftClick="headerLeft" :rightClick="headerRight" :title="'重复'" rightText="完成"></Header>
      <div ref="wrapper" class="replace-list">

      <van-radio-group v-model="radio">
         <van-cell-group>
            <van-cell :class="`${index !=  (radioData.length-1) ? 'border-bottom' :''} cell`"  v-for="(item,index) in  radioData " :key="item.value" :title="item.text" clickable @click="radio = item.value" >
               <template #right-icon>
               <van-radio icon-size="25px" :name="item.value" />
               </template>
            </van-cell>
         </van-cell-group>
      </van-radio-group>
      <div class="line"></div>
         <van-cell v-if="radio"  @click.prevent="show=true"  title="重复次数" class="cell border-bottom"   is-link arrow-direction="down" :value="num" />
         <van-popup
            v-model="show"
            position="bottom"
            closeable
            :style="{ height: '34%' }"
         >
         <van-picker
               item-height="60px"
               visible-item-count="3"
               show-toolbar
               :columns="columns"
               @confirm="onConfirm"
               @cancel="onCancel"
               :default-index="defaultIndex"
               @change="onChange"
            />
         </van-popup>
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
         name:'replace',
         repeat_flag:false,
         num:'1次',
         radio:'',
         defaultIndex:0,
         show:false,
         radioData:[{
            text:'不重复',
            value:false,
         },
         // {
         //    text:'每个工作日(周一到周五)',
         //    value:"Mon,Tue,Wed,Thu,Fri",
         // },
         {
            text:'每天',
            value:'1'
         },
         {
            text:'每周',
            value:'Sun,Sat,Thu,Tue,Mon,Wed,Fri'
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
            let obj ={};
            if(!this.radio){
                  obj ={
               key:this.name,
               text:`不重复`,
               repeat_type: 'day',
               repeat_flag: false ,
               replaceCount:0,
               frequency:'',
               interval_flag:this.radio
               }   
               
            } else{
               obj = {
                 key:this.name,
                 text:`${radioText ? radioText.text:'无'} ${ this.num ? ','+this.num + '终止':''}`,
                 ["interval_flag"]:this.radio,
                 repeat_type: this.radio === '7' ? 'week':'day',
                 repeat_flag: !!this.radio.value && this.num.slice(0,1) > 1 ,
                 replaceCount:this.defaultIndex+1,
                 frequency:this.defaultIndex+1
               }
            }
            this.handleSubmit(obj)
            this.$router.push({path:'/home',})

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
   
.replace-list
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