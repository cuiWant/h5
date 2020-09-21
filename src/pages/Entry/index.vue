<template>
 <div class="entry-container">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'会议预约'" rightText=""></Header>
        <div class="title-picture">
            <!-- <img class="img" src="@/assets/logo.png" alt=""> -->
            <svg class="icon img" aria-hidden="true">
                <use xlink:href="#ticobackicon-default"></use>
            </svg>
        </div>
        <div class="entry-select">
            <div class="entry-button top border-1px" @touchstart.prevent="topClick" @click="topClick" >
                <div class="left-content">
                    <div class="icon-container">
                        <span class="iconfont ticobackicon-shift"></span>
                    </div>
                    <div class="text-container">
                        <div class="top-text">
                            预约会议
                        </div>
                        <div class="bottom-text">
                            随时随地预约会议
                        </div>
                    </div>
                </div>
                <div class="right-content">
                    <van-icon name="arrow"  />
                    <van-icon name="arrow" class='middle' />
                    <van-icon name="arrow" class='right' />
                </div>

            </div>
            <div class="entry-button bottom border-1px" @touchstart.prevent="bottomClick" @click="bottomClick">
                <div class="left-content">
                    <div class="icon-container">
                        <span class="iconfont ticobackicon-meetinglist"  ></span>
                    </div>
                    <div class="text-container">
                        <div class="top-text">
                            预约会议
                        </div>
                        <div class="bottom-text">
                            随时随地预约会议
                        </div>
                    </div>
                </div>
                <div class="right-content">
                    <van-icon name="arrow"  />
                    <van-icon name="arrow" class='middle' />
                    <van-icon name="arrow" class='right' />
                </div>
            </div>
        </div>
 
 </div>
</template>
 
<script>
export default {
 data () {
 return {
 }
 },
 mounted(){
 },
 methods:{
     headerLeft(){
        this.$router.push('/login')
     },
    topClick(){
        this.$router.push('./home')
    },
    bottomClick(){
        this.$router.push('/allmeeting')
    },
    headerRight(){
        
    }
 }

}
</script>
 
<style scoped lang = "stylus">
 .entry-container
     height 100%
    .title-picture
        height 615px 
        width 100%
        box-shadow 0px 11px 24px 0px rgba(233, 233, 233, 0.39)
        .img    
            height 100% 
            width 100%
    .entry-select
        display flex
        height calc(100% - 615px - 88px)
        flex-direction column
        justify-content space-evenly
        align-items center
        .entry-button
            /* padding-left 85px  */
            padding-right 27px 
            width 628px
            height 170px
            box-shadow  0px 10px 16px 0px rgba(87, 141, 247, 0.16)
            border-radius 10px
            display flex 
            justify-content space-between
            align-items center
            .right-content
                .van-icon
                    font-size 33px
                    color: #94b7f9
                .middle
                    margin-left -20px
                    opacity .5
                .right
                    opacity .3
                    margin-left -20px
            .left-content
                display flex
                align-items center 
                .text-container
                    .top-text
                        font-size 36px
                        color #457ee8
                        margin-bottom 19px
                    .bottom-text
                        color #a8c1f0
                        font-size 26px
                .icon-container
                    /* position relative */
                    /* left -120px */
                    margin-left -30px
                    margin-right 30px
                    width 90px
                    background-image   linear-gradient(-44deg, #4289f2 0%, #78d5f4 100%), linear-gradient(#578ef5, #578ef5)
                    height 90px
                    border-radius: 10px
                    display flex
                    align-items center
                    justify-content center
                    >span 
                        /* background-image: linear-gradient(0deg, #dfebfc 0%, #ffffff 100%) */
                        font-size 44px
                        color #fff
                        /* box-shadow: 0px 2px 9px 0px rgba(52, 115, 217, 0.98) */
        .top
            border 1px solid  #b1c9f8
            background #e3edfc
        .bottom
           background  #e8fae9
           border 1px solid  #a1e3a5
           .left-content
                .text-container
                    .top-text
                        color #44be4b
                    .bottom-text
                        color #8dd691
                .icon-container
                    background-image   linear-gradient(-44deg, #43c24c 0%, #98f489 100%), linear-gradient(#578ef5, #578ef5)
            .right-content
                .van-icon
                    color #a5e4a9



</style>