<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      router
      :show-timeout="200"
      :default-active="currRouter"
      :collapse="isCollapse"
      background-color="#232027"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="/index">
        <i class="ob-icon__index"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!--<el-menu-item index="/console">-->
        <!--<i class="ob-icon__console"></i>-->
        <!--<span slot="title">控制台</span>-->
      <!--</el-menu-item>-->
      <el-menu-item index="/community">
        <i class="ob-icon__community"></i>
        <span slot="title">社群管理</span>
      </el-menu-item>
      <el-menu-item index="/equipment">
        <i class="ob-icon__equipment"></i>
        <span slot="title">设备管理</span>
      </el-menu-item>
      <el-menu-item index="/member">
        <i class="ob-icon__member"></i>
        <span slot="title">人员管理</span>
      </el-menu-item>
      <el-menu-item index="/action">
        <i class="ob-icon__action"></i>
        <span slot="title">行为分析</span>
      </el-menu-item>
      <el-menu-item index="/data">
        <i class="ob-icon__data"></i>
        <span slot="title">数据分析</span>
      </el-menu-item>
      <!--<el-menu-item index="/developer">-->
        <!--<i class="ob-icon__developer"></i>-->
        <!--<span slot="title">开发者中心</span>-->
      <!--</el-menu-item>-->
    </el-menu>
  </el-scrollbar>
</template>

<script>
import {mapGetters} from 'vuex'

const {body} = document
const WIDTH = 1024
const RATIO = 3
export default {
  mounted () {
  },
  methods: {
    isMobile () {
      let rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routers'
    ]),
    currRouter: function () {
      let path = this.$route.path
      return `/${path.split('/')[1]}`
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss">
  .el-menu-item {
    [class^=ob-icon] {
      display: inline-block;
      width: 22px;
      height: 22px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      & + span {
        margin-left: 16px;
      }
      &.ob-icon__data {
        background-image: url("../../image/nav_data_icon.png");
      }
      &.ob-icon__equipment {
        background-image: url("../../image/nav_equipment_icon.png");
      }
      &.ob-icon__community {
        background-image: url("../../image/nav_community_icon.png");
      }
      &.ob-icon__developer {
        background-image: url("../../image/nav_developer_icon.png");
      }
      &.ob-icon__console {
        background-image: url("../../image/nav_console_icon.png");
      }
      &.ob-icon__index {
        background-image: url("../../image/nav_index_icon.png");
      }
      &.ob-icon__action {
        background-image: url("../../image/nav_action_icon.png");
      }
      &.ob-icon__member {
        background-image: url("../../image/nav_member_icon.png");
      }
    }
    &.is-active {
      color: #fff;
      background: url("../../image/ob-icon-nav__active.png") no-repeat center center;
      background-size: cover;
    }
  }
</style>
