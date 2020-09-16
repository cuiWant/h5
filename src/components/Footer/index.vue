<template>
  <div class="Footer">
    <van-divider :style="{ borderColor: '#ccc',margin:0}"/>
    <div class="footerNav" v-if="!show">
      <div class="footerLeft">
        <span class="footerLeftNum">已选择：{{makeSureNmu}}人</span>
        <van-icon class="footerLeftIcon" :name="show?'arrow-up':'arrow-down'" @click="atChangeIcon" @touchstart.prevent="atChangeIcon"/>
      </div>
      <van-button class="footerEneter" type="info">确定({{makeSureNmu}}/{{totalNmu}}})</van-button>
    </div>
    <van-action-sheet style="height:100%" v-model="show">
      <van-divider :style="{ borderColor: '#ccc',margin:0}"/>
      <div class="footerNav">
        <div class="footerLeft">
          <span class="footerLeftNum">已选择：{{makeSureNmu}}人</span>
          <van-icon class="footerLeftIcon" :name="show?'arrow-up':'arrow-down'" @click="atChangeIcon" @touchstart.prevent="atChangeIcon"/>
        </div>
        <van-button class="footerEneter" type="info">确定({{makeSureNmu}}/{{totalNmu}}})</van-button>
      </div>
      <ul class="userInfoItems">
        <li v-for="item in listArr" class="userInfoItem" :key="item.id">
          <div class="userInfoItemWrap">
            <img src="@/assets/logo.png" class="userInfoImg">
            <p class="userInfoName">{{item.name}}</p>
          </div>
          <van-divider :style="{ borderColor: '#ccc',margin:0}"/>
        </li>
      </ul>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name:'Footer',
  props:{
    makeSureNmu:String,
    totalNmu:String,
    listArr:Array,
  },
  data(){
    return {
      show: false,
    }
  },
  methods:{
    atChangeIcon(){
      this.show = !this.show
    },
     onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name);
    },
  }
}
</script>

<style lang="stylus">
.Footer
  width 100%
  position fixed
  bottom 0
  .van-action-sheet__header
    display none
  .footerNav
    display flex
    align-items center
    justify-content space-between
    padding 15px 20px
    .footerLeft
      .footerLeftNum
        color #2796FF
        font-size 30px
      .footerLeftIcon
        margin-left 25px
        font-weight 800
        vertical-align bottom
        font-size: 40px
        color #2796FF
    .footerEneter
      padding: 30px 20px
      border-radius: 5px
  .userInfoItems
    width 100%
    .userInfoItem
      .userInfoItemWrap
        display flex
        align-items center
        .userInfoImg
          width 84px
          height 84px
          margin: 15px 20px;
</style>