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
import {Navbar, Sidebar, AppMain} from './components'
import {mapState} from 'vuex'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  created () {
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    device () {
      return this.$store.state.app.device
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    cornerBg () {
      // let nameSet = new Set(['console-lwh'])
      let routeName = this.$route.name
      if (/^(\/data)/.test(this.$route.path)) {
        return 'no-padding transparent'
      } else if (routeName === 'console-lwh') {
        return 'no-padding'
      } else if (routeName === 'index-lwh') {
        return 'corner-bg home--wrap'
      }
      return 'corner-bg'
    },
    ...mapState([
      'userInfo'
    ]),
    showBar () {
      return this.$route.name !== 'console-lwh'
    }
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('closeSideBar', {withoutAnimation: false})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    .app-main-content {
      height: 100%;
      /*overflow: hidden;*/
      box-sizing: border-box;
      background-color: $content-bg;
      color: #fff;
      &.home--wrap{
        background: $theme-bg;
      }
      &.transparent{
        background: transparent;
      }
    }
  }
</style>
<style lang="scss" rel="stylesheet/scss">

  .app-wrapper {
    .app-main-content {
      &:not(.no-padding){
        > div {
          /*padding: 0 20px;*/
        }
      }
      > div {
        height: 100%;
      }
    }

  }
</style>
