<template>
  <div class="addOutContact">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'添加参会人'" :rightText="`确定(7)`"></Header>
    <p>
     外部联系人
    </p>
  </div>
</template>

<script>
export default {
  name:'outContact',
  data(){
    return {

    }
  },
  methods:{
    headerLeft() {
			this.$router.go(-1);
		},
		headerRight() {},
  }
}
</script>

<style lang="stylus">

</style>