<template>
 <div class="scale-wrapper" ref="scaleRef"  >
     <ul class="scale-content"   >
                <li class="item " v-for="(element,i) in scaleData" :key="element.time">
                    <div class="block-container">
                        <div  :class="`block  ${element.activeIndex[index] ? 'active' :''}` "  v-for="(item,index) in itemNum" :key="item"></div>
                    </div>
                    <div class="count">
                        <span :class=" element.time > 9 ? 'left' : ''">
                            {{element.time}}
                            </span>
                        <span class="end" v-if="i === (scaleData.length-1)" >
                            {{element.time + 1}}
                            </span>
                            </div>
                </li>

     </ul>
 </div>
</template>
 
<script>
const addTime= 8;
// import BScroll from'better-scroll';
export default {
    props:{
        count:String,
        useTime:Array
    },
 
 data () {
    let scaleData = [];
    const itemNum = [];  
     for (let i = 0; i <= 10; i++) {
        scaleData[i] = {
            time:i + addTime,
            activeIndex:[]
        }
         
     }
    for (let i = 1; i < (this.count || 2); i++) {
        itemNum[i] = i
         
     }
 return {
    config:[],
    itemNum:itemNum,
    scaleData,
    testArr:[{
        end_time: "2020-09-20 14:45:18",
        start_time: "2020-09-20 12:15:15"
    }]
 }
 },
 mounted(){
    //  new BScroll(this.$refs.scaleRef,{
    //     scrollX:true
    //  });
    this.handleActive()

 },
 updated(){
     
 },
 methods:{
        handleActive(){
            function addActiveFlag (bool){

            }
            this.testArr.forEach((e)=>{
                let start = this.$moment(e.start_time).format('HH:mm')
                let end = this.$moment(e.end_time).format('HH:mm')
                let [startIndex,startMinute] = start.split(':');
                let [endIndex,endMinute] = end.split(':');
                for (let i  = Number(startIndex); i < Number(endIndex); i++ ){
                    let count = this.count || 2;
                    let index = i-addTime;  //真正的下表
                    let handleArr = this.scaleData[index].activeIndex;
                    if(i === startIndex ){
                        let bool = this.scaleData[index] - 15 > 0 
                        if(bool ){
                            for(let i = 0; i< count; i++){
                               handleArr[i] = true
                            }
                        }else{
                              for(let i = count/2; i< count; i++){
                               handleArr[i] = true
                            }
                        }
                        // for(let i = 0; i< count; i++){
                        //     handleArr[i] = true
                        // }
                    }else if( i === endIndex){
                    let bool = this.scaleData[index] - 15 > 0 
                        if(!bool ){
                            for(let i = 0; i< count; i++){
                               handleArr[i] = true
                            }
                        }else{
                              for(let i = count/2; i< count; i++){
                               handleArr[i] = true
                            }
                        }
                    }else{
                        for(let i = 0; i< count; i++){
                            handleArr[i] = true
                        }
                        // []
                        
                    }
                    
                }
           })
           this.itemNum =[...this.itemNum]
        } 
 }
}
</script>
 
<style scoped lang = "stylus">
@import "../../../common/stylus/mixins.styl";
 
 
    .scale-wrapper
        height 57px 
        width 100%
        display flex
        overflow hidden
        .scale-content
            height 100%
            display flex
            width auto
            .item
                &:nth-child(1)
                    .block-container
                        .block
                            &:nth-child(1)
                                border-left 1px solid #f0f1f4
                .block-container
                    display flex
                    .block  
                        box-sizing border-box
                        border 1px solid #f5f6f8
                        border-left none
                        height 32px
                        /* width 32px */
                        width 28.8px
                        background #fff
                    .active
                        background #eff2f5 
            .count
                display flex
                color #606266
                font-size 22px
                .left {
                    margin-left -20px
                }
                .end
                    margin-left: 25px;

                    

            
</style>