<template>
	<div class="login-wrapper">
		<div class="container">
			<div class="title-content">
				<div class="title-text">您好!</div>
				<div class="title-text" @click="click">欢迎使用会议预约</div>
			</div>
			<van-form @submit="login">
			<div class="message-content">
				<!-- <van-field v-model="password" type="password" label="密码" /> -->
				<div class="user-container">
					  <van-field
						v-model="username"
						name="username"
						label="用户名"
						placeholder="用户名"
					/>
				</div>
				<div class="pwd-container">
				 <van-field
					v-model="password"
					type="password"
					name="password"
					label="密码"
					placeholder="密码"
				/>
				</div>
			</div>
			<div class="button-content">
				<van-button :disabled="!(username && password)" round  type="info"  native-type="submit" >登录</van-button>
			</div>

				</van-form >
		</div>
	</div>
</template>

<script>
export default {
	data() {
		 return {
			username: localStorage.getItem('username') || '',
			password: localStorage.getItem('password') ||'',
	};
	
	},
	methods:{
		click(){
			},
		login(values){

			let {
				username,
				password
			 } = values;
			this.$loading.show();
			this.$request.login({
				username,
				password
			}).then((res)=>{
				if(!res.success){
					// 失败后不操作
					return 
				}
				let { data={} } = res;
				//保存用户信息
				localStorage.setItem('username',username);
				localStorage.setItem('password',password);
				// this.$router.push('/entry')
				this.$router.push('/entry')
				this.$store.dispatch('recordUser',data)
				localStorage.setItem('user',JSON.stringify(data));
				
					// console.log(res,'res')
			})
         			//  this.$store.dispatch('recordUser', user)
		}
	}
};
</script>

<style  lang="stylus">
@import "../../common/stylus/mixins.styl";


.login-wrapper
	height 100%
	padding 207px 75px 247px
	box-sizing border-box
	.container
		display flex
		flex-direction column
		justify-content space-around
		height 100%
		.title-content
			// margin-bottom 114px
			.title-text
				display flex
				font-family: PingFangSC-Medium;
				font-size: 50px;
				font-weight: normal;
				font-stretch: normal;
				line-height: 66px;
				letter-spacing: 0px;
				color: #333333;
		.message-content
				margin-bottom 212px
				.van-cell 
					// min-height 68px
					display flex
					.van-cell__title
						display flex
						align-items center
						font-size 32px
					.van-cell__value
						font-size 32px
					.van-field__body
						// width 100px
						font-size 32px
					.van-field__error-message
							display flex
							font-size 32px
				.user-container
					margin-bottom 60px
					bottom-border-1px(#ececec) 
				.pwd-container
					bottom-border-1px(#ececec) 
						

		.button-content
			height 90px
			display flex
			.van-button
				font-size 34px
				height 100%
				width 600px
				background-color: #1890ff;
				box-shadow: 0px 5px 13px 0px rgba(24, 144, 255, 0.46);
				border-radius: 45px;

</style>
