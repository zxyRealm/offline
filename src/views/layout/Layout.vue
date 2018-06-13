<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <navbar></navbar>
    <div class="main-container">
      <sidebar class="sidebar-container"></sidebar>
      <app-main class="app-main-content">
        <div class="bl-bg"></div>
        <div class="br-bg"></div>
        <div class="tl-bg"></div>
        <div class="tr-bg"></div>
      </app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  created(){
    this.$store.dispatch('GET_USER_INFO');
  },
  mounted(){
    console.log(this.$store.state)
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
    }
  },
  methods: {
    checkFirst(){
      this.$http("/merchant/usercenter").then(res=>{
        if(!res.data){
          this.$router.push("/developer/info/edit")
        }
      }).catch(error=>{
        console.log('error',error)
      })
    },
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
    /*background-color: rgba(64,58,73,0.30);*/
    .app-main-content{
      position: absolute;
      top:20px;
      left:20px;
      bottom:20px;
      right:20px;
      /*height: calc(100% - 15px);*/
      /*min-height: calc(100% - 15px)!important;*/
      box-sizing: border-box;
      background-color: #232027;
      color: #fff;
      background-image: url("/static/img/main_bg_icon.png");
      >div{
        &[class$='-bg']{
          position: absolute;
          height: 17px;
          width: 17px;
          background-repeat: no-repeat;
          background-size: contain;
        }
        &.br-bg{
          bottom:-2px;
          right:-2px;
          background-image: url("/static/img/border_bottom_right_icon.png");
        }
        &.bl-bg{
          bottom:-2px;
          left:-3px;
          background-image: url("/static/img/border_bottom_left_icon.png");
        }
        &.tl-bg{
          top:-2px;
          left:-3px;
          background-image: url("/static/img/border_top_left_icon.png");
        }
        &.tr-bg{
          top:-2px;
          right:-2px;
          background-image: url("/static/img/border_top_right_icon.png");
        }
      }

    }
  }
  /*.drawer-bg {*/
    /*background: #000;*/
    /*opacity: 0.3;*/
    /*width: 100%;*/
    /*top: 0;*/
    /*height: 100%;*/
    /*position: absolute;*/
    /*z-index: 999;*/
  /*}*/
</style>
<style lang="scss" rel="stylesheet/scss">
  .app-wrapper{
    .app-main-content{
      >div{
        height: 100%;
      }
    }
  }
</style>
