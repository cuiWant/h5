<template>
 <div class="entry-container">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'会议预约'" rightText=""></Header>
        <div class="title-picture">
            <img src="@/assets/logo.png" alt="">
        </div>
        <div class="entry-select">
            <div class="entry-button top" @touchend="topClick" >
                <div class="left-content">
                    <div class="icon-container">

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
            <div class="entry-button bottom">2</div>
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
     console.log(this.$store,'this')
 },
 methods:{
     headerLeft(){
        this.$router.go(-1)
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
        >img    
            height 100% 
            width 100%
    .entry-select
        display flex
        height calc(100% - 615px - 88px)
        flex-direction column
        justify-content space-around
        align-items center
        .entry-button
            padding-right 27px 
            width 628px
            height 170px
            background aqua
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

        .top
            background #e3edfc
        .bottom
           background  #e8fae9


</style>