<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
import {GetSocketIP} from './api/common'
import {GetMerchantInfo} from './api/developer'

export default {
  name: 'App',
  created () {
    console.log('version 2018-01-08 09:30')
    GetSocketIP().then(res => {
      this.$store.state.serverIp = `${res.data || ''}`
    })
    this.$store.dispatch('GET_USER_INFO')
    if (!this.userInfo.company) {
      GetMerchantInfo().then(res => {
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
