<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <navbar></navbar>
    <div class="main-container" :class="{'no-bar':!showBar,'console__main': $route.name === 'console-lwh'}">
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
        mobile: this.device === 'mobile',
        'theme-white': this.$route.path.split('/')[1] !== 'index'
      }
    },
    cornerBg () {
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
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

    .app-main-content {
      height: 100%;
      box-sizing: border-box;
      background: $content-bg;
      color: #fff;
    }

    /********
    白色主题
    ********/

    &.theme-white {
      .app-main-content {
        background: $theme-white;
        color: #333;
      }
    }
  }
</style>
<style lang="scss">
  .app-wrapper {
    .app-main-content {
      &:not(.no-padding) {
      }
      > div {
        height: 100%;
      }
    }
  }
</style>
