<template>
 <div class="room-item-wrapper">

    <div class="item-message">
        <div class="left">
            <img v-if="item.img_path && hrefFlag" class="meeting" @error="hrefError" :src="item.img_path" alt="">
            <div v-else>
                <span class="iconfont ticobackicon-meeting_room"></span>
            </div>
        </div>

        <div class="right" >
            <div class='meeting-name'>
                {{item.room_cn_name}}
            </div>
            <div class="meeting-tag" v-if="roomType"> 
                {{roomType}}
            </div>
            <div class="detail-message">
                <div class="person-num">
                    <span class="iconfont ticobackicon-meeting_person"></span>
                     <span class='text'>{{item.large_num}}人</span>
                </div>
                <div class="location-num">
                    <span class="iconfont ticobackicon-meeting_location"></span>
                    <div class='text'>{{item.floor_name}}</div>
                </div>
            </div>
        </div>
    </div>
    <Scale :count="count" :useTime="item.meeting_room_appointment_dtos"></Scale>
 </div>
</template>
 
<script>

import Scale from './Scale';
const count = "2";
export default {
    props:{
        item:Object
    },
    components:{
        Scale,
    },
    data () {
    return {
        count,
        hrefFlag:true,
        radioData:{
            VIDEO:'视频会议',
            SMART:'智能会议',
            ENERGY:'节能会议'
        },
        roomType:'',
        
    }
    },
    mounted(){
        this.resetFn()
    },
    methods:{
        resetFn(){
        let arr = this.item.meeting_type_arr;
            this.roomType= arr.reduce((pre,e)=>{

            return pre+this.radioData[e]+'/'
        },'').slice(0,-1)
        },
        hrefError(e){
            this.hrefFlag=false
        }
    },
    watch:{
        item(){
            this.resetFn()
        }
    }
}
</script>
 
<style scoped lang = "stylus">
   
  @import "../../common/stylus/mixins.styl";
    .room-item-wrapper
        height 100%
        width 100%
        display flex
        flex-direction column
        /* justify-content space-between */
        bottom-border-1px(#cccccc)
        .item-message
            display flex
            
            .left
                width 208px
                height 136px
                background #fff
                margin-right 41px 
                img 
                    height 100%
                    width 100%
                div
                    height 100%
                    width 100%
                    display flex
                    justify-content center
                    align-items center
                    background #f2f5f8
                    .iconfont
                        color #d8d9db
                        font-size 53px

            .right
                display flex
                flex-direction column
                justify-content space-between
                .meeting-name
                    font-size 32px
                    color #333
                    line-height 32px
                .meeting-tag
                    width 335px
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
                    font-size 24px
                    padding 14px 
                    color #1890ff
                    background #e3f2ff
                    border-radius 4px
                    box-sizing border-box
                .detail-message
                    display flex
                    font-size 24px
                    color #666
                    /* justify-content space-between */
                    .person-num
                        margin-right 52px
                    .location-num
                        display flex
                        align-items center
                        .text
                            line-height 28px
                            width 7em
                            height 23px
                            font-size 24px
                            white-space nowrap
                            overflow hidden
                            text-overflow ellipsis
        .scale-wrapper
            margin 30px 0
</style>