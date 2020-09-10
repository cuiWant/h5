<template>
  <div class="enterPrisePart">
    <Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'添加参会人'" :rightText="`确定(7)`"></Header>
    <div class="headerSearch">
			<van-search class="vant-search" v-model="value" shape="round" @input="onSearchContact" @search="onSearchContact" placeholder="请输入搜索关键词" />
		</div>
    <ul class="contactBottom">
      <li v-for="(item, index) in userInfoArr" :key="index">
        <div class="contactBottomAuthor">
          <van-checkbox class="contactAllcheckbox" v-model="item.checkeds" @click.prevent="checkAllItemsKey(userInfoArr[index])" />
          <div class="contactAllRight">
            <img class="contactAllImage" src="@/assets/logo.png" />
            <p class="contactName">{{ item.name }}</p>
          </div>
        </div>
        <van-divider />
      </li>
    </ul>
    <Footer :makeSureNmu="makeSureNmu" :totalNmu="totalNmu" :listArr="listArr"></Footer>
  </div>
</template>

<script>
export default {
  name:'enterPrisePart',
  data(){
    return {
      value:'',
      makeSureNmu:'7',
      totalNmu:'1777',
      listArr:[
        {
          id:'1',
          name:'aaa',
        },
        {
          id:'2',
          name:'bbb',
        },{
          id:'3',
          name:'ccc',
        },{
          id:'4',
          name:'ddd',
        },
      ],
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
  mounted(){
    console.log(this.$route.query.key);
  },
  methods:{
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
  },
}
</script>

<style lang="stylus">
.enterPrisePart
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
    .van-divider--hairline
      background: #ccc;
      margin: 0 0 0 84px;
</style>