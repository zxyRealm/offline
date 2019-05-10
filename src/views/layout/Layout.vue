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
import { eventObject } from '@/utils/event'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  data () {
    return {
      isFull: false
    }
  },
  created () {
    eventObject().$on('CHANGE_FULL_STATUS', this.changeFull)
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
        'full-screen': this.isFull,
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
      // return 'corner-bg'
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
    },
    changeFull (st) {
      this.isFull = st
    },
  },
  beforeDestroy () {
    eventObject().$off('CHANGE_FULL_STATUS', this.changeFull)
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

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
        color: $white-text-color;
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
