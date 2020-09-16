<template>
	<div id="addContact">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'添加参会人'" :rightText="`确定(${entryNum})`"></Header>
		<div class="headerSearch">
			<van-search class="vant-search" v-model="value" shape="round" @input="onSearch" @search="onSearch" placeholder="请输入搜索关键词" />
		</div>
		<div class="contactSettings">
			<ul class="contactItems">
				<li class="contactItem" @click="turnOutContact" @touchstart.prevent="turnOutContact">
					<van-icon class="contacIcon" name="wap-home" />
					<p class="contacText">外部联系人</p>
				</li>
				<p class="contactLine" />
				<li class="contactItem" @click="turnOutComponaryBook" @touchstart.prevent="turnOutComponaryBook">
					<van-icon class="contacIcon" name="wap-home" />
					<p class="contacText">企业通讯录</p>
				</li>
			</ul>
		</div>
		<p class="contentText">已选择的参会人</p>
		<div class="contactContainer" v-if="!show">
			<img class="contactImg" src="@/assets/logo.png" />
			<p class="contactOnlyText">暂无选择参会人</p>
		</div>
		<div class="contactUnix" v-if="show">
			<van-checkbox class="contactAllcheckbox" v-model="checked" @click.prevent="checkAllItems">复选框</van-checkbox>
			<ul class="contactBottom">
				<li v-for="(item, index) in letterArr" :key="index">
					<div v-if="dataArr[index]">
						<p class="contactBottomCaps">{{ item }}</p>
						<div class="contactBottomAuthor">
							<van-checkbox class="contactAllcheckbox" v-model="checkeds" @click.prevent="checkAllItemsKey(dataArr[index])" />
							<img class="contactAllImage" src="@/assets/logo.png" />
							<div class="contactNameAndPost">
								<p class="contactName">{{ dataArr[index].name }}</p>
								<p class="contactPost">{{ dataArr[index].post }}</p>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { CheckboxGroup, Toast } from 'vant';
export default {
	name: 'addContact',
	data() {
		return {
			value: '',
			show: true,
			checked: false,
			checkeds: false,
			selectUser: [],
			entryNum:'0',
			letterArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			dataArr: [
				{
					checkeds: true,
					id: '4',
					name: 'aa',
					post: '市场经理',
				},
				{
					checkeds: true,
					id: '5',
					name: '白飞飞',
					post: '市场经理',
				},
			],
		};
	},
	methods: {
		checkAllItems() {
			console.log(this.checked);
		},
		checkAllItemsKey(a, b) {
			console.log(a, b, this.checkeds);
    },
    headerLeft() {
			this.$router.go(-1);
		},
		headerRight() {},
		turnOutContact(){
			this.$router.push({path:'/addContact/outContact'})
		},
		turnOutComponaryBook(){
			this.$router.push({path:'/addContact/componaryBook'})
		},
		onSearch(val) {
			Toast(val);
		},
	},
	created() {},
};
</script>

<style lang="stylus">
  @import "../../common/stylus/mixins.styl";

#addContact
  background #f7f7f7
	height 100%




.headerSearch
   width 100%
   padding 0 20px
  .vant-search
    .van-search__content
      padding 15px 30px
.contactSettings
  width 100%
  .contactItems
    background-color #fff
    .contactItem
      display flex
      align-items center
      height 110px
      line-height 110px
      font-size 34px
      padding 0 20px
      .contacIcon
        align-items center
    .contactLine
      height 1px
      background #E7E7E7
      margin-left 30px
.contentText
  width 100%
  height 110px
  line-height 110px
  background #f7f7f7
  font-size 34px
  text-align left
  padding-left 30px
  color #BEBEBE
.contactContainer
  display flex
  flex-direction column
  justify-content center
  align-items center
  background #fff
  height 600px
  .contactImg
    width 200px
    height 200px
  .contactOnlyText
    font-size 34px
    color #BEBEBE
.contactUnix
  width 100%
  .contactAllcheckbox
    height 110px
    padding 0  0 0 32px
    background #fff
    font-size 34px
    .van-checkbox__icon--round
      margin-right 23px
      font-size 34px
  .contactAllImage
    width 84px
    height 84px
    border-radius 10px
    margin-right 10px
  .contactNameAndPost
    font-size 34px
    .contactName
      font-weight bold
      color #000
    .contactPost
      color #b8b8b8
  .contactBottom
    height 708px
    overflow-y auto
    .contactBottomCaps
      padding 10px 32px
      font-size 30px
      text-align left
    .contactBottomAuthor
      display flex
      align-items center
      background-color #fff
      .contactAllcheckbox
        font-size 34px
</style>
