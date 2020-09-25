
<template>
 <div class="allmeeting-detail">
		<Header :leftClick="headerLeft" :rightClick="headerRight" :title="'会议详情'" ></Header>
        <div class="detail-title">
            <div class="title-content">
                <div class="theme"> {{theme}} </div>
                <div class="time"> {{timeText}} </div>
            </div>
            <div ref="wrapper" class="message-container">
                    <div class="message-content">
                        <div class="item">
                            <div class="left">
                                <span :class="`iconfont ticobackicon-meeting_organizer `"></span>
                            </div>
                            <div class="right">
                                <div></div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
 
 </div>
</template>
 
<script>
export default {
    props:{
        leftCallback:Function
    },
    data () {
    return {
        theme:'1',
        timeText:''
    }
    },
    mounted(){
        let { query } =this.$route;
        let $m = this.$moment;
        let { create_time,theme }  = query;
        this.theme = theme;
        this.timeText = $m(create_time).format('MM-D');
    },
        methods:{
        headerLeft(){
            this.$router.push('/allmeeting')
            this.leftCallback()
        },
        headerRight(){

        }
        }
}
</script>
 
<style  lang = "stylus">
    .allmeeting-detail
        height 100% 
        width 100%
        .detail-title
            height 218px 
            width 100%
            padding 30px
            .title-content
                padding 41px 0
                height 174px
                width 100%
                background-color: #ffffff;
                box-shadow: 0px 1px 16px 0px rgba(236, 236, 236, 0.72)
                border-radius: 16px
                padding-left 42px
                color: #333333;
                display flex
                flex-direction column
                justify-content space-between
                .theme 
                    font-size: 38px;
                .time
                    font-size: 30px;
        .message-container
            height 918px
            background pink
            width 100%
            display flex
            color #333
        .message-content
            width 100%
            .item
                width 100%
                height 110px
                background #eee
                display flex
                .left
                    width 95px
                    height 100%
                    font-size 34px
                    display flex
                    justify-content center
                    align-items center

</style>