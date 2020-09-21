<template>
 <div class="room-item-wrapper">

    <div class="item-message">
        <div class="left">
            <img class="meeting" src="" alt="">
        </div>

        <div class="right" >
            <div class='meeting-name'>
                腾讯会议室
            </div>
            <div class="meeting-tag"> 
                123123123123123123123
            </div>
            <div class="detail-message">
                <div class="person-num">
                    <span class="iconfont ticobackicon-meeting_person"></span>
                     <span class='text'>15人</span>
                </div>
                <div class="location-num">
                    <span class="iconfont ticobackicon-meeting_location"></span>
                     <span class='text'>华控大厦6层</span>
                </div>
            </div>
        </div>
    </div>
    <Scale :count="count"></Scale>
 </div>
</template>
 
<script>

import Scale from './Scale';
const count = "2";
export default {
    components:{
        Scale,
    },
    data () {
    return {
        count,
    }
    }
}
</script>
 
<style scoped lang = "stylus">
   
  @import "../../common/stylus/mixins.styl";
    .room-item-wrapper
        height 284px
        width 100%
        display flex
        flex-direction column
        justify-content space-around
        bottom-border-1px(#cccccc)
        .item-message
            display flex
            
            .left
                width 208px
                height 136px
                background pink
                margin-right 41px 
            .right
                display flex
                flex-direction column
                justify-content space-between
                .meeting-name
                    font-size 32px
                    color #333
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
</style>