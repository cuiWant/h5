<template>
	<div class="content">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'会议提醒'" rightText="完成"></Header>

		<div class="topContent">
			<ul>
				<li class="topKeyItem" @click="checkingItem('0')" @touchstart.prevent="checkingItem('0')">
					<div class="topItem" :class="checkIndex === '0' ? 'makesure' : ''">
						<p>5分钟前</p>
						<van-icon name="success" v-if="checkIndex === '0'" />
					</div>
					<van-divider />
				</li>
				<li class="topKeyItem" @click="checkingItem('1')" @touchstart.prevent="checkingItem('1')">
					<div class="topItem" :class="checkIndex === '1' ? 'makesure' : ''">
						<p>15分钟前</p>
						<van-icon name="success" v-if="checkIndex === '1'" />
					</div>
					<van-divider />
				</li>
				<li class="topKeyItem" @click="checkingItem('2')" @touchstart.prevent="checkingItem('2')">
					<div class="topItem" :class="checkIndex === '2' ? 'makesure' : ''">
						<p>25分钟前</p>
						<van-icon name="success" v-if="checkIndex === '2'" />
					</div>
					<van-divider />
				</li>
				<li class="topKeyItem" @click="checkingItem('3')" @touchstart.prevent="checkingItem('3')">
					<div class="topItem" :class="checkIndex === '3' ? 'makesure' : ''">
						<p>35分钟前</p>
						<van-icon name="success" v-if="checkIndex === '3'" />
					</div>
					<van-divider />
				</li>
				<li class="topKeyItem" @click="checkingItem('4')" @touchstart.prevent="checkingItem('4')">
					<div class="topItem" :class="checkIndex === '4' ? 'makesure' : ''">
						<p>45分钟前</p>
						<van-icon name="success" v-if="checkIndex === '4'" />
					</div>
					<van-divider />
				</li>
				<li class="topKeyItem" @click="checkingItem('5')" @touchstart.prevent="checkingItem('5')">
					<div class="topItem" :class="checkIndex === '5' ? 'makesure' : ''">
						<p>55分钟前</p>
						<van-icon name="success" v-if="checkIndex === '5'" />
					</div>
					<van-divider />
				</li>
			</ul>
		</div>
		<div class="bottomContent">
			<p>提醒方式</p>
			<div>
				<ul>
					<li class="btnItem" :class="checkNum === '0' ? 'btnNumClass' : ''" @click="checkingNum('0')" @touchstart.prevent="checkingNum('0')">
						<span>站内信</span>
					</li>
					<li class="btnItem" :class="checkNum === '1' ? 'btnNumClass' : ''" @click="checkingNum('1')" @touchstart.prevent="checkingNum('1')">
						<span>短信</span>
					</li>
					<li class="btnItem" :class="checkNum === '2' ? 'btnNumClass' : ''" @click="checkingNum('2')" @touchstart.prevent="checkingNum('2')">
						<span>电话</span>
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
			checkIndex: '1',
			checkNum: '1',
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
		headerRight() {},
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
