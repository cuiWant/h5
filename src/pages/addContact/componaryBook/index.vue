<template>
  <div class="addOutContact">
		<Header ref="header" :leftClick="headerLeft" :rightClick="headerRight" :title="'添加参会人'" :rightText="`确定(${index})`"></Header>
    <p>
      aaabbbvvv
    </p>
  </div>
</template>

<script>
export default {
  name:'componaryBook',
  data(){
    return {
      index:'0'
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