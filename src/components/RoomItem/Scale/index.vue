<template>
 <div class="scale-wrapper" ref="scaleRef"  >
     <ul class="scale-content"   >
                <li class="item " v-for="(element,i) in scaleData" :key="element.time">
                    <div class="block-container">
                        <div  :class="`block ` "  v-for="(item,index) in itemNum" :key="item">
                            <div v-if ="  !element.activeIndex[index]" class='white'></div>
                            <div v-else class='gray'></div>
                        </div>
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
    // testArr:[{
    //     end_time: "2020-09-20 14:45:18",
    //     start_time: "2020-09-20 12:15:15"
    // }]
 }
 },
 mounted(){
    this.handleActive();
 },
 updated(){
     
 },
 methods:{
        handleActive(){
            const scaleData= []

            for (let i = 0; i <= 10; i++) {
                scaleData[i] = {
                    time:i + addTime,
                    activeIndex:[]
                }
                    
                }
            this.useTime.forEach((e)=>{
                let start = this.$moment(e.start_time).format('HH:mm')
                let end = this.$moment(e.end_time).format('HH:mm')
                let [startIndex,startMinute] = start.split(':');
                let [endIndex,endMinute] = end.split(':');
                if(startIndex === endIndex){
                    let handleArr = scaleData[startIndex-addTime].activeIndex;
                    let bool = endMinute - startMinute > 30  
                    let count = this.count || 2;
                   if( bool ){
                            for(let i = 0; i< count; i++){
                               handleArr[i] = true
                            }
                        }else{
                            // let num = 0
                            if(startMinute >= 30){
                                // num  = count/2
                                handleArr[1] = true

                            }else{
                                handleArr[0] = true

                            }
                            //   for(let i = count/2; i< count; i++){
                            //       handleArr[i + num] = true
                            //       console.log(handleArr,i + num)
                            // }
                    }
                }
                for (let i  = Number(startIndex); i < Number(endIndex); i++ ){
                    let count = this.count || 2;
                    let index = i-addTime;  //真正的下表
                    if(!scaleData[index]){
                        break
                    } 
                    let handleArr = scaleData[index].activeIndex;
                    if(i === startIndex ){
                        let bool = (startMinute-0) < 30
                        if(bool ){
                            for(let i = 0; i< count; i++){
                               handleArr[i] = true
                            }
                        }else{
                            handleArr[0] = true
                        }
                        // for(let i = 0; i< count; i++){
                        //     handleArr[i] = true
                        // }
                    }else if( i === endIndex){
                        let bool = (endMinute-0) > 30
                        if(bool ){
                            for(let i = 0; i< count; i++){
                               handleArr[i] = true
                            }
                        }else{
                            handleArr[1] = true
                        }
                    }else{
                        for(let i = 0; i< count; i++){
                            handleArr[i] = true
                        }
                        // []
                        
                    }
                    
                }
           })
           this.scaleData =scaleData;
           this.itemNum =[...this.itemNum];
        } 
 },
 watch:{
     useTime(){
        this.handleActive();
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
        .white
            height 100%
            width 100% 
            background #fff 
        .gray
            height 100%
            width 100% 
            background #eff2f5
                

            
</style>