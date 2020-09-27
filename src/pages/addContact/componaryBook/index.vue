<template>
  <div class="addOutContact">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'企业通讯录'" :rightText="``"></Header>
    <div class='search-wrapper'>
   <div class="room-search">
               <van-search
               v-model="value"
               shape="round"
               placeholder="请输入搜索关键词"
               />

         </div>
    </div>
      <div class="check-all">
		      	<van-checkbox class="contactAllcheckbox" v-model="checkAll"  @click.prevent="checkAllItems(checkAll)">全选</van-checkbox>
      </div>
    <div class="user-wrapper">
  <div class="contactBottom" :style="{overflow:'hidden'}" ref="contact">
		<van-checkbox-group  v-if="!value" class=" contactBottom-container"  v-model="result" ref="checkboxGroup" direction="horizontal">
			<ul style="width:100%">
				<li v-for="(item, index) in letterArr" :key="index">
					<div v-if="apiData[item]">
						<p class="contactBottomCaps">{{ item }}</p>
						<div class="contactBottomAuthor" v-for="(element) in apiData[item]" :key="element.id" >
					    <van-checkbox class=" contactAllcheckbox"  :name="element.id"  >
							 <div class="contactAllImage">
                        <span class="iconfont ticobackicon-avatar"></span>
                </div>
              <div class="contactNameAndPost">
                <div class="contactName">{{ element.cn_name }}</div>
                <div class="contactPost">{{ element.position }}</div>
              </div>
              </van-checkbox>
						</div>
					</div>
				</li>
			</ul>
	</van-checkbox-group>
  		<van-checkbox-group  v-else class=" contactBottom-container"  v-model="result" ref="checkboxGroup" direction="horizontal">
			<ul style="width:100%">
				<li v-for="(item, index) in letterArr" :key="index">
					<div v-if="searchData[item]">
						<p class="contactBottomCaps">{{ item }}</p>
						<div class="contactBottomAuthor" v-for="(element) in searchData[item]" :key="element.id" >
					    <van-checkbox class="contactAllcheckbox"  :name="element.id"  />
							 <div class="contactAllImage">
                        <span class="iconfont ticobackicon-avatar"></span>
                      </div>
							<div class="contactNameAndPost">
								<p class="contactName">{{ element.cn_name }}</p>
								<p class="contactPost">{{ element.position }}</p>
							</div>
						</div>
					</div>
				</li>
			</ul>
	</van-checkbox-group>
		</div>
    </div>
      <div class="footer">
         <div class="text-container">
            <span class="text">
               以选择: {{result.length}}个
            </span> 
            <van-icon name="arrow-up" @click="selectUser=true" />
            </div>
            
         <div class="btn" @click="adduser">
            确定({{result.length}}/{{allData.length}})
         </div>
    </div>
    	<van-popup v-model="selectUser"  :lock-scroll="false" :overlay="false"  position="bottom" :style="{ width: '100%',height:'100%' }" >
      <div class="select-user-wrapper">
        <Header ref="header" :leftClick="_headerLeft" :rightClick="_headerRight" :title="'已选参会人'" :rightText="``"></Header>
        <div class="select-user-list" ref="selectUser" >
            <div class="user-container">
                <div v-for="(item,index) in result" :key="index" class="user-item">
                  <div class="user-left" @click="_delete(index)">
                    <span class="ticobackicon-meeting_cancel iconfont"></span>
                  </div>
                  <div class="user-right">
                    <div class="avatar">
                      <div class="contactAllImage">
                        <span class="iconfont ticobackicon-avatar"></span>
                      </div>
                    </div>
                    <div class="text">
                      <div class="name"> {{mapData[item].cn_name}}</div>
                      <div class="position"> {{mapData[item].position}}</div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
        
      </van-popup>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  props:{
    leftClick:Function,
    handleSubmit:Function,
    userData:Object,
    letterArr:Array
  },
  name:'componaryBook',
  data(){
    const allData = [];
    if(this.userData){
      for (let key in this.userData ){
          this.userData[key] && allData.push(...this.userData[key])
      }
    }
    // 优化使用 单例模式 ===== 使用
    this.selectKey={}
    return {
      checkAll:false,
      index:'0',
      result:[],
      selectUser:false,
			apiData:this.userData || [],
      checked: false,
      value:'',
      allData,
      
    }
  },
  	mounted(){
      this.$nextTick(()=>{
        this._BScroll =	new BScroll(this.$refs.contact,{
              click:true
          })

      });
  },
  updated(){
    // const allData = [];
    // if(this.userData){
    //   for (let key in this.userData ){
    //       this.userData[key] && allData.push(...this.userData[key])
    //   }
    // }
    // this.allData = allData;
    // this._BScroll.refresh();
  },
  methods:{
    headerLeft() {
      this.leftClick()
			this.$router.go(-1);
		},
    headerRight() {},
    _headerRight() {},
    _headerLeft(){
      this.selectUser = false;
    },
  _delete(index){
    this.result.splice(index,1);
  },
  checkAllItems(bool){
    	if(bool){
				this.$refs.checkboxGroup.toggleAll(true)

			}else{
				this.$refs.checkboxGroup.toggleAll(false)
      }
  },
  adduser(){

    // 处理前面的标记显示 
    if(this.selectKey.flag){
      this.selectKey.flag  =false;
      this.selectKey = {flag:true};
    }else{
      this.selectKey.flag = true;
    }
        this.result.forEach((_key)=>{
          this.mapData[_key].selectKey = this.selectKey;
      
        
        })

        this.leftClick()
        this.handleSubmit();
  }
  },
  watch:{
    result(){
    },
    selectUser(){
         if(!this.selectUser){
               return
            }
            setTimeout(()=>{
               if(this._selectBscroll){
                  this._selectBscroll.refresh()
                  return
               }
              this._selectBscroll = new BScroll(this.$refs.selectUser,{
                click:true
              })
            },500)
    }

  },
  computed:{
    searchData(){
      const arr = [];
      for(let key in this.apiData){
        let item  = this.apiData[key] || []
        let _arr = []
        item.forEach((element)=>{
           if(element.cn_name.indexOf(this.value) !== -1){
             _arr.push(element);
           }  
        })
        if(_arr.length){
            arr[key] = _arr
        }
      }
      return arr
    },
    mapData(){
      return this.allData.reduce((pre,e)=>{
        pre[e.id] = e;
        return pre
      },{})
    }
  }
}
</script>

<style lang="stylus">
  @import "../../../common/stylus/mixins.styl";

.addOutContact  
    height 100%
    .check-all
        height 110px 
        display flex 
        padding-left 32px
        color #333
        .van-checkbox__label
            margin-left 45px
            font-size 35px
            font-weight bold
    .search-wrapper
        display flex
        align-items center
        justify-content center
        width 100%
        height 120px
        .room-search
          width 100%
        .van-search
              width 100%
              height 78px
              padding  0 32px
              /* .van-field__body */
              .van-cell
                  height 78px 
                  font-size 34px  
                  line-height 78px
                  .van-icon
                    font-size 32px
              .van-search__content
                  padding-left 30px
    .user-wrapper
        height calc(100% - 120px - 88px -  98px - 110px)
        .contactUnix
          width 100%
          height 100%
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
            background #1890ff
            width 84px
            height 84px
            border-radius 10px
            margin-right 27px
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
                    justify-content: space-around;
    .footer
      height 98px      
      display flex
      justify-content space-between
      align-items center
      padding 0 31px
      top-border-1px(#f7f7f7)
      .text-container 
         color #1890ff
         align-items center
         justify-content center
         font-size 28px
         /* .text  */
         .van-icon 
            padding-top 10px
            font-weight bold 
      .btn
         width 204px
         font-size 28px
         height 61px
         background #1890ff
         border-radius 4px
         display flex
         align-items center
         justify-content center
         color #fff
  .select-user-wrapper
      height 100%
      .select-user-list
        height calc(100% - 88px)
        overflow hidden
        display flex
        .user-container
          width 100%
          // height 100%
          .user-item
            height 120px
            display flex
            .user-left
              width 101px
              height 100%
              display flex
              align-items center
              justify-content center
              .iconfont
                color #f22424
                font-size 46px
                transform rotate(-45deg)
            .user-right 
              width calc(100% - 101px)
              height 100%
              bottom-border-1px(#f3f3f3)
              display flex
              align-items center
              .avatar                                                                         
                  height 84px
                  width 84px
                  margin-right 27px
                  // align-items center
                  // justify-content center
                  .contactAllImage
                    width 100%
                    height 100%
                  img   
                    height 100%
                    width 100%
                .text
                  font-size 34px
                  .name
                    font-weight bold
                  .position
                      font-size 30px
                      color #b8b8b8


</style>

