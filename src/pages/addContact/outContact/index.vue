<template>
  <div class="addOutContact">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'添加参会人'" :rightText="`确定(7)`"></Header>
    <div class="headerSearch">
			<van-search class="vant-search" v-model="value" shape="round" @input="onSearchContact" @search="onSearchContact" placeholder="请输入搜索关键词" />
		</div>
    <ul class="contactBottom">
      <li v-for="(item, index) in userInfoArr" :key="index">
        <div class="contactBottomAuthor">
          <van-checkbox class="contactAllcheckbox" v-model="item.checkeds" @click.prevent="checkAllItemsKey(userInfoArr[index])" />
          <div class="contactAllRight" @click="checkContactItems" @touchstart.prevent="checkContactItems(item.name)">
            <img class="contactAllImage" src="@/assets/logo.png" />
            <p class="contactName">{{ item.name }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'outContact',
  data(){
    return {
      value:'',
      userInfoArr:[
        {
          checkeds:true,
          name:'总裁办'
        },
        {
          checkeds:false,
          name:'财务室'
        },
        {
          checkeds:true,
          name:'投资管理部'
        },
        {
          checkeds:false,
          name:'产品事业部'
        },
      ],
    }
  },
  methods:{
    //点击部门
    checkContactItems(key){
      console.log(key);
      this.$router.push({path:'/addContact/outContact/enterPrisePart',query:{key:key}})
    },
    //勾选任意项
    checkAllItemsKey(key){
      console.log(key);
    },
    //添加参会人-搜索
    onSearchContact(){
      console.log('sousuo');
    },
    headerLeft() {
			this.$router.go(-1);
		},
		headerRight() {},
  }
}
</script>

<style lang="stylus">
.addOutContact
  width 100%
  .contactBottom
    width 100%
    background-color #fff
    .contactBottomAuthor
      height 110px
      display flex
      align-items center
      .contactAllcheckbox
        padding 0 30px
        .van-checkbox__icon--round
          font-size 34px
      .contactAllRight
        display flex
        width 100%
        .contactAllImage
          width 84px
          height 84px
          border-radius 10px
          margin-right 10px

</style>