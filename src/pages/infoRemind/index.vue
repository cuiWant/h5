<template>
	<div class="content">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'会议提醒'" rightText="完成"></Header>

		<div class="topContent">
			<ul>
				
				<li class="topKeyItem" v-for="(item,index) in  checkData" :key="index"  @click="checkingItem(index)" @touchstart.prevent="checkingItem(index)">
					<div class="topItem" :class=" checkIndex === index ? 'makesure' : ''">
						<p>{{item.text}}</p>
						<van-icon name="success" v-if="checkIndex === index" />
					</div>
					<van-divider />
				</li>
			</ul>
		</div>
		<div class="bottomContent">
			<p>提醒方式</p>
			<div>
				<ul>
					<li v-for="(item,index) in checkMessage" :key="index" class="btnItem" :class="checkNum === index ? 'btnNumClass' : ''" @click="checkingNum(index)" @touchstart.prevent="checkingNum(index)">
						<span>{{item.text}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			checkIndex: 0,
			checkNum: 0,
			checkData:[
				{text:'5分钟前',value:5},
				{text:'10分钟前',value:10},
				{text:'15分钟前',value:15},
				{text:'30分钟前',value:30},
				{text:'1小时前',value:60},
				{text:'1天前',value:1440}
			],
			checkMessage:[{
					text:'站内信',value:1
					},{
					text:'企业微信',value:2
					},{
						text:'邮件',value:4
						}]		
		};
	},
	methods: {
		checkingItem(index) {
			this.checkIndex = index;
		},
		checkingNum(index) {
			this.checkNum = index;
		},
		headerLeft() {
			this.$router.go(-1);
		},
		headerRight() {
			let current = this.checkData[this.checkIndex];
			let obj = {
				reminders_time:current.value,
				reminders:this.checkMessage[this.checkNum].value,
				text:`${current.text},${this.checkMessage[this.checkNum].text}`,
				key:'remindersText'
			}
			this.$router.push({path:'/home',query:obj});
		},
	},
};
</script>

<style lang="stylus">
.content
  height:100%
  .topContent
    .topKeyItem
      height 110px
      .topItem
        display flex
        justify-content space-between
        padding 15px 30px
        font-size 34px
      .makesure
        color #3D9EFF
  .bottomContent
    display flex
    justify-content space-between
    font-size 34px
    padding 15px 30px
    .btnItem
      font-size 30px
      display inline-block
      border 0.5px solid #3D9EFF
      padding 4px 15px
      color #3D9EFF
    .btnNumClass
      background-color #1890FF
      color #fff
</style>
