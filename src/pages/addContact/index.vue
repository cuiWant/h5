<template>
	<div id="addContact">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'添加参会人'" :rightText="`确定(${result.length})`"></Header>
		<div class="headerSearch">
			<van-search class="vant-search" v-model="value" shape="round" @input="onSearch" @search="onSearch" placeholder="请输入搜索关键词" />
		</div>
		<div class="contactSettings">
			<ul class="contactItems">
				<!-- <li class="contactItem" @click="turnOutContact" > -->
				<li class="contactItem" :style="{opacity:0.3}"  >
					<div class="icon-container">
						<span class="iconfont ticobackicon-external_contact"></span>
					</div>
					<p class="contacText">外部联系人</p>
				</li>
				<p class="contactLine" />
				<li class="contactItem" @click="turnOutComponaryBook" >
					<div class="icon-container fe9">
						<span class="iconfont ticobackicon-address"></span>
					</div>
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
			<van-checkbox class="contactAllcheckbox" v-model="checked"   @click.prevent="checkAllItems(checked)">全选</van-checkbox>
		<div class="contactBottom" :style="{overflow:'hidden'}" ref="contact">

		<van-checkbox-group v-if="!value" class=" contactBottom-container"  v-model="result" ref="checkboxGroup" direction="horizontal">
			<ul style="width:100%">
				<li v-for="(item, index) in letterArr" :key="index">
					<div v-if="apiData[item] && apiData[item].SelectKey">
						<p class="contactBottomCaps">{{ item }}</p>

					<div class="contactBottomAuthor" v-for="(element) in apiData[item]" :key="element.id" >
						<div class="contactBottomAuthor" style="width:100%,height:100%" v-if="element.selectKey && element.selectKey.flag"  >
						<!-- <div  class="contactBottomAuthor" style="width:100%,height:100%"   v-if="true"> -->
						<van-checkbox class="contactAllcheckbox"   :name="element.id"  />
								<div class="contactAllImage">
									<span class="iconfont ticobackicon-avatar"></span>
								</div>
								<div class="contactNameAndPost">
									<p class="contactName">{{ element.cn_name }}</p>
									<p class="contactPost">{{ element.position }}</p>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
	
		</van-checkbox-group>
		<van-checkbox-group v-else class=" contactBottom-container"  v-model="result" ref="checkboxGroup" direction="horizontal">
			<ul style="width:100%">
				<li v-for="(item, index) in letterArr" :key="index">
					<div v-if="searchData[item] && searchData[item].SelectKey">
						<p class="contactBottomCaps">{{ item }}</p>

					<div class="contactBottomAuthor" v-for="(element) in searchData[item]" :key="element.id" >
						<div class="contactBottomAuthor" style="width:100%,height:100%" v-if="element.selectKey && element.selectKey.flag"   >
						<!-- <div  class="contactBottomAuthor" style="width:100%,height:100%"   v-if="true"> -->
						<van-checkbox class="contactAllcheckbox"   :name="element.id"  />
								<!-- <img class="contactAllImage" src="@/assets/logo.png" /> -->
								<div class="contactAllImage">
									<span class="iconfont ticobackicon-avatar"></span>
								</div>
								<div class="contactNameAndPost">
									<p class="contactName">{{ element.cn_name }}</p>
									<p class="contactPost">{{ element.position }}</p>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
	
		</van-checkbox-group>
		</div>
		</div>
			<van-popup v-model="userselect"  :lock-scroll="false" :overlay="false"  position="right" :style="{ width: '100%',height:'100%' }" >
			<keep-alive>  
				<router-view ref="_route" :letterArr="letterArr"  :userData="apiData" :handleSubmit="handleChidlren" :leftClick="routerLeftClick" ></router-view>
			</keep-alive>  
			</van-popup>
	</div>
</template>

<script>
import { CheckboxGroup, Toast } from 'vant';
import BScroll from 'better-scroll';
export default {
	name: 'addContact',
	props:{
		 leftClick:Function,
		 handleSubmit:Function
	},
	data() {
		return {
			userselect:false,
			value: '',
			show: true,
			checked: false,
			checkeds: false,
			result:[],
			apiData:{},
			selectUser: [],
			allData:[],
			entryNum:'0',
			letterArr: [],
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
	mounted(){
		this.$request.wechatQuery().then((res)=>{
			let { data={} } = res;
			this.apiData =data;
			for(let key in data){
				this.letterArr.push(key)
				this.allData.push(...data[key])
			}
			this.$nextTick(()=>{
			this._BScroll =	new BScroll(this.$refs.contact,{
				click:true
			})
			})
		})
	},
	methods: {
		checkAllItems(bool) {
			if(bool){
				this.$refs.checkboxGroup.toggleAll(true)

			}else{
				this.$refs.checkboxGroup.toggleAll(false)
			}
			
		},
		checkAllItemsKey(a, b) {
    },
    headerLeft() {
		 	this.$router.push({path:'/home',
            })
			this.leftClick();
		},
		headerRight() {
			let mapData= this.mapData
			let _result = this.result.map((id)=>{
				let current =mapData[id];
				let str = `${id},${current.mobile || 'null'},${current.cn_name}${current.email ? ','+ current.email :''}`
				return str
			});
			let text ="";
			if(_result.length > 0){
				let name =mapData[this.result[0]].cn_name;
				text = _result.length > 1 ? `${name}等${_result.length}人` : name
			}
			let submitObj = {
				key:'contact',
				text,
				attendee_id:_result
			};
			this.handleSubmit(submitObj)
			this.leftClick()
		},
		turnOutContact(){
			this.$router.push({path:'/addContact/outContact'})
		},
		turnOutComponaryBook(){
			this.userselect=true;
			this.$router.push({ path: '/home/addContact/componaryBook' });
		},
		onSearch(val) {
		},
		handleChidlren(resultId){
			for(let key in this.apiData){
				let flag = this.apiData[key].every((e)=>{
					return !e.selectKey
				})

				// 添加进来的 变成已选中
				this.apiData[key].forEach((e)=>{
					if(e.selectKey){
						this.result.push(e.id)
					}
				})
				this.apiData[key].SelectKey  = !flag;
			}
			this.apiData = {...this.apiData};
		},
		routerLeftClick(){
			this.userselect =false;
		},
	},

	created() {},
	computed:{
		searchData(){
			const _apiData ={};
			for(let key in this.apiData) {
				const _arr =[]
				this.apiData[key].forEach((e)=>{
					let flag = e.cn_name.indexOf(this.value) != -1
					if(flag){
						_arr.push(e)
					}
				})
				if(_arr.length){
					_apiData[key] = _arr
				}
			}
			for(let key in _apiData){
				let flag = _apiData[key].every((e)=>{
					return !e.selectKey
				})
				_apiData[key].SelectKey  = !flag;
			}

			return _apiData
		},
		mapData(){
			return this.allData.reduce((pre,e)=>{
				pre[e.id] = e;
				return pre
			},{})
    }

	}
};
</script>

<style lang="stylus">
  @import "../../common/stylus/mixins.styl";
#addContact
	background #f7f7f7
	height 100%
	.headerSearch
		width 100%
		.vant-search
			height 120px 
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
  height 87px
  line-height 87px
  background #f7f7f7
  font-size 28px
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
  height calc(100% - 88px - 220px - 120px - 87px - 110px)
  .contactAllcheckbox
    height 110px
    padding 0  0 0 32px
    font-size 34px
    background #fff
	width 100%
    .van-checkbox__icon--round
      margin-right 23px
      font-size 34px
  .contactAllImage
    width 84px
    height 84px
    border-radius 10px
    margin-right 27px
    margin-left 45px
  .contactNameAndPost
    font-size 34px
    .contactName
      font-weight bold
      color #000
    .contactPost
      color #b8b8b8
  .contactBottom
    height 100%
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
		.van-checkbox__label
			height 100%
			display flex
			align-items center
			background-color #fff
			margin-left 45px
			.contactNameAndPost
				height 84px
				display flex
				flex-direction column
				justify-content: space-around
</style>


<style lang="stylus">

#addContact
	.van-field__left-icon
		.van-icon-search
			// line-height 30px
	.van-checkbox__icon
		height auto 
		line-height normal
		.van-icon
			font-size 30px
	.vant-search
		.van-cell
			font-size 34px
			line-height 34px
		.van-icon
			line-height 40px
			font-size 34px
	.contactSettings
		.icon-container
			width: 66px
			height: 66px
			background-color: #15bc84;
			border-radius 50%
			display flex
			justify-content center
			align-items center
			margin-right 24px
			.iconfont 
				color #fff
		.fe9
			background #fe943e
	.contactUnix
		.contactBottom-container
			height auto


.contactAllImage
	display flex 
	justify-content center 
	align-items center
	background #53adffeb
	color #fff
	
	.iconfont
		font-size 38px

</style>