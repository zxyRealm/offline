<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <navbar></navbar>

    <div class="main-container" :class="{'no-bar':!showBar}">

      <sidebar v-show="showBar" class="sidebar-container"></sidebar>

      <app-main class="app-main-content" :class="cornerBg" id="app_main--content">
      </app-main>

    </div>

  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import { mapState } from 'vuex'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  created(){
   this.$store.dispatch('GET_USER_INFO');
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    cornerBg(){
      if(/\/data/.test(this.$route.path)){
        return ''
      }
      return 'corner-bg'
    },
    ...mapState([
      "userInfo"
    ]),
    showBar(){
      return this.$route.name !== 'console-lwh'
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    .app-main-content{
      position: absolute;
      top:20px;
      left:20px;
      bottom:20px;
      right:20px;
      box-sizing: border-box;
      background-color: #232027;
      color: #fff;
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">

  .app-wrapper{
    .app-main-content{
      >div{
        height: 100%;
        /*background-color: #0F0E11;*/
      }
    }

  }
</style>
