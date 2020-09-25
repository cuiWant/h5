<template>
        <van-popup class="alert-wrapper" v-model="show">
            <div class="alert-container">
                <div class="close">
                    <span class="iconfont ticobackicon-close" @click="close"></span>
                </div>
                  <div  class="img-container"> 
                        <img src="../../../public/prompt.svg" alt="">
                        <div class="hint">提示</div>
                        <div v-if="typeof hintText === 'string'" class="hint-text">{{hintText}}</div> 
                        <div v-else class="hint-text">
                            <div v-for="(item,index) in hintText" :key="index">
                                {{item}}    
                            </div>    
                        </div> 
                    </div>
                    <footer v-if="selectFlag" >
                        <div class="cancel" @click="close(false)">取消</div>
                        <div class="confirm" @click="close(true)" >确定</div>
                    </footer>
                    <div v-else class="footer-btn">
                        <div class='btn-text' @click="close(true)">确定</div>
                    </div>
            </div>
        </van-popup>
</template>
 
<script>
export default {
    props:{
        hintText:String | Array,
        confirm:Function,
        cancel:Function,
        select:Boolean
    },
 data () {
 return {
     show:false,
     flag:false,
     selectFlag:this.select || false,
     promise:new Promise(()=>{})
 }
 },
 methods:{
     async showFn(){
        this.show = true;
        return this.promise
    },
    closeFn(){
       
       this.show = false;
    },
    close(bool){
       if(bool){
           
           this.confirm && this.confirm()
       }else{
            this.cancel && this.cancel()
       }
       this.promise.then(()=>{
               return bool
           })
       this.show = false;
     }
 }
}
</script>
 
<style  lang = "stylus">
  @import "../../common/stylus/mixins.styl";

    .alert-wrapper
        width: 608px;
        height: 634px;
        border-radius: 20px;
        .alert-container
            height 100%
            display flex 
            flex-direction column
            justify-content space-between
            .close
                height 60px
                color #b8b8b8
                display flex
                align-items center
                justify-content flex-end
                .iconfont
                    margin-right 20px
        footer  
            height 71px
            display flex
            width 100%
            div
                display flex
                align-items center
                justify-content center
                width 50%
                top-border-1px(#ededed)
            .confirm
                color #1890ff
                border-left 1px #ededed solid
            .cancel 
                color #333
        .img-container
            display flex
            flex-direction  column
            justify-content space-between
            align-items center
            img 
                width 60%
            .hint
                padding 63px 0 40px
                font-size: 38px;
                color #333
                font-weight 600
            .hint-text
                color #666
                font-size 30px    
                min-height 90px
                margin-bottom 20px 
        .footer-btn
            display flex 
            align-items center
            justify-content center
            padding-bottom 10px
            box-sizing border-box 
            .btn-text
                color #fff
                width: 470px;
                height: 80px;
                background-color: #1890ff;
                box-shadow: 0px 5px 13px 0px rgba(24, 144, 255, 0.46);
                border-radius: 40px;
                display flex
                align-items center
                justify-content center
</style>