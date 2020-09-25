
<template>
 <div class="allmeeting-detail">
		<Header :leftClick="headerLeft" :rightClick="headerRight" :title="'会议详情'" ></Header>
        <div class="detail-title">
            <div class="title-content">
                <div class="theme"> {{theme}} </div>
                <div class="time"> {{timeText}} </div>
            </div>

        
        </div>
            <div ref="wrapper" class="message-container" >
                    <div class="message-content">
                        <div class="item" v-for="(item,index) in messageData" :key ="index">
                            <div class="left">
                                <span :class="`iconfont ${item.iconfont} `"></span>
                            </div>
                            <div class="right">
                                <div class="right-container">
                                    <div class="text">
                                        {{item.text}}
                                    </div>
                                    <div class="tag" v-if="item.tag">
                                        {{item.tag}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        <div class="footer"> 
            <div class="edit opacity" @click="handleEdit" >
                <div class="content">
                    <span class="iconfont ticobackicon-edit"></span>
                    <div>编辑会议</div>
                </div>
            </div>
            <div class="line"></div>
            <div class="edit" @click="handleCancel">
                <div class="content">
                     <span class="iconfont ticobackicon-meeting_cancel"></span>
                    <div>取消会议</div>
                </div>

            </div>
        </div>
        <Alert :confirm="()=>{  
            this.$loading.show()
            let { query } =this.$route;
             this.$request.cancelMeeting({
                id:query.id,
            }).then((res)=>{
                        this.$loading.close();
                        console.log(res,'res')
                    if(res.success){
                        this.$Toast({ type: 'success', message:res.err_msg || '成功' })

                     
                    }else{
                        this.$Toast({ type: 'danger', message: res.err_msg || '网络异常' })
                    }
            })}" :select="select" ref="alert" :hintText="hintText"></Alert>
 </div>
</template>
 
<script>
import Alert from '@/components/Alert'
export default {
     components:{
             Alert
          },
    props:{
        leftCallback:Function
    },
    data () {
    return {
        theme:'1',
        timeText:'',
        messageData :[],
        hintText:['确定要取消会议吗'],
        select:true
    }
    },
    mounted(){
        
        let { query } =this.$route;
        let { create_time, theme , start_time,end_time }  = query;
        this.$loading.show();
            this.$request.queryMeetingById({
                id:query.id
            }).then((res)=>{
            this.$loading.close();
                if(!res.success){
                    this.$Toast.fail('网络异常');
                    return
                }
                let query = res.data
                let { create_time, theme , start_time,end_time }= query;
                let $m = this.$moment;
                this.theme = theme;
                this.timeText = `${$m(start_time).format('MM月D日')} \xa0\xa0\ ${$m(start_time).format('hh:mm')} - ${$m(end_time).format('hh:mm')}\xa0\xa0\ ${$m(start_time).format('ddd')}`;
                let pattenConfig ={
                    "VIDEO":'视频会议',
                    "ENERGY":'节能会议',
                    "SMART":'智能会议',
                 };
                let reminders = {
                        "sys_message":'站内信',
                        "wx_work":'企业微信',
                        "email":'邮件'
                        };
                let arr = [
                    {
                        text:query.meeting_host_name,
                        tag:'主持人',
                        iconfont:"ticobackicon-meeting_organizer"
                    },
                    {
                        text: query.sys_users[0] ? query.sys_users[0].uname+ (query.sys_users.length > 1 ? '等' + query.sys_users.length + '人':''):'无参会人' ,
                        iconfont:"ticobackicon-meeting_person"
                    },
                    {
                        text:`会议室 : ${query.meeting_room.length > 1 ? query.meeting_room[0].room_cn_name + '等'+ query.meeting_room.length +'个' : query.meeting_room[0].room_cn_name}`,
                        iconfont:"ticobackicon-meeting_room"
                    },
                    {
                        text:`会议模式 : ${pattenConfig[query.meeting_patten]}`,
                        iconfont:"ticobackicon-meeting_type"
                    },
                    {
                        text:query.repeat_flag === 'true' ? '重复': '不重复',
                        iconfont:"ticobackicon-refresh"
                    },
                    {
                        text:`${query.reminders_time}分钟前, ${reminders[query.reminders] || "未知"}提醒`,
                        iconfont:"ticobackicon-meeting_remind"
                    },
                    {
                        text:query.meeting_introductio || '无简介',
                        iconfont:"ticobackicon-meeting_description"
                    },
                ];
                this.messageData = arr
            })
     

    },
        methods:{
        headerLeft(){
            this.$router.push('/allmeeting')
            this.leftCallback()
        },
        headerRight(){

        },
        handleCancel(){
            this.$refs.alert.showFn()
             
          
        },
        
        handleEdit(){
            // alert(1)
            return
        }
        }
}
</script>
 
<style  lang = "stylus">
    @import "../../../common/stylus/mixins.styl";


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
            height calc(100% - 88px - 110px - 218px)
            /* background pink */
            width 100%
            display flex
            color #333
        .message-content
            width 100%
            .item
                width 100%
                height 110px
                display flex
                .left
                    width 95px
                    height 100%
                    font-size 34px
                    display flex
                    justify-content center
                    align-items center
                .right
                    width calc(100% - 95px)
                    height 100%
                    display flex
                    justify-content flex-start
                    align-items center
                    border-bottom  1px solid #f3f3f3
                    .right-container
                        display flex
                        align-items center
                        .text
                            margin-right 20px
                            font-size 34px
                            color #333
                        .tag
                            color  #1890ff
                            font-size 22px 
                            background rgba(24, 144, 255, .2)
                            border-radius: 4px;
                            display flex
                            align-items center
                            width: 95px
                            height: 40px
                            padding 4px
                            justify-content center

</style>