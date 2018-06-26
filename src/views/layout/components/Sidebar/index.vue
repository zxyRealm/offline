<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      router
      :show-timeout="200"
      :default-active="currRouter"
      :collapse="isCollapse"
      background-color="#232027"
      text-color="#bfcbd9"
      active-text-color="#fff"
    >
      <el-menu-item index="/community">
        <i class="ob-icon__community"></i>
        <span slot="title">社群管理</span>
      </el-menu-item>
      <el-menu-item index="/equipment">
          <i class="ob-icon__equipment"></i>
        <span slot="title">设备管理</span>
      </el-menu-item>
      <el-menu-item index="/data">
        <i class="ob-icon__data"></i>
        <span slot="title">数据可视化</span>
      </el-menu-item>
      <el-menu-item index="/developer">
        <i class="ob-icon__developer"></i>
        <span slot="title">开发者中心</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  created(){
    console.log("路由加载")
  },
  computed: {
    ...mapGetters([
      "sidebar",
      "permission_routers"
    ]),
    currRouter:function () {
      let path = this.$route.path;
      return path.substring(0,path.indexOf('/',1))
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss">
  .el-menu-item{
    [class^=ob-icon]{
      display: inline-block;
      width: 22px;
      height: 22px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      &+span{
        margin-left: 16px;
      }
      &.ob-icon__data{
        background-image: url("../../image/nav_data_icon.png");
      }
      &.ob-icon__equipment{
        background-image: url("../../image/nav_equipment_icon.png");
      }
      &.ob-icon__community{
        background-image: url("../../image/nav_community_icon.png");
      }
      &.ob-icon__developer{
        background-image: url("../../image/nav_developer_icon.png");
      }
    }
    &.is-active{
      color: #fff;
      background: url("../../image/ob-icon-nav__active.png") no-repeat center center;
      background-size: cover;
    }
  }
</style>
