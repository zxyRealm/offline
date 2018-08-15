<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$store.dispatch('GET_USER_INFO')
    if (!this.userInfo.company) {
      this.$http('/merchant/getInfo').then(res => {
        this.$store.commit('SET_USER_INFO', res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    userInfo: function () {
      return this.$store.state.userInfo || {}
    }
  }
}
</script>

<style>

</style>
