<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    if(!this.userInfo.company){
      this.$http("/merchant/getInfo").then(res=>{
        this.$store.commit("SET_USER_INFO",res.data);
      }).catch(err=>{
        // window.open(window.location.href)
      })
    }
  },
  computed:{
    userInfo:function(){
      return this.$store.state.userInfo || {}
    }
  }
}
</script>

<style>

</style>
