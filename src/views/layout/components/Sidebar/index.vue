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
      active-text-color="#409EFF"
    >
      <el-menu-item index="/community">
        <i class="el-icon-setting"></i>
        <span slot="title">社群管理</span>
      </el-menu-item>
      <el-menu-item index="/equipment">
        <i class="el-icon-setting"></i>
        <span slot="title">设备管理</span>
      </el-menu-item>
      <el-menu-item index="/data">
        <i class="el-icon-setting"></i>
        <span slot="title">数据可视化</span>
      </el-menu-item>
      <el-menu-item index="/developer">
        <i class="el-icon-setting"></i>
        <span slot="title">开发者中心</span>
      </el-menu-item>
      <!--<sidebar-item :routes="permission_routers"></sidebar-item>-->
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
