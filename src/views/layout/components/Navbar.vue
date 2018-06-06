<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="logo-wrap vam">
      <img src="/static/img/logo.png" alt="">
      <div class="des">
        <h2>线下浏览器服务平台</h2>
        <p>Offline Browser service platform </p>
      </div>
    </div>
    <!--<breadcrumb class="breadcrumb-container"></breadcrumb>-->
    <div class="right-menu vam tal">

      <hamburger class="hamburger-container vam" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      控制台
      <div class="right-menu-item vam">
        <router-link to="/developer/notify" class="system-notify">
          <uu-icon type="notify"></uu-icon>
        </router-link>
        <router-link to="/developer/info" class="user-info">
          <div class="avatar-wrap">
            <img src="/static/img/logo.png" alt="">
          </div>
          <span>{{'用户名'}}</span>
        </router-link>
        <a href="javascript:void (0);" class="exit" @click="logout">
          <uu-icon type="exit"></uu-icon>
        </a>
      </div>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger
  },
  data(){
    return {
      avatar:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 70px;
  /*line-height: 70px;*/
  background-color: #232027;
  box-shadow: 3px 3px 5px 0 rgba(1,7,17,0.60);
  border-radius: 0 !important;
  border: none!important;
  color: #fff;
  .logo-wrap{
    float:left;
    width: 220px;
    height: 100%;
    text-align: center;
    box-shadow: 3px 3px 5px 0 rgba(1,7,17,0.60);
    color:#fff;
    >img{
      height: 30px;
    }
    .des{
      width: 140px;
      line-height: 1;
      height: 30px;
      text-align: center;
      overflow: hidden;
      >h2{
        font-size:15px;
        line-height: 1.4;
      }
      >p{
        width: 125%;
        font-size: 12px;
        transform-origin: left top;
        transform: scale(0.8);
        *font-size:8px;
      }
    }
  }

  .hamburger-container {
    float: left;
    height: 30px;
    padding: 3px 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    padding: 18px;
    margin-left: 220px;
    height: 100%;
    font-size:14px;
    user-select: none;
    background-image: url("/static/img/main_bg_icon.png");
    box-sizing: border-box;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      float: right;
      display: inline-block;
      margin: 0 8px;
      >a{
        display: inline-block;
        margin: 0 5px;
      }
      .user-info{
        height: 34px;
        line-height: 34px;
        font-size: 14px;
        .avatar-wrap{
          display: inline-block;
          height: 34px;
          width: 34px;
          border-radius: 50%;
          overflow: hidden;
          background: url("/static/img/avatar_person_bg@1x.png") no-repeat left top;
          background-size: contain;
          vertical-align: middle;
          margin-right: 10px;
          img{
            height: 100%;
            width: 100%;
          }
        }
      }
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
